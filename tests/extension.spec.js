const { test, expect } = require("@playwright/test");
const { getExtensionPage } = require("./extension-utils");

test.describe("Speech Buddy Chrome Extension", () => {
  const EXTENSION_ID = "pbklidjfkhmpgemmipaenfhlhnnndajp";
  let extension;

  test.beforeEach(async () => {
    extension = await getExtensionPage(EXTENSION_ID);
  });

  test.afterEach(async () => {
    await extension.close();
  });

  test("free tier user flow with navigation", async () => {
    // Start with login
    const page = await extension.browser.newPage();
    await page.goto(`chrome-extension://${EXTENSION_ID}/popup.html`);
    await page.fill("#login-email", "hebovop271@benznoi.com");
    await page.fill("#login-password", "Test123!");
    await page.click("#login-button");

    // Click Let's Go to navigate to convince page
    await page.click("#render");
    await expect(page).toHaveURL(
      `chrome-extension://${EXTENSION_ID}/convince.html`
    );

    // Verify premium features are visible
    await expect(page.locator(".features")).toBeVisible();
    await expect(page.locator('li:has-text("Voice Recordings")')).toBeVisible();
    await expect(
      page.locator('li:has-text("Adaptive Learning")')
    ).toBeVisible();

    // Click "Not Yet" to continue as free user
    await page.click(".secondary");
    await expect(page).toHaveURL(
      `chrome-extension://${EXTENSION_ID}/home.html`
    );

    // Verify free tier limitations
    await expect(page.locator("#tailoredQuestions")).toHaveClass("hidden");
    await expect(page.locator("#tailoredQuestionsLabel")).toHaveClass("hidden");

    // Select first available option in each dropdown
    const dropdowns = ["#questionType", "#gradeLevel", "#pillar", "#goal"];
    for (const dropdown of dropdowns) {
      // Wait for dropdown to be visible and enabled
      await page.waitForSelector(`${dropdown}:not([disabled])`);
      // Get all options
      const options = await page.$$eval(`${dropdown} option`, (options) =>
        options.map((option) => option.value).filter((value) => value !== "")
      );
      // Select first available option
      if (options.length > 0) {
        await page.selectOption(dropdown, options[0]);
      }
    }

    // If any checkboxes appear, check them
    const checkboxes = await page.$$('input[type="checkbox"]');
    for (const checkbox of checkboxes) {
      await checkbox.check();
    }

    // Verify continue button is enabled
    await expect(page.locator("#continueBtn")).toBeEnabled();
    await page.click("#continueBtn");

    // Navigate to renderPopup
    await page.click("#back");
    await expect(page).toHaveURL(
      `chrome-extension://${EXTENSION_ID}/renderPopup.html`
    );
    await expect(page.locator("#render")).toBeVisible();

    // Click render to go to flashcards
    await page.click("#render");
    await expect(page).toHaveURL(
      `chrome-extension://${EXTENSION_ID}/flashcards.html`
    );

    // Verify free tier limitations in flashcards
    await expect(page.locator("#record-button")).toHaveClass("hidden");
    await expect(page.locator("#stop-button")).toHaveClass("hidden");
    await expect(page.locator("#submitButton")).toHaveClass("hidden");

    // Test Chrome sync by checking if data persists
    const initialCardContent = await page
      .locator(".card-content")
      .textContent();

    // Navigate through cards
    await page.click("#nextBtn");
    const nextCardContent = await page.locator(".card-content").textContent();
    expect(nextCardContent).not.toBe(initialCardContent);

    await page.click("#previousBtn");
    const previousCardContent = await page
      .locator(".card-content")
      .textContent();
    expect(previousCardContent).toBe(initialCardContent);

    // Cleanup
    await page.close();
  });
});
