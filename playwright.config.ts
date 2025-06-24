import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config({ path: path.resolve(__dirname, '.env') });

export const TEST_USER_EMAIL = process.env.E2E_TEST_USER_EMAIL ?? '';
export const TEST_USER_PASSWORD = process.env.E2E_TEST_USER_PASSWORD ?? '';

export default defineConfig({
  testDir: './e2e/tests/pages',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* The maximum number of retry attempts given to failed tests */
  retries: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit', { outputFile: 'report/e2e-junit-results.xml' }],
    ['html', { open: 'never', outputFolder: 'report/html' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL:
      process.env.E2E_TESTS_ENV_URL ?? 'https://puistotalkoot.dev.hel.ninja/',
    ignoreHTTPSErrors: true,
    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    // https://playwright.dev/docs/videos
    video: 'on-first-retry',
    contextOptions: { recordVideo: { dir: './report/videos/' } },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
