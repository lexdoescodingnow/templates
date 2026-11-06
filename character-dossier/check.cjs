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
function decodeHtml(value) {
  const named = {amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
  return value.replace(/&(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (_, entity) => entity[0] === '#' ? String.fromCodePoint(entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2),16) : Number(entity.slice(1))) : named[entity.toLowerCase()]);
}
function mapDocument(document) {
  const scripts = Array.from(document.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi), match=>({attributes:match[1],source:match[2]}));
  assert.equal(scripts.length, 2);
  const external = scripts.filter(script=>/\bsrc="/.test(script.attributes));
  const inline = scripts.filter(script=>!/\bsrc="/.test(script.attributes));
  assert.equal(external.length, 1);
  assert.equal(inline.length, 1);
  assert.equal(external[0].attributes.match(/\bsrc="([^"]*)"/)[1], 'https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.js');
  assert(document.includes('href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.css"'));
  assert(!/\btype="module"/.test(inline[0].attributes));
  new vm.Script(inline[0].source, {filename:'isolated-map.js'});
  return {document,script:inline[0].source};
}
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
const stylesheet = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v5.css';
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
  assert.equal(sam.timeline.length, 6);
  assert.deepEqual(sam.timeline.map(item => item.url.match(/showtopic=(\d+)/)[1]), ['62747','64015','83999','98948','104200','112783']);
  assert.deepEqual(sam.timeline.slice(0,3).map(item => item.id), ['almond-croissant','treacle-tart','marshmallow-spread']);
  assert.deepEqual(sam.timeline.slice(0,3).map(item => item.title), ['Lindor Pistachio','Pringles Texas BBQ','Mochidoki Cake Batter']);
  assert.equal(sam.timeline[5].title, 'Cereal Bar');
  assert.deepEqual(sam.timeline[5].connectionIds, ['hoseong']);
  assert.deepEqual(Dossier.sortTimeline(sam.timeline).map(item => item.id), sam.timeline.map(item => item.id));
  assert.equal(sam.songs[0].url, 'https://open.spotify.com/track/5KyOUICJIvO0z71MBdPGiX');
  assert.equal(sam.songs[9].url, 'https://open.spotify.com/track/4UJwJG0Byki4e9MNTxo8aF');
  assert.deepEqual(sam.songs.map(item=>item.url.split('/').pop()), ['5KyOUICJIvO0z71MBdPGiX','0SIEcuChTr2DIhuPgklpeP','3AOf6YEpxQ894FmrwI9k96','2EFxmF45ZsAvSQBGyMYGTB','2tYiQoXXbAEdwBTG0qanqi','2nNBdv2vcJZuWOZ06nNF62','0M1NR0EXFkMoy8nt4JNXKH','40UVUuyy5RfpO0awclCttA','4tLAqSfrGmx5L0akJWNdK5','4UJwJG0Byki4e9MNTxo8aF']);
  assert(sam.timeline.every(item => !item.date && !item.postedDate));
  assert(library.characters.every(item => item.relationships.every(connection => !connection.pinned)));
  assert.deepEqual(sam.relationships.map(item => item.flavour), ['','cereal','','']);
  assert.deepEqual(sam.relationships.map(item => item.brand), ['Lindor','','Mochidoki','Pringles']);
  const connections = Dossier.render(sam);
  for (const label of ['Lindor','Mochidoki','Pringles','Cereal']) assert(connections.includes(label));
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

test('Display capitalisation preserves raw data, acronyms, music styling, prose and URLs', () => {
  const raw = character({name:'baek samuel',nickname:'sam',gender:'cisgender male',occupation:'idol / leader of CRAZHES',location:'los angeles, ca',
    facts:[{label:'mbti',value:'ISTP'},{label:'languages',value:'english, korean'},{label:'face claim',value:'kang yuchan'},{label:'Reference',value:'https://Example.com/MixedCase?value=aB'}],
    currentChapter:'a quiet morning with CRAZHES.',notes:'she said “leave this as written”.',
    relationships:[{id:'person',name:'hwak hoseong',flavour:'cereal',summary:'keep this little paragraph as written.'}],
    timeline:[{id:'story',title:'cereal milk',participants:'sam & hoseong',summary:'one small memory.',url:'https://example.com/KeepCase?a=bC'}],
    songs:[{title:'Last Flower',artist:'The KingDom',url:'https://open.spotify.com/track/0M1NR0EXFkMoy8nt4JNXKH'},{title:'BOUNCY (K-HOT CHILLI PEPPERS)',artist:'ATEEZ'},{title:"Golden - Glowin' Version",artist:'HUNTR/X, KPop Demon Hunters Cast'}]});
  const before = JSON.stringify(raw);
  const normalized = Dossier.normalizeCharacter(raw);
  const output = Dossier.render(raw);
  assert.equal(JSON.stringify(raw), before, 'Rendering must not rewrite the editable data');
  assert.equal(normalized.nickname, 'sam');
  assert.equal(normalized.occupation, raw.occupation);
  assert.equal(normalized.facts[1].value, 'english, korean');
  for (const text of ['<h1>Sam</h1>','Baek Samuel','Cisgender Male','Idol / Leader of CRAZHES','Los Angeles, CA','English, Korean','Kang Yuchan','Hwak Hoseong','Cereal Milk','Sam &amp; Hoseong','ISTP']) assert(output.includes(text), 'Expected displayed text: '+text);
  for (const text of [raw.currentChapter,raw.notes,raw.relationships[0].summary,raw.timeline[0].summary,...raw.songs.flatMap(song=>[song.title,song.artist])]) assert(output.includes(Dossier.escapeHtml(text)));
  assert(output.includes('https://example.com/KeepCase?a=bC'));
  assert(output.includes('https://Example.com/MixedCase?value=aB'));
  const samOutput = Dossier.render(sam);
  assert(samOutput.includes('<dt>MBTI</dt>') && samOutput.includes('CRAZHES') && samOutput.includes('The KingDom'));
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

test('Photo palettes follow visible image colours while manual choices and cache details survive editing', () => {
  const Palette = require('./palette.js');
  const green = Array.from({length:20}, ()=>[40,130,55,255]).flat();
  const blue = Array.from({length:20}, ()=>[35,65,170,255]).flat();
  const rgb = hex=>hex.slice(1).match(/../g).map(value=>parseInt(value,16));
  const [gr,gg,gb] = rgb(Palette.fromPixels(green));
  const [br,bg,bb] = rgb(Palette.fromPixels(blue));
  assert(gg>gr && gg>gb && bb>br && bb>bg, 'Distinct photo colours should produce corresponding accent families');
  assert.equal(Palette.fromPixels([...green,255,0,255,0]), Palette.fromPixels(green), 'Transparent pixels must not influence a photo palette');
  assert.throws(()=>Palette.fromPixels([255,0,255,0]));
  assert.throws(()=>Palette.fromPixels([1,2,3]));
  const record = Dossier.normalizeCharacter(character({themeMode:'manual',accent:'#345678',paletteSource:'https://example.com/photo.png',paletteCrop:'25% 70%'}));
  assert.deepEqual(Dossier.normalizeCharacter(JSON.parse(JSON.stringify(record))),record);
  assert.equal(record.themeMode, 'manual');
  assert.equal(record.accent, '#345678');
  assert.equal(record.paletteCrop, '25% 70%');
  assert(Dossier.render(record).includes('data-theme-mode="manual"'));
  assert.equal(Dossier.normalizeCharacter(character()).themeMode, 'auto');
  for (const url of ['http://example.com/photo.png','https://localhost/photo.png','https://192.168.1.1/photo.png','https://example.com/photo.png?token=secret','https://example.com/photo.png?signature=secret','https://user:password@example.com/photo.png']) assert.equal(Palette.proxyUrl(url), '');
  assert(Palette.proxyUrl('https://c.l3n.co/i/n8qt60.png').startsWith('https://images.weserv.nl/?url='));
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
    relationships:[{id:'connection-one',name:'Seo Hyemi',kind:'Friend',flavour:'Original Flavour',brand:'Brand “雨” & Co.',summary:'she said “hello”'}],
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
  assert.equal(roundtrip.relationships[0].flavour, raw.relationships[0].flavour);
  assert.equal(roundtrip.relationships[0].brand, raw.relationships[0].brand);
  assert.equal(roundtrip.timeline[0].date, '2026-10-13');
  assert.equal(roundtrip.timeline[0].postedDate, '2026-11-06');
  assert.deepEqual(roundtrip.timeline[0].connectionIds, ['connection-one']);
});

test('City maps export safe location data and isolate their interactive document at runtime', () => {
  const Runtime = require('./runtime.js');
  assert.equal(sam.mapLocation, 'San Bernardino, CA');
  assert.equal(Number(sam.mapLatitude), 34.1211115);
  assert.equal(Number(sam.mapLongitude), -117.301767);
  assert.equal(sam.mapZoom, 11);
  const mapHtml = Dossier.render(character({mapLocation:sam.mapLocation,mapLatitude:sam.mapLatitude,mapLongitude:sam.mapLongitude,mapZoom:sam.mapZoom}));
  const mapElement = mapHtml.match(/<div\b[^>]*\bclass="bd3-map"[^>]*>/);
  assert(mapElement, 'A complete map should export a location container');
  assert(!/\bsrcdoc=|<iframe\b|<script\b/.test(mapHtml));
  const attributes = Object.fromEntries(Array.from(mapElement[0].matchAll(/\bdata-([a-z]+)="([^"]*)"/g), match=>[match[1],decodeHtml(match[2])]));
  assert.deepEqual(attributes, {lat:String(Number(sam.mapLatitude)),lon:String(Number(sam.mapLongitude)),zoom:'11',label:sam.mapLocation});
  const location = Runtime.normalizeLocation(attributes);
  assert.deepEqual(location, {lat:34.1211115,lon:-117.301767,zoom:11});
  assert.deepEqual(Runtime.normalizeLocation({lat:0,lon:0}), {lat:0,lon:0,zoom:11});
  for (const invalid of [{lat:'',lon:0},{lat:34,lon:''},{lat:86,lon:0},{lat:0,lon:181},{lat:'34;alert(1)',lon:0},{lat:0,lon:0,zoom:19},{lat:0,lon:0,zoom:3.5}]) {
    assert.equal(Runtime.normalizeLocation(invalid), null);
    assert.throws(()=>Runtime.buildMapDocument(invalid, '#5b8612'));
  }
  const map = mapDocument(Runtime.buildMapDocument(location, sam.accent));
  const mapStatus = {hidden:false,textContent:'Loading Map…'};
  const handlers = {};
  const childMessages = [], childListeners = {};
  const parentWindow = {postMessage:message=>childMessages.push(message)};
  let mapOptions, markerPosition;
  function MapStub(options) { mapOptions = options; this.addControl = function() {}; this.on = function(name,handler) { handlers[name] = handler; }; }
  function MarkerStub() { this.remove = function() {}; this.setLngLat = function(position) { markerPosition = position; return this; }; this.addTo = function() { return this; }; }
  const context = vm.createContext({parent:parentWindow,document:{getElementById:id=>id==='status'?mapStatus:null},window:{status:'Browser status',addEventListener:(name,handler)=>{childListeners[name]=handler;},maplibregl:{Map:MapStub,Marker:MarkerStub,NavigationControl:function(){}}}});
  new vm.Script(map.script).runInContext(context,{timeout:1000});
  assert.equal(mapOptions.style, 'https://tiles.openfreemap.org/styles/positron');
  assert.equal(mapOptions.center.lng, Number(sam.mapLongitude));
  assert.equal(mapOptions.center.lat, Number(sam.mapLatitude));
  assert.equal(mapOptions.zoom, sam.mapZoom);
  assert.equal(markerPosition.lng, mapOptions.center.lng);
  assert.equal(markerPosition.lat, mapOptions.center.lat);
  assert.equal(typeof handlers.load, 'function');
  handlers.load();
  assert.equal(mapStatus.hidden, true, 'The real loading element should be hidden when map data loads');
  assert.equal(childMessages[0].state, 'ready');
  assert.equal(context.window.status, 'Browser status');
  assert.equal(context.mapStatus, undefined, 'Map state belongs in a local scope');
  assert(mapHtml.includes('https://www.openstreetmap.org/copyright'));
  assert(mapHtml.includes('https://www.openmaptiles.org/'));
  assert(mapHtml.includes('https://www.openstreetmap.org/?mlat='+sam.mapLatitude+'&amp;mlon='+sam.mapLongitude));
  const migration = JSON.parse(read('migration-sources.json'));
  for (const item of library.characters.filter(item=>item.id!==sam.id && item.mapLatitude && item.mapLongitude)) {
    assert(migration.characters.find(row=>row.id===item.id).sources.some(source=>source.kind==='map'), 'Imported map pins need a verified place source: '+item.id);
  }
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
  assert(html.toLowerCase().includes(Dossier.escapeHtml(unsafe).toLowerCase()));
  assert(!/\bsrcdoc=|<iframe\b|<script\b/.test(html));
  const isolated = mapDocument(Runtime.buildMapDocument({...location,label:unsafe}, 'red;alert(1)'));
  assert(!isolated.document.includes('alert(1)') && !isolated.script.includes('onerror'));
  assert.equal(isolated.script.match(/<script/gi), null);
  const status = {hidden:false,textContent:''}, frames = [], listeners = {};
  const mapAttributes = {'data-lat':'34','data-lon':'-117','data-zoom':'11','data-label':unsafe};
  const element = {getAttribute:name=>mapAttributes[name],setAttribute:(name,value)=>{mapAttributes[name]=value;},querySelector:()=>status,appendChild:frame=>{frames.push(frame);frame.parentNode=element;}};
  const articleAttributes = {'data-theme-mode':'manual'};
  const article = {style:{getPropertyValue:name=>name==='--bd1-accent'?'#345678':'50% 35%'},getAttribute:name=>articleAttributes[name],setAttribute:(name,value)=>{articleAttributes[name]=value;},querySelector:()=>null,querySelectorAll:selector=>selector.startsWith('.bd3-map')?[element]:[]};
  const document = {documentElement:{contains:()=>true},querySelectorAll:()=>[article],addEventListener:()=>{},createElement:tag=>{
    assert.equal(tag,'iframe');
    return {attributes:{},setAttribute(name,value){this.attributes[name]=value;},contentWindow:{postMessage:()=>{}}};
  }};
  const runtimeContext = vm.createContext({document,module:{exports:{}},addEventListener:(name,handler)=>{listeners[name]=handler;},setTimeout:()=>1,clearTimeout:()=>{}});
  new vm.Script(read('runtime.js'),{filename:'runtime.js'}).runInContext(runtimeContext,{timeout:1000});
  runtimeContext.module.exports.start();
  runtimeContext.module.exports.start();
  assert.equal(frames.length,1,'Repeated runtime initialization must not duplicate the map');
  assert.equal(frames[0].attributes.sandbox,'allow-scripts');
  assert.equal(frames[0].attributes.title,'Map of '+unsafe,'Map names are assigned as DOM text');
  assert(!frames[0].srcdoc.includes(unsafe));
  listeners.message({source:{},data:{channel:'blue-hour-dossier-map-v5',state:'ready'}});
  assert.equal(status.hidden,false,'Messages from another frame must not signal successful map loading');
  listeners.message({source:frames[0].contentWindow,data:{channel:'blue-hour-dossier-map-v5',state:'ready'}});
  assert.equal(status.hidden,true);
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
    relationships:[{id:'person',name:unsafe,flavour:unsafe,brand:unsafe,url:'javascript:alert(1)'}],
    timeline:[{id:'story',title:unsafe,url:'javascript:alert(1)',summary:unsafe}],
    songs:[{title:unsafe,artist:unsafe,url:'https://open.spotify.com.evil.example/embed/track/5KyOUICJIvO0z71MBdPGiX'}]}));
  assertNoExecutableMarkup(output);
  assert(!/<iframe\b/i.test(output), 'A lookalike Spotify host must not produce an embed');
  const embed = Dossier.render(character({songs:[{title:'Track',url:'https://open.spotify.com/track/5KyOUICJIvO0z71MBdPGiX'}]}));
  assert(/<iframe\b/.test(embed));
  assert(embed.includes('https://open.spotify.com/embed/track/5KyOUICJIvO0z71MBdPGiX'));
});

test('Forum output preserves static content with one shared stylesheet and one fixed runtime', () => {
  const output = Dossier.forum(sam, stylesheet);
  assert(output.startsWith('[dohtml]') && output.trimEnd().endsWith('[/dohtml]'));
  assert.equal((output.match(/\[dohtml\]/g)||[]).length, 1);
  assert.equal((output.match(/\[\/dohtml\]/g)||[]).length, 1);
  assert.equal((output.match(/<link\b[^>]*rel="stylesheet"/g)||[]).length, 1);
  const scripts = Array.from(output.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi));
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0][1].match(/\bsrc="([^"]*)"/)[1], 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-runtime-v5.js');
  assert.equal(scripts[0][2], '');
  assert(!/\bsrcdoc=|pgy-pikeplace|dropboxusercontent|unpkg\.com|bluehour-cosmicmeet/i.test(output));
  assert(output.includes(stylesheet));
  assert(/class="bh-dossier-v5"/.test(output));
  assert(!/class="bh-dossier-v[1234]"|\/dossier-v[1234]\.css/.test(output));
  for (const entry of sam.timeline) assert(output.includes(entry.url.replaceAll('&','&amp;')));
  const displayedFacts = Array.from(output.matchAll(/<dd>([\s\S]*?)<\/dd>/g), match=>decodeHtml(match[1]).toLocaleLowerCase('en'));
  for (const fact of sam.facts) assert(displayedFacts.includes(fact.value.toLocaleLowerCase('en')), 'Every fact must survive display capitalisation: '+fact.label);
  for (const song of sam.songs) assert(output.includes(Dossier.escapeHtml(song.title)));
  assert(!/\bundefined\b|\bNaN\b/.test(output));
  const generated = read('sam-forum.txt');
  assert(generated===output, 'The supplied forum file must match the current renderer and fresh stylesheet');
});

test('The portable editor bundles all scripts and contains parseable JavaScript', () => {
  const portable = read('atelier.html');
  const scripts = Array.from(portable.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi), match=>({attributes:match[1],source:match[2]}));
  assert(scripts.length >= 3);
  assert(scripts.every(script=>!/\bsrc=/i.test(script.attributes)));
  scripts.forEach((script,index) => new vm.Script(script.source, {filename:'atelier-script-'+index+'.js'}));
  const documentMarkup = portable.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert(!/<link\b[^>]*href="(?:editor|dossier-v[12345])\.css"/i.test(documentMarkup));
  const dataContext = {};
  vm.runInNewContext(read('seed-data.js'), dataContext);
  assert.equal(dataContext.DOSSIER_SEED.characters.length, 181);
  assert(dataContext.DOSSIER_NOTICES['baek-samuel'].length > 0);
});

console.log('\n'+tests.length+' checks passed. Browser layout, controls and live forum compatibility need separate verification.');
