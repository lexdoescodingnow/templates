const BROWN_SUGAR_GIFS = ['https://64.media.tumblr.com/b65212944048e51a93c73a347cdd093d/1756d5eafa32a2f2-88/s250x400/55ff3b94aa547a0542273ea7167af45770c5a344.gifv','https://64.media.tumblr.com/d08cc3438ca4fa2c3d79c8772d5e08a4/1756d5eafa32a2f2-6b/s250x400/39763568c9dc2897ba68eb9a28a4ec7699eaa01e.gifv'];
const BROWN_SUGAR_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@5e86fe2cabb51095c8531b1401c2512437f4960d/brown-sugar/brown-sugar-crystalline-v1.css';
const BROWN_SUGAR_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\n\n<p><u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>';
const BROWN_SUGAR_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const BROWN_SUGAR_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function brownSugarEscape(v) { return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function brownSugarSafeUrl(v) { const s=String(v).trim(); return /^(https?:\/\/|mailto:|#)/i.test(s)||s==='[url]'?s:'#'; }
function brownSugarDefaults(d) { return {name:'[name]',url:'[url]',title:'[text]',time:'21:08',flow:'received',gifs:BROWN_SUGAR_GIFS.slice(0,d.gifs).map(url=>({url,position:'50% 40%'})),body:d.type==='thread'?BROWN_SUGAR_THREAD:d.type==='comms'?BROWN_SUGAR_COMMS:BROWN_SUGAR_BUD}; }
function brownSugarFilename(d) { return `brown-sugar-${d.slug}-${d.type}-${d.number}.txt`; }
function brownSugarMarkup(d,s) {
  const flow=d.type==='comms'?` data-flow="${['sent','alternate'].includes(s.flow)?s.flow:'received'}"`:'';
  const lines=[`<div class="bh-bs bs-${d.type} bs-${d.slug}"${flow}>`,`<a class="bs-name" href="${brownSugarEscape(brownSugarSafeUrl(s.url))}">${brownSugarEscape(s.name)}</a>`,`<div class="bs-title">${brownSugarEscape(s.title)}</div>`];
  if(d.type==='comms') lines.push(`<div class="bs-time">${brownSugarEscape(s.time)}</div>`);
  const gifs=s.gifs.filter(g=>/^https?:\/\//i.test(g.url.trim()));
  if(gifs.length) {
    lines.push('<div class="bs-media">');
    for(const g of gifs) lines.push(`<img src="${brownSugarEscape(g.url.trim())}" alt="Character GIF" style="object-position:${/^\d{1,3}% \d{1,3}%$/.test(g.position)?g.position:'50% 40%'}">`);
    lines.push('</div>');
  }
  lines.push('<div class="bs-copy">',s.body,'</div>');
  const motif={'demerara-drift':'drift','muscovado-press':'stamp','molasses-manuscript':'trace','turbinado-terrace':'terrace','soft-brown-reverie':'scoop','grainline':'camera','molassenger':'keyboard','caster-call':'hinge','duo-crystal':'lens','treacle-terminal':'keys','grainlet':'grain','sugar-pin':'pin','brown-kiss':'kiss','crumbscript':'notch','last-crystal':'last'}[d.slug];
  lines.push(`<div class="bs-ornament bs-${motif}" aria-hidden="true">${Array(motif==='keyboard'?12:motif==='terrace'?6:3).fill('<span></span>').join('')}</div>`,'</div>');
  return lines.join('\n');
}
function brownSugarSnippet(d,s) { return '[dohtml]\n'+brownSugarMarkup(d,s)+'\n\n<link rel="stylesheet" href="'+BROWN_SUGAR_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={BROWN_SUGAR_GIFS,BROWN_SUGAR_CSS_URL,brownSugarDefaults,brownSugarFilename,brownSugarMarkup,brownSugarSnippet};
