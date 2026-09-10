const SAKE_GIFS = ["https://64.media.tumblr.com/0fa53ab70ddb831873ecda0ad99fe813/85de0ff821ec2679-63/s540x810/40f1aefcc3cc66a7c425b92a143754eb067deeb1.gifv","https://64.media.tumblr.com/18b63fb14a8e29af4cc967fe6080cdd9/f3265a7db61004ef-44/s400x600/7cd34772b803c8229b513991e69167fe9a6fb6cb.gifv"];
const SAKE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@7b7b7060351f769f23c731e107b9c02a805fa72e/sake/sake-brew-v1.css';
const SAKE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const SAKE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const SAKE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function sakeEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function sakeSafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function sakeDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:SAKE_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?SAKE_THREAD:d.type==='comms'?SAKE_COMMS:SAKE_BUD}; }
function sakeFilename(d) { return `sake-${d.slug}-${d.type}-${d.number}.txt`; }
function sakeMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-sake-brew sk-${d.type} sk-${d.slug}"${flow}>`,`<a class="sk-name" href="${sakeEscape(sakeSafeUrl(s.url))}">${sakeEscape(s.name)}</a>`,`<div class="sk-title">${sakeEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="sk-time">${sakeEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="sk-media">');for(const g of gifs)lines.push(`<img src="${sakeEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="sk-copy">',s.body,'</div>');
  if(d.type==='comms')lines.push('<div class="sk-hardware" aria-hidden="true">'+Array(12).fill('<span></span>').join('')+'</div>');
  else lines.push('<div class="sk-mark" aria-hidden="true">'+Array(6).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');return lines.join('\n');
}
function sakeSnippet(d,s) { return '[dohtml]\n'+sakeMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+SAKE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={SAKE_GIFS,SAKE_CSS_URL,sakeDefaults,sakeFilename,sakeMarkup,sakeSnippet};
