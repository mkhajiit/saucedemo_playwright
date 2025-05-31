import test, { expect } from '@playwright/test';
import login from '../helper/login';

const BASE_URL = 'https://www.saucedemo.com/';

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// 로그인 성공 테스트
test('로그인 성공 확인', async ({ page }) => {
  await login(page, 'standard_user', 'secret_sauce');

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// 로그인 실패 테스트(미입력)
test('로그인 미입력 실패 테스트', async ({ page }) => {
  await page.click('#login-button');

  const errorMessage = await page.locator('.error-message-container.error').textContent();
  expect(errorMessage).toBe('Epic sadface: Username is required');
});

// 로그인 실패 테스트(아이디)
test('로그인 유효하지 않은 아이디 입력 실패 테스트', async ({ page }) => {
  await login(page, 'standard_user12', 'secret_sauce');

  const errorMessage = await page.locator('.error-message-container.error').textContent();
  expect(errorMessage).toBe(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

// 로그인 실패 테스트(비밀번호)
test('로그인 유효하지 않은 비밀번호 입력 실패 테스트', async ({ page }) => {
  await login(page, 'standard_user', '1234');

  const errorMessage = await page.locator('.error-message-container.error').textContent();
  expect(errorMessage).toBe(
    'Epic sadface: Username and password do not match any user in this service'
  );
});
