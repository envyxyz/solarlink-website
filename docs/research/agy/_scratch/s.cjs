const e=require("../2-keywords-en.json"),u=require("../3-keywords-ur.json");
const [,,mode,...pats]=process.argv;
const src=mode==="u"?u:e;
const qs=[...new Set(src.map(x=>x.q))];
for(const p of pats){const re=new RegExp(p,"i");const m=qs.filter(q=>re.test(q));console.log("## "+p+" ("+m.length+")\n"+m.slice(0,+process.env.N||40).join("\n"))}
