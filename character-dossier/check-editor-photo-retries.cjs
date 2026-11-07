'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const Dossier = require('./dossier-model.js');
const source = fs.readFileSync(path.join(__dirname, 'editor.js'), 'utf8');
const photoFunctions = source.slice(source.indexOf('  function fullHex('), source.indexOf('  function updateChromeColour(')) + source.slice(source.indexOf('  function cancelPhotoTheme('), source.indexOf('  function colourFields('));
const exportFunction = source.slice(source.indexOf('  async function preparePost('), source.indexOf('  async function copyPost('));
const originalUrl = 'https://i.pinimg.com/736x/06/8f/90/068f90bba27ca8df5350c9ddc119485e.jpg';
function setup(get) {
  const timers = new Map(); let nextTimer = 0;
  const character = Dossier.normalizeCharacter({ id: 'sam', name: 'Sam', portrait: originalUrl, accent: '#5b8612', themeMode: 'auto' });
  const state = {
    Dossier, AbortController, character, currentCharacter: character,
    library: { characters: [character] }, photoThemeStates: new Map(), photoThemeJobs: new Map(), photoThemeSequence: 0,
    document: { querySelector: () => null }, PhotoPalette: { get, version: 2 }, exportBusy: false, generatedCode: '', changes: 0,
    setTimeout: (callback, delay) => { const id = ++nextTimer; timers.set(id, { callback, delay }); return id; },
    clearTimeout: id => timers.delete(id),
    current: () => state.currentCharacter,
    updateChromeColour: () => {}, changed: () => { state.changes += 1; }, message: text => { state.lastMessage = text; },
    $: () => ({ disabled: false })
  };
  vm.createContext(state);
  vm.runInContext(photoFunctions + exportFunction + '\nfunction updatePreview() { generatedCode = current().accent; requestPhotoTheme(current(), false); }', state);
  state.runTimer = () => { const entry = timers.entries().next().value; assert.ok(entry, 'Expected a scheduled attempt'); timers.delete(entry[0]); return entry[1].callback(); };
  state.timers = timers;
  return state;
}
(async () => {
  let attempts = 0;
  const recover = setup(async (url, options) => {
    attempts += 1; assert.equal(url, originalUrl);
    if (attempts === 1) throw new Error('Temporary image service failure');
    assert.equal(options.refresh, true); return '#a57968';
  });
  let exported = false;
  const post = recover.preparePost().then(result => { exported = true; return result; });
  await recover.runTimer();
  assert.equal(attempts, 1); assert.equal(exported, false);
  assert.equal(recover.character.accent, '#5b8612');
  assert.match(recover.photoThemeStates.get('sam').message, /Retrying automatically \(2 of 3\)/);
  await recover.runTimer();
  const result = await post;
  assert.equal(result.code, '#a57968'); assert.equal(result.fallback, false);
  assert.equal(recover.character.paletteVersion, 2);
  assert.equal(recover.character.paletteSource, originalUrl); assert.equal(recover.timers.size, 0);

  attempts = 0;
  const exhausted = setup(async () => { attempts += 1; throw new Error('Still unavailable'); });
  const failedPost = exhausted.preparePost();
  await exhausted.runTimer(); await exhausted.runTimer(); await exhausted.runTimer();
  const fallback = await failedPost;
  assert.equal(fallback.code, '#5b8612'); assert.equal(fallback.fallback, true);
  assert.equal(attempts, 3); assert.equal(exhausted.timers.size, 0);
  assert.match(exhausted.photoThemeStates.get('sam').message, /after 3 attempts/);
  assert.equal((await exhausted.requestPhotoTheme(exhausted.character, false)).status, 'error');
  assert.equal(attempts, 3); assert.equal(exhausted.timers.size, 0);
  exhausted.PhotoPalette.get = async () => '#8f626d';
  const explicitRetry = exhausted.requestPhotoTheme(exhausted.character, true);
  await exhausted.runTimer(); assert.equal((await explicitRetry).status, 'ready');
  assert.equal(exhausted.character.accent, '#8f626d');

  attempts = 0;
  const manual = setup(async () => { attempts += 1; throw new Error('Temporary failure'); });
  const cancelled = manual.requestPhotoTheme(manual.character, false);
  await manual.runTimer();
  manual.character.themeMode = 'manual'; manual.character.accent = '#123456'; manual.cancelPhotoTheme('sam');
  assert.equal((await cancelled).status, 'cancelled'); assert.equal(manual.timers.size, 0);
  assert.equal((await manual.requestPhotoTheme(manual.character, false)).status, 'manual');
  assert.equal(attempts, 1); assert.equal(manual.character.accent, '#123456');

  let finishOld;
  const stale = setup(() => new Promise(resolve => { finishOld = resolve; }));
  const oldJob = stale.requestPhotoTheme(stale.character, false);
  const oldAttempt = stale.runTimer();
  stale.character.portrait = 'https://images.example.org/new-header.jpg';
  stale.PhotoPalette.get = async () => '#a28443';
  const newJob = stale.requestPhotoTheme(stale.character, false);
  finishOld('#ff0000'); await oldAttempt;
  assert.equal((await oldJob).status, 'cancelled'); assert.equal(stale.character.accent, '#5b8612');
  await stale.runTimer(); assert.equal((await newJob).status, 'ready');
  assert.equal(stale.character.accent, '#a28443'); assert.equal(stale.character.paletteSource, stale.character.portrait);

  const revisedAlgorithm = setup(async () => '#777575');
  revisedAlgorithm.character.paletteSource = originalUrl; revisedAlgorithm.character.paletteCrop = '50% 35%'; revisedAlgorithm.character.paletteVersion = 1;
  const rematched = revisedAlgorithm.requestPhotoTheme(revisedAlgorithm.character, false);
  await revisedAlgorithm.runTimer(); assert.equal((await rematched).status, 'ready');
  assert.equal(revisedAlgorithm.character.accent, '#777575'); assert.equal(revisedAlgorithm.character.paletteVersion, 2);
  assert.equal((await revisedAlgorithm.requestPhotoTheme(revisedAlgorithm.character, false)).status, 'ready');
  assert.equal(revisedAlgorithm.timers.size, 0);
  console.log('PASS: bounded photo retries, export waits for recovery, clear fallback after exhaustion, explicit retry, manual cancellation, stale-photo protection and palette-version refresh.');
})().catch(error => { console.error(error); process.exitCode = 1; });
