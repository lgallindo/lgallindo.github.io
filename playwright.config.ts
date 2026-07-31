import { defineConfig, devices } from "@playwright/test";

const liveBase = process.env.E2E_BASE_URL?.replace(/\/$/, "");
const baseURL = liveBase || "http://127.0.0.1:4321";
const useLocalServer = !liveBase;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    navigationTimeout: 60_000,
    ...devices["Desktop Chrome"],
  },
  timeout: 60_000,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: useLocalServer
    ? {
        command: "bun run build && bun run preview -- --host 127.0.0.1 --port 4321",
        url: "http://127.0.0.1:4321/",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      }
    : undefined,
});
