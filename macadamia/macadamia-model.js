const MACADAMIA_GIFS = ["https://64.media.tumblr.com/6bd3b8f94437764926500cd4fcb661f4/9b7c2c038f0c82f9-bb/s540x810/2daca43f44ae6f3a4074d46d71b16d6a8b6e6f78.gifv", "https://64.media.tumblr.com/fc9ad72904d14093924519639765af84/7a0a4b57e7d99dd3-27/s540x810/382377f08c71e7101cda3709522afd7059a8ee17.gifv"];
const MACADAMIA_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@78997f92cd959301d787d5427871b35f526626a8/macadamia/macadamia-orchard-v1.css';
const MACADAMIA_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const MACADAMIA_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const MACADAMIA_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function macadamiaSafeUrl(value) { const s=String(value).trim(); return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function macadamiaEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function macadamiaDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'16:28',flow:'received',gifs:MACADAMIA_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?MACADAMIA_THREAD:design.type==='comms'?MACADAMIA_COMMS:MACADAMIA_BUD}; }
function macadamiaFilename(d) { return `macadamia-${d.slug}-${d.type}-${d.number}.txt`; }
function macadamiaMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-maca mc-${d.type} mc-${d.slug}"${flow}>`,`<a class="mc-name" href="${macadamiaEscape(macadamiaSafeUrl(s.url))}">${macadamiaEscape(s.name)}</a>`,`<div class="mc-title">${macadamiaEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="mc-time">${macadamiaEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="mc-media">'); gifs.forEach(g=>lines.push(`<img src="${macadamiaEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="mc-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="mc-controls" aria-hidden="true">'+Array(d.slug==='orchard-pocket'?30:d.slug==='roast-terminal'?5:3).fill('<span></span>').join('')+'</div>');
  if(d.type!=='comms') lines.push('<div class="mc-ornament" aria-hidden="true"></div>');
  lines.push('</div>');
  return lines.join('\n');
}
function macadamiaSnippet(d,s) { return '[dohtml]\n'+macadamiaMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+MACADAMIA_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={MACADAMIA_GIFS,MACADAMIA_CSS_URL,macadamiaDefaults,macadamiaFilename,macadamiaMarkup,macadamiaSnippet};
