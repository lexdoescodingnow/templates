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
function assertNoExecutableMarkup(html) {
  assert(!/<script\b|(?:href|src)="javascript:/i.test(html));
  for (const match of html.matchAll(/<[^>]+>/g)) {
    const outsideValues = match[0].replace(/"[^"]*"|'[^']*'/g, '""');
    assert(!/\son[a-z]+\s*=/i.test(outsideValues), 'Escaped data must not create event-handler attributes');
  }
}
function safeNormalization(input, assertion) {
  let value;
  try { value = Dossier.normalizeCharacter(input); }
  catch (error) { assert(error instanceof Error); return; }
  assertion(value);
}
const stylesheet = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v3.css';
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
    assert.equal(actual.avatar, original.name === 'Baek Samuel' ? 'https://c.l3n.co/i/n8qt60.png' : original.code.match(/\[PI=([^\]]+)\]/)[1]);
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

test('Related facts stay paired without duplicating header information', () => {
  const output = Dossier.render(sam);
  const facts = output.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/);
  assert(facts);
  const rows = facts[1].split('<div class="bd3-fact-row">').slice(1).map(row=>Array.from(row.matchAll(/<dt>([^<]+)<\/dt>/g), match=>match[1]));
  for (const pair of [['Nationality','Ethnicity'],['Romanticality','Sexuality'],['Residency','Birthday']]) {
    assert(rows.some(row=>JSON.stringify(row)===JSON.stringify(pair)), 'Expected adjacent fact pair: '+pair.join(' / '));
  }
  assert(rows.every(row=>row.length<=2));
  assert(!facts[1].includes('<dt>Occupation</dt>') && !facts[1].includes('<dt>Based in</dt>'));
  assert(!output.includes('ANXIOUS HEART') && !/aria-label="Character traits"/.test(output));
});

test('Sam, Ben and Cookie retain their distinct supplied colours and separate portrait images', () => {
  assert.equal(sam.accent, '#5b8612');
  assert.equal(library.characters.find(item => item.id === 'ben-dam').accent, '#a99b8e');
  assert.equal(library.characters.find(item => item.id === 'cookie-chalongrat-vihokratana').accent, '#d9804d');
  assert.equal(sam.avatar, 'https://c.l3n.co/i/n8qt60.png');
  assert.equal(sam.portrait, 'https://b.l3n.co/i/n8q1lD.png');
  const html = Dossier.render(sam);
  assert(html.includes(sam.avatar) && html.includes(sam.portrait));
});

test('Sam’s three polaroids preserve the selected people and their existing directory portraits', () => {
  assert.deepEqual(sam.polaroids.map(item=>item.name), ['Hoseong','Jiae','Hajun']);
  const fullNames = ['Hwak Hoseong','Baek Jiae','Kang Hajun'];
  fullNames.forEach((name,index)=>{
    const original = source.find(item=>item.name===name);
    assert.equal(sam.polaroids[index].image, original.code.match(/\[PI=([^\]]+)\]/)[1]);
  });
  assert.equal(sam.polaroids[0].url, 'https://bluehour.jcink.net/index.php?showtopic=104200');
  assert(!sam.polaroids[1].url && !sam.polaroids[2].url);
  const rendered = Dossier.render(sam);
  for (const photo of sam.polaroids) {
    assert(rendered.includes(Dossier.escapeHtml(photo.name)));
    assert(rendered.includes(photo.image));
  }
  assert.throws(()=>Dossier.normalizeCharacter(character({polaroids:[...sam.polaroids,{name:'Fourth',image:'https://example.com/fourth.jpg'}]})));
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
  const raw = character({name:'Trần Bảo & Bāng Dí', nickname:'B', notes:'“a memory” — 雨 & café', avatar:'https://example.com/portrait.png', imagePosition:'75% 20%',
    polaroids:[{name:'雨',image:'https://example.com/rain.png',url:'https://example.com/story'}],mapLocation:'San Bernardino, CA',mapLatitude:'34.1211115',mapLongitude:'-117.301767',mapZoom:11,
    relationships:[{id:'connection-one',name:'Seo Hyemi',kind:'Friend',summary:'she said “hello”'}],
    timeline:[{id:'story-one',title:'The next day',date:'2026-10-13',postedDate:'2026-11-06',dateLabel:'Autumn',participants:'Bảo & Hyemi',connectionIds:['connection-one'],type:'Thread'}]});
  const first = Dossier.normalizeCharacter(raw);
  const roundtrip = Dossier.normalizeDataset(JSON.parse(JSON.stringify({version:1,characters:[first]}))).characters[0];
  assert.deepEqual(roundtrip, first);
  assert.equal(roundtrip.name, raw.name);
  assert.equal(roundtrip.notes, raw.notes);
  assert.equal(roundtrip.avatar, raw.avatar);
  assert.equal(roundtrip.imagePosition, '75% 20%');
  assert.deepEqual(roundtrip.polaroids, raw.polaroids);
  assert.equal(roundtrip.mapLocation, raw.mapLocation);
  assert.equal(roundtrip.mapLatitude, raw.mapLatitude);
  assert.equal(roundtrip.mapLongitude, raw.mapLongitude);
  assert.equal(roundtrip.mapZoom, raw.mapZoom);
  assert.equal(roundtrip.timeline[0].date, '2026-10-13');
  assert.equal(roundtrip.timeline[0].postedDate, '2026-11-06');
  assert.deepEqual(roundtrip.timeline[0].connectionIds, ['connection-one']);
});

test('City maps validate coordinate ranges, retain city-level provenance and escape labels safely', () => {
  assert.equal(sam.mapLocation, 'San Bernardino, CA');
  assert.equal(Number(sam.mapLatitude), 34.1211115);
  assert.equal(Number(sam.mapLongitude), -117.301767);
  assert.equal(sam.mapZoom, 11);
  const mapHtml = Dossier.render(character({mapLocation:sam.mapLocation,mapLatitude:sam.mapLatitude,mapLongitude:sam.mapLongitude,mapZoom:sam.mapZoom}));
  const mapSource = mapHtml.match(/<iframe\b[^>]*src="([^"]+)"/);
  assert(mapSource);
  const mapUrl = new URL(mapSource[1].replaceAll('&amp;','&'));
  assert.equal(mapUrl.origin, 'https://www.openstreetmap.org');
  assert.equal(mapUrl.searchParams.get('marker'), sam.mapLatitude+','+sam.mapLongitude);
  assert(library.characters.filter(item=>item.id!==sam.id).every(item=>!item.mapLatitude && !item.mapLongitude));
  for (const fields of [
    {mapLatitude:'86'}, {mapLatitude:'-86'}, {mapLongitude:'181'}, {mapLongitude:'-181'},
    {mapLatitude:'NaN'}, {mapLatitude:'Infinity'}, {mapLongitude:'0;alert(1)'},
    {mapZoom:1}, {mapZoom:19}, {mapZoom:3.5}
  ]) assert.throws(()=>Dossier.normalizeCharacter(character(fields)));
  const partial = Dossier.normalizeCharacter(character({mapLocation:'Partial',mapLatitude:'34',mapLongitude:''}));
  assert(!/<iframe\b/i.test(Dossier.render(partial)), 'One coordinate alone must not create a map');
  const unsafe = '<script>alert(1)</script><img src=x onerror="alert(1)">';
  const safe = Dossier.normalizeCharacter(character({mapLocation:unsafe,mapLatitude:'34',mapLongitude:'-117',mapZoom:11,polaroids:[{name:unsafe,image:'javascript:alert(1)',url:'javascript:alert(1)'}]}));
  assert.equal(safe.polaroids[0].image, '');
  assert.equal(safe.polaroids[0].url, '');
  const html = Dossier.render(safe);
  assertNoExecutableMarkup(html);
  assert(html.includes(Dossier.escapeHtml(unsafe)));
});

test('Portrait addresses and image cropping cannot inject markup or arbitrary styles', () => {
  const invalid = Dossier.normalizeCharacter(character({avatar:'javascript:alert(1)',imagePosition:'50% 35%;x:y'}));
  assert.equal(invalid.avatar, '');
  assert.notEqual(invalid.imagePosition, '50% 35%;x:y');
  assert(!Dossier.render(invalid).includes('x:y'));
  const boundary = Dossier.normalizeCharacter(character({imagePosition:'0% 100%'}));
  assert.equal(boundary.imagePosition, '0% 100%');
  for (const imagePosition of ['-1% 35%','101% 35%','50% 101%','url(x)','50%']) {
    safeNormalization(character({imagePosition}), result => assert.notEqual(result.imagePosition, imagePosition));
  }
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

test('Legacy traits and rankings remain editable data without duplicating the uniform connection cards', () => {
  const relationships = ['One','Two','Three','Four'].map((name,index)=>({id:'person-'+index,name,pinned:true}));
  relationships[0].featured = true;
  const normalized = Dossier.normalizeCharacter(character({relationships,tags:['LEGACY TRAIT SENTINEL']}));
  assert.equal(normalized.relationships.length, 4);
  assert(normalized.relationships.every(item=>item.pinned));
  assert.deepEqual(normalized.tags, ['LEGACY TRAIT SENTINEL']);
  const output = Dossier.render(normalized);
  assert(!output.includes('LEGACY TRAIT SENTINEL'));
  for (const relationship of relationships) assert.equal((output.match(new RegExp('>'+relationship.name+'<','g'))||[]).length, 1, 'Each connection should be listed once');
  const cardClasses = Array.from(output.matchAll(/<article\b(?=[^>]*\bid="[^"]+-connection-[^"]+")[^>]*\bclass="([^"]+)"/g), match=>match[1]);
  assert.equal(cardClasses.length, 4);
  assert.equal(new Set(cardClasses).size, 1, 'A featured connection uses the same card structure as every other connection');
});

test('The compact soundtrack preserves all ten players and navigable song destinations', () => {
  const output = Dossier.render(sam);
  const spotifyPlayers = Array.from(output.matchAll(/<iframe\b[^>]*\bsrc="(https:\/\/open\.spotify\.com\/embed\/track\/[^"?]+)[^"]*"/g), match=>match[1]);
  assert.equal(spotifyPlayers.length, 10);
  assert.deepEqual(spotifyPlayers.map(url=>url.split('/').pop()), sam.songs.map(item=>item.url.split('/').pop()));
  const ids = new Set(Array.from(output.matchAll(/\bid="([^"]+)"/g), match=>match[1]));
  const jumps = Array.from(output.matchAll(/\bhref="#([^"]+)"/g), match=>match[1]);
  assert(jumps.length >= 10, 'The soundtrack should provide usable navigation through its songs');
  assert(jumps.every(id=>ids.has(id)), 'Every internal navigation link must have a destination');
  const slides = Array.from(output.matchAll(/<article\b[^>]*class="bd3-song-slide"[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g), match=>({id:match[1],body:match[2]}));
  assert.equal(slides.length, 10);
  slides.forEach((slide,index)=>{
    assert(slide.body.includes('href="#'+slides[(index+1)%slides.length].id+'"'), 'Next should lead to the following song and wrap at the end');
    assert(slide.body.includes('href="#'+slides[(index+slides.length-1)%slides.length].id+'"'), 'Previous should lead to the previous song and wrap at the beginning');
  });
  assert(!/<script\b/.test(output));
});

test('Text is escaped, unsafe links cannot execute, and Spotify embeds require the real host', () => {
  const unsafe = '<script>alert("x")</script><img src=x onerror="alert(1)"> & "quotes"';
  assert(!Dossier.escapeHtml(unsafe).includes('<'));
  for (const url of ['javascript:alert(1)','data:text/html,<script>alert(1)</script>','vbscript:msgbox(1)','file:///C:/private.txt']) assert.equal(Dossier.safeUrl(url), '');
  const output = Dossier.render(character({name:unsafe, notes:unsafe, portrait:'javascript:alert(1)',
    relationships:[{id:'person',name:unsafe,url:'javascript:alert(1)'}],
    timeline:[{id:'story',title:unsafe,url:'javascript:alert(1)',summary:unsafe}],
    songs:[{title:unsafe,artist:unsafe,url:'https://open.spotify.com.evil.example/embed/track/5KyOUICJIvO0z71MBdPGiX'}]}));
  assertNoExecutableMarkup(output);
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
  assert(/class="bh-dossier-v3"/.test(output));
  assert(!/class="bh-dossier-v[12]"|\/dossier-v[12]\.css/.test(output));
  for (const entry of sam.timeline) assert(output.includes(entry.url.replaceAll('&','&amp;')));
  for (const fact of sam.facts) assert(output.includes(Dossier.escapeHtml(fact.value)));
  for (const song of sam.songs) assert(output.includes(Dossier.escapeHtml(song.title)));
  assert(!/\bundefined\b|\bNaN\b/.test(output));
  const generated = read('sam-forum.txt');
  assert(generated===output, 'The supplied forum file must match the current renderer and fresh stylesheet');
});

test('The portable editor bundles all scripts and contains parseable JavaScript', () => {
  const portable = read('atelier.html');
  assert(!/<script\b[^>]*\bsrc=/i.test(portable));
  assert(!/<link\b[^>]*href="(?:editor|dossier-v[123])\.css"/i.test(portable));
  const scripts = Array.from(portable.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi), match=>match[1]);
  assert(scripts.length >= 3);
  scripts.forEach((script,index) => new vm.Script(script, {filename:'atelier-script-'+index+'.js'}));
  const dataContext = {};
  vm.runInNewContext(read('seed-data.js'), dataContext);
  assert.equal(dataContext.DOSSIER_SEED.characters.length, 181);
  assert(dataContext.DOSSIER_NOTICES['baek-samuel'].length > 0);
});

console.log('\n'+tests.length+' checks passed. Browser layout, controls and live forum compatibility need separate verification.');
