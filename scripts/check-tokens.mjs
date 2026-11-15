// Fails when a raw colour appears outside src/styles/tokens.css.
// Usage: node scripts/check-tokens.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = join(import.meta.dirname, "..", "src");
const allowedFile = join("styles", "tokens.css");
const scanned = new Set([".astro", ".tsx", ".ts", ".jsx", ".js", ".css", ".mdx", ".md"]);
// Hex colours, and rgb()/hsl()/oklch() with literal numbers. var(--x) inside rgb() is fine.
const rawColour = /#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b|\b(?:rgba?|hsla?|oklch|oklab)\(\s*[\d.]/gi;
// The browser theme-color meta cannot read a CSS variable, so that one tag may carry a hex.
const exempt = (line) => line.includes('name="theme-color"') || line.includes("token-ok");

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

const problems = [];
for (const file of walk(root)) {
  const rel = relative(root, file);
  if (rel === allowedFile) continue;
  if (!scanned.has(file.slice(file.lastIndexOf(".")))) continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (exempt(line)) return;
      const hits = line.match(rawColour);
      if (hits) problems.push(`src/${rel.split(sep).join("/")}:${i + 1}  ${hits.join(", ")}`);
    });
}

if (problems.length) {
  console.error(`Raw colours outside tokens.css (${problems.length}):\n` + problems.join("\n"));
  console.error("\nUse a semantic token (var(--sl-...) or its Tailwind alias) instead.");
  process.exit(1);
}
console.log("check-tokens: OK, no raw colours outside src/styles/tokens.css");
