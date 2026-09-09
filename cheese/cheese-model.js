const CHEESE_GIFS = [
  'https://64.media.tumblr.com/8b352aa76474f884a87d1ebd46d960e4/35b9ad32ad9eacb3-99/s540x810/2be71f25a601c62aed4d35dc391a40d3e7011a51.gifv',
  'https://64.media.tumblr.com/cabed725dd159293eef618286186c157/db0a74d88505a244-08/s540x810/080a1ac4172cd1756cbc7f9b60f82455f3d2d5c4.gifv'
];
const CHEESE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@07c5461d66b80dbc6990f41625896477f24d5254/cheese/cheese-fromagerie-v1.css';
const CHEESE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const CHEESE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const CHEESE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function cheeseEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function cheeseDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'14:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:CHEESE_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?CHEESE_THREAD:design.type==='comms'?CHEESE_COMMS:CHEESE_BUD }; }
function cheeseFilename(design) { return `cheese-${design.slug}-${design.type}-${design.number}.txt`; }
function cheeseMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${cheeseEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-cheese chs-${design.type} chs-${design.slug}"${flow}>`,`<a class="chs-name" href="${cheeseEscape(state.url)}">${cheeseEscape(state.name)}</a>`,`<div class="chs-title">${cheeseEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="chs-time">${cheeseEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="chs-media">'); gifs.forEach(g=>lines.push(`<img src="${cheeseEscape(g.url.trim())}" alt="Character GIF" style="object-position:${cheeseEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="chs-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'chs-hardware':'chs-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function cheeseSnippet(design,state) { return '[dohtml]\n'+cheeseMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+CHEESE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={CHEESE_GIFS,CHEESE_CSS_URL,cheeseDefaults,cheeseFilename,cheeseMarkup,cheeseSnippet};
