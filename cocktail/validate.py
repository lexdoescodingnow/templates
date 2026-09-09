import json
import re
import subprocess
from pathlib import Path
from lxml import html, etree

root = Path(__file__).resolve().parent
designs = json.loads((root / 'designs.json').read_text())
css = (root / 'cocktail-afterhours-v1.css').read_text()
assert len(designs) == 15
assert len({d['name'] for d in designs}) == 15
assert len({d['slug'] for d in designs}) == 15
assert all(sum(d['type'] == t for d in designs) == 5 for t in ('thread', 'comms', 'bud'))
assert '<!--' not in css and '/*' not in css
assert all(f'--mgrgb{i}' in css for i in (1, 2, 3))
assert 'html[color-mode="dark"] .bh-cocktail' in css
assert 'html:not([color-mode="light"]):not([color-mode="dark"])' in css
assert 'background-image:var(--ck-reverse)' in css
assert css.count(':not(:has(.ckt-media img))') >= 5
assert 'max-height' not in css and 'overflow:auto' not in css
clean_css = re.sub(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'', '""', css)
stack = []
for c in clean_css:
    if c in '{([': stack.append(c)
    elif c in '})]': assert stack and stack.pop() == {'}':'{',')':'(',']':'['}[c]
assert not stack
for selector in re.findall(r'(?:^|\})([^{}]+)\{', css):
    if not selector.strip().startswith('@'):
        assert '.bh-cocktail' in selector, selector
for f in ['build.cjs', 'cocktail-model.js', 'cocktail-editor.js']:
    subprocess.run(['node', '--check', str(root / f)], check=True, capture_output=True)
subprocess.run(['node', str(root / 'build.cjs')], check=True)
for d in designs:
    file = root / f"cocktail-{d['slug']}-{d['type']}-{d['number']}.txt"
    s = file.read_text()
    assert s.startswith('[dohtml]\n') and s.endswith('[/dohtml]\n')
    assert s.count('[dohtml]') == 1 and s.count('[/dohtml]') == 1
    assert all(t in s[:250] for t in ('[url]', '[name]', '[text]'))
    assert '<!--' not in s and '/*' not in s and '===' not in s
    doc = html.fromstring('<section>' + s[9:-10] + '</section>')
    wrapper = doc.xpath('./div')[0]
    assert wrapper.get('class') == f"bh-cocktail ckt-{d['type']} ckt-{d['slug']}"
    assert f'.bh-cocktail.ckt-{d["slug"]}' in css
    assert wrapper[0].get('class') == 'ckt-name'
    assert wrapper[1].get('class') == 'ckt-title'
    assert len(wrapper.xpath('.//img')) == d['gifs']
    assert len(doc.xpath('.//link[@rel="stylesheet"]')) == 1
    assert not doc.xpath('.//script | .//iframe')
    copy = wrapper.xpath('./div[@class="ckt-copy"]')[0]
    assert all(copy.xpath('.//' + tag) for tag in ('b', 'i', 'u'))
    if d['type'] == 'bud': assert len(copy.text_content().split()) <= 100
    if d['type'] == 'comms':
        assert len(copy.xpath('./p')) == 3
        opened = html.fromstring('<div>' + ''.join('<p>' + p.text_content() for p in copy.xpath('./p')) + '</div>')
        assert len(opened.xpath('./p')) == 3
        assert all(p.get('class') is None for p in opened.xpath('./p'))
    assert not doc.xpath('//comment()')
preview = html.fromstring((root / 'cocktail-collection-preview.html').read_text())
assert 'Callum & Dae' in preview.text_content()
assert not any(x in preview.text_content() for x in ('Tropical', 'Davis & Theo', 'Latitude Letter'))
ids = preview.xpath('//*[@id]/@id')
assert len(ids) == len(set(ids))
editor = (root / 'cocktail-editor.js').read_text()
for id in set(re.findall(r"\$\('#([a-z0-9-]+)'\)", editor)):
    assert id in ids, id
assert json.loads(preview.xpath('//script[@id="cocktail-designs"]')[0].text) == designs
assert css == preview.xpath('//style')[0].text
print('PASS: 15 named snippets, HTML structure, editable-first order, 5/5/5 counts, image defaults, open-p message parsing, short buds, scoped CSS source, balanced CSS delimiters, JS syntax and preview control/data consistency.')
print('Browser layout and live JCink rendering are not covered by these checks.')
