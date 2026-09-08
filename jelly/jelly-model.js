const JELLY_GIFS = [
  'https://64.media.tumblr.com/7a9b2d91b49476ddd3d0a1ce225fed03/b2f6d35ff876228d-c8/s540x810/4095a92e103c614113fb7cfe7bd1fc7b9d91bb09.gifv',
  'https://64.media.tumblr.com/1c93e90351f60edbaa53c72c378a7dbf/17c3aa33684ffc6d-9f/s540x810/995041155693fc290553e4cd985fb59fee5737b9.gifv'
];
const JELLY_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/jelly/jelly-glass-v1.css?v=20260908a';
const JELLY_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const JELLY_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const JELLY_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function jellyEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function jellyDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'21:09',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:JELLY_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?JELLY_THREAD:design.type==='comms'?JELLY_COMMS:JELLY_BUD }; }
function jellyFilename(design) { return `jelly-${design.slug}-${design.type}-${design.number}.txt`; }
function jellyMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${jellyEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-jelly bhj-${design.type} bhj-${design.slug}"${flow}>`,`<a class="bhj-name" href="${jellyEscape(state.url)}">${jellyEscape(state.name)}</a>`,`<div class="bhj-title">${jellyEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="bhj-time">${jellyEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="bhj-media">'); gifs.forEach(g=>lines.push(`<img src="${jellyEscape(g.url.trim())}" alt="Character GIF" style="object-position:${jellyEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="bhj-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'bhj-hardware':'bhj-gel'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function jellySnippet(design,state) { return '[dohtml]\n'+jellyMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+JELLY_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={JELLY_GIFS,JELLY_CSS_URL,jellyDefaults,jellyFilename,jellyMarkup,jellySnippet};
