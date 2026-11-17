// Screenshots one section of a built route in light and dark, at 1440 and 390, into design/shots/.
// Usage: node scripts/shot-section.mjs <selector> <name> [route=/]   (run `pnpm build` first; SHOT_CHROME as in shot.mjs)
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const [selector, name, route = "/"] = process.argv.slice(2);
const root = join(process.cwd(), "out");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png" };
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
await mkdir("design/shots", { recursive: true });
const browser = await chromium.launch(process.env.SHOT_CHROME ? { executablePath: process.env.SHOT_CHROME } : { channel: "chrome" });
for (const scheme of ["light", "dark"]) {
  for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
    const page = await browser.newPage({ colorScheme: scheme, viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
    await page.goto(`http://localhost:${server.address().port}${route}`, { waitUntil: "networkidle" });
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    await el.screenshot({ path: `design/shots/${name}-${scheme}-${w}.jpg`, quality: 80, animations: "disabled" });
    await page.close();
  }
}
await browser.close();
server.close();
