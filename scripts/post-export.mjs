// Post-build step on the static export (Next has no option for either). Run after `next build`; safe to run twice.
// 1. Scripts. React and Next hydrate from async <script src> tags in <head>. In the first second they compete with
//    the CSS, the font and the hero image for bandwidth and run long tasks while the page paints (Lighthouse
//    mobile, 23 Nov 2026: LCP +1.3 s, TBT 230 ms on the homepage). Load them from a small inline loader DELAY_MS
//    after `load` instead. Links are plain anchors and work before hydration; the interactive islands (quote
//    slider, phone menu) go live about DELAY_MS after `load`. Without JS nothing changes (noscript is server HTML).
// 2. Windows only. Next 16.4 builds segment file names from path.relative(), which has backslashes on Windows, so
//    `__next.$c$slug.__PAGE__.txt` is exported as `__next.$c$slug/__PAGE__.txt` and the router's prefetch 404s.
//    Linux and CI builds are correct; this renames the nested files back so local Lighthouse runs match them.
// Usage: node scripts/post-export.mjs [dir=out]
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DELAY_MS = 500;
const root = process.argv[2] ?? "out";
const kids = (d) => readdirSync(d).map((f) => [f, join(d, f), statSync(join(d, f)).isDirectory()]);
const walk = (d, ext) => kids(d).flatMap(([f, p, dir]) => (dir ? walk(p, ext) : f.endsWith(ext) ? [p] : []));

let n = 0;
for (const file of walk(root, ".html")) {
  let html = readFileSync(file, "utf8");
  if (html.includes("data-deferred")) continue;
  const srcs = [];
  // noModule scripts (polyfills) are skipped by modern browsers: leave them.
  html = html.replace(/<script src="([^"]+)"((?:(?!noModule)[^>])*)><\/script>/g, (_, src, rest) => (srcs.push([src, rest.match(/id="([^"]+)"/)?.[1] ?? ""]), ""));
  if (!srcs.length) continue;
  html = html.replace(/<link rel="preload" as="script"[^>]*\/?>/g, "");
  const loader = `<script data-deferred>(function(){var s=${JSON.stringify(srcs)},d;function go(){if(d)return;d=1;s.forEach(function(a){var e=document.createElement("script");e.src=a[0];if(a[1])e.id=a[1];e.async=true;document.head.appendChild(e)})}addEventListener("load",function(){setTimeout(go,${DELAY_MS})});if(document.readyState==="complete")setTimeout(go,${DELAY_MS});setTimeout(go,8000)})()</script>`;
  writeFileSync(file, html.replace("</head>", () => `${loader}</head>`));
  n++;
}

let renamed = 0;
const fixNested = (d) => {
  for (const [f, p, dir] of kids(d)) {
    if (!dir || f === "_next") continue;
    if (f.startsWith("__next.")) {
      for (const file of walk(p, ".txt")) {
        renameSync(file, join(d, `${f}.${file.slice(p.length + 1).replace(/[\\/]/g, ".")}`));
        renamed++;
      }
      rmSync(p, { recursive: true });
    } else fixNested(p);
  }
};
if (existsSync(root)) fixNested(root);
console.log(`post-export: ${n} pages with deferred scripts (${DELAY_MS} ms after load), ${renamed} segment files renamed`);
