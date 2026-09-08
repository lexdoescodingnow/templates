const ITALIAN_GIFS = [
  'https://64.media.tumblr.com/53cd02d7aa06bf88d5e3ac889b657b34/180d36336ffe5c55-4f/s540x810/eaade5bf01124fcaded89aa38c25d39d66e6c03a.gifv',
  'https://64.media.tumblr.com/4fd070746fcf0394f53c5e318c991385/c2636f996005f897-cd/s400x600/5d567ae9179f3ccfafa5b938311915117dd77ecf.gifv'
];
const ITALIAN_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@5b9a818730fa2d096690d51e47065bbc4a654e48/italian-cuisine/italian-a-tavola-v1.css';
const ITALIAN_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const ITALIAN_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const ITALIAN_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function italianEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function italianDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'20:45',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:ITALIAN_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?ITALIAN_THREAD:design.type==='comms'?ITALIAN_COMMS:ITALIAN_BUD }; }
function italianFilename(design) { return `italian-${design.slug}-${design.type}-${design.number}.txt`; }
function italianMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${italianEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-italian itc-${design.type} itc-${design.slug}"${flow}>`,`<a class="itc-name" href="${italianEscape(state.url)}">${italianEscape(state.name)}</a>`,`<div class="itc-title">${italianEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="itc-time">${italianEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="itc-media">'); gifs.forEach(g=>lines.push(`<img src="${italianEscape(g.url.trim())}" alt="Character GIF" style="object-position:${italianEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="itc-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'itc-hardware':'itc-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function italianSnippet(design,state) { return '[dohtml]\n'+italianMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+ITALIAN_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={ITALIAN_GIFS,ITALIAN_CSS_URL,italianDefaults,italianFilename,italianMarkup,italianSnippet};
