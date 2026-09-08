const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const root=__dirname;
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const designs=JSON.parse(read('designs.json'));
const {JELLY_CSS_URL,JELLY_GIFS,jellyDefaults,jellyFilename,jellySnippet,jellyMarkup}=require('./jelly-model.js');
const css=read('jelly-glass-v1.css');
const preview=read('jelly-collection-preview.html');
const files=fs.readdirSync(root).filter(x=>x.endsWith('.txt'));
assert.equal(files.length,15);
assert.equal(new Set(designs.map(d=>d.name)).size,15);
assert.equal(new Set(designs.map(d=>d.slug)).size,15);
for(const type of ['thread','comms','bud'])assert.equal(designs.filter(d=>d.type===type).length,5);
for(const d of designs){
  const file=jellyFilename(d),code=read(file),state=jellyDefaults(d);
  assert.equal(code,jellySnippet(d,state),file+' diverged from editor model');
  assert(code.startsWith('[dohtml]\n')&&code.endsWith('[/dohtml]\n'),file);
  assert.equal((code.match(/<link /g)||[]).length,1,file);
  assert(code.includes(JELLY_CSS_URL),file);
  assert(css.includes(`.bhj-${d.slug}`),file+' has no variant CSS');
  assert(!/<!--|\/\*|<script|<style|<iframe|\bid=|\shidden[\s=>]/i.test(code),file);
  assert(code.indexOf('[url]')<code.indexOf('bhj-copy')&&code.indexOf('[name]')<code.indexOf('bhj-copy')&&code.indexOf('[text]')<code.indexOf('bhj-copy'),file);
  assert(code.indexOf('bhj-copy')<code.indexOf(d.type==='comms'?'class="bhj-hardware"':'class="bhj-gel"'),file);
  assert.equal((code.match(/<img /g)||[]).length,d.gifs,file);
  for(const src of [...code.matchAll(/<img src="([^"]+)"/g)].map(x=>x[1]))assert(JELLY_GIFS.includes(src),file);
  assert(code.includes('<b>')&&code.includes('<i>')&&code.includes('<u>'),file);
  assert.equal((code.match(/<div\b/g)||[]).length,(code.match(/<\/div>/g)||[]).length,file+' unbalanced wrapper');
  assert.equal((code.match(/<p>/g)||[]).length,(code.match(/<\/p>/g)||[]).length,file+' unbalanced default paragraphs');
  if(d.type==='bud')assert(state.body.replace(/<[^>]*>/g,'').trim().split(/\s+/).length<=100,file);
  const empty=jellyMarkup(d,{...state,gifs:[]});
  assert(!empty.includes('bhj-media'),file+' retains a media container after removal');
  const escaped=jellyMarkup(d,{...state,name:'<tag> & "name"',title:'<script>title</script>'});
  assert(escaped.includes('&lt;tag&gt; &amp; &quot;name&quot;')&&!escaped.includes('<script>'),file+' unsafe plain-text fields');
  for(const n of [0,1,2,3]){
    const gifs=Array.from({length:n},(_,i)=>({url:JELLY_GIFS[i%2],position:'50% 35%'}));
    assert.equal((jellyMarkup(d,{...state,gifs}).match(/<img /g)||[]).length,n,file+' image count');
  }
}
assert(!/\/\*|@import/i.test(css));
assert(css.includes('var(--mgrgb1,')&&css.includes('var(--mgrgb2,')&&css.includes('var(--mgrgb3,'));
assert(css.includes('html[color-mode="dark"]')&&css.includes('html[color-mode="light"]')&&css.includes('html:not([color-mode="light"])'));
assert(css.includes('--bhj-reverse:linear-gradient(105deg,var(--bhj-g3),var(--bhj-g2),var(--bhj-g1))'));
assert(css.includes('.bhj-comms .bhj-copy p'));
assert(css.includes('.bhj-gliss:not(:has(.bhj-media img))')&&css.includes('.bhj-quiver-chat:not(:has(.bhj-media img))')&&css.includes('.bhj-gelee-kiss:not(:has(.bhj-media img))'));
const stack=[];let quote=null,escape=false;
for(const c of css){if(escape){escape=false;continue;}if(c==='\\'){escape=true;continue;}if(quote){if(c===quote)quote=null;continue;}if(c==='"'||c==="'"){quote=c;continue;}if(c==='{'||c==='('||c==='[')stack.push(c);if(c==='}'||c===')'||c===']')assert.equal(stack.pop(),{'}':'{',')':'(',']':'['}[c],'Unbalanced CSS');}
assert.equal(stack.length,0);assert.equal(quote,null);
for(const f of ['jelly-model.js','jelly-editor.js'])new vm.Script(read(f),{filename:f});
const ids=[...preview.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate editor IDs');
for(const m of read('jelly-editor.js').matchAll(/\$\('#([^']+)'\)/g))assert(ids.includes(m[1]),'Missing editor element '+m[1]);
assert(preview.includes(css));
assert(preview.includes(read('jelly-editor.js')));
console.log('PASS: 15 distinct snippets; five of each type; source/editor agreement; exact GIF URLs; safe top fields; balanced markup/CSS; member gradients; explicit mode overrides; 0–3 GIF generation; image-removal selectors; bud word counts; editor syntax and controls.');
console.log('Not covered: browser rendering, runtime editor interaction, clipboard/download behaviour, or live JCink posting.');
