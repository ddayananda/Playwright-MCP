import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../data/users.json';

test.describe('Standard user login', () => {
  test('logs in successfully with the standard user @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const inventoryPage = await loginPage.loginAs(users.standard);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
  });
});
