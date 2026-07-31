import { test, expect } from "@playwright/test";

test.describe("sandbox", () => {
  test("sandbox page mounts terminal and allows help", async ({ page }) => {
    const response = await page.goto("/en_US/sandbox/");
    expect(response!.status()).toBe(200);
    await expect(page.getByRole("heading", { name: /Arclength sandbox/i })).toBeVisible();
    await expect(page.locator("[data-alc-sandbox]")).toBeVisible();
    await expect(page.locator(".xterm")).toBeVisible({ timeout: 15_000 });

    const term = page.locator("[data-alc-sandbox]");
    await term.click();
    await page.keyboard.type("help");
    await page.keyboard.press("Enter");
    await expect(page.locator(".xterm-rows")).toContainText(/scripted|Commands/i, { timeout: 5_000 });

    await page.keyboard.type("curl http://evil");
    await page.keyboard.press("Enter");
    await expect(page.locator(".xterm-rows")).toContainText(/denied/i);
  });
});
