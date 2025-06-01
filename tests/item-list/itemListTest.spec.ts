import test, { expect, Page } from '@playwright/test';
import { URLS } from '../../constants/urls';
import login from '../../helper/login';

async function getItemNames(page: Page) {
  return await page.locator('.inventory_item_name').allTextContents();
}

async function getNameAndPrice(page: Page) {
  const namesBefore = await page.locator('.inventory_item_name').allTextContents();
  const pricesBefore = await page.locator('.inventory_item_price').allTextContents();

  // 제품이름,가격을 가지는 객체배열 생성
  const itemsBefore = namesBefore.map((name, i) => ({
    name,
    price: parseFloat(pricesBefore[i].replace('$', '')),
  }));

  return itemsBefore;
}

test.beforeEach(async ({ page }) => {
  await page.goto(URLS.BASE);
  await login(page, 'standard_user', 'secret_sauce');
});

test('알파벳 정순 정렬 테스트', async ({ page }) => {
  // 초기 목록을 정순 정렬해 예상 목록을 할당
  const itemNames = await getItemNames(page);
  const sortedItem = [...itemNames].sort();

  // 옵션으로 목록을 정렬 후 나오는 목록
  await page.selectOption('.product_sort_container', 'az');
  const azSortedItem = await page.locator('.inventory_item_name').allTextContents();

  // 초기 목록 정렬한 목록과 옵션으로 정렬 후 나오는 목록을 비교해 판단함
  expect(azSortedItem).toEqual(sortedItem);
});

test('알파벳 역순 정렬 테스트', async ({ page }) => {
  // 역순 정렬으로 예상 목록 할당
  const itemNames = await getItemNames(page);
  const sortedItem = [...itemNames].sort().reverse();

  await page.selectOption('.product_sort_container', 'za');
  const zaSortedItem = await page.locator('.inventory_item_name').allTextContents();

  expect(zaSortedItem).toEqual(sortedItem);
});

test('가격 낮은순 정렬 테스트', async ({ page }) => {
  const itemsBefore = await getNameAndPrice(page);
  // 예상되는 정렬된 아이템들
  const expected = [...itemsBefore].sort((a, b) => a.price - b.price);

  // 가격 낮은 순 옵션 선택
  await page.selectOption('.product_sort_container', 'lohi');

  // 옵션 선택 후 아이템 리스트 추출
  const namesAfter = await page.locator('.inventory_item_name').allTextContents();
  const pricesAfter = await page.locator('.inventory_item_price').allTextContents();

  const lohiItems = namesAfter.map((name, i) => ({
    name,
    price: parseFloat(pricesAfter[i].replace('$', '')),
  }));

  // 비교
  expect(lohiItems).toEqual(expected);
});

test('가격 높은순 정렬 테스트', async ({ page }) => {
  const itemsBefore = await getNameAndPrice(page);
  // 예상되는 정렬된 아이템들
  const expected = [...itemsBefore].sort((a, b) => b.price - a.price);

  // 가격 낮은 순 옵션 선택
  await page.selectOption('.product_sort_container', 'hilo');

  // 옵션 선택 후 아이템 리스트 추출
  const namesAfter = await page.locator('.inventory_item_name').allTextContents();
  const pricesAfter = await page.locator('.inventory_item_price').allTextContents();

  const hiloItems = namesAfter.map((name, i) => ({
    name,
    price: parseFloat(pricesAfter[i].replace('$', '')),
  }));

  // 비교
  expect(hiloItems).toEqual(expected);
});
