'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const Dossier = require('./dossier-model.js');
const source = fs.readFileSync(path.join(__dirname, 'editor.js'), 'utf8');
const declarations = source.slice(source.indexOf('  const SOURCE_FIELDS ='), source.indexOf('  const COLOUR_PALETTE ='));
const helperStart = source.indexOf('  function sourceMetadata(id)');
const helperEnd = source.indexOf('  function initData()', helperStart);
const applyStart = source.indexOf('  function applySourceConflict(character, conflict)');
const applyEnd = source.indexOf('  function finishSourceReview(', applyStart);
const clone = value => JSON.parse(JSON.stringify(value));
const plain = value => JSON.parse(JSON.stringify(value));
const character = values => Dossier.normalizeCharacter({ id: 'test', name: 'Test Character', ...values });
function context(previous, latest, current, knownFields, revision = 'source-2', tracking) {
  const state = {
    Dossier, URL, URLSearchParams, clone,
    DOSSIER_SEED: { version: 1, characters: latest },
    DOSSIER_PREVIOUS_SEED: previous ? { version: 1, characters: previous } : undefined,
    DOSSIER_SOURCE_METADATA: Object.fromEntries(latest.map(item => [item.id, { coverage: 'development', revision, knownFields }])),
    library: { version: 1, characters: clone(current), sourceTracking: tracking || Object.create(null) },
    sourceUpdates: new Map(), dirty: false,
    settings: { selectedId: current[0].id }, location: { href: 'https://example.org/atelier.html' }
  };
  state.seedLibrary = () => Dossier.normalizeDataset(clone(state.DOSSIER_SEED));
  vm.createContext(state);
  vm.runInContext(declarations + source.slice(helperStart, helperEnd) + source.slice(applyStart, applyEnd), state);
  return state;
}
function story(id, title, extra = {}) { return { id, title, type: 'Thread', date: '', connectionIds: [], ...extra }; }
const baseline = character({ age: '25', nickname: 'Sam', gender: 'Male', portrait: 'https://images.test-host.org/old.jpg', accent: '#123456', themeMode: 'manual', notes: 'Old note', facts: [{ label: 'Birthday', value: '13 October' }, { label: 'Languages', value: 'English' }], timeline: [story('one', 'Old Title')] });
const incoming = character({ ...baseline, age: '26', gender: '', portrait: 'https://images.test-host.org/new.jpg', accent: '#abcdef', themeMode: 'auto', notes: 'New note', facts: [{ label: 'Birthday', value: '14 October' }, { label: 'Languages', value: 'English, Korean' }, { label: 'Favourite food', value: 'Pizza' }], timeline: [story('one', 'Corrected Title', { date: '2026-11' }), story('two', 'New Story')] });
const custom = character({ ...baseline, nickname: 'My nickname', notes: '', facts: [{ label: 'Birthday', value: 'My birthday note' }, { label: 'Languages', value: 'English' }, { label: 'Private detail', value: 'Keep this' }], timeline: [story('one', 'My Title')] });
const fields = ['age', 'nickname', 'portrait', 'facts', 'timeline', 'notes'];
const merged = context([baseline], [incoming], [custom], fields);
const report = merged.applySourceUpdates();
const result = merged.library.characters[0];
assert.equal(result.age, '26');
assert.equal(result.nickname, 'My nickname');
assert.equal(result.gender, 'Male');
assert.equal(result.accent, '#123456');
assert.equal(result.themeMode, 'manual');
assert.equal(result.notes, '');
assert.equal(result.facts.find(f => f.label === 'Birthday').value, 'My birthday note');
assert.equal(result.facts.find(f => f.label === 'Languages').value, 'English, Korean');
assert.equal(result.facts.find(f => f.label === 'Favourite food').value, 'Pizza');
assert.equal(result.facts.find(f => f.label === 'Private detail').value, 'Keep this');
assert.equal(result.timeline[0].title, 'My Title');
assert.equal(result.timeline[0].date, '2026-11');
assert.equal(result.timeline[1].title, 'New Story');
assert.equal(report.reviews, 1);
assert.equal(merged.sourceUpdates.get('test').conflicts.length, 3);
assert.equal(merged.library.sourceTracking.test.baseline.age, '25');
const titleConflict = merged.sourceUpdates.get('test').conflicts.find(item => item.path.at(-1) === 'title');
merged.applySourceConflict(result, titleConflict);
assert.equal(result.timeline[0].title, 'Corrected Title');
assert.equal(result.notes, '');

const deletion = context([baseline], [incoming], [character({ ...baseline, timeline: [] })], ['timeline']);
deletion.applySourceUpdates();
assert.deepEqual(plain(deletion.library.characters[0].timeline.map(item => item.id)), ['two']);
const removedFromSource = context([baseline], [character({ ...baseline, timeline: [] })], [baseline], ['timeline']);
removedFromSource.applySourceUpdates();
assert.equal(removedFromSource.library.characters[0].timeline.length, 1);
assert.equal(removedFromSource.sourceUpdates.get('test').conflicts[0].remove, true);

const unknown = context(null, [incoming], [character({ age: '99', notes: '' })], ['age', 'notes']);
unknown.applySourceUpdates();
assert.equal(unknown.library.characters[0].age, '99');
assert.equal(unknown.library.characters[0].notes, 'New note');
assert.equal(unknown.sourceUpdates.get('test').conflicts.length, 1);

const coordinateSeed = { ...incoming, mapLocation: 'City', mapLatitude: '34.019490', mapLongitude: '-118.491380' };
const coordinateDraft = clone(baseline);
delete coordinateDraft.mapLocation; delete coordinateDraft.mapLatitude; delete coordinateDraft.mapLongitude;
const coordinateMigration = context([baseline], [coordinateSeed], [coordinateDraft], ['mapLocation', 'mapLatitude', 'mapLongitude']);
coordinateMigration.library = coordinateMigration.normalizeDraftDataset(coordinateMigration.library);
coordinateMigration.applySourceUpdates();
assert.equal(coordinateMigration.library.characters[0].mapLatitude, '34.01949');
assert.equal(coordinateMigration.library.characters[0].mapLongitude, '-118.49138');
assert.equal(coordinateMigration.sourceUpdates.size, 0);

const portable = merged.normalizeSourceTracking(plain(merged.library.sourceTracking), ['test']);
const restored = context(null, [incoming], [result], fields, 'source-2', portable);
restored.applySourceUpdates();
assert.equal(restored.library.characters[0].notes, '');
assert.equal(restored.library.characters[0].facts.find(f => f.label === 'Birthday').value, 'My birthday note');
assert.equal(restored.sourceUpdates.get('test').conflicts.length, 2);

const fresh = context([baseline], [incoming], [baseline], fields);
fresh.applySourceUpdates();
assert.equal(fresh.sourceUpdates.size, 0);
assert.equal(fresh.library.sourceTracking.test.revision, 'source-2');
fresh.library.characters[0].age = 'My age';
const next = character({ ...incoming, age: '27' });
fresh.DOSSIER_SEED.characters = [next];
fresh.DOSSIER_SOURCE_METADATA.test.revision = 'source-3';
fresh.applySourceUpdates();
assert.equal(fresh.library.characters[0].age, 'My age');
assert.equal(fresh.sourceUpdates.get('test').conflicts[0].path[0], 'age');

fresh.location.href = 'https://example.org/atelier.html?character=test';
fresh.settings.selectedId = 'other'; fresh.selectFromAddress(); assert.equal(fresh.settings.selectedId, 'test');
fresh.location.href = 'https://example.org/atelier.html?character=unknown'; fresh.selectFromAddress(); assert.equal(fresh.settings.selectedId, 'test');
fresh.location.href = 'https://example.org/atelier.html#character=test'; fresh.settings.selectedId = 'other'; fresh.selectFromAddress(); assert.equal(fresh.settings.selectedId, 'test');
console.log('PASS: three-way source updates, conservative list merging, custom edits/deletions, selected conflict application, portable baselines, repeated revisions and safe character links.');
