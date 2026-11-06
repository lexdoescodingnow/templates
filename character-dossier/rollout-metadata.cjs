'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Dossier = require('./dossier-model.js');
const read = file => JSON.parse(fs.readFileSync(path.join(__dirname,file),'utf8'));
const unique = list => Array.from(new Set(list.filter(Boolean)));
const clean = value => typeof value === 'string' ? value : JSON.stringify(value);
const key = value => String(value||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function apply(input, encyclopediaMetadata, developmentMetadata) {
  const characters = JSON.parse(JSON.stringify(input));
  const encyclopaedia = new Map(encyclopediaMetadata.records.map(record=>[record.id,record]));
  const development = new Map(developmentMetadata.records.map(record=>[record.id,record]));
  const sources = new Map(read('sources/encyclopedia-enrichment.json').records.map(record=>[record.id,record]));
  const devIndex = read('sources/development-index.json').topics;
  const places = read('sources/map-places.json').places;
  const byId = new Map(characters.map(record=>[record.id,record]));
  const manifest = {version:1,checkedAt:'2026-11-06',characters:[]};
  const sourceMetadata = {}, notices = {};
  for (const character of characters) {
    const e = encyclopaedia.get(character.id)||{}, d = development.get(character.id), src = sources.get(character.id);
    const fields = new Set(['name','nickname','age','pronouns','occupation','avatar','relationshipStatus','relationships','facts',...(e.fields||[]),...(d?.fields||[])]);
    const rowSources = (e.sources||[]).map(source=>({...source}));
    const notes = [...(e.notes||[]),...(d?.notes||[])].map(clean);
    if (d?.url) rowSources.push({kind:'development',url:d.url,fields:d.fields||[]});
    if (character.id!=='baek-samuel') {
      const entry=d?.url && devIndex.find(item=>item.url===d.url);
      const writer=entry?.text.match(/by\s+(lex|sara)\s*$/i)?.[1]?.toLowerCase();
      character.writer=writer ? (writer==='lex'?'Lex':'Sara') : '';
      fields.add('writer');
      notes.push(writer ? 'Writer is taken from the development topic’s named author.' : 'Calendar keeper labels do not establish the character’s writer; writer is left editable.');
    }
    if(character.id!=='baek-samuel') {
      if(!character.polaroids?.length) {
        character.polaroids=character.relationships.filter(connection=>connection.kind==='Partner').slice(0,3).map(connection=>{
          const person=byId.get(connection.id)||characters.find(c=>key(c.name)===key(connection.name));
          return {name:person?.nickname||connection.name,image:person?.avatar||connection.portrait,url:connection.url||''};
        }).filter(photo=>photo.image);
        if(character.polaroids.length){fields.add('polaroids');notes.push('Polaroids start with recorded current partners; additional closest-person choices remain editable.');}
      }
      if(!character.mapLatitude && !character.mapLongitude) {
        const residence=character.facts.find(f=>/^(residency|current residence|residence)$/i.test(f.label))?.value||character.location;
        const place=places.find(p=>String(residence||'').toLowerCase().includes(p.match));
        if(place) {
          Object.assign(character,{mapLocation:place.name,mapLatitude:place.latitude,mapLongitude:place.longitude,mapZoom:11});
          ['mapLocation','mapLatitude','mapLongitude','mapZoom'].forEach(f=>fields.add(f));
          rowSources.push({kind:'map',url:place.url,fields:['mapLocation','mapLatitude','mapLongitude']});
          notes.push('The map uses a city/community overview for the sourced residence or location.');
        }
      }
    }
    if(character.id==='baek-samuel') {
      const samSource=devIndex.find(t=>t.url.includes('showtopic=68373'));
      if(!rowSources.some(s=>s.kind==='development'))rowSources.push({kind:'development',url:samSource.url,fields:['facts','songs','timeline','portrait']});
      rowSources.push({kind:'user-confirmed',reference:'Approved Sam v5 profile and current age/partner confirmation',fields:Object.keys(character)});
      notes.push('The approved Sam profile is preserved, with verified topic-start dates added to its story links.');
    }
    const missing=[];
    if(!character.songs.length&&!character.playlistUrl)missing.push('No playlist supplied in the reviewed sources.');
    if(!character.timeline.length)missing.push('No confidently matched story or comms links found.');
    else if(character.timeline.some(t=>!t.date&&!t.postedDate))missing.push('Some entries have no established story date or verified topic-start date.');
    if(character.timeline.some(t=>t.postedDateSource)) {
      fields.add('timeline');
      rowSources.push({kind:'topic-start',path:'sources/topic-start-dates.json',fields:['timeline']});
      notes.push('Timeline entries fall back to verified topic-start dates where no in-world date has been supplied.');
    }
    if(!character.polaroids.length)missing.push('Closest-person photos have not been selected.');
    if(!character.mapLatitude||!character.mapLongitude)missing.push('No verified location pin supplied.');
    if(!character.facts.some(f=>key(f.label)==='birthday'))missing.push('Birthday not established in the reviewed sources.');
    const hasDev=!!d||character.id==='baek-samuel';
    const coverage=hasDev?'development':(e.fields||[]).length?'encyclopaedia':'directory';
    const conflicts=unique([...(e.conflicts||[]),...(d?.conflicts||[])].map(clean));
    const label={development:'Development post',encyclopaedia:'Encyclopaedia details',directory:'Directory details'}[coverage];
    const sourceUrls=unique(rowSources.map(s=>s.url)).map(url=>({url,label:url===src?.source?.url?'Encyclopaedia':url.includes('116353')?'Current directory':url===d?.url||url.includes('68373')?'Development post':'Source'}));
    const normalized=Dossier.normalizeCharacter(character);
    sourceMetadata[character.id]={revision:'cast-2026-11-06-'+crypto.createHash('sha256').update(JSON.stringify(normalized)).digest('hex').slice(0,16),coverage,label,sourceUrls,updatedAt:'2026-11-06',knownFields:[...fields]};
    notices[character.id]=[hasDev?'Imported from the existing development post and current encyclopaedia. The latest directory controls age, occupation and partners.':coverage==='encyclopaedia'?'Enriched from the current encyclopaedia and matched story/comms sources; core details follow the latest directory.':'The current directory supplies this profile. Further character details were not established in the reviewed sources.',...missing];
    manifest.characters.push({id:character.id,status:hasDev?'migrated':coverage==='encyclopaedia'?'partial':'starter',sources:rowSources,missing,notes:unique(notes),conflicts});
  }
  return {characters,manifest,sourceMetadata,notices};
}
module.exports={apply};
