import test, { expect } from '@playwright/test';
import login from '../../helper/login';
import { URLS } from '../../constants/urls';
import itemIds from '../../constants/itemIds';
import checkout from '../../helper/checkout';

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.BASE);
  await login(page, 'standard_user', 'secret_sauce');
  for (const id of itemIds) {
    await page.click(`#${id}`);
  }
  await page.click('.shopping_cart_link');
});

test('ST-42: 제품 추가 테스트', async ({ page }) => {
  // 해당 클래스명을 가진 모든 요소의 텍스트를 배열로 추출
  const cartItemNames = await page.locator('.inventory_item_name').allTextContents();
  const expectedNames = itemIds.map(([, name]) => name);
  expect(cartItemNames).toEqual(expectedNames);
});

test('ST-43: 제품 제거 테스트', async ({ page }) => {
  // 상수로 저장된 add 버튼 아이디를 remove 아이디로 변경함
  const removeId = itemIds.map(([id]) => id.replace('add-to-cart-', 'remove-'));
  for (const remove of removeId) {
    await page.click(`#${remove}`);
  }
  // locator 객체 반환
  const remainItem = page.locator('.cart_item');
  await expect(remainItem).toHaveCount(0);
});

test('ST-56: 미입력 checkout 테스트', async ({ page }) => {
  await page.click('#checkout');
  await page.click('#continue');

  const errorMessage = await page.locator('.error-message-container.error').textContent();
  expect(errorMessage).toBe('Error: First Name is required');
});

// 실패하게 설계한 테스트 실패허용
test.fail('ST-59: 잘못된 정보 입력 checkout 테스트', async ({ page }) => {
  await checkout(page, '132412', '   ', 'my home~');
  expect(page.url()).not.toBe('https://www.saucedemo.com/checkout-step-two.html');
});

test('ST-60: 알맞은 정보 입력 checkout 테스트', async ({ page }) => {
  await checkout(page, '제헌', '연', '042967');

  expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html');
});

test('ST-61: 주문 성공 테스트', async ({ page }) => {
  await checkout(page, '제헌', '연', '042967');
  await page.click('#finish');

  expect(page.url()).toBe('https://www.saucedemo.com/checkout-complete.html');
});

test('ST-62: 장바구니 유지 테스트', async ({ page }) => {
  await page.click('#react-burger-menu-btn');
  await page.click('#logout_sidebar_link');
  await login(page, 'standard_user', 'secret_sauce');

  const cart = page.locator('.shopping_cart_link');

  const badgeCount = await cart.locator('.shopping_cart_badge').textContent();

  expect(badgeCount).toBe(itemIds.length.toString());
});
