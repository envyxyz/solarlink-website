const fs=require('fs'),path=require('path'),cheerio=require('cheerio');
const ROOT='C:/obsidian/05-PROJECTS/ah-growth/SolarLink/solarlink-2.0';
const OUT='C:/obsidian/05-PROJECTS/ah-growth/SolarLink/solarlink-website/docs/research/content-inventory';
function walk(d,res=[]){for(const f of fs.readdirSync(d,{withFileTypes:true})){if(['.git','node_modules','.backups','.audit','.agents','.dashboard','.stitch','.agency','_astro'].includes(f.name))continue;const p=path.join(d,f.name);f.isDirectory()?walk(p,res):res.push(p);}return res;}
const rel=p=>path.relative(ROOT,p).split(path.sep).join('/');
const load=f=>cheerio.load(fs.readFileSync(path.join(ROOT,f),'utf8'));
const clean=s=>(s||'').replace(/\s+/g,' ').trim();
const words=s=>clean(s)?clean(s).split(' ').length:0;
function mainEl($){let m=$('main').first();return m.length?m:$('body');}
module.exports={fs,path,cheerio,ROOT,OUT,walk,rel,load,clean,words,mainEl};
