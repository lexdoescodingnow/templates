const shell = '<path fill="#d7a09d" stroke="#875865" d="M31 8C42 4 52 10 55 21C59 34 54 48 42 54C33 59 18 56 11 45C3 34 7 19 15 13C21 9 25 9 31 8Z"/>';
const scales = [];
for (let row = 0; row < 7; row++) {
  for (let column = 0; column < 7; column++) {
    const x = 10 + column * 7 + (row % 2 ? 3 : 0);
    const y = 14 + row * 5.9;
    if (((x - 31) / 23) ** 2 + ((y - 32) / 21) ** 2 < 1) {
      scales.push('M' + x + ' ' + y.toFixed(1) + 'l2 -1.6 2.7 1.2');
    }
  }
}
const rind = shell + '<path fill="none" stroke="#9b656c" stroke-width=".95" d="' + scales.join(' ') + '"/>';
const half = '<path fill="#c58b90" stroke="#875865" d="M8 28C12 12 25 6 39 8C54 10 59 23 53 38C48 53 31 58 18 51C8 46 4 38 8 28Z"/><path fill="#f5ebdf" stroke="#d5b3a6" d="M11 28C15 16 26 9 39 11C52 13 56 23 50 37C45 49 32 54 20 48C10 44 8 37 11 28Z"/><path fill="#67423b" stroke="#4c3431" d="M23 35C23 26 30 18 37 19C45 20 44 29 39 36C33 45 24 45 23 35Z"/><path fill="none" stroke="#bd9280" stroke-width="1.4" d="M27 32Q29 24 35 23"/>';
const leaf = '<path fill="#99a599" stroke="#5e7665" d="M0 0Q10 -14 29 -11Q22 1 0 0Z"/><path fill="none" stroke="#617d69" stroke-width=".9" d="M1 0L26 -10"/>';
const group = (transform, drawing) => '<g transform="' + transform + '">' + drawing + '</g>';
const twig = d => '<path fill="none" stroke="#84655d" stroke-width="2.2" stroke-linecap="round" d="' + d + '"/>';
const art = [
  twig('M59 8Q49 17 42 34M51 17Q64 17 72 26') + group('translate(51 16) rotate(-8)',leaf) + group('translate(12 23) scale(.82)',rind) + group('translate(49 20) scale(.67)',rind),
  group('translate(15 24) rotate(-18 30 26) scale(.87)',half) + group('translate(54 12) rotate(18 24 23) scale(.78)',half),
  twig('M29 57Q48 38 60 15') + group('translate(45 39) rotate(-157) scale(.85)',leaf) + group('translate(53 28) rotate(12) scale(1.13)',leaf) + group('translate(49 28) scale(.8)',rind),
  group('translate(14 16) scale(.89)',rind) + group('translate(48 30) rotate(13 28 25) scale(.76)',half) + twig('M40 24Q43 15 52 12') + group('translate(45 17) rotate(12) scale(.7)',leaf),
  twig('M17 62Q50 43 85 12M45 45Q47 32 42 21M63 32Q73 37 78 46') + group('translate(46 43) rotate(-148) scale(.87)',leaf) + group('translate(62 31) rotate(-7) scale(1.05)',leaf) + group('translate(48 39) scale(.47)',half) + group('translate(21 8) scale(.54)',rind) + group('translate(64 34) scale(.57)',rind)
];
function illustrationCss() {
  return art.map((drawing, index) => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105 78">' + drawing + '</svg>';
    const url = 'data:image/svg+xml,' + encodeURIComponent(svg).replaceAll("'", '%27');
    return '.ly2[data-design="0' + (index + 1) + '"] .ly-art { background: url("' + url + '") center / contain no-repeat; }';
  }).join('\n') + '\n.ly2 .ly-art { aspect-ratio: 105 / 78; }\n';
}
module.exports = { illustrationCss };
