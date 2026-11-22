import { expect, test } from "@playwright/test";

test("desktop nav: links reachable by Tab, Enter follows a link", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const n = await page.locator("header nav ul.lg\\:flex a").count();
  expect(n).toBeGreaterThanOrEqual(5);
  const seen = new Set<string>();
  let last: string | null = null;
  for (let i = 0; i < 15 && seen.size < n; i++) {
    await page.keyboard.press("Tab");
    last = await page.evaluate(() => {
      const a = document.activeElement as HTMLAnchorElement | null;
      return a?.closest("ul.lg\\:flex") ? a.getAttribute("href") : null;
    });
    if (last) seen.add(last);
  }
  expect(seen.size).toBe(n);
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${last}$`));
});

test("phone menu: Enter opens, Tab reaches links, Escape closes and returns focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const button = page.locator("header nav button[aria-controls]");
  await button.focus();
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.locator("#nav-panel a").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(button).toBeFocused();
});
