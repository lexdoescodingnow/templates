'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = __dirname;
const Dossier = require('./dossier-model.js');
const read = name => fs.readFileSync(path.join(base, name), 'utf8');
const source = JSON.parse(fs.readFileSync(path.join(base, '../forum-posts/characters/characters.json'), 'utf8'));
const seed = JSON.parse(read('seed-library.json'));
const library = Dossier.normalizeDataset(seed);
const tests = [];
function test(name, run) {
  run();
  tests.push(name);
  console.log('PASS: ' + name);
}
function clean(value) { return value.replace(/\[\/?(?:b|i|u)\]/gi, '').trim(); }
function character(values = {}) { return { id:'test-character', name:'Test character', ...values }; }
function safeNormalization(input, assertion) {
  let value;
  try { value = Dossier.normalizeCharacter(input); }
  catch (error) { assert(error instanceof Error); return; }
  assertion(value);
}
const stylesheet = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v1.css';
const sam = library.characters.find(item => item.id === 'baek-samuel');

test('All 181 canonical identities and imported details survive normalization', () => {
  assert.equal(library.characters.length, 181);
  assert.deepEqual(library.characters.map(item => item.name).sort(), source.map(item => item.name).sort());
  assert.equal(new Set(library.characters.map(item => item.id)).size, 181);
  for (const original of source) {
    const actual = library.characters.find(item => item.name === original.name);
    const description = original.code.match(/\[CD=([\s\S]*?)\]\s*\[CN=/)[1];
    assert.equal(actual.nickname, description.match(/^❧\s*\[b\]([\s\S]*?)\[\/b\]/)[1]);
    assert.equal(String(actual.age), description.match(/⸺\s*(\d+) years old/)[1]);
    assert.equal(actual.pronouns, description.match(/years old\s*⋄\s*([^⋄]+)⋄/)[1].trim());
    assert.equal(actual.occupation, clean(description.match(/years old\s*⋄\s*[^⋄]+⋄\s*([\s\S]*?)(?:\s*⋄\s*♡|\s*⸺\s*looks like)/)[1]));
    assert.equal(actual.facts.find(item => item.label === 'Face claim').value, description.match(/looks like\s*\[i\]([\s\S]*?)\[\/i\]/)[1]);
    assert(actual.portrait.startsWith('https://'));
    const partnerSection = description.match(/♡\s*(married to|engaged to|in a relationship with)\s*([\s\S]*?)\s*♡/);
    const partnerNames = partnerSection ? Array.from(partnerSection[2].matchAll(/\[b\]([\s\S]*?)\[\/b\]/g), match=>match[1].toLowerCase()) : [];
    assert.deepEqual(actual.relationships.filter(item=>item.kind==='Partner').map(item=>item.name.toLowerCase()).sort(), partnerNames.sort());
  }
});

test('Sam retains the approved age/status, all facts, songs, connections and tracker destinations', () => {
  assert.equal(String(sam.age), '25');
  assert.equal(sam.relationshipStatus, 'In a relationship');
  assert.equal(sam.facts.length, 15);
  assert.equal(sam.songs.length, 10);
  assert.equal(sam.relationships.length, 4);
  assert.equal(sam.timeline.length, 5);
  assert.deepEqual(sam.timeline.map(item => item.url.match(/showtopic=(\d+)/)[1]), ['62747','64015','83999','98948','104200']);
  assert.deepEqual(Dossier.sortTimeline(sam.timeline).map(item => item.id), sam.timeline.map(item => item.id));
  assert.equal(sam.songs[0].url, 'https://open.spotify.com/track/5KyOUICJIvO0z71MBdPGiX');
  assert.equal(sam.songs[9].url, 'https://open.spotify.com/track/4UJwJG0Byki4e9MNTxo8aF');
  assert.deepEqual(sam.songs.map(item=>item.url.split('/').pop()), ['5KyOUICJIvO0z71MBdPGiX','0SIEcuChTr2DIhuPgklpeP','3AOf6YEpxQ894FmrwI9k96','2EFxmF45ZsAvSQBGyMYGTB','2tYiQoXXbAEdwBTG0qanqi','2nNBdv2vcJZuWOZ06nNF62','0M1NR0EXFkMoy8nt4JNXKH','40UVUuyy5RfpO0awclCttA','4tLAqSfrGmx5L0akJWNdK5','4UJwJG0Byki4e9MNTxo8aF']);
  assert(sam.timeline.every(item => !item.date && !item.postedDate));
  assert(library.characters.every(item => item.relationships.every(connection => !connection.pinned)));
  assert.deepEqual(sam.relationships.map(item => item.flavour), ['almond','cereal','marshmallow','treacle']);
  const connectionIds = new Set(sam.relationships.map(item => item.id));
  assert(sam.timeline.every(item => item.connectionIds.every(id => connectionIds.has(id))));
});

test('Invalid imports cannot silently replace a library with an empty or malformed dataset', () => {
  for (const input of [null, [], {}, {version:1, characters:[]}, {version:1, characters:'wrong'}, {version:1, characters:[null]}]) {
    assert.throws(() => Dossier.normalizeDataset(input));
  }
  assert.equal(Dossier.normalizeDataset(character({name:'A real character'})).characters[0].name, 'A real character');
  const malicious = JSON.parse('{"version":1,"characters":[{"id":"safe","name":"Safe","__proto__":{"polluted":true}}],"__proto__":{"polluted":true}}');
  Dossier.normalizeDataset(malicious);
  assert.equal({}.polluted, undefined);
});

test('Unicode, quotation marks, distinct story dates and connection links round-trip intact', () => {
  const raw = character({name:'Trần Bảo & Bāng Dí', nickname:'B', notes:'“a memory” — 雨 & café',
    relationships:[{id:'connection-one',name:'Seo Hyemi',kind:'Friend',summary:'she said “hello”'}],
    timeline:[{id:'story-one',title:'The next day',date:'2026-10-13',postedDate:'2026-11-06',dateLabel:'Autumn',participants:'Bảo & Hyemi',connectionIds:['connection-one'],type:'Thread'}]});
  const first = Dossier.normalizeCharacter(raw);
  const roundtrip = Dossier.normalizeDataset(JSON.parse(JSON.stringify({version:1,characters:[first]}))).characters[0];
  assert.deepEqual(roundtrip, first);
  assert.equal(roundtrip.name, raw.name);
  assert.equal(roundtrip.notes, raw.notes);
  assert.equal(roundtrip.timeline[0].date, '2026-10-13');
  assert.equal(roundtrip.timeline[0].postedDate, '2026-11-06');
  assert.deepEqual(roundtrip.timeline[0].connectionIds, ['connection-one']);
});

test('Chronology supports year, month and day precision and preserves undated ordering', () => {
  const entries = [
    {id:'u1',title:'Undated first',date:''},
    {id:'late',title:'Later',date:'2026-12-31'},
    {id:'month',title:'Month',date:'2026-02'},
    {id:'year',title:'Year',date:'2025'},
    {id:'leap',title:'Leap day',date:'2024-02-29'},
    {id:'u2',title:'Undated second',date:''}
  ];
  assert.deepEqual(Dossier.sortTimeline(entries).map(item => item.id), ['leap','year','month','late','u1','u2']);
  for (const date of ['2025-02-29','2026-02-30','2026-04-31','2026-13','2026-00','2026-11-00','not-a-date']) {
    safeNormalization(character({timeline:[{id:'bad',title:'Bad date',date}]}), result => {
      assert.notEqual(result.timeline[0].date, date, 'Invalid calendar date must not become a valid chronology key: '+date);
    });
  }
});

test('Duplicate IDs are rejected or resolved without producing duplicate anchors', () => {
  safeNormalization(character({relationships:[{id:'same',name:'One'},{id:'same',name:'Two'}],timeline:[{id:'same-story',title:'One'},{id:'same-story',title:'Two'}]}), result => {
    assert.equal(new Set(result.relationships.map(item => item.id)).size, result.relationships.length);
    assert.equal(new Set(result.timeline.map(item => item.id)).size, result.timeline.length);
    const html = Dossier.render(result);
    const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), item=>item[1]);
    assert.equal(new Set(ids).size, ids.length);
  });
  const duplicated = {version:1,characters:[character(),character()]};
  let result;
  try { result = Dossier.normalizeDataset(duplicated); }
  catch (error) { assert(error instanceof Error); return; }
  assert.equal(new Set(result.characters.map(item => item.id)).size, result.characters.length);
});

test('Large imported lists are preserved or explicitly rejected instead of silently truncated', () => {
  const facts = Array.from({length:600}, (_, index)=>({label:'Fact '+index,value:'Value '+index}));
  safeNormalization(character({facts}), result => assert.equal(result.facts.length, facts.length));
  const notes = 'A'.repeat(16000);
  safeNormalization(character({notes}), result => assert.equal(result.notes, notes));
});

test('The closest-connections section shows at most three chosen people without deleting the others', () => {
  const relationships = ['One','Two','Three','Four'].map((name,index)=>({id:'person-'+index,name,pinned:true}));
  const normalized = Dossier.normalizeCharacter(character({relationships}));
  assert.equal(normalized.relationships.length, 4);
  const output = Dossier.render(normalized);
  const section = output.match(/<section\b[^>]*\bid="[^"]+-people"[^>]*>([\s\S]*?)<\/section>/);
  assert(section, 'A pinned connection should appear in the closest-connections section');
  assert.equal((section[1].match(/<a\b/g)||[]).length, 3);
  assert(section[1].includes('One') && section[1].includes('Two') && section[1].includes('Three'));
  assert(!section[1].includes('Four'));
  assert(output.includes('Four'), 'Unpinned/overflow connections must remain in the full connection list');
});

test('Text is escaped, unsafe links cannot execute, and Spotify embeds require the real host', () => {
  const unsafe = '<script>alert("x")</script><img src=x onerror="alert(1)"> & "quotes"';
  assert(!Dossier.escapeHtml(unsafe).includes('<'));
  for (const url of ['javascript:alert(1)','data:text/html,<script>alert(1)</script>','vbscript:msgbox(1)','file:///C:/private.txt']) assert.equal(Dossier.safeUrl(url), '');
  const output = Dossier.render(character({name:unsafe, notes:unsafe, portrait:'javascript:alert(1)',
    relationships:[{id:'person',name:unsafe,url:'javascript:alert(1)'}],
    timeline:[{id:'story',title:unsafe,url:'javascript:alert(1)',summary:unsafe}],
    songs:[{title:unsafe,artist:unsafe,url:'https://open.spotify.com.evil.example/embed/track/5KyOUICJIvO0z71MBdPGiX'}]}));
  assert(!/<script\b|<[^>]+\sonerror\s*=|(?:href|src)="javascript:/i.test(output));
  assert(!/<iframe\b/i.test(output), 'A lookalike Spotify host must not produce an embed');
  const embed = Dossier.render(character({songs:[{title:'Track',url:'https://open.spotify.com/track/5KyOUICJIvO0z71MBdPGiX'}]}));
  assert(/<iframe\b/.test(embed));
  assert(embed.includes('https://open.spotify.com/embed/track/5KyOUICJIvO0z71MBdPGiX'));
});

test('Forum output contains complete static content and one shared stylesheet', () => {
  const output = Dossier.forum(sam, stylesheet);
  assert(output.startsWith('[dohtml]') && output.trimEnd().endsWith('[/dohtml]'));
  assert.equal((output.match(/\[dohtml\]/g)||[]).length, 1);
  assert.equal((output.match(/\[\/dohtml\]/g)||[]).length, 1);
  assert.equal((output.match(/<link\b[^>]*rel="stylesheet"/g)||[]).length, 1);
  assert(!/<script\b|pgy-pikeplace|dropboxusercontent|unpkg\.com|bluehour-cosmicmeet/i.test(output));
  assert(output.includes(stylesheet));
  for (const entry of sam.timeline) assert(output.includes(entry.url.replaceAll('&','&amp;')));
  for (const fact of sam.facts) assert(output.includes(Dossier.escapeHtml(fact.value)));
  for (const song of sam.songs) assert(output.includes(Dossier.escapeHtml(song.title)));
  assert(!/\bundefined\b|\bNaN\b/.test(output));
});

test('The portable editor bundles all scripts and contains parseable JavaScript', () => {
  const portable = read('atelier.html');
  assert(!/<script\b[^>]*\bsrc=/i.test(portable));
  assert(!/<link\b[^>]*href="(?:editor|dossier-v1)\.css"/i.test(portable));
  const scripts = Array.from(portable.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi), match=>match[1]);
  assert(scripts.length >= 3);
  scripts.forEach((script,index) => new vm.Script(script, {filename:'atelier-script-'+index+'.js'}));
  const dataContext = {};
  vm.runInNewContext(read('seed-data.js'), dataContext);
  assert.equal(dataContext.DOSSIER_SEED.characters.length, 181);
  assert(dataContext.DOSSIER_NOTICES['baek-samuel'].length > 0);
});

console.log('\n'+tests.length+' checks passed. Browser layout, controls and live forum compatibility need separate verification.');
