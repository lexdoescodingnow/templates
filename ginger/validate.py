from pathlib import Path
from lxml import html, etree
import json,re,subprocess,hashlib

root=Path(__file__).resolve().parent
designs=json.loads((root/'designs.json').read_text())
assert len(designs)==15
assert len({d['name'] for d in designs})==15
assert len({d['slug'] for d in designs})==15
assert {t:sum(d['type']==t for d in designs) for t in ['thread','comms','bud']}=={'thread':5,'comms':5,'bud':5}
css=(root/'ginger-apothecary-v1.css').read_text()
assert '/*' not in css and '<!--' not in css
assert 'html[color-mode="dark"] .bh-ginger' in css
assert 'html:not([color-mode="light"]):not([color-mode="dark"]) .bh-ginger' in css
assert 'var(--mgrgb1' in css and 'var(--mgrgb2' in css and 'var(--mgrgb3' in css
assert re.search(r'--ggr-forward:linear-gradient\(110deg,var\(--ggr-e1\),var\(--ggr-e2\) 52%,var\(--ggr-e3\)\)',css)
assert re.search(r'--ggr-reverse:linear-gradient\(110deg,var\(--ggr-e3\),var\(--ggr-e2\) 52%,var\(--ggr-e1\)\)',css)
assert '.ggr-copy :is(b,strong,u)' in css and '.ggr-copy :is(i,em)' in css
assert '.ggr-media:not(:has(img[src]:not([src=""])))' in css
stack=[];quote=None;escape=False
for c in css:
 if escape: escape=False;continue
 if c=='\\':escape=True;continue
 if quote:
  if c==quote:quote=None
  continue
 if c in '\"\'':quote=c;continue
 if c in '{([':stack.append(c)
 if c in '})]':assert stack and stack.pop()=={'}':'{',')':'(',']':'['}[c]
assert not stack and quote is None
urls=set();counts={};bud_words=[]
for d in designs:
 p=root/f"ginger-{d['slug']}-{d['type']}-{d['number']}.txt"
 s=p.read_text()
 assert s.startswith('[dohtml]\n') and s.endswith('[/dohtml]\n'),p
 assert '<!--' not in s and '<script' not in s and '<style' not in s,p
 assert not re.search(r'(?:===|/\*|<!--|\b(?:tips?|instructions?)\b)',s,re.I),p
 fragment=html.fragments_fromstring(s.replace('[dohtml]','').replace('[/dohtml]',''))
 assert len(fragment)==2,p
 wrapper,link=fragment
 assert wrapper.tag=='div' and 'bh-ginger' in wrapper.get('class'),p
 assert link.tag=='link' and link.get('rel')=='stylesheet',p
 urls.add(link.get('href'))
 assert wrapper[0].tag=='a' and wrapper[0].text=='[name]' and wrapper[0].get('href')=='[url]',p
 assert wrapper[1].text=='[text]',p
 assert not wrapper.xpath('.//comment() | .//script | .//*[@id]'),p
 copy=wrapper.xpath('./div[@class="ggr-copy"]')[0]
 media=wrapper.xpath('./div[@class="ggr-media"]/img')
 counts[d['name']]=len(media)
 assert len(media)==d['gifs'],p
 assert len(copy.xpath('.//b')) and len(copy.xpath('.//i')) and len(copy.xpath('.//u')),p
 assert wrapper.index(copy)<len(wrapper)-1,p
 for im in media:
  assert im.get('src') in [
   'https://64.media.tumblr.com/04987a67013c7780126e90a37677daf2/0d900e73a5869448-be/s400x600/8e1ca8614f624dfe1fd8cf6f0aa25e91e477ca8e.gifv',
   'https://64.media.tumblr.com/04cb6d079b81be8160b465f2c0e808f3/0d900e73a5869448-e3/s400x600/db57f9fc8dbfe00065b38eb9decd7895e7e411cb.gifv'],p
 if d['type']=='comms':
  assert wrapper.get('data-flow')=='received',p
  assert len(copy.xpath('./p'))==3,p
  unclosed=html.fromstring(etree.tostring(copy,encoding='unicode',method='html').replace('</p>',''))
  assert len(unclosed.xpath('./p'))==3,p
 if d['type']=='bud':
  n=len(copy.text_content().split());assert n<=100,p;bud_words.append(n)
 assert f'.ggr-{d["slug"]}' in css,p
assert len(urls)==1
preview=(root/'ginger-collection-preview.html').read_text()
page=html.fromstring(preview)
assert css in preview
assert json.loads(page.xpath('//script[@id="ginger-designs"]/text()')[0])==designs
for filename in ['ginger-model.js','ginger-editor.js','build.cjs']:
 subprocess.run(['node','--check',str(root/filename)],check=True,capture_output=True)
model_check="""
const assert=require('node:assert/strict');
const m=require('./ginger-model.js');const ds=require('./designs.json');const fs=require('node:fs');
for(const d of ds){
 const s=m.gingerDefaults(d);
 assert.equal(fs.readFileSync(m.gingerFilename(d),'utf8'),m.gingerSnippet(d,s));
 s.gifs=[];assert(!m.gingerSnippet(d,s).includes('ggr-media'));
 s.gifs=Array.from({length:4},(_,i)=>({url:m.GINGER_GIFS[i%2],position:'50% 35%'}));
 assert.equal((m.gingerSnippet(d,s).match(/<img /g)||[]).length,4);
 s.name='A & B <C>';s.title='A "title"';s.url='https://example.org/?a=1&b=2';
 const out=m.gingerSnippet(d,s);assert(out.includes('A &amp; B &lt;C&gt;'));assert(out.includes('A &quot;title&quot;'));assert(out.includes('?a=1&amp;b=2'));
}
"""
subprocess.run(['node','-e',model_check],cwd=root,check=True,capture_output=True)
print(json.dumps({'templates':15,'type_counts':{'thread':5,'comms':5,'bud':5},'gif_counts':counts,'bud_word_counts':bud_words,'shared_stylesheet':list(urls)[0],'checks':'Snippet structure, comment-free code, emphasis direction, mode selectors, optional images, omitted paragraph closers, default/model/preview agreement, HTML escaping and JavaScript syntax passed.','browser_rendering':'Not verified: local preview navigation blocked by browser policy.'},indent=2))
