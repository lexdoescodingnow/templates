'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const Dossier = require('./dossier-model.js');
const root = __dirname;
const defaultCssUrl = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v5.1.css';
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const html = Dossier.escapeHtml;
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const jsonScript = value => JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
const script = value => '<script>' + value.replace(/<\/script/gi,'<\\/script') + '</script>';

const crcTable = Array.from({length:256},(_,index)=>{
  let value = index;
  for (let bit=0;bit<8;bit++) value = (value & 1) ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function createZip(entries) {
  if (entries.length > 65535) throw new Error('The archive contains too many files.');
  const local = [], central = [], names = new Set();
  let offset = 0;
  for (const entry of entries) {
    if (!/^[a-zA-Z0-9._/-]+$/.test(entry.name) || entry.name.startsWith('/') || entry.name.split('/').includes('..') || names.has(entry.name)) throw new Error('Unsafe or duplicate archive filename: ' + entry.name);
    names.add(entry.name);
    const name = Buffer.from(entry.name,'utf8');
    const data = Buffer.isBuffer(entry.data) ? entry.data : Buffer.from(entry.data,'utf8');
    const packed = zlib.deflateRawSync(data,{level:9});
    const crc = crc32(data);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50,0); header.writeUInt16LE(20,4); header.writeUInt16LE(0x800,6);
    header.writeUInt16LE(8,8); header.writeUInt16LE(33,12); header.writeUInt32LE(crc,14);
    header.writeUInt32LE(packed.length,18); header.writeUInt32LE(data.length,22); header.writeUInt16LE(name.length,26);
    local.push(header,name,packed);
    const directory = Buffer.alloc(46);
    directory.writeUInt32LE(0x02014b50,0); directory.writeUInt16LE(20,4); directory.writeUInt16LE(20,6);
    directory.writeUInt16LE(0x800,8); directory.writeUInt16LE(8,10); directory.writeUInt16LE(33,14);
    directory.writeUInt32LE(crc,16); directory.writeUInt32LE(packed.length,20); directory.writeUInt32LE(data.length,24);
    directory.writeUInt16LE(name.length,28); directory.writeUInt32LE(offset,42);
    central.push(directory,name);
    offset += header.length + name.length + packed.length;
  }
  const centralData = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50,0); end.writeUInt16LE(entries.length,8); end.writeUInt16LE(entries.length,10);
  end.writeUInt32LE(centralData.length,12); end.writeUInt32LE(offset,16);
  return Buffer.concat(local.concat([centralData,end]));
}

function readManifest(library) {
  const manifestPath = path.join(root,'migration-sources.json');
  if (!fs.existsSync(manifestPath)) return { manifest:null, sourceText:'' };
  const sourceText = fs.readFileSync(manifestPath,'utf8');
  const manifest = JSON.parse(sourceText);
  if (!manifest || manifest.version !== 1 || !Array.isArray(manifest.characters)) throw new Error('migration-sources.json must contain version 1 and a characters list.');
  const valid = new Set(library.characters.map(character=>character.id)), seen = new Set();
  for (const row of manifest.characters) {
    if (!row || !valid.has(row.id) || seen.has(row.id)) throw new Error('Migration source has an unknown or duplicate character id: ' + (row && row.id));
    seen.add(row.id);
    if (!['starter','partial','migrated'].includes(row.status)) throw new Error('Invalid migration status for ' + row.id);
    if (!Array.isArray(row.sources)) throw new Error('Migration sources must be a list for ' + row.id);
    for (const source of row.sources) {
      if (!source || typeof source.kind !== 'string' || !source.kind.trim()) throw new Error('A source kind is required for ' + row.id);
      if (source.url && !Dossier.safeUrl(source.url)) throw new Error('Invalid source URL for ' + row.id);
      if (!source.url && !source.path && !source.reference) throw new Error('A source needs an address, file path or reference for ' + row.id);
      if (source.fields !== undefined && (!Array.isArray(source.fields) || source.fields.some(field=>typeof field !== 'string'))) throw new Error('Source fields must be a text list for ' + row.id);
    }
    for (const field of ['missing','notes','conflicts']) if (row[field] !== undefined && (!Array.isArray(row[field]) || row[field].some(value=>typeof value !== 'string'))) throw new Error(field + ' must be a text list for ' + row.id);
    if (row.status === 'migrated' && !row.sources.length) throw new Error('A migrated record needs at least one source: ' + row.id);
  }
  return {manifest,sourceText};
}

function coverageFor(library,manifest,sourceText) {
  const sourceById = new Map((manifest ? manifest.characters : []).map(row=>[row.id,row]));
  const rows = library.characters.map(character=>{
    const source = sourceById.get(character.id);
    return {
      id:character.id,name:character.name,nickname:character.nickname,
      status:source ? source.status : 'unreviewed',
      counts:{facts:character.facts.filter(fact=>fact.label && fact.value).length,connections:character.relationships.length,story:character.timeline.length,songs:character.songs.length,polaroids:character.polaroids.filter(photo=>photo.image).length,playlist:!!character.playlistUrl,map:character.mapLatitude !== '' && character.mapLongitude !== ''},
      sources:source ? source.sources : [],missing:source && source.missing || [],notes:source && source.notes || [],conflicts:source && source.conflicts || []
    };
  });
  return {
    version:1,librarySha256:hash(JSON.stringify(library)),sourceManifestSha256:sourceText ? hash(sourceText) : null,
    summary:{characters:rows.length,migrated:rows.filter(row=>row.status==='migrated').length,partial:rows.filter(row=>row.status==='partial').length,starter:rows.filter(row=>row.status==='starter').length,unreviewed:rows.filter(row=>row.status==='unreviewed').length,withConflicts:rows.filter(row=>row.conflicts.length).length},
    characters:rows
  };
}

const reviewLabels = {migrated:'Source content migrated',partial:'Partly migrated',starter:'PI starter only',unreviewed:'Source review pending'};
const reviewCss = 'html{font:14px/1.5 "Segoe UI",Arial,sans-serif;background:#f5f7f2;color:#233123}body{max-width:1250px;margin:auto;padding:24px}h1{margin-bottom:5px}p{max-width:820px}a{color:#365e27}table{border-collapse:collapse;width:100%;background:white}th,td{text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #dce3d7}th{background:#e9efe3;position:sticky;top:0}td:nth-child(3){white-space:nowrap;font-variant-numeric:tabular-nums}small{color:#51644a}ul{margin:5px 0;padding-left:18px}.table-wrap{overflow:auto}details{min-width:220px}summary{cursor:pointer}nav{display:flex;gap:14px;flex-wrap:wrap;margin:18px 0}.status{font-size:12px}';
function coverageHtml(coverage) {
  const rows = coverage.characters.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(row=>{
    const details = row.sources.map(source=>'<li>'+html(source.kind)+': '+(source.url?'<a href="'+html(source.url)+'" target="_blank" rel="noopener noreferrer">'+html(source.reference||source.url)+'</a>':html(source.path||source.reference))+(source.fields && source.fields.length?' <small>('+html(source.fields.join(', '))+')</small>':'')+'</li>').join('');
    const notes = [['Missing from migrated record',row.missing],['Notes',row.notes],['Conflicts to review',row.conflicts]].filter(([,values])=>values.length).map(([label,values])=>'<p><b>'+label+'</b></p><ul>'+values.map(value=>'<li>'+html(value)+'</li>').join('')+'</ul>').join('');
    const count = row.counts;
    return '<tr><td>'+html(row.name)+'<br><small>'+html(row.nickname)+'</small></td><td class="status">'+reviewLabels[row.status]+'</td><td>'+count.facts+' facts<br>'+count.connections+' connections<br>'+count.story+' story entries<br>'+count.songs+' songs'+(count.playlist?' + playlist':'')+'<br>'+count.polaroids+' polaroids'+(count.map?' + map':'')+'</td><td>'+(details||notes?'<details><summary>'+row.sources.length+' source'+(row.sources.length===1?'':'s')+(row.conflicts.length?' · '+row.conflicts.length+' conflict'+(row.conflicts.length===1?'':'s'):'')+'</summary>'+(details?'<ul>'+details+'</ul>':'')+notes+'</details>':'Source review has not been recorded.')+'</td></tr>';
  }).join('');
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Character migration coverage</title><style>'+reviewCss+'</style></head><body><h1>Character migration coverage</h1><p>'+coverage.summary.characters+' characters · '+coverage.summary.migrated+' source migrations recorded · '+coverage.summary.partial+' partial · '+coverage.summary.starter+' PI starters · '+coverage.summary.unreviewed+' awaiting source review.</p><p>Content counts describe the saved records. Review labels come from the source audit. “Source content migrated” means the cited material has been transferred; it does not imply that every optional profile field exists in those sources.</p><nav><a href="cast.html">Browse characters</a><a href="atelier.html">Open the editor</a><a href="all-characters.zip" download>Download all profiles</a></nav><div class="table-wrap"><table><thead><tr><th>Character</th><th>Source review</th><th>Saved content</th><th>Sources and notes</th></tr></thead><tbody>'+rows+'</tbody></table></div></body></html>';
}

function previewHtml(character) {
  return '<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+html(character.name)+' · Blue Hour</title><link rel="stylesheet" href="../assets/dossier-v5.1.css"><style>body{margin:0;padding:20px 12px;background:#101413;color-scheme:dark}</style></head><body>'+Dossier.render(character)+'<script src="../assets/dossier-runtime-v5.1.js"></script></body></html>';
}

function archiveIndex(library) {
  return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blue Hour character library</title><style>'+reviewCss+'</style></head><body><h1>Blue Hour character library</h1><p>Open a preview, or open a forum post and copy its complete contents into Blue Hour. Keep the assets folder beside previews. Photos, music and maps need an internet connection.</p><p><a href="migration-coverage.html">Source migration coverage</a> · <a href="library.json" download>Character library backup</a></p><table><thead><tr><th>Character</th><th>Preview</th><th>Forum post</th></tr></thead><tbody>'+library.characters.slice().sort((a,b)=>a.name.localeCompare(b.name)).map(character=>'<tr><td>'+html(character.name)+'</td><td><a href="previews/'+character.id+'.html">Open preview</a></td><td><a href="posts/'+character.id+'.txt">Open forum code</a> · <a href="posts/'+character.id+'.txt" download>Download</a></td></tr>').join('')+'</tbody></table></body></html>';
}

function browserHtml(library,cssUrl,runtime) {
  return '<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Blue Hour · All characters</title><style>'+read('cast.css')+'</style><style>'+read('dossier-v5.1.css')+'</style></head><body><main class="cast-shell"><header class="cast-heading"><div><h1>Blue Hour · Character library</h1><p>'+library.characters.length+' characters, ready to browse, edit and post.</p></div><nav class="cast-actions"><a class="cast-button" href="atelier.html">Open the editor</a><a class="cast-button" href="all-characters.zip" download>Download all profiles</a><a class="cast-button" href="migration-coverage.html">Source coverage</a><button type="button" id="cast-theme">Light view</button></nav></header><noscript><p class="cast-noscript">The character chooser needs JavaScript. <a href="all-characters.zip" download>Download all profiles</a> for individual readable previews and forum posts.</p></noscript><div class="cast-workspace"><aside class="cast-sidebar"><label for="cast-search">Find a character</label><input type="search" id="cast-search" placeholder="Name or nickname" autocomplete="off"><span id="cast-result-count" class="cast-result-count"></span><div id="cast-list" class="cast-list" aria-label="Characters"></div><p id="cast-empty" class="cast-empty" hidden>No matching characters.</p></aside><section class="cast-stage" aria-label="Selected character"><div class="cast-toolbar"><h2 id="cast-selected-name"></h2><a id="cast-edit" class="cast-button" href="atelier.html">Edit this character</a><button type="button" id="cast-copy">Copy forum post</button><button type="button" id="cast-download">Download post</button></div><p id="cast-status" class="cast-status" role="status"></p><details id="cast-code" class="cast-code"><summary>View forum code</summary><textarea id="cast-code-text" readonly aria-label="Ready-to-paste forum post" spellcheck="false"></textarea></details><div id="cast-preview" class="cast-preview"></div></section></div></main>'+script(read('dossier-model.js'))+script('window.DOSSIER_CAST_DATA='+jsonScript(library)+';window.DOSSIER_CAST_CONFIG='+jsonScript({stylesheetUrl:cssUrl})+';')+script(read('cast-browser.js'))+script(runtime)+'</body></html>';
}

function buildAllCast(library,options={}) {
  library = Dossier.normalizeDataset(library);
  const cssUrl = options.cssUrl || defaultCssUrl;
  const runtime = options.runtime || read('palette.js')+'\n'+read('runtime.js');
  const {manifest,sourceText} = readManifest(library);
  const coverage = coverageFor(library,manifest,sourceText);
  const coverageJson = JSON.stringify(coverage,null,2)+'\n';
  const coveragePage = coverageHtml(coverage);
  const entries = [
    {name:'README.txt',data:'BLUE HOUR CHARACTER LIBRARY\n\nOpen index.html to browse all '+library.characters.length+' characters.\nOpen posts/<character>.txt and copy the complete contents into Blue Hour.\nPreviews use the shared assets folder; keep it beside the previews folder.\nPhotos, Spotify and maps need an internet connection.\nImport library.json in the character atelier to edit these records.\nReview migration-coverage.html for the available sources and known gaps.\n'},
    {name:'index.html',data:archiveIndex(library).replace('<p><a href="migration-coverage.html">','<p><a href="atelier.html">Open the shared character editor</a> · <a href="migration-coverage.html">')},
    {name:'atelier.html',data:read('atelier.html')},
    {name:'library.json',data:JSON.stringify(library,null,2)+'\n'},
    {name:'assets/dossier-v5.1.css',data:read('dossier-v5.1.css')},
    {name:'assets/dossier-runtime-v5.1.js',data:runtime},
    {name:'migration-coverage.json',data:coverageJson},
    {name:'migration-coverage.html',data:coveragePage.replace('<nav><a href="cast.html">Browse characters</a><a href="atelier.html">Open the editor</a><a href="all-characters.zip" download>Download all profiles</a></nav>','<nav><a href="index.html">Browse characters</a></nav>')}
  ];
  for (const character of library.characters) {
    entries.push({name:'posts/'+character.id+'.txt',data:Dossier.forum(character,cssUrl)});
    entries.push({name:'previews/'+character.id+'.html',data:previewHtml(character)});
  }
  fs.writeFileSync(path.join(root,'cast.html'),browserHtml(library,cssUrl,runtime),'utf8');
  fs.writeFileSync(path.join(root,'migration-coverage.json'),coverageJson,'utf8');
  fs.writeFileSync(path.join(root,'migration-coverage.html'),coveragePage,'utf8');
  fs.writeFileSync(path.join(root,'all-characters.zip'),createZip(entries));
  console.log('Built all-cast browser and archive: '+library.characters.length+' previews, '+library.characters.length+' forum posts; '+coverage.summary.unreviewed+' source reviews pending.');
  return {coverage,entries:entries.map(entry=>entry.name)};
}

if (require.main === module) buildAllCast(JSON.parse(read('seed-library.json')));
module.exports = {buildAllCast,createZip,coverageFor,crc32,defaultCssUrl};
