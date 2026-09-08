const BOBA_GIFS = [
  'https://64.media.tumblr.com/2468325d17e46ec6b5b7684b1c0cd573/08812ed72dad76df-e8/s540x810/725cfd99f4306f299e968b4f60edaa2cb47d25d0.gifv',
  'https://64.media.tumblr.com/e118f92c99748c84525103c73d2b77d3/79a1fcfedcdbdf1b-82/s400x600/bef01177239c502726fde121913e02cb1712624e.gifv'
];
const BOBA_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@e74609be87f09e1267083a2f50b8dd5fdcb35e5d/boba/boba-afterhours-v1.css';
const BOBA_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const BOBA_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const BOBA_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function bobaEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function bobaDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'22:26',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:BOBA_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?BOBA_THREAD:design.type==='comms'?BOBA_COMMS:BOBA_BUD }; }
function bobaFilename(design) { return `boba-${design.slug}-${design.type}-${design.number}.txt`; }
function bobaMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${bobaEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-boba bba-${design.type} bba-${design.slug}"${flow}>`,`<a class="bba-name" href="${bobaEscape(state.url)}">${bobaEscape(state.name)}</a>`,`<div class="bba-title">${bobaEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="bba-time">${bobaEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="bba-media">'); gifs.forEach(g=>lines.push(`<img src="${bobaEscape(g.url.trim())}" alt="Character GIF" style="object-position:${bobaEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="bba-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'bba-hardware':'bba-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function bobaSnippet(design,state) { return '[dohtml]\n'+bobaMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+BOBA_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={BOBA_GIFS,BOBA_CSS_URL,bobaDefaults,bobaFilename,bobaMarkup,bobaSnippet};
