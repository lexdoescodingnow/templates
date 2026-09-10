const SESAME_GIFS = ["https://64.media.tumblr.com/43c1c6943973e4d8244e742ed542fb14/20e0d397f06a6f98-26/s1280x1920/5813cf28ad2f1ca2be36b68a5d4928754076748b.gifv","https://64.media.tumblr.com/afa52eae7b251df0b23bd58ea16e3065/a4c168a1af776c3b-4c/s400x600/2d7cca1a0cddad2ab1575436ed7741f44dabd9f6.gifv"];
const SESAME_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@384b01c1cca7b5c2debf07c08c096a96276246bb/sesame/sesame-atelier-v1.css';
const SESAME_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const SESAME_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const SESAME_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function sesameEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function sesameSafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function sesameDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'18:24',flow:'received',gifs:SESAME_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?SESAME_THREAD:d.type==='comms'?SESAME_COMMS:SESAME_BUD}; }
function sesameFilename(d) { return `sesame-${d.slug}-${d.type}-${d.number}.txt`; }
function sesameMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-sesame-atelier ss-${d.type} ss-${d.slug}"${flow}>`,`<a class="ss-name" href="${sesameEscape(sesameSafeUrl(s.url))}">${sesameEscape(s.name)}</a>`,`<div class="ss-title">${sesameEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="ss-time">${sesameEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="ss-media">');for(const g of gifs)lines.push(`<img src="${sesameEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="ss-copy">',s.body,'</div>');
  lines.push('<div class="'+(d.type==='comms'?'ss-hardware':'ss-seeds')+'" aria-hidden="true">'+Array(d.type==='comms'?12:9).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');return lines.join('\n');
}
function sesameSnippet(d,s) { return '[dohtml]\n'+sesameMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+SESAME_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={SESAME_GIFS,SESAME_CSS_URL,sesameDefaults,sesameFilename,sesameMarkup,sesameSnippet};
