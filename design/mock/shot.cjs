// Mock screenshots. Run from the repo root: node design/mock/shot.cjs [name-prefix]
// Uses the globally installed Playwright with the installed Chrome (no browser download).
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('C:/Users/Ameer Hussain/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright')); }
const launchOptions = process.env.SHOT_CHROME ? { executablePath: process.env.SHOT_CHROME } : { channel: 'chrome' }; // Linux: SHOT_CHROME=/opt/pw-browsers/chromium
const path = require('path');
const url = 'file:///' + path.resolve(__dirname, 'hero.html').split(path.sep).join('/');
const out = path.resolve(__dirname, 'shots');
require('fs').mkdirSync(out, { recursive: true });
const prefix = process.argv[2] || 'hero';
const shots = [
  ['desktop', { width: 1440, height: 900 }, 1, false, ''],
  ['desktop-big', { width: 1440, height: 900 }, 1, false, '?bill=150000'],
  ['desktop-debug', { width: 1440, height: 900 }, 1, false, '?debug=1&bill=300000'],
  ['laptop', { width: 1280, height: 720 }, 1, false, ''],
  ['zoom-200', { width: 720, height: 450 }, 2, false, ''],
  ['mobile', { width: 390, height: 844 }, 2, true, ''],
  ['mobile-full', { width: 390, height: 844 }, 2, true, '?bill=90000'],
];
(async () => {
  const b = await chromium.launch(launchOptions);
  for (const [name, viewport, deviceScaleFactor, isMobile, q] of shots) {
    const p = await b.newPage({ viewport, deviceScaleFactor, isMobile, hasTouch: isMobile });
    const errs = [];
    p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(url + q, { waitUntil: 'load' });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: path.join(out, prefix + '-' + name + '.jpg'), type: 'jpeg', quality: 80, fullPage: name === 'mobile-full' });
    console.log(name, errs.length ? 'ERRORS: ' + errs.join(' | ') : 'ok');
    await p.close();
  }
  // motion and focus checks on the desktop page
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(url); await p.waitForTimeout(2500);
  await p.keyboard.press('Tab'); await p.focus('#bill');
  await p.screenshot({ path: path.join(out, prefix + '-focus.jpg'), type: 'jpeg', quality: 80 });
  for (let i = 0; i < 12; i++) await p.keyboard.press('ArrowRight');
  for (let i = 1; i <= 3; i++) { await p.screenshot({ path: path.join(out, prefix + '-anim-' + i + '.jpg'), type: 'jpeg', quality: 80 }); await p.waitForTimeout(60); }
  await p.close();
  await b.close();
})();
