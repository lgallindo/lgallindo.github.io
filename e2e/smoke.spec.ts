import { test, expect } from "@playwright/test";

test.describe("smoke", () => {
  test("en_US project page loads core content", async ({ page }) => {
    const response = await page.goto("/en_US/");
    expect(response, "navigation response").not.toBeNull();
    expect(response!.status(), `status for ${response!.url()}`).toBe(200);

    await expect(page.getByRole("heading", { level: 1, name: "ArclengthContinuation" })).toBeVisible();
    await expect(page.getByRole("link", { name: /github\.com\/lgallindo\/arclengthcontinuation/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /prerequisites|pré-requisitos/i })).toBeVisible();
    await expect(page.locator(".site-header__title")).toHaveCount(0);
    await expect(page.getByText(/Prefer local build output/i)).toHaveCount(0);

    const skip = page.locator(".skip-link");
    await expect.poll(async () => skip.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe("none");
    await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" })).toBeVisible();
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Home" }).click();
  });
});
