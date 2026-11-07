'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;
const publicFiles = ['.nojekyll', 'guide.html', 'index.html'];

function createPublicGuard() {
  const privateHosts = ['chat' + 'gpt.com', 'chat.' + 'openai.com'];
  const sourceHosts = new Set(['bluehour.jcink.net', 'github.com', 'www.wikidata.org', 'www.openstreetmap.org', 'openstreetmap.org', 'en.wikipedia.org', 'wiki.openstreetmap.org', 'digital.library.unt.edu']);
  const privateLinks = new RegExp('https?:\\/\\/(?:[a-z0-9-]+\\.)*(?:' + privateHosts.map(host => host.replace(/\./g, '\\.')).join('|') + ')(?=[:/\\s?#]|$)[^\\s<>"\\]})]*', 'gi');
  function privateAddress(value) {
    try {
      const hostname = new URL(String(value || '')).hostname.toLowerCase();
      return privateHosts.some(host => hostname === host || hostname.endsWith('.' + host));
    } catch (_) { return false; }
  }
  function cleanText(value) {
    if (!/\s/.test(value.trim()) && privateAddress(value.trim())) return '';
    return value.replace(/\[([^\]]*)\]\((https?:\/\/[^\s)]*)\)/gi, (whole, label, address) => privateAddress(address) ? (/encyclop|source|private|workspace/i.test(label) ? '' : label) : whole)
      .replace(/https?:\/\/[^\s<>"'\]})]+/gi, address => privateAddress(address) ? '' : address)
      .replace(privateLinks, '').replace(/\bpage_[a-f0-9]{16,}\b/gi, '').trim();
  }
  function sanitize(value) {
    if (typeof value === 'string') return cleanText(value);
    if (Array.isArray(value)) return value.map(sanitize).filter(item => item !== undefined);
    if (!value || typeof value !== 'object') return value;
    const result = {};
    Object.entries(value).forEach(([key, item]) => {
      if (['__proto__', 'prototype', 'constructor'].includes(key)) return;
      const clean = sanitize(item);
      if (clean !== undefined) result[key] = clean;
    });
    return result;
  }
  function sourceAddress(value) {
    try {
      const url = new URL(String(value || ''));
      return url.protocol === 'https:' && !url.username && !url.password && !url.port && sourceHosts.has(url.hostname) ? url.href : '';
    } catch (_) { return ''; }
  }
  function metadata(value) {
    const clean = sanitize(value) || {};
    clean.sourceUrls = (Array.isArray(clean.sourceUrls) ? clean.sourceUrls : []).filter(item => sourceAddress(typeof item === 'string' ? item : item?.url));
    if (clean.label === 'Encyclopaedia details') clean.label = 'Character details';
    return clean;
  }
  return { sanitize, metadata, sourceAddress, privateAddress };
}

function replaceExactly(text, previous, replacement, label) {
  if (text.split(previous).length !== 2) throw new Error('Expected one public-edition replacement for ' + label + '.');
  return text.replace(previous, replacement);
}
function jsonScript(value) { return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029'); }
function script(code) { return '<script>' + code.replace(/<\/script/gi, '<\\/script') + '</script>'; }
function assertPublicText(value, name) {
  if (/(?:chatgpt\.com|chat\.openai\.com|page_[a-f0-9]{16,})/i.test(value)) throw new Error('Private workspace reference remains in public ' + name + '.');
}
function guideHtml() {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Using the character atelier · Blue Hour</title><style>html{color-scheme:dark;font:16px/1.7 system-ui,sans-serif;background:#151719;color:#eef0eb}body{max-width:780px;margin:auto;padding:40px 24px}a{color:#ccd6ad}h1,h2{line-height:1.2}h1{font-size:36px}h2{font-size:21px;margin-top:34px}li{margin-bottom:12px}.note{padding:18px 20px;border:1px solid #41483e;border-radius:10px;background:#20251e}small{color:#b0b8ad}</style></head><body><a href="./index.html">← Open the character atelier</a><h1>A shared editor, your own drafts.</h1><p>Lex and Sara can use the same editor link. Each browser keeps its own saved drafts; changes do not appear in the other person’s copy automatically.</p><h2>Choose, edit and post</h2><ol><li>Choose any of the 181 characters, or create a new one.</li><li>Edit the named fields. Header photos set the colours automatically. Connections, songs and story entries have their own add buttons.</li><li>Choose <strong>Copy forum post</strong>, then paste it into the character’s Blue Hour development post. Later edits need to be copied to the forum again.</li></ol><h2>Pass changes to one another</h2><ol><li>Open <strong>Save &amp; share</strong>. Choose <strong>Save this character</strong> for one profile, or <strong>Save whole library</strong> for everything.</li><li>Send that downloaded backup file to the other person. Its contents do not need to be opened or edited.</li><li>They open the editor, choose <strong>Import a backup</strong>, and select the file. Import asks before replacing matching character drafts; other characters stay unchanged.</li></ol><p>Save a backup of your own edits before importing someone else’s version. Exchange a single-character backup when only that character needs updating.</p><h2>Moving from a downloaded copy</h2><p class="note">Open the downloaded editor where your existing drafts are saved. Choose <strong>Save &amp; share → Save whole library</strong>. Then open this online editor and choose <strong>Import a backup</strong>. Your downloaded copy stays unchanged.</p><h2>What gets saved</h2><p>Browser saving works in this browser on this website. A different browser or device has its own drafts; moving between a downloaded copy and this website also needs a backup. Download backups regularly, especially before moving devices or clearing browser data.</p><p>The online editor does not require a GitHub account. Its save buttons do not publish to GitHub or edit forum posts. Photos, music and maps need an internet connection.</p><h2>Story dates and supplied details</h2><p>The timeline uses an in-world date when you provide one, otherwise the topic start date. Known topics fill their dates automatically. New topics can fill their date when the post is viewed or previewed on Blue Hour.</p><p>Updated supplied details preserve your edits. If a source update conflicts with your draft, choose <strong>Review source updates</strong> and select only the changes you want.</p><p><small>This edition contains the character details and public forum references. Private workspace links are excluded.</small></p></body></html>';
}

function buildPublic(options = {}) {
  const outputDir = path.resolve(options.outputDir || path.join(root, 'public'));
  if (outputDir === root || root.startsWith(outputDir + path.sep)) throw new Error('Choose a dedicated public output directory, not the private editor directory.');
  if (fs.existsSync(outputDir) && fs.readdirSync(outputDir).some(name => !publicFiles.includes(name))) throw new Error('The public output directory contains unexpected files. Use a dedicated directory containing only the public edition.');
  const read = name => fs.readFileSync(path.join(root, name), 'utf8');
  const seed = {};
  vm.createContext(seed);
  vm.runInContext(read('seed-data.js'), seed, { timeout: 3000 });
  const guard = createPublicGuard();
  const globals = ['DOSSIER_SEED', 'DOSSIER_NOTICES', 'DOSSIER_SOURCE_METADATA', 'DOSSIER_PREVIOUS_SEED', 'DOSSIER_TOPIC_DATES'];
  const publicSeed = {};
  for (const key of globals) {
    if (seed[key] === undefined) throw new Error('Missing source global: ' + key);
    publicSeed[key] = guard.sanitize(seed[key]);
  }
  Object.keys(publicSeed.DOSSIER_SOURCE_METADATA).forEach(id => { publicSeed.DOSSIER_SOURCE_METADATA[id] = guard.metadata(publicSeed.DOSSIER_SOURCE_METADATA[id]); });
  if (publicSeed.DOSSIER_SEED.characters.length !== 181) throw new Error('The public edition must include all 181 supplied characters.');

  let editor = read('editor.js');
  editor = replaceExactly(editor, '  function normalizeDraftDataset(raw) {', '  function normalizeDraftDataset(raw) {\n    raw = globalThis.DossierPublic.sanitize(raw);', 'backup import filtering');
  const rawMetadata = "    const raw = Object.hasOwn(all, id) && all[id] && typeof all[id] === 'object' ? all[id] : {};";
  editor = replaceExactly(editor, rawMetadata, "    const raw = globalThis.DossierPublic.metadata(Object.hasOwn(all, id) && all[id] && typeof all[id] === 'object' ? all[id] : {});", 'runtime source allowlist');
  editor = editor.replaceAll("encyclopaedia: 'Encyclopaedia details'", "encyclopaedia: 'Character details'").replaceAll('Includes the available encyclopaedia details for this character.', 'Includes the available character details.');
  let page = read('index.html');
  page = replaceExactly(page, 'href="./index.html"', 'href="#page-title"', 'home link');
  page = replaceExactly(page, 'href="README.md"', 'href="./guide.html"', 'public guide');
  page = replaceExactly(page, 'Browser drafts are saved on this device.<br>Download a backup to keep or share them.', 'Your drafts stay in this browser.<br>Exchange backups to share changes.', 'browser-saving explanation');
  page = replaceExactly(page, 'Backups contain your editable character information. Import one on another device, or share it with Sara. These buttons do not publish to GitHub or change your forum post.', 'Lex and Sara each keep their own drafts. Export a character or library backup and pass it to one another, then import it here. Moving from a downloaded editor? Save whole library there first, then import that backup here. These buttons do not publish or change forum posts.', 'backup handoff explanation');
  page = page.replace('>Encyclopaedia details</option>', '>Character details</option>');
  page = replaceExactly(page, '<link rel="stylesheet" href="editor.css">', '<style>' + read('editor.css') + '</style>', 'embedded editor stylesheet');
  const runtime = read('palette.js') + '\n' + read('topic-dates.js') + '\n' + read('runtime.js');
  const bundled = {
    'seed-data.js': 'window.DossierPublic=(' + createPublicGuard.toString() + ')();\n' + globals.map(key => 'var ' + key + '=' + jsonScript(publicSeed[key]) + ';').join('\n'),
    'dossier-model.js': read('dossier-model.js'),
    'palette.js': read('palette.js'),
    'editor.js': 'window.DOSSIER_PREVIEW_CSS=' + jsonScript(read('dossier-v5.1.css')) + ';window.DOSSIER_PREVIEW_RUNTIME=' + jsonScript(runtime) + ';\n' + editor
  };
  for (const [name, code] of Object.entries(bundled)) page = replaceExactly(page, '<script src="' + name + '"></script>', script(code), 'embedded ' + name);
  const output = { 'index.html': page, 'guide.html': guideHtml(), '.nojekyll': '' };
  Object.entries(output).forEach(([name, content]) => assertPublicText(content, name));
  fs.mkdirSync(outputDir, { recursive: true });
  Object.entries(output).forEach(([name, content]) => fs.writeFileSync(path.join(outputDir, name), content, 'utf8'));
  return { outputDir, characters: publicSeed.DOSSIER_SEED.characters.length, files: Object.keys(output), publicSeed };
}
if (require.main === module) {
  const result = buildPublic({ outputDir: process.argv[2] });
  console.log('Built public character editor: ' + result.characters + ' characters, ' + result.files.join(', ') + '.');
}
module.exports = { buildPublic, createPublicGuard, assertPublicText };
