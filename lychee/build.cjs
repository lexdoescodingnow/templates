const fs = require('node:fs');
const path = require('node:path');
const { buildEditor } = require('./editor.cjs');
const { illustrationCss } = require('./illustrations.cjs');
const root = path.resolve(__dirname, '..');
const forum = path.join(root, 'forum-posts');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
const write = (file, content) => fs.writeFileSync(path.join(__dirname, file), content);
const writeForum = (file, content) => fs.writeFileSync(path.join(forum, file), content);
const cssFile = 'lychee-orchard-glass-standalone-v2.css';
const cssUrl = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/lychee/' + cssFile;
const gifs = [
  'https://64.media.tumblr.com/cfcf729fefc77ad38efcb6d566632ea8/e77930a5f3b7b90c-6e/s400x600/688a74647cfe8278e9a5380b6ee2fdd0de107f52.gifv',
  'https://64.media.tumblr.com/ea535f2c97bd0394fc52d538ce4aa7ec/c38f3ca42835b5bc-45/s400x600/2447bf8417a283b7c67c2e041507a8e87d7e66ff.gifv'
];
const bodies = {
  thread: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Donec vitae nunc vel sem dictum.</b> Sed non felis et nulla eleifend ultrices. Cras in eros eget erat luctus varius. Etiam ut risus in sapien convallis fringilla.',
    'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <i>Quisque vitae lacus vel lectus interdum</i> vulputate. In hac habitasse platea dictumst. <u>Praesent quis urna.</u>'
  ],
  comms: [
    'Lorem ipsum dolor sit amet.',
    '<b>Etiam nunc?</b> Nulla ac nibh.',
    '<i>Ut a sem.</i> <u>Sed vitae eros.</u>'
  ],
  bud: ['Lorem ipsum dolor sit amet. <b>Donec vitae nunc.</b> Etiam a porta erat. <i>Quisque sed arcu</i> in sem viverra rutrum. <u>In hac habitasse.</u>']
};
const sectionNames = { thread: 'THREADS', comms: 'COMMS', bud: 'BUDS' };
const designs = JSON.parse(read('designs.json'));
const esc = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
function postingCode(design, example = false) {
  const isComms = design.type === 'comms';
  const lines = [
    '[dohtml]',
    '<div class="ly2 ly2-' + design.slug + '" data-kind="' + design.type + '" data-design="' + design.number + '"' + (isComms ? ' data-direction="alternating"' : '') + '>',
    '<div class="ly-card">',
    '<header class="ly-head">',
    '<a class="ly-name" href="' + (example ? '#' : '[url]') + '">' + (example ? 'Jinho &amp; Suho' : '[name]') + '</a>',
    '<h2 class="ly-title">' + (example ? esc(design.title) : '[text]') + '</h2>',
    '</header>'
  ];
  if (design.images) {
    lines.push('<div class="ly-media">');
    for (let i = 0; i < design.images; i++) {
      const image = design.images === 2 ? i : Number(design.number) % 2 === 0 ? 1 : 0;
      lines.push('<figure class="ly-shot"><img src="' + gifs[image] + '" alt="Character portrait"></figure>');
    }
    lines.push('</div>');
  }
  if (isComms) {
    lines.push('<div class="ly-meta"><span class="ly-time">21:08</span><span class="ly-receipt">Delivered</span></div>');
  }
  lines.push('<div class="ly-copy">', ...bodies[design.type].map(p => '<p>' + p + '</p>'), '</div>');
  lines.push('<div class="ly-foot"><span class="ly-imprint">' + esc(design.name) + '</span><span class="ly-art" aria-hidden="true"></span></div>');
  if (isComms) {
    lines.push('<div class="ly-chrome" aria-hidden="true"></div>', '<div class="ly-compose" aria-hidden="true"><span>Message</span><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 13V3M3 8l5-5 5 5"/></svg></div>');
  }
  lines.push('</div>', '</div>', '<link rel="stylesheet" href="' + cssUrl + '">', '[/dohtml]');
  return lines.join('\n');
}
const codes = designs.map(d => postingCode(d));
for (const [index, design] of designs.entries()) write(design.file, codes[index] + '\n');
const css = ['base.css', 'threads.css', 'comms.css', 'buds.css'].map(read).concat(illustrationCss()).join('\n');
write('lychee-orchard-glass-v2.css', css);
write(cssFile, css);
const legacy = read('layout.css') + '\n' + read('legacy-fixes.css');
write('lychee-orchard-glass-v1.css', legacy);
write('lychee-orchard-glass-standalone-v1.css', legacy);
const editor = buildEditor({ designs, css, codes });
write('lychee-collection-preview.html', editor);
fs.mkdirSync(forum, { recursive: true });
writeForum('lychee-preview.html', editor);
const heading = '[align=center][H1]LYCHEE[/H1][/align]';
const blocks = designs.map((design, index) => {
  const category = design.number === '01' ? '[size=6][b]' + sectionNames[design.type] + '[/b][/size]\n\n' : '';
  return category + '[size=4][b]' + String(index + 1).padStart(2, '0') + ' - ' + design.name + '[/b][/size]\n\n' + postingCode(design, true) + '\n\n[code]\n' + codes[index] + '\n[/code]';
});
writeForum('lychee-forum-masterpost.txt', [heading, ...blocks].join('\n\n') + '\n');
const parts = [];
let part = heading;
for (const block of blocks) {
  if (part.length + block.length + 3 > 44000) {
    parts.push(part);
    part = heading;
  }
  part += '\n\n' + block;
}
parts.push(part);
parts.forEach((body, i) => writeForum('lychee-post-' + String(i + 1).padStart(2, '0') + '.txt', body + '\n'));
console.log('Built ' + designs.length + ' Lychee designs and ' + parts.length + ' forum part(s).');
