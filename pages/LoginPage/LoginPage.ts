import { Page } from '@playwright/test';
import { BasePage } from '../BasePage/BasePage';
import { InventoryPage } from '../InventoryPage/InventoryPage';

export class LoginPage extends BasePage {
  readonly usernameInput: ReturnType<Page['getByRole']>;
  readonly passwordInput: ReturnType<Page['getByRole']>;
  readonly loginButton: ReturnType<Page['getByRole']>;
  readonly errorMessage: ReturnType<Page['getByRole']>;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('heading', { name: /Epic sadface/ });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com');
    await this.usernameInput.waitFor();
    await this.passwordInput.waitFor();
    await this.loginButton.waitFor();
  }

  async loginAs(user: { username: string; password: string }): Promise<InventoryPage> {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();

    const inventoryPage = new InventoryPage(this.page);
    await inventoryPage.waitForReady();
    return inventoryPage;
  }

  async attemptLogin(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}