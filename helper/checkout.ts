// checkout 입력 제출 함수
import { Page } from '@playwright/test';

export default async function checkout(
  page: Page,
  firstName: string,
  lastName: string,
  postalCode: string
) {
  await page.click('#checkout');

  await page.fill('#first-name', firstName);
  await page.fill('#last-name', lastName);
  await page.fill('#postal-code', postalCode);

  await page.click('#continue');
}
