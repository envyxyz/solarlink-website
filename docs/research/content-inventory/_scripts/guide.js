const L=require('./lib');const {fs,path}=L;
module.exports=function extract(rp){const $=L.load(rp);
 const m=L.mainEl($).clone();m.find('script,style,noscript').remove();
 let ld=[];$('script[type="application/ld+json"]').each((i,e)=>{try{ld.push(JSON.parse($(e).html()))}catch(x){}});ld=ld.flat();
 const art=ld.find(x=>/Article|BlogPosting/.test(x['@type']))||{};
 const faqLd=ld.find(x=>x['@type']==='FAQPage');
 const faqs=[];
 if(faqLd)(faqLd.mainEntity||[]).forEach(q=>faqs.push({q:L.clean(q.name),a:L.clean(q.acceptedAnswer&&q.acceptedAnswer.text),source:'json-ld'}));
 const domFaq=[];m.find('details').each((i,e)=>{const q=L.clean($(e).find('summary').first().text());const c=$(e).clone();c.find('summary').remove();domFaq.push({q,a:L.clean(c.text()),source:'dom'});});
 const outline=[];m.find('h1,h2,h3').each((i,e)=>outline.push({level:e.tagName,text:L.clean($(e).text())}));
 const tables=[];m.find('table').each((i,e)=>{const rows=$(e).find('tr').map((j,r)=>[$(r).find('th,td').map((k,c)=>L.clean($(c).text())).get()]).get();tables.push({caption:L.clean($(e).find('caption').text())||null,first_row:rows[0]||null,row_count:rows.length,rows});});
 const links=new Set();m.find('a[href]').each((i,e)=>{const h=$(e).attr('href');if(!/^(https?:|mailto:|tel:|#|javascript)/.test(h)||/solarlink\.com\.pk/.test(h))links.add(h.replace(/^https?:\/\/solarlink\.com\.pk/,''));});
 const ext=new Set();m.find('a[href^=http]').each((i,e)=>{const h=$(e).attr('href');if(!/solarlink\.com\.pk|wa\.me/.test(h))ext.add(h)});
 const sents=[];m.find('p,li,td,summary,figcaption,blockquote,div').each((i,e)=>{if(e.tagName==='div'&&$(e).children().length)return;const t=L.clean($(e).text());if(t)sents.push(t);});
 const seen=new Set();const facts=[];
 const numRe=/(₨|Rs\.?|PKR|\$)\s?[\d,.]+|\d[\d,.]*\s?(%|percent|kW|kWh|MW|years?|weeks?|days?|hours?|months?|units|W\b|Wp|V\b|°)|\b(19|20)\d\d\b|\b\d+(?:–|-)\d+\b/i;
 for(const t of sents){for(const s of t.split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/)){if(numRe.test(s)&&!seen.has(s)){seen.add(s);facts.push(s);}}}
 return{slug:path.basename(rp,'.html'),url:'/'+rp,title_tag:L.clean($('title').text()),meta_description:$('meta[name=description]').attr('content')||null,h1:L.clean($('h1').first().text()),subtitle:null,date_published:art.datePublished||null,date_modified:art.dateModified||null,author:art.author?{name:art.author.name,type:art.author['@type']}:null,visible_dates_or_byline:sents.filter(s=>/^(Published|Updated|Last updated|By |Reviewed)/i.test(s)),outline,faqs:faqs.length?faqs:domFaq,tables,facts_raw:facts,internal_links_out:[...links].sort(),external_links_out:[...ext],word_count:L.words(m.text()),_paras:sents};
};
