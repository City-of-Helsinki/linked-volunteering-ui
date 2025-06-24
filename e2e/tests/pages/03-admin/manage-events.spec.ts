import { Page, test, expect } from '@playwright/test';

import {
  TEST_USER_EMAIL,
  TEST_USER_PASSWORD,
} from '../../../../playwright.config';
import { login } from '../../utils';

test.describe('Manage events', () => {
  test.skip(
    !TEST_USER_EMAIL || !TEST_USER_PASSWORD,
    'No test user credentials provided'
  );

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto('/fi/');
    await login(page, TEST_USER_EMAIL, TEST_USER_PASSWORD);

    await page.getByRole('link', { name: 'Hallitse tapahtumia' }).click();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Accept will activate success info text', async () => {
    const row = page
      .locator('table tbody tr')
      .filter({ hasText: 'Puistotalkoot e2e testi' })
      .filter({ hasText: 'Odottaa' });

    await row.getByTestId('toggle-details').first().click();

    await page.getByRole('button', { name: 'Hyväksy tapahtuma' }).click();

    await expect(
      page.getByText('Puistotalkoot e2e testi hyväksytty!')
    ).toBeVisible();
  });

  test('Remove will bring up modal and will activate removed info text', async () => {
    const row = page
      .locator('table tbody tr')
      .filter({ hasText: 'Puistotalkoot e2e testi' })
      .filter({ hasText: 'Hyväksytty' });

    await row.getByTestId('toggle-details').first().click();

    await page.getByRole('button', { name: 'Poista tapahtuma' }).click();

    await expect(
      page.getByRole('heading', { name: 'Poistetaanko tapahtuma?' })
    ).toBeVisible();

    await page.getByRole('button', { name: 'Kyllä, poista tapahtuma' }).click();

    await expect(
      page.getByText('Puistotalkoot e2e testi peruttu!')
    ).toBeVisible();
  });

  test('Modify will take to event modification page', async () => {
    const row = page
      .locator('table tbody tr')
      .filter({ hasText: 'Puistotalkoot e2e testi' })
      .filter({ hasText: 'Odottaa' });

    await row.getByRole('link', { name: 'Muokkaa' }).first().click();

    await expect(page.getByText('Muokkaa tapahtumaa')).toBeVisible();
  });
});
