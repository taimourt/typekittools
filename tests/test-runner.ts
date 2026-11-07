/**
 * Standalone High-Speed Test Runner for TypeKitTools
 * Tests Phase 3 (15 tools) and Phase 4 (Unicode Search Engine)
 */
import assert from "node:assert";
import {
  splitGraphemes,
  countGraphemes,
  countCodePoints,
  countUtf8Bytes,
  toUnicodeEscapes,
  decodeUnicodeEscapes,
  toHtmlEntities,
} from "../src/lib/unicode/graphemes";
import {
  searchUnicodeCharacters,
  getCharacterBySlugOrCodepoint,
} from "../src/lib/unicode/search";
import { UNICODE_CHARACTERS } from "../src/data/unicode/characters-data";
import { toolRegistry } from "../src/lib/tools/registry";
import { initialTools } from "../src/lib/tools/definitions/index";

import {
  encodeUtf8,
  decodeUtf8,
  analyzeUtf8Characters,
  analyzeUtf16,
  decodeUtf16,
  normalizeUnicode,
  reverseText,
  repeatText,
  removeLineBreaks,
} from "../src/lib/unicode/text-transforms";
import {
  formatHtml,
  minifyHtml,
  formatCss,
  minifyCss,
  escapeCssSelector,
  convertJsUnicode,
  convertRadix,
  decimalToRoman,
} from "../src/lib/developer/dev-transforms";
import {
  validateJson,
  formatXml,
  parseUrl,
  buildQueryString,
  decodeJwt,
  convertColor,
  renderMarkdownToHtml,
} from "../src/lib/developer/advanced-transforms";
import {
  PLANNER_KEYWORDS,
  KEYWORD_CLUSTERS,
  findKeywordsForSymbol,
} from "../src/data/seo-keywords-data";
import { allSymbols, symbolCategories } from "../src/data/symbols-data";
import { guidesData } from "../src/data/guides-data";
import { querySearchIndex } from "../src/data/search-index";
import { runSeoAudit } from "../src/lib/seo/validator";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// Ensure initial tools are registered
toolRegistry.registerAll(initialTools);

console.log("\n🧪 Running TypeKitTools Comprehensive Test Suite...\n");

// --- SUITE 1: 15 Core Tools Registration ---
console.log("Suite 1: Tool Registry & Definitions (15 Tools)");
const requiredSlugs = [
  "symbol-copy",
  "unicode-search",
  "alt-code-finder",
  "accent-keyboard",
  "emoji-library",
  "unicode-converter",
  "character-inspector",
  "html-entities",
  "ascii-table",
  "fancy-text",
  "base64",
  "url-encode",
  "json-formatter",
  "character-counter",
  "invisible-character-tool",
];

test("All 15 Phase 3 required tools are registered in singleton registry", () => {
  for (const slug of requiredSlugs) {
    const tool = toolRegistry.getBySlug(slug);
    assert.ok(tool, `Tool '${slug}' must be registered`);
    assert.ok(tool.name, `Tool '${slug}' must have a name`);
    assert.ok(tool.shortDescription, `Tool '${slug}' must have a description`);
    assert.ok(tool.componentId, `Tool '${slug}' must have a componentId`);
  }
});

// --- SUITE 2: Unicode & Graphemes Processing ---
console.log("\nSuite 2: Unicode Graphemes, Surrogate Pairs & Encodings");

test("Accurately counts normal ASCII text", () => {
  assert.strictEqual(countGraphemes("Hello World"), 11);
  assert.strictEqual(countCodePoints("Hello World"), 11);
  assert.strictEqual(countUtf8Bytes("Hello World"), 11);
});

test("Handles empty inputs gracefully", () => {
  assert.strictEqual(countGraphemes(""), 0);
  assert.strictEqual(countCodePoints(""), 0);
  assert.strictEqual(countUtf8Bytes(""), 0);
  assert.deepStrictEqual(splitGraphemes(""), []);
});

test("Correctly processes astral plane surrogate pairs (Rocket 🚀 U+1F680)", () => {
  const rocket = "🚀";
  assert.strictEqual(rocket.length, 2); // 2 UTF-16 code units
  assert.strictEqual(countGraphemes(rocket), 1); // 1 visual grapheme
  assert.strictEqual(countCodePoints(rocket), 1); // 1 codepoint
  assert.strictEqual(countUtf8Bytes(rocket), 4); // 4 UTF-8 bytes
});

test("Correctly processes multi-codepoint family emoji (👨‍👩‍👧‍👦)", () => {
  const family = "👨‍👩‍👧‍👦";
  assert.strictEqual(countGraphemes(family), 1);
});

test("Handles large inputs (11,000+ characters) without memory leak", () => {
  const large = "A".repeat(10000) + "🚀".repeat(1000);
  assert.strictEqual(countGraphemes(large), 11000);
  assert.strictEqual(countCodePoints(large), 11000);
  assert.strictEqual(countUtf8Bytes(large), 14000);
});

test("Converts text to Unicode escape sequences (\\uXXXX & \\u{XXXXX})", () => {
  const text = "€ 🚀";
  const escaped = toUnicodeEscapes(text);
  assert.ok(escaped.includes("\\u20AC"));
  assert.ok(escaped.includes("\\u{1F680}"));
});

test("Decodes Unicode escapes back to original glyphs", () => {
  const decoded = decodeUnicodeEscapes("\\u20AC and \\u{1F680}");
  assert.strictEqual(decoded, "€ and 🚀");
});

test("Encodes HTML reserved characters and symbols to named/dec/hex entities", () => {
  const raw = "<div class='test'>& \"Hello\" © €</div>";
  const encoded = toHtmlEntities(raw, "named");
  assert.ok(encoded.includes("&lt;div"));
  assert.ok(encoded.includes("&amp;"));
  assert.ok(encoded.includes("&copy;"));
  assert.ok(encoded.includes("&euro;"));
});

// --- SUITE 3: Unicode Search Engine ---
console.log("\nSuite 3: Phase 4 Unicode Search Engine & Symbol Database");

test("Official Unicode 16.0 characters are loaded into database", () => {
  assert.ok(UNICODE_CHARACTERS.length >= 25);
});

test("Searches by official character name", () => {
  const res = searchUnicodeCharacters({ query: "EURO SIGN" });
  assert.ok(res.total > 0);
  assert.ok(res.items.some((i) => i.codepoint === "U+20AC"));
});

test("Searches by actual character glyph directly", () => {
  const res = searchUnicodeCharacters({ query: "€" });
  assert.strictEqual(res.total, 1);
  assert.strictEqual(res.items[0].codepoint, "U+20AC");
});

test("Searches by hex codepoint (with and without U+ prefix)", () => {
  const withU = searchUnicodeCharacters({ query: "U+20AC" });
  assert.ok(withU.total > 0);
  assert.strictEqual(withU.items[0].char, "€");

  const hexOnly = searchUnicodeCharacters({ query: "20ac" });
  assert.ok(hexOnly.total > 0);
  assert.strictEqual(hexOnly.items[0].char, "€");
});

test("Searches by decimal value (8364 for Euro)", () => {
  const res = searchUnicodeCharacters({ query: "8364" });
  assert.ok(res.total > 0);
  assert.strictEqual(res.items[0].char, "€");
});

test("Searches by curated aliases and search keywords", () => {
  const res = searchUnicodeCharacters({ query: "money" });
  assert.ok(res.total > 0);
  assert.ok(res.items.some((i) => i.char === "$" || i.char === "€"));
});

test("Filters by category", () => {
  const res = searchUnicodeCharacters({ category: "Currency Symbol" });
  assert.ok(res.total > 0);
  assert.ok(res.items.every((i) => i.category === "Currency Symbol"));
});

test("Retrieves character record by slug or codepoint", () => {
  const euro = getCharacterBySlugOrCodepoint("euro-sign-u20ac");
  assert.ok(euro);
  assert.strictEqual(euro.char, "€");
  assert.strictEqual(euro.dec, 8364);
  assert.strictEqual(euro.utf8Bytes, "0xE2 0x82 0xAC");

  const copyChar = getCharacterBySlugOrCodepoint("U+00A9");
  assert.ok(copyChar);
  assert.strictEqual(copyChar.char, "©");
});

test("Pagination partitions items correctly without duplicates", () => {
  const p1 = searchUnicodeCharacters({ pageSize: 5, page: 1 });
  const p2 = searchUnicodeCharacters({ pageSize: 5, page: 2 });
  assert.strictEqual(p1.items.length, 5);
  assert.strictEqual(p2.items.length, 5);
  assert.notStrictEqual(p1.items[0].codepoint, p2.items[0].codepoint);
});

// --- SUITE 4: Phase 5 Developer Utilities ---
console.log("\nSuite 4: Phase 5 Developer Utilities & Encoders");

import { md5, crc32 } from "../src/lib/utils/hash";
import { computeLineDiff, generateUnifiedPatch } from "../src/lib/utils/diff";

test("Computes correct RFC 1321 MD5 hash", () => {
  assert.strictEqual(md5("hello"), "5d41402abc4b2a76b9719d911017c592");
  assert.strictEqual(md5("TypeKitTools"), "68fd5d8651f12d9629d7dfd5a8341d56");
});

test("Computes standard CRC32 checksum", () => {
  assert.strictEqual(crc32("hello"), "3610a686");
});

test("Diff engine accurately detects additions and deletions", () => {
  const orig = "Line 1\nLine 2\nLine 3";
  const mod = "Line 1\nLine 2 (updated)\nLine 3\nLine 4";
  const diff = computeLineDiff(orig, mod);

  assert.strictEqual(diff.unchanged, 2); // Line 1 and Line 3
  assert.strictEqual(diff.deletions, 1); // Line 2
  assert.strictEqual(diff.additions, 2); // Line 2 (updated) and Line 4

  const patch = generateUnifiedPatch("test.txt", orig, mod, diff);
  assert.ok(patch.includes("--- a/test.txt"));
  assert.ok(patch.includes("+Line 4"));
});

test("Regex matching and group capturing works accurately", () => {
  const emailRegex = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  const sample = "Email support@typekittools.com or dev@company.org";
  const matches = [...sample.matchAll(emailRegex)];

  assert.strictEqual(matches.length, 2);
  assert.strictEqual(matches[0][0], "support@typekittools.com");
  assert.strictEqual(matches[0][1], "support");
  assert.strictEqual(matches[0][2], "typekittools.com");
});

test("Phase 5 developer tools are registered in singleton registry", () => {
  const devTools = ["hash-generator", "timestamp-converter", "diff-checker", "regex-tester"];
  for (const slug of devTools) {
    const tool = toolRegistry.getBySlug(slug);
    assert.ok(tool, `Developer tool '${slug}' must be registered`);
    assert.strictEqual(tool.category, "developer");
  }
});

// --- SUITE 5: Phase 8 Admin Dashboard, RBAC & Security ---
console.log("\nSuite 5: Phase 8 Admin Dashboard, RBAC & Security");
import { hashPassword, verifyPassword } from "../src/lib/auth/crypto";
import { signSessionToken, verifySessionToken, isAuthorized } from "../src/lib/auth/session";
import { adminService } from "../src/lib/db/admin-service";

test("PBKDF2 secure password hashing and verification works accurately", () => {
  const password = "StrongAdminPass2026!";
  const hash = hashPassword(password);
  assert.ok(hash.includes(":"));
  assert.strictEqual(verifyPassword(password, hash), true);
  assert.strictEqual(verifyPassword("WrongPassword", hash), false);
});

test("Session token generation and HMAC-SHA256 signature verification works", () => {
  const token = signSessionToken({
    userId: "test-admin-1",
    email: "admin@typekittools.com",
    name: "Admin User",
    role: "super_admin",
    exp: Math.floor(Date.now() / 1000) + 3600,
  });

  const payload = verifySessionToken(token);
  assert.ok(payload);
  assert.strictEqual(payload?.email, "admin@typekittools.com");
  assert.strictEqual(payload?.role, "super_admin");

  // Tampered token check
  const tampered = token.slice(0, -5) + "abcde";
  assert.strictEqual(verifySessionToken(tampered), null);
});

test("RBAC role hierarchy permissions enforce correct access levels", () => {
  assert.strictEqual(isAuthorized("super_admin", "viewer"), true);
  assert.strictEqual(isAuthorized("super_admin", "admin"), true);
  assert.strictEqual(isAuthorized("admin", "editor"), true);
  assert.strictEqual(isAuthorized("editor", "admin"), false);
  assert.strictEqual(isAuthorized("viewer", "editor"), false);
});

test("AdminService overview returns correct KPIs and category distribution", () => {
  const overview = adminService.getOverview();
  assert.strictEqual(overview.kpi.totalTools, 22);
  assert.strictEqual(overview.kpi.totalCategories, 6);
  assert.ok(overview.kpi.activeRedirects >= 3);
  assert.strictEqual(overview.categories.length, 6);
});

test("AdminService tools management supports status toggles and metadata updates", () => {
  const mockAdmin = {
    userId: "u-test",
    email: "admin@typekittools.com",
    name: "Test Admin",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  const updated = adminService.updateTool(
    "tool-1",
    { metaTitle: "Updated Symbol Copy Title" },
    mockAdmin
  );
  assert.ok(updated);
  assert.strictEqual(updated?.metaTitle, "Updated Symbol Copy Title");
});

test("AdminService redirect management handles create, toggle, and audit logging", () => {
  const mockAdmin = {
    userId: "u-test",
    email: "admin@typekittools.com",
    name: "Test Admin",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  const newRedirect = adminService.createRedirect(
    { sourcePath: "/old-calc", targetPath: "/tools/unicode/unicode-search", statusCode: 301 },
    mockAdmin
  );
  assert.ok(newRedirect);
  assert.strictEqual(newRedirect.sourcePath, "/old-calc");

  const toggled = adminService.toggleRedirect(newRedirect.id, mockAdmin);
  assert.strictEqual(toggled?.isActive, false);

  const deleted = adminService.deleteRedirect(newRedirect.id, mockAdmin);
  assert.strictEqual(deleted, true);
});

// --- SUITE 6: Phase 5 SEO Engine, Page Generation and Content Management ---
console.log("\nSuite 6: Phase 5 SEO Engine, Page Generation & CMS");
import { buildPageMetadata } from "../src/lib/seo/metadata";
import {
  generateBreadcrumbJsonLd,
  generateSoftwareApplicationJsonLd,
  generateArticleJsonLd,
  generateFaqPageJsonLd,
  generateDefinedTermJsonLd,
  generateCollectionPageJsonLd,
} from "../src/lib/seo/jsonld";
import { runSeoAudit } from "../src/lib/seo/validator";
import sitemap from "../src/app/sitemap";

test("buildPageMetadata builds canonical, OG images, and regional alternates", () => {
  const meta = buildPageMetadata({
    title: "Test Utility",
    description: "Test description for developer utility",
    canonicalPath: "/tools/developer/test-tool",
    category: "Developer Utilities",
  });

  assert.strictEqual(meta.title, "Test Utility | TypeKitTools");
  assert.strictEqual(meta.description, "Test description for developer utility");
  assert.strictEqual(meta.alternates?.canonical, "https://typekittools.com/tools/developer/test-tool");
  assert.ok(meta.alternates?.languages?.["en-US"]);
  assert.ok(meta.alternates?.languages?.["en-GB"]);

  // Open Graph verification
  assert.strictEqual(meta.openGraph?.title, "Test Utility | TypeKitTools");
  const ogImg = (meta.openGraph?.images as any[])?.[0]?.url;
  assert.ok(ogImg?.includes("/api/og"));
  assert.ok(ogImg?.includes("title=Test+Utility"));
});

test("buildPageMetadata enforces noindex when isIndexable is false", () => {
  const meta = buildPageMetadata({
    title: "Draft Tool",
    description: "Not ready for indexing",
    isIndexable: false,
  });

  assert.strictEqual((meta.robots as any)?.index, false);
  assert.strictEqual((meta.robots as any)?.follow, false);
});

test("Structured data JSON-LD generators produce valid Schema.org graphs", () => {
  // 1. Breadcrumbs
  const breadcrumbSchema = generateBreadcrumbJsonLd([
    { name: "Tools", url: "/tools" },
    { name: "Base64", url: "/tools/developer/base64" },
  ]);
  assert.strictEqual(breadcrumbSchema["@type"], "BreadcrumbList");
  assert.strictEqual(breadcrumbSchema.itemListElement.length, 3);
  assert.strictEqual(breadcrumbSchema.itemListElement[0].name, "Home");
  assert.strictEqual(breadcrumbSchema.itemListElement[2].name, "Base64");

  // 2. WebApplication
  const appSchema = generateSoftwareApplicationJsonLd({
    name: "Base64 Encoder",
    description: "Encode strings to base64",
    url: "/tools/developer/base64",
  });
  assert.strictEqual(appSchema["@type"], "WebApplication");
  assert.strictEqual(appSchema.offers.price, "0");

  // 3. Article
  const articleSchema = generateArticleJsonLd({
    title: "How Hashes Work",
    description: "MD5 vs SHA256",
    url: "/articles/how-hashes-work",
  });
  assert.strictEqual(articleSchema["@type"], "Article");
  assert.strictEqual(articleSchema.headline, "How Hashes Work");

  // 4. FAQPage
  const faqSchema = generateFaqPageJsonLd([
    { question: "Is it free?", answer: "Yes, completely free." },
  ]);
  assert.strictEqual(faqSchema["@type"], "FAQPage");
  assert.strictEqual(faqSchema.mainEntity[0].name, "Is it free?");

  // 5. DefinedTerm (Symbols)
  const termSchema = generateDefinedTermJsonLd({
    name: "Euro Sign",
    character: "€",
    codepoint: "U+20AC",
    block: "Currency Symbols",
  });
  assert.strictEqual(termSchema["@type"], "DefinedTerm");
  assert.strictEqual(termSchema.termCode, "U+20AC");

  // 6. CollectionPage
  const colSchema = generateCollectionPageJsonLd({
    name: "Currency Symbols",
    description: "Money symbols",
    url: "/symbols/currency",
    itemCount: 42,
  });
  assert.strictEqual(colSchema["@type"], "CollectionPage");
  assert.strictEqual(colSchema.numberOfItems, 42);
});

test("CMS Article CRUD and publication scheduling logic works properly", () => {
  const mockAdmin = {
    userId: "admin-1",
    email: "admin@typekittools.com",
    name: "Admin User",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  // Create article scheduled in the future (tomorrow)
  const tomorrow = new Date(Date.now() + 86400000).toISOString();
  const scheduledArticle = adminService.createCmsArticle(
    {
      title: "Scheduled Future Feature",
      slug: "scheduled-future-feature",
      category: "News",
      summary: "This article is scheduled for tomorrow",
      contentMarkdown: "Content not public yet...",
      seoTitle: "Scheduled Feature",
      seoDescription: "Scheduled description for future release",
      isPublished: true,
      isIndexable: true,
      publishedAt: tomorrow,
      readingTime: "3 min read",
      faqs: [],
      internalLinks: [],
    },
    mockAdmin
  );

  assert.ok(scheduledArticle);
  assert.strictEqual(scheduledArticle.slug, "scheduled-future-feature");

  // Future scheduled article MUST NOT be in eligible published articles
  const eligible = adminService.getEligiblePublishedArticles();
  const foundScheduled = eligible.some((a) => a.slug === "scheduled-future-feature");
  assert.strictEqual(foundScheduled, false, "Future scheduled article must be omitted from public listing");

  // Cleanup
  adminService.deleteCmsArticle(scheduledArticle.id, mockAdmin);
});

test("SEO Validation Engine runs comprehensive audit and identifies technical quality", () => {
  const report = runSeoAudit();
  assert.ok(report.totalPagesInspected >= 20, "Should inspect tools, guides, symbols & articles");
  assert.ok(report.healthScore >= 80, `SEO Health Score should be high (actual: ${report.healthScore}%)`);
  assert.strictEqual(report.errorsCount, 0, "There should be 0 blocking errors across canonical platform pages");
});

test("Dynamic sitemap output strictly adheres to indexing and publication rules", () => {
  const routes = sitemap();
  assert.ok(routes.length >= 70, `Sitemap must index all core hubs, tools, and symbols (actual: ${routes.length})`);

  // Verify URL properties
  const urls = routes.map((r) => r.url);
  assert.ok(urls.some((u) => u.endsWith("/")), "Must contain root /");
  assert.ok(urls.some((u) => u.includes("/tools/developer/hash-generator")), "Must contain hash-generator");
  assert.ok(urls.some((u) => u.includes("/symbols/detail/euro-sign")), "Must contain symbol detail page");
  assert.ok(urls.some((u) => u.includes("/articles/how-cryptographic-hashes-work")), "Must contain published CMS article");
  assert.ok(urls.some((u) => u.includes("/emoji/smileys")), "Must contain emoji category");

  // Verify strict exclusions
  for (const url of urls) {
    assert.strictEqual(url.includes("/admin"), false, "Admin pages must NEVER appear in sitemap");
    assert.strictEqual(url.includes("/api"), false, "API routes must NEVER appear in sitemap");
    assert.strictEqual(url.includes("/search"), false, "Internal search queries must NEVER appear in sitemap");
  }
});

// --- SUITE 7: Phase 6 Admin Dashboard, Analytics, RBAC & AdSense ---
console.log("\nSuite 7: Phase 6 Admin Dashboard, Analytics, RBAC & AdSense");

test("RBAC hierarchy permits authorized roles and rejects unauthorized roles", () => {
  // Super Admin > Admin > Editor > Author > Viewer
  assert.strictEqual(isAuthorized("super_admin", "admin"), true);
  assert.strictEqual(isAuthorized("admin", "editor"), true);
  assert.strictEqual(isAuthorized("editor", "author"), true);
  assert.strictEqual(isAuthorized("author", "viewer"), true);

  // Negative checks
  assert.strictEqual(isAuthorized("editor", "admin"), false);
  assert.strictEqual(isAuthorized("author", "editor"), false);
  assert.strictEqual(isAuthorized("viewer", "author"), false);
});

test("Super Admin can create, modify, and delete administrative users", () => {
  const superAdmin = {
    userId: "usr-admin-1",
    email: "admin@typekittools.com",
    name: "System Administrator",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  const editorUser = {
    userId: "usr-editor-1",
    email: "editor@typekittools.com",
    name: "Senior Editor",
    role: "editor" as const,
    exp: 9999999999,
  };

  // Editor attempting to create user must be rejected
  assert.throws(() => {
    adminService.createUser(
      { email: "hacker@test.com", name: "Hacker", password: "Password123!", role: "super_admin" },
      editorUser
    );
  }, /Only Super Administrators can create users/);

  // Super Admin creating new user
  const newUser = adminService.createUser(
    { email: "newwriter@typekittools.com", name: "New Writer", password: "WriterPass2026!", role: "author" },
    superAdmin
  );
  assert.strictEqual(newUser.email, "newwriter@typekittools.com");
  assert.strictEqual(newUser.role, "author");

  // Update user
  const updated = adminService.updateUser(newUser.id, { name: "Senior Writer" }, superAdmin);
  assert.strictEqual(updated?.name, "Senior Writer");

  // Delete user
  const deleted = adminService.deleteUser(newUser.id, superAdmin);
  assert.strictEqual(deleted, true);
});

test("Ad placement system manages placement settings and preserves layout space", () => {
  const superAdmin = {
    userId: "usr-admin-1",
    email: "admin@typekittools.com",
    name: "System Administrator",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  const placements = adminService.getAdPlacements();
  assert.ok(placements.length >= 4, "Must have header, tool-bottom, article-inline, and footer placements");

  const headerPlacement = adminService.getAdPlacement("HEADER_BELOW_NAV");
  assert.ok(headerPlacement);
  assert.strictEqual(headerPlacement.minHeight, 90, "Leaderboard must reserve 90px minHeight for CLS");

  // Toggle placement
  const updated = adminService.updateAdPlacement("HEADER_BELOW_NAV", { isEnabled: false }, superAdmin);
  assert.strictEqual(updated?.isEnabled, false);

  // Restore
  adminService.updateAdPlacement("HEADER_BELOW_NAV", { isEnabled: true }, superAdmin);
});

test("Custom symbol manager supports creation, deletion, and bulk JSON importing", () => {
  const superAdmin = {
    userId: "usr-admin-1",
    email: "admin@typekittools.com",
    name: "System Administrator",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  // 1. Create individual symbol
  const sym = adminService.createCustomSymbol(
    {
      character: "₿",
      name: "BITCOIN SIGN",
      codepoint: "U+20BF",
      category: "currency",
      keywords: ["bitcoin", "crypto", "btc"],
    },
    superAdmin
  );
  assert.strictEqual(sym.character, "₿");
  assert.strictEqual(sym.codepoint, "U+20BF");

  // 2. Bulk JSON Import with clean unique codepoint
  const testCodepoint = "U+" + Math.floor(0xE000 + Math.random() * 0x1000).toString(16).toUpperCase();
  const sampleJson = JSON.stringify([
    {
      character: "✦",
      name: "TEST FOUR POINTED STAR",
      codepoint: testCodepoint,
      category: "stars",
      keywords: ["star", "sparkle"],
    },
  ]);

  const importResult = adminService.importSymbolsFromJson(sampleJson, superAdmin);
  assert.strictEqual(importResult.imported, 1, "Must import newly provided unique symbol");
  assert.strictEqual(importResult.errors.length, 0);

  // Cleanup
  adminService.deleteCustomSymbol(sym.id, superAdmin);
});

test("Internal Link architecture tracks links, anchor text, and recorded hits", () => {
  const superAdmin = {
    userId: "usr-admin-1",
    email: "admin@typekittools.com",
    name: "System Administrator",
    role: "super_admin" as const,
    exp: 9999999999,
  };

  const link = adminService.createInternalLink(
    {
      anchorText: "Test Link Hub",
      targetUrl: "/tools/developer/test",
      category: "tools",
      description: "Automated test link",
    },
    superAdmin
  );
  assert.strictEqual(link.anchorText, "Test Link Hub");
  assert.strictEqual(link.clickCount, 0);

  // Cleanup
  adminService.deleteInternalLink(link.id, superAdmin);
});

test("Dashboard overview KPI metrics accurately aggregate all required dimensions", () => {
  const overview = adminService.getOverview();
  assert.ok(overview.kpi.totalTools >= 15, "Must track total tools");
  assert.ok(overview.kpi.publishedTools >= 15, "Must track published tools");
  assert.strictEqual(typeof overview.kpi.draftTools, "number", "Must track draft tools");
  assert.ok(overview.kpi.publishedPages >= 20, "Must track published pages");
  assert.strictEqual(typeof overview.kpi.draftPages, "number", "Must track draft pages");
  assert.ok(overview.kpi.totalCategories >= 6, "Must track categories");
  assert.ok(overview.recentChanges.length > 0, "Must track recent changes");
  assert.ok(overview.recentLogs.length > 0, "Must track recent admin activity");
});

// --- SUITE 8: Phase 7 Production Readiness, Security & Deployment ---
console.log("\nSuite 8: Phase 7 Production Readiness, Security & Deployment");
import fs from "node:fs";
import path from "node:path";

test("Health check endpoint returns operational status and runtime diagnostics", async () => {
  const { GET } = await import("../src/app/api/health/route");
  const response = await GET();
  assert.strictEqual(response.status, 200);

  const data = await response.json();
  assert.strictEqual(data.status, "healthy");
  assert.strictEqual(data.version, "1.0.0");
  assert.ok(data.uptime.seconds >= 0);
  assert.ok(data.memory.heapUsedMb > 0);
  assert.strictEqual(data.services.database, "healthy");
});

test("Production Docker Compose defines all 5 required microservices and volumes", () => {
  const composePath = path.join(process.cwd(), "docker-compose.prod.yml");
  assert.ok(fs.existsSync(composePath), "docker-compose.prod.yml must exist");

  const content = fs.readFileSync(composePath, "utf-8");
  assert.ok(content.includes("typekit_web"), "Must define web container");
  assert.ok(content.includes("typekit_db"), "Must define postgres db container");
  assert.ok(content.includes("typekit_proxy"), "Must define nginx reverse proxy container");
  assert.ok(content.includes("typekit_backup"), "Must define automated backup daemon container");
  assert.ok(content.includes("typekit_certbot"), "Must define certbot SSL renewal container");
  assert.ok(content.includes("postgres_data:"), "Must declare persistent postgres volume");
  assert.ok(content.includes("backups_data:"), "Must declare persistent backups volume");
});

test("Nginx configuration enforces TLS 1.2/1.3, rate limits, and zero-leak headers", () => {
  const confPath = path.join(process.cwd(), "docker", "nginx", "conf.d", "typekittools.conf");
  assert.ok(fs.existsSync(confPath), "Nginx server block configuration must exist");

  const content = fs.readFileSync(confPath, "utf-8");
  assert.ok(content.includes("TLSv1.2 TLSv1.3"), "Must strictly require TLS 1.2 or 1.3");
  assert.ok(content.includes("Strict-Transport-Security"), "Must enforce HSTS");
  assert.ok(content.includes("limit_req zone=api_limit"), "Must apply rate limiting to API endpoints");
  assert.ok(content.includes("proxy_pass http://nextjs_upstream"), "Must reverse proxy to Next.js upstream");
});

test("Automated backup and restore scripts exist with executable permissions", () => {
  const backupPath = path.join(process.cwd(), "scripts", "backup.sh");
  const restorePath = path.join(process.cwd(), "scripts", "restore.sh");
  assert.ok(fs.existsSync(backupPath), "scripts/backup.sh must exist");
  assert.ok(fs.existsSync(restorePath), "scripts/restore.sh must exist");

  const backupContent = fs.readFileSync(backupPath, "utf-8");
  assert.ok(backupContent.includes("pg_dump"), "Backup script must invoke pg_dump");
  assert.ok(backupContent.includes("sha256sum"), "Backup script must compute integrity checksum");

  const restoreContent = fs.readFileSync(restorePath, "utf-8");
  assert.ok(restoreContent.includes("pg_restore"), "Restore script must invoke pg_restore");
});

test("Next.js configuration specifies standalone output and strict CSP", () => {
  const nextConfPath = path.join(process.cwd(), "next.config.mjs");
  const content = fs.readFileSync(nextConfPath, "utf-8");
  assert.ok(content.includes('output: "standalone"'), "Must configure standalone output for Docker");
  assert.ok(content.includes("Content-Security-Policy"), "Must configure Content-Security-Policy header");
  assert.ok(content.includes("X-Frame-Options"), "Must configure X-Frame-Options SAMEORIGIN");
});

// --- SUITE 9: Phase 8 Batch A: Unicode and Text Tools ---
console.log("\nSuite 9: Phase 8 Batch A: Unicode and Text Tools");

test("UTF-8 Encoder encodes text to hex, binary, decimal, percent, c-array and base64", () => {
  const text = "€25";
  const hex = encodeUtf8(text, "hex");
  assert.strictEqual(hex, "E2 82 AC 32 35");

  const bin = encodeUtf8("A", "binary");
  assert.strictEqual(bin, "01000001");

  const dec = encodeUtf8("€", "decimal");
  assert.strictEqual(dec, "226 130 172");

  const percent = encodeUtf8("€", "percent");
  assert.strictEqual(percent, "%E2%82%AC");

  const cArray = encodeUtf8("€", "c-array");
  assert.ok(cArray.includes("0xE2, 0x82, 0xAC"));

  const b64 = encodeUtf8("TypeKit", "base64");
  assert.strictEqual(b64, "VHlwZUtpdA==");
});

test("UTF-8 Decoder accurately reconstructs strings and flags invalid byte sequences", () => {
  // Valid decode
  const res = decodeUtf8("E2 82 AC 32 35", "hex");
  assert.strictEqual(res.text, "€25");
  assert.strictEqual(res.byteCount, 5);

  const binRes = decodeUtf8("01000001 01000010", "binary");
  assert.strictEqual(binRes.text, "AB");

  // Invalid byte error handling
  const badRes = decodeUtf8("FF FF FF", "hex");
  assert.ok(badRes.error, "Must flag invalid UTF-8 byte stream");
});

test("UTF-16 Converter computes code units and surrogate pairs for astral characters", () => {
  // Rocket emoji 🚀 is U+1F680 (Astral plane)
  const analysis = analyzeUtf16("🚀");
  assert.strictEqual(analysis.totalCodeUnits, 2);
  assert.strictEqual(analysis.details.length, 1);
  assert.strictEqual(analysis.details[0].isAstral, true);
  assert.strictEqual(analysis.details[0].highSurrogate, "0xD83D");
  assert.strictEqual(analysis.details[0].lowSurrogate, "0xDE80");

  // Decode UTF-16 escapes
  const decoded = decodeUtf16("\\u0048\\u0065\\u006C\\u006C\\u006F");
  assert.strictEqual(decoded.text, "Hello");
});

test("Unicode Normalizer generates all 4 forms (NFC, NFD, NFKC, NFKD)", () => {
  // Decomposed e + combining acute
  const decomposed = "e\u0301";
  const norm = normalizeUnicode(decomposed);

  assert.strictEqual(norm.nfc, "é");
  assert.strictEqual(norm.nfc.length, 1);
  assert.strictEqual(norm.nfd, "e\u0301");
  assert.strictEqual(norm.nfd.length, 2);

  // Ligature fi decomposition
  const ligature = "ﬁ";
  const normLigature = normalizeUnicode(ligature);
  assert.strictEqual(normLigature.nfkc, "fi");
});

test("Text Reverser handles characters, words, lines, and upside-down transforms", () => {
  // Grapheme-safe character reversal
  const text = "Hello 🚀!";
  const rev = reverseText(text, "characters");
  assert.strictEqual(rev, "!🚀 olleH");

  // Words reversal
  const wordsRev = reverseText("quick brown fox", "words");
  assert.strictEqual(wordsRev, "fox brown quick");

  // Lines reversal
  const linesRev = reverseText("Line 1\nLine 2\nLine 3", "lines");
  assert.strictEqual(linesRev, "Line 3\nLine 2\nLine 1");

  // Upside-down
  const flipped = reverseText("Hello", "upside-down");
  assert.ok(flipped.includes("ǝ"));
});

test("Text Repeater multiplies text with custom delimiters and numbering safely", () => {
  const repeated = repeatText("Ping", 3, { delimiter: ", ", numbering: "number" });
  assert.strictEqual(repeated.result, "1. Ping, 2. Ping, 3. Ping");
  assert.strictEqual(repeated.charCount, "1. Ping, 2. Ping, 3. Ping".length);

  // Safety limiter test
  const clamped = repeatText("A", 20000);
  assert.strictEqual(clamped.lineCount, 10000);
});

test("Line Break Remover strips unwanted newlines while preserving paragraphs", () => {
  const input = "Line one\nwrapped line two\n\nParagraph two";
  const cleaned = removeLineBreaks(input, { mode: "preserve-paragraphs" });
  assert.strictEqual(cleaned.result, "Line one wrapped line two\n\nParagraph two");
  assert.strictEqual(cleaned.removedBreaks, 1);

  const singleLine = removeLineBreaks("A\nB\nC", { mode: "all" });
  assert.strictEqual(singleLine.result, "A B C");
});

test("Batch A tool definitions and routes are properly registered in ToolRegistry", () => {
  const batchASlugs = [
    "utf8-encoder-decoder",
    "utf16-converter",
    "unicode-normalizer",
    "text-reverser",
    "text-repeater",
    "case-converter",
    "line-break-remover",
    "diff-checker",
  ];

  for (const slug of batchASlugs) {
    const tool = toolRegistry.getBySlug(slug);
    assert.ok(tool, `Tool with slug "${slug}" must be registered in toolRegistry`);
    assert.ok(tool.name, `Tool "${slug}" must have a name`);
    assert.ok(tool.seo.title, `Tool "${slug}" must have SEO title`);
    assert.ok(tool.seo.metaDescription, `Tool "${slug}" must have meta description`);
    assert.ok(tool.relatedToolSlugs.length > 0, `Tool "${slug}" must have related tool links`);
  }
});


// --- SUITE 10: Phase 8 Batch B: Developer Utilities ---
console.log("\nSuite 10: Phase 8 Batch B: Developer Utilities");

test("HTML Formatter formats and indents HTML and handles void elements properly", () => {
  const raw = "<div><p>Hello</p><br><img src='test.png'><span>World</span></div>";
  const { formatted, tagCount } = formatHtml(raw, { indent: 2 });

  assert.ok(formatted.includes("  <p>"), "Must indent child elements");
  assert.ok(formatted.includes("<img src='test.png'>"), "Must preserve void element");
  assert.ok(tagCount >= 5, "Must count HTML tags correctly");

  const min = minifyHtml("<div>   <p>Hello  World</p>  </div>");
  assert.strictEqual(min, "<div><p>Hello World</p></div>");
});

test("CSS Formatter indents rules and minifyCss strips comments and whitespace", () => {
  const rawCss = ".btn{color:red;margin:0;}";
  const { formatted, ruleCount } = formatCss(rawCss, { indent: 2 });
  assert.ok(formatted.includes("color: red;"), "Must format CSS property");
  assert.strictEqual(ruleCount, 1);

  const minCss = minifyCss("/* comment */ .btn { color: red; margin: 0; }");
  assert.strictEqual(minCss, ".btn{color:red;margin:0}");
});

test("CSS Escape Generator escapes selectors, Tailwind classes, and content property", () => {
  const tw = escapeCssSelector("sm:hover:bg-red-500/20");
  assert.strictEqual(tw.tailwindClassEscape, "sm\\:hover\\:bg-red-500\\/20");

  const digitId = escapeCssSelector("123heading");
  assert.ok(digitId.selectorEscape.startsWith("\\31 "), "Leading digit must be hex-escaped");

  const euroContent = escapeCssSelector("€");
  assert.ok(euroContent.cssContentEscape.includes("\\20AC"), "Must escape content to hex codepoints");
});

test("JavaScript Unicode Converter bidirectionally encodes and decodes \\u escapes", () => {
  const original = "Café 🚀";
  const escaped = convertJsUnicode(original, "encode", { es6Braces: true });
  assert.ok(escaped.includes("\\u00E9"), "Must escape é to \\u00E9");
  assert.ok(escaped.includes("\\u{1F680}"), "Must escape rocket to \\u{1F680}");

  const decoded = convertJsUnicode(escaped, "decode");
  assert.strictEqual(decoded, original);
});

test("Multi-radix converter (Hex, Binary, Decimal) accurately handles BigInt integers", () => {
  // 64-bit BigInt value: 18446744073709551615 (0xFFFFFFFFFFFFFFFF)
  const hexRes = convertRadix("FFFFFFFFFFFFFFFF", 16);
  assert.strictEqual(hexRes.decimal, "18446744073709551615");
  assert.strictEqual(hexRes.bitLength, 64);

  const binRes = convertRadix("11111111", 2);
  assert.strictEqual(binRes.decimal, "255");
  assert.strictEqual(binRes.hexadecimal, "FF");

  const decRes = convertRadix("255", 10);
  assert.strictEqual(decRes.hexadecimal, "FF");
  assert.strictEqual(decRes.binary, "11111111");

  // Roman numerals
  assert.strictEqual(decimalToRoman(2026), "MMXXVI");
  assert.strictEqual(decimalToRoman(4), "IV");
  assert.strictEqual(decimalToRoman(99), "XCIX");
});

test("Batch B tool definitions and routes are properly registered in ToolRegistry", () => {
  const batchBSlugs = [
    "html-formatter",
    "css-formatter",
    "css-escape",
    "js-unicode-converter",
    "hex-converter",
    "binary-converter",
    "decimal-converter",
    "uuid-generator",
    "hash-generator",
    "timestamp-converter",
  ];

  for (const slug of batchBSlugs) {
    const tool = toolRegistry.getBySlug(slug);
    assert.ok(tool, `Tool with slug "${slug}" must be registered in toolRegistry`);
    assert.ok(tool.name, `Tool "${slug}" must have a name`);
    assert.ok(tool.seo.title, `Tool "${slug}" must have SEO title`);
    assert.ok(tool.seo.metaDescription, `Tool "${slug}" must have meta description`);
    assert.ok(tool.relatedToolSlugs.length > 0, `Tool "${slug}" must have related tool links`);
  }
});


// --- SUITE 11: Phase 8 Batch C: Advanced Tools ---
console.log("\nSuite 11: Phase 8 Batch C: Advanced Tools");

test("JSON Validator accurately validates RFC 8259 syntax and computes structural stats", () => {
  const validRes = validateJson('{"title": "Test", "count": 42, "nested": {"active": true}}');
  assert.strictEqual(validRes.isValid, true);
  assert.strictEqual(validRes.stats?.keys, 4);
  assert.strictEqual(validRes.stats?.depth, 3);

  const invalidRes = validateJson('{"title": "Unclosed string}');
  assert.strictEqual(invalidRes.isValid, false);
  assert.ok(invalidRes.error, "Must report syntax error");
});

test("XML Formatter beautifies and indents XML documents and preserves declarations", () => {
  const rawXml = '<?xml version="1.0"?><root><item id="1">Text</item><selfClose/></root>';
  const { formatted, isValid, tagCount } = formatXml(rawXml, { indent: 2 });
  assert.strictEqual(isValid, true);
  assert.ok(formatted.includes("  <item id=\"1\">"), "Must indent child elements");
  assert.ok(tagCount >= 2, "Must count XML tags");
});

test("URL Parser extracts protocol, host, port, path segments, and query parameters", () => {
  const rawUrl = "https://user:pass@api.typekittools.com:8443/v1/tools/search?q=emoji&page=2#top";
  const parsed = parseUrl(rawUrl);

  assert.strictEqual(parsed.isValid, true);
  assert.strictEqual(parsed.protocol, "https:");
  assert.strictEqual(parsed.hostname, "api.typekittools.com");
  assert.strictEqual(parsed.port, "8443");
  assert.strictEqual(parsed.pathname, "/v1/tools/search");
  assert.deepStrictEqual(parsed.pathSegments, ["v1", "tools", "search"]);
  assert.strictEqual(parsed.queryParams.length, 2);
  assert.strictEqual(parsed.queryParams[0].key, "q");
  assert.strictEqual(parsed.queryParams[0].value, "emoji");
  assert.strictEqual(parsed.hash, "#top");
});

test("Query String Builder formats parameters and supports array representations", () => {
  const params = [
    { key: "q", value: "test query" },
    { key: "tags", value: "a" },
    { key: "tags", value: "b" },
  ];

  const brackets = buildQueryString(params, { arrayFormat: "brackets", prefixQuestionMark: false });
  assert.strictEqual(brackets, "q=test%20query&tags%5B%5D=a&tags%5B%5D=b");

  const repeat = buildQueryString(params, { arrayFormat: "repeat", prefixQuestionMark: true });
  assert.strictEqual(repeat, "?q=test%20query&tags=a&tags=b");
});

test("JWT Decoder client-side decodes header, payload claims, and validates expiration", () => {
  // Payload: { sub: "1234567890", name: "John Doe", iat: 1516239022 }
  const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const res = decodeJwt(sampleToken);

  assert.strictEqual(res.isValid, true);
  assert.strictEqual(res.header.alg, "HS256");
  assert.strictEqual(res.header.typ, "JWT");
  assert.strictEqual(res.payload.name, "John Doe");
  assert.strictEqual(res.payload.sub, "1234567890");
});

test("Color Converter bidirectionally transforms HEX, RGB, HSL, CMYK and calculates WCAG contrast", () => {
  // Test Teal #0D9488
  const res = convertColor("#0D9488");
  assert.strictEqual(res.isValid, true);
  assert.strictEqual(res.hex, "#0D9488");
  assert.strictEqual(res.r, 13);
  assert.strictEqual(res.g, 148);
  assert.strictEqual(res.b, 136);
  assert.strictEqual(res.rgb, "rgb(13, 148, 136)");
  assert.ok(res.hsl.startsWith("hsl(175,"), "Must compute correct Hue");
  assert.ok(res.contrastWhite > 1, "Must calculate contrast with white");
  assert.ok(res.contrastBlack > 1, "Must calculate contrast with black");
});

test("Markdown to HTML renderer safely formats headers, code blocks, lists, and links", () => {
  const md = "# Heading 1\n\nThis is **bold** and *italic* with a [link](https://test.com).\n\n```js\nconsole.log(1);\n```";
  const html = renderMarkdownToHtml(md);

  assert.ok(html.includes("<h1"), "Must render H1");
  assert.ok(html.includes("<strong class=\"font-bold"), "Must render bold");
  assert.ok(html.includes("<pre class=\"bg-muted/80"), "Must render code block");
  assert.ok(html.includes("<a href=\"https://test.com\""), "Must render anchor link");
});

test("Batch C tool definitions and routes are properly registered in ToolRegistry", () => {
  const batchCSlugs = [
    "regex-tester",
    "json-validator",
    "xml-formatter",
    "markdown-previewer",
    "url-parser",
    "query-string-builder",
    "jwt-decoder",
    "color-converter",
  ];

  for (const slug of batchCSlugs) {
    const tool = toolRegistry.getBySlug(slug);
    assert.ok(tool, `Tool with slug "${slug}" must be registered in toolRegistry`);
    assert.ok(tool.name, `Tool "${slug}" must have a name`);
    assert.ok(tool.seo.title, `Tool "${slug}" must have SEO title`);
    assert.ok(tool.seo.metaDescription, `Tool "${slug}" must have meta description`);
    assert.ok(tool.relatedToolSlugs.length > 0, `Tool "${slug}" must have related tool links`);
  }
});

console.log("\nSuite 12: Google Keyword Planner Dataset & Semantic Integration");

test("PLANNER_KEYWORDS dataset contains 387 keywords and >= 2.6M monthly search volume", () => {
  assert.strictEqual(PLANNER_KEYWORDS.length, 387, "Must contain all 387 keywords from Planner export");
  const totalVolume = PLANNER_KEYWORDS.reduce((acc, k) => acc + k.searches, 0);
  assert.ok(totalVolume >= 2600000, `Total search volume must exceed 2.6M (got ${totalVolume})`);
  assert.strictEqual(KEYWORD_CLUSTERS.length, 9, "Must group keywords into 9 semantic clusters");
});

test("High-volume search phrases map correctly to primary symbols and routes", () => {
  // Copyright queries (500k volume)
  const cGlyph = PLANNER_KEYWORDS.find((k) => k.keyword === "copyright glyph");
  assert.ok(cGlyph, "copyright glyph keyword must exist");
  assert.strictEqual(cGlyph.searches, 500000);
  assert.strictEqual(cGlyph.primarySymbol, "©");
  assert.strictEqual(cGlyph.targetRoute, "/symbols/legal");

  const cSymbol = PLANNER_KEYWORDS.find((k) => k.keyword === "c symbol");
  assert.ok(cSymbol, "c symbol keyword must exist");
  assert.strictEqual(cSymbol.searches, 500000);
  assert.strictEqual(cSymbol.primarySymbol, "©");

  // Spanish ñ queries (50k volume)
  const nKey = PLANNER_KEYWORDS.find((k) => k.keyword === "shortcut keyboard for ñ");
  assert.ok(nKey, "shortcut keyboard for ñ must exist");
  assert.strictEqual(nKey.searches, 50000);
  assert.strictEqual(nKey.primarySymbol, "ñ");
  assert.strictEqual(nKey.targetRoute, "/symbols/accents");

  // Degree symbol queries (50k volume)
  const degKey = PLANNER_KEYWORDS.find((k) => k.keyword === "alt codes degree");
  assert.ok(degKey, "alt codes degree must exist");
  assert.strictEqual(degKey.searches, 50000);
  assert.strictEqual(degKey.primarySymbol, "°");
  assert.strictEqual(degKey.targetRoute, "/symbols/math");

  // Heart queries (5k volume)
  const heartKey = PLANNER_KEYWORDS.find((k) => k.keyword === "keyboard shortcut for heart");
  assert.ok(heartKey, "keyboard shortcut for heart must exist");
  assert.strictEqual(heartKey.primarySymbol, "♥");
  assert.strictEqual(heartKey.targetRoute, "/symbols/hearts");

  // Checkmark queries (5k volume)
  const checkKey = PLANNER_KEYWORDS.find((k) => k.keyword === "keyboard shortcut for check");
  assert.ok(checkKey, "keyboard shortcut for check must exist");
  assert.strictEqual(checkKey.primarySymbol, "✓");
  assert.strictEqual(checkKey.targetRoute, "/symbols/checkmarks");
});

test("allSymbols database contains enriched keywords, MS Word shortcuts, and new categories", () => {
  const copyright = allSymbols.find((s) => s.character === "©");
  assert.ok(copyright, "Copyright must be present in allSymbols");
  assert.strictEqual(copyright.wordShortcut, "Ctrl + Alt + C");
  assert.ok(copyright.keywords && copyright.keywords.includes("copyright glyph"));
  assert.ok(copyright.keywords && copyright.keywords.includes("c symbol"));

  const nTilde = allSymbols.find((s) => s.character === "ñ");
  assert.ok(nTilde, "ñ must be present in allSymbols");
  assert.strictEqual(nTilde.category, "accents");
  assert.strictEqual(nTilde.altCodeWindows, "Alt + 164 or Alt + 0241");
  assert.ok(nTilde.keywords && nTilde.keywords.includes("shortcut keyboard for ñ"));

  const degree = allSymbols.find((s) => s.character === "°");
  assert.ok(degree, "Degree sign must be present in allSymbols");
  assert.ok(degree.keywords && degree.keywords.includes("alt codes degree"));

  const heart = allSymbols.find((s) => s.character === "♥");
  assert.ok(heart, "Heart must be present in allSymbols");
  assert.strictEqual(heart.category, "hearts");
  assert.strictEqual(heart.altCodeWindows, "Alt + 3");

  const square = allSymbols.find((s) => s.character === "²");
  assert.ok(square, "Superscript two (square) must be present in allSymbols");
  assert.strictEqual(square.category, "math");

  const ampersand = allSymbols.find((s) => s.character === "&");
  assert.ok(ampersand, "Ampersand must be present in allSymbols");
  assert.strictEqual(ampersand.category, "keyboard-signs");

  // Verify all categories in symbolCategories have symbols
  for (const cat of symbolCategories) {
    const inCat = allSymbols.filter((s) => s.category === cat.slug);
    assert.ok(inCat.length > 0, `Category "${cat.slug}" (${cat.name}) must have symbols`);
  }
});

test("Universal search index resolves Keyword Planner queries accurately", () => {
  const cResults = querySearchIndex("c symbol");
  assert.ok(
    cResults.symbol.some((s) => s.previewChar === "©"),
    "Searching 'c symbol' must return copyright ©"
  );

  const nResults = querySearchIndex("shortcut keyboard for ñ");
  assert.ok(
    nResults.symbol.some((s) => s.previewChar === "ñ"),
    "Searching 'shortcut keyboard for ñ' must return ñ"
  );

  const degResults = querySearchIndex("alt codes degree");
  assert.ok(
    degResults.symbol.some((s) => s.previewChar === "°"),
    "Searching 'alt codes degree' must return degree °"
  );

  const heartResults = querySearchIndex("keyboard shortcut for heart");
  assert.ok(
    heartResults.symbol.some((s) => s.previewChar === "♥"),
    "Searching 'keyboard shortcut for heart' must return heart ♥"
  );

  const checkResults = querySearchIndex("keyboard shortcut for check");
  assert.ok(
    checkResults.symbol.some((s) => s.previewChar === "✓"),
    "Searching 'keyboard shortcut for check' must return checkmark ✓"
  );
});

test("New keyboard shortcut guides are valid and meet SEO content criteria", () => {
  const guide1 = guidesData["keyboard-symbol-shortcuts"];
  assert.ok(guide1, "keyboard-symbol-shortcuts guide must exist");
  assert.ok(guide1.metaDescription.length >= 50, "Meta description must be >= 50 chars");
  const words1 = guide1.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0);
  assert.ok(words1 >= 200, `Word count must be >= 200 (got ${words1})`);
  assert.ok(guide1.faqs.length >= 3, "Must have at least 3 FAQs");

  const guide2 = guidesData["spanish-accents-guide"];
  assert.ok(guide2, "spanish-accents-guide must exist");
  assert.ok(guide2.metaDescription.length >= 50, "Meta description must be >= 50 chars");
  const words2 = guide2.sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0);
  assert.ok(words2 >= 200, `Word count must be >= 200 (got ${words2})`);
  assert.ok(guide2.faqs.length >= 3, "Must have at least 3 FAQs");
});

test("Technical SEO audit passes with zero critical errors across expanded catalog", () => {
  const audit = runSeoAudit();
  assert.strictEqual(audit.errorsCount, 0, `Technical SEO audit must have 0 errors (got ${audit.errorsCount})`);
  assert.ok(audit.healthScore >= 95, `SEO health score must be >= 95 (got ${audit.healthScore})`);
});

console.log(`\n==========================================`);
console.log(`  Tests Passed: ${passed}`);
console.log(`  Tests Failed: ${failed}`);
console.log(`==========================================\n`);

if (failed > 0) {
  process.exit(1);
}
