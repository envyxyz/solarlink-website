const L=require('./lib');const $=L.load(process.argv[2]);const m=L.mainEl($).clone();m.find('script,style,noscript').remove();
m.find('h1,h2,h3,h4,p,li,td,th,tr,figcaption,dt,dd,summary,div.stat,span').each((i,e)=>{});
// block-ish text with newlines
m.find('br').replaceWith('\n');
let out=[];m.find('*').each((i,e)=>{const t=e.tagName;if(['h1','h2','h3','h4','p','li','th','td','figcaption','summary','dt','dd','blockquote'].includes(t)){const x=L.clean($(e).text());if(x)out.push((/^h\d/.test(t)?'#'.repeat(+t[1])+' ':'')+x);}else if(t==='img')out.push('[IMG '+$(e).attr('src')+' alt='+$(e).attr('alt')+']');});
console.log(out.join('\n'));
