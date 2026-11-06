'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { buildPublic, createPublicGuard, assertPublicText } = require('./build-public.cjs');
const root = __dirname;
const hash = name => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, name))).digest('hex');
const privateFiles = ['index.html', 'atelier.html', 'seed-data.js', 'README.md', 'migration-coverage.html'];
const before = Object.fromEntries(privateFiles.map(name => [name, hash(name)]));
const guard = createPublicGuard();
const privateUrl = 'https://chatgpt.com/space/page_428cac97bdec8191a031085b88b72ff7';
const legacyUrl = 'https://chat.openai.com/c/private-conversation';
const forumUrl = 'https://bluehour.jcink.net/index.php?showtopic=54637';
const metadata = guard.metadata({ label: 'Encyclopaedia details', sourceUrls: [
  { label: 'Private encyclopaedia', url: privateUrl },
  { label: 'Old workspace', url: legacyUrl },
  { label: 'Development post', url: forumUrl },
  { label: 'Unlisted source', url: 'https://unknown.example.org/source' },
  { label: 'Lookalike source', url: 'https://bluehour.jcink.net.evil.example/source' }
] });
assert.equal(metadata.label, 'Character details');
assert.deepEqual(metadata.sourceUrls, [{ label: 'Development post', url: forumUrl }]);
assert.equal(guard.privateAddress('https://www.chatgpt.com/space/test'), true);
assert.equal(guard.privateAddress('https://chatgpt.com.example.org/'), false);
assert.equal(guard.privateAddress('https://chat%67pt.com/space/test'), true);
const notes = guard.sanitize('Established facts. [Encyclopaedia](' + privateUrl + ') See https://user:pass@chat.openai.com/c/private. page_428cac97bdec8191a031085b88b72ff7');
assertPublicText(notes, 'sanitized notes');
assert.match(notes, /Established facts/);
assert.equal(guard.sanitize(privateUrl + ' Keep this fact after the link.'), 'Keep this fact after the link.');
assert.deepEqual(guard.sanitize({ label: 'Food', value: 'Pizza', url: privateUrl }), { label: 'Food', value: 'Pizza', url: '' });

const result = buildPublic();
assert.equal(result.characters, 181);
assert.deepEqual(fs.readdirSync(result.outputDir).sort(), ['.nojekyll', 'guide.html', 'index.html']);
privateFiles.forEach(name => assert.equal(hash(name), before[name], 'Private ' + name + ' must remain unchanged'));
const page = fs.readFileSync(path.join(result.outputDir, 'index.html'), 'utf8');
const guide = fs.readFileSync(path.join(result.outputDir, 'guide.html'), 'utf8');
assertPublicText(page, 'editor'); assertPublicText(guide, 'guide');
assert.ok(page.includes('href="./guide.html"'));
assert.ok(page.includes('href="#page-title"'));
assert.ok(page.includes('Your drafts stay in this browser.'));
assert.ok(page.includes('Save whole library there first, then import that backup here.'));
for (const control of ['save-character', 'save-library', 'import-backup', 'copy-post']) assert.ok(page.includes('id="' + control + '"'), control + ' must remain available');
assert.ok(!page.includes('href="README.md"'));
assert.ok(!page.includes('migration-coverage.html'));
assert.ok(!/<script\s+src="(?:seed-data|dossier-model|palette|editor)\.js"/.test(page));
assert.ok(guide.includes('does not require a GitHub account'));

const original = {};
vm.createContext(original); vm.runInContext(fs.readFileSync(path.join(root, 'seed-data.js'), 'utf8'), original, { timeout: 3000 });
for (const character of result.publicSeed.DOSSIER_SEED.characters) {
  const previous = original.DOSSIER_SEED.characters.find(item => item.id === character.id);
  for (const key of ['name', 'facts', 'timeline', 'songs', 'relationships', 'portrait', 'avatar', 'currentChapter', 'notes']) {
    assert.deepEqual(JSON.parse(JSON.stringify(character[key])), JSON.parse(JSON.stringify(guard.sanitize(previous[key]))), character.id + ': ' + key + ' content must be preserved');
  }
}
const scripts = [...page.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.equal(scripts.length, 4);
scripts.forEach((code, index) => new vm.Script(code, { filename: 'public-script-' + index }));
const runtime = { URL, URLSearchParams, Date, clone: value => JSON.parse(JSON.stringify(value)) };
runtime.window = runtime;
vm.createContext(runtime);
vm.runInContext(scripts[0], runtime, { timeout: 3000 });
vm.runInContext(scripts[1], runtime, { timeout: 3000 });
const editor = scripts[3];
const declarations = editor.slice(editor.indexOf('  const SOURCE_FIELDS ='), editor.indexOf('  const COLOUR_PALETTE ='));
const helpers = editor.slice(editor.indexOf('  function sourceMetadata(id)'), editor.indexOf('  function initData()'));
vm.runInContext(declarations + helpers, runtime);
const imported = runtime.normalizeDraftDataset({ version: 1, characters: [{ id: 'import-check', name: 'Imported character', notes: 'Character facts. ' + privateUrl, timeline: [{ id: 'story', title: 'A story', url: legacyUrl }] }], sourceTracking: { 'import-check': { revision: 'old', baseline: { id: 'import-check', name: 'Imported character', notes: privateUrl } } } });
assertPublicText(JSON.stringify(imported), 'imported backup');
assert.match(imported.characters[0].notes, /Character facts/);
assert.equal(imported.characters[0].timeline[0].title, 'A story');
assert.equal(imported.characters[0].timeline[0].url, '');
runtime.DOSSIER_SOURCE_METADATA['import-check'] = { sourceUrls: [{ label: 'Private', url: privateUrl }, { label: 'Forum', url: forumUrl }] };
const runtimeMetadata = runtime.sourceMetadata('import-check');
assert.equal(runtimeMetadata.sourceUrls.length, 1);
assert.equal(runtimeMetadata.sourceUrls[0].url, forumUrl);
assertPublicText(JSON.stringify(runtimeMetadata), 'runtime source metadata');
console.log('PASS: three-file public edition keeps all 181 characters and editing controls, excludes private links/identifiers, filters imported backups and runtime sources, and leaves Lex’s private editor unchanged.');
