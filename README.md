# SauceDemo Playwright MCP Assignment

This project automates SauceDemo login, dynamic inventory sorting, and a multi-item checkout flow using Playwright and TypeScript. Page objects live in `pages` (one subfolder per page), reusable parsing logic lives in `utils`, test data lives in `data`, and executable tests remain under `tests`.

## Prerequisites

- Node.js 20 or later
- `npm install`
- Playwright browsers installed with `npx playwright install`

## Credentials

Credentials are loaded from the local `.env` file and are not committed to GitHub.
Create it from the example before running tests:

```text
Copy-Item .env.example .env
```

Set `SAUCE_STANDARD_USERNAME` and `SAUCE_PASSWORD` in `.env`. The `.gitignore` rules exclude `.env` and other environment files while allowing `.env.example` to be committed. Never place real credentials in `data/` or source files.

## Run

```text
npm install
npx playwright install
npm run test:assignment
npm test
npm run report
```

The checkout scenarios pass. The strict sorting assertion intentionally records `DEF-001`: SauceDemo has two `$15.99` products, so the assignment's strict `>` requirement cannot be met by the live data. A non-decreasing sort is correctly implemented by the application. Evidence is saved under `screenshots/`, the HTML report is written to `reports/playwright-report/`, and the defect is recorded in `reports/defects.xlsx`.

## MCP and healing notes

The planner workflow is defined in `.claude/agents/playwright-test-planner.md`; the defect analysis workflow is defined in `.claude/agents/defect-reporting.md`. Initial role-based locators were validated against the live accessibility tree. Two brittle assumptions were repaired: the cart badge is a numeric generic element rather than a link, and the sort combobox has no accessible name. The repaired locators were rerun; checkout passed and the remaining sorting failure is the documented data/requirement conflict, not a locator failure.

## Deliverables

- `specs/inventory-test-cases.md`, `specs/cart-test-cases.md`, `specs/checkout-test-cases.md`: manual cases and execution notes, one file per page
- `pages/LoginPage/LoginPage.ts`, `pages/InventoryPage/InventoryPage.ts`, `pages/CheckoutPage/CheckoutPage.ts`: page objects
- `data/checkout.json`: checkout test data
- `utils/money.ts`: currency parsing and rounding helpers
- `tests/auth/standard-login.spec.ts`: standard login smoke coverage
- `tests/inventory/dynamic-sorting.spec.ts`: sorting and price assertions
- `tests/checkout/checkout-e2e.spec.ts`: checkout math, negative validation, and confirmation
- `reports/defects.xlsx`: defect schema and `DEF-001`
- `screenshots/defect-DEF-001.png` and `screenshots/order-confirmation.png`: evidence