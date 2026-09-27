"""Refresh the Chocolate member-colour stylesheet, snippets and local editor."""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
COLLECTION = ROOT / 'chocolate'
OLD = 'chocolate-media-v2.css'
NEW = 'chocolate-layout-v4.css'
MARKER = 'chocolate-layout-v4'
NAMES = {Path(r['source']).name:r['name'] for r in json.loads((ROOT/'template-names.json').read_text()) if r['source'].startswith('chocolate/')}
FAMILIES = {'ganache':'Ganache','praline':'Praliné','truffle':'Truffle','gianduja':'Gianduja','noir':'Noir'}
NUMBERS = dict(zip(FAMILIES,range(1,6)))


def display_name(family,kind):
    return NAMES.get(f'chocolate-{family}-{kind}-{NUMBERS[family]:02d}.txt',FAMILIES[family])


def mark_roots(value):
    def replace(match):
        classes = match[1].split()
        if 'choco' in classes or 'chc-ganache' in classes:
            for marker in ('chocolate-members-v3',MARKER):
                if marker not in classes:classes.append(marker)
        return '<article class="' + ' '.join(classes) + '"'
    value = re.sub(r'<article class="([^"]+)"', replace, value)
    def finish(match):
        classes=match[1].split()
        if 'chc-ganache' in classes:family,kind='ganache','thread'
        elif 'choco' in classes:
            family=next(f for f in FAMILIES if 'choco-'+f in classes)
            kind=next(k for k in ('thread','comms','buds') if 'choco-'+k in classes)
        else:return match[0]
        block=match[0]
        block=re.sub(r'(<footer\b[^>]*>)(.*?)(</footer>)',lambda m:m[1]+m[2].replace(FAMILIES[family],display_name(family,kind))+m[3],block,flags=re.S)
        block=re.sub(r'class="((?:chc|choco)-cacao)(?: chocolate-emblem-v4)?"',r'class="\1 chocolate-emblem-v4"',block)
        return block
    return re.sub(r'<article class="([^"]+)"[^>]*>.*?</article>',finish,value,flags=re.S)


css = (COLLECTION / OLD).read_text().rstrip() + '\n\n' + (COLLECTION / 'chocolate-member-theme-v3.css').read_text() + '\n' + (COLLECTION/'chocolate-layout-fixes-v4.css').read_text()
(COLLECTION / NEW).write_text(css)
snippets = sorted(COLLECTION.glob('chocolate-*-*.txt'))
assert len(snippets) == 15
for path in snippets:
    path.write_text(mark_roots(path.read_text()).replace(OLD, NEW).replace('chocolate-member-v3.css',NEW))

path = COLLECTION / 'chocolate-collection-preview.html'
preview = path.read_text()
data_pattern = r'(<script[^>]+id="collection-data"[^>]*>)(.*?)(</script>)'
match = re.search(data_pattern, preview, re.S)
data = json.loads(match[2])
for entry in data['entries']:
    entry['name'] = display_name(entry['family'],entry['kind'])
    entry['markup'] = mark_roots(entry['markup'])
    entry['snippet'] = (COLLECTION / entry['filename']).read_text()
    entry['css'] = css
preview = preview[:match.start(2)] + json.dumps(data, ensure_ascii=False).replace('</', r'<\/') + preview[match.end(2):]
preview = mark_roots(preview).replace(OLD, NEW).replace('chocolate-member-v3.css',NEW)
preview = re.sub(r'(<textarea\b[^>]*>)(.*?)(</textarea>)', lambda m: m[1] + html.escape(mark_roots(html.unescape(m[2])), quote=False) + m[3], preview, flags=re.S)
preview = re.sub(r'<style id="chocolate-member-theme">.*?</style>', '', preview, flags=re.S)
preview = preview.replace('</head>', '<style id="chocolate-member-theme">' + css + '</style></head>')
preview = preview.replace('<option value="cocoa">Cocoa fallback</option>', '<option value="cocoa">Neutral fallback</option>')
preview = preview.replace('<option value="rose">', '<option value="rose" selected>')
for entry in data['entries']:
    preview=re.sub(r'(<[^>]+data-preview-id="'+re.escape(entry['id'])+r'"[^>]*>.*?<h3>)(.*?)(</h3>)',lambda m:m[1]+re.sub(r'\b'+re.escape(FAMILIES[entry['family']])+r'\b',entry['name'],m[2])+m[3],preview,flags=re.S)
path.write_text(preview)
print('Updated 15 Chocolate snippets, standalone CSS and collection editor.')
