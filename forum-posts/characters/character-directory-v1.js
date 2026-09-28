(function(){
var root=document.currentScript.closest('.bh-character-directory');
var records=JSON.parse(root.querySelector('.pc-data').textContent);
var list=root.querySelector('.pc-list');
var input=root.querySelector('.pc-input');
var count=root.querySelector('.pc-count');
var empty=root.querySelector('.pc-empty');
function make(tag,cls,text){var el=document.createElement(tag);el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function plain(value){return value.replace(/\[\/?[a-z][^\]]*\]/gi,'');}
function description(value){var result=make('p','pc-description');var stack=[result];value.split(/(\[\/?(?:b|i|u)\])/gi).forEach(function(part){var tag=/^\[(\/?)(b|i|u)\]$/i.exec(part);if(!tag){stack[stack.length-1].append(document.createTextNode(plain(part)));return;}var name=tag[2].toLowerCase();if(!tag[1]){var el=document.createElement(name);stack[stack.length-1].append(el);stack.push(el);}else if(stack.length>1&&stack[stack.length-1].tagName.toLowerCase()===name){stack.pop();}});return result;}
function words(value){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(function(word){return word&&word!=='and';});}
function fields(value){var result={};var re=/\[(PI|PG|CD|CN)=([\s\S]*?)\](?=\s*(?:\[(?:PI|PG|CD|CN)=|$))/g;var match;while((match=re.exec(value))!==null)result[match[1]]=match[2];return result;}
records.sort(function(a,b){return a.name.localeCompare(b.name,'en',{sensitivity:'base'});});
var cards=records.map(function(record){
var parts=fields(record.code);
var card=make('article','pc-card');
var identity=make('div','pc-identity');
var images=make('div','pc-images');
['PI','PG'].forEach(function(key){var url=parts[key];if(!url||!/^https?:\/\//i.test(url))return;var img=make('img','pc-photo'+(key==='PG'?' pc-gif':''));img.src=url;img.alt=record.name+(key==='PG'?' GIF':' portrait');img.loading='lazy';img.addEventListener('error',function(){img.remove();if(!images.children.length)images.remove();});images.append(img);});
if(images.children.length)identity.append(images);
var person=make('div','pc-person');person.append(make('h3','pc-name',record.name),description(parts.CD||''));identity.append(person);card.append(identity);
var actions=make('div','pc-actions');var copy=make('button','pc-copy','Copy PI');copy.type='button';var status=make('span','pc-status','');status.setAttribute('role','status');status.setAttribute('aria-live','polite');actions.append(copy,status);card.append(actions);
var details=make('details','pc-details');var source=make('textarea','pc-code');source.readOnly=true;source.spellcheck=false;source.setAttribute('aria-label',record.name+' complete PI code');source.value=record.code;details.append(make('summary','','View PI code'),source);card.append(details);
copy.addEventListener('click',async function(){try{await navigator.clipboard.writeText(record.code);status.textContent='PI copied.';}catch(error){details.open=true;source.focus();source.select();source.setSelectionRange(0,source.value.length);status.textContent='Selected — press Ctrl+C or ⌘C.';}});
list.append(card);return {element:card,words:words(record.name+' '+plain(parts.CD||'')+' '+(parts.CN||''))};
});
function filter(){var query=words(input.value);var found=0;cards.forEach(function(card){var match=query.every(function(term){return card.words.some(function(word){return term.length===1?word===term:word.indexOf(term)!==-1;});});card.element.hidden=!match;if(match)found++;});count.textContent=query.length?found+' of '+cards.length+' characters':cards.length+' character'+(cards.length===1?'':'s')+' · A–Z';empty.hidden=found!==0;list.hidden=found===0;list.scrollTop=0;}
function clear(){input.value='';filter();input.focus();}
input.addEventListener('input',filter);input.addEventListener('keydown',function(event){if(event.key==='Escape'){event.preventDefault();clear();}});root.querySelector('.pc-clear').addEventListener('click',clear);
root.querySelector('.pc-search').hidden=false;filter();
})();
