# SauceDemo Playwright MCP Assignment

This project automates SauceDemo login, dynamic inventory sorting, and a multi-item checkout flow using Playwright and TypeScript. Page objects live in `pages`, reusable parsing logic lives in `utils`, and executable tests remain under `tests`.

## Prerequisites

- Node.js 20 or later
- `npm install`
- Playwright browsers installed with `npx playwright install`

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

The planner workflow is defined in `.github/agents/playwright-test-planner.agent.md`; the defect analysis workflow is defined in `.github/agents/defect-reporting.agent.md`. Initial role-based locators were validated against the live accessibility tree. Two brittle assumptions were repaired: the cart badge is a numeric generic element rather than a link, and the sort combobox has no accessible name. The repaired locators were rerun; checkout passed and the remaining sorting failure is the documented data/requirement conflict, not a locator failure.

## Deliverables

- `specs/checkout-test-cases.md`: manual cases and execution notes
- `pages/LoginPage.ts`, `pages/InventoryPage.ts`, `pages/CheckoutPage.ts`: page objects
- `utils/money.ts`: currency parsing and rounding helpers
- `tests/auth/standard-login.spec.ts`: standard login smoke coverage
- `tests/inventory/dynamic-sorting.spec.ts`: sorting and price assertions
- `tests/checkout/checkout-e2e.spec.ts`: checkout math, negative validation, and confirmation
- `reports/defects.xlsx`: defect schema and `DEF-001`
- `screenshots/defect-DEF-001.png` and `screenshots/order-confirmation.png`: evidence