'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const Import = require('./topic-dates-enrich.cjs');
const read = file => JSON.parse(fs.readFileSync(path.join(__dirname,file),'utf8'));
const source = read('sources/topic-start-dates.json');
const library = read('seed-library.json');
const dates = Import.readDates(source);
assert.equal(source.records.length,305);
assert.equal(Object.keys(dates).length,305);
assert.equal(new Set(source.records.map(record=>record.topicId)).size,305);
const monthNames=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
for(const record of source.records) {
  const live = record.evidence.filter(e=>e.observedAt==='2026-11-06' && e.sourceUrl);
  assert(live.length,'Missing fresh verification: '+record.topicId);
  for(const evidence of live) {
    assert.equal(evidence.kind,'topic-start-listing');
    assert.equal(new URL(evidence.sourceUrl).hostname,'bluehour.jcink.net');
    const match=evidence.literal.replace(/^This topic was started:\s*/,'').match(/^([A-Za-z]{3}) (\d{1,2}) (\d{4}),/);
    assert(match,'Missing literal topic-start timestamp: '+record.topicId);
    const parsed=match[3]+'-'+String(monthNames.indexOf(match[1])+1).padStart(2,'0')+'-'+match[2].padStart(2,'0');
    assert.equal(parsed,record.postedDate,'Date must come from start literal, never the listing read date or last reply');
  }
}
const entries=library.characters.flatMap(c=>c.timeline);
assert.equal(entries.length,635);
assert.equal(new Set(entries.map(t=>Import.topicId(t.url))).size,305);
for(const entry of entries) {
  const id=Import.topicId(entry.url);
  assert.equal(entry.postedDate,dates[id]);
  assert.equal(entry.postedDateSource,Import.canonicalUrl(id));
  assert.equal(entry.date,'','Topic-start metadata must not invent an in-world date');
}
const sam=library.characters.find(c=>c.id==='baek-samuel');
assert.deepEqual(sam.timeline.map(t=>t.postedDate),['2024-07-16','2024-07-30','2025-04-05','2025-10-24','2026-01-03','2026-06-25']);
const original=JSON.stringify(library.characters);
assert.deepEqual(Import.apply(library.characters).characters,library.characters,'Enrichment must be idempotent');
assert.equal(JSON.stringify(library.characters),original,'Enrichment must not mutate its input');

const url=Import.canonicalUrl('62747');
const custom=[{id:'custom',timeline:[
  {id:'in-world',url,date:'2020-04',dateLabel:'Before the debut',postedDate:''},
  {id:'manual',url,date:'',postedDate:'2023-05'},
  {id:'invalid-provenance',url,postedDate:'2023',postedDateSource:'https://example.com/keep-this'},
  {id:'old-auto',url,postedDate:'2022',postedDateSource:Import.canonicalUrl('64015')},
  {id:'foreign',url:'https://example.com/index.php?showtopic=62747',postedDate:''},
  {id:'unknown',url:Import.canonicalUrl('999999999'),postedDate:''}
]}];
const copy=Import.apply(custom).characters[0].timeline;
assert.equal(copy[0].date,'2020-04');assert.equal(copy[0].dateLabel,'Before the debut');assert.equal(copy[0].postedDate,'2024-07-16');
assert.equal(copy[1].postedDate,'2023-05');assert.equal(copy[1].postedDateSource,undefined);
assert.equal(copy[2].postedDate,'2023');
assert.equal(copy[3].postedDate,'2024-07-16');assert.equal(copy[3].postedDateSource,url);
assert.equal(copy[4].postedDate,'');assert.equal(copy[5].postedDate,'');
assert.equal(custom[0].timeline[0].postedDate,'');
for(const unsafe of ['https://bluehour.jcink.net.evil.test/index.php?showtopic=62747','https://u:p@bluehour.jcink.net/index.php?showtopic=62747','https://bluehour.jcink.net:444/index.php?showtopic=62747','https://bluehour.jcink.net/index.php?showtopic=62747&showtopic=64015','javascript:alert(1)'])assert.equal(Import.topicId(unsafe),'');
assert.equal(Import.topicId(url+'&st=20#entry123'),'62747');
for(const good of ['2024','2024-02','2024-02-29'])assert(Import.validDate(good));
for(const bad of ['2025-02-29','2026-13','2026-04-31','2026-00','2026-11-00','yesterday'])assert(!Import.validDate(bad));
const record=source.records[0];
assert.throws(()=>Import.readDates({version:1,records:[record,record]}),/duplicate/);
assert.throws(()=>Import.readDates({version:1,records:[{...record,postedDate:'2026-02-30'}]}),/Invalid topic-start date/);
assert.throws(()=>Import.readDates({version:1,records:[{...record,evidence:[{date:record.postedDate,kind:'last-reply',literal:record.postedDate,sourceUrl:url}]}]}),/provenance/);
const globals={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'seed-data.js'),'utf8'),globals);
assert.deepEqual(JSON.parse(JSON.stringify(globals.DOSSIER_TOPIC_DATES)),dates);
for(const c of library.characters.filter(c=>c.timeline.length)) {
  assert(globals.DOSSIER_SOURCE_METADATA[c.id].knownFields.includes('timeline'));
  assert(!globals.DOSSIER_NOTICES[c.id].some(n=>/under Undated|need an in-world date to join/.test(n)));
}
console.log('PASS: 305 freshly verified topic starts cover all 635 entries; provenance, safe lookup, precision, manual dates and in-world chronology are preserved.');
