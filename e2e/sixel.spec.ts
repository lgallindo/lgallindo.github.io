import { test, expect } from "@playwright/test";

test.describe("sixel", () => {
  test("buggy sixel deck renders both banners", async ({ page }) => {
    await page.goto("/en_US/");
    const deck = page.locator(".sixel-deck");
    await expect(deck).toBeVisible();
    await expect(deck.getByText(/img2sixel/i)).toBeVisible();
    await expect(page.locator(".sixel-frame")).toHaveCount(2);
    await expect(page.locator('.sixel-frame__img[src*="github-readme.png"]')).toBeVisible();
    await expect(page.locator('.sixel-frame__img[src$="/readme.png"]')).toBeVisible();
  });
});
