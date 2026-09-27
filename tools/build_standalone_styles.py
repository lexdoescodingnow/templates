"""Build import-free posting styles and keep all exported stylesheet URLs current."""
from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import json
import re
import subprocess
from forum_inventory import ROOT, css_path

MANIFEST = ROOT / 'tools' / 'standalone-styles.json'
FONT_CACHE = ROOT / 'tools' / 'standalone-fonts.json'
IMPORT = re.compile(r'@import\s+(?:url\(\s*[\"\']?([^\"\')]+)[\"\']?\s*\)|[\"\']([^\"\']+)[\"\'])\s*;', re.I)
COMMENTS = re.compile(r'/\*.*?\*/', re.S)
PREFIX = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/'


def source_text(path, revision='WORKTREE'):
    if revision == 'WORKTREE':
        return (ROOT / path).read_text()
    return subprocess.check_output(['git', 'show', revision + ':' + path], cwd=ROOT, text=True)


def imported(url, parent, revision):
    url = re.sub(r'\s+', '', url)
    local = css_path(url, (ROOT / parent).parent)
    if local:
        pinned = re.search(r'templates@([a-f0-9]{40})/', url)
        ref = pinned[1] if pinned else ('WORKTREE' if url.startswith('http') else revision)
        return str(local.relative_to(ROOT)), ref
    if not url.startswith('https://fonts.googleapis.com/'):
        raise ValueError('Unsupported external stylesheet: ' + url)
    return url, None


def dependency_fonts(path, revision='WORKTREE', chain=()):
    key = (path, revision)
    if key in chain:
        raise ValueError('Circular CSS import: ' + str(key))
    found = set()
    text = COMMENTS.sub('', source_text(path, revision))
    for match in IMPORT.finditer(text):
        target, ref = imported(match[1] or match[2], path, revision)
        if ref is None:
            found.add(target)
        else:
            found.update(dependency_fonts(target, ref, chain + (key,)))
    return found


def fetch_font(url):
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0 Chrome/125.0.0.0 Safari/537.36'})
    with urlopen(request, timeout=30) as response:
        if response.status != 200 or 'text/css' not in response.headers.get('Content-Type', ''):
            raise ValueError('Unexpected font stylesheet response: ' + url)
        text = COMMENTS.sub('', response.read().decode())
    if '@font-face' not in text or '@import' in text:
        raise ValueError('Font stylesheet is not standalone: ' + url)
    return url, text.strip() + '\n'


def compile_css(path, fonts, revision='WORKTREE', chain=()):
    key = (path, revision)
    if key in chain:
        raise ValueError('Circular CSS import: ' + str(key))
    text = COMMENTS.sub('', source_text(path, revision))
    def replace(match):
        target, ref = imported(match[1] or match[2], path, revision)
        return fonts[target] if ref is None else compile_css(target, fonts, ref, chain + (key,))
    text = IMPORT.sub(replace, text)
    text = re.sub(r'@supports\(\(([^(){}]+)\)\s+or\s+\(([^(){}]+)\)\)\s*\{',
                  r'@supports (\1) or (\2){', text)
    if re.search(r'@import\b', text):
        raise ValueError('Unresolved import in ' + path)
    # Existing asset URLs are absolute or data URLs. Refuse to move a relative
    # asset accidentally when combining stylesheets from different directories.
    for url in re.findall(r'url\(\s*[\"\']?([^\"\')]+)', text):
        if not url.startswith(('https:', 'http:', 'data:', '#')):
            raise ValueError('Relative asset requires explicit rebasing: ' + path + ': ' + url)
    return text


def rewrite_urls(text, mappings):
    for item in mappings:
        source, target = item['source'], item['target']
        # Also handles template literals and concatenated revision variables.
        pattern = (r'https://(?:cdn\.jsdelivr\.net/gh|raw\.githack\.com)/lexdoescodingnow/templates'
                   r'(?:@[^/\n]+|/[^/\n]+)/' + re.escape(source) + r'(?:\?[^\s\"\'<>)]*)?')
        text = re.sub(pattern, PREFIX + target, text)
        pattern = r'https://raw\.githubusercontent\.com/lexdoescodingnow/templates/[^/\n]+/' + re.escape(source)
        text = re.sub(pattern, PREFIX + target, text)
    targets = {PREFIX + item['target'] for item in mappings}
    def direct_link(match):
        return '<link rel="stylesheet" href="' + match[2] + '">' if match[2] in targets else match[0]
    return re.sub(r'<style>\s*@import\s+url\(([\"\'])([^\"\']+)\1\);\s*</style>', direct_link, text)


def refresh_standalone():
    mappings = json.loads(MANIFEST.read_text())
    fonts = json.loads(FONT_CACHE.read_text()) if FONT_CACHE.exists() else {}
    required = set().union(*(dependency_fonts(item['source']) for item in mappings))
    missing = sorted(required - fonts.keys())
    if missing:
        with ThreadPoolExecutor(max_workers=6) as pool:
            fonts.update(pool.map(fetch_font, missing))
        FONT_CACHE.write_text(json.dumps(fonts, ensure_ascii=False, indent=2) + '\n')
    compiled = {}
    for item in mappings:
        css = compile_css(item['source'], fonts)
        compiled[item['source']] = css
        (ROOT / item['target']).write_text(css)
    folders = {item['collection'] for item in mappings}
    text_files = [p for p in ROOT.rglob('*') if p.is_file() and p.suffix in ('.txt', '.html', '.js', '.cjs', '.py', '.md')
                  and '.git' not in p.parts and 'tools' not in p.relative_to(ROOT).parts
                  and 'forum-posts' not in p.relative_to(ROOT).parts]
    for path in text_files:
        original = path.read_text()
        revised = rewrite_urls(original, mappings)
        if path.suffix == '.html':
            for source, css in compiled.items():
                previous = source_text(source)
                if len(previous) > 100:
                    revised = revised.replace(previous, css)
                    revised = revised.replace(json.dumps(previous, ensure_ascii=False)[1:-1], json.dumps(css, ensure_ascii=False)[1:-1])
        if revised != original:
            path.write_text(revised)
    for folder in folders:
        revision_file = ROOT / folder / 'stylesheet-revision.txt'
        if revision_file.exists():
            revision_file.write_text('main\n')
    print(f'Refreshed {len(mappings)} standalone stylesheets in {len(folders)} collections.')
    return mappings


if __name__ == '__main__':
    refresh_standalone()
