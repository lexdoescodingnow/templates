const GINGER_GIFS = [
  'https://64.media.tumblr.com/04987a67013c7780126e90a37677daf2/0d900e73a5869448-be/s400x600/8e1ca8614f624dfe1fd8cf6f0aa25e91e477ca8e.gifv',
  'https://64.media.tumblr.com/04cb6d079b81be8160b465f2c0e808f3/0d900e73a5869448-e3/s400x600/db57f9fc8dbfe00065b38eb9decd7895e7e411cb.gifv'
];
const GINGER_CSS_URL = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@f7d796d9844cf92401e7181b09f6ba8c92ebf3c2/ginger/ginger-apothecary-v1.css';
const GINGER_THREAD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i>Ut enim ad minim veniam</i>, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <u>Duis aute irure dolor</u> in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>\n\n<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n\n<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>';
const GINGER_COMMS = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>.</p>\n<p><i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua.</p>\n<p>Ut enim ad minim veniam. <u>Quis nostrud exercitation</u>?</p>';
const GINGER_BUD = '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <u>quis nostrud exercitation</u> ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>';
function gingerEscape(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function gingerDefaults(design) { return { name:'[name]',url:'[url]',title:'[text]',time:'19:08',flow:'received',gifs:Array.from({length:design.gifs},(_,i)=>({url:GINGER_GIFS[i%2],position:'50% 35%'})),body:design.type==='thread'?GINGER_THREAD:design.type==='comms'?GINGER_COMMS:GINGER_BUD }; }
function gingerFilename(design) { return `ginger-${design.slug}-${design.type}-${design.number}.txt`; }
function gingerMarkup(design,state) {
  const flow=design.type==='comms'?` data-flow="${gingerEscape(state.flow)}"`:'';
  const lines=[`<div class="bh-ginger ggr-${design.type} ggr-${design.slug}"${flow}>`,`<a class="ggr-name" href="${gingerEscape(state.url)}">${gingerEscape(state.name)}</a>`,`<div class="ggr-title">${gingerEscape(state.title)}</div>`];
  if(design.type==='comms') lines.push(`<div class="ggr-time">${gingerEscape(state.time)}</div>`);
  const gifs=state.gifs.filter(g=>g.url.trim());
  if(gifs.length) { lines.push('<div class="ggr-media">'); gifs.forEach(g=>lines.push(`<img src="${gingerEscape(g.url.trim())}" alt="Character GIF" style="object-position:${gingerEscape(g.position)}">`)); lines.push('</div>'); }
  lines.push('<div class="ggr-copy">',state.body,'</div>',`<div class="${design.type==='comms'?'ggr-hardware':'ggr-motif'}" aria-hidden="true"></div>`,'</div>');
  return lines.join('\n');
}
function gingerSnippet(design,state) { return '[dohtml]\n'+gingerMarkup(design,state)+'\n\n<link rel="stylesheet" href="'+GINGER_CSS_URL+'">\n[/dohtml]\n'; }
if(typeof module!=='undefined') module.exports={GINGER_GIFS,GINGER_CSS_URL,gingerDefaults,gingerFilename,gingerMarkup,gingerSnippet};

