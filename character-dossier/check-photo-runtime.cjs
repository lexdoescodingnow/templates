'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname,'runtime.js'),'utf8');
const oldPhoto = 'https://b.l3n.co/i/n8q1lD.png';
const newPhoto = 'https://i.pinimg.com/736x/06/8f/90/068f90bba27ca8df5350c9ddc119485e.jpg';
const settle = () => new Promise(resolve=>setImmediate(resolve));

function deferred() {
  let resolve,reject;
  const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});
  return {promise,resolve,reject};
}
function harness(get) {
  let now=0,sequence=0,observer;
  const timers=new Map(),calls=[],articles=[];
  const documentEvents=new Map();
  const document={
    documentElement:{contains:element=>articles.includes(element)&&element.isConnected},
    querySelectorAll:()=>articles.filter(article=>article.isConnected),
    addEventListener:(name,handler)=>{documentEvents.set(name,handler);}
  };
  function article(url=oldPhoto) {
    const attributes={'data-theme-mode':'auto'};
    const styles={'--bd1-accent':'#5b8612','--bd2-image-position':'50% 35%'};
    const image={src:url,tagName:'IMG',getAttribute:()=>null,matches:selector=>selector==='.bd1-hero img',closest:()=>element};
    const element={
      nodeType:1,isConnected:true,
      style:{getPropertyValue:name=>styles[name]||'',setProperty:(name,value)=>{styles[name]=value;}},
      getAttribute:name=>attributes[name]||null,setAttribute:(name,value)=>{attributes[name]=value;},
      querySelector:selector=>selector==='.bd1-hero img'?image:null,querySelectorAll:()=>[],
      matches:selector=>selector==='.bh-dossier-v5',closest:()=>element
    };
    articles.push(element);
    return {element,image,attributes,styles};
  }
  const first=article();
  const context=vm.createContext({
    document,module:{exports:{}},AbortController,
    addEventListener:()=>{},
    setTimeout:(callback,delay)=>{const id=++sequence;timers.set(id,{callback,due:now+delay,delay});return id;},
    clearTimeout:id=>timers.delete(id),
    MutationObserver:class {constructor(callback){observer=callback;}observe(){}},
    PhotoPalette:{get:(url,options)=>{calls.push({url,options});return get(url,options,calls.length);}}
  });
  new vm.Script(source,{filename:'runtime.js'}).runInContext(context);
  const api=context.module.exports;
  async function runNext() {
    const next=Array.from(timers.entries()).sort((a,b)=>a[1].due-b[1].due)[0];
    if(!next)return false;
    timers.delete(next[0]);now=next[1].due;next[1].callback();await settle();return true;
  }
  async function drain(limit=12) {
    let count=0;while(timers.size&&count<limit){count++;await runNext();}
    assert.equal(timers.size,0,'The runtime must not create an endless retry loop');
  }
  function mutate(target=first.image) {observer([{type:'attributes',target,attributeName:'src'}]);}
  function removed(item) {item.element.isConnected=false;observer([{type:'childList',target:document.documentElement,addedNodes:[],removedNodes:[item.element]}]);}
  function added(item) {item.element.isConnected=true;observer([{type:'childList',target:document.documentElement,addedNodes:[item.element],removedNodes:[]}]);}
  return {api,context,calls,timers,first,article,documentEvents,runNext,drain,mutate,removed,added};
}

(async()=>{
  let passed=0;
  async function test(name,run){await run();passed++;console.log('PASS: '+name);}

  await test('A temporary sampling error recovers automatically without losing the cached colour',async()=>{
    const h=harness((url,options,count)=>count===1?Promise.reject(new Error('temporary image failure')):Promise.resolve('#876c63'));
    h.api.start();await settle();
    assert.equal(h.calls.length,1);
    assert.equal(h.first.attributes['data-theme-state'],'retrying');
    assert.equal(h.first.styles['--bd1-accent'],'#5b8612');
    assert.equal(Array.from(h.timers.values())[0].delay,1000);
    await h.runNext();
    assert.equal(h.calls.length,2);
    assert.equal(h.calls[1].options.refresh,true);
    assert.equal(h.first.attributes['data-theme-state'],'ready');
    assert.equal(h.first.styles['--bd1-accent'],'#876c63');
    assert.equal(h.timers.size,0);
    h.api.scan();await settle();assert.equal(h.calls.length,2);
  });

  await test('Persistent failure stops after two retries and retains the last colour',async()=>{
    const h=harness(()=>Promise.reject(new Error('offline')));
    h.api.start();await settle();await h.runNext();
    assert.equal(Array.from(h.timers.values())[0].delay,4000);
    await h.drain();
    assert.equal(h.calls.length,3);
    assert.equal(h.first.attributes['data-theme-state'],'error');
    assert.equal(h.first.styles['--bd1-accent'],'#5b8612');
    for(let index=0;index<5;index++)h.api.scan();
    h.documentEvents.get('load')({target:h.first.image});await h.drain();
    assert.equal(h.calls.length,3,'Ordinary scans must not restart an exhausted retry cycle');
  });

  await test('Changing the header cancels a scheduled retry for the old image',async()=>{
    const h=harness(url=>url===oldPhoto?Promise.reject(new Error('old image failed')):Promise.resolve('#876c63'));
    h.api.start();await settle();h.first.image.src=newPhoto;h.mutate();await h.drain();
    assert.deepEqual(h.calls.map(call=>call.url),[oldPhoto,newPhoto]);
    assert.equal(h.first.styles['--bd1-accent'],'#876c63');
    assert.equal(h.first.attributes['data-theme-state'],'ready');
  });

  await test('A stale response cannot overwrite a newer photo, even when its promise ignores abort',async()=>{
    const first=deferred();
    const h=harness(url=>url===oldPhoto?first.promise:Promise.resolve('#876c63'));
    h.api.start();await settle();h.first.image.src=newPhoto;h.mutate();await h.drain();
    assert.equal(h.calls[0].options.signal.aborted,true);
    first.resolve('#004400');await settle();
    assert.equal(h.first.styles['--bd1-accent'],'#876c63');
    assert.equal(h.first.attributes['data-theme-state'],'ready');
    assert.equal(h.calls.length,2);assert.equal(h.timers.size,0);
  });

  await test('Manual mode cancels scheduled and pending automatic changes',async()=>{
    const waiting=harness(()=>Promise.reject(new Error('temporary')));
    waiting.api.start();await settle();
    waiting.first.attributes['data-theme-mode']='manual';waiting.first.styles['--bd1-accent']='#123456';waiting.mutate(waiting.first.element);await waiting.drain();
    assert.equal(waiting.calls.length,1);assert.equal(waiting.first.attributes['data-theme-state'],'manual');
    assert.equal(waiting.first.styles['--bd1-accent'],'#123456');
    const pending=deferred(),inflight=harness(()=>pending.promise);
    inflight.api.start();await settle();inflight.first.attributes['data-theme-mode']='manual';inflight.first.styles['--bd1-accent']='#654321';inflight.mutate(inflight.first.element);await inflight.drain();
    assert.equal(inflight.calls[0].options.signal.aborted,true);
    pending.reject(new Error('late rejection'));await settle();
    assert.equal(inflight.first.attributes['data-theme-state'],'manual');assert.equal(inflight.first.styles['--bd1-accent'],'#654321');assert.equal(inflight.timers.size,0);
  });

  await test('Removed previews cancel retries and can start cleanly if reinserted',async()=>{
    let working=false;
    const h=harness(()=>working?Promise.resolve('#876c63'):Promise.reject(new Error('temporary')));
    h.api.start();await settle();h.removed(h.first);await h.drain();assert.equal(h.calls.length,1);
    working=true;h.added(h.first);await h.drain();
    assert.equal(h.calls.length,2);assert.equal(h.first.attributes['data-theme-state'],'ready');assert.equal(h.first.styles['--bd1-accent'],'#876c63');
  });

  await test('Retries are independent for separate dossiers and crop changes get a fresh attempt',async()=>{
    let oldCalls=0;
    const h=harness((url,options)=>url===oldPhoto&&++oldCalls===1?Promise.reject(new Error('temporary')):Promise.resolve(url===oldPhoto?'#335577':'#876c63'));
    const second=h.article(newPhoto);h.api.start();await settle();
    assert.equal(second.attributes['data-theme-state'],'ready');await h.drain();
    assert.equal(h.first.styles['--bd1-accent'],'#335577');assert.equal(second.styles['--bd1-accent'],'#876c63');
    h.first.styles['--bd2-image-position']='50% 80%';h.mutate(h.first.element);await h.drain();
    assert.equal(h.calls.at(-1).options.crop,'50% 80%');assert.equal(h.calls.at(-1).options.refresh,false);
  });

  await test('Explicit refresh resets an exhausted cycle and the revision2 singleton is reused',async()=>{
    let working=false;
    const h=harness(()=>working?Promise.resolve('#876c63'):Promise.reject(new Error('offline')));
    h.api.start();await settle();await h.drain();working=true;h.api.refresh(h.first.element);await settle();
    assert.equal(h.calls.length,4);assert.equal(h.first.styles['--bd1-accent'],'#876c63');
    assert.equal(h.api.version,5);assert.equal(h.api.revision,2);
    h.context.BlueHourDossierRuntime=h.api;new vm.Script(source).runInContext(h.context);
    assert.equal(h.context.module.exports,h.api);
  });

  console.log('\n'+passed+' photo runtime checks passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
