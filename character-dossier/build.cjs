const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = __dirname;
execFileSync(process.execPath, [path.join(root, 'build-seed.cjs')], { stdio: 'inherit' });
const Dossier = require('./dossier-model.js');
const library = Dossier.normalizeDataset(JSON.parse(fs.readFileSync(path.join(root, 'seed-library.json'), 'utf8')));
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const write = (name, value) => fs.writeFileSync(path.join(root, name), value, 'utf8');
const cssUrl = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v5.css';
const runtime = read('palette.js') + '\n' + read('runtime.js');
write('dossier-runtime-v5.js', runtime);
const runtimeScript = '<script>' + runtime.replace(/<\/script/gi, '<\\/script') + '</script>';
const sam = library.characters.find(character => character.name === 'Baek Samuel');
if (!sam) throw new Error('Sam is missing from the library.');
write('sam-forum.txt', Dossier.forum(sam, cssUrl));
for (const [file, id] of [['sam','baek-samuel'],['ben','ben-dam'],['cookie','cookie-chalongrat-vihokratana']]) {
  const character = library.characters.find(item => item.id === id);
  write(file+'-preview.html', '<!doctype html><html lang="en" color-mode="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+Dossier.escapeHtml(character.nickname)+' · Blue Hour character dossier</title><style>body{margin:0;padding:20px 12px;background:#101413;color-scheme:dark;}'+read('dossier-v5.css')+'</style></head><body>'+Dossier.render(character)+runtimeScript+'</body></html>');
}
let portable = read('index.html');
portable = portable.replace('href="./index.html"', 'href="#page-title"').replace('href="README.md"', 'href="https://github.com/lexdoescodingnow/templates/blob/character-dossier-v1/character-dossier/README.md"');
for (const name of ['editor.css', 'dossier-v5.css']) {
  portable = portable.replace(new RegExp('<link[^>]*href=["\x27]'+name.replaceAll('.', '\\.')+'["\x27][^>]*>', 'g'), () => '<style>'+read(name)+'</style>');
}
for (const name of ['seed-data.js', 'dossier-model.js', 'palette.js', 'editor.js']) {
  const code = read(name).replace(/<\/script/gi, '<\\/script');
  const previewCss = name === 'editor.js' ? '<script>window.DOSSIER_PREVIEW_CSS='+JSON.stringify(read('dossier-v5.css')).replace(/</g, '\\u003c')+';window.DOSSIER_PREVIEW_RUNTIME='+JSON.stringify(runtime).replace(/</g, '\\u003c')+';</script>' : '';
  portable = portable.replace(new RegExp('<script[^>]*src=["\x27]'+name.replaceAll('.', '\\.')+'["\x27][^>]*>\\s*</script>'), () => previewCss+'<script>'+code+'</script>');
}
if (/src=["'](?:seed-data|dossier-model|palette|editor)\.js/.test(portable)) throw new Error('Portable script bundling failed.');
write('atelier.html', portable);
require('./build-cast.cjs').buildAllCast(library, { cssUrl, runtime });
console.log('Built the portable editor, approved examples, and all-cast outputs from '+library.characters.length+' character records.');


