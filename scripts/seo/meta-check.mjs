// Head and schema gate for a built site: `node scripts/seo/meta-check.mjs [--preview]` (run after `next build`).
// Every page: title, description, one canonical in the https://solarlink.com.pk/path/ form, Open Graph, Twitter, one
// BreadcrumbList. Every JSON-LD block: parses, allowed type, required properties, absolute URLs, no rating, review or
// price, FAQ text visible on the page. Sitemap: every URL has a built page and a YYYY-MM-DD lastmod.
// --preview: the build is a SOLARLINK_PREVIEW build, so every page must be noindex; otherwise none may be (404 excepted).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ORIGIN = "https://solarlink.com.pk";
const preview = process.argv.includes("--preview");
const errors = [];
const warns = [];
const fail = (where, m) => errors.push(`${where}: ${m}`);

const ALLOWED = new Set(["Organization", "WebSite", "HomeAndConstructionBusiness", "FAQPage", "BreadcrumbList", "Service", "Article"]);
const REQUIRED = {
  Organization: ["name", "url", "logo"],
  WebSite: ["name", "url"],
  HomeAndConstructionBusiness: ["name", "address", "url"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Service: ["name", "description", "provider"],
  Article: ["headline", "mainEntityOfPage", "dateModified", "author", "publisher"],
};
const FORBIDDEN_KEYS = new Set(["aggregateRating", "AggregateRating", "review", "Review", "reviewRating", "ratingValue", "reviewCount", "offers", "price", "priceRange", "lowPrice", "highPrice"]);
const URL_KEYS = new Set(["url", "item", "logo", "image", "mainEntityOfPage", "@id"]);

function* files(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* files(p);
    else yield p;
  }
}

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metas = (html) => [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => m[0]);
const metaContent = (html, key, val) => {
  const tag = metas(html).find((t) => attr(t, key) === val);
  return tag ? attr(tag, "content") : undefined;
};
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function walk(v, visit, key = "") {
  if (Array.isArray(v)) return v.forEach((x) => walk(x, visit, key));
  if (v && typeof v === "object") {
    visit(v, key);
    for (const [k, x] of Object.entries(v)) walk(x, visit, k);
  }
}

function checkLd(where, html, canonicalUrl) {
  const visible = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const nodes = [];
  blocks.forEach((raw, i) => {
    let data;
    try {
      data = JSON.parse(raw.replace(/\\u003c/g, "<"));
    } catch (e) {
      return fail(where, `JSON-LD block ${i + 1} is not valid JSON (${e.message})`);
    }
    if (data["@context"] !== "https://schema.org") fail(where, `JSON-LD block ${i + 1}: @context must be https://schema.org`);
    nodes.push(...(data["@graph"] ?? [data]));
    walk(data, (o, k) => {
      for (const bad of Object.keys(o)) if (FORBIDDEN_KEYS.has(bad)) fail(where, `JSON-LD has forbidden property ${bad}`);
      for (const [k2, v2] of Object.entries(o)) {
        if (URL_KEYS.has(k2) && typeof v2 === "string" && !v2.startsWith(`${ORIGIN}/`) && v2 !== ORIGIN) fail(where, `JSON-LD ${k2} is not an absolute ${ORIGIN} URL: ${v2}`);
      }
    });
  });
  for (const n of nodes) {
    const type = n["@type"];
    if (!ALLOWED.has(type)) {
      fail(where, `JSON-LD type ${type} is not in the allowed set`);
      continue;
    }
    for (const prop of REQUIRED[type]) if (n[prop] === undefined || n[prop] === "") fail(where, `${type} is missing ${prop}`);
    if (type === "FAQPage") {
      for (const q of n.mainEntity ?? []) {
        for (const t of [q.name, q.acceptedAnswer?.text]) if (!t || !visible.includes(t.replace(/\s+/g, " "))) fail(where, `FAQPage text is not visible on the page: ${String(t).slice(0, 60)}`);
      }
    }
    if (type === "BreadcrumbList") {
      const items = n.itemListElement ?? [];
      items.forEach((it, i) => it.position !== i + 1 && fail(where, "BreadcrumbList positions are not 1..n"));
      if (!items.length || items.at(-1)?.item !== canonicalUrl) fail(where, `BreadcrumbList must end at the page's canonical (${items.at(-1)?.item})`);
    }
  }
  const types = nodes.map((n) => n["@type"]);
  return types;
}

if (!existsSync("out")) {
  console.error("meta-check: out/ missing, build first");
  process.exit(1);
}

const titles = new Map();
const pageUrls = new Set();
let pages = 0;
for (const p of files("out")) {
  if (!p.endsWith("index.html")) continue;
  const rel = relative("out", p).split(sep).join("/");
  const route = rel === "index.html" ? "/" : `/${rel.replace(/index\.html$/, "")}`;
  if (/^(404|_not-found)\//.test(rel) || rel === "404.html") continue;
  pages++;
  pageUrls.add(`${ORIGIN}${route}`);
  const html = readFileSync(p, "utf8");
  const where = route;
  const canonicalUrl = `${ORIGIN}${route}`;

  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const desc = metaContent(html, "name", "description");
  if (!title) fail(where, "no <title>");
  else {
    const t = decode(title);
    if (t.length > 70) fail(where, `title is ${t.length} chars`);
    else if (t.length > 62) warns.push(`${where}: title is ${t.length} chars`);
    if (titles.has(t)) fail(where, `duplicate title with ${titles.get(t)}`);
    titles.set(t, where);
  }
  if (!desc) fail(where, "no meta description");
  else if (decode(desc).length > 160) fail(where, `description is ${decode(desc).length} chars`);

  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  if (canon.length !== 1 || canon[0] !== canonicalUrl) fail(where, `canonical must be ${canonicalUrl}, found ${canon.join(", ") || "none"}`);

  for (const k of ["og:title", "og:description", "og:image", "og:url", "og:type", "og:site_name"]) if (!metaContent(html, "property", k)) fail(where, `no ${k}`);
  if (metaContent(html, "property", "og:url") !== canonicalUrl) fail(where, "og:url differs from canonical");
  const og = metaContent(html, "property", "og:image");
  if (og && !(og.startsWith(`${ORIGIN}/`) && existsSync(`out${og.slice(ORIGIN.length)}`))) fail(where, `og:image is not a shipped absolute URL: ${og}`);
  if (!metaContent(html, "name", "twitter:card")) fail(where, "no twitter:card");

  const robots = metaContent(html, "name", "robots") ?? "";
  if (preview && !/noindex/.test(robots)) fail(where, "preview page must be noindex");
  if (!preview && /noindex/.test(robots)) fail(where, "production page is noindex");

  const types = checkLd(where, html, canonicalUrl) ?? [];
  if (types.filter((t) => t === "BreadcrumbList").length !== 1) fail(where, "needs exactly one BreadcrumbList");
  if (route === "/") for (const t of ["Organization", "WebSite"]) if (!types.includes(t)) fail(where, `home needs ${t}`);
  if (/^\/services\/[^/]+\/$/.test(route) && !types.includes("Service")) fail(where, "service page needs Service");
  if (/^\/blog\/[^/]+\/$/.test(route) && !types.includes("Article")) fail(where, "blog post needs Article");
  if (preview && /^\/outlets\/[^/]+\/$/.test(route) && !types.includes("HomeAndConstructionBusiness")) fail(where, "outlet page needs its LocalBusiness");
}

// KEYWORD-MAP title phrase (advisory: the table is candidates until Search Console data arrives, and its notes say
// which live words to drop, so a miss is a warning for a person to read, not a failure)
const norm = (s) => decode(s).toLowerCase().replace(/&|\band\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
let phraseMisses = 0;
for (const row of readFileSync("docs/KEYWORD-MAP.md", "utf8").split(/\r?\n/)) {
  const m = row.match(/^\| `([^`]+)` \| [^|]* \| ([^|]*) \|/);
  if (!m || !pageUrls.has(`${ORIGIN}${m[1]}`)) continue;
  const phrase = m[2].replace(/\(.*?\)/g, "").trim();
  if (!phrase || /^none/i.test(phrase) || phrase.includes("...")) continue;
  const title = [...titles].find(([, r]) => r === m[1])?.[0];
  if (title && !norm(title).includes(norm(phrase))) {
    phraseMisses++;
    warns.push(`${m[1]}: title "${decode(title)}" lacks KEYWORD-MAP phrase "${phrase}"`);
  }
}

// sitemap
const sm = existsSync("out/sitemap.xml") ? readFileSync("out/sitemap.xml", "utf8") : "";
const entries = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: m[1].match(/<loc>([^<]*)/)?.[1], lastmod: m[1].match(/<lastmod>([^<]*)/)?.[1] }));
if (!entries.length) fail("sitemap.xml", "no entries");
for (const { loc, lastmod } of entries) {
  if (!pageUrls.has(loc)) fail("sitemap.xml", `${loc} has no built page`);
  if (!/^\d{4}-\d{2}-\d{2}/.test(lastmod ?? "")) fail("sitemap.xml", `${loc} has no lastmod date`);
}
for (const u of pageUrls) if (!entries.some((e) => e.loc === u)) fail("sitemap.xml", `${u} is built but not listed`);
if (!preview && /\/dev\//.test(sm)) fail("sitemap.xml", "lists a dev route");

// robots.txt and llms.txt
const robotsTxt = existsSync("out/robots.txt") ? readFileSync("out/robots.txt", "utf8") : "";
if (/^\s*Disallow:\s*\S/m.test(robotsTxt)) fail("robots.txt", "has a Disallow rule (noindex needs the page to stay crawlable)");
if (!preview && !robotsTxt.includes(`${ORIGIN}/sitemap.xml`)) fail("robots.txt", "production robots.txt must name the sitemap");
if (preview && /sitemap:/i.test(robotsTxt)) fail("robots.txt", "a preview build must not name its sitemap");
const llms = existsSync("out/llms.txt") ? readFileSync("out/llms.txt", "utf8") : "";
if (!llms.startsWith("# ")) fail("llms.txt", "missing or does not start with a title");
for (const m of llms.matchAll(/\]\((https?:[^)]+)\)/g)) if (!pageUrls.has(m[1])) fail("llms.txt", `${m[1]} is not a built page`);

for (const w of warns) console.warn(`warn ${w}`);
if (errors.length) {
  console.error(`meta-check FAILED (${pages} pages):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`meta-check ok: ${pages} pages, ${entries.length} sitemap URLs${preview ? " (preview)" : ""}`);
