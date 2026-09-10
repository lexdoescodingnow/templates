const PUMPKIN_GIFS = ["https://64.media.tumblr.com/66f3effae938c4b5c76d16bc453d37f3/3479249555ccb07c-ca/s400x600/139e7d8ebf30b112b7b90400b7f2b2370d99ede5.gifv", "https://64.media.tumblr.com/c1ae525cca133f5963045ed0e8fa903b/7f0c02188b41daa1-4d/s400x600/d6d971f4b2bd2cf1d2e5ca62260c8698fd6ce971.gifv"];
const PUMPKIN_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@f4cc8d15f303eef3bfcb041060d4e0e1020f9001/pumpkin/pumpkin-harvest-v1.css';
const PUMPKIN_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const PUMPKIN_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const PUMPKIN_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function pumpkinEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function pumpkinSafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function pumpkinDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'19:42',flow:'received',gifs:PUMPKIN_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?PUMPKIN_THREAD:d.type==='comms'?PUMPKIN_COMMS:PUMPKIN_BUD}; }
function pumpkinFilename(d) { return `pumpkin-${d.slug}-${d.type}-${d.number}.txt`; }
function pumpkinMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-pumpkin pk-${d.type} pk-${d.slug}"${flow}>`,`<a class="pk-name" href="${pumpkinEscape(pumpkinSafeUrl(s.url))}">${pumpkinEscape(s.name)}</a>`,`<div class="pk-title">${pumpkinEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="pk-time">${pumpkinEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="pk-media">');for(const g of gifs)lines.push(`<img src="${pumpkinEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="pk-copy">',s.body,'</div>');
  if(d.type==='comms')lines.push('<div class="pk-hardware" aria-hidden="true">'+Array(12).fill('<span></span>').join('')+'</div>');
  else lines.push('<div class="pk-mark" aria-hidden="true">'+Array(6).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');return lines.join('\n');
}
function pumpkinSnippet(d,s) { return '[dohtml]\n'+pumpkinMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+PUMPKIN_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={PUMPKIN_GIFS,PUMPKIN_CSS_URL,pumpkinDefaults,pumpkinFilename,pumpkinMarkup,pumpkinSnippet};
