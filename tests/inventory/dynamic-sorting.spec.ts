import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { parseCurrency } from '../../src/utils/money';
import users from '../data/users.json';

test.describe('Dynamic inventory sorting', () => {
  test('sorts product prices in strict ascending order @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(users.standard);

    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.productPrices.allTextContents();
    const numericPrices = prices.map(parseCurrency);
    await page.screenshot({ path: 'screenshots/defect-DEF-001.png', fullPage: true });

    expect(numericPrices).toHaveLength(6);
    expect(numericPrices).toEqual([...numericPrices].sort((first, second) => first - second));
    expect(numericPrices.every((price, index) => index === 0 || price >= numericPrices[index - 1])).toBeTruthy();  });
});