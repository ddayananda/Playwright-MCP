# SauceDemo Playwright MCP Assignment

This project automates dynamic inventory sorting and a multi-item SauceDemo checkout flow using Playwright and TypeScript. Page objects live in `src/pages`, reusable parsing logic lives in `src/utils`, and executable tests remain under `tests` to match the repository's existing runner configuration.

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

The checkout scenarios pass. The strict sorting assertion intentionally records `DEF-001`: SauceDemo has two `$15.99` products, so the assignment's strict `>` requirement cannot be met by the live data. A non-decreasing sort is correctly implemented by the application. Evidence is saved under `screenshots/` and the defect is recorded in `reports/defects.xlsx`.

## MCP and healing notes

The planner workflow is defined in `.github/agents/playwright-test-planner.agent.md`; the defect analysis workflow is defined in `.github/agents/defect-reporting.agent.md`. Initial role-based locators were validated against the live accessibility tree. Two brittle assumptions were repaired: the cart badge is a numeric generic element rather than a link, and the sort combobox has no accessible name. The repaired locators were rerun; checkout passed and the remaining sorting failure is the documented data/requirement conflict, not a locator failure.

## Deliverables

- `specs/checkout-test-cases.md`: manual cases and execution notes
- `tests/inventory/dynamic-sorting.spec.ts`: sorting and price assertions
- `tests/checkout/checkout-e2e.spec.ts`: checkout math, negative validation, and confirmation
- `reports/defects.xlsx`: defect schema and `DEF-001`
- `screenshots/defect-DEF-001.png` and `screenshots/order-confirmation.png`: evidence