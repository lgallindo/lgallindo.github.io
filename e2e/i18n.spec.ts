import { test, expect } from "@playwright/test";

test.describe("i18n", () => {
  test("gateway offers English and Português", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "English" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Português" })).toBeVisible();
  });

  test("pt_BR page shows localized prerequisites", async ({ page }) => {
    const response = await page.goto("/pt_BR/");
    expect(response!.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: "ArclengthContinuation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pré-requisitos" })).toBeVisible();
  });
});
