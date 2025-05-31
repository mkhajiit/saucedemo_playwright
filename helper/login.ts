import { Page } from '@playwright/test';

export default async function login(page: Page, username: string, password: string) {
  await page.fill('#user-name', username);
  await page.fill('#password', password);
  await page.click('#login-button');
}
