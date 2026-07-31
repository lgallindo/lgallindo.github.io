import { test, expect } from "@playwright/test";

test.describe("assets", () => {
  test("linked _astro CSS returns 200 with css content-type", async ({ page, request }) => {
    await page.goto("/en_US/");
    const href = await page.locator('link[rel="stylesheet"][href*="/_astro/"]').first().getAttribute("href");
    expect(href, "expected a bundled /_astro/*.css link").toBeTruthy();

    const cssUrl = new URL(href!, page.url()).toString();
    const response = await request.get(cssUrl);
    expect(response.status(), `CSS GET ${cssUrl}`).toBe(200);
    const contentType = response.headers()["content-type"] ?? "";
    expect(contentType, `content-type for ${cssUrl}`).toMatch(/css/i);
  });

  test("ArcLength banner PNGs return 200", async ({ request }) => {
    for (const path of ["/media/arclength/github-readme.png", "/media/arclength/readme.png"]) {
      const response = await request.get(path);
      expect(response.status(), `GET ${path}`).toBe(200);
      const contentType = response.headers()["content-type"] ?? "";
      expect(contentType, `content-type for ${path}`).toMatch(/image\/png/i);
    }
  });
});
