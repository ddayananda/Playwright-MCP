# Specs

This is a directory for test plans and manual test cases.

## Manual test cases

Test cases are split one file per page, mirroring the flow through the app:

- `inventory-test-cases.md` — product listing and sorting (`INV-` IDs)
- `cart-test-cases.md` — adding products and viewing the cart (`CART-` IDs)
- `checkout-test-cases.md` — checkout form, totals, and confirmation (`CHK-` IDs)

Locator strategy (role/label first, no CSS/XPath, no timing sleeps) is a project-wide rule defined once in `CLAUDE.md` and is not tracked as a separate per-page test case.

## Test plans

Exploratory Markdown plans produced by the `playwright-test-planner` subagent (see `.claude/agents/`) live alongside the test cases, e.g. `saucedemo-login.md`.
