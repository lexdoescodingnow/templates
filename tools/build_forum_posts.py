"""Build preview-above-code forum posts from the canonical snippet inventory."""
from pathlib import Path
import re,json,html,collections,zipfile
from forum_inventory import ROOT,inventory,expand_css
from forum_presentation import presentation
OUT=ROOT/'forum-posts';OUT.mkdir(exist_ok=True)
rows=inventory();groups=collections.defaultdict(list)
for r in rows:groups[r['folder']].append(r)
TYPE={'thread':'Threads','comms':'Comms','bud':'Buds','social':'Social templates','event':'Event templates'}
intro='Each design is shown above its complete copyable code. The examples show sample writing; the code uses [TEXT GOES HERE] or [MESSAGE GOES HERE] for your writing. Copy the code box beneath the design you want, then edit the names, link, title and image URLs as needed. Keep the included stylesheet loader: it loads the hosted design automatically.\n\nUse HTML bold, italic and underline tags inside the template. Bold and underline follow the member colours; italics reverse them. Comms use ordinary paragraphs. Buds are intended for replies of 100 words or fewer. Sample images are shown where a preview has an unfilled image URL.\n\nClick-to-copy on this forum uses the skin’s native code-box controls; you can also select and copy the code manually.'
SHELL_CSS='''*{box-sizing:border-box}body{margin:0;padding:28px;background:#f3f1ed;color:#252a2f;font:15px/1.65 system-ui,sans-serif}main{max-width:1040px;margin:auto}a{color:#385c6a}h1{font:500 clamp(38px,6vw,66px)/1.1 Georgia,serif;letter-spacing:-.04em;margin:14px 0}h2{font:500 28px/1.2 Georgia,serif}h3{margin:0}.kicker{text-transform:uppercase;letter-spacing:.15em;font-size:11px}.intro{max-width:760px}.controls{position:sticky;top:0;background:#f3f1edf5;border-block:1px solid #cfcfca;padding:12px 0;display:flex;flex-wrap:wrap;gap:12px;z-index:2}button,select{font:inherit;padding:8px 12px;border:1px solid #9ea7a8;background:white;border-radius:6px;color:#26363b}button{cursor:pointer}button:focus-visible,a:focus-visible,textarea:focus-visible{outline:3px solid #468795;outline-offset:3px}.card{margin:32px 0;padding:22px;background:white;border:1px solid #d4d6d1;border-radius:12px}.card p{margin:8px 0 16px}iframe{border:0;display:block;width:100%;min-height:250px}.codebar{display:flex;gap:12px;align-items:center;margin:16px 0 8px}.codebar span{font-size:12px}textarea{display:block;resize:vertical;width:100%;min-height:160px;padding:16px;border:1px solid #aab1b5;background:#f6f7f8;color:#28343b;font:12px/1.5 ui-monospace,monospace}.links{display:flex;gap:14px;flex-wrap:wrap}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:15px}.tile{border:1px solid #d4d6d1;border-radius:10px;background:white;padding:20px}.tile h2{font-size:25px;margin:0 0 8px}.tile a{display:block}body.dark{background:#15191c;color:#e8e8e5}body.dark a{color:#a3cad4}body.dark .card,body.dark .tile{background:#20262a;border-color:#485259}body.dark .controls{background:#15191cf5;border-color:#485259}body.dark textarea{background:#141b20;color:#e3e9ed}body.dark button,body.dark select{background:#26343d;color:#f0f1ee}@media(max-width:520px){body{padding:12px}.card{padding:12px}.controls{position:static}}'''
SCRIPT='''function selectCode(t){t.focus();t.select();t.setSelectionRange(0,t.value.length)}async function copyText(t,status){try{if(!navigator.clipboard)throw Error();await navigator.clipboard.writeText(t.value);status.textContent='Copied.'}catch(e){selectCode(t);status.textContent='Code selected — press Ctrl+C or ⌘C to copy.'}}document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copyText(document.getElementById(b.dataset.copy),b.nextElementSibling)));function resize(f){try{f.style.height=(Math.ceil(f.contentDocument.body.getBoundingClientRect().height)+8)+'px'}catch(e){}}function theme(){const mode=document.getElementById('mode')?.value||'light';document.body.classList.toggle('dark',mode==='dark');for(const f of document.querySelectorAll('iframe')){try{f.contentDocument.documentElement.setAttribute('color-mode',mode);resize(f)}catch(e){}}}document.querySelectorAll('iframe').forEach(f=>f.addEventListener('load',()=>{theme();new ResizeObserver(()=>resize(f)).observe(f.contentDocument.body)}));document.getElementById('mode')?.addEventListener('change',theme);window.addEventListener('resize',()=>document.querySelectorAll('iframe').forEach(resize));'''
def title(s):return s.replace('-',' ').title().replace('Facetime','FaceTime')
def wrapper(name,body,script=SCRIPT):return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html.escape(name)+'</title><style>'+SHELL_CSS+'</style></head><body><main>'+body+'</main><script>'+script+'</script></body></html>\n'
def preview_code(code,sample):
 code=re.sub(r'((?:src|poster)=["\'])\[url\d?\]',lambda m:m[1]+sample,code)
 return re.sub(r'(url\(["\'])\[url\d?\]',lambda m:m[1]+sample,code)
def strip_forum(code):return re.sub(r'\[/?dohtml\]','',code,flags=re.I)
manifest=[];all_posts=[];tiles=[];md=['# Forum-ready template collection','',f'{len(rows)} distinct templates across {len(groups)} collections. Each live preview keeps its sample writing and is immediately followed by a native forum code box with concise writing markers.','', 'Open `index.html` for the searchable collection index. Copy each collection’s `.txt` masterpost into the forum editor. The `.html` files are browser previews, not forum posting code. Larger collections also have numbered post parts, each below 45,000 characters. Use the parts in order if the forum rejects a long masterpost.','', 'CSS and images are hosted online; no stylesheet installation in the forum admin panel is required. Forum click-to-copy depends on the skin. The browser previews include Copy buttons and a manual-selection fallback.','', '| Collection | Designs | Forum post | Preview | Numbered parts |','| --- | ---: | --- | --- | ---: |']
for folder,items in sorted(groups.items()):
 items.sort(key=lambda r:(list(TYPE).index(r['type']),r['source'],r['block']))
 name=title(folder)
 urls=[u for r in items for u in re.findall(r'<img[^>]*src="(https?[^\"]+)"',r['code'])]
 sample=urls[0] if urls else 'https://64.media.tumblr.com/f2626d5d9006d44aea27f4bd1c7d9a1f/3c4ae6bd64c3cd79-fa/s540x810/51fdbfda88e5953568a687a53892e657066d10a4.gifv'
 heading=f'[h1]{name.upper()}[/h1]\n\n'+intro+'\n\n'
 blocks=[];cards=[];lasttype=None
 for i,r in enumerate(items,1):
  label=r['name'];desc=r.get('description','')
  if not desc:desc='A '+r['type']+' layout from the '+name+' collection.'
  code,example=presentation(r);preview=preview_code(example,sample)
  section='' if lasttype==r['type'] else '[size=6][b]'+TYPE[r['type']].upper()+'[/b][/size]\n\n'
  section+=f'[size=4][b]{i:02d} · {label}[/b][/size]\n{desc}\n\n'+preview+'\n\n[b]Copy code[/b]\n[code]\n'+code+'\n[/code]\n'
  blocks.append(section);lasttype=r['type']
  css='\n'.join(expand_css(ROOT/p) for p in r['css'])
  bare=strip_forum(preview);bare=re.sub(r'<link\b[^>]*>|<style\b[^>]*>.*?</style>|<script\b[^>]*>.*?</script>','',bare,flags=re.S|re.I)
  srcdoc='<!doctype html><html color-mode="light"><head><meta charset="utf-8"><style>'+css+'</style><style>body{margin:0;padding:10px;display:flow-root;--mgrgb1:145,70,101;--mgrgb2:90,100,165;--mgrgb3:32,126,126}html[color-mode="dark"] body{--mgrgb1:225,154,169;--mgrgb2:174,178,227;--mgrgb3:142,200,200}</style></head><body>'+bare+'</body></html>'
  cards.append(f'<section class="card" id="design-{i}"><div class="kicker">{html.escape(r["type"])} · {i:02d}</div><h2>{html.escape(label)}</h2><p>{html.escape(desc)}</p><iframe loading="lazy" title="{html.escape(label)} preview" srcdoc="{html.escape(srcdoc,quote=True)}"></iframe><div class="codebar"><button data-copy="code-{i}">Copy template code</button><span role="status"></span></div><textarea id="code-{i}" readonly spellcheck="false" aria-label="{html.escape(label)} posting code">{html.escape(code)}</textarea></section>')
  manifest.append({k:v for k,v in r.items() if k not in ('code',)}|{'collection_index':i})
 post=heading+'\n'.join(blocks);postfile=folder+'-forum-masterpost.txt';(OUT/postfile).write_text(post)
 # Keep complete template sections together. Never split a code box across posts.
 parts=[];current=heading
 for block in blocks:
  if len(current)+len(block)>44000 and current!=heading:parts.append(current);current=heading
  current+='\n'+block
 if current!=heading:parts.append(current)
 for oldpart in OUT.glob(folder+'-post-*.txt'):oldpart.unlink()
 for i,part in enumerate(parts,1):(OUT/f'{folder}-post-{i:02d}.txt').write_text(part)
 nav='<p class="kicker">LEX’S TEMPLATE COLLECTION · FORUM EDITION</p><h1>'+html.escape(name)+'</h1><p class="intro">'+str(len(items))+' designs. Preview each template, then copy the complete code directly beneath it. The colours shown here are examples; posted templates inherit the member’s group colours.</p><p class="links"><a href="index.html">All collections</a><a href="'+postfile+'" download>Download forum masterpost</a></p><div class="controls"><label>Preview mode <select id="mode"><option value="light">Light</option><option value="dark">Dark</option></select></label><button data-copy="full-post">Copy complete forum post</button><span role="status"></span></div><details><summary>Complete forum post code</summary><textarea id="full-post" readonly>'+html.escape(post)+'</textarea></details>'
 (OUT/(folder+'-preview.html')).write_text(wrapper(name+' · Forum templates',nav+'\n'.join(cards)))
 all_posts.append(post)
 tiles.append(f'<article class="tile" data-search="{name.lower()}"><div class="kicker">{len(items)} designs</div><h2>{name}</h2><a href="{folder}-preview.html">View templates &amp; copy code</a><a href="{postfile}" download>Forum masterpost (.txt)</a><details><summary>{len(parts)} numbered post part'+('s' if len(parts)!=1 else '')+'</summary>'+''.join(f'<a href="{folder}-post-{i:02d}.txt" download>Part {i}</a>' for i in range(1,len(parts)+1))+'</details></article>')
 md.append(f'| {name} | {len(items)} | [{postfile}]({postfile}) | [Preview]({folder}-preview.html) | {len(parts)} |')
index=f'<p class="kicker">LEX’S TEMPLATE COLLECTION · FORUM EDITION</p><h1>Every flavour.<br>Ready to post.</h1><p class="intro">{len(rows)} distinct designs across {len(groups)} collections, including the additional Bread, Clementine and Oats sets and older supported layouts. Each preview sits above its complete copyable code.</p><p>Choose a collection, open its browser preview, or download its forum masterpost. Use the numbered parts if your board has a post-length limit.</p><label>Find a collection <input id="search" type="search" style="font:inherit;padding:10px;margin:15px 0 25px;width:min(100%,450px)" placeholder="Bread, Bingsu, Chocolate…"></label><p id="count" role="status">{len(groups)} collections</p><div class="grid">'+''.join(tiles)+'</div><p><a href="AUDIT.md">Read the corrections and checks</a></p>'
(OUT/'index.html').write_text(wrapper('Forum-ready template collection',index,"document.getElementById('search').addEventListener('input',e=>{let n=0;document.querySelectorAll('.tile').forEach(t=>{t.hidden=!t.dataset.search.includes(e.target.value.toLowerCase());if(!t.hidden)n++});document.getElementById('count').textContent=n+' collections'});"))
(OUT/'README.md').write_text('\n'.join(md)+'\n')
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(OUT/'all-templates-forum-masterpost.txt').write_text('\n\n'.join(all_posts))
for folder in groups:
 readme=ROOT/folder/'README.md'
 original=readme.read_text() if readme.exists() else '# '+title(folder)+' templates\n'
 original=re.sub(r'\n## Forum-ready collection\n.*?(?=\n## |\Z)','',original,flags=re.S)
 original+='\n## Forum-ready collection\n\n[Preview-above-code forum masterpost](../forum-posts/'+folder+'-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/'+folder+'-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).\n'
 readme.write_text(original)
print(f'Generated {len(rows)} designs across {len(groups)} collections.')
