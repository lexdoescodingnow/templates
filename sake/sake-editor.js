const sakeStates = new Map(SAKE_DESIGNS.map(d=>[d.slug,sakeDefaults(d)]));
let sakeCurrent = SAKE_DESIGNS[0];
const el=id=>document.getElementById(id);
function sakeFormat(value) { return value.replace(/\[(\/?)(b|i|u)\]/gi,(_,slash,tag)=>`<${slash}${tag.toLowerCase()}>`); }
function sakeBody(value) {
  const parsed=new DOMParser().parseFromString(sakeFormat(value),'text/html');
  const allowed=new Set(['P','B','STRONG','I','EM','U','A','BR','SPAN']);
  for(const node of [...parsed.body.querySelectorAll('*')].reverse()) {
    if(!allowed.has(node.tagName)) { if(['SCRIPT','STYLE','IFRAME','OBJECT','SVG','MATH','TEMPLATE'].includes(node.tagName)) node.remove(); else node.replaceWith(...node.childNodes); continue; }
    for(const attr of [...node.attributes]) { if(node.tagName==='A'&&attr.name==='href'&&(/^(https?:|mailto:|#)/i.test(attr.value)||attr.value==='[url]')) continue; node.removeAttribute(attr.name); }
  }
  const walker=parsed.createTreeWalker(parsed.body,NodeFilter.SHOW_COMMENT);
  const comments=[]; while(walker.nextNode())comments.push(walker.currentNode); comments.forEach(c=>c.remove());
  return parsed.body.innerHTML;
}
function sakeRead() {
  const s=sakeStates.get(sakeCurrent.slug);
  for(const k of ['name','url','title','time','flow']) s[k]=el(k).value;
  s.body=sakeBody(el('writing').value);
  return s;
}
function sakeDraw() {
  const s=sakeStates.get(sakeCurrent.slug);
  const visible={...s,name:s.name==='[name]'?(sakeCurrent.type==='comms'?'Miles':'Jett & Miles'):s.name,title:s.title==='[text]'?sakeCurrent.sample:s.title,url:'#'};
  el('stage').innerHTML=sakeMarkup(sakeCurrent,visible);
  el('code').value=sakeSnippet(sakeCurrent,s);
  const text=new DOMParser().parseFromString(s.body,'text/html').body.textContent.trim();
  const count=text?text.split(/\s+/).length:0;
  el('word-count').textContent=`${count} words${sakeCurrent.type==='bud'?' · buds are for replies of 100 words or fewer':''}`;
  el('word-count').classList.toggle('over',sakeCurrent.type==='bud'&&count>100);
}
function sakeGifFields() {
  const s=sakeStates.get(sakeCurrent.slug);
  el('gif-fields').replaceChildren();
  s.gifs.forEach((gif,index)=>{
    const row=document.createElement('div');row.className='gif-entry';
    const input=document.createElement('input');input.type='url';input.value=gif.url;input.setAttribute('aria-label',`GIF ${index+1} URL`);
    input.addEventListener('input',()=>{const value=input.value.trim();gif.url=/^https?:\/\//i.test(value)?value:'';sakeDraw();});
    const bottom=document.createElement('div');bottom.className='gif-bottom';
    const label=document.createElement('label');label.textContent='Crop';
    const crop=document.createElement('input');crop.type='range';crop.min='0';crop.max='100';crop.value=gif.position.split(' ')[1].replace('%','');crop.setAttribute('aria-label',`GIF ${index+1} vertical crop`);
    crop.addEventListener('input',()=>{gif.position=`50% ${crop.value}%`;sakeDraw();});label.append(crop);
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.addEventListener('click',()=>{s.gifs.splice(index,1);sakeGifFields();sakeDraw();});
    bottom.append(label,remove);row.append(input,bottom);el('gif-fields').append(row);
  });
}
function sakeSelect(slug) {
  sakeCurrent=SAKE_DESIGNS.find(d=>d.slug===slug)||SAKE_DESIGNS[0];
  const s=sakeStates.get(sakeCurrent.slug);
  for(const k of ['name','url','title','time','flow']) el(k).value=s[k];
  el('writing').value=s.body;
  el('comms-fields').hidden=sakeCurrent.type!=='comms';
  el('design-title').textContent=sakeCurrent.name;
  el('design-description').textContent=sakeCurrent.description;
  el('design-kind').textContent=`${sakeCurrent.type==='bud'?'Bud':sakeCurrent.type==='thread'?'Thread':'Comms'} ${sakeCurrent.number}`;
  for(const b of document.querySelectorAll('[data-design]'))b.setAttribute('aria-pressed',String(b.dataset.design===sakeCurrent.slug));
  el('raw-link').href=`https://github.com/lexdoescodingnow/templates/blob/main/sake/${sakeFilename(sakeCurrent)}`;
  el('status').textContent='';sakeGifFields();sakeDraw();
}
for(const b of document.querySelectorAll('[data-design]'))b.addEventListener('click',()=>sakeSelect(b.dataset.design));
for(const k of ['name','url','title','time','flow','writing'])el(k).addEventListener('input',()=>{sakeRead();sakeDraw();});
el('add-gif').addEventListener('click',()=>{const s=sakeStates.get(sakeCurrent.slug);s.gifs.push({url:SAKE_GIFS[s.gifs.length%2],position:'50% 45%'});sakeGifFields();sakeDraw();});
el('reset').addEventListener('click',()=>{sakeStates.set(sakeCurrent.slug,sakeDefaults(sakeCurrent));sakeSelect(sakeCurrent.slug);});
el('copy').addEventListener('click',async()=>{
  const value=el('code').value;
  try { await navigator.clipboard.writeText(value);el('status').textContent='Copied with [dohtml] tags.'; }
  catch { const panel=el('code-panel');const wasOpen=panel.open;panel.open=true;el('code').focus();el('code').select();try {if(!document.execCommand('copy'))throw new Error('copy');el('status').textContent='Copied with [dohtml] tags.';panel.open=wasOpen;}catch{el('status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';} }
});
el('download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('code').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=sakeFilename(sakeCurrent);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el('status').textContent='Your edited snippet is ready.';});
el('theme').addEventListener('change',()=>document.documentElement.setAttribute('color-mode',el('theme').value));
for(let i=1;i<=3;i++)el('colour-'+i).addEventListener('input',()=>{const hex=el('colour-'+i).value;document.documentElement.style.setProperty('--mgrgb'+i,[1,3,5].map(start=>parseInt(hex.slice(start,start+2),16)).join(','));});
sakeSelect(SAKE_DESIGNS[0].slug);

el('preview-width').addEventListener('change',()=>el('stage').style.width=el('preview-width').value);

