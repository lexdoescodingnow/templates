const PRALINE_GIFS = ['https://64.media.tumblr.com/04659cb2632d3e9064c76d90ad8ff4e8/bab9c44a1969631a-1e/s400x600/492fd9022060d0954deb17a1ff4477c02262e2bc.gifv','https://64.media.tumblr.com/41f3fe7ad308ff6a36c58e739425e5cc/2fbac92f2177d694-87/s400x600/0cbdad18114d0c4f3f99896ffa49818d9f798725.gifv'];
const PRALINE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@9cd9fd5af15b4e0f721ed5ed96dc0ff646bcb180/praline/praline-atelier-v1.css';
const PRALINE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const PRALINE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const PRALINE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function pralineEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function pralineDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'20:46',flow:'received',gifs:PRALINE_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?PRALINE_THREAD:design.type==='comms'?PRALINE_COMMS:PRALINE_BUD}; }
function pralineFilename(d) { return `praline-${d.slug}-${d.type}-${d.number}.txt`; }
function pralineMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-praline prl-${d.type} prl-${d.slug}"${flow}>`,`<a class="prl-name" href="${pralineEscape(s.url)}">${pralineEscape(s.name)}</a>`,`<div class="prl-title">${pralineEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="prl-time">${pralineEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="prl-media">'); gifs.forEach(g=>lines.push(`<img src="${pralineEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="prl-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="prl-controls" aria-hidden="true">'+(d.slug==='prali-slide'?['1','2','3','4','5','6','7','8','9','*','0','#'].map(k=>'<span>'+k+'</span>').join(''):Array(3).fill('<span></span>').join(''))+'</div>');
  if(d.type!=='comms') lines.push('<div class="prl-ornament" aria-hidden="true"></div>');
  lines.push('</div>');
  return lines.join('\n');
}
function pralineSnippet(d,s) { return '[dohtml]\n'+pralineMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+PRALINE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={PRALINE_GIFS,PRALINE_CSS_URL,pralineDefaults,pralineFilename,pralineMarkup,pralineSnippet};
