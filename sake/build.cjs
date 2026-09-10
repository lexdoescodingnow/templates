const fs=require('node:fs');
const path=require('node:path');
const dir=__dirname;
const read=n=>fs.readFileSync(path.join(dir,n),'utf8');
const designs=JSON.parse(read('designs.json'));
const model=require('./sake-model.js');
for(const d of designs)fs.writeFileSync(path.join(dir,model.sakeFilename(d)),model.sakeSnippet(d,model.sakeDefaults(d)));
const css=read('sake-preview.css')+'\n'+read('sake-brew-v1.css');
const script=read('sake-model.js')+'\nconst SAKE_DESIGNS = '+JSON.stringify(designs)+';\n'+read('sake-editor.js');
fs.writeFileSync(path.join(dir,'sake-collection-preview.html'),read('preview-shell.html').replace('SAKE_STYLES',()=>css).replace('SAKE_SCRIPT',()=>script));
console.log('Built 15 Sake snippets and the standalone editor.');

