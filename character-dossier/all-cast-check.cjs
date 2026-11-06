'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const zlib = require('node:zlib');
const crypto = require('node:crypto');
const Dossier = require('./dossier-model.js');
const {createZip,defaultCssUrl} = require('./build-cast.cjs');
const root = __dirname;
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const raw = JSON.parse(read('seed-library.json'));
const library = Dossier.normalizeDataset(raw);
const canonical = JSON.parse(fs.readFileSync(path.join(root,'../forum-posts/characters/characters.json'),'utf8'));
let passed = 0;
function test(name,run) { run(); passed++; console.log('PASS: '+name); }

function checksum(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes) {
    value ^= byte;
    for (let bit=0;bit<8;bit++) value = value & 1 ? (value >>> 1) ^ 0xedb88320 : value >>> 1;
  }
  return (value ^ 0xffffffff) >>> 0;
}
function readZip(buffer) {
  const end = buffer.length-22;
  assert(end>=0 && buffer.readUInt32LE(end)===0x06054b50,'ZIP end directory is missing');
  assert.equal(buffer.readUInt16LE(end+4),0);
  assert.equal(buffer.readUInt16LE(end+6),0);
  assert.equal(buffer.readUInt16LE(end+8),buffer.readUInt16LE(end+10));
  const count = buffer.readUInt16LE(end+10), start = buffer.readUInt32LE(end+16);
  assert.equal(start+buffer.readUInt32LE(end+12),end);
  let cursor = start;
  const entries = new Map();
  for (let index=0;index<count;index++) {
    assert.equal(buffer.readUInt32LE(cursor),0x02014b50);
    assert.equal(buffer.readUInt16LE(cursor+10),8);
    const nameLength=buffer.readUInt16LE(cursor+28),extraLength=buffer.readUInt16LE(cursor+30),commentLength=buffer.readUInt16LE(cursor+32);
    const name=buffer.subarray(cursor+46,cursor+46+nameLength).toString('utf8');
    assert(!entries.has(name),'Duplicate ZIP entry '+name);
    assert(!name.startsWith('/') && !name.split('/').includes('..'),'Unsafe ZIP path '+name);
    const offset=buffer.readUInt32LE(cursor+42);
    assert.equal(buffer.readUInt32LE(offset),0x04034b50);
    assert.equal(buffer.readUInt16LE(offset+8),8);
    const localNameLength=buffer.readUInt16LE(offset+26),localExtraLength=buffer.readUInt16LE(offset+28);
    assert.equal(buffer.subarray(offset+30,offset+30+localNameLength).toString('utf8'),name);
    const packedSize=buffer.readUInt32LE(cursor+20),size=buffer.readUInt32LE(cursor+24);
    assert.equal(buffer.readUInt32LE(offset+18),packedSize);
    assert.equal(buffer.readUInt32LE(offset+22),size);
    const dataStart=offset+30+localNameLength+localExtraLength;
    const data=zlib.inflateRawSync(buffer.subarray(dataStart,dataStart+packedSize));
    assert.equal(data.length,size,'Uncompressed size mismatch '+name);
    assert.equal(checksum(data),buffer.readUInt32LE(cursor+16),'CRC mismatch '+name);
    entries.set(name,data.toString('utf8'));
    cursor+=46+nameLength+extraLength+commentLength;
  }
  assert.equal(cursor,end);
  return entries;
}

test('Every canonical identity has one stable record without dropped lists or references',()=>{
  assert.equal(library.characters.length,181);
  assert.deepEqual(library.characters.map(character=>character.name).sort(),canonical.map(character=>character.name).sort());
  assert.equal(new Set(library.characters.map(character=>character.id)).size,181);
  raw.characters.forEach((source,index)=>{
    const character=library.characters[index];
    assert.equal(character.id,source.id,'Character id changed during normalization');
    for (const field of ['facts','relationships','timeline','songs','polaroids']) assert.equal(character[field].length,(source[field]||[]).length,character.id+' lost '+field);
    const connectionIds=new Set(character.relationships.map(connection=>connection.id));
    for (let item=0;item<character.relationships.length;item++) assert.equal(character.relationships[item].id,source.relationships[item].id,'Duplicate or changed connection id in '+character.id);
    for (let item=0;item<character.timeline.length;item++) {
      const entry=character.timeline[item],original=source.timeline[item];
      assert.equal(entry.id,original.id,'Duplicate or changed story id in '+character.id);
      assert.deepEqual(entry.connectionIds,original.connectionIds||[],'A story connection reference was removed in '+character.id);
      assert(entry.connectionIds.every(id=>connectionIds.has(id)));
    }
  });
});

const archive=readZip(fs.readFileSync(path.join(root,'all-characters.zip')));
test('The ZIP is complete, internally valid and shares its assets once',()=>{
  assert.equal(archive.size,library.characters.length*2+8);
  assert.equal(archive.get('atelier.html'),read('atelier.html'),'The ZIP must include the current portable editor');
  assert(archive.get('index.html').includes('href="atelier.html"'));
  assert.equal(Array.from(archive.keys()).filter(name=>name.startsWith('posts/')).length,181);
  assert.equal(Array.from(archive.keys()).filter(name=>name.startsWith('previews/')).length,181);
  assert.equal(archive.get('assets/dossier-v5.css'),read('dossier-v5.css'));
  assert.equal(archive.get('assets/dossier-runtime-v5.js'),read('palette.js')+'\n'+read('runtime.js'));
  assert.deepEqual(JSON.parse(archive.get('library.json')),library);
  new vm.Script(archive.get('assets/dossier-runtime-v5.js'),{filename:'archived-runtime.js'});
  assert.throws(()=>createZip([{name:'../outside.txt',data:'x'}]),/Unsafe/);
  assert.throws(()=>createZip([{name:'same.txt',data:'x'},{name:'same.txt',data:'y'}]),/duplicate/);
  const unicode=readZip(createZip([{name:'unicode.txt',data:'Jiae · 지애 · He / Him'}]));
  assert.equal(unicode.get('unicode.txt'),'Jiae · 지애 · He / Him');
});

test('All 181 previews and forum posts match their own current character',()=>{
  for (const character of library.characters) {
    const post=archive.get('posts/'+character.id+'.txt');
    const preview=archive.get('previews/'+character.id+'.html');
    assert.equal(post,Dossier.forum(character,defaultCssUrl),'Wrong or outdated forum post: '+character.id);
    assert(preview.includes(Dossier.render(character)),'Wrong or outdated preview: '+character.id);
    assert.equal((preview.match(/<article class="bh-dossier-v5"/g)||[]).length,1);
    assert(preview.includes('href="../assets/dossier-v5.css"'));
    assert(preview.includes('src="../assets/dossier-runtime-v5.js"'));
    assert(!preview.includes('srcdoc='),'A map document leaked back into forum-parsed markup');
    assert(!/<script\s*>/.test(preview),'Individual previews should use the shared runtime');
    assert.equal((post.match(/<link rel="stylesheet"/g)||[]).length,1);
    assert.equal((post.match(/<script\b/g)||[]).length,1);
    assert(!post.includes('srcdoc='));
    assert(archive.get('index.html').includes('previews/'+character.id+'.html'));
    assert(archive.get('index.html').includes('posts/'+character.id+'.txt'));
  }
  assert.equal(archive.get('posts/baek-samuel.txt'),read('sam-forum.txt'),'Approved Sam alias is out of sync');
});

test('Coverage distinguishes recorded migration status from populated fields',()=>{
  const coverage=JSON.parse(read('migration-coverage.json'));
  assert.equal(coverage.version,1);
  assert.equal(coverage.summary.characters,181);
  assert.equal(coverage.characters.length,181);
  assert.equal(coverage.librarySha256,crypto.createHash('sha256').update(JSON.stringify(library)).digest('hex'));
  const sourcePath=path.join(root,'migration-sources.json');
  const sourceText=fs.existsSync(sourcePath)?fs.readFileSync(sourcePath,'utf8'):'';
  const sourceRows=new Map(sourceText?JSON.parse(sourceText).characters.map(row=>[row.id,row]):[]);
  assert.equal(coverage.sourceManifestSha256,sourceText?crypto.createHash('sha256').update(sourceText).digest('hex'):null);
  for (const character of library.characters) {
    const row=coverage.characters.find(item=>item.id===character.id),source=sourceRows.get(character.id);
    assert(row,'Missing coverage row '+character.id);
    assert.equal(row.status,source?source.status:'unreviewed');
    assert.deepEqual(row.sources,source?source.sources:[]);
    assert.equal(row.counts.facts,character.facts.filter(fact=>fact.label&&fact.value).length);
    assert.equal(row.counts.connections,character.relationships.length);
    assert.equal(row.counts.story,character.timeline.length);
    assert.equal(row.counts.songs,character.songs.length);
    assert.equal(row.counts.map,character.mapLatitude!==''&&character.mapLongitude!=='');
  }
  for (const status of ['migrated','partial','starter','unreviewed']) assert.equal(coverage.summary[status],coverage.characters.filter(row=>row.status===status).length);
  assert.deepEqual(JSON.parse(archive.get('migration-coverage.json')),coverage);
  assert(!archive.get('migration-coverage.html').includes('href="cast.html"'),'Archive coverage links must work after extraction');
});

test('The portable browser embeds the full current library and parseable scripts',()=>{
  const page=read('cast.html');
  const scripts=Array.from(page.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi));
  assert.equal(scripts.length,4);
  for (const match of scripts) {
    assert(!/\bsrc=/.test(match[1]),'The cast browser must carry its own scripts');
    new vm.Script(match[2],{filename:'cast-inline.js'});
  }
  const state={window:{}};
  vm.runInNewContext(scripts[1][2],state);
  assert.deepEqual(JSON.parse(JSON.stringify(state.window.DOSSIER_CAST_DATA)),library);
  assert.equal(state.window.DOSSIER_CAST_CONFIG.stylesheetUrl,defaultCssUrl);
  assert(page.includes('id="cast-search"'));
  assert(page.includes('id="cast-copy"'));
  assert(page.includes('id="cast-download"'));
  assert(page.includes('atelier.html?character='));
  assert(page.includes('href="all-characters.zip"'));
  assert(page.includes('href="migration-coverage.html"'));
});

test('Development migration protects identities and uses current source titles and music',()=>{
  const helper=require('./development-enrich.cjs');
  const result=helper.apply(library.characters);
  assert.equal(result.metadata.topicsCaptured,58);
  assert.equal(result.metadata.matched,58);
  assert.deepEqual(result.metadata.unmatched,[]);
  assert.equal(new Set(result.metadata.records.map(record=>record.id)).size,58);
  const byId=id=>result.characters.find(character=>character.id===id);
  for(let index=0;index<library.characters.length;index++) {
    const before=library.characters[index],after=result.characters[index];
    for(const field of ['id','name','nickname','age','pronouns','occupation','relationshipStatus','avatar']) assert.equal(after[field],before[field],field+' changed in '+before.id);
    assert.deepEqual(after.relationships.filter(connection=>connection.kind==='Partner').map(connection=>[connection.id,connection.name,connection.status]),before.relationships.filter(connection=>connection.kind==='Partner').map(connection=>[connection.id,connection.name,connection.status]));
  }
  assert.deepEqual(byId('baek-samuel'),library.characters.find(character=>character.id==='baek-samuel'));
  assert.deepEqual(helper.apply(result.characters).characters,result.characters,'Repeating migration must not duplicate or change content');
  assert(byId('gabriel-yang').songs.some(song=>song.url.endsWith('1fDFHXcykq4iw8Gg7s5hG9')));
  assert(!byId('lucian-yang').songs.some(song=>song.url.endsWith('1fDFHXcykq4iw8Gg7s5hG9')),'A cross-citation must not assign Gabriel\'s development topic to Lucian');
  assert(!byId('byun-yuseop').facts.some(fact=>/^preferred name$/i.test(fact.label)&&/^(?:name|kia)$/i.test(fact.value)));
  assert.equal(byId('byun-yuseop').timeline.find(entry=>entry.url.includes('showtopic=83999')).title.toLowerCase(),'mochidoki cake batter');
  assert.equal(byId('park-taein').timeline.find(entry=>entry.url.includes('showtopic=84000')).title.toLowerCase(),'t2 french earl grey');
  assert.equal(byId('choi-jinseok').relationships.find(connection=>connection.kind==='Group'&&connection.name==='TO@ME').brand,'Ghirardelli');
  assert(!result.characters.some(character=>character.songs.some(song=>/^Spotify (?:track|album)$/.test(song.title))),'Verified titles should replace neutral import labels');
  assert(!result.characters.some(character=>character.songs.some(song=>/^From (?:the character|the development post)/.test(song.note))));
  assert.throws(()=>helper.apply({}),/character list/);
});

console.log('\n'+passed+' all-cast checks passed for '+library.characters.length+' characters.');
