# Test Plan: SauceDemo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-01

## Overview
The SauceDemo login page is the entry point for the standard user flow and the core validation states for invalid authentication. This plan covers both the successful login path and the five required failure conditions, including the locked-out account and empty-field validation messages.

## Preconditions
- User is on the SauceDemo login page at https://www.saucedemo.com.
- No active SauceDemo session is present in the browser.
- The password for all credential examples is secret_sauce unless the field is intentionally left empty.
- The browser is running in a clean state so each scenario can start from the same login screen.

## Scenarios

### Scenario 1.1 — Standard user login success
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** User is on the login page with a fresh session and no prior authentication state.
- **Steps:**
  1. Enter standard_user in the Username field — expected: the field accepts the value without error styling.
  2. Enter secret_sauce in the Password field — expected: the field accepts the value and the form remains ready to submit.
  3. Click Login — expected: the app redirects to the inventory page and the user lands on the product catalog.
- **Assertions:**
  - The inventory page loads successfully with the app header and product list visible.
  - The expected user is authenticated and can access the catalog, confirming the login flow works end to end.
- **Edge cases considered:**
  - Form submission should not require extra fields beyond username and password.
  - The password value should not be masked incorrectly across the login attempt.

### Scenario 1.2 — Locked-out user shows locked error
- **Priority:** P0
- **Tags:** @critical
- **Preconditions:** User is on the login page and has not already attempted the locked-out account login.
- **Steps:**
  1. Enter locked_out_user in the Username field — expected: the value is accepted and displayed as entered.
  2. Enter secret_sauce in the Password field — expected: the password field accepts the valid secret without issue.
  3. Click Login — expected: the app blocks the login attempt and displays the error banner for a locked account.
- **Assertions:**
  - The visible error message indicates that the user is locked out and the login attempt fails without redirecting to the inventory page.
  - The page remains on the login screen so the user can retry or correct their credentials.
- **Edge cases considered:**
  - The error should appear even when the password is otherwise valid.
  - The error state should persist until the user dismisses the form or changes the input.

### Scenario 1.3 — Empty username submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page and the Username field is blank.
- **Steps:**
  1. Leave the Username field empty — expected: the field remains blank and no login is attempted.
  2. Enter secret_sauce in the Password field — expected: the password field accepts the value while the username remains empty.
  3. Click Login — expected: the app blocks submission and displays a validation message requiring a username.
- **Assertions:**
  - The login form shows the required-field validation for the missing username and prevents access to the inventory page.
  - The error message specifically calls out that the username is required.
- **Edge cases considered:**
  - Submission with only a password should fail before any navigation occurs.
  - The validation should be consistent with the default browser and app-level form messaging.

### Scenario 1.4 — Empty password submission
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** User is on the login page and the Password field is blank.
- **Steps:**
  1. Enter standard_user in the Username field — expected: the field accepts the valid username.
  2. Leave the Password field empty — expected: the field remains blank and the form is not yet submitted.
  3. Click Login — expected: the app stops the attempt and displays a validation message requiring a password.
- **Assertions:**
  - The login form shows the required-field validation for the blank password and keeps the user on the login screen.
  - The application does not redirect or create a valid session when the password is missing.
- **Edge cases considered:**
  - A blank password should fail even when a valid username is provided.
  - The error should remain visible until the user corrects the password field.

### Scenario 1.5 — Invalid credentials show auth error
- **Priority:** P0
- **Tags:** @critical
- **Preconditions:** User is on the login page and there is no active authenticated session.
- **Steps:**
  1. Enter an invalid username such as wrong_user in the Username field — expected: the field accepts the value and retains the typed text.
  2. Enter secret_sauce in the Password field — expected: the password field accepts the known value.
  3. Click Login — expected: the app rejects the credentials and shows the mismatch validation message.
- **Assertions:**
  - The error banner states that the supplied username and password do not match any user in the service.
  - The user remains on the login screen and the app does not navigate to the inventory page.
- **Edge cases considered:**
  - The validation should continue to fail when both fields are non-empty but the credentials are not valid.
  - Misspelled usernames and wrong-case variations should be treated as invalid if they do not match an account.

## Not covered (and why)
- Logout after successful login is not included because the scope is limited to the login flow requested.
- Product browsing and checkout flows are intentionally excluded because they are not part of the authentication validation scenarios.
- Multi-user session switching is outside the current scope and would require separate session-state coverage.

## Execution Notes

- Scenarios 1.1–1.5 are all automated in `tests/auth/standard-login.spec.ts`.
- Scenario 1.2 uses the `lockedOutUser` credential from `utils/credentials.ts` (`SAUCE_LOCKED_OUT_USERNAME` env var).
- Scenarios 1.3–1.5 exercise the new `LoginPage.attemptLogin()` method, which submits the form without assuming success, and assert on the new `LoginPage.errorMessage` locator.
