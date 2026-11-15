const L=require('./lib');const {fs,path}=L;
const files=L.walk(L.ROOT).filter(f=>f.endsWith('.html')).map(L.rel).sort();
const q=s=>'"'+String(s==null?'':s).replace(/"/g,'""')+'"';
const rows=[['path','title','meta_description','canonical','robots','h1','main_words','jsonld_types','internal_links']];
for(const f of files){const $=L.load(f);
 const m=L.mainEl($).clone();m.find('script,style,noscript').remove();
 const types=new Set();
 $('script[type="application/ld+json"]').each((i,e)=>{try{const j=JSON.parse($(e).html());const walk=o=>{if(Array.isArray(o))o.forEach(walk);else if(o&&typeof o==='object'){if(o['@type'])[].concat(o['@type']).forEach(t=>types.add(t));Object.values(o).forEach(walk);}};walk(j);}catch(e){types.add('PARSE_ERROR');}});
 let il=0;$('a[href]').each((i,e)=>{const h=$(e).attr('href');if(/^(https?:)?\/\//.test(h)){if(/solarlink\.com\.pk/.test(h))il++;}else if(!/^(mailto:|tel:|javascript:|#|wa\.me)/.test(h))il++;});
 rows.push([f,L.clean($('title').first().text()),$('meta[name=description]').attr('content'),$('link[rel=canonical]').attr('href'),$('meta[name=robots]').attr('content'),L.clean($('h1').first().text()),L.words(m.text()),[...types].join('|'),il].map(q));}
fs.writeFileSync(path.join(L.OUT,'pages.csv'),rows.map(r=>r.join(',')).join('\n')+'\n');console.log(rows.length-1);
