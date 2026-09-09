const MOCHA_LATTE_GIFS = [
  'https://64.media.tumblr.com/6036ab055e37f0c42d60da8cf827b1f3/91034b1f3d1013a1-b2/s540x810/7a1aa5a0436a5cef99bf5a71dd08b2a4b0e4c0da.gifv',
  'https://64.media.tumblr.com/ac1f4fbea8943b7630b608d4351a5d93/e52473e744651b82-9c/s1280x1920/966b433397d700d462dc95892ac241222e153ac4.gifv',
  'https://64.media.tumblr.com/977ed3a58a62cc598a25729ff2119d8e/db1a85d9974f240f-82/s540x810/87304e08e9fd8359c465f6a0c71fb7a38fd6b929.gifv'
];
const MOCHA_LATTE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@ff6f6b78daf1c8d8667d281c2e6f1742f318716a/mocha-latte/mocha-latte-soft-blend-v1.css';
const MOCHA_LATTE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const MOCHA_LATTE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const MOCHA_LATTE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function mochaLatteEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function mochaLatteDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'14:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:MOCHA_LATTE_GIFS[i%3],position:'50% 35%'})),body:design.type==='thread'?MOCHA_LATTE_THREAD:design.type==='comms'?MOCHA_LATTE_COMMS:MOCHA_LATTE_BUD }; }
function mochaLatteFilename(design) { return `mocha-latte-${design.slug}-${design.type}-${design.number}.txt`; }
function mochaLatteMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${mochaLatteEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-mocha-latte ml-${design.type} ml-${design.slug}"${flow}>`,`<a class="ml-name" href="${mochaLatteEscape(state.url)}">${mochaLatteEscape(state.name)}</a>`,`<div class="ml-title">${mochaLatteEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="ml-time">${mochaLatteEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="ml-media">'); gifs.forEach(g=>lines.push(`<img src="${mochaLatteEscape(g.url.trim())}" alt="Character GIF" style="object-position:${mochaLatteEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="ml-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'ml-hardware':'ml-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function mochaLatteSnippet(design,state) { return '[dohtml]\n'+mochaLatteMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+MOCHA_LATTE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={MOCHA_LATTE_GIFS,MOCHA_LATTE_CSS_URL,mochaLatteDefaults,mochaLatteFilename,mochaLatteMarkup,mochaLatteSnippet};
