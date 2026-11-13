'use strict';
const fs = require('node:fs');
const path = require('node:path');

function topicId(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.hostname !== 'bluehour.jcink.net' || url.port || url.username || url.password || url.pathname !== '/index.php') return '';
    const ids = url.searchParams.getAll('showtopic');
    return ids.length === 1 && /^[1-9]\d*$/.test(ids[0]) ? ids[0] : '';
  } catch (_) { return ''; }
}
function canonicalUrl(id) { return 'https://bluehour.jcink.net/index.php?showtopic=' + id; }
function validDate(value) {
  if (typeof value !== 'string' || !/^[1-9]\d{3}(?:-\d{2}(?:-\d{2})?)?$/.test(value)) return false;
  const [year,month,day] = value.split('-').map(Number);
  if (month !== undefined && (month < 1 || month > 12)) return false;
  return day === undefined || (day >= 1 && day <= new Date(Date.UTC(year, month, 0)).getUTCDate());
}
function readDates(source) {
  source ||= JSON.parse(fs.readFileSync(path.join(__dirname,'sources/topic-start-dates.json'),'utf8'));
  if (source.version !== 1 || !Array.isArray(source.records)) throw new Error('Invalid topic-start source');
  const dates = {};
  for (const record of source.records) {
    const id = String(record.topicId);
    if (!/^[1-9]\d*$/.test(id) || topicId(record.url) !== id || Object.hasOwn(dates,id)) throw new Error('Invalid or duplicate topic identity: '+id);
    if (!validDate(record.postedDate)) throw new Error('Invalid topic-start date: '+id);
    const provenance = record.evidence?.some(e => e.date === record.postedDate && ['topic-start-listing','first-post'].includes(e.kind) && e.literal && (e.sourceUrl || e.sourceFile));
    if (!provenance) throw new Error('Topic start lacks first-post provenance: '+id);
    dates[id] = record.postedDate;
  }
  return dates;
}
function apply(input, source) {
  const dates = readDates(source);
  const characters = JSON.parse(JSON.stringify(input));
  const counts = {topics:Object.keys(dates).length,entries:0,characters:0,manualDatesPreserved:0};
  for (const character of characters) {
    let dated = false;
    for (const entry of character.timeline || []) {
      const id = topicId(entry.url);
      if (!id || !dates[id]) continue;
      if (entry.postedDate && !topicId(entry.postedDateSource)) { counts.manualDatesPreserved++; continue; }
      entry.postedDate = dates[id];
      entry.postedDateSource = canonicalUrl(id);
      counts.entries++;
      dated = true;
    }
    if (dated) counts.characters++;
  }
  return {characters,dates,counts};
}
module.exports = {apply,readDates,topicId,canonicalUrl,validDate};
