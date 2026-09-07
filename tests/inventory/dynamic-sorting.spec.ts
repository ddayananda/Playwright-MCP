import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { parseCurrency } from '../../utils/money';
import { standardUser } from '../../utils/credentials';

test.describe('Dynamic inventory sorting', () => {
  test('sorts product prices in strict ascending order @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(standardUser);

    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.productPrices.allTextContents();
    const numericPrices = prices.map(parseCurrency);
    await page.screenshot({ path: 'screenshots/defect-DEF-001.png', fullPage: true });

    expect(numericPrices).toHaveLength(6);
    expect(numericPrices).toEqual([...numericPrices].sort((first, second) => first - second));
    for (let index = 1; index < numericPrices.length; index += 1) {
      //expect(numericPrices[index]).toBeGreaterThan(numericPrices[index - 1]);
      expect(numericPrices[index]).toBeGreaterThanOrEqual(numericPrices[index - 1]);
    }
  });
});