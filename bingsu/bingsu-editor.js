const drafts = new Map(designs.map(d=>[d.slug,initial(d)]));
const q=id=>document.getElementById(id);
let selected=designs[0], viewingAll=false;
const palettes={poster:['#426ca3','#7691b9','#ca7891'],ocean:['#276986','#447fac','#6573a4'],rose:['#b74679','#956883','#6f5a9b'],forest:['#3e705f','#78843f','#4c827e'],mono:['#65606b','#8b8287','#625a70']};
const colourIds=['colour1','colour2','colour3'];
function mode(){return q('mode').value==='system'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):q('mode').value;}
function colours(){return colourIds.map(id=>{let h=q(id).value;return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)).join(',');});}
function safeUrl(s){let value=String(s).trim();return /^(https?:\/\/|#|\[url\]$)/i.test(value)?value:'#';}
function sanitize(input){
  const parsed=new DOMParser().parseFromString(input.replace(/\[(\/)?(b|i|u)\]/gi,'<$1$2>'),'text/html');
  const allowed=new Set(['P','B','STRONG','I','EM','U','BR','A','BLOCKQUOTE']);
  function walk(node){
    if(node.nodeType===3)return escapeHtml(node.textContent);
    if(node.nodeType!==1)return '';
    if(['SCRIPT','STYLE','IFRAME','OBJECT','TEMPLATE','SVG'].includes(node.tagName))return '';
    const children=Array.from(node.childNodes).map(walk).join('');
    if(!allowed.has(node.tagName))return children;
    const tag=node.tagName.toLowerCase();
    if(tag==='br')return '<br>';
    return `<${tag}${tag==='a'?` href="${escapeHtml(safeUrl(node.getAttribute('href')||'#'))}"`:''}>${children}</${tag}>`;
  }
  const cleaned=Array.from(parsed.body.childNodes).map(walk).join('').trim();
  if(!/<(?:p|blockquote)[\s>]/.test(cleaned))return cleaned.split(/\n\s*\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('\n');
  return cleaned;
}
function snippet(d,s){return '[dohtml]\n'+markup(d,s)+'\n\n<link rel="stylesheet" href="'+CSS_URL+'">\n[/dohtml]\n';}
function doc(d,s){const c=colours();return `<!doctype html><html color-mode="${mode()}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${TEMPLATE_CSS}</style><style>html,body{margin:0;padding:0;background:transparent}body{padding:8px;--mgrgb1:${c[0]};--mgrgb2:${c[1]};--mgrgb3:${c[2]}}.bgs{margin:22px auto}body>div{max-width:100%}</style></head><body>${markup(d,s,true)}</body></html>`;}
function sizeFrame(frame){try{const h=Math.ceil(frame.contentDocument.body.getBoundingClientRect().height);frame.style.height=(h+3)+'px';}catch(e){}}
function fillFrame(frame,d,s){frame.onload=()=>{sizeFrame(frame);frame.contentDocument.fonts.ready.then(()=>sizeFrame(frame));new ResizeObserver(()=>sizeFrame(frame)).observe(frame.contentDocument.body);};frame.srcdoc=doc(d,s);}
function renderStage(){
  const s=drafts.get(selected.slug);
  q('designName').textContent=selected.name;q('designType').textContent=`${selected.type} ${selected.number} · ${selected.gifs===0?'writing-led':selected.gifs+' default GIF'+(selected.gifs>1?'s':'')}`;
  q('description').textContent=selected.description;
  q('stage').style.width=q('width').value+'px';q('stageShell').classList.toggle('dark',mode()==='dark');fillFrame(q('stage'),selected,s);
  q('code').value=snippet(selected,s);
  document.querySelectorAll('nav button').forEach(b=>b.setAttribute('aria-current',String(b.dataset.slug===selected.slug)));
}
function renderImages(){const wrap=q('images');wrap.replaceChildren();drafts.get(selected.slug).images.forEach((u,i)=>{
  const row=document.createElement('div');row.className='gif-row';const field=document.createElement('input');field.type='url';field.value=u;field.setAttribute('aria-label',`GIF ${i+1} URL`);
  field.addEventListener('change',()=>{drafts.get(selected.slug).images[i]=safeUrl(field.value);renderStage();});
  const remove=document.createElement('button');remove.textContent='Remove';remove.addEventListener('click',()=>{drafts.get(selected.slug).images.splice(i,1);renderImages();renderStage();});row.append(field,remove);wrap.append(row);
});}
function populate(){const s=drafts.get(selected.slug);for(const k of ['url','name','title','time','body','direction'])q(k).value=s[k];q('timeField').hidden=selected.type!=='comms';q('directionField').hidden=selected.type!=='comms';renderImages();renderStage();q('status').textContent='';}
function choose(slug){selected=designs.find(d=>d.slug===slug)||designs[0];if(viewingAll)toggleGallery(false);populate();}
function renderGallery(){q('gallery').replaceChildren();designs.forEach(d=>{const card=document.createElement('article');card.classList.toggle('dark',mode()==='dark');const head=document.createElement('div');head.className='gallery-head';const label=document.createElement('div');label.innerHTML=`<h2>${d.name}</h2><p>${d.type.toUpperCase()} ${d.number} · ${d.gifs} DEFAULT GIF${d.gifs===1?'':'S'}</p>`;const edit=document.createElement('button');edit.textContent='Edit & copy';edit.addEventListener('click',()=>{choose(d.slug);window.scrollTo({top:0,behavior:'smooth'});});head.append(label,edit);const frame=document.createElement('iframe');frame.title=d.name+' preview';frame.setAttribute('sandbox','allow-same-origin');card.append(head,frame);q('gallery').append(card);fillFrame(frame,d,drafts.get(d.slug));});}
function toggleGallery(value){viewingAll=value;q('layout').hidden=value;q('gallery').hidden=!value;q('all').setAttribute('aria-pressed',String(value));q('all').textContent=value?'Return to editor':'View all 15 designs';if(value)renderGallery();else renderStage();}
function refresh(){if(viewingAll)renderGallery();else renderStage();}
for(const type of ['thread','comms','bud']){const heading=document.createElement('h2');heading.textContent=type==='bud'?'Buds':type==='thread'?'Threads':'Comms';q('designs').append(heading);designs.filter(d=>d.type===type).forEach(d=>{const b=document.createElement('button');b.dataset.slug=d.slug;b.innerHTML=`<span>${d.number}</span> ${d.name}`;b.addEventListener('click',()=>choose(d.slug));q('designs').append(b);});}
for(const k of ['url','name','title','time','body','direction'])q(k).addEventListener('input',()=>{let s=drafts.get(selected.slug),v=q(k).value;s[k]=k==='body'?sanitize(v):k==='url'?safeUrl(v):v;renderStage();});
q('addGif').addEventListener('click',()=>{let s=drafts.get(selected.slug);s.images.push(gifs[s.images.length%2]);renderImages();renderStage();});
q('previous').addEventListener('click',()=>choose(designs[(designs.indexOf(selected)+14)%15].slug));q('next').addEventListener('click',()=>choose(designs[(designs.indexOf(selected)+1)%15].slug));
q('mode').addEventListener('change',refresh);q('width').addEventListener('change',refresh);colourIds.forEach(id=>q(id).addEventListener('input',refresh));q('palette').addEventListener('change',()=>{palettes[q('palette').value].forEach((v,i)=>q(colourIds[i]).value=v);refresh();});
q('all').addEventListener('click',()=>toggleGallery(!viewingAll));q('reset').addEventListener('click',()=>{drafts.set(selected.slug,initial(selected));populate();});
q('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(q('code').value);q('status').textContent='Copied the complete [dohtml] snippet.';}catch(e){q('source').open=true;q('code').focus();q('code').select();q('status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}});
q('download').addEventListener('click',()=>{const file=new Blob([q('code').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download=`bingsu-${selected.slug}-${selected.type}-${selected.number}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);q('status').textContent='Downloaded this design with your edits.';});
matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{if(q('mode').value==='system')refresh();});
populate();
