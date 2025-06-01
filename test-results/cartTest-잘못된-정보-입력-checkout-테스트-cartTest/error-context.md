# Test info

- Name: 잘못된 정보 입력 checkout 테스트
- Location: D:\2025 Study\프로젝트\saucedemo_playwright\tests\cart\cartTest.spec.ts:43:6

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not "https://www.saucedemo.com/checkout-step-two.html"
    at D:\2025 Study\프로젝트\saucedemo_playwright\tests\cart\cartTest.spec.ts:45:26
```

# Page snapshot

```yaml
- button "Open Menu"
- img "Open Menu"
- text: "Swag Labs 2 Checkout: Overview QTY Description 1"
- link "Sauce Labs Backpack":
  - /url: "#"
- text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99 1
- link "Sauce Labs Bike Light":
  - /url: "#"
- text: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included. $9.99 Payment Information: SauceCard #31337 Shipping Information: Free Pony Express Delivery! Price Total Item total: $39.98 Tax: $3.20 Total: $43.18"
- button "Go back Cancel":
  - img "Go back"
  - text: Cancel
- button "Finish"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
   1 | import test, { expect } from '@playwright/test';
   2 | import login from '../../helper/login';
   3 | import { URLS } from '../../constants/urls';
   4 | import itemIds from '../../constants/itemIds';
   5 | import checkout from '../../helper/checkout';
   6 |
   7 | test.beforeEach(async ({ page }) => {
   8 |   await page.goto(URLS.BASE);
   9 |   await login(page, 'standard_user', 'secret_sauce');
  10 |   for (const id of itemIds) {
  11 |     await page.click(`#${id}`);
  12 |   }
  13 |   await page.click('.shopping_cart_link');
  14 | });
  15 |
  16 | test('제품 추가 테스트', async ({ page }) => {
  17 |   // 해당 클래스명을 가진 모든 요소의 텍스트를 배열로 추출
  18 |   const cartItemNames = await page.locator('.inventory_item_name').allTextContents();
  19 |   const expectedNames = itemIds.map(([, name]) => name);
  20 |   expect(cartItemNames).toEqual(expectedNames);
  21 | });
  22 |
  23 | test('제품 제거 테스트', async ({ page }) => {
  24 |   // 상수로 저장된 add 버튼 아이디를 remove 아이디로 변경함
  25 |   const removeId = itemIds.map(([id]) => id.replace('add-to-cart-', 'remove-'));
  26 |   for (const remove of removeId) {
  27 |     await page.click(`#${remove}`);
  28 |   }
  29 |   // locator 객체 반환
  30 |   const remainItem = page.locator('.cart_item');
  31 |   await expect(remainItem).toHaveCount(0);
  32 | });
  33 |
  34 | test('미입력 checkout 테스트', async ({ page }) => {
  35 |   await page.click('#checkout');
  36 |   await page.click('#continue');
  37 |
  38 |   const errorMessage = await page.locator('.error-message-container.error').textContent();
  39 |   expect(errorMessage).toBe('Error: First Name is required');
  40 | });
  41 |
  42 | // 실패하게 설계한 테스트 실패허용
  43 | test.fail('잘못된 정보 입력 checkout 테스트', async ({ page }) => {
  44 |   await checkout(page, '132412', '   ', 'my home~');
> 45 |   expect(page.url()).not.toBe('https://www.saucedemo.com/checkout-step-two.html');
     |                          ^ Error: expect(received).not.toBe(expected) // Object.is equality
  46 | });
  47 |
  48 | test('알맞은 정보 입력 checkout 테스트', async ({ page }) => {
  49 |   await checkout(page, '제헌', '연', '042967');
  50 |
  51 |   expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html');
  52 | });
  53 |
  54 | test('주문 성공 테스트', async ({ page }) => {
  55 |   await checkout(page, '제헌', '연', '042967');
  56 |   await page.click('#finish');
  57 |
  58 |   expect(page.url()).toBe('https://www.saucedemo.com/checkout-complete.html');
  59 | });
  60 |
  61 | test('장바구니 유지 테스트', async ({ page }) => {
  62 |   await page.click('#react-burger-menu-btn');
  63 |   await page.click('#logout_sidebar_link');
  64 |   await login(page, 'standard_user', 'secret_sauce');
  65 |
  66 |   const cart = page.locator('.shopping_cart_link');
  67 |
  68 |   const badgeCount = await cart.locator('.shopping_cart_badge').textContent();
  69 |
  70 |   expect(badgeCount).toBe(itemIds.length.toString());
  71 | });
  72 |
```