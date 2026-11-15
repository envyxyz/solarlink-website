// Checks WCAG contrast for the colour pairs the design system allows, read straight from tokens.css.
// Usage: node scripts/check-contrast.mjs
import { readFileSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync(join(import.meta.dirname, "..", "src", "styles", "tokens.css"), "utf8");
const prim = Object.fromEntries([...css.matchAll(/--sl-((?:green|neutral|amber|blue|red)-\d+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);

// [label, foreground, background, minimum]. 4.5 = body text, 3 = large text and UI parts.
const pairs = [
  // Dark theme
  ["dark: text on bg", "neutral-50", "neutral-950", 4.5],
  ["dark: text on raised", "neutral-50", "neutral-925", 4.5],
  ["dark: text on overlay", "neutral-50", "neutral-900", 4.5],
  ["dark: muted text on bg", "neutral-400", "neutral-950", 4.5],
  ["dark: muted text on overlay", "neutral-400", "neutral-900", 4.5],
  ["dark: subtle text on bg", "neutral-500", "neutral-950", 4.5],
  ["dark: accent text on bg", "green-400", "neutral-950", 4.5],
  ["dark: accent text on overlay", "green-400", "neutral-900", 4.5],
  ["dark: text on accent fill", "neutral-1000", "green-400", 4.5],
  ["dark: text on accent hover fill", "neutral-1000", "green-300", 4.5],
  ["dark: strong border on bg", "neutral-500", "neutral-950", 3],
  ["dark: warning on bg", "amber-400", "neutral-950", 4.5],
  ["dark: danger on bg", "red-400", "neutral-950", 4.5],
  ["dark: info on bg", "blue-400", "neutral-950", 4.5],
  ["dark: viz load on bg", "neutral-300", "neutral-950", 3],
  // Light theme
  ["light: text on bg", "neutral-950", "neutral-50", 4.5],
  ["light: text on raised", "neutral-950", "neutral-0", 4.5],
  ["light: muted text on bg", "neutral-600", "neutral-50", 4.5],
  ["light: muted text on inset", "neutral-600", "neutral-100", 4.5],
  ["light: accent text on bg", "green-800", "neutral-50", 4.5],
  ["light: accent text on raised", "green-800", "neutral-0", 4.5],
  ["light: accent text on soft fill", "green-800", "green-50", 4.5],
  ["light: text on accent fill", "neutral-1000", "green-400", 4.5],
  ["light: strong border on bg", "neutral-500", "neutral-50", 3],
  ["light: accent border on bg", "green-600", "neutral-50", 2.5],
  ["light: warning on bg", "amber-700", "neutral-50", 4.5],
  ["light: danger on bg", "red-700", "neutral-50", 4.5],
  ["light: info on bg", "blue-700", "neutral-50", 4.5],
  ["light: viz solar on bg", "green-600", "neutral-50", 2.5],
  ["light: viz load on bg", "neutral-500", "neutral-50", 3],
];

let failed = 0;
for (const [label, fg, bg, min] of pairs) {
  if (!prim[fg] || !prim[bg]) {
    console.error(`MISSING token for "${label}": ${fg} / ${bg}`);
    failed++;
    continue;
  }
  const r = ratio(prim[fg], prim[bg]);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "FAIL"} ${r.toFixed(2).padStart(5)} (min ${min})  ${label}  ${prim[fg]} on ${prim[bg]}`);
}
// The one pair that must never be used: the logo green as text on a light surface.
console.log(`note ${ratio(prim["green-400"], prim["neutral-0"]).toFixed(2)}  green-400 on white: never used for text or thin lines`);
if (failed) {
  console.error(`\ncheck-contrast: ${failed} pair(s) failed`);
  process.exit(1);
}
console.log("\ncheck-contrast: OK");
