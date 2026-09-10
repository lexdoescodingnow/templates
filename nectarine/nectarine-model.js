const NECTARINE_GIFS = ['https://64.media.tumblr.com/a21dacd132b4eebbb3905a74514c7a05/89640b7d6012320f-70/s400x600/43adad3799fa7c274fdb3a5d89f7591eaf23cac6.gifv','https://64.media.tumblr.com/1f4723d17dd160cc07fc51d337e9e1e1/f1271ce3a7ce64cd-a7/s540x810/0419be1a8e4f5536095eb8ae66131c211e4ec896.gifv'];
const NECTARINE_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@ddee44e5d01dcbc09c6371f5a1b23259fed47a57/nectarine/nectarine-sunskin-v1.css';
const NECTARINE_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>';
const NECTARINE_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const NECTARINE_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function nectarineEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function nectarineSafeUrl(v) { const s=String(v).trim();return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function nectarineDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'17:26',flow:'received',gifs:NECTARINE_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 45%'})),body:d.type==='thread'?NECTARINE_THREAD:d.type==='comms'?NECTARINE_COMMS:NECTARINE_BUD}; }
function nectarineFilename(d) { return `nectarine-${d.slug}-${d.type}-${d.number}.txt`; }
function nectarineMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-nectarine nc-${d.type} nc-${d.slug}"${flow}>`,`<a class="nc-name" href="${nectarineEscape(nectarineSafeUrl(s.url))}">${nectarineEscape(s.name)}</a>`,`<div class="nc-title">${nectarineEscape(s.title)}</div>`];
  if(d.type==='comms')lines.push(`<div class="nc-time">${nectarineEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) { lines.push('<div class="nc-media">');for(const g of gifs)lines.push(`<img src="${nectarineEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`);lines.push('</div>'); }
  lines.push('<div class="nc-copy">',s.body,'</div>');
  if(d.type==='comms')lines.push('<div class="nc-hardware" aria-hidden="true">'+Array(d.slug==='nectar-slide'?12:3).fill('<span></span>').join('')+'</div>');
  else lines.push('<div class="nc-mark" aria-hidden="true"></div>');
  lines.push('</div>');return lines.join('\n');
}
function nectarineSnippet(d,s) { return '[dohtml]\n'+nectarineMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+NECTARINE_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined')module.exports={NECTARINE_GIFS,NECTARINE_CSS_URL,nectarineDefaults,nectarineFilename,nectarineMarkup,nectarineSnippet};
