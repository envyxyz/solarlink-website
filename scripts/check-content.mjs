// Guards the content rules: client approval, banned claims, and navigation that points at real routes.
// Usage: node scripts/check-content.mjs            lists pending approvals as warnings
//        node scripts/check-content.mjs --strict   fails while any value is unapproved (run before launch)
// Node 22.18+ runs the .ts files directly; keep content.ts and routes.ts free of enums and decorators.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const strict = process.argv.includes("--strict");
const content = await import(pathToFileURL(join(root, "src", "content.ts")).href);
const { routes } = await import(pathToFileURL(join(root, "src", "routes.ts")).href);

const errors = [];
const warnings = [];

/* 1. Values the client has not approved */
const pending = [];
(function walk(node, path) {
  if (node === null || typeof node !== "object") return;
  if ("approved" in node && "value" in node && "source" in node) {
    if (!node.approved) pending.push(`${path}  (${node.source})`);
    return;
  }
  for (const [key, value] of Object.entries(node)) walk(value, path ? `${path}.${key}` : key);
})({ site: content.site, outlets: Object.fromEntries(content.outlets.map((o) => [o.slug, o])), brands: content.brands }, "");
(strict ? errors : warnings).push(...pending.map((p) => `pending client approval: ${p}`));

/* 2. Routes: unique paths, unique primary queries, trailing slashes */
const seenPath = new Set();
const seenPrimary = new Map();
for (const route of routes) {
  if (!route.path.startsWith("/") || !route.path.endsWith("/")) errors.push(`route path must start and end with "/": ${route.path}`);
  if (route.path !== route.path.toLowerCase()) errors.push(`route path must be lowercase: ${route.path}`);
  if (seenPath.has(route.path)) errors.push(`duplicate route: ${route.path}`);
  seenPath.add(route.path);
  const other = seenPrimary.get(route.primary);
  if (other) errors.push(`two pages target "${route.primary}": ${other} and ${route.path}`);
  seenPrimary.set(route.primary, route.path);
}

/* 3. Navigation links exist as routes */
const navLinks = [...content.nav.header, ...Object.values(content.nav.footer).flat()];
for (const link of navLinks) if (!seenPath.has(link.path)) errors.push(`nav link "${link.label}" points at ${link.path}, which is not in src/routes.ts`);

/* 4. Banned claims in anything that can reach a page */
// Each pattern is a kind of claim the old site made without evidence. A line may carry one only
// when the client has confirmed it: add `claim-ok: <where it was confirmed>` in a comment on that line.
const banned = [
  [/\b\d[\d,]*\s*\+\s*(?:installations?|installs?|projects?|customers?|clients?|homes|systems|years)\b/i, "count with a plus sign"],
  [/\b\d+(?:\.\d+)?\s*(?:star|stars|\/\s*5)\b|\brated\s+\d/i, "star rating"],
  [/\b\d[\d,]*\s+(?:google\s+)?reviews\b/i, "review count"],
  [/\b(?:\d+|one|two|five|ten|twenty-five)[- ]year\s+(?:installation\s+|workmanship\s+|performance\s+|product\s+)?warranty\b/i, "warranty term"],
  [/\bsame[- ]day\b|\bwithin\s+\d+\s+(?:hours?|days?)\b|\b24\s*\/\s*7\b/i, "time promise"],
  [/\b(?:AEDB|PPIB|PEC|NEPRA)[- ](?:certified|approved|registered|licen[sc]ed)\b|\bISO\s?\d{4}/i, "certification or registration"],
  [/\bauthori[sz]ed\s+(?:dealer|distributor|partner)\b|\bofficial\s+(?:dealer|distributor|partner)\b/i, "dealer status"],
  [/\btier[- ]?1\b/i, "Tier-1 claim"],
  [/\b(?:best|no\.?\s?1|#1|number one|leading|premier|top[- ]rated|most trusted|trusted by)\b/i, "superlative"],
  [/\b(?:Rs\.?|PKR)\s?\d/i, "price"],
  [/\b\d+(?:\.\d+)?\s?%\s*(?:savings?|saving|reduction|off|lower|less|cheaper|return|roi)\b|\bsave\s+(?:up to\s+)?\d+\s?%/i, "savings percentage"],
  [/\bpayback\s+(?:in|of|within)\s+\d|\b\d+(?:\.\d+)?[- ]year\s+payback\b/i, "payback period"],
  [/\bguarantee[ds]?\b/i, "guarantee"],
  [/\bfree\s+(?:installation|maintenance|cleaning|site visit|survey|net metering)\b/i, "free service offer"],
];
const scanned = new Set([".astro", ".tsx", ".ts", ".md", ".mdx", ".json"]);
function* walkFiles(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walkFiles(path);
    else yield path;
  }
}
for (const file of walkFiles(join(root, "src"))) {
  if (!scanned.has(file.slice(file.lastIndexOf(".")))) continue;
  const rel = relative(root, file).split(sep).join("/");
  if (rel === "src/routes.ts") continue; // search queries and notes for us, never rendered as claims
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (line.includes("claim-ok:")) return;
      for (const [pattern, label] of banned) {
        const hit = line.match(pattern);
        if (hit) errors.push(`banned claim (${label}) at ${rel}:${i + 1}: "${hit[0]}"`);
      }
    });
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`FAIL  ${e}`);
console.log(`\ncheck-content: ${routes.length} routes (${routes.filter((r) => r.stage === "launch").length} at launch), ${pending.length} values pending client approval, ${errors.length} error(s)`);
process.exit(errors.length ? 1 : 0);
