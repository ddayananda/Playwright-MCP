# Cart Page Test Cases

**Target:** https://www.saucedemo.com/cart.html
**Date:** 2026-09-07

| ID | Scenario | Preconditions | Expected result | Priority |
| --- | --- | --- | --- | --- |
| CART-001 | Add multiple products to cart | Logged in as `standard_user` | Cart badge on the inventory page shows two items, and both products appear when the cart page is opened | P1 |

## Execution Notes

- `CART-001` is automated as the setup step of `tests/checkout/checkout-e2e.spec.ts` (add two products, assert the badge count, then open the cart) — there is no standalone cart spec because the cart page is always exercised on the way into checkout.
