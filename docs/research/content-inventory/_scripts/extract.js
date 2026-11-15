const fs=require('fs'),path=require('path');
const root='C:/obsidian/05-PROJECTS/ah-growth/SolarLink/solarlink-2.0/';
const out=process.argv[2];fs.mkdirSync(out,{recursive:true});
const dec=s=>s.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&#39;|&apos;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&rsquo;/g,"'").replace(/&ndash;/g,'-').replace(/&mdash;/g,'-');
function txt(h){
 h=h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<svg[\s\S]*?<\/svg>/gi,'').replace(/<!--[\s\S]*?-->/g,'');
 h=h.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,(m,u,t)=>t+' {>'+u+'}');
 h=h.replace(/<h([1-6])[^>]*>/gi,(m,n)=>'\n\n'+'#'.repeat(+n)+' ').replace(/<\/h[1-6]>/gi,'\n');
 h=h.replace(/<li[^>]*>/gi,'\n- ').replace(/<\/(p|div|section|tr|ul|ol|details|summary|blockquote|figure)>/gi,'\n').replace(/<br\s*\/?>/gi,'\n');
 h=h.replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi,' [img:$1] ');
 h=h.replace(/<[^>]+>/g,' ');
 h=dec(h).replace(/[ \t]+/g,' ').replace(/\n\s*\n\s*\n+/g,'\n\n');
 return h.trim();
}
for(const f of process.argv.slice(3)){
 const raw=fs.readFileSync(root+f,'utf8');
 const g=re=>{const m=raw.match(re);return m?dec(m[1]):null};
 let head=`FILE ${f}\nTITLE ${g(/<title>([\s\S]*?)<\/title>/i)}\nDESC ${g(/<meta\s+name="description"\s+content="([^"]*)"/i)||g(/<meta\s+content="([^"]*)"\s+name="description"/i)}\nCANON ${g(/<link\s+rel="canonical"\s+href="([^"]*)"/i)}\n`;
 const ld=[...raw.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(m=>m[1].replace(/\s+/g,' ').trim());
 let m=raw.match(/<main\b[\s\S]*?<\/main>/i);
 let body=m?m[0]:raw.replace(/^[\s\S]*?<body[^>]*>/i,'');
 const t=txt(body);
 head+=`MAINWORDS ${t.replace(/\{>[^}]*\}/g,'').split(/\s+/).filter(Boolean).length}\n`;
 fs.writeFileSync(path.join(out,f.replace(/\//g,'__')+'.txt'),head+'JSONLD '+ld.join('\n JSONLD ')+'\n=====\n'+t);
}
