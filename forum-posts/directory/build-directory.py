from pathlib import Path
from html import escape
import csv

HERE = Path(__file__).resolve().parent
entries = sorted(list(csv.reader((HERE / 'entries.tsv').read_text().splitlines(), delimiter='\t')), key=lambda row: row[0].casefold())
css = (HERE / 'template-directory-v1.css').read_text()
js = (HERE / 'template-directory-v1.js').read_text()
url = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/forum-posts/directory/template-directory-v1.css'
rows = []
for flavour, ship, post in entries:
    link = 'https://bluehour.jcink.net/index.php?showtopic=81175&view=findpost&p=' + post
    rows.append('<a class="bhtd-entry" href="' + escape(link, quote=True) + '"><span class="bhtd-flavour">' + escape(flavour) + '</span> <span class="bhtd-ship">' + escape(ship) + '</span></a>')
markup = '''<section class="bh-template-directory" aria-label="Ship template directory">
<nav class="bhtd-list" aria-label="Template collections">
''' + '\n'.join(rows) + '''
</nav>
<header class="bhtd-header">
<span class="bhtd-kicker">Template directory</span>
<h2 class="bhtd-heading">Find your flavour.</h2>
<div class="bhtd-search" hidden>
<label class="bhtd-label"><input class="bhtd-input" type="search" aria-label="Search by flavour or character name" placeholder="Flavour or character name…" autocomplete="off" spellcheck="false"></label>
<button class="bhtd-clear" type="button" disabled>Clear</button>
</div>
</header>
<p class="bhtd-count" role="status" aria-live="polite" aria-atomic="true">''' + str(len(entries)) + ''' entries · A–Z</p>
<p class="bhtd-empty" hidden>No matching ships. Try another name or flavour.</p>
<link rel="stylesheet" href="''' + url + '''">
<script>''' + js + '''</script>
</section>'''
code = '[dohtml]\n' + markup + '\n[/dohtml]\n'
(HERE / 'template-directory.txt').write_text(code)
preview = '''<!doctype html>
<html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ship template directory · Preview & copy</title>
<style>body{margin:0;padding:30px 18px;background:#151518;color:#ececf0;font:14px/1.6 Arial,sans-serif}main{max-width:760px;margin:auto}.preview-tools{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;margin:0 0 16px}.preview-tools label{display:flex;gap:8px;align-items:center}button,select{font:inherit;border:1px solid #777;border-radius:6px;padding:9px 12px;background:#28282c;color:#eee;cursor:pointer}.preview-copy{text-align:center;margin:20px 0}.preview-copy p{font-size:12px;color:#aaa}details{margin-top:20px}textarea{box-sizing:border-box;width:100%;min-height:240px;padding:16px;background:#222;color:#eee;border:1px solid #777;border-radius:6px;font:12px/1.5 monospace}html[color-mode='light'] body{background:#efeeec;color:#303035}html[color-mode='light'] button,html[color-mode='light'] select{background:#fff;color:#303035}html[color-mode='light'] .preview-copy p{color:#69696f}.demo-member{--mgrgb1:218,148,168;--mgrgb2:167,172,225;--mgrgb3:108,195,201}html[color-mode='light'] .demo-member{--mgrgb1:148,58,98;--mgrgb2:102,80,154;--mgrgb3:21,120,129}.demo-member[data-palette='ocean']{--mgrgb1:120,183,231;--mgrgb2:139,185,198;--mgrgb3:166,164,230}html[color-mode='light'] .demo-member[data-palette='ocean']{--mgrgb1:42,108,162;--mgrgb2:25,116,125;--mgrgb3:104,76,157}</style>
</head><body><main>
<div class="preview-tools"><label>Mode <select id="preview-mode"><option value="dark">Dark</option><option value="light">Light</option></select></label><label>Member palette <select id="preview-palette"><option value="rose">Rose & teal</option><option value="ocean">Ocean & violet</option></select></label></div>
<div class="demo-member">''' + markup.replace('<link rel="stylesheet" href="' + url + '">', '<style>' + css + '</style>') + '''</div>
<div class="preview-copy"><button id="copy-forum" type="button">Copy forum widget</button><p id="copy-status" role="status">Paste the complete code into the first forum post.</p></div>
<details id="code-panel"><summary>Forum code</summary><textarea id="forum-code" readonly spellcheck="false" aria-label="Complete forum widget code">''' + escape(code) + '''</textarea></details>
</main><script>
document.getElementById('preview-mode').addEventListener('change',function(){document.documentElement.setAttribute('color-mode',this.value);});
document.getElementById('preview-palette').addEventListener('change',function(){document.querySelector('.demo-member').setAttribute('data-palette',this.value);});
document.getElementById('copy-forum').addEventListener('click',async function(){var code=document.getElementById('forum-code');var status=document.getElementById('copy-status');try{await navigator.clipboard.writeText(code.value);status.textContent='Copied. Ready to paste into your first post.';}catch(error){document.getElementById('code-panel').open=true;code.focus();code.select();code.setSelectionRange(0,code.value.length);status.textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}});
</script></body></html>
'''
(HERE / 'template-directory-preview.html').write_text(preview)
print(f'Built {len(entries)} entries for {len(set(row[2] for row in entries))} posts; forum code: {len(code):,} characters.')
