import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { parseCurrency, roundCurrency } from '../../utils/money';
import { standardUser } from '../../utils/credentials';
import checkoutData from '../../data/checkout.json';

test.describe('Multi-item checkout flow', () => {
  test('calculates subtotal, tax, total, and completes the order @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(standardUser);
    await inventoryPage.addProducts(2);
    await expect(inventoryPage.cartItemCount).toHaveText('2');
    const checkoutPage = await inventoryPage.openCart();
    const selectedPrices = (await checkoutPage.cartItemPrices.allTextContents()).map(parseCurrency);
    const expectedSubtotal = roundCurrency(selectedPrices.reduce((sum, price) => sum + price, 0));

    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerDetails(
      checkoutData.customer.firstName,
      checkoutData.customer.lastName,
      checkoutData.customer.postalCode,
    );
    await checkoutPage.continueToSummary();

    const itemTotal = parseCurrency(await checkoutPage.itemTotal.textContent() ?? '');
    const tax = parseCurrency(await checkoutPage.tax.textContent() ?? '');
    const total = parseCurrency(await checkoutPage.total.textContent() ?? '');

    expect(itemTotal).toBe(expectedSubtotal);
    expect(tax).toBe(roundCurrency(itemTotal * 0.08));
    expect(total).toBe(roundCurrency(itemTotal + tax));

    await checkoutPage.completeOrder();
    await page.screenshot({ path: 'screenshots/order-confirmation.png', fullPage: true });
    await expect(checkoutPage.confirmationHeader).toBeVisible();
  });

  test('rejects checkout when first name is missing @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(standardUser);
    await inventoryPage.addProducts(1);
    const checkoutPage = await inventoryPage.openCart();

    await checkoutPage.startCheckout();
    await checkoutPage.lastNameInput.fill('Lovelace');
    await checkoutPage.postalCodeInput.fill('12345');
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('rejects checkout when last name is missing @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(standardUser);
    await inventoryPage.addProducts(1);
    const checkoutPage = await inventoryPage.openCart();

    await checkoutPage.startCheckout();
    await checkoutPage.firstNameInput.fill(checkoutData.customer.firstName);
    await checkoutPage.postalCodeInput.fill(checkoutData.customer.postalCode);
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('rejects checkout when postal code is missing @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    const inventoryPage = await loginPage.loginAs(standardUser);
    await inventoryPage.addProducts(1);
    const checkoutPage = await inventoryPage.openCart();

    await checkoutPage.startCheckout();
    await checkoutPage.firstNameInput.fill(checkoutData.customer.firstName);
    await checkoutPage.lastNameInput.fill(checkoutData.customer.lastName);
    await checkoutPage.continueButton.click();

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});