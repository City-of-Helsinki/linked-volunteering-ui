/* eslint-disable import/prefer-default-export */
import { expect, Page } from '@playwright/test';

export const login = async (page: Page, email: string, password: string) => {
  await page.goto('/login/');

  await expect(page.locator('.login-pf-page')).toBeVisible();
  await expect(page.locator('#kc-error-message')).toBeHidden();

  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);

  await page.getByRole('button', { name: 'Log in' }).click();
};
