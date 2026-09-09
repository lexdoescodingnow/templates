const raspberryDesigns = JSON.parse(document.querySelector('#raspberry-designs').textContent);
const raspberryStates = raspberryDesigns.map(raspberryDefaults);
let raspberryIndex = 0;
let raspberryGallery = false;
const $ = selector => document.querySelector(selector);
const labels = {thread:'Threads',comms:'Comms',bud:'Buds'};
function raspberrySafeUrl(value,placeholder=true) {
  const text=value.trim();
  if(placeholder&&text==='[url]') return text;
  if(!text) return '';
  try { const u=new URL(text); return ['http:','https:'].includes(u.protocol)?text:'#'; } catch { return '#'; }
}
function raspberryCleanWriting(input) {
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
      const href=node.tagName==='A'?raspberrySafeUrl(node.getAttribute('href')||''):null;
      [...node.attributes].forEach(a=>node.removeAttribute(a.name));
      if(href)node.setAttribute('href',href);
    }
  }
  clean(root.content);return root.innerHTML;
}
function raspberryDisplayState(design,state) { return {...state,name:state.name==='[name]'?'Jian & Kijoon':state.name,title:state.title==='[text]'?design.sample:state.title,url:state.url==='[url]'?'#':state.url}; }
function raspberryRender() {
  const d=raspberryDesigns[raspberryIndex],s=raspberryStates[raspberryIndex];
  $('#pv-stage').innerHTML=raspberryMarkup(d,raspberryDisplayState(d,s));
  $('#pv-code').value=raspberrySnippet(d,s);
  $('#pv-design-title').textContent=d.name;
  $('#pv-design-description').textContent=d.description;
  const wordText=document.createElement('div');wordText.innerHTML=s.body;
  const count=(wordText.textContent.trim().match(/\S+/g)||[]).length;
  $('#pv-word-count').textContent=`${count} words${d.type==='bud'?' · 100 suggested':''}`;
  document.querySelectorAll('.pv-choice').forEach((el,i)=>el.setAttribute('aria-current',String(i===raspberryIndex)));
  $('#pv-status').textContent='';
}
function raspberryRenderGifs() {
  const group=$('#pv-gifs');group.replaceChildren();
  raspberryStates[raspberryIndex].gifs.forEach((gif,index)=>{
    const box=document.createElement('div');box.className='pv-gif';
    box.innerHTML=`<label class="pv-field">GIF ${index+1} URL<input type="url" data-gif="${index}" value="${raspberryEscape(gif.url)}"></label><div class="pv-gif-end"><label class="pv-field">Crop position<input data-position="${index}" value="${raspberryEscape(gif.position)}"></label><button type="button" data-remove="${index}" aria-label="Remove GIF ${index+1}">Remove</button></div>`;
    group.append(box);
  });
}
function raspberrySelect(index) {
  raspberryIndex=(index+raspberryDesigns.length)%raspberryDesigns.length;
  const d=raspberryDesigns[raspberryIndex],s=raspberryStates[raspberryIndex];
  $('#pv-name').value=s.name;$('#pv-title').value=s.title;$('#pv-url').value=s.url;$('#pv-time').value=s.time;$('#pv-flow').value=s.flow;$('#pv-body').value=s.body;
  $('#pv-device-fields').hidden=d.type!=='comms';
  $('#pv-title-label').textContent=d.type==='comms'?'Status':'Title';
  raspberryRenderGifs();raspberryRender();
}
function raspberryBuildGallery() {
  const gallery=$('#pv-gallery');gallery.replaceChildren();
  raspberryDesigns.forEach((d,i)=>{
    const tile=document.createElement('section');tile.className='pv-tile';
    tile.innerHTML=`<div class="pv-tile-head"><h2>${raspberryEscape(d.name)}<small>${d.type==='bud'?'Buds':d.type} ${d.number} · Raspberry</small></h2><button data-open="${i}">Edit & copy</button></div><div class="pv-tile-stage">${raspberryMarkup(d,raspberryDisplayState(d,raspberryStates[i]))}</div>`;
    gallery.append(tile);
  });
}
function raspberryToggleGallery(value) {
  raspberryGallery=value;$('#pv-workspace').hidden=value;$('#pv-gallery').hidden=!value;
  $('#pv-view-all').textContent=value?'Back to editor':'View all 15';$('#pv-view-all').setAttribute('aria-pressed',String(value));
  if(value)raspberryBuildGallery();
}
const nav=$('#pv-nav');
Object.entries(labels).forEach(([kind,label])=>{
  const heading=document.createElement('h2');heading.textContent=label;nav.append(heading);
  raspberryDesigns.forEach((d,i)=>{if(d.type===kind){const button=document.createElement('button');button.className='pv-choice';button.innerHTML=`<span>${d.number}</span>${raspberryEscape(d.name)}`;button.onclick=()=>raspberrySelect(i);nav.append(button);}});
});
$('#pv-editor').addEventListener('input',event=>{
  const e=event.target,s=raspberryStates[raspberryIndex];
  if(e.id==='pv-name')s.name=e.value;
  else if(e.id==='pv-title')s.title=e.value;
  else if(e.id==='pv-url')s.url=raspberrySafeUrl(e.value);
  else if(e.id==='pv-time')s.time=e.value;
  else if(e.id==='pv-flow')s.flow=e.value;
  else if(e.id==='pv-body')s.body=raspberryCleanWriting(e.value);
  else if(e.hasAttribute('data-gif'))s.gifs[Number(e.dataset.gif)].url=raspberrySafeUrl(e.value,false);
  else if(e.hasAttribute('data-position')){s.gifs[Number(e.dataset.position)].position=/^\d{1,3}%\s+\d{1,3}%$/.test(e.value.trim())?e.value.trim():'50% 50%';}
  raspberryRender();
});
$('#pv-gifs').addEventListener('click',event=>{const b=event.target.closest('[data-remove]');if(b){raspberryStates[raspberryIndex].gifs.splice(Number(b.dataset.remove),1);raspberryRenderGifs();raspberryRender();}});
$('#pv-add-gif').onclick=()=>{const gifs=raspberryStates[raspberryIndex].gifs;gifs.push({url:RASPBERRY_GIFS[gifs.length%2],position:'50% 35%'});raspberryRenderGifs();raspberryRender();};
$('#pv-previous').onclick=()=>raspberrySelect(raspberryIndex-1);$('#pv-next').onclick=()=>raspberrySelect(raspberryIndex+1);
$('#pv-view-all').onclick=()=>raspberryToggleGallery(!raspberryGallery);
$('#pv-gallery').addEventListener('click',event=>{const b=event.target.closest('[data-open]');if(b){raspberryToggleGallery(false);raspberrySelect(Number(b.dataset.open));window.scrollTo({top:0,behavior:'instant'});}});
$('#pv-mode').onchange=event=>{if(event.target.value==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',event.target.value);};
$('#pv-width').onchange=event=>{$('#pv-stage').style.width=event.target.value==='full'?'100%':event.target.value+'px';};
const raspberryPalettes={berry:['#b8527b','#8772af','#427e81'],lagoon:['#148578','#397bbc','#a260b4'],ember:['#bb6541','#ac465e','#8064ad'],mono:['#777777','#989898','#666666']};
function raspberryApplyPalette(values) { values.forEach((hex,i)=>{const n=parseInt(hex.slice(1),16);document.documentElement.style.setProperty(`--mgrgb${i+1}`,`${n>>16},${n>>8&255},${n&255}`);$(`#pv-colour-${i+1}`).value=hex;}); }
$('#pv-palette').onchange=event=>{if(raspberryPalettes[event.target.value])raspberryApplyPalette(raspberryPalettes[event.target.value]);};
[1,2,3].forEach(i=>$(`#pv-colour-${i}`).oninput=()=>{raspberryApplyPalette([1,2,3].map(j=>$(`#pv-colour-${j}`).value));$('#pv-palette').value='custom';});
$('#pv-copy').onclick=async()=>{
  const code=$('#pv-code');
  try { await navigator.clipboard.writeText(code.value);$('#pv-status').textContent='JCink code copied.'; }
  catch { $('#pv-code-details').open=true;code.focus();code.select();$('#pv-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.'; }
};
$('#pv-download').onclick=()=>{const url=URL.createObjectURL(new Blob([$('#pv-code').value],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=raspberryFilename(raspberryDesigns[raspberryIndex]);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#pv-status').textContent='Your edited snippet is ready to save.';};
$('#pv-reset').onclick=()=>{raspberryStates[raspberryIndex]=raspberryDefaults(raspberryDesigns[raspberryIndex]);raspberrySelect(raspberryIndex);};
document.addEventListener('click',event=>{const a=event.target.closest('.bh-raspberry a');if(a&&a.getAttribute('href')==='#')event.preventDefault();});
raspberrySelect(0);

