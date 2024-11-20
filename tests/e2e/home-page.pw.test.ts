import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/ImpoBooks/);
  });

  test('has h1 title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Home');
  });
});
