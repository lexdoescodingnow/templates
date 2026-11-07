'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const D=require('./dossier-model.js');
const read=p=>JSON.parse(fs.readFileSync(path.join(__dirname,p),'utf8'));
const current=read('sources/current-directory.json').characters;
const canonical=read('../forum-posts/characters/characters.json');
assert.deepEqual(current.map(r=>[r.name,r.code]).sort(),canonical.map(r=>[r.name,r.code]).sort());
const captures=read('sources/development-posts.json').topics;
assert.equal(captures.length,58);
for(const topic of captures){
  const posts=topic.pages.flatMap(p=>p.posts);
  assert.equal(posts.length,topic.index.replies+1,'Missing source pages: '+topic.index.name);
  assert.equal(new Set(posts.map(p=>p.postId)).size,posts.length,'Duplicate source posts: '+topic.index.name);
}
const library=D.normalizeDataset(read('seed-library.json'));
const previous=D.normalizeDataset(read('legacy-baseline.json'));
const byId=new Map(library.characters.map(c=>[c.id,c]));
const sam=byId.get('baek-samuel');
const withoutTopicStarts=character=>({...character,timeline:character.timeline.map(entry=>({...entry,postedDate:'',postedDateSource:''}))});
assert.deepEqual(withoutTopicStarts(sam),withoutTopicStarts(previous.characters.find(c=>c.id==='baek-samuel')));
assert(sam.timeline.every(entry=>entry.postedDate&&entry.postedDateSource===entry.url&&!entry.date),'Sam gains sourced topic starts only');
const metadata=read('migration-sources.json');
assert.equal(metadata.characters.length,181);
assert.equal(metadata.characters.filter(c=>c.sources.some(s=>s.kind==='development')).length,58);
for(const old of previous.characters){
  const c=byId.get(old.id);
  for(const field of ['name','nickname','age','pronouns','occupation','avatar','relationshipStatus'])assert.equal(c[field],old[field],'Directory authority: '+c.id+'/'+field);
  assert.deepEqual(c.relationships.filter(r=>r.kind==='Partner').map(r=>r.name).sort(),old.relationships.filter(r=>r.kind==='Partner').map(r=>r.name).sort());
  assert.equal(c.themeMode,'auto');
  assert.equal(new Set(c.timeline.map(t=>t.url).filter(Boolean)).size,c.timeline.filter(t=>t.url).length,'Repeated timeline destination: '+c.id);
  assert(c.facts.every(f=>!/^(?:name|text|tbd|lorem ipsum|n\/a)$/i.test(f.value.trim())),'Placeholder fact: '+c.id);
  assert(c.facts.every(f=>!/^age$/i.test(f.label)),'Duplicate age fact: '+c.id);
  assert(!c.songs.some(s=>/pid_|development post/i.test(s.note)),'Implementation detail in song note: '+c.id);
}
const ids=library.characters.map(c=>c.id);
assert(ids.includes('lucas-choi')&&ids.includes('jake-lee')&&ids.includes('kwon-kennedy'));
assert.equal(byId.get('ben-dam').songs.length,12);
assert.equal(byId.get('gabriel-yang').writer,'Sara');
assert.equal(byId.get('rain-jeon').writer,'');
assert(byId.get('ben-dam').relationships.some(r=>r.brand==='Calypso'));
assert(byId.get('byun-yuseop').timeline.some(t=>t.url.includes('showtopic=83999')&&/Mochidoki/i.test(t.title)));
assert(byId.get('choi-jinseok').relationships.some(r=>r.kind==='Group'&&r.brand==='Ghirardelli'));
assert(byId.get('park-taein').relationships.some(r=>r.kind==='Group'&&r.brand==='T2'));
console.log('PASS: live directory agreement, all 58 complete source topics, all 181 identities and partners, approved Sam, automatic themes, real media and current group naming.');
