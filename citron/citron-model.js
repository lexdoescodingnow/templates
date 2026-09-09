const CITRON_GIFS = [
  'https://64.media.tumblr.com/9a76147c1d2752e8e74551a4dad8aad1/8cab4836935205d8-ac/s400x600/14d549ecef17846599c3ac258480bcccd7cc5118.gifv',
  'https://64.media.tumblr.com/819fd996bd8654da8843cb036042a29c/f8b7926ec69092f5-a1/s400x600/c30c0438621ecd7f1a7796c5e3184d0c9215af11.gifv'
];
const CITRON_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@27bcd53ac2847539f03f72f37222dd0ac07abbf7/citron/citron-atelier-v1.css';
const CITRON_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const CITRON_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const CITRON_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function citronEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function citronDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'14:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:CITRON_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?CITRON_THREAD:design.type==='comms'?CITRON_COMMS:CITRON_BUD }; }
function citronFilename(design) { return `citron-${design.slug}-${design.type}-${design.number}.txt`; }
function citronMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${citronEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-citron ctn-${design.type} ctn-${design.slug}"${flow}>`,`<a class="ctn-name" href="${citronEscape(state.url)}">${citronEscape(state.name)}</a>`,`<div class="ctn-title">${citronEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="ctn-time">${citronEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="ctn-media">'); gifs.forEach(g=>lines.push(`<img src="${citronEscape(g.url.trim())}" alt="Character GIF" style="object-position:${citronEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="ctn-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'ctn-hardware':'ctn-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function citronSnippet(design,state) { return '[dohtml]\n'+citronMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+CITRON_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={CITRON_GIFS,CITRON_CSS_URL,citronDefaults,citronFilename,citronMarkup,citronSnippet};
