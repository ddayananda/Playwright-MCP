import { test } from '@playwright/test';
import { OrangeHrmLoginPage } from '../pages/orangehrm-login.page';

test('logs in to OrangeHRM Demo', async ({ page }) => {
  const loginPage = new OrangeHrmLoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await loginPage.expectDashboard();
});