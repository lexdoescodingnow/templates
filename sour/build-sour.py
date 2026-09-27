"""Build Sour's member-colour edition from the preserved layout source."""
from pathlib import Path
import base64
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'sour'
sys.path.insert(0, str(ROOT / 'tools'))
from build_standalone_styles import compile_css

MARKER = 'sour-members-v3'
SOURCE = 'sour/sour-member-v3.css'
TARGET = 'sour/sour-member-standalone-v3.css'
URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/' + TARGET
files = sorted(FOLDER.glob('sour-*-*.txt'))
assert len(files) == 15
prefixes = [re.search(r'<div class="([^" ]+)', p.read_text())[1] for p in files]

css = (FOLDER / 'sour-media-v2.css').read_text()
palette = {
    '#f5f3ec': '#faf9f7', '#34372c': '#343438', '#656d56': '#69696d',
    '#c8cdb8': 'rgba(var(--mgrgb1,100,100,108),.58)',
    '#e9ecde': '#efeeec', '#b8ca70': 'var(--ss-g1)',
    '#252820': '#222225', '#e7e9de': '#eeedef', '#b9c0a8': '#bcbcc2',
    '#4e5941': 'rgba(var(--mgrgb1,196,196,204),.65)',
    '#333b2b': '#2e2e32', '#c9da8c': 'var(--ss-g1)',
    '#b48b9d': 'var(--ss-g2)',
    '#f2eeef': '#f8f7f6', '#e7e0e5': '#ecebea',
    '#c7bec5': 'rgba(var(--mgrgb3,100,100,108),.58)', '#716672': '#69696d',
    '#29252d': '#242427', '#39313f': '#303034',
    '#5f5266': 'rgba(var(--mgrgb3,196,196,204),.65)', '#c8bccc': '#bcbcc2',
}
svg_palette = {
    '#626a59': '#747478', '#c4cbbc': '#c5c5c9',
    '#dce2c7': '#e3e2df', '#48523a': '#424247',
    '#f8f7ed': '#faf9f7', '#282d24': '#242427',
    '#e1d7e6': '#dedde0', '#514258': '#47474d',
    '#746379': '#77777e', '#ccc0d2': '#c8c8cf',
    '#f5f0f5': '#f7f6f5', '#2c2632': '#29292e',
}

def neutral_art(match):
    svg = base64.b64decode(match[1]).decode()
    colours = set(re.findall(r'#[0-9a-fA-F]{3,8}\b', svg))
    assert colours <= svg_palette.keys(), colours - svg_palette.keys()
    for old, new in svg_palette.items():
        svg = svg.replace(old, new)
    return 'data:image/svg+xml;base64,' + base64.b64encode(svg.encode()).decode()

css = re.sub(r'data:image/svg\+xml;base64,([A-Za-z0-9+/=]+)', neutral_art, css)
for old, new in palette.items():
    css = css.replace(old, new)
css = re.sub(r'var\(--mgrgb([123]),[\d,]+\)',
             lambda m: 'var(--mgrgb' + m[1] + ',' +
             ('196,196,204' if m[0] in ('var(--mgrgb1,210,225,139)',
              'var(--mgrgb2,222,155,174)', 'var(--mgrgb3,146,207,182)')
              else '100,100,108') + ')', css)
for prefix in sorted(prefixes, key=len, reverse=True):
    css = re.sub(r'\.' + re.escape(prefix) + r'(?![-\w])',
                 '.' + prefix + '.' + MARKER, css)
css = re.sub(r'(border(?:-(?:left|right|top|bottom))?:[^;{}]*?)var\(--ss-tone\)',
             r'\1var(--ss-line)', css)
for prefix in prefixes:
    card = '.' + prefix + '.' + MARKER
    heading = card + ' h2.' + prefix + '-title'
    tag = card + ' .' + prefix + '-tag>a'
    css += '\n' + card + '{border-top-color:var(--ss-g1);border-right-color:var(--ss-g2);border-bottom-color:var(--ss-g3);}'
    css += '\n' + heading + ',' + tag + '{color:var(--ss-g1);}'
    css += '\n@supports (background-clip:text) or (-webkit-background-clip:text){' + heading + ',' + tag + '{background-image:linear-gradient(110deg,var(--ss-g1),var(--ss-g2),var(--ss-g3));background-clip:text;-webkit-background-clip:text;color:transparent;-webkit-text-fill-color:transparent;}}\n'
(ROOT / SOURCE).write_text(css)
compiled = compile_css(SOURCE, json.loads((ROOT / 'tools/standalone-fonts.json').read_text()))
(ROOT / TARGET).write_text(compiled)

for path, prefix in zip(files, prefixes):
    code = path.read_text()
    code = code.replace('class="' + prefix + '"', 'class="' + prefix + ' ' + MARKER + '"')
    code = code.replace('sour-media-standalone-v1.css', 'sour-member-standalone-v3.css')
    code = code.replace('<span>[text]</span>', '<span></span>')
    path.write_text(code)

preview = FOLDER / 'sour-collection-preview.html'
page = preview.read_text()
pattern = r'(<script id="sp-collection"[^>]*>)(.*?)(</script>)'
entries = json.loads(re.search(pattern, page, re.S)[2])
for entry in entries:
    entry['code'] = entry['snippet'] = (FOLDER / entry['filename']).read_text()
page = re.sub(pattern, lambda m: m[1] + json.dumps(entries, ensure_ascii=False).replace('</', r'<\/') + m[3], page, flags=re.S)
page = re.sub(r'(<style id="sp-collection-styles">).*?(</style>)',
              lambda m: m[1] + compiled + m[2], page, flags=re.S)
page = re.sub(r'<style>\.sour-sherbet \.sour-sherbet-gifs:not\(:has\(img\)\).*?</style>', '', page, flags=re.S)
for prefix in prefixes:
    page = page.replace('class="' + prefix + '"', 'class="' + prefix + ' ' + MARKER + '"')
page = page.replace('sour-media-standalone-v1.css', 'sour-member-standalone-v3.css')
page = page.replace('<span>[text]</span>', '<span></span>')
preview.write_text(page)
print('Built 15 Sour member-colour snippets, the standalone stylesheet and the editor.')
