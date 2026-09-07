import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage/InventoryPage';
import { standardUser } from '../../utils/credentials';

test.describe('Standard user login', () => {
  test('logs in successfully with the standard user @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const inventoryPage = await loginPage.loginAs(standardUser);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.addToCartButtons).toHaveCount(6);
  });
});
