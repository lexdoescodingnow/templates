const fs = require('fs');
const path = require('path');
const {ESPRESSO_DESIGNS, espDefault, espSnippet, espFilename} = require('./espresso-editor.js');
for (const design of ESPRESSO_DESIGNS) {
  fs.writeFileSync(path.join(__dirname, espFilename(design)), espSnippet(design, espDefault(design)));
}
const preview = path.join(__dirname, 'espresso-collection-preview.html');
const css = fs.readFileSync(path.join(__dirname, 'espresso-layout-standalone-v2.css'), 'utf8');
const ui = fs.readFileSync(path.join(__dirname, 'espresso-preview.css'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, 'espresso-editor.js'), 'utf8');
let index = 0;
let html = fs.readFileSync(preview, 'utf8').replace(/<style[^>]*>[\s\S]*?<\/style>/g, () => {
  return '<style>\n' + [css, ui][index++] + '</style>';
});
if (index !== 2) throw Error('Expected the collection and preview stylesheets.');
html = html.replace(/<script>[\s\S]*?<\/script>/, () => '<script>\n' + script.replace(/<\/script/gi, '<\\/script') + '\n</script>');
fs.writeFileSync(preview, html);
console.log('Built 15 Espresso posting snippets and the standalone preview.');
