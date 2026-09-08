const SULTANA_CSS_URL='https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@1dffec02044997bcef2ba6f8ec4d5a10fa5c0005/sultana/sultana-collection-v1.css';
const SULTANA_GIFS=["https://64.media.tumblr.com/c1894066ce28f848d9a292dc4507baae/e51de4369796d90c-c1/s540x810/1ffd0410cfd782c1f0e52dec5669275d8f6c0289.gifv", "https://64.media.tumblr.com/0008888cea495b6e54df203ab227be80/f90d4e90cd7d2f26-21/s540x810/2c7c87d0ca1057af7e80e91904471eaf3465e137.gifv"];
const SULTANA_COPY={
thread:'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Aliquam erat volutpat.</b> Mauris ut felis vel nulla finibus consequat. Donec vitae risus ac sapien posuere malesuada. Curabitur sed mi ac arcu tincidunt vestibulum, eget porta urna.</p>\n<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Nulla facilisi.</i> Integer at diam vitae justo aliquam tincidunt. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>\n<p>Praesent sit amet nibh non lectus vestibulum tincidunt. <u>Morbi tempus neque sed.</u> Nam nec nibh at lacus luctus elementum. Aenean semper tellus vitae metus tincidunt, in interdum lacus interdum. Donec finibus nunc vel magna pharetra, at mattis lacus aliquam.</p>',
comms:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b></p>\n<p>Aliquam erat volutpat. <i>Integer vel ipsum vitae.</i></p>\n<p><u>Donec consequat.</u> Sed fermentum libero et risus consectetur.</p>',
bud:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Aenean vitae lacus sit amet neque tincidunt placerat. <i>Aliquam erat volutpat.</i> Donec finibus nunc vel magna pharetra. <u>Morbi tempus neque sed.</u> Praesent sit amet nibh non lectus vestibulum tincidunt.</p>'
};
const SULTANA_ICONS={"vine": "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M20 93C73 68 28 24 84 7M45 71C20 64 12 76 20 82c8 6 20-5 13-11M48 47C69 35 78 51 66 56c-9 3-13-8-5-11M52 32Q27 34 30 12Q51 10 52 32ZM50 35L34 16M61 18Q68 0 87 4Q84 22 61 18Z\"/><path d=\"M33 78Q38 89 51 83M37 60Q26 58 26 47\"/></svg>", "grape": "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M46 36Q58 12 75 5M53 24Q28 25 31 8Q46 7 53 24ZM58 18c20 8 29-3 22-8M37 43q-7 9-2 14m20-20q-6 7-3 11m16-2q-6 8-2 12m-19 2q-6 7-1 12m11 3q-4 6-1 10\"/><ellipse cx=\"34\" cy=\"49\" rx=\"11\" ry=\"15\" transform=\"rotate(25 34 49)\"/><ellipse cx=\"54\" cy=\"40\" rx=\"10\" ry=\"13\" transform=\"rotate(-14 54 40)\"/><ellipse cx=\"69\" cy=\"51\" rx=\"10\" ry=\"14\" transform=\"rotate(24 69 51)\"/><ellipse cx=\"45\" cy=\"67\" rx=\"10\" ry=\"14\" transform=\"rotate(-15 45 67)\"/><ellipse cx=\"61\" cy=\"71\" rx=\"9\" ry=\"12\" transform=\"rotate(24 61 71)\"/><ellipse cx=\"53\" cy=\"86\" rx=\"8\" ry=\"10\" transform=\"rotate(-8 53 86)\"/></svg>", "leaf": "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M20 86Q40 50 81 17M39 66L22 61l13-12-10-8 20-5-2-17 17 8L79 8l5 25 9 7-14 12 4 14-24 3-9 15-11-18ZM43 57l-6-10m18-2 0-14m-1 18 20-7M33 75q-19 0-20-13c-1-11 15-12 13-3\"/></svg>", "twine": "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M8 53C26 19 73 82 91 46M8 46C26 81 73 18 91 53M33 50c0-18 21-18 21-5S34 67 34 53c0-14 32-23 32-6s-19 18-20 4M21 39l-4-12m60 34 6 11M50 25v-9m0 68v-9\"/></svg>", "trellis": "<svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><path d=\"M50 5L91 50 50 95 9 50ZM28 29l43 45M29 72l43-43M9 50h82M50 5v90M20 80C67 80 22 19 79 19M44 42Q23 44 24 28q19-2 20 14M51 66q22-4 26 12-18 5-26-12\"/></svg>"};
const SULTANA_DESIGNS=[
  {
    "name": "Vitis Obscura",
    "slug": "vitis-obscura",
    "type": "thread",
    "number": "01",
    "gifs": 1,
    "icon": "vine",
    "sample": "some sweetness lingers",
    "description": "An engraved frontispiece with a portrait medallion, curling vinework and a generous literary page."
  },
  {
    "name": "Tendresse",
    "slug": "tendresse",
    "type": "thread",
    "number": "02",
    "gifs": 0,
    "icon": "grape",
    "sample": "the things we keep",
    "description": "A folded correspondence sheet, an oversized serif title and a small hanging cluster of sultanas."
  },
  {
    "name": "Twining Vows",
    "slug": "twining-vows",
    "type": "thread",
    "number": "03",
    "gifs": 2,
    "icon": "twine",
    "sample": "bound by choice",
    "description": "A pair of straight portrait panels, an engraved central ampersand and a double-thread frame."
  },
  {
    "name": "Velvet Vendange",
    "slug": "velvet-vendange",
    "type": "thread",
    "number": "04",
    "gifs": 1,
    "icon": "leaf",
    "sample": "a season for staying",
    "description": "A fluted velvet heading and open writing, followed by a panoramic portrait and a fine vine signature."
  },
  {
    "name": "Late Harvest",
    "slug": "late-harvest",
    "type": "thread",
    "number": "05",
    "gifs": 0,
    "icon": "trellis",
    "sample": "ripened by time",
    "description": "A trellis-edged literary folio with an inset title plaque, wide margins and a member-colour drop cap."
  },
  {
    "name": "Vinewire",
    "slug": "vinewire",
    "type": "comms",
    "number": "01",
    "gifs": 1,
    "icon": "vine",
    "sample": "available · for you",
    "description": "An engraved modern phone with a portrait contact tab, inset screen and soft message bubbles."
  },
  {
    "name": "Raisin Radio",
    "slug": "raisin-radio",
    "type": "comms",
    "number": "02",
    "gifs": 0,
    "icon": "grape",
    "sample": "incoming message",
    "description": "A wide pocket pager with an LCD conversation screen, side keys and a miniature harvest seal."
  },
  {
    "name": "Trellis Touch",
    "slug": "trellis-touch",
    "type": "comms",
    "number": "03",
    "gifs": 1,
    "icon": "trellis",
    "sample": "connected · direct message",
    "description": "A slim PDA with an inset portrait, a stylus rail and stacked received-message bubbles."
  },
  {
    "name": "Aftervine",
    "slug": "aftervine",
    "type": "comms",
    "number": "04",
    "gifs": 0,
    "icon": "leaf",
    "sample": "three new messages",
    "description": "A quiet e-ink handset with a fine pinstripe shell, a tall clock and clean notification cards."
  },
  {
    "name": "Tendril Talk",
    "slug": "tendril-talk",
    "type": "comms",
    "number": "05",
    "gifs": 1,
    "icon": "twine",
    "sample": "online · just for you",
    "description": "A folding pocket communicator with a portrait contact screen and a separate conversation pane."
  },
  {
    "name": "Gleaning",
    "slug": "gleaning",
    "type": "bud",
    "number": "01",
    "gifs": 0,
    "icon": "grape",
    "sample": "a little sweetness",
    "description": "A small open reply between offset brackets, finished with a hanging grape engraving."
  },
  {
    "name": "Raisinette",
    "slug": "raisinette",
    "type": "bud",
    "number": "02",
    "gifs": 1,
    "icon": "grape",
    "sample": "stay a little longer",
    "description": "A compact portrait button set into a fine oval label above a short reply."
  },
  {
    "name": "Vinelet",
    "slug": "vinelet",
    "type": "bud",
    "number": "03",
    "gifs": 0,
    "icon": "vine",
    "sample": "always, quietly",
    "description": "A slender note with an asymmetric vine margin and a tightly set serif heading."
  },
  {
    "name": "Honeyed Hush",
    "slug": "honeyed-hush",
    "type": "bud",
    "number": "04",
    "gifs": 1,
    "icon": "leaf",
    "sample": "close enough to hear",
    "description": "A miniature horizontal keepsake with a square character still, bevelled corner and intimate writing."
  },
  {
    "name": "Last Sultana",
    "slug": "last-sultana",
    "type": "bud",
    "number": "05",
    "gifs": 0,
    "icon": "twine",
    "sample": "one more moment",
    "description": "A tiny centred reply with an engraved knot, a fine lower rule and an open upper edge."
  }
];
const sulEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sulDefault=design=>({name:'[name]',url:'[url]',text:'[text]',time:'21:08',direction:'received',body:SULTANA_COPY[design.type],images:SULTANA_GIFS.slice(0,design.gifs)});
const sulFilename=design=>`sultana-${design.slug}-${design.type}-${design.number}.txt`;
function sulMarkup(design,state){
  const direction=design.type==='comms'?` data-direction="${sulEscape(state.direction)}"`:'';
  const meta=`<div class="sul-meta">\n<a href="${sulEscape(state.url)}">${sulEscape(state.name)}</a>\n<span>${sulEscape(state.text)}</span>${design.type==='comms'?`\n<time>${sulEscape(state.time)}</time>`:''}\n</div>`;
  const images=state.images.filter(value=>value.trim()).map((url,i)=>`<img src="${sulEscape(url.trim())}" alt="${i?'Companion portrait':'Character portrait'}" style="object-position:50% 35%;">`).join('\n');
  const ornament=design.type==='comms'?`${SULTANA_ICONS[design.icon]}<span>Message</span>`:`${SULTANA_ICONS[design.icon]}<span>sultana</span>`;
  return `<div class="sul sul-${design.type} sul-${design.slug}"${direction}>\n${meta}${images?`\n\n<div class="sul-media">\n${images}\n</div>`:''}\n\n<div class="sul-copy">\n${state.body}\n</div>\n\n<div class="sul-ornament" aria-hidden="true">${ornament}</div>\n</div>`;
}
const sulSnippet=(design,state)=>`[dohtml]\n${sulMarkup(design,state)}\n\n<link rel="stylesheet" href="${SULTANA_CSS_URL}">\n[/dohtml]\n`;
if(typeof module!=='undefined')module.exports={SULTANA_DESIGNS,SULTANA_COPY,SULTANA_GIFS,sulDefault,sulMarkup,sulSnippet,sulFilename};
if(typeof document!=='undefined'){
  const el=id=>document.getElementById(id);
  const states=new Map();
  const fields=['name','url','text','time','direction','body'];
  const palettes={vintage:['143,75,101','113,99,147','58,126,129'],orchid:['138,84,127','117,102,160','72,131,152'],grove:['71,115,85','117,123,74','149,111,81']};
  let current=SULTANA_DESIGNS[0];
  let colours=palettes.vintage;
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
  const visualState=(design,state)=>({...state,name:state.name==='[name]'?'Kia / Jaehyun':state.name,text:state.text==='[text]'?design.sample:state.text,url:state.url==='[url]'?'#':state.url});
  function frameDoc(design,state){
    const mode=el('mode-select').value;
    const variables=colours.map((value,i)=>`--mgrgb${i+1}:${value}`).join(';');
    return `<!doctype html><html lang="en"${mode==='system'?'':` color-mode="${mode}"`}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${document.getElementById('collection-css').textContent}\nhtml,body{margin:0;padding:0;background:transparent;}body{display:flow-root;${variables}}.sul{margin:14px auto 18px;}a{pointer-events:none;}</style></head><body>${sulMarkup(design,visualState(design,state))}</body></html>`;
  }
  function fitFrame(frame){
    const body=frame.contentDocument?.body;if(body)frame.style.height=Math.ceil(body.getBoundingClientRect().height+2)+'px';
  }
  function loadFrame(frame,design,state){
    frame.onload=()=>{fitFrame(frame);frame.contentDocument.fonts.ready.then(()=>fitFrame(frame));new ResizeObserver(()=>fitFrame(frame)).observe(frame.contentDocument.body);};
    frame.srcdoc=frameDoc(design,state);
  }
  function render(){
    const raw=readState();states.set(current.slug,raw);const state=cleanState(raw);
    loadFrame(el('preview-frame'),current,state);el('copy-code').value=sulSnippet(current,state);
    el('selected-name').textContent=`${current.name} · ${current.type==='bud'?'Bud':current.type==='comms'?'Comms':'Thread'} ${current.number}`;
    el('design-description').textContent=current.description;
    const words=state.body.replace(/<[^>]*>/g,' ').trim().split(/\s+/).filter(Boolean).length;
    el('word-count').textContent=`${words} words${current.type==='bud'?' · buds aim for 100 or fewer':''}`;
    const count=state.images.filter(Boolean).length;el('media-note').textContent=count?`${count} GIF${count===1?'':'s'}`:'Image-free';
    el('copy-status').textContent='';el('original-snippet').href='https://github.com/lexdoescodingnow/templates/blob/main/sultana/'+sulFilename(current);
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
    current=SULTANA_DESIGNS.find(d=>d.slug===slug)||SULTANA_DESIGNS[0];
    const state=states.get(current.slug)||sulDefault(current);fields.forEach(k=>el('edit-'+k).value=state[k]);
    el('image-fields').replaceChildren();state.images.forEach(addImage);el('comms-fields').hidden=current.type!=='comms';el('design-select').value=current.slug;
    document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===current.slug)));render();
  }
  function refreshFrames(){
    loadFrame(el('preview-frame'),current,cleanState(readState()));
    if(galleryBuilt)SULTANA_DESIGNS.forEach(d=>loadFrame(document.querySelector(`[data-preview="${d.slug}"]`),d,cleanState(states.get(d.slug)||sulDefault(d))));
  }
  function buildGallery(){
    if(galleryBuilt)return;galleryBuilt=true;
    SULTANA_DESIGNS.forEach(d=>{
      const card=document.createElement('article');card.className='gallery-card';card.dataset.type=d.type;
      const button=document.createElement('button');button.type='button';button.className='gallery-label';button.textContent=`${d.name} · ${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number}`;
      button.addEventListener('click',()=>{selectDesign(d.slug);el('editor-anchor').scrollIntoView({behavior:'smooth'});});
      const frame=document.createElement('iframe');frame.title=d.name;frame.dataset.preview=d.slug;frame.setAttribute('sandbox','allow-same-origin');frame.setAttribute('scrolling','no');card.append(button,frame);el('gallery-grid').append(card);loadFrame(frame,d,cleanState(states.get(d.slug)||sulDefault(d)));
    });
  }
  SULTANA_DESIGNS.forEach(d=>{
    const option=document.createElement('option');option.value=d.slug;option.textContent=`${d.type==='bud'?'Bud':d.type==='comms'?'Comms':'Thread'} ${d.number} · ${d.name}`;el('design-select').append(option);
    const button=document.createElement('button');button.type='button';button.dataset.design=d.slug;button.innerHTML=`<small>${d.number}</small><span>${sulEscape(d.name)}</span>`;button.addEventListener('click',()=>selectDesign(d.slug));el('menu-'+d.type).append(button);
  });
  fields.forEach(k=>el('edit-'+k).addEventListener(k==='direction'?'change':'input',render));
  el('design-select').addEventListener('change',e=>selectDesign(e.target.value));el('add-image').addEventListener('click',()=>{addImage();render();});
  el('previous').addEventListener('click',()=>selectDesign(SULTANA_DESIGNS[(SULTANA_DESIGNS.indexOf(current)+14)%15].slug));
  el('next').addEventListener('click',()=>selectDesign(SULTANA_DESIGNS[(SULTANA_DESIGNS.indexOf(current)+1)%15].slug));
  el('mode-select').addEventListener('change',()=>{const mode=el('mode-select').value;if(mode==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',mode);refreshFrames();});
  el('width-select').addEventListener('change',()=>{el('preview-frame').style.maxWidth=el('width-select').value;requestAnimationFrame(()=>fitFrame(el('preview-frame')));});
  const rgbToHex=rgb=>'#'+rgb.split(',').map(n=>Number(n).toString(16).padStart(2,'0')).join('');
  el('palette-select').addEventListener('change',()=>{colours=palettes[el('palette-select').value];colours.forEach((c,i)=>el('colour-'+(i+1)).value=rgbToHex(c));refreshFrames();});
  [1,2,3].forEach(i=>el('colour-'+i).addEventListener('input',()=>{colours=[...colours];const hex=el('colour-'+i).value.slice(1);colours[i-1]=[0,2,4].map(n=>parseInt(hex.slice(n,n+2),16)).join(',');refreshFrames();}));
  el('copy-button').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el('copy-code').value);el('copy-status').textContent='Copied the complete [dohtml] block.';}catch{el('copy-code').focus();el('copy-code').select();el('copy-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}});
  el('download-button').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([el('copy-code').value],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download=sulFilename(current);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  el('overview-button').addEventListener('click',()=>{el('overview').hidden=!el('overview').hidden;el('overview-button').setAttribute('aria-expanded',String(!el('overview').hidden));if(!el('overview').hidden){buildGallery();requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));}});
  el('gallery-filter').addEventListener('change',()=>{document.querySelectorAll('.gallery-card').forEach(c=>{c.hidden=el('gallery-filter').value!=='all'&&c.dataset.type!==el('gallery-filter').value;});requestAnimationFrame(()=>document.querySelectorAll('#gallery-grid iframe').forEach(fitFrame));});
  window.addEventListener('resize',()=>requestAnimationFrame(()=>document.querySelectorAll('iframe').forEach(fitFrame)));
  const initial=location.hash.slice(1);selectDesign(SULTANA_DESIGNS.some(d=>d.slug===initial)?initial:SULTANA_DESIGNS[0].slug);
}
