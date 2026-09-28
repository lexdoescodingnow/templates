from pathlib import Path
from html import escape
import json

HERE = Path(__file__).resolve().parent
records = json.loads((HERE / 'characters.json').read_text())
css = (HERE / 'character-directory-v1.css').read_text()
js = (HERE / 'character-directory-v1.js').read_text()
# Keep JSON structural brackets, escaping brackets inside character strings only.
data = '[\n' + ',\n'.join(json.dumps(record, ensure_ascii=False, indent=2).replace('<', r'\u003c').replace('[', r'\u005b').replace(']', r'\u005d') for record in records) + '\n]'
url = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/forum-posts/characters/character-directory-v1.css'
markup = '<section class="bh-character-directory" aria-label="Character PI directory">\n<script class="pc-data" type="application/json">\n' + data + '\n</script>\n' + '''<span class="pc-kicker">Character directory</span>
<h2 class="pc-title">Choose your character.</h2>
<div class="pc-search" hidden><label><input class="pc-input" type="search" aria-label="Search names, groups or face claims" placeholder="Name, group or face claim…" autocomplete="off" spellcheck="false"></label><button class="pc-clear" type="button">Clear</button></div>
<p class="pc-count" role="status" aria-live="polite"></p>
<div class="pc-list"></div>
<p class="pc-empty" hidden>No matching characters.</p>
<noscript>Enable JavaScript to browse and copy character codes.</noscript>
''' + '<link rel="stylesheet" href="' + url + '">\n<script>' + js + '</script>\n</section>'
code = '[dohtml]\n' + markup + '\n[/dohtml]\n'
(HERE / 'character-directory.txt').write_text(code)
preview = '''<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Character PI directory · Yonggi starter</title><style>body{margin:0;padding:24px 16px;background:#161619;color:#eee;font:14px/1.6 Arial,sans-serif}main{max-width:740px;margin:auto}.preview-tools{text-align:center}select,button{font:inherit;padding:9px 12px;background:#29292d;color:#eee;border:1px solid #777;border-radius:6px}button{cursor:pointer}.preview-member{--mgrgb1:218,148,168;--mgrgb2:167,172,225;--mgrgb3:108,195,201}html[color-mode='light'] body{background:#efeeec;color:#303035}html[color-mode='light'] .preview-member{--mgrgb1:148,58,98;--mgrgb2:102,80,154;--mgrgb3:21,120,129}.preview-save{text-align:center;margin:20px 0}.preview-save p{font-size:12px}.preview-code{box-sizing:border-box;width:100%;min-height:200px;margin-top:12px;padding:12px;background:#222;color:#eee;border:1px solid #777;font:12px/1.5 monospace}</style></head><body><main>
<div class="preview-tools"><label>Preview mode <select id="preview-mode"><option value="dark">Dark</option><option value="light">Light</option></select></label></div><div class="preview-member">''' + markup.replace('<link rel="stylesheet" href="' + url + '">', '<style>' + css + '</style>') + '''</div>
<div class="preview-save"><button id="copy-widget" type="button">Copy directory widget</button><p id="widget-status" role="status">Yonggi starter · supplied age: 20 · automatic ageing is not enabled.</p></div><details id="widget-details"><summary>Forum widget code</summary><textarea class="preview-code" id="widget-code" readonly spellcheck="false" aria-label="Forum directory widget code">''' + escape(code) + '''</textarea></details>
</main><script>document.getElementById('preview-mode').addEventListener('change',function(){document.documentElement.setAttribute('color-mode',this.value);});document.getElementById('copy-widget').addEventListener('click',async function(){var field=document.getElementById('widget-code');var status=document.getElementById('widget-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Directory widget copied.';}catch(error){document.getElementById('widget-details').open=true;field.focus();field.select();field.setSelectionRange(0,field.value.length);status.textContent='Selected — press Ctrl+C or ⌘C.';}});</script></body></html>'''
(HERE / 'character-directory-preview.html').write_text(preview)
print(f'Built a character directory with {len(records)} supplied record(s).')
