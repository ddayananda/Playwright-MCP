import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutPage } from './CheckoutPage';

export class InventoryPage extends BasePage {
  readonly addToCartButtons: ReturnType<Page['getByRole']>;
  readonly sortDropdown: ReturnType<Page['getByRole']>;
  readonly productPrices: ReturnType<Page['getByText']>;
  readonly cartLink: ReturnType<Page['getByText']>;
  readonly cartItemCount: ReturnType<Page['getByText']>;

  constructor(page: Page) {
    super(page);
    this.addToCartButtons = page.getByRole('button', { name: /Add to cart/i });
    this.sortDropdown = page.getByRole('combobox');
    this.productPrices = page.getByText(/^\$\d+\.\d{2}$/);
    this.cartLink = page.getByText(/^\d+$/).last();
    this.cartItemCount = page.getByText(/^\d+$/).last();
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.addToCartButtons.first().waitFor();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.sortDropdown.selectOption('lohi');
  }

  async addProducts(count: number): Promise<void> {
    for (let index = 0; index < count; index += 1) {
      await this.addToCartButtons.nth(index).click();
    }
  }

  async openCart(): Promise<CheckoutPage> {
    await this.cartLink.click();
    const checkoutPage = new CheckoutPage(this.page);
    await checkoutPage.waitForReady();
    return checkoutPage;
  }
}