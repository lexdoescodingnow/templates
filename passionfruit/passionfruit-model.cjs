const designs = [
  {name:'Corolla Afterglow',slug:'corolla-afterglow',type:'thread',number:'01',gifs:1,motif:'flower',sample:'a beautiful kind of hunger',description:'A cinematic landscape still beneath an asymmetric flower-corona masthead and a generous reading page.'},
  {name:'Maracuja Reverie',slug:'maracuja-reverie',type:'thread',number:'02',gifs:1,motif:'seed',sample:'where the wild things soften',description:'A botanical magazine spread with a narrow portrait alongside the writing, a vertical imprint and an oversized title.'},
  {name:'Golden Aril',slug:'golden-aril',type:'thread',number:'03',gifs:0,motif:'section',sample:'every little part of you',description:'An image-free specimen plate with a sectional fruit drawing, offset title and a ruled literary column.'},
  {name:'Purple Hour',slug:'purple-hour',type:'thread',number:'04',gifs:2,motif:'filament',sample:'meet me in the in-between',description:'A staggered two-still composition, a title crossing the open space and a broad, quiet reading panel.'},
  {name:'Feverbloom',slug:'feverbloom',type:'thread',number:'05',gifs:0,motif:'flower',sample:'something impossible is blooming',description:'A sculptural invitation with radiating petal lines, centred display lettering and a crisp inner writing panel.'},
  {name:'Pollen Ping',slug:'pollen-ping',type:'comms',number:'01',gifs:1,motif:'flower',sample:'online · a little distracted',description:'A slim contemporary phone with a capsule contact portrait, inset screen and soft received-message bubbles.'},
  {name:'Rind Ring',slug:'rind-ring',type:'comms',number:'02',gifs:0,motif:'section',sample:'message received',description:'A compact slider handset with a small conversation screen, a navigation ring and a twelve-key pad.'},
  {name:'Nectarline',slug:'nectarline',type:'comms',number:'03',gifs:1,motif:'seed',sample:'here, if you need me',description:'A portrait-banner smartphone with a floating contact label and broad, rounded message bubbles.'},
  {name:'Tropic Touch',slug:'tropic-touch',type:'comms',number:'04',gifs:0,motif:'filament',sample:'direct messages · today',description:'A precise e-paper phone with a typographic contact header, outlined chat bubbles and a segmented colour frame.'},
  {name:'Fuchsia Frequency',slug:'fuchsia-frequency',type:'comms',number:'05',gifs:1,motif:'flower',sample:'connected · just us',description:'A small desktop messenger with a contact sidebar, window controls and a roomy chat pane.'},
  {name:'Seedkiss',slug:'seedkiss',type:'bud',number:'01',gifs:0,motif:'seed',sample:'just a taste',description:'A compact horizontal reply with a tiny seed cluster, a coloured name tab and a clean lower rule.'},
  {name:'Petal Pulse',slug:'petal-pulse',type:'bud',number:'02',gifs:1,motif:'flower',sample:'so close to you',description:'A small portrait strip beside a miniature reply, finished with a cropped passionflower corona.'},
  {name:'Aril Aside',slug:'aril-aside',type:'bud',number:'03',gifs:0,motif:'section',sample:'a small confession',description:'A little marginal note with a vertical imprint and a fruit-section seal at its foot.'},
  {name:'Tiny Tang',slug:'tiny-tang',type:'bud',number:'04',gifs:1,motif:'filament',sample:'you linger',description:'A short reply beneath a slim cinematic still with split-colour corner marks and a narrow title band.'},
  {name:'Sweet Ache',slug:'sweet-ache',type:'bud',number:'05',gifs:0,motif:'flower',sample:'stay, just for a moment',description:'An intimate centred note cradled by fine radial petals and a single member-colour signature rule.'}
];
const gifs = ['https://64.media.tumblr.com/c80273c50d010c8476426774766536c6/2f8b85312e5989a8-ef/s540x810/06b9596073d883beb60f058a5b128730c2dc7ac3.gifv','https://64.media.tumblr.com/11f8d1f8e4563a5ce6888739724fbe7d/dade42cc16edbf96-18/s400x600/d9e6e617a495258d0e317225980c363d9c587054.gifv'];
const writing = {
  thread:'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Aliquam erat volutpat.</b> Mauris ut felis vel nulla finibus consequat. Donec vitae risus ac sapien posuere malesuada. Curabitur sed mi ac arcu tincidunt vestibulum, eget porta urna.</p>\n<p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Nulla facilisi.</i> Integer at diam vitae justo aliquam tincidunt. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>\n<p>Praesent sit amet nibh non lectus vestibulum tincidunt. <u>Morbi tempus neque sed.</u> Nam nec nibh at lacus luctus elementum. Aenean semper tellus vitae metus tincidunt, in interdum lacus interdum. Donec finibus nunc vel magna pharetra, at mattis lacus aliquam.</p>',
  comms:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b></p>\n<p>Aliquam erat volutpat. <i>Integer vel ipsum vitae.</i></p>\n<p><u>Donec consequat.</u> Sed fermentum libero et risus consectetur.</p>',
  bud:'<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit.</b> Aliquam erat volutpat. <i>Integer vel ipsum vitae</i> ligula malesuada dignissim. Donec consequat, <u>nunc vel semper</u> tincidunt, velit lacus placerat lorem, ac tincidunt neque risus sed erat.</p>'
};
function motif(name) {
  let body='';
  if(name==='flower') {
    for(let i=0;i<10;i++) body += `<ellipse cx="60" cy="31" rx="9" ry="26" transform="rotate(${i*36} 60 60)"/>`;
    for(let i=0;i<48;i++) body += `<path d="M60 31L60 45" transform="rotate(${i*7.5} 60 60)"/>`;
    body += '<circle cx="60" cy="60" r="17"/><circle cx="60" cy="60" r="9"/><path d="M60 60L48 49M60 60L73 48M60 60L62 77"/><circle cx="47" cy="48" r="3"/><circle cx="74" cy="47" r="3"/><circle cx="62" cy="79" r="3"/>';
  } else if(name==='section') {
    body='<ellipse cx="60" cy="61" rx="47" ry="44"/><ellipse cx="60" cy="61" rx="39" ry="36"/><path d="M48 18Q54 7 68 14M17 61H103M60 21V101" opacity=".3"/>';
    for(let i=0;i<14;i++) {let a=i*2.39996,r=11+23*(i/14),x=(60+Math.cos(a)*r).toFixed(2),y=(61+Math.sin(a)*r*.9).toFixed(2);body+=`<ellipse cx="${x}" cy="${y}" rx="3.2" ry="5.1" transform="rotate(${i*49} ${x} ${y})"/>`;}
  } else if(name==='seed') {
    body='<path d="M34 86C10 50 48 20 55 54C61 79 45 103 34 86ZM70 51C46 23 90 5 92 29C95 50 80 64 70 51ZM82 103C52 98 63 66 82 75C101 84 102 105 82 103Z"/><path d="M32 65Q28 51 40 46M75 32Q76 23 83 22M74 86Q82 82 90 91"/>';
  } else {
    for(let i=0;i<15;i++) body+=`<path d="M${12+i*6.8} 102Q${59+i*1.3} 66 ${13+i*6.8} ${16+Math.sin(i)*9}"/>`;
    body+='<ellipse cx="60" cy="67" rx="8" ry="11"/>';
  }
  return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
function escapeHtml(s) {return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
function initial(d) {return {url:'[url]',name:'[name]',title:'[text]',time:'21:08',images:Array.from({length:d.gifs},(_,i)=>gifs[(i+(d.number==='02'?1:0))%2]),body:writing[d.type],direction:'received'};}
function markup(d,s=initial(d),preview=false) {
  const name=preview && s.name==='[name]'?'Adriel & Lewis':s.name;
  const title=preview && s.title==='[text]'?d.sample:s.title;
  const url=preview && s.url==='[url]'?'#':s.url;
  let html=`<div class="pfr pfr-${d.type} pfr-${d.slug}"${d.type==='comms'?` data-direction="${escapeHtml(s.direction)}"`:''}>\n<div class="pfr-meta">\n<a href="${escapeHtml(url)}">${escapeHtml(name)}</a>\n<span>${escapeHtml(title)}</span>${d.type==='comms'?`\n<time>${escapeHtml(s.time)}</time>`:''}\n</div>\n`;
  if(s.images.length) html+=`\n<div class="pfr-media">\n${s.images.map((u,i)=>`<img src="${escapeHtml(u)}" alt="Character ${i+1}" style="object-position:50% 35%;">`).join('\n')}\n</div>\n`;
  html+=`\n<div class="pfr-copy">\n${s.body}\n</div>\n\n<div class="pfr-art" aria-hidden="true"></div>\n`;
  if(d.type==='comms') {
    html+='<div class="pfr-device" aria-hidden="true"><span class="pfr-signal">▂▄▆</span><span class="pfr-camera"></span><span class="pfr-battery"></span></div>\n<div class="pfr-compose" aria-hidden="true"><span>+</span><span>Message</span><span>↑</span></div>\n';
    if(d.slug==='rind-ring') html+='<div class="pfr-keypad" aria-hidden="true"><span class="pfr-nav">●</span>'+['1','2 abc','3 def','4 ghi','5 jkl','6 mno','7 pqrs','8 tuv','9 wxyz','*','0','＃'].map(x=>`<span>${x}</span>`).join('')+'</div>\n';
  } else html+='<div class="pfr-imprint" aria-hidden="true">passionfruit</div>\n';
  return html+'</div>';
}
const model={designs,gifs,writing,motif,escapeHtml,initial,markup};
if(typeof module!=='undefined') module.exports=model;
