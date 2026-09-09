const PORTUGUESE_GIFS = [
  'https://64.media.tumblr.com/6c5c92e06f704df0639091c61cc9d2b5/a4f44f0cab0affe9-6f/s400x600/210466a8fd5221168bf3b5b887580ea8cd12271b.gifv',
  'https://64.media.tumblr.com/ec19f11116552a0eecdc542d13daa784/676f65afa3420a3d-37/s400x600/5cbd7d4c12011ff568dc7ad7569f1ce84e87f55b.gifv'
];
const PORTUGUESE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@768e28ed654912e12ecb0038bd5f52c0f5eaf101/portuguese-cuisine/portuguese-cuisine-mesa-v1.css';
const PORTUGUESE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const PORTUGUESE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const PORTUGUESE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function portugueseEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function portugueseDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'19:42',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:PORTUGUESE_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?PORTUGUESE_THREAD:design.type==='comms'?PORTUGUESE_COMMS:PORTUGUESE_BUD }; }
function portugueseFilename(design) { return `portuguese-cuisine-${design.slug}-${design.type}-${design.number}.txt`; }
function portugueseMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${portugueseEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-portuguese ptg-${design.type} ptg-${design.slug}"${flow}>`,`<a class="ptg-name" href="${portugueseEscape(state.url)}">${portugueseEscape(state.name)}</a>`,`<div class="ptg-title">${portugueseEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="ptg-time">${portugueseEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="ptg-media">'); gifs.forEach(g=>lines.push(`<img src="${portugueseEscape(g.url.trim())}" alt="Character GIF" style="object-position:${portugueseEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="ptg-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'ptg-hardware':'ptg-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function portugueseSnippet(design,state) { return '[dohtml]\n'+portugueseMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+PORTUGUESE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={PORTUGUESE_GIFS,PORTUGUESE_CSS_URL,portugueseDefaults,portugueseFilename,portugueseMarkup,portugueseSnippet};
