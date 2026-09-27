const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const csstree=require('css-tree');
const root=__dirname,source=path.join(root,'../portuguese-cuisine');
const designs=require('../portuguese-cuisine/designs.json');
const m=require('../portuguese-cuisine/portuguese-cuisine-model.js');
const read=f=>fs.readFileSync(f,'utf8');
let checks=0,cascadeCases=0;
const ok=(v,label)=>{assert.ok(v,label);checks++};
const css=read(path.join(root,'fig-orchard-standalone-v1.css'));
const errors=[];const ast=csstree.parse(css,{onParseError:e=>errors.push(e.message)});
ok(!errors.length,'New CSS parses');
ok(css===read(path.join(root,'fig-orchard-v1.css')),'Standalone CSS matches source');
ok(!/\/\*|@import|<!--/.test(css),'No comments or CSS imports');
csstree.walk(ast,{visit:'Rule',enter(n){if(n.prelude?.type==='SelectorList')for(const sel of n.prelude.children)ok(csstree.generate(sel).includes('.fig-v1'),'New selectors scoped to Fig');}});
const legacy=[];
for(const filename of ['portuguese-cuisine-mesa-v1.css','portuguese-cuisine-mesa-standalone-v1.css']){
 const tree=csstree.parse(read(path.join(source,filename)));
 csstree.walk(tree,{visit:'Rule',enter(n){if(n.prelude?.type==='SelectorList')for(const sel of n.prelude.children)legacy.push(csstree.generate(sel).replace(/::(?:before|after|first-letter|first-line)/g,''));}});
}
ok(new Set(designs.map(d=>d.name)).size===15,'Fifteen unique Fig names');
for(const kind of ['thread','comms','bud'])ok(designs.filter(d=>d.type===kind).length===5,'Five '+kind+' designs');
for(const d of designs){
 const state=m.portugueseDefaults(d),code=read(path.join(source,m.portugueseFilename(d)));
 ok(code===m.portugueseSnippet(d,state),d.name+' snippet matches model');
 ok(code.startsWith('[dohtml]')&&code.trimEnd().endsWith('[/dohtml]'),d.name+' forum wrapper');
 const dom=new JSDOM(code),doc=dom.window.document;
 ok(doc.querySelectorAll('link[rel="stylesheet"]').length===1,d.name+' single stylesheet');
 ok(doc.querySelector('link').href===m.PORTUGUESE_CSS_URL&&m.PORTUGUESE_CSS_URL.includes('@main/fig/fig-orchard-standalone-v1.css'),d.name+' correct direct CSS URL');
 ok(doc.querySelector('.ptg-name').textContent==='Seojun & Wenjun',d.name+' ship members');
 ok(doc.querySelector('.ptg-title').textContent===d.sample,d.name+' readable title');
 ok(!/<!--|<script\b|\[text\]|\[name\]/.test(code),d.name+' no comments, scripts or old visible placeholders');
 const images=[...doc.querySelectorAll('img')];
 ok(images.length===d.gifs,d.name+' original GIF count');
 for(const img of images){ok(img.parentElement.className==='fg1-portrait',d.name+' independent portrait frame');ok(m.PORTUGUESE_GIFS.includes(img.src),d.name+' original GIF URL');}
 ok(code.indexOf('ptg-name')<code.indexOf('ptg-copy')&&code.indexOf('ptg-copy')<code.indexOf(d.type==='comms'?'fg1-hardware':'fg1-motif'),d.name+' editable fields first');
 if(d.type==='bud')ok(doc.querySelector('.ptg-copy').textContent.trim().split(/\s+/).length<=100,d.name+' short reply');
 if(d.type==='comms'){
  const paragraphDoc=new JSDOM(m.portugueseMarkup(d,{...state,body:'<p>First<p>Second<p>Third'})).window.document;
  ok(paragraphDoc.querySelectorAll('.ptg-copy>p').length===3,d.name+' opening-only paragraphs');
 }
 for(const count of [0,1,2,4]){
  const doc2=new JSDOM(m.portugueseMarkup(d,{...state,gifs:Array.from({length:count},(_,i)=>({url:m.PORTUGUESE_GIFS[i%2],position:'50% 35%'}))})).window.document;
  ok(doc2.querySelectorAll('.fg1-portrait').length===count,d.name+' '+count+' image frames');
  if(!count)ok(!doc2.querySelector('.ptg-media'),d.name+' empty media omitted');
  const matched=legacy.filter(selector=>doc2.querySelector(selector));
  ok(matched.length===0,d.name+' no legacy selectors match current markup at '+count+' images');cascadeCases+=2;
 }
 dom.window.close();
}
ok(css.includes('html:not([color-mode="light"]):not([color-mode="dark"])'),'Explicit modes override system fallback');
ok(css.includes('--fg-forward:linear-gradient(110deg,var(--fg-ta),var(--fg-tb),var(--fg-tc))'),'Forward b/u gradient');
ok(css.includes('--fg-reverse:linear-gradient(110deg,var(--fg-tc),var(--fg-tb),var(--fg-ta))'),'Reverse italic gradient');
const runtime=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing')runtime.push(e.message)});
const preview=read(path.join(root,'fig-collection-preview.html'));
ok(preview===read(path.join(source,'portuguese-cuisine-collection-preview.html')),'Both editor addresses identical');
const dom=new JSDOM(preview,{runScripts:'dangerously',virtualConsole:vc,url:'https://example.invalid/fig-preview'}),w=dom.window,doc=w.document;w.scrollTo=()=>{};
const input=(id,value)=>{const e=doc.getElementById(id);e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}))};
for(let i=0;i<15;i++){
 doc.querySelectorAll('.pv-choice')[i].click();
 ok(doc.querySelector('#pv-design-title').textContent===designs[i].name,'Editor selection '+i);
 ok(doc.querySelector('#pv-code').value===read(path.join(source,m.portugueseFilename(designs[i]))),'Editor export '+i);
}
doc.querySelectorAll('.pv-choice')[0].click();
input('pv-body','<p>[b]Bold[/b] and [i]italic[/i] and [u]underline[/u].<p>Second message');
let code=doc.querySelector('#pv-code').value;ok(code.includes('<b>Bold</b>')&&code.includes('<i>italic</i>')&&code.includes('<u>underline</u>'),'Emphasis conversion');
input('pv-title','Figs <for> two');input('pv-name','Seojun & Wenjun');ok(doc.querySelector('#pv-code').value.includes('Figs &lt;for&gt; two'),'Title escaping');
input('pv-body','<p>Safe<script>bad()</script><a href="javascript:bad()">text</a></p>');ok(!doc.querySelector('#pv-code').value.includes('bad()'),'Unsafe input stripped');
while(doc.querySelector('[data-remove]'))doc.querySelector('[data-remove]').click();ok(!doc.querySelector('#pv-stage .ptg-media'),'Remove GIFs updates preview');
doc.querySelector('#pv-add-gif').click();ok(doc.querySelectorAll('#pv-stage .fg1-portrait').length===1,'Add GIF creates frame');
doc.querySelectorAll('.pv-choice')[1].click();doc.querySelectorAll('.pv-choice')[0].click();ok(doc.querySelector('#pv-title').value==='Figs <for> two','Per-design edits retained');
input('pv-body','<p>'+('Long writing. '.repeat(200))+'</p>');ok(doc.querySelector('#pv-stage .ptg-copy').textContent.length>2000,'Long writing retained');
doc.querySelector('#pv-reset').click();ok(doc.querySelector('#pv-code').value===read(path.join(source,m.portugueseFilename(designs[0]))),'Reset exports original code');
doc.querySelector('#pv-view-all').click();ok(doc.querySelectorAll('#pv-gallery .fig-v1').length===15,'Gallery includes all Fig designs');
doc.querySelector('[data-open="8"]').click();ok(doc.querySelector('#pv-design-title').textContent==='Pulp Exchange','Gallery selects design');
for(const mode of ['dark','light','system']){const s=doc.querySelector('#pv-mode');s.value=mode;s.dispatchEvent(new w.Event('change'));ok(doc.documentElement.getAttribute('color-mode')===(mode==='system'?null:mode),'Mode control '+mode);}
const palette=doc.querySelector('#pv-palette');palette.value='lagoon';palette.dispatchEvent(new w.Event('change'));ok(doc.documentElement.style.getPropertyValue('--mgrgb1')==='20,133,120','Member palette control');
ok(!doc.querySelector('#pv-code').value.includes('--mgrgb'),'Preview palette stays out of posting code');
let copied='';Object.defineProperty(w.navigator,'clipboard',{value:{writeText:async value=>{copied=value}}});
(async()=>{
 await doc.querySelector('#pv-copy').onclick();ok(copied===doc.querySelector('#pv-code').value,'Clipboard matches posting export');
 w.navigator.clipboard.writeText=async()=>{throw Error('Denied')};await doc.querySelector('#pv-copy').onclick();ok(doc.querySelector('#pv-code-details').open,'Manual clipboard fallback');
 ok(doc.querySelector('#pv-code').selectionEnd===doc.querySelector('#pv-code').value.length,'Fallback selects complete code');
 ok(runtime.length===0,'No editor runtime errors: '+runtime.join('; '));
 console.log(JSON.stringify({checks,designs:15,legacy_stylesheet_cases:cascadeCases,editor:'passed',visual_rendering:'not verified: cloud browser local URL restriction'},null,2));dom.window.close();
})();
