const L=require('./lib');const {fs,path}=L;
const raw=JSON.parse(fs.readFileSync(path.join(L.OUT,'_projects_raw.json'),'utf8'));
const out=[];const claims=[];
for(const r of raw){const $=L.load('projects/'+r.slug+'.html');const m=L.mainEl($);
 let quote=null,attr=null,verified=null;m.find('p,blockquote').each((i,e)=>{const x=L.clean($(e).text());if(!quote&&/^["“]/.test(x))quote=x;else if(quote&&!attr&&x.length<60&&/^(Homeowner|Farmer|Business)/.test(x))attr=x;else if(/^Verified/.test(x)&&!verified)verified=x;});
 const city=(r.location||'').trim();
 const loc=L.clean(m.find('dt,p,span').filter((i,e)=>L.clean($(e).text())==='Location').first().parent().text());
 const ba=r.money_lines;let before=null,after=null;
 const bl=[];m.find('p').each((i,e)=>{bl.push(L.clean($(e).text()))});
 const bi=bl.indexOf('Before Solar'),ai=bl.indexOf('After Solar');before=bi>=0?bl[bi+1]:null;after=ai>=0?bl[ai+1]:null;
 const ov=r.overview_paragraphs[1]||r.overview_paragraphs[0];
 const pct=(ov.match(/\d+%|two-thirds/)||[null])[0];
 const area=r.location, cityName=loc.replace('Location','').replace(area,'').trim()||null;
 const imgs=r.images.map(i=>({path:i.src,alt:i.alt,file_exists:i.exists,is_placeholder:/placeholder/.test(i.src)}));
 const gallery=[];m.find('img').each((i,e)=>gallery.push($(e).attr('src')));
 const obj={slug:r.slug,url:r.url,title_tag:r.title_tag,meta_description:r.meta_description,h1:r.h1,area:area,city:cityName,system_size_kw:parseFloat(r.system_size),system_type:r.system_type,category:r.category,
  equipment_brands_named:r.equipment.filter(x=>x!=='PROJECT'),equipment_models_named:null,panel_count:null,
  date_visible_on_page:null,date_in_jsonld:{datePublished:r.date,dateModified:r.date_modified},customer_name:null,customer_descriptor:attr,
  savings_or_generation_figures:{before_monthly_bill:before,after_monthly_bill:after,percentage_claim_in_text:pct,generation_kwh:null,payback_stated:/Payback in under 4 years/.test(quote||'')?'Testimonial: "Payback in under 4 years"':null,page_says_figures_are_placeholder:/Placeholder/.test(m.text())},
  testimonial:{quote,attribution:attr,verified_label:verified},
  narrative_summary:`${ov} The page lists the location as ${area}, ${cityName}, a ${r.system_size} ${r.system_type} ${(r.category||'').toLowerCase()} system. Equipment is shown only as brand tags (${r.equipment.filter(x=>x!=='PROJECT').join(', ')}), with generic text that only Tier-1 equipment is used and brands may vary. The Before & After block shows "${before}" before and "${after}" after, but the page itself labels both as "Placeholder". The testimonial reads: ${quote} (${attr}).`,
  images:imgs,all_images_are_placeholders:imgs.every(i=>i.is_placeholder),gallery_img_count:gallery.length,word_count:r.word_count,
  missing:['customer_name','panel_count','equipment_models','install_date','generation_kwh','real_photos']};
 out.push(obj);
 claims.push([r.slug,before,after,pct,quote,r.date]);}
fs.writeFileSync(path.join(L.OUT,'projects.json'),JSON.stringify({source:'solarlink-2.0/projects/*.html',note:'All 10 detail pages are templated. Before/after bills are explicitly labelled "Placeholder" on each page; all gallery images are /projects/placeholder.svg; index page nonetheless says "Every card below is a real SolarLink project". datePublished 2026-01-01 appears in JSON-LD only, identical on all 10.',index_page:idx(),projects:out},null,1));
function idx(){const $=L.load('projects/index.html');return {title_tag:L.clean($('title').text()),meta_description:$('meta[name=description]').attr('content'),h1:L.clean($('h1').first().text()),intro:'Every card below is a real SolarLink project — system specs, actual bill savings, and customer feedback. See why families and businesses across Punjab trust us.',card_count:10,images_all_placeholder:true,filter_by_city:true};}
fs.writeFileSync('_proj_claims.json',JSON.stringify(claims));
