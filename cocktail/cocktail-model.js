const COCKTAIL_GIFS = [
  'https://64.media.tumblr.com/71c043deaa0240ab1cfb295ca564d1fb/74e5d2bf7696982c-b1/s400x600/67e321bb31969d8ba66290ae81272f2d4613baef.gifv',
  'https://64.media.tumblr.com/cc1a0ce914623551f507bd715d7df0fa/74e5d2bf7696982c-fe/s400x600/fb62ca39aed47cf0edd07b421694e8e03d422d11.gifv'
];
const COCKTAIL_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@11eec1056bb0117cc4998c8ce676508fbfca1ac5/cocktail/cocktail-afterhours-v1.css';
const COCKTAIL_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const COCKTAIL_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const COCKTAIL_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function cocktailEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function cocktailDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'00:24',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:COCKTAIL_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?COCKTAIL_THREAD:design.type==='comms'?COCKTAIL_COMMS:COCKTAIL_BUD }; }
function cocktailFilename(design) { return `cocktail-${design.slug}-${design.type}-${design.number}.txt`; }
function cocktailMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${cocktailEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-cocktail ckt-${design.type} ckt-${design.slug}"${flow}>`,`<a class="ckt-name" href="${cocktailEscape(state.url)}">${cocktailEscape(state.name)}</a>`,`<div class="ckt-title">${cocktailEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="ckt-time">${cocktailEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="ckt-media">'); gifs.forEach(g=>lines.push(`<img src="${cocktailEscape(g.url.trim())}" alt="Character GIF" style="object-position:${cocktailEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="ckt-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'ckt-hardware':'ckt-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function cocktailSnippet(design,state) { return '[dohtml]\n'+cocktailMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+COCKTAIL_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={COCKTAIL_GIFS,COCKTAIL_CSS_URL,cocktailDefaults,cocktailFilename,cocktailMarkup,cocktailSnippet};


