import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import { parseCurrency, roundCurrency } from '../../src/utils/money';
import users from '../data/users.json';

test.describe('Multi-item checkout flow', () => {
  test('calculates subtotal, tax, total, and completes the order @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(users.standard);
    await inventoryPage.addProducts(2);
    const checkoutPage = await inventoryPage.openCart();

    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerDetails('Ada', 'Lovelace', '12345');
    await checkoutPage.continueToSummary();

    const itemTotal = parseCurrency(await checkoutPage.itemTotal.textContent() ?? '');
    const tax = parseCurrency(await checkoutPage.tax.textContent() ?? '');
    const total = parseCurrency(await checkoutPage.total.textContent() ?? '');

    expect(itemTotal).toBeGreaterThan(0);
    expect(tax).toBe(roundCurrency(itemTotal * 0.08));
    expect(total).toBe(roundCurrency(itemTotal + tax));

    await checkoutPage.completeOrder();
    await page.screenshot({ path: 'screenshots/order-confirmation.png', fullPage: true });
    await expect(checkoutPage.confirmationHeader).toBeVisible();
  });

  test('rejects checkout when first name is missing @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(users.standard);
    await inventoryPage.addProducts(1);
    const checkoutPage = await inventoryPage.openCart();

    await checkoutPage.startCheckout();
    await checkoutPage.lastNameInput.fill('Lovelace');
    await checkoutPage.postalCodeInput.fill('12345');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});