import { Page, test, expect } from '@playwright/test';
import {
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} from '../../../../playwright.config';
import { login } from '../../utils';

test.describe('Yearly reports', () => {
  test.skip(
    !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
    'No test user credentials provided'
  );

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto('/fi/');
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD);

    await page.getByRole('link', { name: 'Vuosiraportit' }).click();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Initially there are no reports', async () => {
    expect(
      await page.getByTestId('report_table').locator('tbody tr').all()
    ).toHaveLength(0);
  });
});
