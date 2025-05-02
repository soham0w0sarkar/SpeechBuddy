const { chromium } = require("@playwright/test");

async function getExtensionPage(extensionId) {
  const browser = await chromium.launchPersistentContext("", {
    headless: false,
    args: [
      `--disable-extensions-except=${process.cwd()}`,
      `--load-extension=${process.cwd()}`,
      "--disable-web-security",
      "--allow-insecure-localhost",
      "--allow-file-access-from-files",
      "--disable-site-isolation-trials",
      "--disable-features=IsolateOrigins,site-per-process",
    ],
  });

  // Get the background page
  const backgroundPage = await browser.backgroundPages()[0];

  // Get the extension's popup page
  const popupPage = await browser.newPage();
  await popupPage.goto(`chrome-extension://${extensionId}/popup.html`);

  return {
    browser,
    backgroundPage,
    popupPage,
    async close() {
      await browser.close();
    },
  };
}

module.exports = {
  getExtensionPage,
};
