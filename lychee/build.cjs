const fs = require('node:fs');
const path = require('node:path');
const dir = __dirname;
const root = path.resolve(dir, '..');
const cssUrl = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/lychee/lychee-orchard-glass-standalone-v1.css';
const gifs = [
  'https://64.media.tumblr.com/cfcf729fefc77ad38efcb6d566632ea8/e77930a5f3b7b90c-6e/s400x600/688a74647cfe8278e9a5380b6ee2fdd0de107f52.gifv',
  'https://64.media.tumblr.com/ea535f2c97bd0394fc52d538ce4aa7ec/c38f3ca42835b5bc-45/s400x600/2447bf8417a283b7c67c2e041507a8e87d7e66ff.gifv'
];
const lorem = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Vestibulum ante ipsum primis.</b> Integer vitae augue at sapien luctus consequat. Nulla facilisi; sed porttitor justo vel sem laoreet.</p>\n<p>Aliquam erat volutpat. <i>Quisque sodales, tellus vitae suscipit posuere,</i> erat enim consequat mauris, sed pharetra lectus lacus non est. <u>Donec aenean semper.</u> Duis at massa id libero faucibus.</p>\n<p>Praesent commodo, nunc non tempor feugiat, neque nibh interdum arcu, vitae fermentum risus ante sed sapien. Curabitur posuere, tellus ut eleifend blandit, mi urna feugiat nibh, at tincidunt sem nulla id lorem.</p>';
const short = '<p>Lorem ipsum dolor sit amet. <b>Integer vitae augue.</b> <i>Aliquam erat volutpat</i>, sed porttitor justo vel sem.</p>\n<p><u>Donec aenean semper.</u> Nulla facilisi.</p>';
const specs = [
 ['thread','Lychee Lithograph','lychee-lithograph',1,'a study in translucence','field record / 01',1],
 ['thread','Roseglass Index','roseglass-index',2,'the orchard in fragments','collected moments / 02',2],
 ['thread','Orchard Receipt','orchard-receipt',2,'kept close, kept carefully','small things retained / 03',3],
 ['thread','Pale Lantern','pale-lantern',1,'where the light gathers','after the rain / 04',4],
 ['thread','Twin-Pit Almanac','twin-pit-almanac',0,'a season written softly','notes for later / 05',5],
 ['comms','Lychee Line','lychee-line',1,'Jinho & Suho','private line · active',1],
 ['comms','Glasshouse Ping','glasshouse-ping',1,'Jinho','secure conversation',2],
 ['comms','Peel Dial','peel-dial',0,'Suho','recent messages · 03',3],
 ['comms','Nectar Network','nectar-network',1,'Jinho & Suho','connected · end-to-end',4],
 ['comms','Two Seed Signal','two-seed-signal',2,'Suho / Jinho','message received',5],
 ['bud','Litchi Note','litchi-note',1,'a passing thought','in the margin',1],
 ['bud','Pitstop','pitstop',0,'just one more thing','quick reply',2],
 ['bud','Shell Slip','shell-slip',1,'a small reminder','kept nearby',3],
 ['bud','Bloom Byte','bloom-byte',2,'on the way back','little update',4],
 ['bud','Soft Kernel','soft-kernel',0,'before the day ends','a final line',5]
].map((s,i)=>({type:s[0],name:s[1],slug:s[2],images:s[3],title:s[4],sub:s[5],layout:s[6],num:String(i%5+1).padStart(2,'0'),file:`lychee-${s[2]}-${s[0]}-${String(i%5+1).padStart(2,'0')}.txt`}));
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function markup(d, sample=false){
 const who='Jinho &amp; Suho', title=d.title;
 const gs=d.images?`<div class="lc-media">${Array.from({length:d.images},(_,i)=>`<figure class="lc-portrait"><img src="${gifs[(i+(d.slug.includes('suho')?1:0))%2]}" alt="Character GIF ${i+1}"></figure>`).join('')}</div>`:'';
 const text=d.type==='bud'?short:lorem;
 const msgs=d.type==='comms';
 return `[dohtml]\n<div class="lc lc-${d.type} lc-${d.slug}" data-direction="alternating">\n<div class="lc-card">\n<header class="lc-head"><a href="[url]">[name]</a><span class="lc-serial">LYCHEE / ${d.num}</span><h2>[text]</h2><small>${d.sub}</small></header>\n${gs}\n<div class="lc-copy">\n${text}\n</div>\n${msgs?'<footer class="lc-phone"><span>12:08</span><span>Delivered · encrypted</span></footer>':''}\n<div class="lc-mark" aria-hidden="true"><svg viewBox="0 0 90 90"><path d="M45 12c15-8 28 4 27 18 12 10 9 24-2 31 0 13-12 21-25 15-14 8-27-1-26-15-11-8-13-22-2-31C16 17 30 6 45 12Z"/><path d="M45 22c-12 9-13 34 0 47 13-13 12-38 0-47Z"/><path d="M31 19c4 5 7 8 14 11m14-11c-4 5-7 8-14 11"/></svg></div>\n</div>\n</div>\n<link rel="stylesheet" href="${cssUrl}">\n[/dohtml]`;
}
const designs=specs.map(d=>({type:d.type,name:d.name,slug:d.slug,images:d.images,number:d.num,file:d.file}));
fs.writeFileSync(path.join(dir,'designs.json'),JSON.stringify(designs,null,2)+'\n');
for(const d of specs)fs.writeFileSync(path.join(dir,d.file),markup(d)+'\n');
fs.writeFileSync(path.join(dir,'lychee-orchard-glass-v1.css'),fs.readFileSync(path.join(dir,'layout.css'),'utf8'));
const items=specs.map(d=>`<section><header><small>${d.type.toUpperCase()} / ${d.num}</small><h2>${d.name}</h2></header><div class="stage">${markup(d).replace('[dohtml]','').replace('[/dohtml]','').replace(/<link[^>]*>/,'').replaceAll('[url]','#').replaceAll('[name]','Jinho &amp; Suho').replaceAll('[text]',esc(d.title))}</div><details><summary>Copy template</summary><textarea readonly>${esc(markup(d))}</textarea></details></section>`).join('\n');
const css=fs.readFileSync(path.join(dir,'layout.css'),'utf8');
fs.writeFileSync(path.join(dir,'lychee-collection-preview.html'),`<!doctype html><html lang="en" color-mode="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lychee / Jinho &amp; Suho</title><style>${css}body{margin:0;padding:30px 14px;background:#f2f1ed;color:#30322f;font:14px Arial,sans-serif}.page{max-width:940px;margin:auto}.hero{padding:30px;margin:auto auto 34px;border-bottom:2px solid #bbb}.hero h1{font:54px Georgia,serif;margin:12px 0;color:#a1586f}.hero p{max-width:600px;line-height:1.7}section{margin:36px auto;padding:0 12px;border-top:1px solid #ccc}section>header{text-align:center;margin:20px}section>header small{letter-spacing:.15em;color:#708b8c}section>header h2{font:25px Georgia,serif}.stage{padding:8px}details{max-width:700px;margin:16px auto}summary{cursor:pointer;color:#78546a}textarea{width:100%;height:220px;margin-top:10px;font:11px/1.5 monospace;background:#f8f7f3;border:1px solid #ccc;white-space:pre;overflow:auto}</style></head><body><main class="page"><header class="hero"><small>JINHO / SUHO · LYCHEE COLLECTION</small><h1>Orchard glass</h1><p>Fifteen templates: five thread layouts, five device-style conversations and five compact buds. Member colours shape the frames and interface; lychee blush and seed forms appear as small accents. Copy a posting block and paste it inside a JCink [dohtml] area.</p></header>${items}</main></body></html>`);
const typeHeading={thread:'THREADS',comms:'COMMS',bud:'BUDS'};
let previous='';const master=['[align=center][H1]LYCHEE[/H1][/align]'];
for(let i=0;i<specs.length;i++){const d=specs[i];if(d.type!==previous){master.push('[size=6][b]'+typeHeading[d.type]+'[/b][/size]');previous=d.type;}master.push(`[size=4][b]${String(i+1).padStart(2,'0')} · ${d.name}[/b][/size]`);master.push(markup(d));master.push('[code]\n'+markup(d)+'\n[/code]');}
fs.mkdirSync(path.join(root,'forum-posts'),{recursive:true});fs.writeFileSync(path.join(root,'forum-posts','lychee-forum-masterpost.txt'),master.join('\n\n')+'\n');
console.log('Wrote 15 Lychee posting templates.');
