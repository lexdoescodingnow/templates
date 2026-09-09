const CHERRY_GIFS = [
  'https://64.media.tumblr.com/ae4cd360adab8ca0add7d032856a3a1c/b49856d94cec21b9-23/s540x810/c87c67acc5e6dc94908fdc6bf51350b5a94d0673.gifv',
  'https://64.media.tumblr.com/d73965475c524cebae8066b15af6ad54/2d8763c575fb6836-d6/s540x810/6d722b3432b67f41ac2e75a8fdc84a7be8c53601.gifv'
];
const CHERRY_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@5e2dc3eb3c333bfe86f49fd8baa7db20837beca6/cherry/cherry-orchard-v1.css';
const CHERRY_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const CHERRY_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const CHERRY_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function cherryEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function cherryDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'23:17',flow:'received',gifs:CHERRY_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?CHERRY_THREAD:design.type==='comms'?CHERRY_COMMS:CHERRY_BUD}; }
function cherryFilename(d) { return `cherry-${d.slug}-${d.type}-${d.number}.txt`; }
function cherryMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-cherry chr-${d.type} chr-${d.slug}"${flow}>`,`<a class="chr-name" href="${cherryEscape(s.url)}">${cherryEscape(s.name)}</a>`,`<div class="chr-title">${cherryEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="chr-time">${cherryEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="chr-media">'); gifs.forEach(g=>lines.push(`<img src="${cherryEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="chr-copy">',s.body,'</div>',d.type==='comms'?'<div class="chr-hardware" aria-hidden="true"></div>':'<div class="chr-mark" aria-hidden="true"></div>','</div>');
  return lines.join('\n');
}
function cherrySnippet(d,s) { return '[dohtml]\n'+cherryMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+CHERRY_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={CHERRY_GIFS,CHERRY_CSS_URL,cherryDefaults,cherryFilename,cherryMarkup,cherrySnippet};
