import test, { expect } from '@playwright/test';
import login from '../../helper/login';
import { URLS } from '../../constants/urls';

const BASE_URL = URLS.BASE;

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('ST-11: 로그아웃 테스트', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');

  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');

  await expect(page).toHaveURL(BASE_URL);
});
