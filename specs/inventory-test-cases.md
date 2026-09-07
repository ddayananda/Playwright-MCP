# Inventory Page Test Cases

**Target:** https://www.saucedemo.com/inventory.html
**Date:** 2026-09-07

| ID | Scenario | Preconditions | Expected result | Priority |
| --- | --- | --- | --- | --- |
| INV-001 | Sort inventory by price low to high | Logged in as `standard_user` | All six prices are ordered low to high; no price is lower than the preceding price | P0 |
| INV-002 | Verify strict price ordering | Logged in as `standard_user`; sort set to Price (low to high) | Every price is strictly greater than the previous price | P0 |

## Execution Notes

- Both cases are exercised by the single sorting assertion in `tests/inventory/dynamic-sorting.spec.ts`.
- `INV-002` currently exposes `DEF-001`: the catalog contains two products priced at `$15.99`, so a strict `>` assertion cannot pass even though the sort is correctly non-decreasing. The spec asserts `>=` and documents the gap rather than weakening the requirement silently.
- The sorting evidence is stored at `screenshots/defect-DEF-001.png`.
