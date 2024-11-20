import { test, expect } from '@playwright/test';

import Routes from '@/constants/routes';

test.describe('Auth page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(Routes.AUTH);
  });

  test.describe('Check page title', () => {
    test('has correct init title', async ({ page }) => {
      await expect(page).toHaveTitle(/ImpoBooks | Вхід/);
    });

    test('has correct login title', async ({ page }) => {
      await page.goto(Routes.AUTH + '?tab=login');
      await expect(page).toHaveTitle(/ImpoBooks | Вхід/);
    });

    test('has correct register title', async ({ page }) => {
      await page.goto(Routes.AUTH + '?tab=register');
      await expect(page).toHaveTitle(/ImpoBooks | Реєстрація/);
    });

    test('should switch between tabs', async ({ page }) => {
      const loginTab = page.getByTestId('login');
      const registerTab = page.getByTestId('register');

      await loginTab.click();
      await expect(page).toHaveTitle(/ImpoBooks | Реєстрація/);

      await registerTab.click();
      await expect(page).toHaveTitle(/ImpoBooks | Вхід/);
    });
  });

  test.describe('Login flow', () => {
    test('should show error message when login with invalid data', async ({
      page,
    }) => {
      await page.getByTestId('login').click();
      await page.getByPlaceholder('your@email.com').fill('invalid-email');
      await page.getByPlaceholder('••••••••').fill('short');
      await page.getByTestId('login-submit').click();
      await expect(
        page.locator('span:has-text("Помилка при вході")'),
      ).toBeVisible();
    });

    test('should login successfully with valid data', async ({ page }) => {
      await page.getByTestId('login').click();
      await page.getByPlaceholder('your@email.com').fill('testmail@gmail.com');
      await page.getByPlaceholder('••••••••').fill('123123123');
      await page.getByTestId('login-submit').click();
      await expect(page).toHaveURL(Routes.CATALOG);
    });
  });

  test.describe('Register flow', () => {
    test('should show error message when register with invalid data', async ({
      page,
    }) => {
      const submitButton = page.getByTestId('register-submit');
      const wrongConfirmPassMessage = page.getByText('Паролі не співпадають');
      const wrongPassMessage = page.getByText('Мінімум 8 символів');

      await page.getByTestId('register').click();
      await expect(submitButton).toBeDisabled();

      await page.getByPlaceholder('Іван Петренко').fill('Ivan');
      await page
        .getByPlaceholder('your@email.com')
        .fill('invalid-email@gmail.com');
      await page.getByLabel('Пароль').fill('short');
      await page.getByLabel('Підтвердження паролю').fill('short123');
      await submitButton.click();
      await expect(wrongPassMessage).toBeVisible();
      await expect(wrongConfirmPassMessage).toBeVisible();
    });
  });
});
