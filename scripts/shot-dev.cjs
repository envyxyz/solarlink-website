// Screenshots dev-only pages (/dev/pages/<kind>/) from `next dev -p 3100`, light and dark, 1440 and 390.
const { chromium } = require("playwright");
(async () => {
  const kinds = process.argv.slice(2);
  const b = await chromium.launch(process.env.SHOT_CHROME ? { executablePath: process.env.SHOT_CHROME } : { channel: "chrome" });
  for (const kind of kinds) for (const scheme of ["light", "dark"]) for (const [w, h, m] of [[1440, 900, false], [390, 844, true]]) {
    const p = await b.newPage({ colorScheme: scheme, viewport: { width: w, height: h }, isMobile: m, hasTouch: m });
    await p.goto(`http://localhost:3100/dev/pages/${kind}/`, { waitUntil: "networkidle", timeout: 90000 });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } scrollTo(0, 0); });
    await p.waitForTimeout(1500);
    await p.screenshot({ path: `design/shots/page-${kind}-${scheme}-${w}.jpg`, fullPage: true, quality: 70, animations: "disabled" });
    await p.close();
  }
  await b.close();
})();
