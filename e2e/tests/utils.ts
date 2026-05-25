import { expect, Page } from '@playwright/test';

export const login = async (page: Page, email: string, password: string) => {
  await page.goto('/login/');

  await expect(page.locator('.login-pf-page')).toBeVisible();
  await expect(page.locator('#kc-error-message')).toBeHidden();

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Log In' }).click();
};
