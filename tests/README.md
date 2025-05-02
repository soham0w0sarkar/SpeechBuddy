# Speech Buddy Chrome Extension Tests

This directory contains automated tests for the Speech Buddy Chrome extension using Playwright.

## Setup

1. Install dependencies:

```bash
npm install @playwright/test
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. Update the extension ID:
   - Replace `[EXTENSION_ID]` in `extension.spec.js` with your actual Chrome extension ID
   - You can find your extension ID by:
     - Going to `chrome://extensions`
     - Enabling Developer mode
     - Finding your extension and copying the ID

## Running Tests

To run all tests:

```bash
npx playwright test
```

To run specific test files:

```bash
npx playwright test tests/extension.spec.js
```

To run tests in headed mode (with browser UI):

```bash
npx playwright test --headed
```

To run tests in debug mode:

```bash
npx playwright test --debug
```

## Test Structure

The tests are organized into several test suites:

1. **Authentication**

   - User signup
   - User login
   - Password reset

2. **Invitation System**

   - Valid invitation code acceptance
   - Invalid invitation code rejection

3. **Flashcards**

   - Flashcard generation
   - Navigation between cards
   - Audio recording and submission

4. **Premium Features**

   - Premium features display
   - Subscription handling

5. **Navigation**
   - Dashboard navigation
   - Logout functionality

## Test Reports

After running tests, you can view the HTML report:

```bash
npx playwright show-report
```

## Debugging

- Use `--debug` flag to run tests in debug mode
- Add `await page.pause();` in your test to pause execution
- Use `console.log()` statements in your tests
- Check the test reports for screenshots and traces of failed tests
