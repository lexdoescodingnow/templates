'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const Dossier = require('./dossier-model.js');
const source = fs.readFileSync(path.join(__dirname, 'editor.js'), 'utf8');
const declarationsStart = source.indexOf('  const SOURCE_FIELDS =');
const declarationsEnd = source.indexOf('  const COLOUR_PALETTE =');
const helpersStart = source.indexOf('  function sourceMetadata(id)');
const helpersEnd = source.indexOf('  function initData()');
assert.ok(declarationsStart >= 0 && declarationsEnd > declarationsStart && helpersStart >= 0 && helpersEnd > helpersStart, 'Editor source/date helpers must be available to the regression check');
const clone = value => JSON.parse(JSON.stringify(value));
const url = id => 'https://bluehour.jcink.net/index.php?showtopic=' + id;
const verifiedDates = { '123': '2026-11-06', '456': '2025-09-14', '789': '2026-02-30' };
const character = timeline => Dossier.normalizeCharacter({ id: 'test', name: 'Test Character', timeline });
const entry = fields => ({ id: 'story', title: 'Story', type: 'Thread', url: url(123), date: '', postedDate: '', postedDateSource: '', ...fields });
function context(previous, latest, saved) {
  const state = {
    Dossier, URL, URLSearchParams, Date, clone,
    DOSSIER_TOPIC_DATES: { ...verifiedDates },
    DOSSIER_SEED: { version: 1, characters: [latest] },
    DOSSIER_PREVIOUS_SEED: { version: 1, characters: [previous] },
    DOSSIER_SOURCE_METADATA: { test: { coverage: 'development', revision: 'topic-dates-2', knownFields: ['timeline'] } },
    sourceUpdates: new Map(), dirty: false,
    settings: { selectedId: 'test' }, location: { href: 'https://example.org/atelier.html' }
  };
  state.seedLibrary = () => Dossier.normalizeDataset(clone(state.DOSSIER_SEED));
  vm.createContext(state);
  vm.runInContext(source.slice(declarationsStart, declarationsEnd) + source.slice(helpersStart, helpersEnd), state);
  state.library = state.normalizeDraftDataset(clone({ version: 1, characters: [saved], sourceTracking: { test: { revision: 'topic-dates-1', baseline: previous } } }));
  return state;
}

const baseline = character([entry({})]);
const incoming = character([entry({ postedDate: verifiedDates['123'], postedDateSource: url(123) })]);
const manual = context(baseline, incoming, character([entry({ date: '2021-07', postedDate: '2024-06', postedDateSource: '' })]));
manual.applySourceUpdates();
let story = manual.library.characters[0].timeline[0];
assert.equal(story.postedDate, '2024-06', 'Source refresh must not overwrite an existing manual date');
assert.equal(story.postedDateSource, '', 'Source refresh must not turn a manual date into an automatic date');
assert.equal(story.date, '2021-07', 'An in-world date must remain independent of topic-date filling');
assert.equal(manual.sourceUpdates.size, 0);
manual.library = manual.normalizeDraftDataset(clone(manual.library));
manual.applySourceUpdates();
story = manual.library.characters[0].timeline[0];
assert.equal(story.postedDate, '2024-06', 'Manual provenance must survive saving and reopening');
assert.equal(story.postedDateSource, '');
assert.equal(story.date, '2021-07');

const automaticBaseline = character([entry({ date: '2022', postedDate: verifiedDates['123'], postedDateSource: url(123) })]);
const changedLink = character([entry({ date: '2022', url: url(456), postedDate: verifiedDates['456'], postedDateSource: url(456) })]);
const refreshed = context(automaticBaseline, changedLink, automaticBaseline);
refreshed.applySourceUpdates();
story = refreshed.library.characters[0].timeline[0];
assert.equal(story.url, url(456));
assert.equal(story.postedDate, '2025-09-14', 'A changed source link must replace its old automatic topic date');
assert.equal(story.postedDateSource, url(456));
assert.equal(story.date, '2022');
assert.equal(refreshed.sourceUpdates.size, 0);

story.url = url(999);
assert.equal(refreshed.fillTopicDate(story), true);
assert.equal(story.postedDate, '', 'An unknown replacement link must not retain the old topic date');
assert.equal(story.postedDateSource, '');
assert.equal(story.date, '2022');
story.url = url(123);
refreshed.fillTopicDate(story);
assert.equal(story.postedDate, '2026-11-06');
assert.equal(story.postedDateSource, url(123));
story.url = 'http://bluehour.jcink.net/index.php?st=30&showtopic=00123#entry987';
assert.equal(refreshed.fillTopicDate(story), false, 'Alternative links to the same topic must preserve canonical provenance');
assert.equal(story.postedDate, '2026-11-06');
assert.equal(story.postedDateSource, url(123));

const manuallyChangedLink = entry({ url: url(456), postedDate: '2023', postedDateSource: '', date: '2020-02-29' });
assert.equal(refreshed.fillTopicDate(manuallyChangedLink), false);
assert.equal(manuallyChangedLink.postedDate, '2023');
assert.equal(manuallyChangedLink.date, '2020-02-29');
const impossible = entry({ url: url(789) });
assert.equal(refreshed.fillTopicDate(impossible), false, 'Impossible known-map dates must be rejected');
assert.equal(impossible.postedDate, '');
for (const unsafeUrl of [
  'https://bluehour.jcink.net.evil.example/index.php?showtopic=123',
  'https://user:pass@bluehour.jcink.net/index.php?showtopic=123',
  'https://bluehour.jcink.net/index.php?showtopic=123&showtopic=456',
  'https://bluehour.jcink.net/other.php?showtopic=123'
]) {
  const unsafe = entry({ url: unsafeUrl });
  assert.equal(refreshed.fillTopicDate(unsafe), false);
  assert.equal(unsafe.postedDate, '');
}
console.log('PASS: saved-library topic dates preserve manual and in-world dates, automatic dates follow changed links, equivalent URLs keep provenance, and invalid dates/URLs are rejected.');
