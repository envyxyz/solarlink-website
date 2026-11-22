import { expect, test } from "@playwright/test";
import { PAGES } from "./pages";

// Every same-origin href on the page must resolve (200, no redirect) in the preview build. Draft pages exist there; production ships only "/".
for (const [kind, path] of PAGES) {
  test(`internal links resolve: ${kind}`, async ({ page, request }) => {
    await page.goto(path);
    const origin = new URL(page.url()).origin;
    const hrefs = await page.$$eval("a[href]", (as) => [...new Set(as.map((a) => (a as HTMLAnchorElement).href))]);
    // "[confirm with client]" is the content placeholder (Google reviews link); the production build gate (check-content) owns that.
    const internal = hrefs.filter((h) => new URL(h).origin === origin && !decodeURIComponent(h).includes("[confirm with client]")).map((h) => { const u = new URL(h); return u.pathname + u.search; });
    const bad: string[] = [];
    for (const h of internal) {
      const r = await request.get(h, { maxRedirects: 0 });
      if (r.status() !== 200) bad.push(`${r.status()} ${h}`);
    }
    expect(bad).toEqual([]);
  });
}
