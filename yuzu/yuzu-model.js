const YUZU_GIFS = [
  'https://64.media.tumblr.com/5b5254f1317679b5137b5dd271906430/b91699b6ee1c832d-ef/s540x810/16e32033f0478a89109434662a659fec177343f5.gifv',
  'https://64.media.tumblr.com/fd3c5001c30a1fcce9a8d4dff879d847/2701ec2b2d9b0c13-2a/s400x600/8d4a757f104e3fc5d88c3e55da19f15f9e02b362.gifv'
];
const YUZU_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@89001a1acdf4797353d8140aec6b935bb468d079/yuzu/yuzu-winter-v1.css';
const YUZU_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const YUZU_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const YUZU_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function yuzuEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function yuzuDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'20:16',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:YUZU_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?YUZU_THREAD:design.type==='comms'?YUZU_COMMS:YUZU_BUD }; }
function yuzuFilename(design) { return `yuzu-${design.slug}-${design.type}-${design.number}.txt`; }
function yuzuMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${yuzuEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-yuzu yzu-${design.type} yzu-${design.slug}"${flow}>`,`<a class="yzu-name" href="${yuzuEscape(state.url)}">${yuzuEscape(state.name)}</a>`,`<div class="yzu-title">${yuzuEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="yzu-time">${yuzuEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="yzu-media">'); gifs.forEach(g=>lines.push(`<img src="${yuzuEscape(g.url.trim())}" alt="Character GIF" style="object-position:${yuzuEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="yzu-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'yzu-hardware':'yzu-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function yuzuSnippet(design,state) { return '[dohtml]\n'+yuzuMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+YUZU_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={YUZU_GIFS,YUZU_CSS_URL,yuzuDefaults,yuzuFilename,yuzuMarkup,yuzuSnippet};
