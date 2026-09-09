const NUTS_GIFS = ['https://64.media.tumblr.com/1591e151b068f6fadb76e4955868f371/99745871d0969d48-37/s400x600/0f6100a3f4611aa2889a78f5663d47c8c76352db.gifv','https://64.media.tumblr.com/ecda937b0001c8b9862b6212bf63a2e8/540db748f5de90f8-44/s400x600/c9ca38a5e2c22b445ebd82c1a664ec5bf50cd6c7.gifv'];
const NUTS_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@492f1c7cb8b073845378837e4f79d190a85edb1a/nuts/nuts-grove-v1.css';
const NUTS_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const NUTS_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const NUTS_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function nutsEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function nutsDefaults(design) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:NUTS_GIFS.slice(0,design.gifs).map(url=>({url,position:'50% 45%'})),body:design.type==='thread'?NUTS_THREAD:design.type==='comms'?NUTS_COMMS:NUTS_BUD}; }
function nutsFilename(d) { return `nuts-${d.slug}-${d.type}-${d.number}.txt`; }
function nutsMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['received','sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-nuts nts-${d.type} nts-${d.slug}"${flow}>`,`<a class="nts-name" href="${nutsEscape(s.url)}">${nutsEscape(s.name)}</a>`,`<div class="nts-title">${nutsEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="nts-time">${nutsEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="nts-media">'); gifs.forEach(g=>lines.push(`<img src="${nutsEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 45%'}">`)); lines.push('</div>'); }
  lines.push('<div class="nts-copy">',s.body,'</div>');
  if(d.type==='comms') lines.push('<div class="nts-controls" aria-hidden="true">'+Array(d.slug==='shell-flip'?12:3).fill('<span></span>').join('')+'</div>');
  lines.push('</div>');
  return lines.join('\n');
}
function nutsSnippet(d,s) { return '[dohtml]\n'+nutsMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+NUTS_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={NUTS_GIFS,NUTS_CSS_URL,nutsDefaults,nutsFilename,nutsMarkup,nutsSnippet};
