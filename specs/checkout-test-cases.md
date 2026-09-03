# Checkout and Inventory Test Cases

**Target:** https://www.saucedemo.com
**Date:** 2026-09-03

| ID | Scenario | Preconditions | Expected result | Priority |
| --- | --- | --- | --- | --- |
| TC-001 | Sort inventory by price low to high | Logged in as `standard_user` | All six prices are ordered low to high; no price is lower than the preceding price | P0 |
| TC-002 | Verify strict price ordering | Logged in as `standard_user`; sort set to Price (low to high) | Every price is greater than the previous price | P0 |
| TC-003 | Add multiple products to cart | Logged in as `standard_user` | Cart badge shows two items and both products appear in the cart | P1 |
| TC-004 | Calculate checkout totals | Two products are in the cart; valid customer details are available | Item total equals the sum of item prices; tax equals 8% rounded to cents; total equals subtotal plus tax | P0 |
| TC-005 | Complete checkout | Valid first name, last name, and postal code are entered | Confirmation page displays `Thank you for your order!` | P0 |
| TC-006 | Missing first name | Cart contains one product; last name and postal code are entered | Continue is blocked and `Error: First Name is required` is shown | P1 |
| TC-007 | Missing last name | Cart contains one product; first name and postal code are entered | Continue is blocked and `Error: Last Name is required` is shown | P1 |
| TC-008 | Missing postal code | Cart contains one product; first and last names are entered | Continue is blocked and `Error: Postal Code is required` is shown | P1 |
| TC-009 | Resilient locators | SauceDemo DOM is loaded | Tests use accessible roles/labels and stable visible text, with no timing sleeps or XPath | P1 |

## Execution Notes

- `TC-001`, `TC-003`, `TC-004`, `TC-005`, and `TC-006` are automated in the assignment specs.
- `TC-002` currently exposes `DEF-001`: the catalog contains two products priced at `$15.99`, so a strict `>` assertion cannot pass even though the sort is correctly non-decreasing.
- The sorting evidence is stored at `screenshots/defect-DEF-001.png`.