const L=require('./lib');const {fs,path}=L;
const files=fs.readdirSync(path.join(L.ROOT,'blog')).filter(f=>f.endsWith('.html')).sort();
for(const f of files){const $=L.load('blog/'+f);const m=L.mainEl($).clone();m.find('script,style,noscript').remove();
 let ld=[];$('script[type="application/ld+json"]').each((i,e)=>{try{ld.push(JSON.parse($(e).html()))}catch(x){}});
 const bp=ld.flat().find(x=>x['@type']==='BlogPosting')||{};
 console.log(f,L.words(m.text()),'| h2:',m.find('h2').map((i,e)=>L.clean($(e).text())).get().join(' / '),'| stub:',/Article in progress/.test(m.text()),'| tables',m.find('table').length,'| faq',/FAQ|Frequently/i.test(m.text()),'|',bp.datePublished,bp.dateModified,JSON.stringify(bp.author||null));}
