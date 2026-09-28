(function(){
var script=document.currentScript;
var root=script&&script.closest('.bh-template-directory');
if(!root)return;
var list=root.querySelector('.bhtd-list');
var header=root.querySelector('.bhtd-header');
var count=root.querySelector('.bhtd-count');
var empty=root.querySelector('.bhtd-empty');
var input=root.querySelector('.bhtd-input');
var clear=root.querySelector('.bhtd-clear');
function words(value){return value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(/\s+/).filter(function(word){return word&&word!=='and';});}
var entries=Array.from(list.querySelectorAll('.bhtd-entry')).map(function(link){return {link:link,words:words(link.textContent),name:link.querySelector('.bhtd-flavour').textContent};});
entries.sort(function(a,b){return a.name.localeCompare(b.name,'en',{sensitivity:'base'});});
entries.forEach(function(entry){list.appendChild(entry.link);});
root.insertBefore(header,list);
root.insertBefore(count,list);
function filter(){
var query=words(input.value);
var total=0;
entries.forEach(function(entry){var show=query.every(function(term){return entry.words.some(function(word){return term.length===1?word===term:word.indexOf(term)!==-1;});});entry.link.hidden=!show;if(show)total++;});
count.textContent=query.length?total+' of '+entries.length+' entries':entries.length+' entries · A–Z';
empty.hidden=total!==0;
list.hidden=total===0;
clear.disabled=input.value.length===0;
list.scrollTop=0;
}
function reset(){input.value='';filter();input.focus();}
input.addEventListener('input',filter);
input.addEventListener('keydown',function(event){if(event.key==='Escape'){event.preventDefault();reset();}});
clear.addEventListener('click',reset);
root.querySelector('.bhtd-search').hidden=false;
filter();
})();
