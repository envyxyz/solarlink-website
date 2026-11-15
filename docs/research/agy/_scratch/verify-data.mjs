import fs from "fs";
import {m,projects,qs} from "./data.mjs";
const en=JSON.parse(fs.readFileSync("../2-keywords-en.json","utf8")).map(x=>x.q.toLowerCase());
const ur=JSON.parse(fs.readFileSync("../3-keywords-ur.json","utf8")).map(x=>x.q.toLowerCase());
const paa=[];for(const f of ["../4a-serp.md","../4b-serp.md"])for(const l of fs.readFileSync(f,"utf8").split("\n")){const t=l.match(/^(?:\d+\.|-)\s+(.*\?)\s*$/);if(t)paa.push(t[1].toLowerCase())}
const E=new Set(en),U=new Set(ur),P=new Set(paa);let n=0,bad=[];
const chk=(q,sets,where)=>{n++;if(!sets.some(s=>s.has(q.toLowerCase())))bad.push(where+": "+q)};
for(const [p,v] of Object.entries(m)){v[1].forEach(q=>chk(q,[E,U],p));v[2].forEach(q=>chk(q,[U],p+" [ur]"))}
for(const [p,v] of Object.entries(projects))v[2].forEach(q=>chk(q,[E,U],p));
for(const [p,a] of Object.entries(qs)){a.forEach(q=>chk(q,[E,P],p+" [q]"));if(a.length<5||a.length>8)bad.push("count "+p+" "+a.length)}
console.log(n,"checked; bad:",bad.length);bad.forEach(b=>console.log(b));
