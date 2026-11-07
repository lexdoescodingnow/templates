const fs=require('fs'),p=require('path'),d=__dirname;
const css=`.lf-blackout1{--ba:rgb(var(--mgrgb1,170,137,83));--bb:rgb(var(--mgrgb2,var(--mgrgb1,101,151,145)));--bc:rgb(var(--mgrgb3,var(--mgrgb2,var(--mgrgb1,170,122,155))));--bg:linear-gradient(110deg,var(--ba),var(--bb),var(--bc));--start:#faf8f1;--startink:#343234;--startmuted:#6d6665;position:relative;isolation:isolate;width:calc(100% - 28px);max-width:620px;margin:34px auto;min-width:0;background:linear-gradient(180deg,var(--start) 0%,var(--start) 10%,#d5d1c9 25%,#77747a 43%,#34323d 57%,#171820 74%,#090b12 100%);color:var(--startink);font:14px/1.9 'Trebuchet MS',Arial,sans-serif;text-align:left;overflow-wrap:anywhere;border:1px solid color-mix(in srgb,var(--ba) 40%,transparent);container-type:inline-size}
html[color-mode="dark"] .lf-blackout1{--start:#55505a;--startink:#fff6ed;--startmuted:#e0d4d4}
@media(prefers-color-scheme:dark){html:not([color-mode="light"]):not([color-mode="dark"]) .lf-blackout1{--start:#55505a;--startink:#fff6ed;--startmuted:#e0d4d4}}
.lf-blackout1,.lf-blackout1 *,.lf-blackout1::before,.lf-blackout1::after,.lf-blackout1 *::before,.lf-blackout1 *::after{box-sizing:border-box}
.lf-blackout1 .bo-stage{position:relative;min-width:0;padding:52px 44px;z-index:1}.lf-blackout1 .bo-stage>*{position:relative;z-index:2;min-width:0}
.lf-blackout1 .bo-meta{display:flex;justify-content:space-between;gap:16px;font:10px/1.5 Consolas,monospace;text-transform:uppercase;letter-spacing:.16em;color:var(--startmuted)}
.lf-blackout1 .bo-meta span:last-child{text-align:right}.lf-blackout1 .bo-live{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--bb);margin:0 7px 1px 0}
.lf-blackout1 h2,.lf-blackout1 h3{color:inherit;text-align:left;text-transform:none;letter-spacing:-.04em;font:400 45px/1.08 Georgia,serif;margin:31px 0 25px;padding:0;border:0}.lf-blackout1 h3{font-size:36px}
.lf-blackout1 .bo-copy{font:inherit;margin:0;padding:0}.lf-blackout1 .bo-copy p{color:inherit;font:inherit;margin:0 0 1.25em;padding:0;text-align:left}.lf-blackout1 .bo-copy p:last-child{margin:0}
.lf-blackout1 .bo-copy :is(b,strong,u){color:inherit;font-weight:700}.lf-blackout1 .bo-copy :is(i,em){color:inherit;font-style:italic}.lf-blackout1 u{text-decoration-color:var(--bb);text-underline-offset:4px}.lf-blackout1 a{color:inherit;text-decoration:underline}.lf-blackout1 a:focus-visible{outline:2px solid var(--bb);outline-offset:3px}
@supports(background-clip:text){.lf-blackout1 .bo-copy :is(b,strong,u){background:linear-gradient(110deg,color-mix(in srgb,var(--ba) 48%,currentColor),color-mix(in srgb,var(--bb) 48%,currentColor),color-mix(in srgb,var(--bc) 48%,currentColor));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;box-decoration-break:clone}.lf-blackout1 .bo-copy :is(i,em){background:linear-gradient(110deg,color-mix(in srgb,var(--bc) 48%,currentColor),color-mix(in srgb,var(--bb) 48%,currentColor),color-mix(in srgb,var(--ba) 48%,currentColor));background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;box-decoration-break:clone}}
.lf-blackout1 .bo-opening{padding-top:39px;padding-bottom:65px;min-height:360px;border-top:5px solid var(--ba)}
.lf-blackout1 .bo-crest{width:47px;height:25px;border-radius:0 100% 0 100%;background:var(--bg);margin:45px auto 8px;transform:rotate(-20deg)}
.lf-blackout1 .bo-lapse{min-height:235px;text-align:center;padding-top:55px;padding-bottom:64px}.lf-blackout1 .bo-lapse::before{content:'';display:block;position:absolute;top:0;bottom:0;left:50%;width:1px;background:linear-gradient(var(--ba),transparent)}
.lf-blackout1 .bo-lapse span{display:block;color:var(--startink);font:10px/2 Consolas,monospace;letter-spacing:.22em;text-transform:uppercase;margin:0 auto;padding:15px 8px;max-width:230px;background:color-mix(in srgb,var(--start) 85%,transparent)}
.lf-blackout1 .bo-smoke{min-height:335px;color:#fff8f3;padding-top:42px;padding-bottom:54px;background:linear-gradient(145deg,#171820 0%,#2e2b32 55%,#25232a 100%);border-left:5px solid var(--bb);margin:0 13px 0 3px;box-shadow:7px 8px 0 color-mix(in srgb,var(--bc) 38%,transparent)}
.lf-blackout1 .bo-smoke .bo-meta{color:#dfd5d8}.lf-blackout1 .bo-smoke::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 85% 0%,color-mix(in srgb,var(--ba) 24%,transparent),transparent 70%),repeating-linear-gradient(0deg,transparent 0 6px,#ffffff04 6px 7px);z-index:0}
.lf-blackout1 .bo-break{position:relative;height:165px;padding:54px 24px 30px;overflow:hidden;color:#e3e0ec;font:10px/1.6 Consolas,monospace;letter-spacing:.17em;text-transform:uppercase}
.lf-blackout1 .bo-break span{display:block;position:relative;z-index:2;text-align:center;margin:0 0 8px}.lf-blackout1 .bo-break span:last-child{letter-spacing:.31em;color:#b9bfcb}
.lf-blackout1 .bo-break::before{content:'';position:absolute;top:37px;left:0;width:100%;height:24px;background:linear-gradient(90deg,var(--bb) 0 16%,transparent 16% 23%,var(--bc) 23% 60%,transparent 60% 72%,var(--ba) 72% 95%,transparent 95%);opacity:.7;clip-path:polygon(0 0,100% 0,100% 24%,76% 24%,76% 52%,100% 52%,100% 70%,22% 70%,22% 100%,0 100%);animation:bo1-drift 9s steps(1,end) infinite}
.lf-blackout1 .bo-break::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent 0 10px,#ffffff09 10px 11px);pointer-events:none}
.lf-blackout1 .bo-aftermath{color:#f1eef5;min-height:375px;background:#10121a;margin:0 17px 0 11px;border-left:3px solid var(--bc);border-right:1px dashed var(--bb);padding-top:38px;padding-bottom:49px;box-shadow:-7px 9px 0 #252633,6px -5px 0 color-mix(in srgb,var(--bb) 30%,transparent)}
.lf-blackout1 .bo-aftermath .bo-meta{color:#c7bdd9;transform:translateX(-5px);border-top:3px double var(--bc);padding-top:11px;text-shadow:2px 0 color-mix(in srgb,var(--bb) 70%,transparent)}
.lf-blackout1 .bo-aftermath h3{text-shadow:3px 0 color-mix(in srgb,var(--bb) 65%,transparent),-2px 1px color-mix(in srgb,var(--bc) 75%,transparent);margin-top:36px}
.lf-blackout1 .bo-aftermath::before{content:'';position:absolute;top:0;left:-4px;width:75%;height:6px;background:var(--bg)}
.lf-blackout1 .bo-tail{position:relative;min-height:185px;color:#b7bfce;font:10px/1.7 Consolas,monospace;padding:40px 32px 28px;text-transform:uppercase;letter-spacing:.18em;overflow:hidden}
.lf-blackout1 .bo-tail span{position:relative;z-index:2;display:block;margin-bottom:9px}.lf-blackout1 .bo-tail span:nth-child(2){padding-left:22%;color:#b6a8c3}.lf-blackout1 .bo-tail span:nth-child(3){padding-left:8%;color:#cbd3df}
.lf-blackout1 .bo-tail::before{content:'';position:absolute;inset:8px 0 0;background:repeating-linear-gradient(0deg,transparent 0 4px,#ffffff0a 4px 5px);mask-image:linear-gradient(transparent,#000);pointer-events:none}
.lf-blackout1 .bo-tail::after{content:'';position:absolute;left:0;right:0;bottom:18px;height:22px;background:linear-gradient(90deg,var(--bc) 0 13%,transparent 13% 19%,var(--bb) 19% 41%,transparent 41% 65%,var(--ba) 65% 75%,transparent 75% 82%,var(--bc) 82%);opacity:.45;clip-path:polygon(0 0,75% 0,75% 25%,100% 25%,100% 45%,34% 45%,34% 80%,10% 80%,10% 100%,0 100%);animation:bo1-noise 7s steps(1,end) infinite}
@keyframes bo1-drift{0%,89%,100%{transform:translateX(0)}90%{transform:translate(-18px,8px)}92%{transform:translate(11px,-5px)}}
@keyframes bo1-noise{0%,87%,100%{transform:translateX(0)}88%{transform:translate(24px,-10px)}91%{transform:translate(-14px,4px)}}
@media(prefers-reduced-motion:reduce){.lf-blackout1 .bo-break::before,.lf-blackout1 .bo-tail::after{animation:none}}
@container(max-width:380px){.lf-blackout1 .bo-stage{padding-left:25px;padding-right:25px}.lf-blackout1 h2{font-size:36px}.lf-blackout1 h3{font-size:30px}.lf-blackout1 .bo-meta{font-size:9px;letter-spacing:.075em;gap:10px}.lf-blackout1 .bo-aftermath{margin-left:8px;margin-right:11px}.lf-blackout1 .bo-tail{padding-left:24px;padding-right:24px;font-size:9px;letter-spacing:.08em}}
`;
const body=`<div class="lf-blackout1">
<div class="bo-stage bo-opening">
<div class="bo-meta"><span><span class="bo-live" aria-hidden="true"></span>Leafie Awards</span><span>Live broadcast</span></div>
<h2>A night to remember.</h2>
<div class="bo-copy"><p>[OPENING CEREMONY TEXT]</p></div>
<div class="bo-crest" aria-hidden="true"></div>
</div>
<div class="bo-stage bo-lapse"><span>Some time later</span></div>
<div class="bo-stage bo-smoke">
<div class="bo-meta"><span>Outside the venue</span><span>Transmission unstable</span></div>
<h3>Smoke next door.</h3>
<div class="bo-copy"><p>[FIRE / TIME-JUMP TEXT]</p></div>
</div>
<div class="bo-break" aria-hidden="true"><span>Signal degradation detected</span><span>live / li_ / lost</span></div>
<div class="bo-stage bo-aftermath">
<div class="bo-meta"><span>Leafie // interrupted</span><span>Unknown source</span></div>
<h3>This was not in the programme.</h3>
<div class="bo-copy"><p>[AFTER THE FIRE / HACK BEGINNING TEXT]</p></div>
</div>
<div class="bo-tail" aria-hidden="true"><span>Broadcast integrity: failed</span><span>Control source: unknown</span><span>Connection remains open _</span></div>
</div>`;
const href='https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/leafie-awards/leafie-blackout-standalone-v1.css';
const code='[dohtml]\n'+body+'\n<link rel="stylesheet" href="'+href+'">\n[/dohtml]';
const inline='[dohtml]\n'+body+'\n<style>'+css+'</style>\n[/dohtml]';
fs.writeFileSync(p.join(d,'leafie-blackout-standalone-v1.css'),css);
fs.writeFileSync(p.join(d,'leafie-blackout-time-jump.txt'),code);
const example=body.replace('[OPENING CEREMONY TEXT]','The Leafies have begun. For now, the room belongs to the ceremony.').replace('[FIRE / TIME-JUMP TEXT]','There has been a fire in the building next door. The evening has changed.').replace('[AFTER THE FIRE / HACK BEGINNING TEXT]','The ceremony is interrupted. A hack is beginning to make itself known.');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const page=`<!doctype html><html lang="en" color-mode="light"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dead Air Descent | Leafie Awards time jump</title><style>body{margin:0;background:#eae9e4;color:#292b30;font:14px/1.7 'Trebuchet MS',Arial,sans-serif}header,footer{max-width:680px;margin:auto;padding:32px 24px}h1{font:40px/1.1 Georgia,serif;margin:12px 0}button,select{font:inherit;padding:9px 12px;margin:5px 8px 5px 0;background:transparent;color:inherit;border:1px solid #888;border-radius:3px;cursor:pointer}textarea{box-sizing:border-box;width:100%;height:270px;font:12px/1.65 Consolas,monospace}main{display:flow-root;--mgrgb1:170,137,83;--mgrgb2:101,151,145;--mgrgb3:170,122,155}html[color-mode="dark"] body{background:#17191e;color:#f4f0f3}a{color:inherit}summary{cursor:pointer}*{box-sizing:border-box}${css}</style><header><p>LEAFIE AWARDS / TIME-JUMP DIVIDER</p><h1>Dead Air Descent</h1><p>Scroll from the ceremony into the aftermath. The background darkens, the panels drift apart, and the broadcast breaks down. Change the headings, time-jump label and three writing areas directly in the code.</p><p>The deterioration follows the length of the template, so it works in ordinary JCink posts without a script. Dark mode begins in a softer charcoal and descends into black.</p><label>Appearance <select id="mode"><option value="light">Light</option><option value="dark">Dark</option></select></label><button id="copy">Copy posting code</button><button id="inline">Copy self-contained code</button><button id="download">Download snippet</button><p id="status" role="status"></p><details id="edit"><summary>Editable posting code</summary><textarea id="code" readonly>${esc(code)}</textarea></details></header><main>${example}</main><footer><p>End of time jump.</p><a href="https://raw.githack.com/lexdoescodingnow/templates/d8ba80676eef7b52e1c3c8e5312d0b9517cc5abe/leafie-awards/leafie-awards-web-v2.html">Back to all reply templates</a></footer><script>const code=${JSON.stringify(code)},inline=${JSON.stringify(inline)};document.getElementById('mode').onchange=e=>document.documentElement.setAttribute('color-mode',e.target.value);async function copy(value){const t=document.getElementById('code');t.value=value;try{await navigator.clipboard.writeText(value);document.getElementById('status').textContent='Copied'}catch(e){document.getElementById('edit').open=true;t.select();document.getElementById('status').textContent='Code selected: press Ctrl+C'}}document.getElementById('copy').onclick=()=>copy(code);document.getElementById('inline').onclick=()=>copy(inline);document.getElementById('download').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([code],{type:'text/plain;charset=utf-8'}));a.download='leafie-blackout-time-jump.txt';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),10000)};</script></html>`;
fs.writeFileSync(p.join(d,'leafie-blackout-preview.html'),page);
console.log('Built Dead Air Descent.');
