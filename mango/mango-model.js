const MANGO_GIFS = ['https://64.media.tumblr.com/896e783e62764e7ca374043b96034969/23df87e4bd464086-f6/s400x600/a7c170722be077a68309475d5fe0df2a7aba9c3a.gifv','https://64.media.tumblr.com/bfc96fdcd9fa8d93489a7e0154f0e6c2/23df87e4bd464086-ea/s400x600/52a55ac55a50008608e48b5551e2c49a2e0b3bdb.gifv'];
const MANGO_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@b32473ed6b8b71970ba33568c563707b2571fdcf/mango/mango-orchard-v1.css';
const MANGO_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const MANGO_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const MANGO_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function mangoEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function mangoSafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function mangoDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'22:16',flow:'received',gifs:MANGO_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?MANGO_THREAD:d.type==='comms'?MANGO_COMMS:MANGO_BUD}; }
function mangoFilename(d) { return `mango-${d.slug}-${d.type}-${d.number}.txt`; }
function mangoMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-mango mg-${d.type} mg-${d.slug}"${flow}>`,`<a class="mg-name" href="${mangoEscape(mangoSafeUrl(s.url))}">${mangoEscape(s.name)}</a>`,`<div class="mg-title">${mangoEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="mg-time">${mangoEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="mg-media">');for(const g of gifs)lines.push(`<img src="${mangoEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="mg-copy">',s.body,'</div>');
  const motif={'alphonso-atelier':'arcs','cheek-to-cheek':'pip','the-scored-heart':'score','peel-poetry':'ribbon','mangifera-nocturne':'crescent','pulp-signal':'camera','lassi-link':'buttons','cheek-chat':'hinge','sliceos':'gesture','manila-mail':'keys','stonelet':'stone','petiole':'stem','golden-cube':'score','blush-bite':'pip','last-sliver':'sliver'}[d.slug];
  lines.push(`<div class="mg-ornament mg-${motif}" aria-hidden="true">${Array(['score','keys'].includes(motif)?9:3).fill('<span></span>').join('')}</div>`);
  lines.push('</div>');return lines.join('\n');
}
function mangoSnippet(d,s) { return '[dohtml]\n'+mangoMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+MANGO_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={MANGO_GIFS,MANGO_CSS_URL,mangoDefaults,mangoFilename,mangoMarkup,mangoSnippet};
