const FUDGE_GIFS = [
  'https://64.media.tumblr.com/9528233ef641e2d59c5de83af0ee6ccc/bdfe4d79b5a3d85d-81/s400x600/26e2fc837e2903adac6a3e443ce9d04468f39957.gifv',
  'https://64.media.tumblr.com/c8c46e552c46eb3b8eab8c83fadeab25/f94511fe4ae38ee9-08/s250x400/54bca3f69b98eae5541d755ea98203dd5aa22308.gifv'
];
const FUDGE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@3fae541144c3777de0a5ec1486fed3b4864d405a/fudge/fudge-confection-v1.css';
const FUDGE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const FUDGE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const FUDGE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function fudgeEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fudgeDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:FUDGE_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?FUDGE_THREAD:design.type==='comms'?FUDGE_COMMS:FUDGE_BUD}; }
function fudgeFilename(d) { return `fudge-${d.slug}-${d.type}-${d.number}.txt`; }
function fudgeMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-fudge fdg-${d.type} fdg-${d.slug}"${flow}>`,`<a class="fdg-name" href="${fudgeEscape(s.url)}">${fudgeEscape(s.name)}</a>`,`<div class="fdg-title">${fudgeEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="fdg-time">${fudgeEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="fdg-media">'); gifs.forEach(g=>lines.push(`<img src="${fudgeEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="fdg-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="fdg-controls" aria-hidden="true">'+Array(d.slug==='sugarbyte'?28:3).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');
  return lines.join('\n');
}
function fudgeSnippet(d,s) { return '[dohtml]\n'+fudgeMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+FUDGE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={FUDGE_GIFS,FUDGE_CSS_URL,fudgeDefaults,fudgeFilename,fudgeMarkup,fudgeSnippet};
