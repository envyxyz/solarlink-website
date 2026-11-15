const L=require('./lib');const {fs,path}=L;const sizeOf=require('image-size');
const files=L.walk(path.join(L.ROOT,'images')).map(L.rel).sort();
const htmls=L.walk(L.ROOT).filter(f=>/\.(html|js|css)$/.test(f)).map(L.rel);
const texts=htmls.map(f=>({f,t:fs.readFileSync(path.join(L.ROOT,f),'utf8')}));
const q=s=>'"'+String(s).replace(/"/g,'""')+'"';
const rows=[['path','bytes','width_x_height','used_by_html','used_by_js_css','ai_generated_by_filename','note']];let ai=0,zero=0;
for(const f of files){const abs=path.join(L.ROOT,f);const bytes=fs.statSync(abs).size;let dim='';
 try{if(/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(f)){const d=sizeOf(fs.readFileSync(abs));dim=d.width+'x'+d.height;}else dim='n/a';}catch(e){dim='unreadable';}
 const names=[f,encodeURI(f),f.replace(/ /g,'%20')];let h=0,o=0;
 for(const {f:g,t} of texts){if(names.some(n=>t.includes(n))){if(g.endsWith('.html'))h++;else o++;}}
 const isAI=/ChatGPT|DALL|midjourney|gemini_generated|Generated Image|image_\d+_\d+|Screenshot/i.test(path.basename(f));if(isAI)ai++;
 let note=[];if(h+o===0)note.push('unreferenced');if(bytes>500000)note.push('over 500KB');
 rows.push([f,bytes,dim,h,o,isAI?'yes':'no',note.join('; ')].map(q));}
fs.writeFileSync(path.join(L.OUT,'images.csv'),rows.map(r=>r.join(',')).join('\n')+'\n');
console.log(files.length,'ai-named',ai,'unreferenced',rows.filter(r=>/unreferenced/.test(r[6])).length);
