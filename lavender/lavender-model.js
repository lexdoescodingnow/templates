const LAVENDER_GIFS = [
  'https://64.media.tumblr.com/e5afe1420ade397167ced2d86ac8f5f2/7bf4c79f69216461-fd/s400x600/85880c6eff098437b5dfe369501c2db225629c9a.gifv',
  'https://64.media.tumblr.com/1d5ac3db48017d8a0ef76d5f6cc5e904/7bf4c79f69216461-1f/s400x600/7527b21341040310979e00b60bb6acbff68e2307.gifv'
];
const LAVENDER_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@0d5ee7fd2512b7bab48ca81a496a83ee4ff6aa5c/lavender/lavender-stillroom-v1.css';
const LAVENDER_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const LAVENDER_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const LAVENDER_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function lavenderEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function lavenderDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'22:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:LAVENDER_GIFS[i%2],position:'50% 45%'})),body:design.type==='thread'?LAVENDER_THREAD:design.type==='comms'?LAVENDER_COMMS:LAVENDER_BUD }; }
function lavenderFilename(design) { return `lavender-${design.slug}-${design.type}-${design.number}.txt`; }
function lavenderMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${lavenderEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-lavender lvd-${design.type} lvd-${design.slug}"${flow}>`,`<a class="lvd-name" href="${lavenderEscape(state.url)}">${lavenderEscape(state.name)}</a>`,`<div class="lvd-title">${lavenderEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="lvd-time">${lavenderEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="lvd-media">'); gifs.forEach(g=>lines.push(`<img src="${lavenderEscape(g.url.trim())}" alt="Character GIF" style="object-position:${lavenderEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="lvd-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'lvd-hardware':'lvd-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function lavenderSnippet(design,state) { return '[dohtml]\n'+lavenderMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+LAVENDER_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={LAVENDER_GIFS,LAVENDER_CSS_URL,lavenderDefaults,lavenderFilename,lavenderMarkup,lavenderSnippet};
