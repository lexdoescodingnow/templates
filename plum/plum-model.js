const PLUM_GIFS = [
  'https://64.media.tumblr.com/d87f2776480f9b1f20963c77ca2dffe0/5c9eb30503377fb8-6a/s400x600/722a67a687bad42c8378422ee08f76098f2a2d78.gifv',
  'https://64.media.tumblr.com/bfca80cba0db1476360995334b791046/bd8bcf1daaa74e76-9e/s400x600/d67d60c9e9ae34fac1ac73bbf83f160c3db15460.gifv'
];
const PLUM_DESIGNS = [
  {name:'Damson Vesper',slug:'damson-vesper',type:'thread',number:'01',gifs:1,description:'A sculpted portrait window set into a sweeping, open book-jacket heading, with plum-skin contours and a generous reading page.'},
  {name:'Prunus Sonata',slug:'prunus-sonata',type:'thread',number:'02',gifs:2,description:'Two landscape stills arranged like facing pages above a wide, centred title, with a fine blossom seam and quiet literary text.'},
  {name:'Satin Dusk',slug:'satin-dusk',type:'thread',number:'03',gifs:1,description:'A slender portrait running beside the opening of a long reply, a small asymmetrical title and satin-fold lines down the outer edge.'},
  {name:'Stone & Stanza',slug:'stone-and-stanza',type:'thread',number:'04',gifs:0,description:'An open typographic folio with a plum-stone engraving, an oversized upright heading and a divided lower signature.'},
  {name:'Everripe',slug:'everripe',type:'thread',number:'05',gifs:0,description:'A quiet literary page held in a broad crescent frame, with a small centred title and a flowering branch at the foot.'},
  {name:'Damson Dial',slug:'damson-dial',type:'comms',number:'01',gifs:1,description:'A tall contemporary phone with a curved metal rim, a sculpted contact portrait and a floating conversation tray.'},
  {name:'Prunus Inbox',slug:'prunus-inbox',type:'comms',number:'02',gifs:0,description:'A compact square foldable phone, with a narrow hinge, a typographic contact screen and full-width message cards.'},
  {name:'Sloe Circuit',slug:'sloe-circuit',type:'comms',number:'03',gifs:1,description:'A desktop chat window with a slim app dock, titlebar lights, an inline contact portrait and an inset message pane.'},
  {name:'Bloomline',slug:'bloomline',type:'comms',number:'04',gifs:1,description:'A softly bowed phone with a wide contact still, fine blossom speaker marks and compact incoming chat bubbles.'},
  {name:'Orchard Echo',slug:'orchard-echo',type:'comms',number:'05',gifs:0,description:'A pocket keyboard communicator with a horizontal display, outlined speech bubbles and a three-row keyboard.'},
  {name:'Stoneling',slug:'stoneling',type:'bud',number:'01',gifs:0,description:'A small asymmetrical note with a plum-stone cutout and an open, two-tone frame.'},
  {name:'Bloomscript',slug:'bloomscript',type:'bud',number:'02',gifs:1,description:'A miniature bookplate with an upright portrait, a tiny blossom and a compact reply beside it.'},
  {name:'Petaline',slug:'petaline',type:'bud',number:'03',gifs:0,description:'A low letter slip with an offset title, a fine branching rule and a small signature at the right.'},
  {name:'Sloe Whisper',slug:'sloe-whisper',type:'bud',number:'04',gifs:2,description:'A narrow folded note with paired miniature stills across its top and a curved member-colour clasp.'},
  {name:'Ripelet',slug:'ripelet',type:'bud',number:'05',gifs:0,description:'A compact circular-seal heading above an intimate reply, with a delicate split lower border.'}
];
const PLUM_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const PLUM_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const PLUM_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function plumEscape(value) { return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function plumDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'22:14',flow:'received',body:d.type==='thread'?PLUM_THREAD:d.type==='comms'?PLUM_COMMS:PLUM_BUD,gifs:Array.from({length:d.gifs},(_,i)=>({url:PLUM_GIFS[i%2],position:'50% 35%'}))}; }
function plumFilename(d) {return `plum-${d.slug}-${d.type}-${d.number}.txt`;}
function plumMarkup(d,s) {
  const lines=[`<div class="plm plm-${d.type} plm-${d.slug}"${d.type==='comms'?` data-flow="${plumEscape(s.flow)}"`:''}>`,`<a class="plm-name" href="${plumEscape(s.url)}">${plumEscape(s.name)}</a>`,`<div class="plm-title">${plumEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="plm-time">${plumEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length){lines.push('<div class="plm-media">');gifs.forEach(g=>lines.push(`<img src="${plumEscape(g.url.trim())}" alt="Character GIF" style="object-position:${plumEscape(g.position)}">`));lines.push('</div>');}
  lines.push('<div class="plm-copy">',s.body,'</div>',`<div class="${d.type==='comms'?'plm-device':'plm-ornament'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function plumSnippet(d,s,revision='main') {return '[dohtml]\n'+plumMarkup(d,s)+'\n\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@'+revision+'/plum/plum-lasting-season-v1.css">\n[/dohtml]\n';}
if(typeof module!=='undefined')module.exports={PLUM_GIFS,PLUM_DESIGNS,PLUM_THREAD,PLUM_COMMS,PLUM_BUD,plumEscape,plumDefaults,plumFilename,plumMarkup,plumSnippet};
