# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory\dynamic-sorting.spec.ts >> Dynamic inventory sorting >> sorts product prices in strict ascending order @smoke @critical
- Location: tests\inventory\dynamic-sorting.spec.ts:7:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 15.99
Received:   15.99
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
      - generic [ref=e14]:
        - generic [ref=e15]: Products
        - generic [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Price (low to high)
          - combobox [ref=e19]:
            - option "Name (A to Z)"
            - option "Name (Z to A)"
            - option "Price (low to high)" [selected]
            - option "Price (high to low)"
    - generic [ref=e23]:
      - generic [ref=e24]:
        - link [ref=e26] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Onesie" [ref=e27]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - link "Sauce Labs Onesie" [ref=e30] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e32]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
          - generic [ref=e33]:
            - generic [ref=e34]: $7.99
            - button "Add to cart" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - link [ref=e38] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bike Light" [ref=e39]
        - generic [ref=e40]:
          - generic [ref=e41]:
            - link "Sauce Labs Bike Light" [ref=e42] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e44]: A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.
          - generic [ref=e45]:
            - generic [ref=e46]: $9.99
            - button "Add to cart" [ref=e47] [cursor=pointer]
      - generic [ref=e48]:
        - link [ref=e50] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt" [ref=e51]
        - generic [ref=e52]:
          - generic [ref=e53]:
            - link "Sauce Labs Bolt T-Shirt" [ref=e54] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e56]: Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.
          - generic [ref=e57]:
            - generic [ref=e58]: $15.99
            - button "Add to cart" [ref=e59] [cursor=pointer]
      - generic [ref=e60]:
        - link [ref=e62] [cursor=pointer]:
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)" [ref=e63]
        - generic [ref=e64]:
          - generic [ref=e65]:
            - link "Test.allTheThings() T-Shirt (Red)" [ref=e66] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e68]: This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.
          - generic [ref=e69]:
            - generic [ref=e70]: $15.99
            - button "Add to cart" [ref=e71] [cursor=pointer]
      - generic [ref=e72]:
        - link [ref=e74] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Backpack" [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]:
            - link "Sauce Labs Backpack" [ref=e78] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e80]: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.
          - generic [ref=e81]:
            - generic [ref=e82]: $29.99
            - button "Add to cart" [ref=e83] [cursor=pointer]
      - generic [ref=e84]:
        - link [ref=e86] [cursor=pointer]:
          - /url: "#"
          - img "Sauce Labs Fleece Jacket" [ref=e87]
        - generic [ref=e88]:
          - generic [ref=e89]:
            - link "Sauce Labs Fleece Jacket" [ref=e90] [cursor=pointer]:
              - /url: "#"
            - generic [ref=e92]: It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.
          - generic [ref=e93]:
            - generic [ref=e94]: $49.99
            - button "Add to cart" [ref=e95] [cursor=pointer]
  - contentinfo [ref=e96]:
    - list [ref=e97]:
      - listitem [ref=e98]:
        - link "Twitter" [ref=e99] [cursor=pointer]:
          - /url: https://twitter.com/saucelabs
      - listitem [ref=e100]:
        - link "Facebook" [ref=e101] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e102]:
        - link "LinkedIn" [ref=e103] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e104]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../../pages/LoginPage';
  3  | import { parseCurrency } from '../../utils/money';
  4  | import users from '../data/users.json';
  5  | 
  6  | test.describe('Dynamic inventory sorting', () => {
  7  |   test('sorts product prices in strict ascending order @smoke @critical', async ({ page }) => {
  8  |     const loginPage = new LoginPage(page);
  9  |     await loginPage.goto();
  10 |     const inventoryPage = await loginPage.loginAs(users.standard);
  11 | 
  12 |     await inventoryPage.sortByPriceLowToHigh();
  13 |     const prices = await inventoryPage.productPrices.allTextContents();
  14 |     const numericPrices = prices.map(parseCurrency);
  15 |     await page.screenshot({ path: 'screenshots/defect-DEF-001.png', fullPage: true });
  16 | 
  17 |     expect(numericPrices).toHaveLength(6);
  18 |     expect(numericPrices).toEqual([...numericPrices].sort((first, second) => first - second));
  19 |     for (let index = 1; index < numericPrices.length; index += 1) {
> 20 |       expect(numericPrices[index]).toBeGreaterThan(numericPrices[index - 1]);
     |                                    ^ Error: expect(received).toBeGreaterThan(expected)
  21 |     }
  22 |   });
  23 | });
```