(function(){
if(window.bhPiDirectoryLocationsV1){window.bhPiDirectoryLocationsV1.scan(document);return;}
var entries=__PI_DIRECTORY_LOCATIONS__;
function words(value){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(function(word){return word&&word!=='and';});}
function matches(query,haystack){return query.every(function(term){return haystack.some(function(word){return term.length===1?word===term:word.indexOf(term)!==-1;});});}
entries.forEach(function(entry){entry.identity=words(entry.name+' '+entry.nickname);entry.search=words(entry.name+' '+entry.description);});
function findCard(name){return Array.from(document.querySelectorAll('.bh-character-directory.pc-v2 .pc-card')).find(function(card){var title=card.querySelector('.pc-name');return title&&title.textContent===name;});}
function reveal(name){var card=findCard(name);if(!card)return;var root=card.closest('.bh-character-directory.pc-v2');var input=root.querySelector('.pc-input');input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));card.hidden=false;root.querySelector('.pc-list').hidden=false;var title=card.querySelector('.pc-name');title.setAttribute('tabindex','-1');if(card.scrollIntoView)card.scrollIntoView({block:'center',behavior:'auto'});title.focus({preventScroll:true});}
function init(root){
if(root.pcLocationsReadyV1)return;
var input=root.querySelector('.pc-input'),search=root.querySelector('.pc-search'),empty=root.querySelector('.pc-empty');
if(!input||!search||!empty)return;
var help=document.createElement('p');help.className='pc-location-help-v1';help.textContent='Search all '+entries.length+' characters. Results show their forum section.';
var count=document.createElement('p');count.className='pc-location-count-v1';count.setAttribute('role','status');count.setAttribute('aria-live','polite');count.hidden=true;
var results=document.createElement('div');results.className='pc-locations-v1';results.setAttribute('role','list');results.setAttribute('aria-label','Matching characters and forum sections');results.hidden=true;
search.insertAdjacentElement('afterend',help);help.insertAdjacentElement('afterend',count);count.insertAdjacentElement('afterend',results);
input.setAttribute('aria-label','Search all characters by name, nickname, partner, group or face claim');input.placeholder='Search all characters…';
function filter(){
var query=words(input.value);results.replaceChildren();count.hidden=!query.length;results.hidden=!query.length;
if(!query.length){empty.textContent='No matching characters in this section.';return;}
var found=entries.filter(function(entry){return matches(query,entry.search);}).map(function(entry){var joined=query.join(' ');var exact=joined===words(entry.name).join(' ')||joined===words(entry.nickname).join(' ');return {entry:entry,rank:exact?0:matches(query,entry.identity)?1:2};}).sort(function(a,b){return a.rank-b.rank||a.entry.order-b.entry.order;});
count.textContent=found.length+' matching character'+(found.length===1?'':'s')+' across all '+entries.length+' · locations below';
if(!found.length){results.hidden=true;count.textContent='No matches across all '+entries.length+' characters.';}
found.forEach(function(result){
var entry=result.entry,available=!!findCard(entry.name),row=document.createElement('div'),item=document.createElement(available?'button':'div'),name=document.createElement('strong'),location=document.createElement('span'),hint=document.createElement('span');
row.setAttribute('role','listitem');item.className='pc-location-v1';item.setAttribute('data-character',entry.name);name.className='pc-location-name-v1';name.textContent=entry.name;location.className='pc-location-section-v1';location.textContent='Part '+entry.part+' · '+entry.range;hint.className='pc-location-hint-v1';hint.textContent=available?'Show entry on this page':'Open this forum section';
if(result.rank===2)hint.textContent='Related profile match · '+hint.textContent;
if(available){item.type='button';item.setAttribute('aria-label','Show '+entry.name+' in '+location.textContent);item.addEventListener('click',function(){reveal(entry.name);});}
item.append(name,location,hint);row.append(item);results.append(row);
});
empty.textContent=found.length?'No matching cards in this section. Use the locations above.':'No matching characters in this section.';
}
input.addEventListener('input',filter);
root.querySelector('.pc-clear').addEventListener('click',filter);
input.addEventListener('keydown',function(event){if(event.key==='Escape')filter();});
root.pcLocationsReadyV1=true;filter();
}
function scan(scope){if(scope.nodeType===1&&scope.matches('.bh-character-directory.pc-v2'))init(scope);if(scope.querySelectorAll)scope.querySelectorAll('.bh-character-directory.pc-v2').forEach(init);}
window.bhPiDirectoryLocationsV1={scan:scan};scan(document);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){scan(document);},{once:true});
if(window.MutationObserver&&document.documentElement)new MutationObserver(function(changes){changes.forEach(function(change){change.addedNodes.forEach(function(node){if(node.nodeType===1)scan(node);});});}).observe(document.documentElement,{childList:true,subtree:true});
})();
