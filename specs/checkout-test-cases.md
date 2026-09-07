# Checkout Page Test Cases

**Target:** https://www.saucedemo.com/checkout-step-one.html, checkout-step-two.html, checkout-complete.html
**Date:** 2026-09-07

| ID | Scenario | Preconditions | Expected result | Priority |
| --- | --- | --- | --- | --- |
| CHK-001 | Calculate checkout totals | Two products are in the cart; valid customer details are available | Item total equals the sum of item prices; tax equals 8% rounded to cents; total equals subtotal plus tax | P0 |
| CHK-002 | Complete checkout | Valid first name, last name, and postal code are entered | Confirmation page displays `Thank you for your order!` | P0 |
| CHK-003 | Missing first name | Cart contains one product; last name and postal code are entered | Continue is blocked and `Error: First Name is required` is shown | P1 |
| CHK-004 | Missing last name | Cart contains one product; first name and postal code are entered | Continue is blocked and `Error: Last Name is required` is shown | P1 |
| CHK-005 | Missing postal code | Cart contains one product; first and last names are entered | Continue is blocked and `Error: Postal Code is required` is shown | P1 |

## Execution Notes

- `CHK-001` through `CHK-005` are all automated in `tests/checkout/checkout-e2e.spec.ts`.
- `CHK-002` also captures the confirmation screenshot at `screenshots/order-confirmation.png`.
