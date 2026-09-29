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
    def handle_endtag(self, tag):
        if tag == 'pre':
            self.active = False
    def handle_data(self, value):
        if self.active:
            self.panels[-1] += value

def fields(code):
    return dict(re.findall(r'\[(PI|PG|CD|CN)=([\s\S]*?)\](?=\s*(?:\[(?:PI|PG|CD|CN)=|$))', code))

records = json.loads((ROOT / 'characters.json').read_text())
canonical = {fields(row['code'])['CN']: fields(row['code']) for row in records}
manifest = json.loads((ROOT / 'character-directory-parts.json').read_text())
seen = set()
for part in manifest['parts']:
    parser = CodePanels()
    parser.feed((ROOT / part['file']).read_text())
    assert len(parser.panels) == part['count']
    for code in parser.panels:
        assert code.startswith('[dohtml] ') and code.endswith(' [/dohtml]')
        parsed = fields(code.removeprefix('[dohtml] ').removesuffix(' [/dohtml]'))
        reference = canonical[unescape(parsed['CN'])]
        for key in ('PI', 'PG', 'CN'):
            assert unescape(parsed[key]) == reference[key]
        restored = re.sub(r'<(/?)(b|i|u)>', r'[\1\2]', parsed['CD'])
        assert unescape(restored) == reference['CD']
        assert '<b>' in parsed['CD'] and '<i>' in parsed['CD']
        seen.add(unescape(parsed['CN']))
assert len(seen) == len(records) == 180
print('PASS: all 180 static PI copies preserve canonical fields and formatting in separate dohtml blocks.')
