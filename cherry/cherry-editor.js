const cherryStates = new Map(CHERRY_DESIGNS.map(d=>[d.slug,cherryDefaults(d)]));
let cherryCurrent = CHERRY_DESIGNS[0];
const el=id=>document.getElementById(id);
function cherryFormat(value) { return value.replace(/\[(\/?)(b|i|u)\]/gi,(_,slash,tag)=>`<${slash}${tag.toLowerCase()}>`); }
function cherryBody(value) {
  const parsed=new DOMParser().parseFromString(cherryFormat(value),'text/html');
  const allowed=new Set(['P','B','STRONG','I','EM','U','A','BR','SPAN']);
  for(const node of [...parsed.body.querySelectorAll('*')].reverse()) {
    if(!allowed.has(node.tagName)) { if(['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH','TEMPLATE'].includes(node.tagName)) node.remove(); else node.replaceWith(...node.childNodes); continue; }
    for(const attr of [...node.attributes]) { if(node.tagName==='A'&&attr.name==='href'&&(/^(https?:|mailto:|#)/i.test(attr.value)||attr.value==='[url]')) continue; node.removeAttribute(attr.name); }
  }
  return parsed.body.innerHTML;
}
function cherryRead() {
  const s=cherryStates.get(cherryCurrent.slug);
  for(const k of ['name','url','title','time','flow']) s[k]=el(k).value;
  s.body=cherryBody(el('writing').value);
  return s;
}
function cherryDraw() {
  const s=cherryStates.get(cherryCurrent.slug);
  const visible={...s,name:s.name==='[name]'?'Jaehwa & Ubin':s.name,title:s.title==='[text]'?cherryCurrent.sample:s.title,url:'#'};
  el('stage').innerHTML=cherryMarkup(cherryCurrent,visible);
  el('code').value=cherrySnippet(cherryCurrent,s);
  const text=new DOMParser().parseFromString(s.body,'text/html').body.textContent.trim();
  const count=text?text.split(/\s+/).length:0;
  el('word-count').textContent=`${count} words${cherryCurrent.type==='bud'?' · buds are for replies of 100 words or fewer':''}`;
  el('word-count').classList.toggle('over',cherryCurrent.type==='bud'&&count>100);
}
function cherryGifFields() {
  const s=cherryStates.get(cherryCurrent.slug);
  el('gif-fields').replaceChildren();
  s.gifs.forEach((gif,index)=>{
    const row=document.createElement('div');row.className='gif-entry';
    const input=document.createElement('input');input.type='url';input.value=gif.url;input.setAttribute('aria-label',`GIF ${index+1} URL`);
    input.addEventListener('input',()=>{const value=input.value.trim();gif.url=/^https?:\/\//i.test(value)?value:'';cherryDraw();});
    const bottom=document.createElement('div');bottom.className='gif-bottom';
    const label=document.createElement('label');label.textContent='Crop';
    const crop=document.createElement('input');crop.type='range';crop.min='0';crop.max='100';crop.value=gif.position.split(' ')[1].replace('%','');crop.setAttribute('aria-label',`GIF ${index+1} vertical crop`);
    crop.addEventListener('input',()=>{gif.position=`50% ${crop.value}%`;cherryDraw();});label.append(crop);
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.addEventListener('click',()=>{s.gifs.splice(index,1);cherryGifFields();cherryDraw();});
    bottom.append(label,remove);row.append(input,bottom);el('gif-fields').append(row);
  });
}
function cherrySelect(slug) {
  cherryCurrent=CHERRY_DESIGNS.find(d=>d.slug===slug)||CHERRY_DESIGNS[0];
  const s=cherryStates.get(cherryCurrent.slug);
  for(const k of ['name','url','title','time','flow']) el(k).value=s[k];
  el('writing').value=s.body;
  el('comms-fields').hidden=cherryCurrent.type!=='comms';
  el('design-title').textContent=cherryCurrent.name;
  el('design-description').textContent=cherryCurrent.description;
  el('design-kind').textContent=`${cherryCurrent.type==='bud'?'Bud':cherryCurrent.type==='thread'?'Thread':'Comms'} ${cherryCurrent.number}`;
  for(const b of document.querySelectorAll('[data-design]'))b.setAttribute('aria-pressed',String(b.dataset.design===cherryCurrent.slug));
  el('raw-link').href=`https://github.com/lexdoescodingnow/templates/blob/main/cherry/${cherryFilename(cherryCurrent)}`;
  el('status').textContent='';cherryGifFields();cherryDraw();
}
for(const b of document.querySelectorAll('[data-design]'))b.addEventListener('click',()=>cherrySelect(b.dataset.design));
for(const k of ['name','url','title','time','flow','writing'])el(k).addEventListener('input',()=>{cherryRead();cherryDraw();});
el('add-gif').addEventListener('click',()=>{const s=cherryStates.get(cherryCurrent.slug);s.gifs.push({url:CHERRY_GIFS[s.gifs.length%2],position:'50% 45%'});cherryGifFields();cherryDraw();});
el('reset').addEventListener('click',()=>{cherryStates.set(cherryCurrent.slug,cherryDefaults(cherryCurrent));cherrySelect(cherryCurrent.slug);});
el('copy').addEventListener('click',async()=>{
  const value=el('code').value;
  try { await navigator.clipboard.writeText(value);el('status').textContent='Copied with [dohtml] tags.'; }
  catch { const panel=el('code-panel');const wasOpen=panel.open;panel.open=true;el('code').focus();el('code').select();try {if(!document.execCommand('copy'))throw new Error('copy');el('status').textContent='Copied with [dohtml] tags.';panel.open=wasOpen;}catch{el('status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';} }
});
el('download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('code').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=cherryFilename(cherryCurrent);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el('status').textContent='Your edited snippet is ready.';});
el('theme').addEventListener('change',()=>document.documentElement.setAttribute('color-mode',el('theme').value));
for(let i=1;i<=3;i++)el('colour-'+i).addEventListener('input',()=>{const hex=el('colour-'+i).value;document.documentElement.style.setProperty('--mgrgb'+i,[1,3,5].map(start=>parseInt(hex.slice(start,start+2),16)).join(','));});
cherrySelect(CHERRY_DESIGNS[0].slug);
