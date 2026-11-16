// Fails when raw colour, radius, shadow or duration values appear in CSS outside tokens.css.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const bad = [
  [/#[0-9a-fA-F]{3,8}\b/, "raw hex colour"],
  [/\b(?:rgb|rgba|hsl|hsla|oklch)\(/, "raw colour function"],
  [/border-radius\s*:\s*[^;]*\d(?:px|rem)/, "raw radius"],
  [/box-shadow\s*:\s*[^;]*\d+px/, "raw shadow"],
  [/(?:transition|animation)(?:-duration)?\s*:[^;]*\b\d+(?:\.\d+)?m?s\b/, "raw duration"],
];
const files = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith(".css") && !p.endsWith("tokens.css")) files.push(p);
  }
};
walk("src");
let fail = 0;
for (const f of files) {
  readFileSync(f, "utf8").split("\n").forEach((line, i) => {
    for (const [re, why] of bad) if (re.test(line)) { console.error(`${f}:${i + 1} ${why}: ${line.trim()}`); fail++; }
  });
}
process.exit(fail ? 1 : 0);
