import test, { expect } from '@playwright/test';
import login from '../../helper/login';
import { URLS } from '../../constants/urls';

const itemIds = ['add-to-cart-sauce-labs-backpack', 'add-to-cart-sauce-labs-bike-light'];

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.BASE);
  await login(page, 'standard_user', 'secret_sauce');
  await page.click('#react-burger-menu-btn');
});

test('All Items 테스트', async ({ page }) => {
  await page.click('#inventory_sidebar_link');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('About 테스트', async ({ page }) => {
  await page.click('#about_sidebar_link');

  await expect(page).toHaveURL('https://saucelabs.com/');
});

test('Reset App State 테스트', async ({ page }) => {
  for (const id of itemIds) {
    await page.click(`#${id}`);
  }
  await page.click('#reset_sidebar_link');

  const cart = page.locator('.shopping_cart_link');

  const badge = cart.locator('.shopping_cart_badge');

  await expect(badge).toHaveCount(0);
});
