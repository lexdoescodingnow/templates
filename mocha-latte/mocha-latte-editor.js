const mochaLatteDesigns = JSON.parse(document.querySelector('#mocha-latte-designs').textContent);
const mochaLatteStates = mochaLatteDesigns.map(mochaLatteDefaults);
let mochaLatteIndex = 0;
let mochaLatteGallery = false;
const $ = selector => document.querySelector(selector);
const labels = {thread:'Threads',comms:'Comms',bud:'Buds'};
function mochaLatteSafeUrl(value,placeholder=true) {
  const text=value.trim();
  if(placeholder&&text==='[url]') return text;
  if(!text) return '';
  try { const u=new URL(text); return ['http:','https:'].includes(u.protocol)?text:'#'; } catch { return '#'; }
}
function mochaLatteCleanWriting(input) {
  let html=input.replace(/\[(\/?)(b|i|u)\]/gi,'<$1$2>');
  if(!/<p[\s>]/i.test(html)) html=html.split(/\n\s*\n/).filter(x=>x.trim()).map(x=>`<p>${x.replace(/\n/g,'<br>')}</p>`).join('\n');
  const root=document.createElement('template');root.innerHTML=html;
  function clean(parent) {
    for(const node of [...parent.childNodes]) {
      if(node.nodeType===8){node.remove();continue;}
      if(node.nodeType!==1)continue;
      if(['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','FORM','INPUT'].includes(node.tagName)){node.remove();continue;}
      clean(node);
      if(!['P','BR','B','STRONG','I','EM','U','A'].includes(node.tagName)){node.replaceWith(...node.childNodes);continue;}
      const href=node.tagName==='A'?mochaLatteSafeUrl(node.getAttribute('href')||''):null;
      [...node.attributes].forEach(a=>node.removeAttribute(a.name));
      if(href)node.setAttribute('href',href);
    }
  }
  clean(root.content);return root.innerHTML;
}
function mochaLatteDisplayState(design,state) { return {...state,name:state.name==='[name]'?'Taeyang · Elias · Yujun':state.name,title:state.title==='[text]'?design.sample:state.title,url:state.url==='[url]'?'#':state.url}; }
function mochaLatteRender() {
  const d=mochaLatteDesigns[mochaLatteIndex],s=mochaLatteStates[mochaLatteIndex];
  $('#pv-stage').innerHTML=mochaLatteMarkup(d,mochaLatteDisplayState(d,s));
  $('#pv-code').value=mochaLatteSnippet(d,s);
  $('#pv-design-title').textContent=d.name;
  $('#pv-design-description').textContent=d.description;
  const wordText=document.createElement('div');wordText.innerHTML=s.body;
  const count=(wordText.textContent.trim().match(/\S+/g)||[]).length;
  $('#pv-word-count').textContent=`${count} words${d.type==='bud'?' · 100 suggested':''}`;
  document.querySelectorAll('.pv-choice').forEach((el,i)=>el.setAttribute('aria-current',String(i===mochaLatteIndex)));
  $('#pv-status').textContent='';
}
function mochaLatteRenderGifs() {
  const group=$('#pv-gifs');group.replaceChildren();
  mochaLatteStates[mochaLatteIndex].gifs.forEach((gif,index)=>{
    const box=document.createElement('div');box.className='pv-gif';
    box.innerHTML=`<label class="pv-field">GIF ${index+1} URL<input type="url" data-gif="${index}" value="${mochaLatteEscape(gif.url)}"></label><div class="pv-gif-end"><label class="pv-field">Crop position<input data-position="${index}" value="${mochaLatteEscape(gif.position)}"></label><button type="button" data-remove="${index}" aria-label="Remove GIF ${index+1}">Remove</button></div>`;
    group.append(box);
  });
}
function mochaLatteSelect(index) {
  mochaLatteIndex=(index+mochaLatteDesigns.length)%mochaLatteDesigns.length;
  const d=mochaLatteDesigns[mochaLatteIndex],s=mochaLatteStates[mochaLatteIndex];
  $('#pv-name').value=s.name;$('#pv-title').value=s.title;$('#pv-url').value=s.url;$('#pv-time').value=s.time;$('#pv-flow').value=s.flow;$('#pv-body').value=s.body;
  $('#pv-device-fields').hidden=d.type!=='comms';
  $('#pv-title-label').textContent=d.type==='comms'?'Status':'Title';
  mochaLatteRenderGifs();mochaLatteRender();
}
function mochaLatteBuildGallery() {
  const gallery=$('#pv-gallery');gallery.replaceChildren();
  mochaLatteDesigns.forEach((d,i)=>{
    const tile=document.createElement('section');tile.className='pv-tile';
    tile.innerHTML=`<div class="pv-tile-head"><h2>${mochaLatteEscape(d.name)}<small>${d.type==='bud'?'Buds':d.type} ${d.number} · Mocha & Latte</small></h2><button data-open="${i}">Edit & copy</button></div><div class="pv-tile-stage">${mochaLatteMarkup(d,mochaLatteDisplayState(d,mochaLatteStates[i]))}</div>`;
    gallery.append(tile);
  });
}
function mochaLatteToggleGallery(value) {
  mochaLatteGallery=value;$('#pv-workspace').hidden=value;$('#pv-gallery').hidden=!value;
  $('#pv-view-all').textContent=value?'Back to editor':'View all 15';$('#pv-view-all').setAttribute('aria-pressed',String(value));
  if(value)mochaLatteBuildGallery();
}
const nav=$('#pv-nav');
Object.entries(labels).forEach(([kind,label])=>{
  const heading=document.createElement('h2');heading.textContent=label;nav.append(heading);
  mochaLatteDesigns.forEach((d,i)=>{if(d.type===kind){const button=document.createElement('button');button.className='pv-choice';button.innerHTML=`<span>${d.number}</span>${mochaLatteEscape(d.name)}`;button.onclick=()=>mochaLatteSelect(i);nav.append(button);}});
});
$('#pv-editor').addEventListener('input',event=>{
  const e=event.target,s=mochaLatteStates[mochaLatteIndex];
  if(e.id==='pv-name')s.name=e.value;
  else if(e.id==='pv-title')s.title=e.value;
  else if(e.id==='pv-url')s.url=mochaLatteSafeUrl(e.value);
  else if(e.id==='pv-time')s.time=e.value;
  else if(e.id==='pv-flow')s.flow=e.value;
  else if(e.id==='pv-body')s.body=mochaLatteCleanWriting(e.value);
  else if(e.hasAttribute('data-gif'))s.gifs[Number(e.dataset.gif)].url=mochaLatteSafeUrl(e.value,false);
  else if(e.hasAttribute('data-position')){s.gifs[Number(e.dataset.position)].position=/^\d{1,3}%\s+\d{1,3}%$/.test(e.value.trim())?e.value.trim():'50% 50%';}
  mochaLatteRender();
});
$('#pv-gifs').addEventListener('click',event=>{const b=event.target.closest('[data-remove]');if(b){mochaLatteStates[mochaLatteIndex].gifs.splice(Number(b.dataset.remove),1);mochaLatteRenderGifs();mochaLatteRender();}});
$('#pv-add-gif').onclick=()=>{const gifs=mochaLatteStates[mochaLatteIndex].gifs;gifs.push({url:MOCHA_LATTE_GIFS[gifs.length%3],position:'50% 35%'});mochaLatteRenderGifs();mochaLatteRender();};
$('#pv-previous').onclick=()=>mochaLatteSelect(mochaLatteIndex-1);$('#pv-next').onclick=()=>mochaLatteSelect(mochaLatteIndex+1);
$('#pv-view-all').onclick=()=>mochaLatteToggleGallery(!mochaLatteGallery);
$('#pv-gallery').addEventListener('click',event=>{const b=event.target.closest('[data-open]');if(b){mochaLatteToggleGallery(false);mochaLatteSelect(Number(b.dataset.open));window.scrollTo({top:0,behavior:'instant'});}});
$('#pv-mode').onchange=event=>{if(event.target.value==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',event.target.value);};
$('#pv-width').onchange=event=>{$('#pv-stage').style.width=event.target.value==='full'?'100%':event.target.value+'px';};
const mochaLattePalettes={blend:['#97677d','#8e84b8','#528f89'],lagoon:['#148578','#397bbc','#a260b4'],ember:['#bb6541','#ac465e','#8064ad'],mono:['#777777','#989898','#666666']};
function mochaLatteApplyPalette(values) { values.forEach((hex,i)=>{const n=parseInt(hex.slice(1),16);document.documentElement.style.setProperty(`--mgrgb${i+1}`,`${n>>16},${n>>8&255},${n&255}`);$(`#pv-colour-${i+1}`).value=hex;}); }
$('#pv-palette').onchange=event=>{if(mochaLattePalettes[event.target.value])mochaLatteApplyPalette(mochaLattePalettes[event.target.value]);};
[1,2,3].forEach(i=>$(`#pv-colour-${i}`).oninput=()=>{mochaLatteApplyPalette([1,2,3].map(j=>$(`#pv-colour-${j}`).value));$('#pv-palette').value='custom';});
$('#pv-copy').onclick=async()=>{
  const code=$('#pv-code');
  try { await navigator.clipboard.writeText(code.value);$('#pv-status').textContent='JCink code copied.'; }
  catch { $('#pv-code-details').open=true;code.focus();code.select();$('#pv-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.'; }
};
$('#pv-download').onclick=()=>{const url=URL.createObjectURL(new Blob([$('#pv-code').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=mochaLatteFilename(mochaLatteDesigns[mochaLatteIndex]);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#pv-status').textContent='Your edited snippet is ready to save.';};
$('#pv-reset').onclick=()=>{mochaLatteStates[mochaLatteIndex]=mochaLatteDefaults(mochaLatteDesigns[mochaLatteIndex]);mochaLatteSelect(mochaLatteIndex);};
document.addEventListener('click',event=>{const a=event.target.closest('.bh-mocha-latte a');if(a&&a.getAttribute('href')==='#')event.preventDefault();});
mochaLatteSelect(0);
