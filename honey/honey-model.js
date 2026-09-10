const HONEY_GIFS = ['https://64.media.tumblr.com/95f39286967e03b832d1b11f46ead2b4/bf7a28cf2c1d564b-52/s250x400/50038cbae16de9a3c8ef7a1bebc3e471d9473b37.gifv','https://64.media.tumblr.com/cc3f56d86246f24fe55e21f7ac737577/3c9fa1e875df9e1d-ba/s400x600/fa48ceec365bd86db633538066a60df67dbcc821.gifv'];
const HONEY_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@2f3e100fd0060773112ad7b345d433a81c642cfd/honey/honey-apiary-v1.css';
const HONEY_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const HONEY_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const HONEY_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function honeyEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function honeySafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function honeyDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:HONEY_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?HONEY_THREAD:d.type==='comms'?HONEY_COMMS:HONEY_BUD}; }
function honeyFilename(d) { return `honey-${d.slug}-${d.type}-${d.number}.txt`; }
function honeyMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-honey hn-${d.type} hn-${d.slug}"${flow}>`,`<a class="hn-name" href="${honeyEscape(honeySafeUrl(s.url))}">${honeyEscape(s.name)}</a>`,`<div class="hn-title">${honeyEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="hn-time">${honeyEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="hn-media">');for(const g of gifs)lines.push(`<img src="${honeyEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="hn-copy">',s.body,'</div>');
  const motif={'comb-archive':'comb','the-slow-pour':'dipper','apiary-no-two':'bee','wax-and-wane':'seal','melliferous':'grooves','hivewire':'island','nectar-ping':'wheel','buzzline':'keys','royal-relay':'hinge','honeyos':'touch','combkiss':'comb','dipperlet':'dipper','waxwing':'seal','twin-drops':'drops','afterglaze':'glaze'}[d.slug];
  lines.push(`<div class="hn-ornament hn-${motif}" aria-hidden="true">${Array(motif==='keys'?12:motif==='comb'?7:3).fill('<span></span>').join('')}</div>`);
  lines.push('</div>');return lines.join('\n');
}
function honeySnippet(d,s) { return '[dohtml]\n'+honeyMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+HONEY_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={HONEY_GIFS,HONEY_CSS_URL,honeyDefaults,honeyFilename,honeyMarkup,honeySnippet};
