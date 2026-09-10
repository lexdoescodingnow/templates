const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const csstree=require('css-tree');
const dir=__dirname;
const read=n=>fs.readFileSync(path.join(dir,n),'utf8');
const designs=JSON.parse(read('designs.json'));
const model=require('./nectarine-model.js');
const failures=[];
let checks=0;
function check(name,fn){try{fn();checks++;}catch(e){failures.push(name+': '+e.message);}}
function doc(html){return new JSDOM(html).window.document;}
check('five of each',()=>{for(const t of ['thread','comms','bud'])assert.equal(designs.filter(d=>d.type===t).length,5);});
check('unique names',()=>assert.equal(new Set(designs.map(d=>d.name)).size,15));
const css=read('nectarine-sunskin-v1.css');
check('CSS syntax',()=>csstree.parse(css,{onParseError(e){throw e;}}));
check('no stylesheet comments',()=>assert(!css.includes('/*')));
check('scoped selectors',()=>csstree.walk(csstree.parse(css),{visit:'Rule',enter(rule){if(rule.prelude.type==='SelectorList')rule.prelude.children.forEach(selector=>assert(csstree.generate(selector).includes('.bh-nectarine')));}}));
check('mode precedence',()=>{assert(css.includes('html[color-mode="dark"] .bh-nectarine'));assert(css.includes('html:not([color-mode="light"]):not([color-mode="dark"])'));});
check('emphasis gradients',()=>{assert(css.includes('--nc-forward:linear-gradient(115deg,var(--nc-c1),var(--nc-c2),var(--nc-c3))'));assert(css.includes('--nc-reverse:linear-gradient(115deg,var(--nc-c3),var(--nc-c2),var(--nc-c1))'));assert(css.includes('text-decoration-line:underline'));});
for(const d of designs){
 const defaults=model.nectarineDefaults(d),snippet=read(model.nectarineFilename(d));
 check(d.name+' generated source',()=>assert.equal(snippet,model.nectarineSnippet(d,defaults)));
 const parsed=doc(snippet.replace('[dohtml]','').replace('[/dohtml]',''));
 const root=parsed.querySelector('.bh-nectarine');
 check(d.name+' editable field order',()=>{assert.equal(root.children[0].className,'nc-name');assert.equal(root.children[0].getAttribute('href'),'[url]');assert.equal(root.children[0].textContent,'[name]');assert.equal(root.children[1].textContent,'[text]');assert(root.querySelector('.nc-copy').textContent.includes('Lorem ipsum'));});
 check(d.name+' standalone snippet',()=>{assert(snippet.startsWith('[dohtml]\n'));assert(snippet.endsWith('[/dohtml]\n'));assert.equal(parsed.querySelectorAll('link[rel="stylesheet"]').length,1);assert.equal(parsed.querySelector('link').href,model.NECTARINE_CSS_URL);assert(!parsed.querySelector('script,style,iframe'));assert(!snippet.includes('<!--'));});
 check(d.name+' supplied GIFs',()=>{const imgs=[...root.querySelectorAll('img')];assert.equal(imgs.length,d.gifs);imgs.forEach((img,i)=>assert.equal(img.src,model.NECTARINE_GIFS[i]));});
 check(d.name+' image removal',()=>{const empty=doc(model.nectarineMarkup(d,{...defaults,gifs:[]}));assert(!empty.querySelector('.nc-media'));assert(css.includes('.nc-'+d.slug+':not(:has(.nc-media img))'));});
 if(d.type==='bud')check(d.name+' short copy',()=>assert(root.querySelector('.nc-copy').textContent.trim().split(/\s+/).length<=100));
 if(d.type==='comms')check(d.name+' opening-only paragraphs',()=>{const p=doc(model.nectarineMarkup(d,{...defaults,body:'<p>First<p>Second<p>Third'}));assert.equal(p.querySelectorAll('.nc-copy > p').length,3);assert(p.querySelector('.nc-hardware'));});
}
const browserErrors=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css-parsing'&&e.type!=='css parsing')browserErrors.push(e.message);});
const dom=new JSDOM(read('nectarine-collection-preview.html'),{runScripts:'dangerously',url:'https://preview.example/nectarine/',virtualConsole:vc});
const w=dom.window,document=w.document;
function edit(id,value){const input=document.getElementById(id);input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));}
function click(id){document.getElementById(id).click();}
function select(d){document.querySelector(`[data-design="${d.slug}"]`).click();}
for(const d of designs){
 select(d);
 check(d.name+' editor default parity',()=>{assert.equal(document.getElementById('code').value,read(model.nectarineFilename(d)));assert.equal(document.querySelectorAll('#stage img').length,d.gifs);assert.equal(document.querySelector('#stage .nc-name').textContent,'Akara & Clarity');assert.equal(document.querySelector('#stage .nc-title').textContent,d.sample);});
 check(d.name+' editor image addition',()=>{click('add-gif');assert.equal(document.querySelectorAll('#stage img').length,d.gifs+1);});
 check(d.name+' editor image removal',()=>{while(document.querySelector('#gif-fields button'))document.querySelector('#gif-fields button').click();assert(!document.querySelector('#stage .nc-media'));assert(!document.getElementById('code').value.includes('<img'));});
 check(d.name+' editor reset',()=>{click('reset');assert.equal(document.getElementById('code').value,read(model.nectarineFilename(d)));});
}
select(designs[0]);
check('editable text and BBCode conversion',()=>{edit('name','Akara & Clarity');edit('title','a <new> beginning');edit('url','https://example.com/thread?a=1&b=2');edit('writing','<p>[b]Bold[/b] and [i]italic[/i] and [u]underlined[/u].<p>Second message.');const s=document.querySelector('#stage');assert.equal(s.querySelector('b').textContent,'Bold');assert.equal(s.querySelector('i').textContent,'italic');assert.equal(s.querySelector('u').textContent,'underlined');assert.equal(s.querySelectorAll('.nc-copy > p').length,2);assert(document.getElementById('code').value.includes('a &lt;new&gt; beginning'));});
check('independent design state',()=>{select(designs[1]);assert.equal(document.getElementById('name').value,'[name]');select(designs[0]);assert.equal(document.getElementById('name').value,'Akara & Clarity');});
check('crop export',()=>{const crop=document.querySelector('#gif-fields input[type="range"]');crop.value='82';crop.dispatchEvent(new w.Event('input',{bubbles:true}));assert(document.getElementById('code').value.includes('object-position:50% 82%'));});
check('empty GIF URL',()=>{const url=document.querySelector('#gif-fields input[type="url"]');url.value='';url.dispatchEvent(new w.Event('input',{bubbles:true}));assert(!document.querySelector('#stage img'));});
check('formatted text sanitization',()=>{edit('writing','<p onclick="alert(1)">Safe<script>alert(1)</script><!-- hidden --><a href="javascript:alert(1)">link</a><iframe src="https://example.com"></iframe>');const s=document.getElementById('code').value;assert(!s.includes('onclick'));assert(!s.includes('javascript:'));assert(!s.includes('<script'));assert(!s.includes('<!--'));assert(!s.includes('<iframe'));assert(s.includes('Safe'));});
check('palette preview only',()=>{const before=document.getElementById('code').value;edit('colour-1','#2892ab');assert.equal(document.documentElement.style.getPropertyValue('--mgrgb1'),'40,146,171');assert.equal(document.getElementById('code').value,before);});
check('theme control',()=>{document.getElementById('theme').value='dark';document.getElementById('theme').dispatchEvent(new w.Event('change'));assert.equal(document.documentElement.getAttribute('color-mode'),'dark');});
check('preview width',()=>{document.getElementById('preview-width').value='320px';document.getElementById('preview-width').dispatchEvent(new w.Event('change'));assert.equal(document.getElementById('stage').style.width,'320px');});
select(designs.find(d=>d.type==='comms'));
check('message flow export',()=>{edit('flow','alternate');assert.equal(document.querySelector('#stage .bh-nectarine').dataset.flow,'alternate');assert(document.getElementById('code').value.includes('data-flow="alternate"'));});
check('copy fallback selects code',()=>{document.execCommand=()=>false;click('copy');assert.equal(document.getElementById('code').selectionStart,0);assert.equal(document.getElementById('code').selectionEnd,document.getElementById('code').value.length);assert(document.getElementById('status').textContent.includes('Code selected'));});
check('download exports current code',()=>{let content,filename;w.Blob=class {constructor(parts){content=parts.join('');}};w.URL.createObjectURL=()=> 'blob:preview';w.URL.revokeObjectURL=()=>{};const previous=w.HTMLAnchorElement.prototype.click;w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');w.HTMLAnchorElement.prototype.click=previous;assert.equal(content,document.getElementById('code').value);assert.equal(filename,model.nectarineFilename(designs.find(d=>d.type==='comms')));});
select(designs.find(d=>d.type==='bud'));
check('bud length indicator preserves long writing',()=>{edit('writing','<p>'+Array(101).fill('word').join(' ')+'</p>');assert(document.getElementById('word-count').classList.contains('over'));assert.equal(document.querySelector('#stage .nc-copy').textContent.trim().split(/\s+/).length,101);});
check('editor script runtime',()=>assert.deepEqual(browserErrors,[]));
console.log(JSON.stringify({checks,failures,browserRendering:'Not performed: local preview URL blocked by browser access policy.'},null,2));
dom.window.close();
if(failures.length)process.exitCode=1;
