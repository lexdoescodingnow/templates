from pathlib import Path
import json,zipfile
P=Path(__file__).parent
designs=json.loads((P/'designs.json').read_text())
parts=[]
for i,d in enumerate(designs,1):
 code=(P/d['file']).read_text(encoding='utf-8')
 assert '[name]' in code and '[text]' in code and '[url]' in code
 assert 'pe3-member' in code and '<!--' not in code
 example=code.replace('[name]','Haneul &amp; Taejoo').replace('[text]',d['sampleTitle'])
 parts.append(f'[size=4][b]{i:02} · {d["name"]}[/b][/size]\n\n{example}\n[code]\n{code}\n[/code]\n')
heading='[align=center][H1]PEAR[/H1][/align]\n\n'
post=heading+'\n'.join(parts)
(P/'pear-forum-masterpost.txt').write_text(post,encoding='utf-8')
(P.parent/'forum-posts'/'pear-forum-masterpost.txt').write_text(post,encoding='utf-8')
for n in range(3):
 (P.parent/'forum-posts'/f'pear-post-{n+1:02}.txt').write_text(heading+'\n'.join(parts[n*5:n*5+5]),encoding='utf-8')
(P/'README.md').write_text('# Pear · Soft Season\n\nHaneul & Taejoo. Five threads, five device comms, five miniature threads.\n\n[Editable preview](pear-collection-preview.html) · [Forum masterpost](pear-forum-masterpost.txt) · [Complete ZIP](pear-collection.zip)\n\n'+ '\n'.join(f'- {d["type"]}: [{d["name"]}]({d["file"]})' for d in designs)+'\n\nThe current set uses the isolated pear3 wrapper and pear-orchard-standalone-v3.css. Replace old posting HTML to adopt these layouts. Older CSS remains available for existing posts.\n\nAll posting colours come directly from inherited --mgrgb1, --mgrgb2 and --mgrgb3, with a neutral grey fallback only. No coloured overrides or colour mixing are included. Headers, image frames, borders and emphasis use these colours. The footer inherits --icon as the forum member image. Neutral backgrounds respond to Blue Hour light/dark mode.\n\nThe preview palette selector simulates forum member groups; these demo values are never exported. Editable name, URL and title placeholders are first, followed by GIFs and writing. The preview includes labelled fields, GIF crops, message direction, live HTML and named-copy controls. It converts [b], [i] and [u] to HTML for dohtml posting. Direct snippets use b, i and u tags. Bold and underline use the forward member gradient; italic uses its reverse.\n\nEach design has a unique named selector and stable filename. Supplied GIFs and lorem ipsum remain in all copyable examples. Zero-image layouts accept GIFs through the editor. Remove GIF URLs to reclaim media space. Bud writing is under 100 words. No comments or hidden tips occur in posting code.\n\nBuild with node pear/build.cjs and python pear/package.py.\n',encoding='utf-8')
with zipfile.ZipFile(P/'pear-collection.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in [P/'README.md',P/'pear-collection-preview.html',P/'pear-orchard-standalone-v3.css',P/'pear-forum-masterpost.txt']+[P/d['file'] for d in designs]:z.write(f,f.name)
print('Packaged 15 named designs and three forum post parts.')

