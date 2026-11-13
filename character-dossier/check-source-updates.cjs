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

const fact = (label, value) => ({ label, value });
const oldInformation = character({
  facts: [fact('Date of birth', '13 October'), fact('Favourite colour', 'red'), fact('MBTI', 'ISTP')]
});
const newInformation = character({
  gender: 'Male',
  facts: [fact('Birthday', '14 October'), fact('Favorite Color', 'blue'), fact('MBTI', 'INTJ'),
    fact('Nationality', 'Korean'), fact('Languages', 'English'), fact('Blood Type', 'A+'),
    fact('Favorite Food', '[text]'), fact('FC', 'Face Claim')]
});
const sparseDraft = character({
  gender: '—',
  facts: [fact('Favourite colour', 'violet'), fact('MBTI', ''), fact('Nationality', '—'),
    fact('Language', 'Turkish'), fact('', ''), { label: 'Blood group', value: '', informationPrimary: true }]
});
const updatedInformation = context([oldInformation], [newInformation], [sparseDraft], ['gender', 'facts']);
updatedInformation.applySourceUpdates();
const updatedDraft = updatedInformation.library.characters[0];
assert.equal(updatedDraft.gender, 'Male');
assert.equal(Dossier.getInformationValue(updatedDraft, 'birthday'), '', 'A deliberately deleted field must stay deleted even when the source renames it');
assert.deepEqual(plain(updatedDraft.facts.filter(row => /colou?r/i.test(row.label))), [fact('Favourite colour', 'violet')]);
assert.equal(Dossier.getInformationValue(updatedDraft, 'mbti'), '', 'Clearing an established value is a manual edit');
assert.equal(Dossier.getInformationValue(updatedDraft, 'nationality'), 'Korean', 'A verified value can fill an old template marker');
assert.deepEqual(plain(updatedDraft.facts.filter(row => /language/i.test(row.label))), [fact('Language', 'Turkish')]);
assert.equal(Dossier.getInformationValue(updatedDraft, 'bloodType'), '', 'An explicitly selected blank primary value must remain blank');
assert.equal(updatedDraft.facts.some(row => row.label === 'Favorite Food'), false, 'New source placeholders must not be added');
assert.equal(updatedDraft.facts.some(row => row.label === '' && row.value === ''), true, 'An unfinished additional fact remains editable');
assert.equal(Dossier.getInformationValue(updatedDraft, 'faceClaim'), 'Face Claim', 'An unfinished extra must not block unrelated source facts');
const history = updatedInformation.normalizeSourceTracking(plain(updatedInformation.library.sourceTracking), ['test']);
const reopenedInformation = context(null, [newInformation], [updatedDraft], ['gender', 'facts'], 'source-2', history);
reopenedInformation.applySourceUpdates();
assert.deepEqual(plain(reopenedInformation.library.characters[0].facts), plain(updatedDraft.facts));
assert.equal(reopenedInformation.sourceUpdates.get('test').conflicts.length, 3, 'Only the conflicting values need review, never a canonical label spelling');

const overlappingAliases = character({ facts: [fact('Birthday', 'April'), fact('DOB', 'March')] });
const literalDraft = character({ gender: 'Unknown', facts: [fact('Nationality', 'Not specified'), fact('Language', 'Unknown')] });
const literal = context([character({})], [newInformation], [literalDraft], ['gender', 'facts']);
literal.applySourceUpdates();
assert.equal(literal.library.characters[0].gender, 'Unknown');
assert.equal(Dossier.getInformationValue(literal.library.characters[0], 'nationality'), 'Not specified');
assert.equal(Dossier.getInformationValue(literal.library.characters[0], 'languages'), 'Unknown');
assert.equal(literal.sourceUpdates.get('test').conflicts.length, 3);
const legacyGender = context([character({})], [newInformation], [character({ facts: [fact('Gender', 'Not specified')] })], ['gender', 'facts']);
legacyGender.applySourceUpdates();
assert.equal(Dossier.getInformationValue(legacyGender.library.characters[0], 'gender'), 'Not specified');
legacyGender.applySourceConflict(legacyGender.library.characters[0], legacyGender.sourceUpdates.get('test').conflicts[0]);
assert.equal(legacyGender.library.characters[0].facts.find(f => f.label === 'Gender').value, 'Male');
assert.equal(legacyGender.library.characters[0].gender, '', 'An accepted update edits the same legacy Gender record');
const overlapUpdate = context([character({})], [newInformation], [overlappingAliases], ['facts']);
overlapUpdate.applySourceUpdates();
assert.deepEqual(plain(overlapUpdate.library.characters[0].facts.slice(0, 2)), plain(overlappingAliases.facts));
assert.equal(Dossier.getInformationValue(overlapUpdate.library.characters[0], 'nationality'), 'Korean');

const fullInformation = character({ facts: Array.from({ length: 150 }, (_, index) => fact('Extra ' + index, 'Keep')) });
const atCapacity = context([character({})], [newInformation], [fullInformation], ['facts']);
atCapacity.applySourceUpdates();
assert.deepEqual(plain(atCapacity.library.characters[0].facts), plain(fullInformation.facts));

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
