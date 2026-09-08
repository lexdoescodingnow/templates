const COCONUT_CSS_URL='https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/coconut/coconut-collection-v1.css';
const COCONUT_GIFS=['https://64.media.tumblr.com/6f63db21e41671766cdb2dfd6addb4de/4cfd53987a3afb2f-1f/s250x400/118d3db19a8718658969148ea1079ec98e4a5829.gifv','https://64.media.tumblr.com/292342b1d1cbeb53086c9dee04a830f9/4cfd53987a3afb2f-76/s400x600/bfc0e95e6ceecf13173bfa11740d8072f1b71b17.gifv'];
const COCONUT_COPY={
thread:'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Aliquam erat volutpat.</b> Mauris ut felis vel nulla finibus consequat. Donec vitae risus ac sapien posuere malesuada. Curabitur sed mi ac arcu tincidunt vestibulum, eget porta urna.</p>\n<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Nulla facilisi.</i> Integer at diam vitae justo aliquam tincidunt. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>\n<p>Praesent sit amet nibh non lectus vestibulum tincidunt. <u>Morbi tempus neque sed.</u> Nam nec nibh at lacus luctus elementum. Aenean semper tellus vitae metus tincidunt, in interdum lacus interdum. Donec finibus nunc vel magna pharetra, at mattis lacus aliquam.</p>',
comms:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b></p>\n<p>Aliquam erat volutpat. <i>Integer vel ipsum vitae.</i></p>\n<p><u>Donec consequat.</u> Sed fermentum libero et risus consectetur.</p>',
bud:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Aenean vitae lacus sit amet neque tincidunt placerat. <i>Aliquam erat volutpat.</i> Donec finibus nunc vel magna pharetra. <u>Morbi tempus neque sed.</u> Praesent sit amet nibh non lectus vestibulum tincidunt.</p>'
};
const COCONUT_ICONS={
shell:'<svg viewBox="0 0 64 46" aria-hidden="true"><ellipse cx="32" cy="16" rx="24" ry="10" transform="rotate(-8 32 16)"/><ellipse cx="32" cy="16" rx="19" ry="6.5" transform="rotate(-8 32 16)"/><path d="M8 17c2 18 18 27 31 19 11-6 15-17 17-22M15 27l3-1m6 7 3-1m11 0 3-3m6-6 3-3M15 19q5 1 8 0"/></svg>',
frond:'<svg viewBox="0 0 64 46" aria-hidden="true"><path d="M8 41Q25 12 57 6M14 31Q6 22 12 13M19 24Q11 13 21 7M25 19Q21 8 32 3M33 14Q34 4 45 2M15 31Q29 33 34 26M21 23Q35 26 42 18M29 17Q43 19 50 12M39 11Q50 13 58 7"/></svg>',
knot:'<svg viewBox="0 0 64 46" aria-hidden="true"><path d="M19 24c-13-16 3-26 13-9l10 16c7 12 22 1 10-10L27 9C13 2 4 18 19 24l23 10M15 19l25 11c14 7 22-9 7-15L24 2M24 24l-9 17m18-11-5 12"/></svg>',
drop:'<svg viewBox="0 0 64 46" aria-hidden="true"><path d="M31 3C25 12 18 21 18 29a14 14 0 0 0 28 0C46 19 37 11 31 3Z"/><path d="M24 29q0 8 8 9M9 36q3-3 5 0m37 2q3-3 5 0"/></svg>'
};
const COCONUT_DESIGNS=[
{name:'Copra Silhouette',slug:'copra-silhouette',type:'thread',number:'01',gifs:1,icon:'shell',sample:'a shelter made of you',description:'An organic coconut portrait beside an italic title, with an angled colour wash and a fine protective frame.'},
{name:'Palmshade Pavilion',slug:'palmshade-pavilion',type:'thread',number:'02',gifs:0,icon:'frond',sample:'beneath the quiet palms',description:'An open literary page with a palm-shadow fan, spacious serif writing and a crisp member-colour masthead.'},
{name:'Twin Husk',slug:'twin-husk',type:'thread',number:'03',gifs:2,icon:'shell',sample:'where our edges meet',description:'Two curved coconut halves, joined by a fine seam, above a paired-portrait literary panel.'},
{name:'Coirbound',slug:'coirbound',type:'thread',number:'04',gifs:1,icon:'knot',sample:'woven into the everyday',description:'A woven book-jacket edge, a narrow portrait and a long writing column with a small coir-knot signature.'},
{name:'Coconut Water',slug:'coconut-water',type:'thread',number:'05',gifs:0,icon:'drop',sample:'softer than the shoreline',description:'A fluid, asymmetric double contour with a sweeping title, curved divider and image-free writing.'},
{name:'Palmline',slug:'palmline',type:'comms',number:'01',gifs:1,icon:'frond',sample:'online · just for you',description:'A curved phone with a small contact portrait beside the header and simple received-message bubbles.'},
{name:'Husk Relay',slug:'husk-relay',type:'comms',number:'02',gifs:1,icon:'shell',sample:'connected · direct message',description:'A ribbed pocket handset with a landscape contact window and a compact inset conversation screen.'},
{name:'Cabana Chat',slug:'cabana-chat',type:'comms',number:'03',gifs:1,icon:'frond',sample:'available · at home',description:'A phone home-screen composition with a clock, portrait tile and a separate rounded conversation widget.'},
{name:'Lagoon Link',slug:'lagoon-link',type:'comms',number:'04',gifs:0,icon:'shell',sample:'message received',description:'A nostalgic pebble-shaped communicator with an inset screen and circular thumb control.'},
{name:'Nacre Notifications',slug:'nacre-notifications',type:'comms',number:'05',gifs:0,icon:'drop',sample:'three new messages',description:'A quiet lock screen with an oversized clock, pearl-like notification cards and tiny frond markers.'},
{name:'Coconut Flake',slug:'coconut-flake',type:'bud',number:'01',gifs:0,icon:'shell',sample:'one little thing',description:'A tiny reply slip with a flaked edge and the three small eyes of a coconut.'},
{name:'Milkdrop',slug:'milkdrop',type:'bud',number:'02',gifs:1,icon:'drop',sample:'close enough',description:'A teardrop portrait beside a soft italic heading, finished with a single curved member-colour edge.'},
{name:'Coir Knot',slug:'coir-knot',type:'bud',number:'03',gifs:1,icon:'knot',sample:'tied to you',description:'A small woven keepsake with a framed character thumbnail and a restrained knot signature.'},
{name:'Shellscript',slug:'shellscript',type:'bud',number:'04',gifs:0,icon:'shell',sample:'between the lines',description:'A miniature handwritten-feeling reply held between two pairs of curved shell contours.'},
{name:'Tender Kernel',slug:'tender-kernel',type:'bud',number:'05',gifs:0,icon:'shell',sample:'the softest part',description:'A compact coconut-half note with a curved lower frame and a small engraved shell.'}
];
const ccnEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ccnDefault=design=>({name:'[name]',url:'[url]',text:'[text]',time:'09:41',direction:'received',body:COCONUT_COPY[design.type],images:COCONUT_GIFS.slice(0,design.gifs)});
const ccnFilename=design=>`coconut-${design.slug}-${design.type}-${design.number}.txt`;
function ccnMarkup(design,state){
  const direction=design.type==='comms'?` data-direction="${ccnEscape(state.direction)}"`:'';
  const meta=`<div class="ccn-meta">\n<a href="${ccnEscape(state.url)}">${ccnEscape(state.name)}</a>\n<span>${ccnEscape(state.text)}</span>${design.type==='comms'?`\n<time>${ccnEscape(state.time)}</time>`:''}\n</div>`;
  const images=state.images.filter(value=>value.trim()).map((url,i)=>`<img src="${ccnEscape(url.trim())}" alt="${i?'Companion portrait':'Character portrait'}" style="object-position:50% 35%;">`).join('\n');
  const ornament=design.type==='comms'?`${COCONUT_ICONS[design.icon]}<span>Message</span>`:`${COCONUT_ICONS[design.icon]}<span>coconut</span>`;
  return `<div class="ccn ccn-${design.type} ccn-${design.slug}"${direction}>\n${meta}${images?`\n\n<div class="ccn-media">\n${images}\n</div>`:''}\n\n<div class="ccn-copy">\n${state.body}\n</div>\n\n<div class="ccn-ornament" aria-hidden="true">${ornament}</div>\n</div>`;
}
const ccnSnippet=(design,state)=>`[dohtml]\n${ccnMarkup(design,state)}\n\n<link rel="stylesheet" href="${COCONUT_CSS_URL}">\n[/dohtml]\n`;
if(typeof module!=='undefined')module.exports={COCONUT_DESIGNS,COCONUT_COPY,COCONUT_GIFS,ccnDefault,ccnMarkup,ccnSnippet,ccnFilename};
if(typeof document!=='undefined'){
  const el=id=>document.getElementById(id);
  const states=new Map();
  const fields=['name','url','text','time','direction','body'];
  const palettes={tidal:['71,121,124','111,118,155','151,103,125'],orchid:['138,84,127','117,102,160','72,131,152'],grove:['71,115,85','117,123,74','149,111,81']};
  let current=COCONUT_DESIGNS[0];
  let colours=palettes.tidal;
  let galleryBuilt=false;
  const safeURL=(value,placeholder=false)=>{
    const s=value.trim();if(placeholder&&(s==='[url]'||s.startsWith('#')))return s;
    try{return ['https:','http:'].includes(new URL(s).protocol)?s:'';}catch{return '';}
  };
  function cleanBody(raw){
    let source=raw.replace(/\[(\/?)(b|i|u|strong|em)\]/gi,'<$1$2>');
    if(!/<\/?(?:p|blockquote)\b/i.test(source))source=source.trim().split(/\n\s*\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('\n');
    const fragment=document.createElement('template');fragment.innerHTML=source;
    fragment.content.querySelectorAll('script,style,iframe,object,embed,svg,math,link,meta').forEach(n=>n.remove());
    const allowed=new Set(['P','BR','B','STRONG','I','EM','U','BLOCKQUOTE','A']);
    [...fragment.content.querySelectorAll('*')].reverse().forEach(n=>{
      if(!allowed.has(n.tagName)){n.replaceWith(...n.childNodes);return;}
      const href=n.tagName==='A'?safeURL(n.getAttribute('href')||'',true):'';
      [...n.attributes].forEach(a=>n.removeAttribute(a.name));if(href)n.setAttribute('href',href);
    });
    const walker=document.createTreeWalker(fragment.content,NodeFilter.SHOW_COMMENT);let n;const comments=[];while((n=walker.nextNode()))comments.push(n);comments.forEach(n=>n.remove());
    return fragment.innerHTML.trim();
  }
  const readState=()=>({...Object.fromEntries(fields.map(k=>[k,el('edit-'+k).value])),images:[...el('image-fields').querySelectorAll('input')].map(input=>input.value)});
  const cleanState=state=>({...state,url:safeURL(state.url,true),body:cleanBody(state.body),images:state.images.map(value=>safeURL(value))});
  const visualState=(design,state)=>({...state,name:state.name==='[name]'?'Dustin / Noah':state.name,text:state.text==='[text]'?design.sample:state.text,url:state.url==='[url]'?'#':state.url});
  function frameDoc(design,state){
    const mode=el('mode-select').value;
    const variables=colours.map((value,i)=>`--mgrgb${i+1}:${value}`).join(';');
    return `<!doctype html><html lang="en"${mode==='system'?'':` color-mode="${mode}"`}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${document.getElementById('collection-css').textContent}\nhtml,body{margin:0;padding:0;background:transparent;}body{display:flow-root;${variables}}.ccn{margin:14px auto 18px;}a{pointer-events:none;}</style></head><body>${ccnMarkup(design,visualState(design,state))}</body></html>`;
  }
  function fitFrame(frame){
    const body=frame.contentDocument?.body;if(body)frame.style.height=Math.ceil(body.getBoundingClientRect().height+2)+'px';
  }
  function loadFrame(frame,design,state){
    frame.onload=()=>{fitFrame(frame);frame.contentDocument.fonts.ready.then(()=>fitFrame(frame));};
    frame.srcdoc=frameDoc(design,state);
  }
  function render(){
    const raw=readState();states.set(current.slug,raw);const state=cleanState(raw);
    loadFrame(el('preview-frame'),current,state);el('copy-code').value=ccnSnippet(current,state);
    el('selected-name').textContent=`${current.name} · ${current.type==='bud'?'Bud':current.type==='comms'?'Comms':'Thread'} ${current.number}`;
    el('design-description').textContent=current.description;
    const words=state.body.replace(/<[^>]*>/g,' ').trim().split(/\s+/).filter(Boolean).length;
    el('word-count').textContent=`${words} words${current.type==='bud'?' · buds aim for 100 or fewer':''}`;
    const count=state.images.filter(Boolean).length;el('media-note').textContent=count?`${count} GIF${count===1?'':'s'}`:'Image-free';
    el('copy-status').textContent='';el('original-snippet').href='https://github.com/lexdoescodingnow/templates/blob/main/coconut/'+ccnFilename(current);
    el('url-status').textContent=(raw.url.trim()&&!state.url)||raw.images.some((v,i)=>v.trim()&&!state.images[i])?'Use a complete http(s) URL, or [url] for the link placeholder.':'';
    if(galleryBuilt){const frame=document.querySelector(`[data-preview="${current.slug}"]`);if(frame)loadFrame(frame,current,state);}
  }
  function addImage(value=''){
    const row=document.createElement('div');row.className='image-field';
    const label=document.createElement('label');label.textContent=`GIF ${el('image-fields').children.length+1}`;
    const input=document.createElement('input');input.value=value;input.type='text';input.inputMode='url';input.placeholder='https://…';input.addEventListener('input',render);label.append(input);
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';
    remove.addEventListener('click',()=>{row.remove();[...el('image-fields').children].forEach((r,i)=>r.querySelector('label').firstChild.textContent=`GIF ${i+1}`);render();});row.append(label,remove);el('image-fields').append(row);
  }
  function selectDesign(slug){
    current=COCONUT_DESIGNS.find(d=>d.slug===slug)||COCONUT_DESIGNS[0];
    const state=states.get(current.slug)||ccnDefault(current);fields.forEach(k=>el('edit-'+k).value=state[k]);
    el('image-fields').replaceChildren();state.images.forEach(addImage);el('comms-fields').hidden=current.type!=='comms';el('design-select').value=current.slug;
    document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===current.slug)));render();
  }
  function refreshFrames(){
    loadFrame(el('preview-frame'),current,cleanState(readState()));
    if(galleryBuilt)COCONUT_DESIGNS.forEach(d=>loadFrame(document.querySelector(`[data-preview="${d.slug}"]`),d,cleanState(states.get(d.slug)||ccnDefault(d))));
  }
  function buildGallery(){
    if(galleryBuilt)return;galleryBuilt=true;
    COCONUT_DESIGNS.forEach(d=>{
      const card=document.createElement('article');card.className='gallery-card';card.dataset.type=d.type;
      const button=document.createElement('button');button.type='button';button.className='gallery-label';button.textContent=`${d.name} · ${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number}`;
      button.addEventListener('click',()=>{selectDesign(d.slug);el('editor-anchor').scrollIntoView({behavior:'smooth'});});
      const frame=document.createElement('iframe');frame.title=d.name;frame.dataset.preview=d.slug;frame.setAttribute('sandbox','allow-same-origin');frame.setAttribute('scrolling','no');card.append(button,frame);el('gallery-grid').append(card);loadFrame(frame,d,cleanState(states.get(d.slug)||ccnDefault(d)));
    });
  }
  COCONUT_DESIGNS.forEach(d=>{
    const option=document.createElement('option');option.value=d.slug;option.textContent=`${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number} · ${d.name}`;el('design-select').append(option);
    const button=document.createElement('button');button.type='button';button.dataset.design=d.slug;button.innerHTML=`<small>${d.number}</small><span>${ccnEscape(d.name)}</span>`;button.addEventListener('click',()=>selectDesign(d.slug));el('menu-'+d.type).append(button);
  });
  fields.forEach(k=>el('edit-'+k).addEventListener(k==='direction'?'change':'input',render));
  el('design-select').addEventListener('change',e=>selectDesign(e.target.value));el('add-image').addEventListener('click',()=>{addImage();render();});
  el('previous').addEventListener('click',()=>selectDesign(COCONUT_DESIGNS[(COCONUT_DESIGNS.indexOf(current)+14)%15].slug));
  el('next').addEventListener('click',()=>selectDesign(COCONUT_DESIGNS[(COCONUT_DESIGNS.indexOf(current)+1)%15].slug));
  el('mode-select').addEventListener('change',()=>{const mode=el('mode-select').value;if(mode==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',mode);refreshFrames();});
  el('width-select').addEventListener('change',()=>{el('preview-frame').style.maxWidth=el('width-select').value;requestAnimationFrame(()=>fitFrame(el('preview-frame')));});
  const rgbToHex=rgb=>'#'+rgb.split(',').map(n=>Number(n).toString(16).padStart(2,'0')).join('');
  el('palette-select').addEventListener('change',()=>{colours=palettes[el('palette-select').value];colours.forEach((c,i)=>el('colour-'+(i+1)).value=rgbToHex(c));refreshFrames();});
  [1,2,3].forEach(i=>el('colour-'+i).addEventListener('input',()=>{colours=[...colours];const hex=el('colour-'+i).value.slice(1);colours[i-1]=[0,2,4].map(n=>parseInt(hex.slice(n,n+2),16)).join(',');refreshFrames();}));
  el('copy-button').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el('copy-code').value);el('copy-status').textContent='Copied the complete [dohtml] block.';}catch{el('copy-code').focus();el('copy-code').select();el('copy-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}});
  el('download-button').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('copy-code').value],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=ccnFilename(current);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  el('overview-button').addEventListener('click',()=>{el('overview').hidden=!el('overview').hidden;el('overview-button').setAttribute('aria-expanded',String(!el('overview').hidden));if(!el('overview').hidden){buildGallery();requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));}});
  el('gallery-filter').addEventListener('change',()=>{document.querySelectorAll('.gallery-card').forEach(c=>{c.hidden=el('gallery-filter').value!=='all'&&c.dataset.type!==el('gallery-filter').value;});requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));});
  window.addEventListener('resize',()=>requestAnimationFrame(()=>document.querySelectorAll('iframe').forEach(fitFrame)));
  const initial=location.hash.slice(1);selectDesign(COCONUT_DESIGNS.some(d=>d.slug===initial)?initial:COCONUT_DESIGNS[0].slug);
}
