import fs from "fs";
const md=fs.readFileSync("../../../KEYWORD-MAP.md","utf8");
const en=new Set(JSON.parse(fs.readFileSync("../2-keywords-en.json","utf8")).map(x=>x.q.toLowerCase()));
const ur=new Set(JSON.parse(fs.readFileSync("../3-keywords-ur.json","utf8")).map(x=>x.q.toLowerCase()));
const paa=new Set();for(const f of ["../4a-serp.md","../4b-serp.md"])for(const l of fs.readFileSync(f,"utf8").split("\n")){const t=l.match(/^(?:\d+\.|-)\s+(.*\?)\s*$/);if(t)paa.add(t[1].toLowerCase())}
let n=0;const bad=[];const chk=(q,sets,w)=>{n++;if(!sets.some(s=>s.has(q.toLowerCase())))bad.push(w+": "+q)};
const [pre,rest]=md.split("## The map");const [map,after]=rest.split("## Questions to answer on the page");
const [qsec,after2]=after.split("## Cannibalisation watch");
let rows=0,titles=[];
for(const l of map.split("\n")){if(!l.startsWith("| `/"))continue;rows++;
 const BS=String.fromCharCode(92);
 const c=l.split(" "+BS+"| ").join(" @@ ").split("|").slice(1,-1).map(s=>s.trim().replace(/@@/g,"|"));
 if(c.length!==7)bad.push("cols "+c[0]);
 titles.push(c[2]);
 if(c[3]!=="none in data")c[3].split("; ").forEach(q=>chk(q,[en,ur],c[0]));
 if(c[4]!=="-")c[4].split("; ").forEach(q=>chk(q,[ur],c[0]+" ur"));}
for(const l of qsec.split("\n"))if(l.startsWith("- ")&&!l.startsWith("- **")&&!l.includes("Each line"))chk(l.slice(2),[en,paa],"q");
const s6=after2.split("## Queries we deliberately")[1].split("## Not yet known")[0];
for(const m of s6.matchAll(/`([^`]+)`/g))chk(m[1],[en,ur],"s6");
console.log("rows",rows,"phrases checked",n,"bad",bad.length);bad.forEach(b=>console.log(b));
console.log("unique titles",new Set(titles.map(t=>t.toLowerCase())).size,"max",Math.max(...titles.map(t=>t.length)));
console.log("emdash",(md.match(/—/g)||[]).length,"endash",(md.match(/–/g)||[]).length);
const banned=/best|cheap|#1|tier|guarantee|free|premier|leading|trusted|rs\.? ?\d|pkr|\d{2,},\d{3}|20(2\d)/i;
titles.forEach(t=>{if(banned.test(t))console.log("BANNED title:",t)});
// description examples
for(const l of pre.split("\n")){const m=l.match(/Description example: "(.*)" \(/);if(m&&banned.test(m[1]))console.log("BANNED desc:",m[1])}
