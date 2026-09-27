"""Refresh the Chocolate member-colour stylesheet, snippets and local editor."""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
COLLECTION = ROOT / 'chocolate'
OLD = 'chocolate-media-v2.css'
NEW = 'chocolate-member-v3.css'
MARKER = 'chocolate-members-v3'


def mark_roots(value):
    def replace(match):
        classes = match[1].split()
        if ('choco' in classes or 'chc-ganache' in classes) and MARKER not in classes:
            classes.append(MARKER)
        return '<article class="' + ' '.join(classes) + '"'
    return re.sub(r'<article class="([^"]+)"', replace, value)


css = (COLLECTION / OLD).read_text().rstrip() + '\n\n' + (COLLECTION / 'chocolate-member-theme-v3.css').read_text()
(COLLECTION / NEW).write_text(css)
snippets = sorted(COLLECTION.glob('chocolate-*-*.txt'))
assert len(snippets) == 15
for path in snippets:
    path.write_text(mark_roots(path.read_text()).replace(OLD, NEW))

path = COLLECTION / 'chocolate-collection-preview.html'
preview = path.read_text()
data_pattern = r'(<script[^>]+id="collection-data"[^>]*>)(.*?)(</script>)'
match = re.search(data_pattern, preview, re.S)
data = json.loads(match[2])
for entry in data['entries']:
    entry['markup'] = mark_roots(entry['markup'])
    entry['snippet'] = (COLLECTION / entry['filename']).read_text()
    entry['css'] = css
preview = preview[:match.start(2)] + json.dumps(data, ensure_ascii=False).replace('</', r'<\/') + preview[match.end(2):]
preview = mark_roots(preview).replace(OLD, NEW)
preview = re.sub(r'(<textarea\b[^>]*>)(.*?)(</textarea>)', lambda m: m[1] + html.escape(mark_roots(html.unescape(m[2])), quote=False) + m[3], preview, flags=re.S)
preview = re.sub(r'<style id="chocolate-member-theme">.*?</style>', '', preview, flags=re.S)
preview = preview.replace('</head>', '<style id="chocolate-member-theme">' + css + '</style></head>')
preview = preview.replace('<option value="cocoa">Cocoa fallback</option>', '<option value="cocoa">Neutral fallback</option>')
preview = preview.replace('<option value="rose">', '<option value="rose" selected>')
path.write_text(preview)
print('Updated 15 Chocolate snippets, standalone CSS and collection editor.')
