const TROPICAL_GIFS = [
  'https://64.media.tumblr.com/aa0b17494bb48a6da003d4be178ca9ce/56718cfa9db95c40-66/s400x600/b9c95a6c31a2a146a1ce94bab89d31d999a55055.gifv',
  'https://64.media.tumblr.com/c94d8ffd3b6468645d352d358b1e597d/eb2766c519fef07b-6f/s540x810/0160fe92112de40a77471940806721605552cce3.gifv'
];
const TROPICAL_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@0105efa18c56c48ab580818dbe46e4bcf4ccd4db/tropical/tropical-equator-v1.css';
const TROPICAL_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const TROPICAL_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const TROPICAL_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function tropicalEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function tropicalDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'17:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:TROPICAL_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?TROPICAL_THREAD:design.type==='comms'?TROPICAL_COMMS:TROPICAL_BUD }; }
function tropicalFilename(design) { return `tropical-${design.slug}-${design.type}-${design.number}.txt`; }
function tropicalMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${tropicalEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-tropical trp-${design.type} trp-${design.slug}"${flow}>`,`<a class="trp-name" href="${tropicalEscape(state.url)}">${tropicalEscape(state.name)}</a>`,`<div class="trp-title">${tropicalEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="trp-time">${tropicalEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="trp-media">'); gifs.forEach(g=>lines.push(`<img src="${tropicalEscape(g.url.trim())}" alt="Character GIF" style="object-position:${tropicalEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="trp-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'trp-hardware':'trp-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function tropicalSnippet(design,state) { return '[dohtml]\n'+tropicalMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+TROPICAL_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={TROPICAL_GIFS,TROPICAL_CSS_URL,tropicalDefaults,tropicalFilename,tropicalMarkup,tropicalSnippet};

