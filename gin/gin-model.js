const GIN_GIFS = ["https://64.media.tumblr.com/4245cb1340ce7b1982d15b9e15e3294c/ece300641af35956-1d/s400x600/d90e493e5cc64eb69bce9c1b92e4b0ee01cfa214.gifv", "https://64.media.tumblr.com/750c88cd74a1684f9fb1da6838e2a789/ece300641af35956-19/s400x600/437e0fb73139ab999d02ce2970193714dee7e02e.gifv"];
const GIN_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@dd235cab96f23afd642331c1b16644dfe88c87e3/gin/gin-distillery-v1.css';
const GIN_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const GIN_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const GIN_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function ginSafeUrl(value) { const s=String(value).trim(); return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function ginEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function ginDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'22:16',flow:'received',gifs:GIN_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?GIN_THREAD:design.type==='comms'?GIN_COMMS:GIN_BUD}; }
function ginFilename(d) { return `gin-${d.slug}-${d.type}-${d.number}.txt`; }
function ginMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-gin gn-${d.type} gn-${d.slug}"${flow}>`,`<a class="gn-name" href="${ginEscape(ginSafeUrl(s.url))}">${ginEscape(s.name)}</a>`,`<div class="gn-title">${ginEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="gn-time">${ginEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="gn-media">'); gifs.forEach(g=>lines.push(`<img src="${ginEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="gn-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="gn-controls" aria-hidden="true">'+Array(d.slug==='stillwave'?13:d.slug==='dryline-mini'?12:3).fill('<span></span>').join('')+'</div>');
  if(d.type!=='comms') lines.push('<div class="gn-ornament" aria-hidden="true"></div>');
  lines.push('</div>');
  return lines.join('\n');
}
function ginSnippet(d,s) { return '[dohtml]\n'+ginMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+GIN_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={GIN_GIFS,GIN_CSS_URL,ginDefaults,ginFilename,ginMarkup,ginSnippet};
