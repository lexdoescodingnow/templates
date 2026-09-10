const WINE_GIFS = ['https://64.media.tumblr.com/f8bb6805abfebb0928d1d4729b0bfa0b/85beaeb7f027f899-46/s540x810/785470f72900efcd05d2202286a67bceb1eb8b74.gifv','https://64.media.tumblr.com/ff68aa348e9ce382d3687b2f7e60a621/eba7c6df5caff20a-77/s400x600/33781911dfd64fbced4455f03ca8c7a50b70cfc2.gifv'];
const WINE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@4556c4bc8fa769c7ab58b65b8848eafe2f5572e4/wine/wine-cellar-v1.css';
const WINE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const WINE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const WINE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function wineEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function wineDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:WINE_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?WINE_THREAD:design.type==='comms'?WINE_COMMS:WINE_BUD}; }
function wineFilename(d) { return `wine-${d.slug}-${d.type}-${d.number}.txt`; }
function wineMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-wine wn-${d.type} wn-${d.slug}"${flow}>`,`<a class="wn-name" href="${wineEscape(s.url)}">${wineEscape(s.name)}</a>`,`<div class="wn-title">${wineEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="wn-time">${wineEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="wn-media">'); gifs.forEach(g=>lines.push(`<img src="${wineEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="wn-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="wn-controls" aria-hidden="true">'+Array(3).fill('<span></span>').join('')+'</div>');
  if(d.type!=='comms') lines.push('<div class="wn-ornament" aria-hidden="true"></div>');
  lines.push('</div>');
  return lines.join('\n');
}
function wineSnippet(d,s) { return '[dohtml]\n'+wineMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+WINE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={WINE_GIFS,WINE_CSS_URL,wineDefaults,wineFilename,wineMarkup,wineSnippet};
