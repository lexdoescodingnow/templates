const FIERY_GIFS = ["https://64.media.tumblr.com/16ad5925bafc104aa4787b9090bac26d/7a8eea70e9239c87-6c/s400x600/6f5f4ba63c0d28ddcd212385c8b2f8d42b24b87b.gifv", "https://64.media.tumblr.com/e75bc26be7b0adf86678d29f7ec06a97/fe0d632319a56853-ae/s400x600/4b3e233b36adc11af95ce2ce4362efe11f09a709.gifv"];
const FIERY_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@34319e17bd474432798ed0cbd4f7f70b7097b49d/fiery/fiery-ignition-v1.css';
const FIERY_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const FIERY_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const FIERY_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function fieryEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fierySafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function fieryDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'00:47',flow:'received',gifs:FIERY_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?FIERY_THREAD:d.type==='comms'?FIERY_COMMS:FIERY_BUD}; }
function fieryFilename(d) { return `fiery-${d.slug}-${d.type}-${d.number}.txt`; }
function fieryMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-fiery fy-${d.type} fy-${d.slug}"${flow}>`,`<a class="fy-name" href="${fieryEscape(fierySafeUrl(s.url))}">${fieryEscape(s.name)}</a>`,`<div class="fy-title">${fieryEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="fy-time">${fieryEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="fy-media">');for(const g of gifs)lines.push(`<img src="${fieryEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="fy-copy">',s.body,'</div>');
  if(d.type==='comms')lines.push('<div class="fy-hardware" aria-hidden="true">'+Array(6).fill('<span></span>').join('')+'</div>');
  else lines.push('<div class="fy-mark" aria-hidden="true">'+Array(6).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');return lines.join('\n');
}
function fierySnippet(d,s) { return '[dohtml]\n'+fieryMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+FIERY_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={FIERY_GIFS,FIERY_CSS_URL,fieryDefaults,fieryFilename,fieryMarkup,fierySnippet};
