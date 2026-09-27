const main=document.querySelector('.pt-main');
const mode=document.getElementById('pt-mode');
const mediaMode=window.matchMedia('(prefers-color-scheme:dark)');
function setMode(){document.documentElement.setAttribute('color-mode',mode.value==='system'?(mediaMode.matches?'dark':'light'):mode.value);}
mode.addEventListener('change',setMode);mediaMode.addEventListener('change',()=>{if(mode.value==='system')setMode();});
document.getElementById('pt-width').addEventListener('change',e=>main.dataset.width=e.target.value);
document.getElementById('pt-palette').addEventListener('change',e=>main.dataset.palette=e.target.value);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.pt-card').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.kind!==button.dataset.filter);}));
function convertWriting(value){
value=value.replace(/\[(\/)?(b|i|u)\]/gi,(_,close,tag)=>'<'+(close?'/':'')+tag.toLowerCase()+'>');
const doc=new DOMParser().parseFromString(value,'text/html');
doc.querySelectorAll('script,style,iframe,object,embed,link,meta').forEach(el=>el.remove());
doc.querySelectorAll('*').forEach(el=>{for(const a of [...el.attributes])if(a.name.startsWith('on')||a.name==='srcdoc'||(/^(href|src)$/.test(a.name)&&/^\s*javascript:/i.test(a.value)))el.removeAttribute(a.name);});
return doc.body.innerHTML;
}
async function copyValue(value,area,status){
try{if(!navigator.clipboard)throw Error('clipboard');await navigator.clipboard.writeText(value);status.textContent='Copied.';}
catch(e){area.value=value;area.focus();area.select();area.setSelectionRange(0,value.length);status.textContent='Code selected — press Ctrl+C or ⌘C.';}
}
for(const d of designs){
const card=document.getElementById(d.slug),form=card.querySelector('form'),stage=card.querySelector('.pt-stage'),code=card.querySelector('.pt-code'),status=card.querySelector('.pt-status');
function state(){const s={...defaults(d),...Object.fromEntries(new FormData(form))};s.copy=convertWriting(s.copy);for(const k of ['crop1','crop2'])if(!/^\d{1,3}%\s+\d{1,3}%$/.test(s[k]))s[k]='50% 35%';return s;}
function update(){const value=template(d,state());stage.innerHTML=bare(value);code.value=value;status.textContent='';}
form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',update);form.addEventListener('change',update);
card.querySelector('.pt-reset').addEventListener('click',()=>{const s=defaults(d);for(const [k,v] of Object.entries(s))if(form.elements.namedItem(k))form.elements.namedItem(k).value=v;update();});
card.querySelector('.pt-copy').addEventListener('click',()=>{const value=template(d,state());code.value=value;copyValue(value,code,status);});
card.querySelector('.pt-placeholders').addEventListener('click',()=>copyValue(template(d,{...state(),name:'[name]',url:'[url]',title:'[text]'}),code,status));
}
