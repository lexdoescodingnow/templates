const ESPRESSO_CSS = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/espresso/espresso-collection-v1.css';
const ESPRESSO_GIFS = [
  'https://64.media.tumblr.com/eef9387aa15a193f58a6d4c3c9b2e3b4/4d0f68c67008821a-b7/s540x810/05a3fa51d18add7e86bfd22ecc170c3d26dd514b.gifv',
  'https://64.media.tumblr.com/32f19ce5b6bd5578e8d1197e81d46152/487924940000d932-8e/s540x810/3a37ef8214bdbb89067a27e4b0c6793c487c21f2.gifv'
];
const ESPRESSO_COPY = {
  thread: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae tellus sit amet turpis finibus dignissim. <b>Aliquam erat volutpat.</b> Donec sed orci sed sapien consequat facilisis. Aenean a ligula eu nibh consequat lacinia.</p>\n<p>Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Integer vel ipsum vitae.</i> Sed fermentum libero et risus consectetur, vel malesuada velit pellentesque. Curabitur dignissim dapibus lorem, eget pretium justo volutpat et.</p>\n<p>Fusce ullamcorper, libero id molestie volutpat, sapien metus aliquet velit, eu scelerisque lacus dolor sed nibh. <u>Morbi tempus neque sed.</u> Praesent sit amet nibh non lectus vestibulum tincidunt. Nam nec nibh at lacus luctus elementum.</p>',
  comms: '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b></p>\n<p>Aliquam erat volutpat. <i>Integer vel ipsum vitae.</i></p>\n<p><u>Donec consequat.</u> Sed fermentum libero et risus consectetur.</p>',
  bud: '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Aenean a ligula eu nibh consequat lacinia. <i>Aliquam erat volutpat.</i> Sed fermentum libero et risus consectetur. <u>Donec consequat.</u> Praesent sit amet nibh non lectus vestibulum tincidunt.</p>'
};
const ESPRESSO_DESIGNS = [
  {name:'Afterhours',slug:'afterhours',type:'thread',number:'01',gifs:1,description:'A cinematic café poster: one wide character still, sweeping serif title and a fine metal colophon.',ornament:'<span>espresso</span><span class="esp-bean"></span><span>after hours</span>'},
  {name:'Crema Obscura',slug:'crema-obscura',type:'thread',number:'02',gifs:0,description:'An image-free café menu with a vertical wordmark, italic title and a generous literary page.',ornament:'<span>house blend</span><span class="esp-bean"></span><span>slowly savoured</span>'},
  {name:'Doppio Vow',slug:'doppio-vow',type:'thread',number:'03',gifs:2,description:'Two character stills in a twin-shot frame, a centred title and a long, uncluttered writing area.',ornament:'<span>double shot</span><span class="esp-cup"></span><span>one promise</span>'},
  {name:'Ninth Bar',slug:'ninth-bar',type:'thread',number:'04',gifs:1,description:'A precision espresso-machine panel with one inset portrait and a small pressure gauge.',ornament:'<span>espresso<br>under pressure</span><span class="esp-gauge"></span><span>09 bar</span>'},
  {name:'Slow Extraction',slug:'slow-extraction',type:'thread',number:'05',gifs:0,description:'An image-free barista order sheet with a stamped name, ruled writing and perforated details.',ornament:'<span>01 / espresso</span><span class="esp-bean"></span><span>take your time</span>'},
  {name:'Steamline',slug:'steamline',type:'comms',number:'01',gifs:1,description:'A modern phone with a single round contact portrait, member-coloured bubbles and a tiny steam detail.',ornament:'<span class="esp-compose">Message</span>'},
  {name:'Dialtone Roast',slug:'dialtone-roast',type:'comms',number:'02',gifs:1,description:'A nostalgic flip phone with a framed conversation screen, metal hinge and tactile keypad.',ornament:'<span class="esp-keypad"></span>'},
  {name:'Nightshift DM',slug:'nightshift-dm',type:'comms',number:'03',gifs:0,description:'An image-free lock screen with a large café clock and incoming message notifications.',ornament:'<span class="esp-homebar"></span>'},
  {name:'Portafilter Ping',slug:'portafilter-ping',type:'comms',number:'04',gifs:1,description:'A compact keyboard handset with a square contact image, LCD-style conversation and trackball.',ornament:'<span class="esp-qwerty"></span><span class="esp-control"></span>'},
  {name:'Last Call',slug:'last-call',type:'comms',number:'05',gifs:1,description:'A portrait-led messenger with a wide contact cover, clock chip and simple received or sent bubbles.',ornament:'<span class="esp-compose">Message</span>'},
  {name:'Demitasse',slug:'demitasse',type:'bud',number:'01',gifs:1,description:'A small cup-shaped reply with one round portrait and a delicate saucer mark.',ornament:'<span>espresso</span><span class="esp-cup"></span><span>a little closer</span>'},
  {name:'Ristretto',slug:'ristretto',type:'bud',number:'02',gifs:0,description:'A concentrated, image-free reply with a compact monospaced heading and a single bean.',ornament:'<span>short &amp; strong</span><span class="esp-bean"></span>'},
  {name:'Crema Kiss',slug:'crema-kiss',type:'bud',number:'03',gifs:1,description:'A short reply beside a narrow character still, framed with a member-coloured edge.',ornament:'<span>espresso</span><span>soft finish</span>'},
  {name:'Beanmark',slug:'beanmark',type:'bud',number:'04',gifs:0,description:'An open, image-free note with an italic heading, a tinted corner and a small coffee-bean signature.',ornament:'<span>leave a trace</span><span class="esp-bean"></span>'},
  {name:'One More Sip',slug:'one-more-sip',type:'bud',number:'05',gifs:0,description:'A tiny café receipt with split metadata, a perforated sign-off and a graphic till mark.',ornament:'<span>one more sip</span><span></span>'}
];
const espEscape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const espDefault = design => ({name:'[name]',url:'[url]',text:'[text]',time:'23:08',direction:'received',body:ESPRESSO_COPY[design.type],images:ESPRESSO_GIFS.slice(0,design.gifs)});
const espFilename = design => `espresso-${design.slug}-${design.type}-${design.number}.txt`;
function espMarkup(design, state) {
  const direction = design.type === 'comms' ? ` data-direction="${espEscape(state.direction)}"` : '';
  const meta = `<div class="esp-meta">\n<a href="${espEscape(state.url)}">${espEscape(state.name)}</a>\n<span>${espEscape(state.text)}</span>${design.type === 'comms' ? `\n<time>${espEscape(state.time)}</time>` : ''}\n</div>`;
  const images = state.images.filter(value => value.trim()).map((url, index) => `<img src="${espEscape(url.trim())}" alt="${index ? 'Companion portrait' : 'Character portrait'}" style="object-position:50% 40%;">`).join('\n');
  return `<div class="esp esp-${design.type} esp-${design.slug}"${direction}>\n${meta}${images ? `\n\n<div class="esp-media">\n${images}\n</div>` : ''}\n\n<div class="esp-copy">\n${state.body}\n</div>\n\n<div class="esp-ornament" aria-hidden="true">${design.ornament}</div>\n</div>`;
}
function espSnippet(design, state) {return `[dohtml]\n${espMarkup(design,state)}\n\n<link rel="stylesheet" href="${ESPRESSO_CSS}">\n[/dohtml]\n`;}
if (typeof module !== 'undefined') module.exports = {ESPRESSO_DESIGNS,ESPRESSO_COPY,ESPRESSO_CSS,espDefault,espFilename,espMarkup,espSnippet};
if (typeof document !== 'undefined') {
  const byId = id => document.getElementById(id);
  const states = new Map();
  let current = ESPRESSO_DESIGNS[0];
  const fields = ['name','url','text','time','direction','body'];
  const safeURL = (value, placeholder=false) => {
    const text = value.trim();
    if (placeholder && text === '[url]') return text;
    if (placeholder && text.startsWith('#')) return text;
    try {const url=new URL(text); return ['https:','http:'].includes(url.protocol) ? text : '';} catch {return '';}
  };
  function cleanBody(raw) {
    let source = raw.replace(/\[(\/?)(b|i|u|strong|em)\]/gi, '<$1$2>');
    if (!/<\/?(?:p|blockquote)\b/i.test(source)) source = source.trim().split(/\n\s*\n/).map(p=>`<p>${p.replace(/\n/g,'<br>')}</p>`).join('\n');
    const fragment = document.createElement('template');
    fragment.innerHTML=source;
    fragment.content.querySelectorAll('script,style,iframe,object,embed,svg,math,link,meta').forEach(el=>el.remove());
    const allowed = new Set(['P','BR','B','STRONG','I','EM','U','BLOCKQUOTE','A']);
    [...fragment.content.querySelectorAll('*')].reverse().forEach(el=>{
      if (!allowed.has(el.tagName)) {el.replaceWith(...el.childNodes);return;}
      const href = el.tagName==='A' ? safeURL(el.getAttribute('href') || '',true) : '';
      [...el.attributes].forEach(attr=>el.removeAttribute(attr.name));
      if(href) el.setAttribute('href',href);
    });
    const walker=document.createTreeWalker(fragment.content,NodeFilter.SHOW_COMMENT);let node;const comments=[];
    while((node=walker.nextNode())) comments.push(node);
    comments.forEach(node=>node.remove());
    return fragment.innerHTML.trim();
  }
  function stateNow() {
    const state={};
    fields.forEach(key=>state[key]=byId(`edit-${key}`).value);
    state.images=[...byId('image-fields').querySelectorAll('input')].map(input=>input.value);
    return state;
  }
  function cleanState(state) {return {...state,url:safeURL(state.url,true),body:cleanBody(state.body),images:state.images.map(url=>safeURL(url))};}
  function render() {
    const state=stateNow();states.set(current.slug,state);
    const clean=cleanState(state);
    byId('preview-post').innerHTML=espMarkup(current,clean);
    byId('copy-code').value=espSnippet(current,clean);
    const words=byId('preview-post').querySelector('.esp-copy').textContent.trim().split(/\s+/).filter(Boolean).length;
    byId('word-count').textContent=`${words} words${current.type==='bud' ? ' · buds aim for 100 or fewer' : ''}`;
    byId('design-description').textContent=current.description;
    byId('selected-name').textContent=`${current.name} / ${current.type==='bud' ? 'Bud' : current.type==='comms' ? 'Comms' : 'Thread'} ${current.number}`;
    byId('original-snippet').href='https://github.com/lexdoescodingnow/templates/blob/main/espresso/'+espFilename(current);
    byId('copy-status').textContent='';
    byId('media-note').textContent=clean.images.filter(Boolean).length ? `${clean.images.filter(Boolean).length} GIF${clean.images.filter(Boolean).length===1?'':'s'}` : 'No GIFs';
    byId('url-status').textContent=(state.url.trim()&&!clean.url)||(state.images.some((url,i)=>url.trim()&&!clean.images[i])) ? 'Use a complete http(s) URL, or [url] for the profile placeholder.' : '';
  }
  function addImage(value='') {
    const row=document.createElement('div');row.className='image-field';
    const label=document.createElement('label');const number=byId('image-fields').children.length+1;
    label.textContent=`GIF ${number}`;
    const input=document.createElement('input');input.type='text';input.value=value;input.placeholder='https://…';input.inputMode='url';input.addEventListener('input',render);label.append(input);
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.setAttribute('aria-label',`Remove GIF ${number}`);
    remove.addEventListener('click',()=>{row.remove();renumberImages();render();});row.append(label,remove);byId('image-fields').append(row);
  }
  function renumberImages() { [...byId('image-fields').children].forEach((row,i)=>{row.querySelector('label').firstChild.textContent=`GIF ${i+1}`;row.querySelector('button').setAttribute('aria-label',`Remove GIF ${i+1}`);}); }
  function selectDesign(slug) {
    if(current&&byId('edit-name').value) states.set(current.slug,stateNow());
    current=ESPRESSO_DESIGNS.find(design=>design.slug===slug)||ESPRESSO_DESIGNS[0];
    const state=states.get(current.slug)||espDefault(current);
    fields.forEach(key=>byId(`edit-${key}`).value=state[key]);
    byId('image-fields').replaceChildren();state.images.forEach(url=>addImage(url));
    byId('comms-fields').hidden=current.type!=='comms';
    byId('design-select').value=current.slug;
    document.querySelectorAll('[data-design]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.design===current.slug)));
    render();
  }
  const samplePalettes={rose:['177,111,137','135,125,177','89,155,158'],juniper:['70,130,115','97,137,176','157,129,181'],ember:['182,106,85','174,118,140','133,130,178']};
  function applyPalette() {
    const colours=samplePalettes[byId('palette-select').value];
    colours.forEach((value,i)=>byId('preview-post').style.setProperty(`--mgrgb${i+1}`,value));
  }
  function setMode() {
    const mode=byId('mode-select').value;
    if(mode==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',mode);
  }
  ESPRESSO_DESIGNS.forEach(design=>{
    const option=document.createElement('option');option.value=design.slug;option.textContent=`${design.type==='bud'?'Bud':design.type==='comms'?'Comms':'Thread'} ${design.number} · ${design.name}`;byId('design-select').append(option);
    const button=document.createElement('button');button.type='button';button.dataset.design=design.slug;button.setAttribute('aria-pressed','false');
    const number=document.createElement('span');number.textContent=design.number;
    const name=document.createElement('span');name.textContent=design.name;
    const count=document.createElement('small');count.textContent=design.gifs ? `${design.gifs} GIF${design.gifs===1?'':'s'}` : 'No GIF';
    button.append(number,name,count);button.addEventListener('click',()=>selectDesign(design.slug));byId(`menu-${design.type}`).append(button);
  });
  fields.forEach(key=>byId(`edit-${key}`).addEventListener(key==='direction'?'change':'input',render));
  byId('design-select').addEventListener('change',event=>selectDesign(event.target.value));
  byId('add-image').addEventListener('click',()=>{addImage();render();});
  byId('palette-select').addEventListener('change',applyPalette);
  byId('mode-select').addEventListener('change',setMode);
  byId('width-select').addEventListener('change',()=>{byId('preview-post').style.maxWidth=byId('width-select').value;});
  byId('copy-button').addEventListener('click',async()=>{
    try {await navigator.clipboard.writeText(byId('copy-code').value);byId('copy-status').textContent='Copied the complete [dohtml] block.';}
    catch {byId('copy-code').focus();byId('copy-code').select();byId('copy-status').textContent='Code selected. Press Ctrl+C or ⌘C to copy.';}
  });
  byId('download-button').addEventListener('click',()=>{
    const url=URL.createObjectURL(new Blob([byId('copy-code').value],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download=espFilename(current);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  const initialSlug=location.hash.slice(1);
  selectDesign(ESPRESSO_DESIGNS.some(design=>design.slug===initialSlug)?initialSlug:ESPRESSO_DESIGNS[0].slug);applyPalette();setMode();
}
