"""Synchronize public names while keeping source filenames and CSS classes stable."""
from pathlib import Path
import json,re,html
from forum_inventory import ROOT,inventory

records=json.loads((ROOT/'template-names.json').read_text())
rows={(r['source'],r['block']):r for r in inventory()}
GENERIC={'Standard','Sent','Received','Portrait','Comms Snippet','Compact Thread Snippets'}

def renamed(text,old,new):
    token='\x00NAMED\x00'
    return re.sub(r'\b'+re.escape(old)+r'\b',lambda m:new,text.replace(new,token)).replace(token,new)

def visible(text,old,new):
    return re.sub(r'(?<=>)[^<>]+(?=<)',lambda m:renamed(m[0],old,new),text)

for r in records:
    folder=Path(r['source']).parts[0]
    if folder in ('banana','chocolate','sour') or r['previous_name'] in GENERIC:continue
    for path in (ROOT/folder).rglob('*'):
        if path.suffix not in ('.html','.txt','.md','.json','.js','.cjs'):continue
        old=path.read_text();new=renamed(old,r['previous_name'],r['name'])
        if new!=old:path.write_text(new)

byfile={}
for r in records:
    row=rows[(r['source'],r['block'])]
    for ref in [{'file':r['source'],'block':r['block']}]+row.get('aliases',[]):
        byfile.setdefault(ref['file'],{})[ref['block']]=r
for filename,mapping in byfile.items():
    path=ROOT/filename;source=path.read_text();pieces=[];end=0
    for index,m in enumerate(re.finditer(r'\[dohtml\].*?\[/dohtml\]',source,re.I|re.S),1):
        lead=source[end:m.start()];code=m[0];r=mapping.get(index)
        if r:
            old,new=r['previous_name'],r['name']
            lead=re.sub(r'(?im)^([^\n]*\b'+re.escape(old)+r'\b[^\n]*)$',lambda x:re.sub(re.escape(old),new,x[0],flags=re.I),lead)
            if old not in GENERIC:
                code=visible(code,old,new)
        pieces.extend([lead,code]);end=m.end()
    pieces.append(source[end:]);result=''.join(pieces)
    if result!=source:path.write_text(result)
    for md in path.parent.glob('*.md'):
        content=md.read_text()
        if len(mapping)==1:
            r=next(iter(mapping.values()))
            content=re.sub(r'\[([^\]]+)\]\(('+re.escape(path.name)+r')\)',lambda m:'['+r['name']+']('+m[2]+')',content)
        md.write_text(content)

path=ROOT/'sour/sour-collection-preview.html';source=path.read_text()
pattern=r'(<script id="sp-collection"[^>]*>)(.*?)(</script>)';match=re.search(pattern,source,re.S);entries=json.loads(match[2])
for r in [r for r in records if r['source'].startswith('sour/')]:
    filename=Path(r['source']).name
    for entry in entries:
        if entry['filename']!=filename:continue
        entry['name']=r['name']
        for key in ('code','snippet'):
            entry[key]=visible(entry[key],r['previous_name'],r['name'])
        label={'thread':'Thread','comms':'Comms','bud':'Bud'}[entry['kind']]
        source=source.replace(r['previous_name']+' · '+label,r['name']+' · '+label)
source=re.sub(pattern,lambda m:m[1]+json.dumps(entries,ensure_ascii=False).replace('</',r'<\/')+m[3],source,flags=re.S)
path.write_text(source)

path=ROOT/'banana/banana-collection-preview.html';source=path.read_text()
banana=[r for r in records if r['source'].startswith('banana/banana-comms-')]
def banana_card(m):
    block=m[0]
    if 'class="banana-comms-keepsake' not in block:return block
    for r in banana:
        row=rows[(r['source'],r['block'])]
        if 'class="'+row['classes']+'"' in block:
            return renamed(block,r['previous_name'],r['name'])
    return block
source=re.sub(r'<article class="collection-card">.*?</article>',banana_card,source,flags=re.S)
source=source.replace('Keepsake is the original; Cameo, Ribbon, Canopy and Postcard give threads and phone messages four companion looks.','Each thread, phone and bud has its own name.')
path.write_text(source)

for folder in sorted({Path(r['source']).parts[0] for r in records}):
    path=ROOT/folder/'README.md'
    if not path.exists():continue
    content=path.read_text()
    content=re.sub(r'\n## Design names\n.*?(?=\n## |\Z)','',content,flags=re.S)
    content+='\n## Design names\n\nEach design has a unique catalogue name. Existing filenames remain stable for saved links.\n\n| Current name | Previous label | Format | Source |\n| --- | --- | --- | --- |\n'
    for r in records:
        if Path(r['source']).parts[0]!=folder:continue
        row=rows[(r['source'],r['block'])];filename=Path(r['source']).name
        content+=f"| {r['name']} | {r['previous_name']} | {row['type']} | [{filename}]({filename}) · block {r['block']} |\n"
    path.write_text(content)
print(f'Applied {len(records)} public-name updates to source labels, metadata and collection previews.')
