'use strict';

const fs = require('node:fs');
const path = require('node:path');
const source = JSON.parse(fs.readFileSync(path.join(__dirname, 'sources/encyclopedia-enrichment.json'), 'utf8'));
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const key = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const plain = value => String(value || '').replace(/!\[([^\]]*)\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1').replace(/[*_`]/g, '').replace(/^[-#]+\s*/gm, '').replace(/\s+/g, ' ').trim();
const topicId = value => String(value || '').match(/[?&]showtopic=(\d+)/)?.[1] || '';
const clone = value => JSON.parse(JSON.stringify(value));
const shortDate = value => {
  const match = String(value || '').match(/^\d{4}-(\d{2})-(\d{2})$/);
  return match && MONTHS[Number(match[1])-1] ? Number(match[2]) + ' ' + MONTHS[Number(match[1])-1] : '';
};
const unique = values => [...new Set(values.filter(Boolean))];
const CURATED = {
  'choi-jinseok': {
    facts:[{label:'Taking Root placement',value:'8th'},{label:'Favorite snacks',value:'Macarons; granola with fruit and nuts'}],
    currentChapter:'Jinseok and Lucas are expecting a baby through surrogacy.',
    notes:'Jinseok earned his place in TO@ME through Taking Root and later came out publicly before appearing as a Cakey Wakey judge. He leaves cartoon doodles and affectionate notes for Lucas, enjoys knowing film spoilers, and is fascinated by bees. Early financial hardship makes saving and financial security important to him.',
    friends:['Yang Haneul'],
    sourceUrls:['https://bluehour.jcink.net/index.php?showtopic=54559#entry1678334','https://bluehour.jcink.net/index.php?showtopic=54559#entry1679552','https://bluehour.jcink.net/index.php?showtopic=54559#entry1679585','https://bluehour.jcink.net/index.php?showtopic=54559#entry1682734','https://bluehour.jcink.net/index.php?showtopic=54559#entry1697496'],
    notesForAudit:['Pregnancy follows Lex’s 5 November UQ22 confirmation in the current encyclopaedia; no due date is calculated.','The older dossier’s Lucas Lee partner wording does not replace the canonical Lucas Choi identity.']
  },
  'gabriel-yang': {
    facts:[{label:'Hometown',value:'Usan'},{label:'Residency',value:'Los Angeles'},{label:'Family',value:'Adoptive father of Nora and Sero'}],
    currentChapter:'Returning to teaching while supporting Lucian and their children.',
    notes:'Fierce, protective and resilient, Gabriel finds meaning in teaching and fatherhood. Co-parenting Nora after his divorce helped him realise that he wanted a future with Lucian; they later rebuilt their relationship and are married again.',
    friends:[],
    sourceUrls:['https://bluehour.jcink.net/index.php?showtopic=54637#entry1681566','https://bluehour.jcink.net/index.php?showtopic=54637#entry2221635'],
    notesForAudit:['Divorce belongs to the historical development profile; current canonical marriage is preserved.','Nora and Sero’s adopted identities are confirmed. Later father-of-three wording does not supply another child’s identity or arrival.']
  },
  'yang-haneul': {
    facts:[{label:'Taking Root placement',value:'1st'},{label:'Group position',value:'Centre and main vocalist of TO@ME'}],
    currentChapter:'Haneul is dating Taejoo after his relationship with Taein ended.',
    notes:'Empathetic and patient, Haneul can retreat when hurt and prefers structure when changes feel overwhelming. He is learning to stand up for himself. His Taking Root success led to his position as TO@ME’s centre and main vocalist.',
    friends:['Choi Jinseok'],
    sourceUrls:['https://bluehour.jcink.net/index.php?showtopic=54242#entry1666115','https://bluehour.jcink.net/index.php?showtopic=54242#entry2210919'],
    notesForAudit:['Earlier profile ages and historical Taein relationship remain source versions; the current directory’s age and Taejoo partnership are preserved.']
  }
};

function birthday(record, warnings) {
  const text = record.paragraphs.map(p=>plain(p.markdown)).join('\n');
  // Direct, dated author corrections take precedence over retained calendar history.
  if (record.name === 'Li Tao' && /Lex selected 30 September/.test(text)) return '30 September';
  if (record.name === 'Freddie Lim' && /Canonical birthday: 25 December/.test(text)) return '25 December';
  const dates = unique(record.calendarRecords.filter(e=>e.type==='Birthday').map(e=>shortDate(e.date)));
  if (dates.length === 1) return dates[0];
  if (dates.length > 1) { warnings.push('Multiple birthday dates remain in the source; no date was chosen.'); return ''; }
  const calendar = record.paragraphs.filter(p=>/yearly birthday/.test(p.markdown)).map(p=>p.markdown).join('\n');
  const fromParagraph = unique(Array.from(calendar.matchAll(/\*\*(\d{1,2} [A-Z][a-z]+)\*\*\s*[—–-]\s*yearly birthday/g), m=>m[1]));
  if (fromParagraph.length === 1) return fromParagraph[0];
  if (fromParagraph.length > 1) warnings.push('Multiple birthday dates remain in the source; no date was chosen.');
  return '';
}

function factRows(record, warnings) {
  const result = [];
  const add = (label,value) => { if (value && !result.some(f=>key(f.label)===key(label))) result.push({label,value:String(value).trim()}); };
  add('Birthday', birthday(record,warnings));
  const preference = record.paragraphs.find(p=>/^\*\*Preferences and characterization:\*\*/.test(p.markdown));
  const identity = record.paragraphs.find(p=>/^\*\*Identity and background:\*\* Dossier/.test(p.markdown));
  if (preference) {
    const text = plain(preference.markdown).replace(/^Preferences and characterization:\s*/, '');
    const parts = text.split(/;\s*/);
    add('MBTI',text.match(/\bMBTI\s+([EI][NS][FT][JP](?:-[AT])?)\b/)?.[1]);
    const grouping = parts[1]?.match(/\b([EI][NS][FT][JP](?:-[AT])?)\b\s*,\s*([A-Za-z]+)\s*\/\s*([A-Za-z]+)\s*,\s*(AB|A|B|O)([+−-]?)/);
    if (grouping) {
      add('MBTI',grouping[1]); add('Western zodiac',grouping[2]); add('Chinese zodiac',grouping[3]); add('Blood type',grouping[4]+grouping[5]);
      if (parts.length>=4) { add('Favorite color',parts[2]); add('Favorite food',parts[3].split(/\.\s|\.$/)[0]); }
    }
  }
  if (identity) {
    const text = plain(identity.markdown);
    const shared = text.match(/\b([A-Z][a-z]+) ethnicity\/nationality\b/);
    if (shared) { add('Ethnicity',shared[1]); add('Nationality',shared[1]); }
    else {
      add('Ethnicity',text.match(/\b([A-Z][a-z]+) ethnicity\b/)?.[1]);
      add('Nationality',text.match(/\b([A-Z][a-z]+) nationality\b/)?.[1]);
    }
    add('Romanticality',text.match(/\b(?:homo|hetero|bi|pan|a|demi)romantic\b/i)?.[0]);
    add('Sexuality',text.match(/\b(?:homo|hetero|bi|pan|a|demi)sexual\b/i)?.[0]);
    const language = text.match(/\b(?:English|Korean|Thai|Chinese|Mandarin|Japanese|Spanish)(?:\/(?:some )?(?:English|Korean|Thai|Chinese|Mandarin|Japanese|Spanish))+/);
    if (language) add('Languages',language[0].replaceAll('/',', '));
    const residency = text.match(/ethnicity\/nationality,\s*([^,;]+),\s*(?:English|Korean|Thai|Chinese|Mandarin|Japanese|Spanish)\//);
    if (residency && residency[1].length<90) add('Residency',residency[1]);
    const preferred = text.match(/\bpreferred\s+([^;]+);/i);
    if (preferred && !/field|says|possible|reused|Kia/i.test(preferred[1])) add('Preferred name',preferred[1].split(/\.\s/)[0]);
  }
  const general = record.paragraphs.map(p=>plain(p.markdown));
  const mbtis = unique(general.flatMap(t=>Array.from(t.matchAll(/\b([EI][NS][FT][JP](?:-[AT])?)\b/g),m=>m[1])));
  if (!result.some(f=>f.label==='MBTI') && mbtis.length===1) add('MBTI',mbtis[0]);
  else if (mbtis.length>1) warnings.push('Different MBTI values are retained in source versions; a development value is used only where explicitly labelled.');
  const height = unique(general.flatMap(t=>Array.from(t.matchAll(/\bheight\s*:?\s*(\d{3}(?:\.\d+)?\s*cm)\b/gi),m=>m[1])));
  if (height.length===1) add('Height',height[0]);
  return result;
}

function narrative(record) {
  const preference = record.paragraphs.find(p=>/^\*\*Preferences and characterization:\*\*/.test(p.markdown));
  if (preference) {
    const foodAndTraits = plain(preference.markdown).split(/;\s*/).slice(3).join('; ');
    const traits = foodAndTraits.split(/\.\s+/).slice(1).filter(sentence=>!(/\b(?:source|wiki|Lex|confirmed|superseded|placeholder|field|inconsistency)\b/i.test(sentence))).join('. ').replace(/;\s*tags?\b[^.]*/gi,'').trim();
    if (traits && traits.length<=600) return traits;
  }
  const sentences = [];
  for (const paragraph of record.paragraphs) {
    const text = plain(paragraph.markdown);
    if (!/^(?:He (?:is|has|likes|enjoys|prefers|keeps|drinks|supports)|She (?:is|has|likes|enjoys|prefers)|His (?:favourite|favorite|social preference)|Her (?:favourite|favorite)|They (?:are|enjoy|prefer)|Enjoys |Likes )/.test(text)) continue;
    for (const sentence of text.split(/(?<=[.!?])\s+(?=[A-Z])/).slice(0,2)) {
      if (sentence.length<25 || sentence.length>350 || /\b(?:source|wiki|article|snapshot|dossier|PI|Lex|read|confirmed|unread|pending|unshown|unresolved|birthday|born|age|FACT|F\d{3,}|Bible)\b|not shown|not establish|without proving|remains? (?:a|un|un)/i.test(sentence)) continue;
      sentences.push(sentence);
    }
    if (sentences.length) break;
  }
  return sentences.join(' ').slice(0,700);
}

function apply(input) {
  if (!Array.isArray(input)) throw new Error('Encyclopaedia enrichment needs a character array.');
  const characters = clone(input), byName = new Map(characters.map(c=>[key(c.name),c]));
  const byId = new Map(source.records.map(r=>[r.id,r]));
  const metadata = [];
  for (const character of characters) {
    const record = byId.get(character.id);
    if (!record) throw new Error('Missing encyclopaedia record: '+character.id);
    const warnings = [], fields = new Set(), missing = [], notes = [];
    const curated=CURATED[character.id];
    const protectedFields = ['id','name','nickname','age','pronouns','occupation','portrait','avatar','relationshipStatus'];
    const before = Object.fromEntries(protectedFields.map(k=>[k,character[k]]));
    const partnersBefore = (character.relationships||[]).filter(c=>c.kind==='Partner').map(c=>c.name).sort();
    if (character.id==='baek-samuel') {
      metadata.push({id:character.id,status:'migrated',fields:[],counts:{facts:character.facts?.length||0,relationships:character.relationships?.length||0,timeline:character.timeline?.length||0},preserveFacts:['Birthday'],sources:[{kind:'user',reference:'Sam’s approved profile, media, polaroids, map and current naming',fields:['facts','songs','timeline','relationships','polaroids','mapLocation']},{kind:'encyclopedia',url:record.source.url,fields:[]}],missing:['In-world story dates are not supplied.'],notes:['Approved Sam remains unchanged by general enrichment.'],conflicts:[]});
      continue;
    }
    character.facts = character.facts || [];
    for (const fact of factRows(record,warnings)) if (!character.facts.some(f=>key(f.label)===key(fact.label))) { character.facts.push(fact); fields.add('facts'); }
    if(curated) {
      for(const fact of curated.facts)if(!character.facts.some(f=>key(f.label)===key(fact.label))) { character.facts.push(clone(fact));fields.add('facts'); }
      if(!character.currentChapter) { character.currentChapter=curated.currentChapter;fields.add('currentChapter'); }
      if(!character.notes) { character.notes=curated.notes;fields.add('notes'); }
      notes.push(...curated.notesForAudit);
    }
    if (!character.notes) { const summary=narrative(record); if(summary) { character.notes=summary; fields.add('notes'); } }
    character.relationships = character.relationships || [];
    const ensureConnection = name => {
      const target=byName.get(key(name)); if(!target || target.id===character.id)return null;
      let connection=character.relationships.find(c=>key(c.name)===key(target.name));
      if(!connection) {
        connection={id:target.id,name:target.name,kind:'Other',flavour:'',brand:'',status:'',portrait:target.avatar||target.portrait||'',url:'',summary:'',pinned:false,featured:false,quote:'',playlistUrl:''};
        character.relationships.push(connection); fields.add('relationships');
      }
      return connection;
    };
    if(curated)for(const name of curated.friends) {
      const connection=ensureConnection(name);
      if(connection && connection.kind==='Other') { connection.kind='Friend';fields.add('relationships'); }
    }
    for(const naming of record.naming) {
      const names=unique((naming.participantResolution||[]).map(p=>p.canonicalName));
      if(names.length!==2 || !names.includes(record.name))continue;
      const connection=ensureConnection(names.find(n=>n!==record.name)); if(!connection)continue;
      const field=naming.kind==='brand'?'brand':naming.kind==='flavour'?'flavour':'';if(!field)continue;
      if(connection[field] && key(connection[field])!==key(naming.label))warnings.push(connection.name+': naming key '+naming.label+' supersedes imported '+field+' '+connection[field]+'.');
      connection[field]=naming.label;fields.add('relationships');
    }
    character.timeline = character.timeline || [];
    const observed = new Map();
    const add = (row,type,participants) => {
      const id=topicId(row.url)||String(row.topicId||row.id||'');if(!/^\d+$/.test(id))return;
      const url='https://bluehour.jcink.net/index.php?showtopic='+id;
      const names=unique(participants||[]).filter(n=>byName.has(key(n)));
      const ids=names.filter(n=>key(n)!==key(character.name)).map(ensureConnection).filter(Boolean).map(c=>c.id);
      observed.set(id,{id:'topic-'+id,title:row.title,url,date:'',dateLabel:'',postedDate:'',participants:names.join(' & '),type,status:row.directory==='archive'?'Archived':'',connectionIds:ids,summary:'',milestone:false});
    };
    for(const row of record.stories)add(row,'Thread',row.canonicalParticipants);
    for(const row of record.comms)add(row,'Comms',row.participants);
    for(const row of record.buds)add(row,'Bud',row.participants);
    // These two exact scenes are explicitly attached to Everett by Lex's identity confirmation.
    if(character.name==='Everett Tsai') {
      add({id:'116400',title:'Strawberry Ice Cream'},'Bud',['Bae Jaehoon','Everett Tsai']);
      add({id:'116404',title:'Kiwi Soda'},'Comms',['Bae Jaehoon','Everett Tsai']);
    }
    for(const row of observed.values()) {
      const existing=character.timeline.find(e=>topicId(e.url)===topicId(row.url));
      if(existing)continue;
      character.timeline.push(row);fields.add('timeline');
    }
    for(const connection of character.relationships)if(!connection.url) {
      const first=character.timeline.find(e=>(e.connectionIds||[]).includes(connection.id));if(first)connection.url=first.url;
    }
    for(const field of protectedFields)if(JSON.stringify(character[field])!==JSON.stringify(before[field]))throw new Error('Core directory field changed: '+character.id+'/'+field);
    const partnersAfter=character.relationships.filter(c=>c.kind==='Partner').map(c=>c.name).sort();
    if(JSON.stringify(partnersBefore)!==JSON.stringify(partnersAfter))throw new Error('Canonical partners changed: '+character.id);
    if(!record.sourceTags.includes('Development dossier'))missing.push('No development dossier is recorded in the source index.');
    if(!character.facts.some(f=>key(f.label)==='birthday'))missing.push('Birthday is not established in the reviewed source.');
    if(!character.songs?.length && !character.playlistUrl)missing.push('No playlist tracks have been supplied.');
    if(!character.polaroids?.length)missing.push('Closest-person polaroids have not been selected.');
    if(character.timeline.length)missing.push('In-world story dates are not supplied; imported links remain undated.');
    else missing.push('No confidently matched story or comms links were found.');
    if(!fields.size)notes.push('Reviewed source currently adds no facts beyond the canonical PI; unknown details are left blank.');
    if(record.sourceCautions.length)warnings.push('Source versions contain qualifications or conflicts; original paragraphs are retained in sources/encyclopedia-enrichment.json for this character.');
    const sources=[{kind:'pi',url:record.canonicalAuthority.url,fields:record.canonicalAuthority.fields},{kind:'encyclopedia',url:record.source.url,fields:[...fields]}];
    if(curated)sources.push(...curated.sourceUrls.map(url=>({kind:'development',url,fields:['facts','notes','currentChapter','relationships']})));
    metadata.push({id:character.id,status:fields.size?'partial':'starter',fields:[...fields],counts:{facts:character.facts.length,relationships:character.relationships.length,timeline:character.timeline.length},preserveFacts:character.facts.some(f=>key(f.label)==='birthday')?['Birthday']:[],sources,missing,notes,conflicts:unique(warnings)});
  }
  return {characters,metadata:{version:1,records:metadata}};
}

module.exports = {apply};
