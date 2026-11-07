const fs=require('fs'),p=require('path'),d=__dirname;
const rows=[];
for(const file of ['leafie-awards-forum-masterpost.txt','leafie-encore-forum-masterpost.txt']){
 const text=fs.readFileSync(p.join(d,file),'utf8');
 const pattern=/\[size=4\]\[b\]\d+\s*-\s*(.*?)\[\/b\]\[\/size\]([\s\S]*?)(?=\[size=4\]\[b\]\d+\s*-|$)/g;
 for(const m of text.matchAll(pattern)){
  const code=m[2].match(/\[code\]\s*([\s\S]*?)\s*\[\/code\]/);
  if(!code)throw Error('Missing code: '+m[1]);
  const example=m[2].slice(0,m[2].indexOf('[code]')).trim();
  rows.push({name:m[1].trim(),hacked:/lf-hacked|en-hacked|lf-blackout1/.test(code[1]),example,code:code[1].trim()});
 }
}
for(const [name,file,hacked] of [['Ceremony Time','leafie-time-normal.txt',false],['Interrupted Time','leafie-time-hacked.txt',true]]){const code=fs.readFileSync(p.join(d,file),'utf8').trim();rows.push({name,hacked,example:code,code});}
if(rows.length!==37||new Set(rows.map(r=>r.name)).size!==37)throw Error('Expected 37 unique templates; got '+rows.length);
const posts=[];
for(const hacked of [false,true]){
 const selected=rows.filter(r=>r.hacked===hacked);
 const title='LEAFIE AWARDS: '+(hacked?'GLITCHY TEMPLATES':'NORMAL TEMPLATES');
 const text='[align=center][H1]'+title+'[/H1][/align]\n\n'+selected.map((r,i)=>'[size=4][b]'+String(i+1).padStart(2,'0')+' - '+r.name+'[/b][/size]\n\n'+r.example+'\n\n[code]\n'+r.code+'\n[/code]').join('\n\n')+'\n';
 const file='leafie-'+(hacked?'glitchy':'normal')+'-forum-masterpost.txt';
 fs.writeFileSync(p.join(d,file),text);
 posts.push({title,text,file,count:selected.length});
}
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const page='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Leafie Awards | Separate forum masterposts</title><style>body{margin:0;padding:32px 20px;background:#eeeee9;color:#292b30;font:15px/1.7 Arial,sans-serif}main{max-width:850px;margin:auto}h1{font:40px/1.1 Georgia,serif}h2{font-size:22px}section{padding:24px;margin:24px 0;border:1px solid #c6c7c0;background:#faf9f5;border-top:4px solid #668d86}section:last-of-type{border-top-color:#957c94}button{font:inherit;padding:10px 14px;margin:0 8px 8px 0;background:transparent;border:1px solid #8a8a86;border-radius:3px;cursor:pointer}textarea{box-sizing:border-box;width:100%;height:240px;font:12px/1.5 Consolas,monospace}summary{cursor:pointer;margin:10px 0}a{color:inherit}</style><main><h1>Leafie Awards masterposts</h1><p>Copy each complete masterpost into a separate forum reply. Every template has its rendered example above a short code box for Sara to copy. This includes the latest larger-GIF Encore designs.</p>'+posts.map((r,i)=>'<section><h2>'+r.title+'</h2><p>'+r.count+' templates'+(i?' - hacked replies, the time-jump divider and hacked time marker.':' - normal replies and the ceremony time marker.')+'</p><button data-copy="'+i+'">Copy complete forum post</button><button data-save="'+i+'">Download .txt</button><span role="status"></span><details><summary>Complete forum post code</summary><textarea readonly>'+esc(r.text)+'</textarea></details></section>').join('')+'<p><a href="https://github.com/lexdoescodingnow/templates/tree/main/leafie-awards">GitHub files</a></p></main><script>const posts='+JSON.stringify(posts).replaceAll('<','\\u003c')+';document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{const t=b.parentElement.querySelector("textarea");try{await navigator.clipboard.writeText(posts[b.dataset.copy].text);b.parentElement.querySelector("[role=status]").textContent="Copied"}catch(e){b.parentElement.querySelector("details").open=true;t.select();b.parentElement.querySelector("[role=status]").textContent="Selected: press Ctrl+C"}});document.querySelectorAll("[data-save]").forEach(b=>b.onclick=()=>{const item=posts[b.dataset.save],a=document.createElement("a");a.href=URL.createObjectURL(new Blob([item.text],{type:"text/plain;charset=utf-8"}));a.download=item.file;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),10000)});</script></html>';
fs.writeFileSync(p.join(d,'leafie-forum-masterposts.html'),page);
const report=posts.map(r=>({file:r.file,templates:r.count,characters:r.text.length,codeBoxes:(r.text.match(/\[code\]/g)||[]).length,previews:(r.text.match(/\[dohtml\]/g)||[]).length-r.count}));
for(const r of report)if(r.templates!==r.codeBoxes||r.previews!==r.templates||r.characters>44000)throw Error('Invalid post '+JSON.stringify(r));
const files=['build-separated-masterposts.cjs','leafie-forum-masterposts.html',...posts.map(r=>r.file)];
fs.writeFileSync(p.join(d,'masterposts-upload.json'),JSON.stringify(files.map(f=>({path:'leafie-awards/'+f,mode:'100644',type:'blob',content:fs.readFileSync(p.join(d,f),'utf8')}))));
console.log(JSON.stringify(report));
