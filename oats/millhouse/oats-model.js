const OATS_GIFS = [
  'https://64.media.tumblr.com/9b704ccb069922789af50461c6ad9692/03f44faae6dfc70c-62/s540x810/f61abf8ae2516daa2fa92aa77977363c04b9867a.gifv',
  'https://64.media.tumblr.com/98bd31f6306db4d06bb0bc4ef06e6c94/d4e5b75f44c65150-17/s400x600/0af9ecc9bc3041cdb831b0fe2f58dab52f8d5c58.gifv'
];
const OATS_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@d82f7e7ae2b07f805fb2be0976597e72fc90928b/oats/millhouse/oats-millhouse-v1.css';
const OATS_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const OATS_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const OATS_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function oatsEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function oatsDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'07:24',flow:'received',gifs:OATS_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?OATS_THREAD:design.type==='comms'?OATS_COMMS:OATS_BUD}; }
function oatsFilename(d) { return `oats-${d.slug}-${d.type}-${d.number}.txt`; }
function oatsMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const href=/^(https?:\/\/|mailto:|#)/i.test(s.url)||s.url==='[url]'?s.url:'[url]';
  const lines=[`<div class="bh-oats-millhouse oat-${d.type} oat-${d.slug}"${flow}>`,`<a class="oat-name" href="${oatsEscape(href)}">${oatsEscape(s.name)}</a>`,`<div class="oat-title">${oatsEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="oat-time">${oatsEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="oat-media">'); gifs.forEach(g=>lines.push(`<img src="${oatsEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="oat-copy">',s.body,'</div>','<div class="oat-detail" aria-hidden="true"></div>','</div>');
  return lines.join('\n');
}
function oatsSnippet(d,s) { return '[dohtml]\n'+oatsMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+OATS_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={OATS_GIFS,OATS_CSS_URL,oatsDefaults,oatsFilename,oatsMarkup,oatsSnippet};
