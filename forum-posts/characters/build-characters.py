from pathlib import Path
from html import escape
import json
import re
import unicodedata

HERE = Path(__file__).resolve().parent
def sort_name(name):
    return ''.join(c for c in unicodedata.normalize('NFKD', name) if not unicodedata.combining(c)).casefold()

records = sorted(json.loads((HERE / 'characters.json').read_text()), key=lambda row: sort_name(row['name']))
css = (HERE / 'character-directory-v2.css').read_text()
js = (HERE / 'character-directory-v2.js').read_text()
base = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/forum-posts/characters/'
css_link = '<link rel="stylesheet" href="' + base + 'character-directory-v2.css">'
js_link = '<script src="' + base + 'character-directory-v2.js"></script>'

def fields(code):
    return dict(re.findall(r'\[(PI|PG|CD|CN)=([\s\S]*?)\](?=\s*(?:\[(?:PI|PG|CD|CN)=|$))', code))

def description(value):
    out = []
    stack = []
    for part in re.split(r'(\[/?(?:b|i|u)\])', value, flags=re.I):
        tag = re.fullmatch(r'\[(/?)(b|i|u)\]', part, re.I)
        if not tag:
            out.append(escape(re.sub(r'\[/?[a-z][^\]]*\]', '', part, flags=re.I)))
        elif not tag[1]:
            stack.append(tag[2].lower())
            out.append('<' + stack[-1] + '>')
        elif stack and stack[-1] == tag[2].lower():
            out.append('</' + stack.pop() + '>')
    return ''.join(out) + ''.join('</' + tag + '>' for tag in reversed(stack))

def copy_markup(code):
    return escape(code).replace('[', '<span>&#91;</span>').replace(']', '&#93;')

cards = []
for record in records:
    parts = fields(record['code'])
    assert set(parts) == {'PI', 'PG', 'CD', 'CN'}, record['name']
    images = []
    for key in ('PI', 'PG'):
        url = parts[key]
        if re.match(r'^https?://', url, re.I):
            cls = 'pc-photo' + (' pc-gif' if key == 'PG' else '')
            alt = record['name'] + (' GIF' if key == 'PG' else ' portrait')
            images.append('<img class="' + cls + '" src="' + escape(url, quote=True) + '" alt="' + escape(alt, quote=True) + '" loading="lazy">')
    cards.append('<article class="pc-card">\n<div class="pc-identity"><div class="pc-images">' + ''.join(images) + '</div><div class="pc-person"><h3 class="pc-name">' + escape(record['name']) + '</h3><p class="pc-description">' + description(parts['CD']) + '</p></div></div>\n<div class="pc-actions"><button class="pc-copy" type="button" hidden>Copy PI</button><span class="pc-status" role="status" aria-live="polite"></span></div>\n<details class="pc-details"><summary>View / copy PI code</summary><pre class="pc-code" tabindex="0" aria-label="' + escape(record['name'], quote=True) + ' complete PI code"><code>' + copy_markup(record['code']) + '</code></pre></details>\n</article>')

def widget(items, label='Character directory'):
    return '''<section class="bh-character-directory pc-v2" aria-label="Character PI directory">
<span class="pc-kicker">''' + escape(label) + '''</span>
<h2 class="pc-title">Choose your character.</h2>
<div class="pc-search" hidden><label><input class="pc-input" type="search" aria-label="Search names, partners, groups or face claims" placeholder="Name, partner, group or face claim…" autocomplete="off" spellcheck="false"></label><button class="pc-clear" type="button">Clear</button></div>
<p class="pc-count" role="status" aria-live="polite">''' + str(len(items)) + ''' characters · A–Z</p>
<div class="pc-list">
''' + '\n'.join(items) + '''
</div>
<p class="pc-empty" hidden>No matching characters.</p>
''' + css_link + '\n' + js_link + '\n</section>'

def posting_code(items, label='Character directory'):
    return '[dohtml]\n' + widget(items, label) + '\n[/dohtml]\n'

initial_groups = []
for i, record in enumerate(records):
    initial = record['name'][0].upper()
    if not initial_groups or initial_groups[-1][0] != initial:
        initial_groups.append((initial, []))
    initial_groups[-1][1].append(i)

part_indices = []
pending = []
for initial, indices in initial_groups:
    candidate = pending + indices
    if pending and len(posting_code([cards[i] for i in candidate]).encode('utf-8')) >= 59500:
        part_indices.append(pending)
        pending = indices[:]
    else:
        pending = candidate
if pending:
    part_indices.append(pending)

parts = []
for number, indices in enumerate(part_indices, 1):
    first, last = records[indices[0]]['name'], records[indices[-1]]['name']
    letter_range = first[0].upper() + '–' + last[0].upper()
    label = f'Character directory · part {number} of {len(part_indices)} · {letter_range}'
    code = posting_code([cards[i] for i in indices], label)
    assert len(code.encode('utf-8')) < 60000, 'A forum section exceeds its posting budget; split this initial group.'
    assert not re.search(r'\[(PI|PG|CD|CN)=', code)
    filename = f'character-directory-v2-part-{number:02}.txt'
    (HERE / filename).write_text(code)
    parts.append(dict(number=number, file=filename, range=letter_range, count=len(indices), first=first, last=last, bytes=len(code.encode('utf-8')), code=code))

for filename in ('character-directory.txt', 'character-directory-v2.txt'):
    (HERE / filename).write_text(parts[0]['code'])
manifest = {'totalCharacters': len(records), 'totalParts': len(parts), 'parts': [{k: v for k, v in part.items() if k != 'code'} for part in parts]}
(HERE / 'character-directory-parts.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

all_markup = widget(cards).replace(css_link, '<style>' + css + '</style>').replace(js_link, '<script>' + js + '</script>')
copy_panels = []
for part in parts:
    number = part['number']
    title = f"Forum part {number} of {len(parts)} · {part['range']} · {part['count']} characters"
    copy_panels.append('<div class="preview-part"><h3>' + escape(title) + '</h3><button class="copy-widget" type="button">Copy this forum part</button><p class="widget-status" role="status">' + escape(part['first'] + ' to ' + part['last']) + '</p><details class="widget-details"><summary>View forum code</summary><textarea class="preview-code" readonly spellcheck="false" aria-label="' + escape(title, quote=True) + '">' + escape(part['code']) + '</textarea></details></div>')

preview = '''<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Leaf character PI directory</title><style>body{margin:0;padding:24px 16px;background:#161619;color:#eee;font:14px/1.6 Arial,sans-serif}main{max-width:740px;margin:auto}.preview-tools{text-align:center}select,button{font:inherit;padding:9px 12px;background:#29292d;color:#eee;border:1px solid #777;border-radius:6px}button{cursor:pointer}.preview-member{--mgrgb1:218,148,168;--mgrgb2:167,172,225;--mgrgb3:108,195,201}html[color-mode='light'] body{background:#efeeec;color:#303035}html[color-mode='light'] .preview-member{--mgrgb1:148,58,98;--mgrgb2:102,80,154;--mgrgb3:21,120,129}.preview-part{margin:24px 0;padding:18px;border:1px solid #777;border-radius:8px}.preview-part h3{margin:0 0 12px}.widget-status{font-size:12px}.preview-code{box-sizing:border-box;width:100%;min-height:200px;margin-top:12px;padding:12px;background:#222;color:#eee;border:1px solid #777;font:12px/1.5 monospace}</style></head><body><main>
<div class="preview-tools"><label>Preview mode <select id="preview-mode"><option value="dark">Dark</option><option value="light">Light</option></select></label></div><div class="preview-member">''' + all_markup + '''</div>
<p>Search all ''' + str(len(records)) + ''' characters above. For the forum, copy each alphabetical part into a separate post; search within each post covers that part.</p>''' + '\n'.join(copy_panels) + '''
</main><script>document.getElementById('preview-mode').addEventListener('change',function(){document.documentElement.setAttribute('color-mode',this.value);});document.querySelectorAll('.preview-part').forEach(function(part){part.querySelector('.copy-widget').addEventListener('click',async function(){var field=part.querySelector('.preview-code');var status=part.querySelector('.widget-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Forum part copied.';}catch(error){part.querySelector('.widget-details').open=true;field.focus();field.select();field.setSelectionRange(0,field.value.length);status.textContent='Selected — press Ctrl+C or ⌘C.';}});});</script></body></html>'''
for filename in ('character-directory-preview.html', 'character-directory-v2-preview.html'):
    (HERE / filename).write_text(preview)
print(f'Built {len(records)} static character cards in {len(parts)} forum parts:')
for part in parts:
    print(f"{part['file']}: {part['count']} characters, {part['range']}, {part['bytes']:,} bytes")
