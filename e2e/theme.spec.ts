import { test, expect } from "@playwright/test";

test.describe("theme", () => {
  test("Plain enables Simple.css; Modem is Blue BBS; Phosphor restores", async ({ page }) => {
    await page.goto("/en_US/");

    const plainCss = page.locator("#plain-theme-css");
    await expect(plainCss).toHaveCount(1);
    await expect(page.locator('input[name="mode"]')).toHaveCount(3);

    // Labels wrap radios; visible <span> intercepts pointer events on the input.
    await page.locator("label.mode-switch__option", { hasText: "Plain" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-mode", "utilitarian");
    await expect.poll(async () => plainCss.evaluate((el) => (el as HTMLLinkElement).disabled)).toBe(false);

    await page.locator("label.mode-switch__option", { hasText: "Modem" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-mode", "modem");
    await expect.poll(async () => plainCss.evaluate((el) => (el as HTMLLinkElement).disabled)).toBe(true);
    // Browsers may serialize #000033 as the short form #003.
    await expect
      .poll(async () =>
        page.locator("html").evaluate((el) => {
          const v = getComputedStyle(el).getPropertyValue("--color-bg").trim().toLowerCase();
          return v === "#000033" || v === "#003" || v === "rgb(0, 0, 51)";
        }),
      )
      .toBe(true);

    await page.locator("label.mode-switch__option", { hasText: "Phosphor" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-mode", "phosphor");
    await expect
      .poll(async () =>
        page.locator("html").evaluate((el) => {
          const v = getComputedStyle(el).getPropertyValue("--color-bg").trim().toLowerCase();
          return v === "#0a0a0a" || v === "rgb(10, 10, 10)";
        }),
      )
      .toBe(true);
  });
});
