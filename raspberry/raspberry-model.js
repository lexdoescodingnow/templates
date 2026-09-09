const RASPBERRY_GIFS = [
  'https://64.media.tumblr.com/e430d3a63c22d394940394db97bee0e8/d787a3075cf08d99-40/s400x600/7251d36b57319194574408579f5429ac29084941.gifv',
  'https://64.media.tumblr.com/278e3db30b99738c72e5aee06b455452/d787a3075cf08d99-0f/s400x600/3ba949a2081ccd8e8ea2feac8ae9c68c2576758e.gifv'
];
const RASPBERRY_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@b6e1455648b7b3c5c654d9c3c5df1b1b32765866/raspberry/raspberry-bramble-v1.css';
const RASPBERRY_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const RASPBERRY_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const RASPBERRY_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function raspberryEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function raspberryDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'00:26',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:RASPBERRY_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?RASPBERRY_THREAD:design.type==='comms'?RASPBERRY_COMMS:RASPBERRY_BUD }; }
function raspberryFilename(design) { return `raspberry-${design.slug}-${design.type}-${design.number}.txt`; }
function raspberryMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${raspberryEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-raspberry rby-${design.type} rby-${design.slug}"${flow}>`,`<a class="rby-name" href="${raspberryEscape(state.url)}">${raspberryEscape(state.name)}</a>`,`<div class="rby-title">${raspberryEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="rby-time">${raspberryEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="rby-media">'); gifs.forEach(g=>lines.push(`<img src="${raspberryEscape(g.url.trim())}" alt="Character GIF" style="object-position:${raspberryEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="rby-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'rby-hardware':'rby-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function raspberrySnippet(design,state) { return '[dohtml]\n'+raspberryMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+RASPBERRY_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={RASPBERRY_GIFS,RASPBERRY_CSS_URL,raspberryDefaults,raspberryFilename,raspberryMarkup,raspberrySnippet};

