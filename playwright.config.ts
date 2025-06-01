import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'loginTest',
      testDir: './tests/login',
    },
    {
      name: 'logoutTest',
      testDir: './tests/logout',
    },
    {
      name: 'naviTest',
      testDir: './tests/navigation',
    },
    {
      name: 'cartTest',
      testDir: './tests/cart',
    },
    {
      name: 'itemListTest',
      testDir: './tests/item-list',
    },
  ],
  // 디버깅용 옵션 headless 모드 끄기
  // use: {
  //   headless: false,
  //   launchOptions: {
  //     slowMo: 500, // 이렇게 넣어야 타입스크립트 오류 안 남
  //   },
  // },
});
