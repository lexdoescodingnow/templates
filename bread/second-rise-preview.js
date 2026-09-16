const cssURL = SR_CSS_URL;
const cards = [...document.querySelectorAll('.sr-card')];
function esc(s){return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function safeURL(value){const s=value.trim();return /^(https?:\/\/|#|\[url\]$)/i.test(s)?s:'';}
function cleanCopy(value){
 const converted=value.replace(/\[(\/?)b\]/gi,'<$1b>').replace(/\[(\/?)i\]/gi,'<$1i>').replace(/\[(\/?)u\]/gi,'<$1u>');
 const holder=document.createElement('template');holder.innerHTML=converted;
 const allowed=new Set(['P','B','STRONG','I','EM','U','A','BR','BLOCKQUOTE']);
 const walk=node=>{for(const child of [...node.childNodes]){if(child.nodeType===8){child.remove();continue;}if(child.nodeType!==1)continue;if(['SCRIPT','STYLE','IFRAME','OBJECT'].includes(child.tagName)){child.remove();continue;}walk(child);if(!allowed.has(child.tagName)){child.replaceWith(...child.childNodes);continue;}for(const a of [...child.attributes]){if(child.tagName==='A'&&a.name==='href'){child.setAttribute('href',safeURL(a.value));}else child.removeAttribute(a.name);}}};
 walk(holder.content);
 if(!holder.content.querySelector('p,blockquote'))return '<p>'+holder.innerHTML.replace(/\n\s*\n/g,'</p>\n<p>')+'</p>';
 return holder.innerHTML;
}
function refresh(card){
 const d=SR_DESIGNS.find(x=>x.slug===card.dataset.design),form=card.querySelector('form'),s=Object.fromEntries(new FormData(form));
 s.name=s.name.trim()||'[name]';s.title=s.title.trim()||'[text]';s.url=safeURL(s.url)||'[url]';
 s.gif1=safeURL(s.gif1);s.gif2=safeURL(s.gif2);s.copy=cleanCopy(s.copy);
 const code=template(d,s);card.querySelector('.sr-code').value=code;
 card.querySelector('.sr-stage').innerHTML=code.replace('[dohtml]','').replace('[/dohtml]','').replace(/<link[^>]+>/g,'');
 card.querySelector('.sr-status').textContent='Preview and code updated.';
}
for(const card of cards){
 const form=card.querySelector('form');form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',()=>refresh(card));form.addEventListener('change',()=>refresh(card));
 card.querySelector('.sr-reset').addEventListener('click',()=>{form.reset();refresh(card);});
 card.querySelector('.sr-stage').addEventListener('click',e=>{if(e.target.closest('a')?.getAttribute('href')==='[url]')e.preventDefault();});
 card.querySelector('.sr-copy').addEventListener('click',async()=>{const field=card.querySelector('.sr-code'),status=card.querySelector('.sr-status');try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(field.value);status.textContent='Copied — ready to paste into JCink.';}catch{field.focus();field.select();const copied=document.execCommand('copy');status.textContent=copied?'Copied — ready to paste into JCink.':'Code selected. Press Ctrl+C or ⌘C to copy.';}});
}
for(const button of document.querySelectorAll('[data-filter]'))button.addEventListener('click',()=>{for(const item of document.querySelectorAll('[data-filter]'))item.setAttribute('aria-pressed',String(item===button));for(const card of cards)card.hidden=button.dataset.filter!=='all'&&card.dataset.type!==button.dataset.filter;});
const palette={berry:{light:['115,68,106','72,93,139','47,115,113'],dark:['218,155,202','165,185,232','137,212,209']},blue:{light:['53,86,148','98,78,141','91,76,138'],dark:['147,186,247','195,169,237','200,171,241']},green:{light:['40,108,90','102,91,69','158,73,81'],dark:['141,211,180','213,197,157','239,166,175']}};
const mediaQuery=matchMedia('(prefers-color-scheme: dark)');
function theme(){const mode=document.querySelector('#sr-mode').value;if(mode==='system')document.documentElement.removeAttribute('color-mode');else document.documentElement.setAttribute('color-mode',mode);const dark=mode==='dark'||mode==='system'&&mediaQuery.matches,p=palette[document.querySelector('#sr-palette').value][dark?'dark':'light'];for(const stage of document.querySelectorAll('.sr-stage'))p.forEach((c,i)=>stage.style.setProperty('--mgrgb'+(i+1),c));}
document.querySelector('#sr-mode').addEventListener('change',theme);document.querySelector('#sr-palette').addEventListener('change',theme);mediaQuery.addEventListener('change',theme);theme();
