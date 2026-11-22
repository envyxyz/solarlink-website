import { expect, test } from "@playwright/test";
import { PAGES } from "./pages";

// 390 = phone. 320 CSS px is the WCAG 1.4.10 reflow width (equal to 400% zoom on 1280, 200% on 640).
for (const width of [390, 320]) {
  for (const [kind, path] of PAGES) {
    test(`no horizontal overflow at ${width}: ${kind}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path, { waitUntil: "networkidle" });
      const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
      expect(o.sw).toBeLessThanOrEqual(o.cw);
    });
  }
}

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  for (const [kind, path] of PAGES.filter(([k]) => ["home", "service", "outlet"].includes(k))) {
    test(`no running animations on h1 or hero: ${kind}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      const running = await page.evaluate(() =>
        document
          .getAnimations()
          .filter((a) => a.playState === "running")
          .map((a) => {
            const el = (a.effect as KeyframeEffect | null)?.target as Element | null;
            return el && (el.closest("h1") || el.closest("main > :first-child"))
              ? `${el.tagName.toLowerCase()} ${(a as CSSAnimation).animationName ?? (a as CSSTransition).transitionProperty ?? ""}`
              : null;
          })
          .filter(Boolean),
      );
      expect(running).toEqual([]);
    });
  }
});
