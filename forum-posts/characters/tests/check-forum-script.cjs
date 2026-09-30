const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const directory = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'character-directory-parts.json'), 'utf8'));
function forumFormatting(source) {
  return source.replace(/\\/g, '&#092;')
    .replace(/[^\x00-\x7f]/gu, value => '&#' + value.codePointAt(0) + ';')
    .replace(/\(r\)/gi, '&reg;').replace(/\(c\)/gi, '&copy;').replace(/\(tm\)/gi, '&trade;')
    .replace(/\S{50,}/g, word => word.replace(/(.{50})/g, '$1<br />'));
}
const broken = "function words(value){return value.normalize('NFKD').replace(/[&#092;u0300-&#092;u036f]/g,'');}";
assert.throws(() => new vm.Script(broken), /Invalid regular expression/);
assert.deepEqual(manifest.parts.map(part => [part.range, part.count]), [['A–B',23],['C–G',36],['H–K',36],['L–O',34],['P–T',36],['V–Z',16]]);
for (const part of manifest.parts) {
  const post = fs.readFileSync(path.join(directory, part.file), 'utf8');
  const scripts = Array.from(post.matchAll(/<script>([\s\S]*?)<\/script>/g), match => match[1]);
  assert.equal(scripts.length, 1);
  assert(!/<script[^>]*src=/i.test(post));
  assert(Buffer.byteLength(post) < 60000);
  for (const source of scripts) {
    assert(!/[^\x00-\x7f]|\\/.test(source));
    assert(Math.max(...source.split(/\s/).map(word => word.length)) <= 40);
    assert.equal(forumFormatting(source), source);
    new vm.Script(source);
  }
}
console.log('PASS: saved-page syntax failure reproduced; all six embedded scripts survive entity, symbol and long-token formatting; original ranges and post budgets preserved.');
