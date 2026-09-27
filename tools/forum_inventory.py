"""Inventory every supported posting snippet, including older layouts."""
from pathlib import Path
from html.parser import HTMLParser
import re,json,collections,subprocess
from functools import lru_cache
ROOT=Path(__file__).resolve().parents[1]
class RootParser(HTMLParser):
 def __init__(self):super().__init__();self.root=None
 def handle_starttag(self,tag,attrs):
  if self.root is None and tag not in ('link','style','script'):
   self.root=(tag,dict(attrs))
def css_path(url,base=ROOT):
 url=url.split('?')[0].split('#')[0]
 m=re.search(r'(?:cdn\.jsdelivr\.net/gh|raw\.githack\.com)/lexdoescodingnow/templates(?:@[^/]+|/[^/]+)/(.*)',url)
 if not m:m=re.search(r'raw\.githubusercontent\.com/lexdoescodingnow/templates/[^/]+/(.*)',url)
 if m:return ROOT/m[1]
 if not re.match(r'\w+:',url):return (base/url).resolve()
 return None
@lru_cache(maxsize=None)
def expand_css(p,ref='WORKTREE',chain=()):
 key=(str(p),ref)
 if key in chain:return ''
 chain=chain+(key,)
 if ref=='WORKTREE':
  if not p.exists():raise ValueError('Missing stylesheet '+str(p))
  s=p.read_text()
 else:s=subprocess.check_output(['git','show',ref+':'+str(p.relative_to(ROOT))],cwd=ROOT,text=True)
 def imp(m):
  url=m[1] or m[2];q=css_path(url,p.parent)
  pinned=re.search(r'templates@([a-f0-9]{40})/',url)
  depref=pinned[1] if pinned else ('WORKTREE' if url.startswith('http') else ref)
  return expand_css(q,depref,chain) if q else ''
 return re.sub(r'@import\s+(?:url\([\"\']?([^\"\')]+)[\"\']?\)|[\"\']([^\"\']+)[\"\'])\s*;',imp,s)
def inventory():
 paths=[p for p in ROOT.rglob('*.txt') if not any(x in p.parts for x in ('forum-posts','.git')) and 'forum-' not in p.name and 'masterpost' not in p.name]
 paths += list((ROOT/'traitors').glob('*snippet.html'))
 paths.sort(key=lambda p:('snippet' in p.name,str(p)))
 items={}; all_sources=[]
 for p in paths:
  s=p.read_text(); matches=list(re.finditer(r'\[dohtml\](.*?)\[/dohtml\]',s,re.I|re.S))
  for n,m in enumerate(matches):
   b=m[1].strip(); clean=re.sub(r'<!--.*?-->','',b,flags=re.S)
   clean=re.sub(r'<(?:style|script)\b.*?</(?:style|script)>','',clean,flags=re.S|re.I)
   parser=RootParser();parser.feed(clean)
   if not parser.root:continue
   tag,attrs=parser.root; classes=attrs.get('class','')
   urls=re.findall(r'<link\b[^>]*href=[\"\']([^\"\']+)',b)
   urls+=re.findall(r'@import\s+url\([\"\']?([^\"\')]+)',b)
   css=[css_path(u) for u in urls];css=[x for x in css if x]
   key=(classes,tuple(re.findall(r'class=["\']([^"\']+)["\']',b)),tuple(str(x.relative_to(ROOT)) for x in css),tuple((k,v) for k,v in attrs.items() if k.startswith('data-')))
   rel=str(p.relative_to(ROOT));folder=p.relative_to(ROOT).parts[0] if p.parent!=ROOT else 'lavender'
   before=s[:m.start()].strip().splitlines(); label=before[-1].strip() if before else ''
   label=label if len(label)<100 and not label.endswith(']') else ''
   code='[dohtml]\n'+b+'\n[/dohtml]\n'
   source={'file':rel,'block':n+1}
   if key in items:items[key]['aliases'].append(source);continue
   name=p.stem.replace(folder+'-','').replace('-',' ').title() if len(matches)==1 else label.title()
   typ='comms' if re.search('comms|spc3|bh-bread-comms|ft-social',rel+' '+classes) else 'bud' if 'bud' in rel+' '+classes else 'thread'
   if folder=='petal':typ='social'
   if folder=='traitors':typ='event'
   row={'folder':folder,'name':name,'type':typ,'source':rel,'block':n+1,'aliases':[],'classes':classes,'css':[str(x.relative_to(ROOT)) for x in css],'code':code}
   items[key]=row
 for row in items.values():
  folder=ROOT/Path(row['source']).parent
  for meta in [folder/'designs.json',folder/'bread-second-rise-manifest.json']:
   if meta.exists():
    for d in json.loads(meta.read_text()):
     if d.get('slug','NO_SLUG') in row['source']:
      row.update(name=d['name'],description=d.get('description',''),type=d.get('type',row['type']))
  # Existing documentation carries the names of collections without a JSON manifest.
  for md in sorted(folder.glob('*.md'),key=lambda p:(p.name=='README.md',p.name)):
   for line in md.read_text().splitlines():
    if Path(row['source']).name in line and line.startswith('|'):
     z=re.search(r'\[([^\]]+)\]\('+re.escape(Path(row['source']).name)+r'\)',line)
     if z:row['name']=re.sub(r'^\d+\s*·\s*','',z[1]);row['description']=line.split('|')[-2].strip()
 return list(items.values())
if __name__=='__main__':
 rows=inventory();Path('/tmp/template-inventory.json').write_text(json.dumps(rows,indent=2));print(json.dumps({'templates':len(rows),'collections':dict(sorted(collections.Counter(r['folder'] for r in rows).items()))},indent=2))
