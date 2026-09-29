from html import unescape
from html.parser import HTMLParser
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]

class CodePanels(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.active = False
        self.panels = []
    def handle_starttag(self, tag, attrs):
        if tag == 'pre' and dict(attrs).get('class') == 'pc-code':
            self.active = True
            self.panels.append('')
        elif self.active:
            assert tag in {'code', 'span'}, 'PI code is being rendered as formatted content: ' + tag
    def handle_endtag(self, tag):
        if tag == 'pre':
            self.active = False
    def handle_data(self, value):
        if self.active:
            self.panels[-1] += value

def fields(code):
    return dict(re.findall(r'\[(PI|PG|CD|CN)=([\s\S]*?)\](?=\s*(?:\[(?:PI|PG|CD|CN)=|$))', code))

records = json.loads((ROOT / 'characters.json').read_text())
canonical = {fields(row['code'])['CN']: row['code'] for row in records}
manifest = json.loads((ROOT / 'character-directory-parts.json').read_text())
seen = set()
for part in manifest['parts']:
    post = (ROOT / part['file']).read_text()
    parser = CodePanels()
    parser.feed(post)
    assert len(parser.panels) == part['count']
    for code in parser.panels:
        assert '[dohtml]' not in code.lower() and '[/dohtml]' not in code.lower()
        parsed = fields(code)
        assert code == canonical[parsed['CN']]
        assert '[b]' in parsed['CD'] and '[i]' in parsed['CD']
        assert not re.search(r'</?(?:b|i|u)>', code, re.I)
        seen.add(parsed['CN'])
    decoded = unescape(post)
    for tag in ('b', 'i', 'u'):
        decoded = re.sub(r'\[' + tag + r'\](.*?)\[/' + tag + r'\]', r'<' + tag + r'>\1</' + tag + r'>', decoded, flags=re.I | re.S)
    reparsed = CodePanels()
    reparsed.feed(decoded)
    assert reparsed.panels == parser.panels
    panels = re.findall(r'<pre class=pc-code><code>(.*?)</code></pre>', post)
    assert len(panels) == part['count']
    for markup in panels:
        assert '[' not in markup.replace('<span>[</span>', '')
assert len(seen) == len(records) == 180
print('PASS: all 180 static PI copies exactly match canonical BBCode, with literal formatting tags, no dohtml wrappers, and protected brackets after entity/BBCode processing.')
