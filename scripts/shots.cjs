// Screenshots of /dev/kit/ at 1440 and 390. Run with the dev server up: node scripts/shots.cjs [baseUrl]
const { chromium } = require('C:/Users/Ameer Hussain/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright');
const path = require('path');
const base = process.argv[2] || 'http://localhost:3100';
const out = path.resolve(__dirname, '../design/shots');
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ channel: 'chrome' });
  for (const [name, width, height, mobile] of [['kit-1440', 1440, 900, false], ['kit-390', 390, 844, true]]) {
    const p = await b.newPage({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    p.on('pageerror', (e) => errs.push(e.message));
    await p.goto(base + '/dev/kit/', { waitUntil: 'networkidle' });
    await p.waitForTimeout(1500);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await p.screenshot({ path: path.join(out, name + '.jpg'), type: 'jpeg', quality: 70, fullPage: true });
    console.log(name, 'overflow', overflow, errs.length ? 'ERRORS: ' + errs.slice(0, 5).join(' | ') : 'ok');
    await p.close();
  }
  await b.close();
})();
