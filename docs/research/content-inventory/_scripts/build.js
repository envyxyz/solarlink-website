const fs=require('fs');
const X='C:/Users/ameer/AppData/Local/Temp/claude/bc7e5275e6529f80/d31f3b47-a48e-4473-9033-7695e8f38562/scratchpad/x/';
const OUT='C:/obsidian/05-PROJECTS/ah-growth/SolarLink/solarlink-website/docs/research/content-inventory/';
const dec=s=>s.replace(/&amp;/g,'&').replace(/&#38;/g,'&').replace(/&bull;/g,'•').replace(/&rarr;/g,'→').replace(/&middot;/g,'·').replace(/&ldquo;|&rdquo;/g,'"').replace(/&#8212;/g,'—').replace(/&#9733;/g,'★').replace(/&#39;/g,"'");
function load(slug){
  const raw=fs.readFileSync(X+slug+(slug.endsWith('.html')?'':'.html')+'.txt','utf8');
  const [head,bodyRaw]=raw.split('\n=====\n');
  const meta={};head.split('\n').forEach(l=>{const m=l.match(/^(FILE|TITLE|DESC|CANON|MAINWORDS) (.*)$/);if(m)meta[m[1]]=dec(m[2])});
  const ld=[...head.matchAll(/JSONLD (\{.*|\[.*)/g)].map(m=>{try{return JSON.parse(m[1])}catch(e){return null}}).filter(Boolean);
  let body=dec(bodyRaw).replace(/\s*\n\s*\{>/g,' {>');
  // cut footer
  const fi=body.search(/\n\s*Follow SolarLink/);
  if(fi>0) body=body.slice(0,fi);
  body=body.replace(/^\s*Skip to main content.*$/m,'');
  const lines=body.split('\n').map(l=>l.replace(/\s+/g,' ').trim()).filter(Boolean);
  return {meta,ld,lines};
}
function links(lines){
  const out=[];const seen=new Set();
  for(const l of lines){for(const m of l.matchAll(/(?:^|\s)([^{}]*?)\s*\{>([^}]*)\}/g)){
    const href=m[2];const text=m[1].replace(/^[-›\s]+/,'').trim();const k=text+href;if(seen.has(k))continue;seen.add(k);out.push({text,href});}}
  return out;
}
const strip=s=>s.replace(/\s*\{>[^}]*\}/g,'').trim();
function parse(slug){
  const {meta,ld,lines}=load(slug);
  let h1=null;const sections=[];let cur={heading:'(intro)',level:0,lines:[]};
  const faqs=[];let curQ=null;
  const push=()=>{if(cur.lines.length||cur.heading!=='(intro)')sections.push(cur)};
  const isQ=(l,next)=>/\?$/.test(strip(l))&&strip(l).length<170&&!/^[-#]/.test(l)&&next&&!/^#/.test(next);
  for(let i=0;i<lines.length;i++){
    const l=lines[i];const hm=l.match(/^(#{1,6}) ?(.*)$/);
    if(hm&&strip(hm[2])){
      const lvl=hm[1].length,t=strip(hm[2]);
      if(lvl===1&&!h1)h1=t;
      if(lvl===3&&/\?$/.test(t)){ // faq question
        curQ={question:t,answer:[]};faqs.push(curQ);cur.lines.push('\u0001Q '+t);continue;}
      curQ=null;
      if(lvl<=2||lvl===1){push();cur={heading:t,level:lvl,lines:[]};}
      else {cur.lines.push('\u0001H'+lvl+' '+t);}
      continue;
    }
    if(hm){continue}
    if(curQ){ const st=strip(l); const words=st.split(/s+/).length; const label=!/[.!?:;]/.test(st)&&words<=5; const linkOnly=/{>/.test(l)&&words<=7; const nextQ=isQ(l,lines[i+1]);
      if(label||linkOnly||nextQ){curQ=null;} else {curQ.answer.push(st);cur.lines.push(l);continue;}}
    const next=lines[i+1];
    if(isQ(l,next)&&!/^[0-9]+$/.test(strip(l))){
      curQ={question:strip(l),answer:[]};faqs.push(curQ);cur.lines.push('\u0001Q '+strip(l));continue;}
    cur.lines.push(l);
  }
  push();
  // faq answers: bounded: stop at CTA-ish lines
  faqs.forEach(f=>{f.answer=f.answer.filter(a=>a&&!/^(Get |Back to top|Our Services|How Solar Works|Residential Solar$|Learn More)/.test(a)).join(' ').trim()});
  const clean=faqs.filter(f=>f.answer.length>60);
  const bullets=[];let all=[];
  const secs=sections.map(s=>{
    const text=s.lines.filter(l=>!l.startsWith('\u0001')).map(strip).filter(x=>x&&!/^\d+$/.test(x));
    const bl=s.lines.filter(l=>/^- /.test(l)).map(l=>strip(l.replace(/^- /,'')).trim()).filter(Boolean);
    const prose=text.filter(x=>!/^- /.test(x)&&x.length>0);
    const para=prose.join(' ');
    const sents=para.match(/[^.!?]+[.!?]+(\s|$)/g)||[para];
    const summary=sents.slice(0,3).join('').trim().slice(0,520);
    const subs=s.lines.filter(l=>l.startsWith('\u0001H')).map(l=>l.replace(/^\u0001H\d /,''));
    return {heading:s.heading,level:s.level,summary,bullets:bl,subheadings:subs,questions:s.lines.filter(l=>l.startsWith('\u0001Q ')).map(l=>l.slice(3)),words:para.split(/\s+/).filter(Boolean).length};
  });
  const wc=lines.map(strip).join(' ').split(/\s+/).filter(Boolean).length;
  const ctaRe=/(Get|Call|Book|Calculate|Request|Contact|WhatsApp|Browse|View|Learn|Explore|Read|Start|Send|Talk)/i;
  const lk=links(lines);
  return {slug:slug.replace(/__/g,'/').replace(/.html$/,''),file:meta.FILE,title_tag:meta.TITLE,meta_description:meta.DESC,canonical:meta.CANON,h1,sections:secs,faqs:clean,ctas:lk.filter(x=>ctaRe.test(x.text)&&x.text.length<60),internal_links_out:[...new Set(lk.map(x=>x.href).filter(h=>h.startsWith('/')))],external_and_tel_links:[...new Set(lk.map(x=>x.href).filter(h=>!h.startsWith('/')&&!h.startsWith('#')))],main_content_word_count:wc,json_ld_types:ld.flatMap(o=>[].concat(o['@type']||[])).map(String),lines,ld};
}
module.exports={parse,load,strip};
if(require.main===module){
 const sv=['services__index.html','services__residential-solar.html','services__commercial-solar.html','services__industrial-solar.html','services__agricultural-solar.html','services__net-metering-support.html'];
 const pv=['products__index.html','products__solar-panels.html','products__inverters.html','products__batteries.html','products__accessories.html'];
 const w=(n,o)=>fs.writeFileSync(OUT+n,JSON.stringify(o,null,1));
 const strp=p=>{const {lines,ld,...r}=p;return r};
 const S=sv.map(parse);
 w('services.json',{note:'Section summaries are extractive: the first up to three sentences of each section as written on the old page (not rewritten). Bullets and FAQs are verbatim. Word count covers main content excluding header/footer chrome.',pages:S.map(strp)});
 const P=pv.map(parse);
 fs.writeFileSync(X+'_P.json',JSON.stringify(P.map(p=>p.lines)));
 w('_products_base.json',P.map(strp));
 // faqs
 const all=[];
 const files=fs.readdirSync(X).filter(f=>/\.html\.txt$/.test(f)).map(f=>f.replace('.txt',''));
 const norm=q=>q.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 const map=new Map();
 for(const f of files){
  const p=parse(f);
  const ldq=[];
  for(const o of p.ld){const arr=Array.isArray(o)?o:[o];for(const x of arr){if(x['@type']==='FAQPage')for(const q of x.mainEntity)ldq.push({question:q.name,answer:q.acceptedAnswer.text,jsonld:true})}}
  const src=p.faqs.map(x=>({...x,jsonld:false}));
  for(const q of ldq){ if(!src.some(s=>norm(s.question)===norm(q.question)))src.push(q);}
  for(const q of src){
    const k=norm(q.question);
    if(!map.has(k))map.set(k,{question:q.question,answer:q.answer,source_page:p.file,alsoOn:[],answer_variants:[]});
    else{const e=map.get(k);
      if(e.source_page!==p.file&&!e.alsoOn.includes(p.file))e.alsoOn.push(p.file);
      if(norm(e.answer)!==norm(q.answer)&&!e.answer_variants.some(v=>norm(v.answer)===norm(q.answer)))e.answer_variants.push({file:p.file,answer:q.answer});}
  }
 }
 const list=[...map.values()];
 w('faqs.json',{note:'Verbatim from visible page text, plus FAQPage JSON-LD where a page has it. source_page is the first page (alphabetical file order) where the question appears; alsoOn lists other pages; answer_variants holds differing answer text for the same question.',count:list.length,faqs:list});
 console.log('services',S.map(s=>[s.slug,s.sections.length,s.faqs.length,s.main_content_word_count]));
 console.log('faqs',list.length, list.filter(x=>x.source_page==='faqs.html').length);
}
