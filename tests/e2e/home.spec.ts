import { expect, test } from "@playwright/test";
import { PAGES } from "./pages";

test("home: one h1 in the server HTML, no console errors", async ({ page, request }) => {
  const html = await (await request.get("/")).text();
  expect(html.match(/<h1[\s>]/g)).toHaveLength(1);

  const errors: string[] = [];
  // Next link prefetches (_rsc) 404 for pages that are not built; in production only "/" ships. Same filter as scripts/shot.mjs.
  // Finding F2 in docs/qa/2026-11-23-tests.md: in this Windows preview build they 404 even for built pages.
  const prefetch = (s: string) => /_rsc=|__next\./.test(s);
  page.on("console", (m) => m.type() === "error" && !m.text().includes("status of 404") && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => r.status() >= 400 && !prefetch(r.url()) && errors.push(`${r.status()} ${r.url()}`));
  await page.goto("/", { waitUntil: "networkidle" });
  expect(errors).toEqual([]);
});

for (const [kind, path] of PAGES) {
  test(`one h1 in server HTML: ${kind}`, async ({ request }) => {
    const html = await (await request.get(path)).text();
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });
}
