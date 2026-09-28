(function(){
if(window.bhPiDirectoryV2&&window.bhPiDirectoryV2.version===5){window.bhPiDirectoryV2.scan(document);return;}
function words(value){return value.normalize('NFKD').replace(new RegExp('['+String.fromCharCode(768)+'-'+String.fromCharCode(879)+']','g'),'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(' ').filter(function(word){return word&&word!=='and';});}
function init(root){
if(root.pcDirectoryReadyV2)return;
var list=root.querySelector('.pc-list');
var count=root.querySelector('.pc-count');
var empty=root.querySelector('.pc-empty');
if(!list||!count||!empty)return;
var search=root.querySelector('.pc-search');
if(!search){search=document.createElement('div');search.className='pc-search';count.insertAdjacentElement('beforebegin',search);}
var input=search.querySelector('.pc-input');
if(!input){var label=document.createElement('label');input=document.createElement('input');input.className='pc-input';input.type='search';input.setAttribute('aria-label','Search names, partners, groups or face claims');input.placeholder='Name, partner, group or face claim…';input.autocomplete='off';input.spellcheck=false;label.append(input);search.prepend(label);}
var clearButton=search.querySelector('.pc-clear');
if(!clearButton){clearButton=document.createElement('button');clearButton.className='pc-clear';clearButton.type='button';clearButton.textContent='Clear';search.append(clearButton);}
var cards=Array.from(list.querySelectorAll('.pc-card')).map(function(card){
var source=card.querySelector('.pc-code code');
var details=card.querySelector('.pc-details');
var copy=card.querySelector('.pc-copy');
var status=card.querySelector('.pc-status');
var actions=card.querySelector('.pc-actions');
if(!actions){actions=document.createElement('div');actions.className='pc-actions';card.querySelector('.pc-details').insertAdjacentElement('beforebegin',actions);}
if(!status){status=document.createElement('span');status.className='pc-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');actions.append(status);}
if(!copy&&actions){copy=document.createElement('button');copy.className='pc-copy';copy.type='button';copy.textContent='Copy PI';actions.prepend(copy);}
if(source&&details&&copy&&status){
copy.addEventListener('click',async function(){
try{await navigator.clipboard.writeText(source.textContent);status.textContent='PI copied.';}
catch(error){details.open=true;var field=card.querySelector('.pc-code');field.tabIndex=0;field.focus();var selection=window.getSelection();var range=document.createRange();range.selectNodeContents(source);selection.removeAllRanges();selection.addRange(range);status.textContent='Selected — press Ctrl+C or ⌘C.';}
});
copy.hidden=false;
}
var name=card.querySelector('.pc-name');var description=card.querySelector('.pc-description');
return {element:card,words:words((name?name.textContent:'')+' '+(description?description.textContent:''))};
});
function filter(){var query=words(input.value);var found=0;cards.forEach(function(card){var match=query.every(function(term){return card.words.some(function(word){return term.length===1?word===term:word.indexOf(term)!==-1;});});card.element.hidden=!match;if(match)found++;});count.textContent=query.length?found+' of '+cards.length+' characters':cards.length+' character'+(cards.length===1?'':'s')+' · A–Z';empty.hidden=found!==0;list.hidden=found===0;list.scrollTop=0;}
function clear(){input.value='';filter();input.focus();}
input.addEventListener('input',filter);
input.addEventListener('keydown',function(event){if(event.key==='Escape'){event.preventDefault();clear();}});
clearButton.addEventListener('click',clear);
search.hidden=false;
root.pcDirectoryReadyV2=true;
filter();
}
function scan(scope){if(scope.nodeType===1){var root=scope.closest('.bh-character-directory.pc-v2');if(root)init(root);}if(scope.querySelectorAll)scope.querySelectorAll('.bh-character-directory.pc-v2').forEach(init);}
window.bhPiDirectoryV2={version:5,scan:scan};
scan(document);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){scan(document);},{once:true});
if(window.MutationObserver&&document.documentElement){new MutationObserver(function(changes){changes.forEach(function(change){change.addedNodes.forEach(function(node){if(node.nodeType===1)scan(node);});});}).observe(document.documentElement,{childList:true,subtree:true});}
})();
