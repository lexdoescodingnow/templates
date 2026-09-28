from pathlib import Path
from html import escape
import json
import re

HERE = Path(__file__).resolve().parent
records = sorted(json.loads((HERE / 'characters.json').read_text()), key=lambda row: row['name'].casefold())
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
    return escape(code).replace('[', '<span>&#91;</span>').replace(']', '<span>&#93;</span>')

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

markup = '''<section class="bh-character-directory pc-v2" aria-label="Character PI directory">
<span class="pc-kicker">Character directory</span>
<h2 class="pc-title">Choose your character.</h2>
<div class="pc-search" hidden><label><input class="pc-input" type="search" aria-label="Search names, groups or face claims" placeholder="Name, group or face claim…" autocomplete="off" spellcheck="false"></label><button class="pc-clear" type="button">Clear</button></div>
<p class="pc-count" role="status" aria-live="polite">''' + str(len(records)) + ''' characters · A–Z</p>
<div class="pc-list">
''' + '\n'.join(cards) + '''
</div>
<p class="pc-empty" hidden>No matching characters.</p>
''' + css_link + '\n' + js_link + '\n</section>'
code = '[dohtml]\n' + markup + '\n[/dohtml]\n'
assert len(code) < 44000
assert not re.search(r'\[(PI|PG|CD|CN)=', code)
(HERE / 'character-directory.txt').write_text(code)
(HERE / 'character-directory-v2.txt').write_text(code)
preview = '''<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Leaf character PI directory</title><style>body{margin:0;padding:24px 16px;background:#161619;color:#eee;font:14px/1.6 Arial,sans-serif}main{max-width:740px;margin:auto}.preview-tools{text-align:center}select,button{font:inherit;padding:9px 12px;background:#29292d;color:#eee;border:1px solid #777;border-radius:6px}button{cursor:pointer}.preview-member{--mgrgb1:218,148,168;--mgrgb2:167,172,225;--mgrgb3:108,195,201}html[color-mode='light'] body{background:#efeeec;color:#303035}html[color-mode='light'] .preview-member{--mgrgb1:148,58,98;--mgrgb2:102,80,154;--mgrgb3:21,120,129}.preview-save{text-align:center;margin:20px 0}.preview-save p{font-size:12px}.preview-code{box-sizing:border-box;width:100%;min-height:200px;margin-top:12px;padding:12px;background:#222;color:#eee;border:1px solid #777;font:12px/1.5 monospace}</style></head><body><main>
<div class="preview-tools"><label>Preview mode <select id="preview-mode"><option value="dark">Dark</option><option value="light">Light</option></select></label></div><div class="preview-member">''' + markup.replace(css_link, '<style>' + css + '</style>').replace(js_link, '<script>' + js + '</script>') + '''</div>
<div class="preview-save"><button id="copy-widget" type="button">Copy directory widget</button><p id="widget-status" role="status">''' + str(len(records)) + ''' characters · supplied ages · ❧ Leaf styling</p></div><details id="widget-details"><summary>Forum widget code</summary><textarea class="preview-code" id="widget-code" readonly spellcheck="false" aria-label="Forum directory widget code">''' + escape(code) + '''</textarea></details>
</main><script>document.getElementById('preview-mode').addEventListener('change',function(){document.documentElement.setAttribute('color-mode',this.value);});document.getElementById('copy-widget').addEventListener('click',async function(){var field=document.getElementById('widget-code');var status=document.getElementById('widget-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Directory widget copied.';}catch(error){document.getElementById('widget-details').open=true;field.focus();field.select();field.setSelectionRange(0,field.value.length);status.textContent='Selected — press Ctrl+C or ⌘C.';}});</script></body></html>'''
(HERE / 'character-directory-preview.html').write_text(preview)
(HERE / 'character-directory-v2-preview.html').write_text(preview)
print(f'Built {len(records)} static character cards and complete copyable PI blocks; {len(code):,} forum characters.')
