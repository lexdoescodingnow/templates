const POPCORN_GIFS = [
  'https://64.media.tumblr.com/84ab9a15646d9e503bbc90844697a71c/0788cc6c0f3625f6-22/s400x600/a9b83a2a08806fb642a863ab1af67087264dabe0.gifv',
  'https://64.media.tumblr.com/2bd442bf083c51b1fd4f80267eb539db/7f2258f37ebc3e4f-b9/s400x600/34519e73345d5a13892c034e394f41e0ac5b8b28.gifv'
];
const POPCORN_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@994441ac808b5016ce31e8e0da7fdaa57a8987a2/popcorn/popcorn-picturehouse-v1.css';
const POPCORN_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const POPCORN_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const POPCORN_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function popcornEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function popcornDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:POPCORN_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?POPCORN_THREAD:design.type==='comms'?POPCORN_COMMS:POPCORN_BUD }; }
function popcornFilename(design) { return `popcorn-${design.slug}-${design.type}-${design.number}.txt`; }
function popcornMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${popcornEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-popcorn pcn-${design.type} pcn-${design.slug}"${flow}>`,`<a class="pcn-name" href="${popcornEscape(state.url)}">${popcornEscape(state.name)}</a>`,`<div class="pcn-title">${popcornEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="pcn-time">${popcornEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="pcn-media">'); gifs.forEach(g=>lines.push(`<img src="${popcornEscape(g.url.trim())}" alt="Character GIF" style="object-position:${popcornEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="pcn-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'pcn-hardware':'pcn-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function popcornSnippet(design,state) { return '[dohtml]\n'+popcornMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+POPCORN_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={POPCORN_GIFS,POPCORN_CSS_URL,popcornDefaults,popcornFilename,popcornMarkup,popcornSnippet};

