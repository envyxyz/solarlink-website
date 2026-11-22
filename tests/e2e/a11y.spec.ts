import AxeBuilder from "@axe-core/playwright";
import { appendFileSync, mkdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { PAGES } from "./pages";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
mkdirSync("reports", { recursive: true });

for (const scheme of ["light", "dark"] as const) {
  test.describe(scheme, () => {
    test.use({ colorScheme: scheme });
    for (const width of [1440, 390]) {
      for (const [kind, path] of PAGES) {
        test(`axe ${kind} ${scheme} ${width}`, async ({ page }) => {
          await page.setViewportSize({ width, height: width > 500 ? 900 : 844 });
          await page.goto(path, { waitUntil: "networkidle" });
          await page.waitForTimeout(800);
          const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
          for (const v of violations) appendFileSync("reports/axe.jsonl", JSON.stringify({ kind, path, scheme, width, rule: v.id, impact: v.impact, nodes: v.nodes.map((n) => n.target.join(" ")) }) + "\n");
          expect(violations.map((v) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
        });
      }
    }
  });
}
