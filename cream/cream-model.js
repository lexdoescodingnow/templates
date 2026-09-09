const CREAM_GIFS = [
  'https://64.media.tumblr.com/246b9c2eb98f355f5f631e48ac060421/f006b770ed68ce3b-bc/s400x600/53c6f05461637ccffc4e7e220e2bf240364cfbe5.gifv',
  'https://64.media.tumblr.com/1978136c37c02197cc3ccca6bd576647/36a4a769958466a4-56/s400x600/da9b3a21d188dda9ce13616f67530710b1439226.gifv'
];
const CREAM_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@b3dea29e34ece10c511ab76efbabeb7ff619778e/cream/cream-patisserie-v1.css';
const CREAM_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const CREAM_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const CREAM_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function creamEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function creamDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:CREAM_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?CREAM_THREAD:design.type==='comms'?CREAM_COMMS:CREAM_BUD}; }
function creamFilename(d) { return `cream-${d.slug}-${d.type}-${d.number}.txt`; }
function creamMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-cream crm-${d.type} crm-${d.slug}"${flow}>`,`<a class="crm-name" href="${creamEscape(s.url)}">${creamEscape(s.name)}</a>`,`<div class="crm-title">${creamEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="crm-time">${creamEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="crm-media">'); gifs.forEach(g=>lines.push(`<img src="${creamEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="crm-copy">',s.body,'</div>','</div>');
  return lines.join('\n');
}
function creamSnippet(d,s) { return '[dohtml]\n'+creamMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+CREAM_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={CREAM_GIFS,CREAM_CSS_URL,creamDefaults,creamFilename,creamMarkup,creamSnippet};
