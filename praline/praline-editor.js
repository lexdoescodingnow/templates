const pralineStates = new Map(PRALINE_DESIGNS.map(d=>[d.slug,pralineDefaults(d)]));
let pralineCurrent = PRALINE_DESIGNS[0];
const el=id=>document.getElementById(id);
function pralineFormat(value) { return value.replace(/\[(\/?)(b|i|u)\]/gi,(_,slash,tag)=>`<${slash}${tag.toLowerCase()}>`); }
function pralineBody(value) {
  const parsed=new DOMParser().parseFromString(pralineFormat(value),'text/html');
  const allowed=new Set(['P','B','STRONG','I','EM','U','A','BR','SPAN']);
  for(const node of [...parsed.body.querySelectorAll('*')].reverse()) {
    if(!allowed.has(node.tagName)) { if(['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH','TEMPLATE'].includes(node.tagName)) node.remove(); else node.replaceWith(...node.childNodes); continue; }
    for(const attr of [...node.attributes]) { if(node.tagName==='A'&&attr.name==='href'&&(/^(https?:|mailto:|#)/i.test(attr.value)||attr.value==='[url]')) continue; node.removeAttribute(attr.name); }
  }
  return parsed.body.innerHTML;
}
function pralineRead() {
  const s=pralineStates.get(pralineCurrent.slug);
  for(const k of ['name','url','title','time','flow']) s[k]=el(k).value;
  s.body=pralineBody(el('writing').value);
  return s;
}
function pralineDraw() {
  const s=pralineStates.get(pralineCurrent.slug);
  const visible={...s,name:s.name==='[name]'?'Dongmin & Yonggi':s.name,title:s.title==='[text]'?pralineCurrent.sample:s.title,url:'#'};
  el('stage').innerHTML=pralineMarkup(pralineCurrent,visible);
  el('code').value=pralineSnippet(pralineCurrent,s);
  const text=new DOMParser().parseFromString(s.body,'text/html').body.textContent.trim();
  const count=text?text.split(/\s+/).length:0;
  el('word-count').textContent=`${count} words${pralineCurrent.type==='bud'?' · buds are for replies of 100 words or fewer':''}`;
  el('word-count').classList.toggle('over',pralineCurrent.type==='bud'&&count>100);
}
function pralineGifFields() {
  const s=pralineStates.get(pralineCurrent.slug);
  el('gif-fields').replaceChildren();
  s.gifs.forEach((gif,index)=>{
    const row=document.createElement('div');row.className='gif-entry';
    const input=document.createElement('input');input.type='url';input.value=gif.url;input.setAttribute('aria-label',`GIF ${index+1} URL`);
    input.addEventListener('input',()=>{const value=input.value.trim();gif.url=/^https?:\/\//i.test(value)?value:'';pralineDraw();});
    const bottom=document.createElement('div');bottom.className='gif-bottom';
    const label=document.createElement('label');label.textContent='Crop';
    const crop=document.createElement('input');crop.type='range';crop.min='0';crop.max='100';crop.value=gif.position.split(' ')[1].replace('%','');crop.setAttribute('aria-label',`GIF ${index+1} vertical crop`);
    crop.addEventListener('input',()=>{gif.position=`50% ${crop.value}%`;pralineDraw();});label.append(crop);
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.addEventListener('click',()=>{s.gifs.splice(index,1);pralineGifFields();pralineDraw();});
    bottom.append(label,remove);row.append(input,bottom);el('gif-fields').append(row);
  });
}
function pralineSelect(slug) {
  pralineCurrent=PRALINE_DESIGNS.find(d=>d.slug===slug)||PRALINE_DESIGNS[0];
  const s=pralineStates.get(pralineCurrent.slug);
  for(const k of ['name','url','title','time','flow']) el(k).value=s[k];
  el('writing').value=s.body;
  el('comms-fields').hidden=pralineCurrent.type!=='comms';
  el('design-title').textContent=pralineCurrent.name;
  el('design-description').textContent=pralineCurrent.description;
  el('design-kind').textContent=`${pralineCurrent.type==='bud'?'Bud':pralineCurrent.type==='thread'?'Thread':'Comms'} ${pralineCurrent.number}`;
  for(const b of document.querySelectorAll('[data-design]'))b.setAttribute('aria-pressed',String(b.dataset.design===pralineCurrent.slug));
  el('raw-link').href=`https://github.com/lexdoescodingnow/templates/blob/main/praline/${pralineFilename(pralineCurrent)}`;
  el('status').textContent='';pralineGifFields();pralineDraw();
}
for(const b of document.querySelectorAll('[data-design]'))b.addEventListener('click',()=>pralineSelect(b.dataset.design));
for(const k of ['name','url','title','time','flow','writing'])el(k).addEventListener('input',()=>{pralineRead();pralineDraw();});
el('add-gif').addEventListener('click',()=>{const s=pralineStates.get(pralineCurrent.slug);s.gifs.push({url:PRALINE_GIFS[s.gifs.length%2],position:'50% 45%'});pralineGifFields();pralineDraw();});
el('reset').addEventListener('click',()=>{pralineStates.set(pralineCurrent.slug,pralineDefaults(pralineCurrent));pralineSelect(pralineCurrent.slug);});
el('copy').addEventListener('click',async()=>{
  const value=el('code').value;
  try { await navigator.clipboard.writeText(value);el('status').textContent='Copied with [dohtml] tags.'; }
  catch { const panel=el('code-panel');const wasOpen=panel.open;panel.open=true;el('code').focus();el('code').select();try {if(!document.execCommand('copy'))throw new Error('copy');el('status').textContent='Copied with [dohtml] tags.';panel.open=wasOpen;}catch{el('status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';} }
});
el('download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('code').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=pralineFilename(pralineCurrent);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el('status').textContent='Your edited snippet is ready.';});
el('theme').addEventListener('change',()=>document.documentElement.setAttribute('color-mode',el('theme').value));
for(let i=1;i<=3;i++)el('colour-'+i).addEventListener('input',()=>{const hex=el('colour-'+i).value;document.documentElement.style.setProperty('--mgrgb'+i,[1,3,5].map(start=>parseInt(hex.slice(start,start+2),16)).join(','));});
pralineSelect(PRALINE_DESIGNS[0].slug);

el('preview-width').addEventListener('change',()=>el('stage').style.width=el('preview-width').value);
