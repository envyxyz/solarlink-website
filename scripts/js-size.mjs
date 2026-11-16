// Gzipped size of every script the built index.html loads (script src tags, noModule excluded: modern browsers skip it).
// Budget: React and Next baseline (empty page, measured 16 Nov 2026) plus 50 KB. Usage: node scripts/js-size.mjs [out/index.html]
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const BASELINE_KB = 170.6;
const LIMIT_KB = BASELINE_KB + 50;
const file = process.argv[2] ?? "out/index.html";
const root = file.replace(/index\.html$/, "");
const html = readFileSync(file, "utf8");
const srcs = [...new Set([...html.matchAll(/<script(?![^>]*noModule)[^>]*\ssrc="([^"]+)"/gi)].map((m) => m[1]))];
let total = 0;
const rows = srcs.map((s) => {
  const kb = gzipSync(readFileSync(join(root, s.split("?")[0]))).length / 1024;
  total += kb;
  return [kb, s];
});
rows.sort((a, b) => b[0] - a[0]).forEach(([kb, s]) => console.log(kb.toFixed(1).padStart(7), s));
console.log(`${total.toFixed(1)} KB total, limit ${LIMIT_KB.toFixed(1)} KB, spare ${(LIMIT_KB - total).toFixed(1)} KB, ${srcs.length} scripts`);
process.exit(total > LIMIT_KB ? 1 : 0);
