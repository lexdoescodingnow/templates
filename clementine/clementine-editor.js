const CLEMENTINE_CSS_URL='https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@6680ac1bd432029d04569442b9c275b88445a6c9/clementine/clementine-softlight-v1.css';
const CLEMENTINE_GIFS=[
  "https://64.media.tumblr.com/de19c72ed024a77cc65c1779801994e9/68c45d1f767d3167-1a/s540x810/da2e3b973004be9876964a7453fd1caf9cea4931.gifv",
  "https://64.media.tumblr.com/70963cc3dca49da4b30e002405f41efb/431f5ff79bb5aea1-2b/s540x810/056541739436ccfa35ed644be124f704ec586b5f.gifv"
];
const CLEMENTINE_COPY={
  "thread": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Aliquam erat volutpat.</b> Mauris vel nunc vitae neque luctus tincidunt. Donec sit amet eros at augue finibus tincidunt. Integer placerat, erat vel facilisis viverra, nibh velit consequat neque, eget commodo nulla justo quis sapien.</p>\n<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Praesent vitae justo at sapien.</i> Nulla facilisi. Cras tempus, neque sed porta consequat, purus ipsum commodo lorem, ut aliquet nibh lectus non lacus.</p>\n<p>Suspendisse potenti. <u>Curabitur non sem vitae.</u> Nam vitae libero eget massa ullamcorper placerat. Sed mattis interdum velit, id fringilla nulla fermentum at. Morbi tincidunt, dui quis malesuada eleifend, ligula magna consequat erat, ac facilisis sem neque vitae nisi.</p>",
  "comms": "<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b></p>\n<p>Aliquam erat volutpat. <i>Praesent vitae justo.</i></p>\n<p><u>Donec consequat.</u> Cras tempus neque sed porta consequat.</p>",
  "bud": "<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Mauris vitae lorem sed risus tincidunt gravida. <i>Aliquam erat volutpat.</i> Nulla facilisi. <u>Praesent vitae justo.</u> Donec sit amet eros at augue finibus tincidunt.</p>"
};
const CLEMENTINE_ICONS={
  "peel": "<svg viewBox=\"0 0 90 48\" aria-hidden=\"true\"><path d=\"M10 10c12-8 35-5 43 5s-2 17-17 17S14 23 23 18s33-4 43 5 5 17-9 19M12 13c11-8 31-5 37 3s-5 12-15 11M57 42c-9 1-16-2-17-6\"/><path d=\"M59 10c1-7 9-9 17-5-5 6-11 8-17 5Zm0 0-7 5\"/></svg>",
  "branch": "<svg viewBox=\"0 0 90 48\" aria-hidden=\"true\"><path d=\"M7 40C30 38 51 24 79 6M25 35C11 29 13 17 14 16c10 1 15 8 11 19ZM42 26c-4-11 2-18 13-21 1 12-4 18-13 21ZM56 18c12 1 21 5 23 14-12 2-19-3-23-14\"/><path d=\"M37 32c-7 0-11 6-8 12 3 7 17 6 20-1 2-7-4-13-12-11Z\"/></svg>",
  "pair": "<svg viewBox=\"0 0 90 48\" aria-hidden=\"true\"><path d=\"M9 21C10 11 31 5 42 13c8 10-4 22-17 20S10 27 9 21ZM48 23c-3-10 11-20 24-13 12 7 10 17-1 22-10 5-20 0-23-9Z\"/><path d=\"M14 20c2 5 8 9 15 8m25-10c1-5 8-8 14-5M32 38q12 7 27-1\"/></svg>",
  "sunthread": "<svg viewBox=\"0 0 90 48\" aria-hidden=\"true\"><path d=\"M5 34h80M22 34a23 23 0 0 1 46 0M27 34a18 18 0 0 1 36 0M45 6V1M21 11l-4-4m-3 22H8m61-18 4-4m3 22h6M18 42h38m7 0h10\"/></svg>",
  "bloom": "<svg viewBox=\"0 0 90 48\" aria-hidden=\"true\"><path d=\"M44 25c-18-1-18-15-10-15 4 0 7 4 10 11-6-15 6-24 10-16 2 5-2 10-7 17 14-12 26-2 17 4-4 3-10 2-17 1 16 6 13 22 4 17-4-2-5-8-6-15-1 17-17 21-17 11 0-5 6-9 14-12\"/><circle cx=\"45\" cy=\"25\" r=\"3\"/><path d=\"M15 13h1m61 24h1M21 32h1\"/></svg>"
};
const CLEMENTINE_DESIGNS=[
  {
    "name": "Slow Peel",
    "slug": "slow-peel",
    "type": "thread",
    "number": "01",
    "gifs": 1,
    "icon": "peel",
    "sample": "some feelings take their time",
    "description": "A curled corner portrait beside an airy title, a fine colour frame and a hand-drawn ribbon of peel.",
    "imageIndex": 0
  },
  {
    "name": "Daylit Vellum",
    "slug": "daylit-vellum",
    "type": "thread",
    "number": "02",
    "gifs": 0,
    "icon": "branch",
    "sample": "the light you leave behind",
    "description": "An image-free translucent-paper composition with segmented colour rules, leaf shadows and a literary drop cap.",
    "imageIndex": 0
  },
  {
    "name": "Shared Segments",
    "slug": "shared-segments",
    "type": "thread",
    "number": "03",
    "gifs": 2,
    "icon": "pair",
    "sample": "a little closer, a little softer",
    "description": "A close-set pair of cinematic stills, a tiny ampersand seal and a spacious, centred title.",
    "imageIndex": 0
  },
  {
    "name": "The Tender Hour",
    "slug": "the-tender-hour",
    "type": "thread",
    "number": "04",
    "gifs": 1,
    "icon": "sunthread",
    "sample": "when the room turns quiet",
    "description": "A letterpress-style masthead, an offset landscape still and a sunrise drawn with the lightest possible line.",
    "imageIndex": 1
  },
  {
    "name": "Citrus Reverie",
    "slug": "citrus-reverie",
    "type": "thread",
    "number": "05",
    "gifs": 0,
    "icon": "bloom",
    "sample": "all the things we grow into",
    "description": "An image-free page with a sweeping type-led header, right-aligned dedication and one softly curved corner.",
    "imageIndex": 0
  },
  {
    "name": "Pocket Grove",
    "slug": "pocket-grove",
    "type": "comms",
    "number": "01",
    "gifs": 1,
    "icon": "branch",
    "sample": "online · here with you",
    "description": "A softly framed phone with a leaf-corner contact portrait and received-message bubbles.",
    "imageIndex": 0
  },
  {
    "name": "Clementine OS",
    "slug": "clementine-os",
    "type": "comms",
    "number": "02",
    "gifs": 0,
    "icon": "peel",
    "sample": "direct messages",
    "description": "A compact desktop-style messenger with a toolbar clock and crisp, coloured message rails.",
    "imageIndex": 0
  },
  {
    "name": "Soft Signal",
    "slug": "soft-signal",
    "type": "comms",
    "number": "03",
    "gifs": 0,
    "icon": "sunthread",
    "sample": "new messages",
    "description": "A tall, rounded lock screen with a delicate oversized clock and stacked notification cards.",
    "imageIndex": 0
  },
  {
    "name": "Petal Pixel",
    "slug": "petal-pixel",
    "type": "comms",
    "number": "04",
    "gifs": 1,
    "icon": "bloom",
    "sample": "available · just a moment",
    "description": "A camera-led chat device with a wide contact image, serif contact card and soft message bubbles.",
    "imageIndex": 1
  },
  {
    "name": "Dusk Dial",
    "slug": "dusk-dial",
    "type": "comms",
    "number": "05",
    "gifs": 1,
    "icon": "pair",
    "sample": "message received",
    "description": "A pocket flip-phone treatment with a small contact display, hinge rule and oval control pad.",
    "imageIndex": 0
  },
  {
    "name": "Rindlet",
    "slug": "rindlet",
    "type": "bud",
    "number": "01",
    "gifs": 0,
    "icon": "peel",
    "sample": "a little tenderness",
    "description": "A miniature folded-corner reply with a peel flourish and a member-colour lower edge.",
    "imageIndex": 0
  },
  {
    "name": "Little Halo",
    "slug": "little-halo",
    "type": "bud",
    "number": "02",
    "gifs": 1,
    "icon": "sunthread",
    "sample": "stay just a little",
    "description": "A tiny ringed portrait beside a short title, followed by a compact reply.",
    "imageIndex": 0
  },
  {
    "name": "Sugar Pollen",
    "slug": "sugar-pollen",
    "type": "bud",
    "number": "03",
    "gifs": 0,
    "icon": "bloom",
    "sample": "softly, softly",
    "description": "A centred miniature note on a barely dotted background, with a small five-petal blossom.",
    "imageIndex": 0
  },
  {
    "name": "Leaflit",
    "slug": "leaflit",
    "type": "bud",
    "number": "04",
    "gifs": 1,
    "icon": "branch",
    "sample": "the quiet between us",
    "description": "A portrait tab to the right of a literary heading, with a fine botanical signature.",
    "imageIndex": 1
  },
  {
    "name": "Clement Kiss",
    "slug": "clement-kiss",
    "type": "bud",
    "number": "05",
    "gifs": 0,
    "icon": "pair",
    "sample": "one more little thing",
    "description": "A small, gently curved reply card with a paired-segment signature.",
    "imageIndex": 0
  }
];
const clmEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clmDefault=design=>({name:'[name]',url:'[url]',text:'[text]',time:'09:41',direction:'received',body:CLEMENTINE_COPY[design.type],images:(design.gifs===1?[CLEMENTINE_GIFS[design.imageIndex||0]]:CLEMENTINE_GIFS.slice(0,design.gifs))});
const clmFilename=design=>`clementine-${design.slug}-${design.type}-${design.number}.txt`;
function clmMarkup(design,state){
  const direction=design.type==='comms'?` data-direction="${clmEscape(state.direction)}"`:'';
  const meta=`<div class="cl-meta">\n<a href="${clmEscape(state.url)}">${clmEscape(state.name)}</a>\n<span>${clmEscape(state.text)}</span>${design.type==='comms'?`\n<time>${clmEscape(state.time)}</time>`:''}\n</div>`;
  const images=state.images.filter(value=>value.trim()).map((url,i)=>`<img src="${clmEscape(url.trim())}" alt="${i?'Companion portrait':'Character portrait'}" style="object-position:50% 35%;">`).join('\n');
  const ornament=design.type==='comms'?`${CLEMENTINE_ICONS[design.icon]}<span>Message</span>`:`${CLEMENTINE_ICONS[design.icon]}<span>clementine</span>`;
  return `<div class="clm clm-${design.type} clm-${design.slug}"${direction}>\n${meta}${images?`\n\n<div class="cl-media">\n${images}\n</div>`:''}\n\n<div class="cl-copy">\n${state.body}\n</div>\n\n<div class="cl-ornament" aria-hidden="true">${ornament}</div>\n</div>`;
}
const clmSnippet=(design,state)=>`[dohtml]\n${clmMarkup(design,state)}\n\n<link rel="stylesheet" href="${CLEMENTINE_CSS_URL}">\n[/dohtml]\n`;
if(typeof module!=='undefined')module.exports={CLEMENTINE_DESIGNS,CLEMENTINE_COPY,CLEMENTINE_GIFS,clmDefault,clmMarkup,clmSnippet,clmFilename};
if(typeof document!=='undefined'){
  const el=id=>document.getElementById(id);
  const states=new Map();
  const fields=['name','url','text','time','direction','body'];
  const palettes={tidal:['145,76,102','114,100,149','54,118,129'],orchid:['138,84,127','117,102,160','72,131,152'],grove:['71,115,85','117,123,74','149,111,81']};
  let current=CLEMENTINE_DESIGNS[0];
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
  const visualState=(design,state)=>({...state,name:state.name==='[name]'?'Yuseop / Siwoo':state.name,text:state.text==='[text]'?design.sample:state.text,url:state.url==='[url]'?'#':state.url});
  function frameDoc(design,state){
    const mode=el('mode-select').value;
    const variables=colours.map((value,i)=>`--mgrgb${i+1}:${value}`).join(';');
    return `<!doctype html><html lang="en"${mode==='system'?'':` color-mode="${mode}"`}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${document.getElementById('collection-css').textContent}\nhtml,body{margin:0;padding:0;background:transparent;}body{display:flow-root;${variables}}.clm{margin:14px auto 18px;}a{pointer-events:none;}</style></head><body>${clmMarkup(design,visualState(design,state))}</body></html>`;
  }
  function fitFrame(frame){
    const body=frame.contentDocument?.body;if(body)frame.style.height=Math.ceil(body.getBoundingClientRect().height+2)+'px';
  }
  function loadFrame(frame,design,state){
    frame.onload=()=>{fitFrame(frame);frame.contentDocument.fonts?.ready.then(()=>fitFrame(frame));};
    frame.srcdoc=frameDoc(design,state);
  }
  function render(){
    const raw=readState();states.set(current.slug,raw);const state=cleanState(raw);
    loadFrame(el('preview-frame'),current,state);el('copy-code').value=clmSnippet(current,state);
    el('selected-name').textContent=`${current.name} · ${current.type==='bud'?'Bud':current.type==='comms'?'Comms':'Thread'} ${current.number}`;
    el('design-description').textContent=current.description;
    const words=state.body.replace(/<[^>]*>/g,' ').trim().split(/\s+/).filter(Boolean).length;
    el('word-count').textContent=`${words} words${current.type==='bud'?' · buds aim for 100 or fewer':''}`;
    const count=state.images.filter(Boolean).length;el('media-note').textContent=count?`${count} GIF${count===1?'':'s'}`:'Image-free';
    el('copy-status').textContent='';el('original-snippet').href='https://github.com/lexdoescodingnow/templates/blob/main/clementine/'+clmFilename(current);
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
    current=CLEMENTINE_DESIGNS.find(d=>d.slug===slug)||CLEMENTINE_DESIGNS[0];
    const state=states.get(current.slug)||clmDefault(current);fields.forEach(k=>el('edit-'+k).value=state[k]);
    el('image-fields').replaceChildren();state.images.forEach(addImage);el('comms-fields').hidden=current.type!=='comms';el('design-select').value=current.slug;
    document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===current.slug)));render();
  }
  function refreshFrames(){
    loadFrame(el('preview-frame'),current,cleanState(readState()));
    if(galleryBuilt)CLEMENTINE_DESIGNS.forEach(d=>loadFrame(document.querySelector(`[data-preview="${d.slug}"]`),d,cleanState(states.get(d.slug)||clmDefault(d))));
  }
  function buildGallery(){
    if(galleryBuilt)return;galleryBuilt=true;
    CLEMENTINE_DESIGNS.forEach(d=>{
      const card=document.createElement('article');card.className='gallery-card';card.dataset.type=d.type;
      const button=document.createElement('button');button.type='button';button.className='gallery-label';button.textContent=`${d.name} · ${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number}`;
      button.addEventListener('click',()=>{selectDesign(d.slug);el('editor-anchor').scrollIntoView({behavior:'smooth'});});
      const frame=document.createElement('iframe');frame.title=d.name;frame.dataset.preview=d.slug;frame.setAttribute('sandbox','allow-same-origin');frame.setAttribute('scrolling','no');card.append(button,frame);el('gallery-grid').append(card);loadFrame(frame,d,cleanState(states.get(d.slug)||clmDefault(d)));
    });
  }
  CLEMENTINE_DESIGNS.forEach(d=>{
    const option=document.createElement('option');option.value=d.slug;option.textContent=`${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number} · ${d.name}`;el('design-select').append(option);
    const button=document.createElement('button');button.type='button';button.dataset.design=d.slug;button.innerHTML=`<small>${d.number}</small><span>${clmEscape(d.name)}</span>`;button.addEventListener('click',()=>selectDesign(d.slug));el('menu-'+d.type).append(button);
  });
  fields.forEach(k=>el('edit-'+k).addEventListener(k==='direction'?'change':'input',render));
  el('design-select').addEventListener('change',e=>selectDesign(e.target.value));el('add-image').addEventListener('click',()=>{addImage();render();});
  el('previous').addEventListener('click',()=>selectDesign(CLEMENTINE_DESIGNS[(CLEMENTINE_DESIGNS.indexOf(current)+14)%15].slug));
  el('next').addEventListener('click',()=>selectDesign(CLEMENTINE_DESIGNS[(CLEMENTINE_DESIGNS.indexOf(current)+1)%15].slug));
  el('mode-select').addEventListener('change',()=>{const mode=el('mode-select').value;if(mode==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',mode);refreshFrames();});
  el('width-select').addEventListener('change',()=>{el('preview-frame').style.maxWidth=el('width-select').value;requestAnimationFrame(()=>fitFrame(el('preview-frame')));});
  const rgbToHex=rgb=>'#'+rgb.split(',').map(n=>Number(n).toString(16).padStart(2,'0')).join('');
  el('palette-select').addEventListener('change',()=>{colours=palettes[el('palette-select').value];colours.forEach((c,i)=>el('colour-'+(i+1)).value=rgbToHex(c));refreshFrames();});
  [1,2,3].forEach(i=>el('colour-'+i).addEventListener('input',()=>{colours=[...colours];const hex=el('colour-'+i).value.slice(1);colours[i-1]=[0,2,4].map(n=>parseInt(hex.slice(n,n+2),16)).join(',');refreshFrames();}));
  el('copy-button').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el('copy-code').value);el('copy-status').textContent='Copied the complete [dohtml] block.';}catch{el('copy-code').focus();el('copy-code').select();el('copy-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}});
  el('download-button').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('copy-code').value],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=clmFilename(current);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  el('overview-button').addEventListener('click',()=>{el('overview').hidden=!el('overview').hidden;el('overview-button').setAttribute('aria-expanded',String(!el('overview').hidden));if(!el('overview').hidden){buildGallery();requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));}});
  el('gallery-filter').addEventListener('change',()=>{document.querySelectorAll('.gallery-card').forEach(c=>{c.hidden=el('gallery-filter').value!=='all'&&c.dataset.type!==el('gallery-filter').value;});requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));});
  window.addEventListener('resize',()=>requestAnimationFrame(()=>document.querySelectorAll('iframe').forEach(fitFrame)));
  const initial=location.hash.slice(1);selectDesign(CLEMENTINE_DESIGNS.some(d=>d.slug===initial)?initial:CLEMENTINE_DESIGNS[0].slug);
}
