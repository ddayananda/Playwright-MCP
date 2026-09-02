import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly addToCartButtons: ReturnType<Page['getByRole']>;

  constructor(page: Page) {
    super(page);
    this.addToCartButtons = page.getByRole('button', { name: /Add to cart/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.addToCartButtons.first().waitFor();
  }
}
