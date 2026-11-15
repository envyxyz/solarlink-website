const L=require('./lib');const {fs,path}=L;
const files=fs.readdirSync(path.join(L.ROOT,'projects')).filter(f=>f.endsWith('.html')&&f!=='index.html').sort();
const out=[];
for(const f of files){const rp='projects/'+f;const $=L.load(rp);
 const m=L.mainEl($).clone();m.find('script,style,noscript').remove();
 const get=l=>{let v=null;m.find('p,dt,span,div').each((i,e)=>{if(v===null&&L.clean($(e).text()).toLowerCase()===l.toLowerCase()&&$(e).children().length===0){const n=$(e).next();v=L.clean(n.text())||null;}});return v;};
 const text=L.clean(m.text());
 const secs={};m.find('h2').each((i,e)=>{secs[L.clean($(e).text())]=1;});
 const loc=get('Location'),size=get('System Size'),type=get('System Type'),cat=get('Category');
 const brands=[];m.find('span.rounded-full').each((i,e)=>{const t=L.clean($(e).text());if(t)brands.push(t);});
 const overview=[];m.find('p').each((i,e)=>{const t=L.clean($(e).text());if(t.length>60&&!/^Only Tier-1|^Brands may vary|Placeholder|^Get a free|^Installation photos/.test(t))overview.push(t);});
 const ba=[];m.find('p').each((i,e)=>{const t=L.clean($(e).text());if(/₨|PKR|Rs\.?|kWh|units/.test(t))ba.push(t);});
 const imgs=[];$('img').each((i,e)=>{const s=$(e).attr('src');if(s&&!imgs.find(x=>x.src===s))imgs.push({src:s,alt:$(e).attr('alt')||null,exists:fs.existsSync(path.join(L.ROOT,s.replace(/^\//,'').split('?')[0]))});});
 let ld=[];$('script[type="application/ld+json"]').each((i,e)=>{try{ld.push(JSON.parse($(e).html()));}catch(e){}});
 const art=ld.flat().find(x=>x['@type']==='Article')||{};
 const panel=text.match(/(\d+)\s*(?:x\s*)?(?:panels?|modules?)/i);
 out.push({slug:f.replace('.html',''),url:'/projects/'+f,title_tag:L.clean($('title').text()),meta_description:$('meta[name=description]').attr('content')||null,h1:L.clean($('h1').first().text()),location:loc,system_size:size,system_type:type,category:cat,equipment:brands,panel_count:panel?panel[0]:null,date:art.datePublished||null,date_modified:art.dateModified||null,sections:Object.keys(secs),overview_paragraphs:overview,money_lines:ba,images:imgs,word_count:L.words(m.text()),article_jsonld:{headline:art.headline||null,description:art.description||null}});}
fs.writeFileSync(path.join(L.OUT,'_projects_raw.json'),JSON.stringify(out,null,1));
for(const o of out)console.log(o.slug,'|',o.location,'|',o.system_size,'|',o.system_type,'|',o.category,'|',o.equipment.join('/'),'|',o.date,'|',o.word_count,'\n  ',o.money_lines.join(' || '),'\n  ',o.overview_paragraphs.join(' ## '),'\n  ',o.images.map(i=>i.src+':'+i.exists).join(' '));
