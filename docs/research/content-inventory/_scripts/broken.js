const L=require('./lib');const {fs,path}=L;
const files=L.walk(L.ROOT).filter(f=>f.endsWith('.html')).map(L.rel);
const nav=fs.readFileSync(path.join(L.ROOT,'js/nav.js'),'utf8');
const res={};
function check(h,src){let p=h.split('#')[0].split('?')[0];if(!p||/^(mailto:|tel:|javascript:|data:)/.test(h))return;
 if(/^https?:\/\//.test(p)){const m=p.match(/^https?:\/\/(www\.)?solarlink\.com\.pk(\/.*)?$/);if(!m)return;p=m[2]||'/';}
 if(!p.startsWith('/')){p=path.posix.join(path.posix.dirname('/'+src),p);}
 const cands=[p];if(p.endsWith('/'))cands.push(p+'index.html');else{cands.push(p+'.html');cands.push(p+'/index.html');}
 const ok=cands.some(c=>{const fp=path.join(L.ROOT,c.replace(/^\//,''));return fs.existsSync(fp)&&fs.statSync(fp).isFile();});
 if(!ok){(res[h]=res[h]||new Set()).add(src);}}
for(const f of files){const $=L.load(f);$('a[href],link[href]:not([rel=canonical]),script[src],img[src]').each((i,e)=>{const h=$(e).attr('href')||$(e).attr('src');if(h&&!h.startsWith('#')&&!(e.tagName==='link'&&/canonical|alternate/.test($(e).attr('rel')||'')))check(h,f);});}
// nav.js hrefs
for(const m of nav.matchAll(/href[:=]\s*['"]([^'"+]+)['"]/g))check(m[1],'js/nav.js');
// strict (file must be exact) pretty-url variants are flagged separately
const rows=Object.entries(res).map(([h,s])=>({href:h,count:s.size,from:[...s].slice(0,6)})).sort((a,b)=>b.count-a.count);
fs.writeFileSync('_broken.json',JSON.stringify(rows,null,1));console.log(rows.length);rows.forEach(r=>console.log(r.href,r.count,r.from.slice(0,3).join(',')));
