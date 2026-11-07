import { test, expect } from "@playwright/test";

test.describe("TypeKitTools Public Surface", () => {
  test("should load the homepage and display brand and search bar", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/TypeKitTools/i);

    // Verify main hero heading
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText("Typing, Symbols");

    // Verify prominent search input
    const searchInput = page.locator("#main-search-input");
    await expect(searchInput).toBeVisible();
  });

  test("should navigate to Tools directory", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.locator("h1")).toContainText("All Free Online Tools");
  });

  test("should open the Key Code Tester tool page", async ({ page }) => {
    await page.goto("/tools/keyboard/key-code-tester");
    await expect(page.locator("h1")).toContainText("Key Code Tester");
    // Verify that keyCode number is rendered
    await expect(page.getByText("JavaScript keyCode / which")).toBeVisible();
  });

  test("should open the Base64 encoder tool page", async ({ page }) => {
    await page.goto("/tools/developer/base64");
    await expect(page.locator("h1")).toContainText("Base64 Encoder & Decoder");
    await expect(page.getByText("PLAIN TEXT INPUT")).toBeVisible();
  });
});

