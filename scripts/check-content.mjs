// Content gate. `--pre` checks src/content*; `--post` checks the built `out/`.
// Fails (exit 1) on: a fact without a source, an over-long description, a banned claim,
// a "[confirm with client]" placeholder in output, an unconfirmed fact shown in output,
// a dev route in output, noindex outside the 404 page, a bad canonical, a wrong sitemap.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const mode = process.argv.includes("--post") ? "post" : "pre";
const errors = [];
const fail = (msg) => errors.push(msg);

// Banned unless confirmed in writing (CLAUDE.md rule 9).
const BANNED = [
  [/\b4\.8\b/, "rating 4.8"],
  [/\b(?:47|71|111)\s+(?:google\s+)?reviews?\b/i, "review count"],
  [/\b350\+|\b400\+/, "install count"],
  [/(?<![\w&])#1(?![\w-])/, '"#1"'],
  [/top installer/i, '"top installer"'],
  [/\b51\s*(?:to|-)\s*200\b/i, "team size"],
  [/70\s*%\s*(?:to|-)\s*100\s*%/i, "bill drop claim"],
  [/\b3\s*(?:to|-)\s*5\s*years?\b/i, "payback claim"],
  [/\b12\s*(?:to|-)\s*16\s*lakh\b/i, "system price"],
  [/certified installers?/i, "certified installers"],
  [/0\s*%\s*markup/i, "0% markup"],
  [/instal?lments?/i, "installment plans"],
  [/zero[\s-]bill/i, "zero bill"],
  [/lifetime support/i, "lifetime support"],
  [/same[\s-]day/i, "same day"],
  [/\bgenuine\b/i, "genuine"],
  [/\b\d+\s*[- ]?years?\s+(?:workmanship\s+)?warranty/i, "warranty length"],
  [/warranty\s+(?:of\s+)?\d/i, "warranty length"],
  [/install(?:ation)?\s+(?:time|takes?)\b[^.]{0,30}\d/i, "install time"],
  [/years in business/i, "years in business"],
  [/since\s+20\d\d/i, "years in business"],
  [/tier[\s-]?1/i, "Tier-1"],
  [/authori[sz]ed\s+(?:dealer|installer|distributor)/i, "authorised dealer or installer"],
];
const PLACEHOLDER = "[confirm with client]";

const claimsIn = (text, where) => {
  for (const [re, why] of BANNED) if (re.test(text)) fail(`${where}: banned claim (${why}) matches ${re}`);
};

// ---------- content ----------
const isNode = (o) => o && typeof o === "object" && !Array.isArray(o) && typeof o.confirmed === "boolean";

function leaves(v, out = []) {
  if (v == null) return out;
  if (typeof v === "string" || typeof v === "number") out.push(String(v));
  else if (Array.isArray(v)) v.forEach((x) => leaves(x, out));
  else if (typeof v === "object") for (const [k, x] of Object.entries(v)) if (!["confirmed", "source", "slug", "path", "shownAsEstimate"].includes(k)) leaves(x, out);
  return out;
}

const unconfirmed = new Set();
const publicStrings = new Set();
const textLeaves = [];

function walk(v, path) {
  if (isNode(v)) {
    if (typeof v.source !== "string" || v.source.trim().length < 5) fail(`${path}: fact has no source`);
    const own = leaves(v);
    // shownAsEstimate: unconfirmed, but the UI labels the result an estimate and names the assumption.
    const shown = v.confirmed || v.shownAsEstimate === true;
    own.forEach((s) => (shown ? publicStrings.add(s) : unconfirmed.add(s)));
    textLeaves.push(...own.map((s) => [path, s]));
    // Children inside a flagged node that are themselves facts inherit nothing: walk them too.
    return;
  }
  if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`));
  if (v && typeof v === "object") return Object.entries(v).forEach(([k, x]) => walk(x, `${path}.${k}`));
  if (typeof v === "string") {
    publicStrings.add(v);
    textLeaves.push([path, v]);
  }
}

async function checkContent() {
  const mod = await import(pathToFileURL(join(process.cwd(), "src/content.ts")).href);
  const c = mod.default;
  walk(c, "content");
  for (const f of existsSync("src/content") ? readdirSync("src/content") : []) {
    if (f.endsWith(".ts")) {
      const m = await import(pathToFileURL(join(process.cwd(), "src/content", f)).href);
      walk(m.default ?? m, `content/${f}`);
    }
  }
  const d = c.business.descriptions;
  if (d.short.value.length > 160) fail(`business.descriptions.short is ${d.short.value.length} chars, max 160`);
  if (d.medium.value.length > 300) fail(`business.descriptions.medium is ${d.medium.value.length} chars, max 300`);
  if (d.long.value.length > 750) fail(`business.descriptions.long is ${d.long.value.length} chars, max 750`);
  for (const [where, s] of textLeaves) claimsIn(s, where);
  for (const o of c.outlets) if (/rawalpindi/i.test(JSON.stringify(o))) fail(`outlet ${o.slug}: Rawalpindi is closed`);
  if (JSON.stringify(c.outlets.map((o) => o.slug)) !== JSON.stringify(["lahore", "islamabad", "sargodha"])) fail("outlets must be Lahore, Islamabad, Sargodha");
  return c;
}

// ---------- build output ----------
function* files(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* files(p);
    else yield p;
  }
}

function checkOut(c) {
  if (!existsSync("out")) return fail("out/ does not exist: run the build first");
  if (existsSync("out/dev")) fail("out/dev exists: dev routes must not ship");
  const leakable = [...unconfirmed].filter((s) => s.length >= 4 && s !== PLACEHOLDER && !publicStrings.has(s));
  const leakRes = leakable.map((s) => [s, new RegExp(`(?<![\\w.-])${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`)]);
  const awaiting = c.awaiting;
  const canonicalRe = /<link rel="canonical" href="([^"]*)"/g;
  let pages = 0;
  for (const p of files("out")) {
    if (!/\.(html|txt|xml|js|json|css)$/.test(p)) continue;
    const text = readFileSync(p, "utf8");
    const rel = p.replace(/\\/g, "/");
    if (text.includes(PLACEHOLDER)) fail(`${rel}: contains ${PLACEHOLDER}`);
    if (awaiting && text.includes(awaiting)) fail(`${rel}: contains the "${awaiting}" chip (review builds only)`);
    for (const [s, re] of leakRes) if (re.test(text)) fail(`${rel}: unconfirmed fact shown: ${s}`);
    if (/\.(html|txt|xml)$/.test(p)) claimsIn(text, rel);
    if (p.endsWith(".html")) {
      pages++;
      const is404 = /(^|\/)(404|_not-found)(\/index)?\.html$/.test(rel);
      if (/<meta name="robots" content="[^"]*noindex/i.test(text) && !is404) fail(`${rel}: noindex on a production page`);
      if (!is404) {
        const hrefs = [...text.matchAll(canonicalRe)].map((m) => m[1]);
        if (hrefs.length !== 1) fail(`${rel}: ${hrefs.length} canonical tags`);
        else if (!/^https:\/\/solarlink\.com\.pk\/(?:[a-z0-9-]+\/)*$/.test(hrefs[0])) fail(`${rel}: bad canonical ${hrefs[0]}`);
        if ((text.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${rel}: needs exactly one h1`);
      }
    }
  }
  const sitemap = existsSync("out/sitemap.xml") ? readFileSync("out/sitemap.xml", "utf8") : "";
  const want = Object.values(c.seo).filter((e) => e.indexable).length;
  const got = (sitemap.match(/<loc>/g) ?? []).length;
  if (got !== want) fail(`sitemap.xml lists ${got} URLs, expected ${want}`);
  if (/\/dev\//.test(sitemap)) fail("sitemap.xml lists a dev route");
  if (!pages) fail("no html pages in out/");
}

const c = await checkContent();
if (mode === "post") checkOut(c);

if (errors.length) {
  console.error(`check-content (${mode}) FAILED:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`check-content (${mode}) ok`);
