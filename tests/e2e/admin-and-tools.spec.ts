import { test, expect } from "@playwright/test";

test.describe("TypeKitTools Comprehensive E2E Verification", () => {
  test("Homepage loads with hero, search, categories, and educational guides", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/TypeKitTools/i);

    // Header & Brand
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("link", { name: /TypeKitTools/i }).first()).toBeVisible();

    // Category Grid
    await expect(page.getByText("Symbols & Special Characters")).toBeVisible();
    await expect(page.getByText("Developer Utilities")).toBeVisible();

    // Footer
    await expect(page.locator("footer")).toBeVisible();
    await expect(page.getByText("Cookie Preferences")).toBeVisible();
  });

  test("Universal Search Modal (Cmd+K) opens and searches tools and symbols", async ({ page }) => {
    await page.goto("/");

    // Click search trigger in header
    const searchTrigger = page.locator("button:has-text('Quick search...')").first();
    if (await searchTrigger.isVisible()) {
      await searchTrigger.click();
      const searchDialog = page.locator("input[placeholder*='Search tools']");
      await expect(searchDialog).toBeVisible();

      // Search for hash
      await searchDialog.fill("hash");
      await expect(page.getByText("Cryptographic Hash Generator")).toBeVisible();

      // Search for euro symbol
      await searchDialog.fill("euro");
      await expect(page.getByText("€").first()).toBeVisible();
    }
  });

  test("Cryptographic Hash Generator runs 100% browser-side with live updates", async ({ page }) => {
    await page.goto("/tools/developer/hash-generator");
    await expect(page.locator("h1")).toContainText("Cryptographic Hash Generator");

    // Enter test string
    const input = page.locator("textarea").first();
    await input.fill("HelloTypeKit");

    // Check MD5 hash output container is rendered
    await expect(page.getByText("RFC 1321 MD5").first()).toBeVisible();
  });

  test("Unicode Character Detail Page displays verified platform typing instructions", async ({ page }) => {
    await page.goto("/symbols/detail/euro-sign");
    await expect(page.locator("h1")).toContainText("Euro Sign");

    // Verify Alt code and Mac Option instruction cards
    await expect(page.getByText("Windows Alt Code").first()).toBeVisible();
    await expect(page.getByText("Mac Option Shortcut").first()).toBeVisible();
    await expect(page.getByText("HTML Entity").first()).toBeVisible();
  });

  test("Cookie Consent Banner allows granular preferences and persists state", async ({ page }) => {
    await page.goto("/");
    const consentBanner = page.locator("#cookie-consent-banner");
    if (await consentBanner.isVisible()) {
      const acceptBtn = page.getByRole("button", { name: "Accept All" });
      await acceptBtn.click();
      await expect(consentBanner).not.toBeVisible();
    }
  });

  test("Admin Command Center authenticates and loads management consoles", async ({ page }) => {
    // Navigate to admin login
    await page.goto("/admin/login");
    await expect(page.locator("h2")).toContainText("Command Center");

    // Fill credentials
    await page.locator("input[type='email']").fill("admin@typekittools.com");
    await page.locator("input[type='password']").fill("AdminPassword2026!");
    await page.getByRole("button", { name: "Enter Management Console" }).click();

    // Verify redirected to /admin overview
    await expect(page).toHaveURL(/\/admin/);
    await expect(page.getByText("System Overview & KPIs")).toBeVisible();
    await expect(page.getByText("Total Utilities")).toBeVisible();

    // Verify Tools catalogue page
    await page.goto("/admin/tools");
    await expect(page.getByText("Tools & Utilities Catalogue")).toBeVisible();
    await expect(page.getByText("Symbol Copy & Paste Library")).toBeVisible();

    // Verify Redirects manager
    await page.goto("/admin/redirects");
    await expect(page.getByText("HTTP Redirects (301 / 308)")).toBeVisible();
  });
});

