import { Page } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';

export class CheckoutPage extends BasePage {
  readonly checkoutButton: ReturnType<Page['getByRole']>;
  readonly continueButton: ReturnType<Page['getByRole']>;
  readonly firstNameInput: ReturnType<Page['getByRole']>;
  readonly lastNameInput: ReturnType<Page['getByRole']>;
  readonly postalCodeInput: ReturnType<Page['getByRole']>;
  readonly finishButton: ReturnType<Page['getByRole']>;
  readonly cartItemPrices: ReturnType<Page['getByText']>;
  readonly itemTotal: ReturnType<Page['getByText']>;
  readonly tax: ReturnType<Page['getByText']>;
  readonly total: ReturnType<Page['getByText']>;
  readonly confirmationHeader: ReturnType<Page['getByRole']>;
  readonly errorMessage: ReturnType<Page['getByText']>;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cartItemPrices = page.getByText(/^\$\d+\.\d{2}$/);
    this.itemTotal = page.getByText(/^Item total:/);
    this.tax = page.getByText(/^Tax:/);
    this.total = page.getByText(/^Total:/);
    this.confirmationHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.errorMessage = page.getByText(/^Error:/);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/cart.html');
    await this.checkoutButton.waitFor();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.firstNameInput.waitFor();
  }

  async fillCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToSummary(): Promise<void> {
    await this.continueButton.click();
    await this.itemTotal.waitFor();
  }

  async completeOrder(): Promise<void> {
    await this.finishButton.click();
    await this.confirmationHeader.waitFor();
  }
}