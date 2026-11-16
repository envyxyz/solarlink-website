// Screenshots of a built route. Serves out/ on a local port and captures the route at 1440x900,
// 1280x720 and 390x844 (first screen and full page) into design/shots/. Also, for the homepage:
// the slider moved to the top with the keyboard, and the phone menu open. Prints console errors.
// Usage: node scripts/shot.mjs [route=/] [prefix]   (prefix goes before the file name: "prod-" gives prod-home-1440-first.jpg)   (run `pnpm build` first; uses the installed Chrome)
// Linux or CI: SHOT_CHROME=/opt/pw-browsers/chromium node scripts/shot.mjs  (that path is a symlink to the Chromium binary;
// without SHOT_CHROME it launches the installed Chrome, channel "chrome").
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const route = process.argv[2] ?? "/";
const prefix = process.argv[3] ?? "";
const slug = prefix + (route === "/" ? "home" : route.replaceAll("/", "-").replace(/^-|-$/g, ""));
const root = join(process.cwd(), "out");
const outDir = join(process.cwd(), "design", "shots");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".woff2": "font/woff2", ".txt": "text/plain", ".xml": "application/xml" };

const server = createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (p.endsWith("/") || p.endsWith("\\")) p += "index.html";
  try {
    const body = await readFile(join(root, p));
    res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
await mkdir(outDir, { recursive: true });

const VIEWS = [
  { name: "1920", width: 1920, height: 1080, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
  { name: "1280", width: 1280, height: 720, mobile: false },
  { name: "390", width: 390, height: 844, mobile: true },
];
const browser = await chromium.launch(process.env.SHOT_CHROME ? { executablePath: process.env.SHOT_CHROME } : { channel: "chrome" });
const errors = [];

async function open(view) {
  const page = await browser.newPage({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 1, isMobile: view.mobile, hasTouch: view.mobile });
  page.on("console", (m) => m.type() === "error" && !m.text().includes("status of 404") && errors.push(`${view.name} console: ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`${view.name} pageerror: ${e.message}`));
  // Nav and footer link to pages later phases build; Next prefetches them, so those 404s are expected for now.
  page.on("response", (r) => r.status() >= 400 && r.request().resourceType() !== "fetch" && !/_rsc|.txt|__next/.test(r.url()) && errors.push(`${view.name} ${r.status()}: ${r.url()}`));
  // Next link prefetches (resource type fetch) are aborted by the browser or Next when the target page is not built yet.
  page.on("requestfailed", (r) => r.resourceType() !== "fetch" && errors.push(`${view.name} request failed: ${r.url()} ${r.failure()?.errorText}`));
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000); // roof panels pop in, link line draws
  // Scroll down and back so every section's entry reveal has run before the full-page shot.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += view.height / 2) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500); // the wires draw
  return page;
}
const shot = (page, name, full) => page.screenshot({ path: join(outDir, `${slug}-${name}.jpg`), type: "jpeg", quality: 72, fullPage: full, animations: "disabled" });

for (const view of VIEWS) {
  const page = await open(view);
  await shot(page, `${view.name}-first`, false);
  await shot(page, `${view.name}-full`, true);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) errors.push(`${view.name}: horizontal overflow ${overflow}px`);
  if (route === "/") {
    const slider = page.locator('input[type="range"]');
    if (await slider.count()) {
      await slider.focus();
      await page.keyboard.press("End");
      await page.waitForTimeout(3500);
      await shot(page, `${view.name}-slider-max`, false);
    }
    if (view.mobile) {
      await page.reload({ waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      await page.locator("header nav button").first().click();
      await page.waitForTimeout(600);
      await shot(page, `${view.name}-menu`, false);
    }
  }
  await page.close();
}
await browser.close();
server.close();
console.log(errors.length ? `ERRORS:\n- ${errors.join("\n- ")}` : "no console errors");
