'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'forum-posts/characters/characters.json'), 'utf8'));
const ships = JSON.parse(fs.readFileSync(path.join(root, 'ship-names.json'), 'utf8'));
const plain = value => String(value || '').replace(/\[\/?(?:b|i|u)\]/gi, '').trim();
const key = value => plain(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const slug = value => key(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const capture = (text, pattern, label) => {
  const found = text.match(pattern);
  assert(found, 'Missing ' + label + ': ' + text);
  return found[1].trim();
};

function relationship(values) {
  return {id:'', name:'', kind:'Other', flavour:'', status:'', portrait:'', url:'', summary:'', pinned:false, featured:false, quote:'', playlistUrl:'', ...values};
}

function parseCharacter(record) {
  const description = capture(record.code, /\[CD=([\s\S]*?)\]\s*\[CN=/, 'description');
  const nickname = capture(description, /^❧\s*\[b\]([\s\S]*?)\[\/b\]/, 'nickname');
  const age = capture(description, /⸺\s*(\d+) years old/, 'age');
  const pronouns = capture(description, /years old\s*⋄\s*([^⋄]+)⋄/, 'pronouns');
  const occupation = plain(capture(description, /years old\s*⋄\s*[^⋄]+⋄\s*([\s\S]*?)(?:\s*⋄\s*♡|\s*⸺\s*looks like)/, 'occupation'));
  const faceclaim = plain(capture(description, /looks like\s*\[i\]([\s\S]*?)\[\/i\]/, 'face claim'));
  const partnerSection = description.match(/♡\s*(married to|engaged to|in a relationship with)\s*([\s\S]*?)\s*♡/);
  const partnerStatus = partnerSection ? ({'married to':'Married', 'engaged to':'Engaged', 'in a relationship with':'In a relationship'})[partnerSection[1]] : '';
  const relationships = partnerSection ? Array.from(partnerSection[2].matchAll(/\[b\]([\s\S]*?)\[\/b\]/g), item => relationship({id:slug(item[1]), name:plain(item[1]), kind:'Partner', status:partnerStatus, featured:true})) : [];
  if (partnerSection) assert(relationships.length, 'Unparsed relationship for ' + record.name);
  return {
    id:slug(record.name), name:record.name, nickname, age, pronouns, gender:'', occupation,
    location:'', writer:'', portrait:capture(record.code, /\[PI=([^\]]+)\]/, 'portrait'), accent:'#8a9b91', tags:[],
    facts:[{label:'Face claim', value:faceclaim}], currentChapter:'', asOf:'', notes:'',
    relationshipStatus:partnerStatus, relationships, timeline:[], songs:[], playlistUrl:''
  };
}

const characters = source.map(parseCharacter);
const byName = new Map(characters.map(record => [key(record.name), record]));
const matchesShipName = (record, name) => [key(record.name), key(record.nickname), ...key(record.name).split(/[\s-]+/)].includes(key(name));
let matchedFlavours = 0;
for (const record of characters) {
  for (const connection of record.relationships) {
    const partner = byName.get(key(connection.name));
    assert(partner, 'Unresolved canonical partner: ' + record.name + ' / ' + connection.name);
    connection.id = partner.id;
    connection.name = partner.name;
    connection.portrait = partner.portrait;
    const candidates = Object.entries(ships).filter(([, names]) => {
      const ownNames = names.filter(name => matchesShipName(record, name));
      const partnerNames = names.filter(name => matchesShipName(partner, name));
      return ownNames.some(a => partnerNames.some(b => key(a) !== key(b))) && names.every(name => matchesShipName(record, name) || record.relationships.some(item => matchesShipName(byName.get(key(item.name)), name)));
    });
    if (candidates.length === 1) {
      connection.flavour = candidates[0][0] === 'mocha-latte' ? 'mocha & latte' : candidates[0][0].replace(/-/g, ' ');
      matchedFlavours++;
    }
  }
}

const sam = byName.get('baek samuel');
assert(sam && sam.age === '25', 'Sam should use the user-confirmed current directory age of 25.');
Object.assign(sam, {
  gender:'cisgender male', location:'los angeles, ca', portrait:'https://b.l3n.co/i/n8q1lD.png', accent:'#5b8612',
  relationshipStatus:'In a relationship',
  tags:['ANXIOUS HEART', 'BRAVER THAN HE THINKS', 'DEEPLY ATTACHED', 'EMOTIONALLY TUNED', 'GENTLE HUMOUR', 'OVERTHINKER', 'QUIET LOYALTY', 'ROUTINE COMFORT', 'SAFETY SEEKER', 'SOFT-SPOKEN'],
  facts:[
    {label:'Preferred name', value:'sam, sammy'},
    {label:'Birthday', value:'october 13th'},
    {label:'Ethnicity', value:'korean'},
    {label:'Nationality', value:'korean'},
    {label:'Romanticality', value:'biromantic'},
    {label:'Sexuality', value:'bisexual'},
    {label:'Residency', value:'san bernardino, CA'},
    {label:'Languages', value:'english, korean'},
    {label:'MBTI', value:'ISTP'},
    {label:'Western zodiac', value:'libra'},
    {label:'Chinese zodiac', value:'monkey'},
    {label:'Blood type', value:'A+'},
    {label:'Favorite color', value:'red'},
    {label:'Favorite food', value:'pizza'},
    {label:'Face claim', value:'kang yuchan'}
  ],
  relationships:[
    relationship({id:'dom', name:'Dom', flavour:'almond', status:'Active', portrait:byName.get('dominic lim').portrait}),
    relationship({id:'hoseong', name:'Hwak Hoseong', kind:'Partner', flavour:'cereal', status:'Active', portrait:'https://64.media.tumblr.com/249bd77b93613f7adfe8e9bad8aed989/2ea52ad3c9269f24-0a/s540x810/f575f8f33a06017a9a9e024239ef77986315a849.gifv', url:'https://bluehour.jcink.net/index.php?showtopic=104200', featured:true}),
    relationship({id:'crazhes', name:'CRAZHES', kind:'Group', flavour:'marshmallow', status:'Active'}),
    relationship({id:'jiae', name:'Jiae', flavour:'treacle', status:'Active', portrait:byName.get('baek jiae').portrait})
  ],
  timeline:[
    ['almond-croissant', 'almond croissant', '62747', 'Comms', 'sam & dom', ['dom']],
    ['treacle-tart', 'treacle tart', '64015', 'Comms', 'sam & jiae', ['jiae']],
    ['marshmallow-spread', 'marshmallow spread', '83999', 'Comms', 'CRAZHES', ['crazhes']],
    ['pumpkin-pie', 'pumpkin pie', '98948', 'Thread', 'group thread', []],
    ['cereal-milk', 'cereal milk', '104200', 'Thread', 'sam & hoseong', ['hoseong']]
  ].map(([id,title,topic,type,participants,connectionIds]) => ({id,title,url:'https://bluehour.jcink.net/index.php?showtopic='+topic,date:'',dateLabel:'',postedDate:'',participants,type,status:'',connectionIds,summary:'',milestone:false})),
  songs:[
    ['BOUNCY (K-HOT CHILLI PEPPERS)', 'ATEEZ', '5KyOUICJIvO0z71MBdPGiX'],
    ["Golden - Glowin' Version", 'HUNTR/X, EJAE, AUDREY NUNA, REI AMI, KPop Demon Hunters Cast', '0SIEcuChTr2DIhuPgklpeP'],
    ['Super', 'SEVENTEEN', '3AOf6YEpxQ894FmrwI9k96'],
    ['Fresh', 'CHUEI LI YU', '2EFxmF45ZsAvSQBGyMYGTB'],
    ['Go Up - Live', 'WINNER', '2tYiQoXXbAEdwBTG0qanqi'],
    ['Fact Check', 'NCT 127', '2nNBdv2vcJZuWOZ06nNF62'],
    ['Last Flower', 'The KingDom', '0M1NR0EXFkMoy8nt4JNXKH'],
    ['FAMOUS', 'ALLDAY PROJECT', '40UVUuyy5RfpO0awclCttA'],
    ['Move', 'SCENE', '4tLAqSfrGmx5L0akJWNdK5'],
    ['Beat It Up', 'NCT DREAM', '4UJwJG0Byki4e9MNTxo8aF']
  ].map(([title,artist,id]) => ({title,artist,url:'https://open.spotify.com/track/'+id,note:''}))
});

const first = ['baek-samuel', 'ben-dam', 'cookie-chalongrat-vihokratana'];
characters.sort((a,b) => {
  const ai = first.indexOf(a.id), bi = first.indexOf(b.id);
  return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.name.localeCompare(b.name, 'en');
});
const notices = Object.fromEntries(characters.map(record => [record.id, record === sam ? [
  'Sam uses the confirmed current age of 25 and his relationship with Hoseong. All supplied facts, ten songs and five story links are included.',
  'Story dates were not supplied. The five entries keep their original order under Undated until you add in-world dates.',
  'No closest connections have been chosen. Pin up to three people in Connections & ships when you are ready.'
] : [
  'Starter imported from the existing character directory: name, nickname, age, pronouns, occupation, face claim, portrait and recorded partners. This is not a full development-post migration.',
  'Add this character’s facts, closest connections, songs and story entries here. Empty optional sections do not appear in the forum post.'
]]));

assert.equal(characters.length, 181);
assert.equal(new Set(characters.map(record => record.id)).size, characters.length);
assert(characters.every(record => record.name && record.nickname && record.age && record.pronouns && record.occupation && record.portrait && record.facts.some(fact => fact.label === 'Face claim' && fact.value)));
assert.equal(sam.songs.length, 10);
assert.equal(sam.timeline.length, 5);
assert.equal(sam.relationships.length, 4);
assert(sam.relationships.every(record => !record.pinned));
assert(sam.timeline.every(record => !record.date && !record.postedDate));
const library = {version:1, characters};
fs.mkdirSync(__dirname, {recursive:true});
fs.writeFileSync(path.join(__dirname, 'seed-library.json'), JSON.stringify(library, null, 2) + '\n');
fs.writeFileSync(path.join(__dirname, 'seed-data.js'), 'var DOSSIER_SEED = ' + JSON.stringify(library, null, 2) + ';\nvar DOSSIER_NOTICES = ' + JSON.stringify(notices, null, 2) + ';\n');
console.log(JSON.stringify({characters:characters.length, canonicalPartnerRecords:characters.reduce((count,record) => count + record.relationships.filter(item => item.kind === 'Partner').length,0), matchedFlavours, samFacts:sam.facts.length, samSongs:sam.songs.length, samStoryEntries:sam.timeline.length, pinnedConnections:characters.reduce((count,record)=>count+record.relationships.filter(item=>item.pinned).length,0)}, null, 2));
