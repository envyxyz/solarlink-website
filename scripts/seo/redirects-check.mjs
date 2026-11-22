// Redirect gate: `node scripts/seo/redirects-check.mjs`. Exits 1 on any failure.
// Checks public/_redirects (Cloudflare syntax) against src/routes.ts, the table in docs/SEO-MIGRATION.md and the
// live crawl baseline: one 301 per old URL, to its final URL, no chains, no target that will not exist.
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const { routes } = await import(pathToFileURL(`${process.cwd()}/src/routes.ts`).href);
const planned = new Set(routes.map((r) => r.path));
const errors = [];
const fail = (m) => errors.push(m);

// ---- parse _redirects: "source destination [status]", comments with #
const rules = [];
readFileSync("public/_redirects", "utf8").split(/\r?\n/).forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith("#")) return;
  const at = `_redirects:${i + 1}`;
  if (line.length > 1000) fail(`${at}: over 1000 characters`);
  const [from, to, status, ...rest] = line.split(/\s+/);
  if (!to || rest.length) return fail(`${at}: expected "source destination status": ${line}`);
  if (status !== "301") fail(`${at}: status must be 301, got ${status ?? "none"}: ${line}`);
  if (!from.startsWith("/") || !to.startsWith("/")) fail(`${at}: paths only, no host: ${line}`);
  if (/[*:]/.test(from + to)) fail(`${at}: placeholder or splat; every rule here must be static: ${line}`);
  rules.push({ from, to, at });
});
if (rules.length > 2000) fail(`${rules.length} static rules, Cloudflare allows 2000`);

const bySource = new Map();
for (const r of rules) {
  if (bySource.has(r.from)) fail(`${r.at}: duplicate source ${r.from} (first at ${bySource.get(r.from).at})`);
  else bySource.set(r.from, r);
}

// ---- every rule: no chain, no loop, target is a planned route, source is not a live route
for (const { from, to, at } of rules) {
  if (from === to) fail(`${at}: ${from} redirects to itself`);
  if (bySource.has(to)) fail(`${at}: chain ${from} -> ${to} -> ${bySource.get(to).to}`);
  if (!planned.has(to)) fail(`${at}: target ${to} is not a planned route in src/routes.ts`);
  if (planned.has(from)) fail(`${at}: source ${from} is a planned route and would never be served`);
}

// ---- every old URL is covered, and goes where the migration table says
const expected = new Map(); // old path -> final path
const want = (from, to, why) => {
  if (!expected.has(from)) expected.set(from, { to, why });
};

// 1. docs/SEO-MIGRATION.md table. Blog stubs go to the hub until the post exists (rule 8).
for (const row of readFileSync("docs/SEO-MIGRATION.md", "utf8").split(/\r?\n/)) {
  const m = row.match(/^\| (\/\S*) \| (\/\S*) \| (keep|301) \|/);
  if (!m || m[3] !== "301") continue;
  want(m[1], m[1].startsWith("/blog/") ? "/blog/" : m[2], "SEO-MIGRATION table");
}
// 2. src/routes.ts `legacy` lists.
for (const r of routes) for (const old of r.legacy ?? []) want(old, r.path, "routes.ts legacy");
// 3. Live crawl: every sitemap URL that is not a hub or the home answers only as its .html twin today.
const baseline = "docs/qa/seo-baseline-live-2026-11-15.json";
if (existsSync(baseline)) {
  const pages = JSON.parse(readFileSync(baseline, "utf8")).pages;
  for (const { path } of pages) {
    if (path.endsWith(".html")) continue; // already an old URL, covered by the table
    if (path === "/" || ["/blog/", "/outlets/", "/products/", "/projects/", "/services/"].includes(path)) continue;
    const old = `${path.replace(/\/$/, "")}.html`;
    want(old, path, "live baseline");
  }
} else console.warn(`warning: ${baseline} not found, live baseline coverage skipped`);

for (const [from, { to, why }] of expected) {
  const rule = bySource.get(from);
  if (!rule) fail(`missing: ${from} -> ${to} (${why})`);
  else if (rule.to !== to) fail(`${rule.at}: ${from} goes to ${rule.to}, expected ${to} (${why})`);
}

if (errors.length) {
  console.error(`redirects-check FAILED:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`redirects-check ok: ${rules.length} rules, ${expected.size} old URLs covered, no chains`);
