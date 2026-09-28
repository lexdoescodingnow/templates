(function(){
if(window.bhPiDirectoryV2){window.bhPiDirectoryV2.scan(document);return;}
function words(value){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(function(word){return word&&word!=='and';});}
function init(root){
if(root.pcDirectoryReadyV2)return;
var list=root.querySelector('.pc-list');
var input=root.querySelector('.pc-input');
var count=root.querySelector('.pc-count');
var empty=root.querySelector('.pc-empty');
if(!list||!input||!count||!empty)return;
var cards=Array.from(list.querySelectorAll('.pc-card')).map(function(card){
var source=card.querySelector('.pc-code code');
var details=card.querySelector('.pc-details');
var copy=card.querySelector('.pc-copy');
var status=card.querySelector('.pc-status');
if(source&&details&&copy&&status){
copy.addEventListener('click',async function(){
try{await navigator.clipboard.writeText(source.textContent);status.textContent='PI copied.';}
catch(error){details.open=true;var field=card.querySelector('.pc-code');field.focus();var selection=window.getSelection();var range=document.createRange();range.selectNodeContents(source);selection.removeAllRanges();selection.addRange(range);status.textContent='Selected — press Ctrl+C or ⌘C.';}
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
root.querySelector('.pc-clear').addEventListener('click',clear);
root.querySelector('.pc-search').hidden=false;
root.pcDirectoryReadyV2=true;
filter();
}
function scan(scope){if(scope.nodeType===1&&scope.matches('.bh-character-directory.pc-v2'))init(scope);if(scope.querySelectorAll)scope.querySelectorAll('.bh-character-directory.pc-v2').forEach(init);}
window.bhPiDirectoryV2={scan:scan};
scan(document);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){scan(document);},{once:true});
if(window.MutationObserver&&document.documentElement){new MutationObserver(function(changes){changes.forEach(function(change){change.addedNodes.forEach(function(node){if(node.nodeType===1)scan(node);});});}).observe(document.documentElement,{childList:true,subtree:true});}
})();
