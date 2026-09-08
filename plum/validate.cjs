const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const m=require('./plum-model.js');
const root=__dirname;
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const revision=fs.existsSync(path.join(root,'stylesheet-revision.txt'))?read('stylesheet-revision.txt').trim():'main';
const css=read('plum-lasting-season-v1.css');
const snippets=m.PLUM_DESIGNS.map(d=>read(m.plumFilename(d)));
assert.equal(new Set(m.PLUM_DESIGNS.map(d=>d.name)).size,15);
for(const type of ['thread','comms','bud'])assert.equal(m.PLUM_DESIGNS.filter(d=>d.type===type).length,5);
snippets.forEach((s,i)=>{
 assert.equal(s,m.plumSnippet(m.PLUM_DESIGNS[i],m.plumDefaults(m.PLUM_DESIGNS[i]),revision));
 assert.ok(s.startsWith('[dohtml]\n')&&s.endsWith('[/dohtml]\n'));
 assert.equal((s.match(/<link /g)||[]).length,1);
 assert.ok(s.indexOf('[url]')<s.indexOf('plm-copy')&&s.indexOf('[name]')<s.indexOf('plm-copy')&&s.indexOf('[text]')<s.indexOf('plm-copy'));
 assert.ok(s.indexOf('<link')>s.indexOf('plm-copy'));
 assert.ok(!/<!--|<script|\/\*|===|---/.test(s));
 if(m.PLUM_DESIGNS[i].type==='bud')assert.ok(m.plumDefaults(m.PLUM_DESIGNS[i]).body.replace(/<[^>]*>/g,'').split(/\s+/).length<=100);
});
assert.ok(!/\/\*|<!--/.test(css));
const assets=process.env.PLUM_ASSET_MAP?JSON.parse(fs.readFileSync(process.env.PLUM_ASSET_MAP,'utf8')):{};
(async()=>{
 const browser=await chromium.launch(process.env.PLUM_BROWSER?{executablePath:process.env.PLUM_BROWSER}:{});
 try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 await page.route('https://**/*',async route=>{const a=assets[route.request().url()];if(a?.path)await route.fulfill({body:fs.readFileSync(a.path),contentType:a.contentType});else await route.abort();});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const mode of ['light','dark']){
  for(const width of [560,320]){
   const markup=m.PLUM_DESIGNS.map(d=>`<section style="width:${width}px">${m.plumMarkup(d,{...m.plumDefaults(d),name:'Jason & Mike',title:d.type==='comms'?'online now':'in the hush of you'})}</section>`).join('');
   await page.setContent(`<html color-mode="${mode}"><head><style>${css}</style></head><body style="margin:0;--mgrgb1:126,64,103;--mgrgb2:125,106,153;--mgrgb3:170,90,117">${markup}</body></html>`);
   await page.evaluate(()=>document.fonts.ready);
   const faults=await page.evaluate(()=>[...document.querySelectorAll('.plm')].flatMap(el=>{
    const faults=[],box=el.getBoundingClientRect();
    if(el.scrollWidth>el.clientWidth+2)faults.push(el.className+' horizontal overflow');
    const parts=[...el.querySelectorAll(':scope>.plm-name,:scope>.plm-title,:scope>.plm-copy,:scope>.plm-media')].filter(p=>getComputedStyle(p).display!=='none');
    for(const p of parts){const r=p.getBoundingClientRect();if(r.left<box.left-1||r.right>box.right+1)faults.push(el.className+' escaped '+p.className);if(p.classList.contains('plm-copy')&&p.scrollHeight>p.clientHeight+2)faults.push(el.className+' clipped '+p.className);}
    for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){const a=parts[i].getBoundingClientRect(),b=parts[j].getBoundingClientRect();if(Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)faults.push(el.className+' overlaps '+parts[i].className+' / '+parts[j].className);}
    return faults;
   }));
   assert.deepEqual(faults,[],`${mode} ${width}px`);
   const before=await page.locator('.plm-copy').evaluateAll(es=>es.map(e=>e.clientWidth));
   await page.locator('.plm-media').evaluateAll(es=>es.forEach(e=>e.replaceChildren()));
   const empty=await page.locator('.plm-media').evaluateAll(es=>es.every(e=>getComputedStyle(e).display==='none'));
   assert.ok(empty,'Empty media must disappear');
   const after=await page.locator('.plm-copy').evaluateAll(es=>es.map(e=>e.clientWidth));
   assert.ok(after.every((w,i)=>w>=before[i]-1),'Removing images must reclaim writing space: '+JSON.stringify({mode,width,before,after}));
   await page.locator('.plm-media').evaluateAll(es=>es.forEach(e=>e.remove()));
   const removed=await page.locator('.plm-copy').evaluateAll(es=>es.map(e=>e.clientWidth));
   assert.deepEqual(removed,after,'Removing media containers must match empty media');
  }
 }
 await page.goto('file://'+path.join(root,'plum-collection-preview.html'));
 for(let i=0;i<15;i++){
  await page.evaluate(i=>plumSelect(i),i);
  assert.equal(await page.locator('#pv-code').inputValue(),snippets[i]);
 }
 await page.evaluate(()=>plumSelect(5));
 await page.locator('#pv-name').fill('A very long character name that still belongs in a message header');
 await page.locator('#pv-body').fill('<p>[b]Hello[/b]<p>[i]Second[/i]<p>[u]Third[/u]');
 assert.equal(await page.locator('#pv-stage .plm-copy>p').count(),3);
 assert.equal(await page.locator('#pv-stage .plm-copy>b').count(),0);
 assert.equal(await page.locator('#pv-stage .plm-copy p>b').textContent(),'Hello');
 const emphasis=await page.locator('#pv-stage .plm-copy').evaluate(el=>['b','i','u'].map(tag=>getComputedStyle(el.querySelector(tag)).backgroundImage));
 assert.equal(emphasis[0],emphasis[2]);assert.notEqual(emphasis[0],emphasis[1]);
 assert.ok(emphasis.every(x=>x.startsWith('linear-gradient')));
 await page.locator('#pv-flow').selectOption('mixed');
 const edges=await page.locator('#pv-stage .plm-copy>p').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().right));
 assert.ok(edges[1]>edges[0],'Mixed messages alternate alignment');
 await page.locator('[data-remove="0"]').click();
 assert.equal(await page.locator('#pv-stage .plm-media').count(),0);
 assert.ok(!(await page.locator('#pv-code').inputValue()).includes('<img'));
 await page.locator('#pv-add-gif').click();
 assert.equal(await page.locator('#pv-stage .plm-media img').count(),1);
 const original=await page.locator('#pv-code').inputValue();
 const colours=await page.locator('#pv-stage .plm-name').evaluate(e=>getComputedStyle(e).color);
 await page.locator('#pv-palette').selectOption('lagoon');
 assert.notEqual(await page.locator('#pv-stage .plm-name').evaluate(e=>getComputedStyle(e).color),colours);
 assert.equal(await page.locator('#pv-code').inputValue(),original,'Preview colours must not leak into forum code');
 await page.emulateMedia({colorScheme:'dark'});
 await page.locator('#pv-mode').selectOption('light');
 assert.equal(await page.locator('#pv-stage .plm').evaluate(e=>getComputedStyle(e).getPropertyValue('--plm-paper').trim()),'#faf9f7');
 await page.locator('#pv-mode').selectOption('system');
 assert.equal(await page.locator('#pv-stage .plm').evaluate(e=>getComputedStyle(e).getPropertyValue('--plm-paper').trim()),'#1d1d20');
 await page.emulateMedia({colorScheme:'light'});
 await page.locator('#pv-mode').selectOption('dark');
 assert.equal(await page.locator('#pv-stage .plm').evaluate(e=>getComputedStyle(e).getPropertyValue('--plm-paper').trim()),'#1d1d20');
 await page.locator('#pv-next').click();await page.locator('#pv-previous').click();
 assert.equal(await page.locator('#pv-code').inputValue(),original,'Switching designs preserves edits');
 await page.locator('#pv-view-all').click();assert.equal(await page.locator('.pv-tile').count(),15);
 await page.locator('[data-open="5"]').click();
 const downloadPromise=page.waitForEvent('download');await page.locator('#pv-download').click();const download=await downloadPromise;
 assert.equal(fs.readFileSync(await download.path(),'utf8'),original);
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{value:{writeText:()=>Promise.reject(new Error('Unavailable'))},configurable:true}));
 await page.locator('#pv-copy').click();
 assert.ok(await page.locator('#pv-code-details').evaluate(e=>e.open));
 assert.equal(await page.locator('#pv-code').evaluate(e=>e.selectionEnd-e.selectionStart),original.length);
 await page.setViewportSize({width:375,height:900});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile preview must fit');
 assert.deepEqual(errors,[]);
 console.log('PASS: 15 snippets; 60 light/dark and width renderings; media removal/reflow; comms paragraphs; emphasis gradients; palette inheritance; explicit modes; editor state; gallery; exact download; clipboard fallback; mobile preview.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
