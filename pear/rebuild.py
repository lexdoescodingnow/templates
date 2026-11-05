from pathlib import Path
import json,re
P=Path(__file__).parent
old=json.loads((P/'designs.json').read_text())
s=(P.parent/'cucumber/build.cjs').read_text(encoding='utf-8')
gifs=['https://64.media.tumblr.com/b4c09678f3c58d9c1d8cd5a678434f3b/8e9b4780f7fc5ebe-27/s250x400/f29f3f1643c8f827c4586a9776504bcb0a039ab3.gifv','https://64.media.tumblr.com/6714ee4dc78c2bff9f2abdaa6d4f0e98/8e9b4780f7fc5ebe-9b/s250x400/2a3a511ff69c46ec6428f0f1fdd13d0e73e81aaa.gifv']
s=re.sub(r'const gifs=.*?;',lambda m:'const gifs='+json.dumps(gifs)+';',s,count=1)
ds=[]
for i,d in enumerate(old):
 d.update(images=([2,1,2,0,1,1,1,1,2,0,1,0,1,2,1][i]),sampleTitle=['a little room to ripen','held in your hands','where the branches meet','a season worth keeping','softness, slowly'][i%5],subtitle='Haneul / Taejoo',motif=i%5+1,number=f'{i%5+1:02}')
 ds.append(d)
a=s.index('const designs=');b=s.index('function esc',a)
s=s[:a]+'const designs='+json.dumps(ds)+';\n'+s[b:]
a=s.index('function art(');b=s.index('function template',a)
s=s[:a]+'''function art(n){return '<svg viewBox="0 0 120 140" aria-hidden="true"><path d="M57 24C40 25 45 47 33 63C8 96 24 127 59 128C98 129 112 98 87 66C74 49 78 25 61 24Z" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-width="1.5"/><path d="M59 25Q54 11 66 4M61 19Q85 0 95 16Q77 30 61 19M57 43Q44 65 42 87" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M58 92Q46 73 50 72Q62 72 58 92M65 94Q67 74 73 77Q80 85 65 94" fill="currentColor"/><circle cx="37" cy="103" r="1" fill="currentColor"/><circle cx="80" cy="107" r="1" fill="currentColor"/></svg>';}
'''+s[b:]
a=s.index('const chrome=');b=s.index('return `[dohtml]',a)
s=s[:a]+'''const chrome=d.type==='comms'?[d.name.toUpperCase(),'● CONNECTED','Message','↑']:null;
'''+s[b:]
s=s.replace('<div class="cu-edition">cucumber / ${d.type===\'bud\'?\'small moments\':d.type===\'comms\'?\'connected\':\'cool current\'} ${d.number}</div>', '<div class="cu-edition"><span class="cu-member" aria-hidden="true"></span><span>${d.name} / ${d.type}</span></div>')
s=s.replace('cucumber-cool-current-v1.css','pear-orchard-standalone-v3.css').replace('cucumber','pear').replace('Cucumber','Pear').replace('CUCUMBER','PEAR').replace('Tao &amp; Zhiyuan','Haneul &amp; Taejoo').replace('Tao & Zhiyuan','Haneul & Taejoo').replace('TAO / ZHIYUAN','HANEUL / TAEJOO').replace('Cool<br><em>current.</em>','Soft<br><em>season.</em>').replace('COOL CURRENT','SOFT SEASON')
s=s.replace('cu1','pear3').replace('cu-','pe3-').replace('--cu','--pe3')
(P/'build.cjs').write_text(s,encoding='utf-8')
for f in ['preview.js','preview.css']:
 t=(P.parent/'cucumber'/f).read_text(encoding='utf-8').replace('cu1','pear3').replace('cu-','pe3-').replace('--cu','--pe3')
 (P/f).write_text(t,encoding='utf-8')
