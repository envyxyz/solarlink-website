import { defineConfig } from "@playwright/test";

// Serves ../out (build it first with SOLARLINK_PREVIEW=1 so the draft inner pages exist). Uses the installed Chrome.
// Linux or CI: SHOT_CHROME=/path/to/chromium.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"], ["json", { outputFile: "reports/results.json" }]],
  outputDir: "reports/artifacts",
  use: {
    baseURL: "http://localhost:4173",
    ...(process.env.SHOT_CHROME ? { launchOptions: { executablePath: process.env.SHOT_CHROME } } : { channel: "chrome" }),
  },
  webServer: { command: "node serve.mjs ../out 4173", url: "http://localhost:4173/", reuseExistingServer: true },
});
