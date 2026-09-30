const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {JSDOM,VirtualConsole}=require('jsdom');
const cssTree=require('css-tree');
const root=__dirname,designs=JSON.parse(fs.readFileSync(path.join(root,'designs.json'),'utf8'));
const html=fs.readFileSync(path.join(root,'cucumber-collection-preview.html'),'utf8');
const css=fs.readFileSync(path.join(root,'cucumber-cool-current-v1.css'),'utf8');
const errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>{if(e.type!=='css parsing')errors.push(e.message);});
const dom=new JSDOM(html,{runScripts:'dangerously',virtualConsole:vc,beforeParse(w){w.matchMedia=()=>({matches:false,addEventListener(){}});}});
const {document}=dom.window;
const simpleHTML=code=>code.replace(/\[\/?dohtml\]/gi,'').replace(/<link[^>]*>/gi,'');
const formChange=(form,key,value)=>{form.elements.namedItem(key).value=value;form.dispatchEvent(new dom.window.Event('input',{bubbles:true}));};
let copied='';Object.defineProperty(dom.window.navigator,'clipboard',{configurable:true,value:{writeText:async value=>{copied=value;}}});
assert.equal(designs.length,15);assert.equal(new Set(designs.map(d=>d.name)).size,15);
for(const type of ['thread','comms','bud'])assert.equal(designs.filter(d=>d.type===type).length,5);
assert(!css.includes('@import'));assert(!/\/\*|<!--/.test(css));
const parsed=cssTree.parse(css);let scopedRules=0;
cssTree.walk(parsed,n=>{if(n.type==='Rule'){assert(cssTree.generate(n.prelude).includes('.cu1'));scopedRules++;}});
(async()=>{
for(const d of designs){
const source=fs.readFileSync(path.join(root,d.file),'utf8').trim();
assert(source.startsWith('[dohtml]'));assert(source.endsWith('[/dohtml]'));assert.equal((source.match(/<link /g)||[]).length,1);
assert(!/<!--|\/\*|<script|<style/.test(source));assert(source.includes('Lorem ipsum'));
for(const marker of ['[url]','[name]','[text]'])assert(source.indexOf(marker)>0&&source.indexOf(marker)<500);
const card=document.getElementById(d.slug),form=card.querySelector('form'),area=card.querySelector('.cp-code');
assert.equal(area.value.trim(),source);assert(card.querySelector('.cp-stage').textContent.includes('Tao & Zhiyuan'));
assert.equal(card.querySelectorAll('.cp-stage img').length,d.images);
card.querySelector('.cp-copy').click();await Promise.resolve();assert.equal(copied.trim(),source);
card.querySelector('.cp-named').click();await Promise.resolve();assert(copied.includes('Tao &amp; Zhiyuan'));assert(!copied.includes('[name]'));assert(copied.includes('[url]'));
formChange(form,'name','Example & Partner');formChange(form,'title','A title <with> symbols');formChange(form,'url','https://example.com/?a=1&b=2');
assert(card.querySelector('.cp-stage .cu-name').textContent==='Example & Partner');assert(area.value.includes('A title &lt;with&gt; symbols'));assert(area.value.includes('https://example.com/?a=1&amp;b=2'));
formChange(form,'copy','<p>[b]Bold[/b]<p>[i]Italic[/i]<p>[u]Underline[/u]');
assert.equal(card.querySelectorAll('.cu-copy>p').length,3);assert.equal(card.querySelector('.cu-copy b').textContent,'Bold');assert.equal(card.querySelector('.cu-copy i').textContent,'Italic');assert.equal(card.querySelector('.cu-copy u').textContent,'Underline');assert(!/\[\/?[biu]\]/i.test(area.value));
formChange(form,'gif1','');formChange(form,'gif2','');assert.equal(card.querySelectorAll('.cu-shot').length,0);assert.equal(card.querySelectorAll('.cu-media').length,0);
formChange(form,'gif1','https://example.com/image.gif');assert.equal(card.querySelectorAll('.cu-shot').length,1);
if(d.type==='comms'){for(const direction of ['sent','alternating','received']){formChange(form,'direction',direction);assert.equal(card.querySelector('.cu1').dataset.direction,direction);}}
card.querySelector('.cp-reset').click();assert.equal(area.value.trim(),source);
if(d.type==='bud'){const b=new JSDOM(simpleHTML(source));const text=b.window.document.querySelector('.cu-copy').textContent.trim();assert(text.split(/\s+/).length<=100);b.window.close();}
}
for(const filter of ['thread','comms','bud','all']){document.querySelector(`[data-filter=${filter}]`).click();assert.equal(document.querySelectorAll('.cp-card:not([hidden])').length,filter==='all'?15:5);}
for(const mode of ['dark','light']){const select=document.getElementById('cp-mode');select.value=mode;select.dispatchEvent(new dom.window.Event('change'));assert.equal(document.documentElement.getAttribute('color-mode'),mode);}
Object.defineProperty(dom.window.navigator,'clipboard',{configurable:true,value:undefined});
const first=document.querySelector('.cp-card'),area=first.querySelector('.cp-code');first.querySelector('.cp-copy').click();await Promise.resolve();assert.equal(area.selectionStart,0);assert.equal(area.selectionEnd,area.value.length);
const post=fs.readFileSync(path.join(root,'../forum-posts/cucumber-forum-masterpost.txt'),'utf8');
const blocks=[...post.matchAll(/\[code\]\s*([\s\S]*?)\s*\[\/code\]/g)].map(m=>m[1]);assert.equal(blocks.length,15);
for(const d of designs)assert(blocks.includes(fs.readFileSync(path.join(root,d.file),'utf8').trim()));
for(const part of fs.readdirSync(path.join(root,'../forum-posts')).filter(f=>/^cucumber-post-\d+\.txt$/.test(f)))assert(fs.readFileSync(path.join(root,'../forum-posts',part),'utf8').length<45000);
assert.deepEqual(errors,[]);dom.window.close();
console.log(`PASS: 15 designs, ${scopedRules} scoped CSS rules; exact default copy and named copy; safe text escaping; BBCode conversion; unclosed paragraphs; all message directions; image removal/addition; resets; filters; explicit modes; clipboard fallback; exact forum code blocks; post-size limits.`);
})().catch(e=>{console.error(e);process.exitCode=1});
