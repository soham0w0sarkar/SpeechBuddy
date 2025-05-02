const { defineConfig } = require("@playwright/test");
const path = require("path");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 2,
  workers: 1,
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "Chrome Extension",
      use: {
        channel: "chrome",
        launchOptions: {
          args: [
            `--disable-extensions-except=${path.join(__dirname, "./")}`,
            `--load-extension=${path.join(__dirname, "./")}`,
            "--disable-web-security",
            "--allow-insecure-localhost",
            "--allow-file-access-from-files",
            "--disable-site-isolation-trials",
            "--disable-features=IsolateOrigins,site-per-process",
          ],
        },
        contextOptions: {
          permissions: ["geolocation"],
          bypassCSP: true,
        },
      },
    },
  ],
});
