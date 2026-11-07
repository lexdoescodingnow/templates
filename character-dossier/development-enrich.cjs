'use strict';

const fs = require('node:fs');
const path = require('node:path');
const Dossier = require('./dossier-model.js');
const sourceRoot = path.join(__dirname,'sources');
const key = value => String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'');
const plain = value => decode(String(value||'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'').replace(/<br\s*\/?\s*>/gi,'\n').replace(/<[^>]*>/g,'')).replace(/[ \t]+/g,' ').trim();
function decode(value) {
  const named = {amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘',ldquo:'“',rdquo:'”'};
  return String(value).replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt|nbsp|ndash|mdash|rsquo|lsquo|ldquo|rdquo);/gi,(_,entity)=>{
    if(entity[0]!=='#')return named[entity.toLowerCase()];
    const code=entity[1].toLowerCase()==='x'?parseInt(entity.slice(2),16):Number(entity.slice(1));
    return code>0&&code<=0x10ffff?String.fromCodePoint(code):'';
  });
}
function useful(value) { return !!String(value||'').trim()&&!/^(?:[.#?\s-]+|tbd|to be added|text|name|url|\[(?:text|name|url)\])$/i.test(String(value).trim()); }
function topicId(url) { try { const parsed=new URL(decode(url));return parsed.hostname==='bluehour.jcink.net'?parsed.searchParams.get('showtopic'):null; }catch(_){return null;} }
function sourceJson(name,fallback) {const filename=path.join(sourceRoot,name);return fs.existsSync(filename)?JSON.parse(fs.readFileSync(filename,'utf8')):fallback;}
function fieldKey(label) {const normalized=key(label);return ({favouritecolor:'favoritecolor',favouritecolour:'favoritecolor',favoritecolour:'favoritecolor',favouritefood:'favoritefood',romanticorientation:'romanticality',sexualorientation:'sexuality',residence:'residency',currentresidence:'residency',dateofbirth:'birthday',bloodgroup:'bloodtype'})[normalized]||normalized;}
function spotify(value) {
  const source=decode(String(value||''));
  const match=source.match(/https:\/\/open\.spotify\.com\/(?:intl-[a-z]{2}\/)?(?:embed\/)?(track|playlist|album)\/([A-Za-z0-9]{22})(?=[?&#\s"'<]|$)/);
  return match?{type:match[1],id:match[2],url:'https://open.spotify.com/'+match[1]+'/'+match[2],repaired:!source.startsWith('https://open.spotify.com/')}:null;
}
function emptyRelationship(id,name) {return {id,name,kind:'Other',flavour:'',brand:'',status:'',portrait:'',url:'',summary:'',pinned:false,featured:false,quote:'',playlistUrl:''};}
function additionalProfiles(post) {
  const html=String(post.html||''),profiles=[];
  if(/class=["'][^"']*\bozzytop\b/i.test(html)) {
    const facts=Array.from(html.matchAll(/<div\b[^>]*class=["'][^"']*\binfob1\b[^"']*["'][^>]*>\s*<a\b[^>]*>([\s\S]*?)<\/a>\s*<c\b[^>]*>([\s\S]*?)<\/c>/gi),match=>({label:plain(match[1]),value:plain(match[2])}));
    const image=html.match(/<img\b(?=[^>]*\bclass=["'][^"']*\bozzyimg\b)[^>]*\bsrc=["']([^"']+)["']/i);
    const value=label=>facts.find(fact=>fieldKey(fact.label)===label)?.value||'';
    profiles.push({facts,header:image?'url("'+decode(image[1])+'")':'',name:value('fullname'),age:value('age'),pronouns:value('pronouns'),location:value('residency')});
  } else if(/class=["'][^"']*\bYKY-main\b/i.test(html)) {
    const image=html.match(/<div\b[^>]*class=["'][^"']*\bYKY-right\b[^"']*["'][^>]*>[\s\S]*?<img\b[^>]*\bsrc=["']([^"']+)["']/i);
    const blurb=html.match(/<div\b[^>]*class=["']YKY-blurb["'][^>]*>([\s\S]*?)<\/div>/i);
    const mbti=blurb&&plain(blurb[1]).match(/^(I[NS][FT][JP]|E[NS][FT][JP])(?:,|\s|$)/);
    profiles.push({facts:mbti?[{label:'MBTI',value:mbti[1]}]:[],header:image?'url("'+decode(image[1])+'")':''});
  }
  return profiles;
}
function trackerEntries(html) {
  const result=[];
  for(const match of html.matchAll(/<pgy-cya\b[^>]*>([\s\S]*?)<\/pgy-cya>/gi)) {
    const prefix=html.slice(0,match.index),anchor=prefix.slice(prefix.toLowerCase().lastIndexOf('<a'));
    const href=anchor.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    const title=plain(match[1].split(/<x\b/i)[0]);
    const detail=match[1].match(/<x\b[^>]*>([\s\S]*?)<\/x>/i);
    const parts=plain(detail?detail[1]:'').split(/\n+/).map(part=>part.trim()).filter(Boolean);
    const type=parts.some(part=>/\bcomms?\b/i.test(part))?'Comms':parts.some(part=>/\bbuds?\b/i.test(part))?'Bud':'Thread';
    const participants=parts.filter(part=>!/^\s*(?:group\s+)?(?:comms?|buds?|thread)\s*$/i.test(part)).join(' & ');
    if(href&&topicId(href[1])&&useful(title))result.push({url:decode(href[1]),title,type,participants,group:parts.some(part=>/group/i.test(part))});
  }
  for(const match of html.matchAll(/<pgy-contact\b[^>]*>([\s\S]*?)<\/pgy-contact>/gi)) {
    const anchor=match[1].match(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    const detail=match[1].match(/<x\b[^>]*>([\s\S]*?)<\/x>/i);
    const participants=plain(detail?detail[1]:'');
    const type=/\bcomms?\b/i.test(participants)?'Comms':/\bbuds?\b/i.test(participants)?'Bud':'Thread';
    if(anchor&&topicId(anchor[1])&&useful(plain(anchor[2])))result.push({url:decode(anchor[1]),title:plain(anchor[2]),type,participants,group:/group/i.test(participants)});
  }
  return result;
}

function apply(input) {
  if(!Array.isArray(input))throw new Error('Development enrichment needs a character list.');
  const characters=JSON.parse(JSON.stringify(input));
  const captured=sourceJson('development-posts.json',{topics:[]});
  const encyclopedia=sourceJson('encyclopedia-enrichment.json',{records:[]});
  const music=sourceJson('spotify-metadata.json',{entries:{}});
  const byId=new Map(characters.map(character=>[character.id,character]));
  const byName=new Map(characters.map(character=>[key(character.name),character]));
  const records=new Map(encyclopedia.records.map(record=>[record.id,record]));
  const aliases=new Map(),components=new Map(),knownGroups=new Map();
  for(const character of characters) {
    const record=records.get(character.id);
    for(const label of [character.name,character.nickname,...(record&&record.aliases||[])]) {
      const normalized=key(label);if(!normalized)continue;
      if(!aliases.has(normalized))aliases.set(normalized,new Set());
      aliases.get(normalized).add(character.id);
    }
    for(const part of character.name.split(/[\s"'()_-]+/).filter(part=>key(part).length>=3)) {
      const normalized=key(part);if(!components.has(normalized))components.set(normalized,new Set());components.get(normalized).add(character.id);
    }
    for(const relationship of character.relationships||[])if(relationship.kind==='Group')knownGroups.set(key(relationship.name),relationship);
  }
  function resolveName(label) {
    const exact=byName.get(key(label));if(exact)return exact;
    const ids=aliases.get(key(label));if(ids&&ids.size===1)return byId.get(Array.from(ids)[0]);
    const parts=components.get(key(label));return !ids&&parts&&parts.size===1?byId.get(Array.from(parts)[0]):null;
  }
  const currentTopics=new Map();
  function register(entry,type,priority) {
    const id=topicId(entry.url);if(!id||!useful(entry.title))return;
    const previous=currentTopics.get(id);if(previous&&previous.priority>=priority)return;
    const rawParticipants=entry.participants||entry.canonicalParticipants||[];
    const participants=Array.isArray(rawParticipants)?rawParticipants:String(rawParticipants).split(/\s*&\s*|\s*\/\s*|\s+and\s+/i).filter(Boolean);
    currentTopics.set(id,{title:entry.title,type,priority,participants});
  }
  for(const record of encyclopedia.records) {
    for(const entry of record.stories||[])register(entry,null,1);
    for(const entry of record.buds||[])register(entry,'Bud',2);
    for(const entry of record.comms||[])register(entry,'Comms',3);
  }
  for(const entry of encyclopedia.unassignedComms||[])register(entry,'Comms',3);
  for(const entry of encyclopedia.unassignedBuds||[])register(entry,'Bud',2);
  for(const entry of byId.get('baek-samuel')?.timeline||[])register(entry,entry.type,4);
  const explicitTopics=new Map(),allSourceTopics=new Map();
  function addTopic(map,id,characterId) {if(!id)return;if(!map.has(id))map.set(id,new Set());map.get(id).add(characterId);}
  for(const record of encyclopedia.records) {
    if(!byId.has(record.id))continue;
    for(const url of record.sourceURLs||[])addTopic(allSourceTopics,topicId(url),record.id);
    for(const paragraph of record.paragraphs||[]) {
      if(!/development (?:record|dossier)/i.test(paragraph.markdown))continue;
      for(const match of paragraph.markdown.matchAll(/\[([^\]]*(?:development|dossier)[^\]]*)\]\((https:\/\/bluehour\.jcink\.net\/[^)]+)\)/gi))addTopic(explicitTopics,topicId(match[2]),record.id);
    }
  }
  const metadata={checkedAt:captured.checkedAt||'',topicsCaptured:captured.topics.length,matched:0,unmatched:[],records:[]};
  for(const topic of captured.topics) {
    const url=topic.index&&topic.index.url||'',id=topicId(url);
    const explicit=explicitTopics.get(id),candidates=explicit&&explicit.size===1?explicit:allSourceTopics.get(id);
    let character=byName.get(key(topic.index&&topic.index.name));
    if(!character)character=candidates&&candidates.size===1?byId.get(Array.from(candidates)[0]):null;
    if(!character){metadata.unmatched.push({url,name:topic.index&&topic.index.name||'',candidates:Array.from(candidates||[])});continue;}
    metadata.matched++;
    const detail={id:character.id,url,fields:[],counts:{facts:0,songs:0,timeline:0,connections:0},notes:[],conflicts:[]};
    metadata.records.push(detail);
    if(character.id==='baek-samuel'){detail.notes.push('Sam keeps the approved dossier unchanged.');continue;}
    const pageOffset=page=>{try{return Number(new URL(page.url).searchParams.get('st'))||0;}catch(_){return 0;}};
    const posts=topic.pages.slice().sort((a,b)=>pageOffset(a)-pageOffset(b)).flatMap(page=>page.posts||[]),record=records.get(character.id);
    function note(value){if(!detail.notes.includes(value))detail.notes.push(value);}
    function conflict(value){if(!detail.conflicts.includes(value))detail.conflicts.push(value);}
    function changed(field){if(!detail.fields.includes(field))detail.fields.push(field);}
    const placeholderFacts=character.facts.filter(fact=>!useful(fact.value));
    if(placeholderFacts.length){character.facts=character.facts.filter(fact=>useful(fact.value));changed('facts');note('Empty editing placeholders were omitted from factual fields.');}
    function connectionFor(other) {
      if(!other||other.id===character.id)return null;
      let found=character.relationships.find(connection=>connection.id===other.id||key(connection.name)===key(other.name)||resolveName(connection.name)?.id===other.id);
      if(!found){found=emptyRelationship(other.id,other.name);found.portrait=other.avatar||other.portrait||'';character.relationships.push(found);detail.counts.connections++;changed('relationships');}
      return found;
    }
    function currentNaming(otherName,otherId) {
      return (record&&record.naming||[]).filter(naming=>{
        const participants=(naming.participantResolution||[]).map(item=>item.canonicalName||(item.candidates&&item.candidates.length===1?item.candidates[0]:''));
        if(otherId&&participants.filter(Boolean).length>2)return false;
        if(otherId&&participants.some(name=>byName.get(key(name))?.id===otherId))return true;
        const labels=String(naming.sourceParticipantLabels||'').split(/\s*&\s*|\s*\/\s*|\s+and\s+/i);
        return labels.some(label=>key(label)===key(otherName));
      });
    }
    function groupConnection(name) {
      const normalized=key(name),known=knownGroups.get(normalized);
      const confirmed={crazhes:'Mochidoki',tome:'Ghirardelli',creemcheese:'T2'};
      if(!known&&!confirmed[normalized])return null;
      let connection=character.relationships.find(item=>item.kind==='Group'&&key(item.name)===normalized);
      if(!connection){connection=emptyRelationship('group-'+normalized,name);connection.kind='Group';character.relationships.push(connection);detail.counts.connections++;changed('relationships');}
      if(known){connection.name=known.name;connection.flavour=known.flavour||'';connection.brand=known.brand||'';}
      if(confirmed[normalized]){connection.brand=confirmed[normalized];connection.flavour='';}
      return connection;
    }
    for(const post of posts) {
      for(const profile of (post.profiles&&post.profiles.length?post.profiles:additionalProfiles(post))) {
        if(profile.age&&String(profile.age)!==String(character.age))conflict('Development profile age '+profile.age+' differs from current directory age '+character.age+'; the directory value is retained.');
        if(profile.pronouns&&key(profile.pronouns)!==key(character.pronouns))conflict('Development profile pronouns '+profile.pronouns+' differ from the current directory; the directory value is retained.');
        if(useful(profile.gender)) {
          if(!character.gender){character.gender=profile.gender;changed('gender');}
          else if(key(character.gender)!==key(profile.gender))conflict('Development gender '+profile.gender+' differs from the existing record '+character.gender+'; the existing value is retained.');
        }
        const header=String(profile.header||'').match(/^url\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)$/i);
        if(header&&Dossier.safeUrl(header[1])){character.portrait=Dossier.safeUrl(header[1]);changed('portrait');}
        const summary=String(profile.summary||'').split(/\r?\n/).map(value=>value.trim()).filter(Boolean);
        const sourceLocation=profile.location||(summary.length===3?summary[2]:'');
        const location=sourceLocation===sourceLocation.toUpperCase()?sourceLocation.toLowerCase().replace(/,\s*ca$/i,', CA'):sourceLocation;
        if(useful(location)) {
          if(!character.location){character.location=location;changed('location');}
          else if(key(character.location)===key(location)&&character.location!==location){character.location=location;changed('location');}
          else if(key(character.location)!==key(location))conflict('Development header location '+location+' differs from existing location '+character.location+'; the existing value is retained.');
        }
        for(const fact of profile.facts||[]) {
          if(!useful(fact.label)||!useful(fact.value))continue;
          const normalized=fieldKey(fact.label);
          if(['age','name','fullname','nickname','pronouns','occupation','partner','partners','relationshipstatus','faceclaim'].includes(normalized))continue;
          if(normalized==='preferredname') {
            const preferred=fact.value.split(/\s*[,/]\s*/).map(resolveName).filter(Boolean);
            if(preferred.length&&preferred.every(person=>person.id!==character.id)) {
              conflict('Development preferred name '+fact.value+' resolves to another character; the current character identity is retained.');
              character.facts=character.facts.filter(item=>fieldKey(item.label)!=='preferredname'||key(item.value)!==key(fact.value));
              continue;
            }
          }
          const existing=character.facts.find(item=>fieldKey(item.label)===normalized);
          if(existing&&useful(existing.value)) {
            if(key(existing.value)!==key(fact.value)&&normalized!=='birthday')conflict('Development '+fact.label+' is '+fact.value+'; existing '+existing.value+' is retained.');
            continue;
          }
          if(fact.value.length>2000){note('The '+fact.label+' source value exceeds the dossier fact limit and remains in the captured source.');continue;}
          if(existing)existing.value=fact.value;else character.facts.push({label:fact.label,value:fact.value});
          detail.counts.facts++;changed('facts');
        }
      }
      for(const embed of post.embeds||[]) {
        const media=spotify(embed.src);if(!media)continue;
        if(media.type==='playlist') {
          if(!character.playlistUrl){character.playlistUrl=media.url;changed('playlistUrl');}
          else if(character.playlistUrl!==media.url)note('Additional Spotify playlist remains in the source: '+media.url);
          continue;
        }
        const verified=music.entries[media.type+'/'+media.id];
        const existingSong=character.songs.find(song=>spotify(song.url)?.url===media.url);
        if(existingSong){
          if(verified&&/^Spotify (?:track|album)$/.test(existingSong.title))existingSong.title=verified.title;
          if(/^From (?:the character's development writing|the development post(?: pid_\d+)?)\.$/.test(existingSong.note||''))existingSong.note='';
          continue;
        }
        character.songs.push({title:verified?verified.title:useful(embed.title)&&!/^spotify$/i.test(embed.title)?plain(embed.title):(media.type==='album'?'Spotify album':'Spotify track'),artist:verified&&verified.artist||'',url:media.url,note:''});
        detail.counts.songs++;changed('songs');
        if(media.repaired)note('A malformed Spotify embed address was repaired using its exact embedded Spotify '+media.type+' ID.');
      }
      for(const flavour of String(post.html||'').matchAll(/<flavour\b[^>]*>([\s\S]*?)<\/flavour>/gi)) {
        const who=flavour[1].match(/<character\b[^>]*>([\s\S]*?)<\/character>/i),taste=flavour[1].match(/<taste\b[^>]*>([\s\S]*?)<\/taste>/i);
        if(!who||!taste||!useful(plain(taste[1])))continue;
        for(const label of plain(who[1]).split(/\s*&\s*|\s+and\s+/i)) {
          const other=resolveName(label);
          if(!other){
            const group=groupConnection(label);
            if(!group)note('Unresolved flavour-table connection remains in the source: '+label+'.');
            else if(!group.flavour&&!group.brand)note('The source group '+label+' uses historical flavour '+plain(taste[1])+'. Its current naming has not been confirmed, so that older label is not applied.');
            continue;
          }
          const connection=connectionFor(other);if(!connection)continue;
          const naming=currentNaming(other.name,other.id);
          if(naming.length) {
            const brands=naming.filter(item=>item.kind!=='flavour').map(item=>item.label),flavours=naming.filter(item=>item.kind==='flavour').map(item=>item.label);
            if(brands.length){connection.brand=Array.from(new Set(brands)).join(' / ');if(!flavours.length)connection.flavour='';}
            if(flavours.length)connection.flavour=Array.from(new Set(flavours)).join(' / ');
          } else if(!connection.flavour&&!connection.brand)connection.flavour=plain(taste[1]);
          changed('relationships');
        }
      }
      for(const tracker of trackerEntries(String(post.html||''))) {
        const trackerId=topicId(tracker.url),current=currentTopics.get(trackerId);
        const title=current?current.title:tracker.title;
        const names=current&&current.participants.length?current.participants:tracker.participants.split(/\s*&\s*|\s*\/\s*|\s+and\s+/i);
        const connections=names.map(resolveName).filter(Boolean).map(connectionFor).filter(Boolean);
        if(tracker.group){const group=groupConnection(tracker.participants);if(group)connections.push(group);}
        const existing=character.timeline.find(entry=>topicId(entry.url)===trackerId);
        if(existing) {
          if(current)existing.title=title;
          if(current&&current.type)existing.type=current.type;
          if(!existing.participants)existing.participants=current&&current.participants.length?current.participants.join(' & '):tracker.participants;
          existing.connectionIds=Array.from(new Set((existing.connectionIds||[]).concat(connections.map(connection=>connection.id))));
          continue;
        }
        character.timeline.push({id:'development-'+trackerId,title,url:Dossier.safeUrl(tracker.url),date:'',dateLabel:'',postedDate:'',type:current&&current.type||tracker.type,status:'',participants:current&&current.participants.length?current.participants.join(' & '):tracker.participants,connectionIds:Array.from(new Set(connections.map(connection=>connection.id))),summary:'',milestone:false});
        detail.counts.timeline++;changed('timeline');
      }
    }
    if(!detail.fields.length)note('No additional structured facts, photos, music or tracker links were found in this captured development topic.');
    if(posts.some(post=>!post.profiles?.length&&plain(post.text).length>600))note('Long-form development writing is preserved in the source capture; this helper imports structured fields, music and explicit tracker links only.');
    const usedImages=new Set([character.portrait,character.avatar,...(character.polaroids||[]).map(photo=>photo.image)]);
    const otherImages=new Set(posts.flatMap(post=>(post.images||[]).map(image=>image.src)).filter(image=>Dossier.safeUrl(image)&&!usedImages.has(image)));
    if(otherImages.size)note(otherImages.size+' additional source images remain in the captured posts; no polaroid or relationship-photo roles were guessed.');
    if(detail.counts.songs&&character.songs.some(song=>/^Spotify (?:track|album)$/.test(song.title)))note('Spotify IDs are preserved exactly. Track names and artists were not supplied in the embeds; players display their own current metadata.');
  }
  return {characters,metadata};
}

module.exports={apply,trackerEntries,spotify};
