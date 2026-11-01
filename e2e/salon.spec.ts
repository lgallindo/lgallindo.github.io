import { test, expect } from "@playwright/test";

test.describe("salon", () => {
  test("mock LLM: chatroom layout + ordinary reply", async ({ page }) => {
    await page.goto("/salon/?mock=1");

    const room = page.locator("[data-salon-room]");
    await expect(room).toBeVisible({ timeout: 15_000 });

    const transcript = page.locator("[data-salon-transcript]");
    const composer = page.locator("[data-salon-composer]");
    await expect(transcript).toBeVisible();
    await expect(composer).toBeVisible();

    // Composer must sit below the transcript (chatroom, not inverted).
    const tBox = await transcript.boundingBox();
    const cBox = await composer.boundingBox();
    expect(tBox).toBeTruthy();
    expect(cBox).toBeTruthy();
    expect(cBox!.y).toBeGreaterThan(tBox!.y + tBox!.height / 2);

    // Greeter present
    await expect(transcript).toContainText(/\[.+\]/, { timeout: 5_000 });
    const before = await transcript.innerText();

    await page.locator("#salon-input").fill("hello salon");
    await page.getByRole("button", { name: /^Send$/ }).click();

    await expect(transcript).toContainText("[You]", { timeout: 5_000 });
    await expect(transcript).toContainText(/Heard you:/i, { timeout: 10_000 });
    const after = await transcript.innerText();
    expect(after.length).toBeGreaterThan(before.length);
  });

  test("hooks-only: Bonanno hard hook plays authored lines", async ({
    page,
  }) => {
    // Force degrade by spoofing no isolation after load via mock off + block SW
    // Prefer explicit hooks path: open mock room then we also test hard hook
    // which works with or without LLM.
    await page.goto("/salon/?mock=1");
    const transcript = page.locator("[data-salon-transcript]");
    await expect(page.locator("[data-salon-room]")).toBeVisible({
      timeout: 15_000,
    });

    await page.locator("#salon-input").fill("alegria armada");
    await page.getByRole("button", { name: /^Send$/ }).click();

    await expect(transcript).toContainText(/alegria armada/i, {
      timeout: 5_000,
    });
    await expect(transcript).toContainText(/Bonanno/i);
    await expect(transcript).toContainText(/alegria armada não pede licença/i, {
      timeout: 5_000,
    });
  });

  test("gate degrade UI keeps composer under gate log", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "crossOriginIsolated", {
        configurable: true,
        get: () => false,
      });
      Object.defineProperty(navigator, "gpu", {
        configurable: true,
        get: () => undefined,
      });
    });

    await page.goto("/salon/");
    await expect(
      page.getByRole("button", { name: /Continue with hooks only/i }),
    ).toBeVisible({ timeout: 20_000 });

    const log = page.locator(".salon-gate__log");
    const side = page.locator(".salon-gate__side");
    await expect(log).toBeVisible();
    await expect(side).toBeVisible();
    const logBox = await log.boundingBox();
    const sideBox = await side.boundingBox();
    expect(logBox).toBeTruthy();
    expect(sideBox).toBeTruthy();
    expect(sideBox!.y).toBeGreaterThan(logBox!.y);

    await page.getByRole("button", { name: /Continue with hooks only/i }).click();
    await expect(page.locator("[data-salon-room]")).toBeVisible();
    await expect(page.getByText(/Hooks-only mode/i)).toBeVisible();
  });
});
