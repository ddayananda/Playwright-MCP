import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage/InventoryPage';
import { standardUser, lockedOutUser } from '../../utils/credentials';

test.describe('Standard user login', () => {
  test('Scenario 1.1 - logs in successfully with the standard user @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const inventoryPage = await loginPage.loginAs(standardUser);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
  });

  test('Scenario 1.2 - locked-out user shows locked error @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.attemptLogin(lockedOutUser.username, lockedOutUser.password);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    await expect(page).toHaveURL(/\/(index\.html)?$/);
  });

  test('Scenario 1.3 - empty username submission is blocked @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.attemptLogin('', standardUser.password);

    await expect(loginPage.errorMessage).toContainText('Username is required');
    await expect(page).toHaveURL(/\/(index\.html)?$/);
  });

  test('Scenario 1.4 - empty password submission is blocked @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.attemptLogin(standardUser.username, '');

    await expect(loginPage.errorMessage).toContainText('Password is required');
    await expect(page).toHaveURL(/\/(index\.html)?$/);
  });

  test('Scenario 1.5 - invalid credentials show auth error @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.attemptLogin('wrong_user', standardUser.password);

    await expect(loginPage.errorMessage).toContainText('do not match any user in this service');
    await expect(page).toHaveURL(/\/(index\.html)?$/);
  });
});
