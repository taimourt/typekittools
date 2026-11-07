import { describe, it, expect } from "vitest";
import {
  searchUnicodeCharacters,
  getCharacterBySlugOrCodepoint,
} from "../../src/lib/unicode/search";
import { UNICODE_CHARACTERS } from "../../src/data/unicode/characters-data";

describe("Phase 4: Unicode Data Engine & Search Unit Tests", () => {
  it("should have official Unicode 16.0 characters loaded", () => {
    expect(UNICODE_CHARACTERS.length).toBeGreaterThanOrEqual(25);
  });

  describe("Search Capabilities", () => {
    it("should search by official name", () => {
      const res = searchUnicodeCharacters({ query: "EURO SIGN" });
      expect(res.total).toBeGreaterThan(0);
      expect(res.items.some((i) => i.codepoint === "U+20AC")).toBe(true);
    });

    it("should search by character glyph directly", () => {
      const res = searchUnicodeCharacters({ query: "€" });
      expect(res.total).toBe(1);
      expect(res.items[0].codepoint).toBe("U+20AC");
    });

    it("should search by hex codepoint with or without 'U+' prefix", () => {
      const resWithU = searchUnicodeCharacters({ query: "U+20AC" });
      expect(resWithU.total).toBeGreaterThan(0);
      expect(resWithU.items[0].char).toBe("€");

      const resHexOnly = searchUnicodeCharacters({ query: "20ac" });
      expect(resHexOnly.total).toBeGreaterThan(0);
      expect(resHexOnly.items[0].char).toBe("€");
    });

    it("should search by decimal value", () => {
      // 8364 is decimal for Euro U+20AC
      const res = searchUnicodeCharacters({ query: "8364" });
      expect(res.total).toBeGreaterThan(0);
      expect(res.items[0].char).toBe("€");
    });

    it("should search by aliases and curated keywords", () => {
      const res = searchUnicodeCharacters({ query: "money" });
      expect(res.total).toBeGreaterThan(0);
      expect(res.items.some((i) => i.char === "$" || i.char === "€")).toBe(true);
    });

    it("should filter by category", () => {
      const res = searchUnicodeCharacters({ category: "Currency Symbol" });
      expect(res.total).toBeGreaterThan(0);
      expect(res.items.every((i) => i.category === "Currency Symbol")).toBe(true);
    });

    it("should handle empty search cleanly (return all paginated)", () => {
      const res = searchUnicodeCharacters({ query: "", pageSize: 10 });
      expect(res.items.length).toBe(10);
      expect(res.page).toBe(1);
    });

    it("should handle non-matching queries gracefully", () => {
      const res = searchUnicodeCharacters({ query: "non_existent_symbol_query_12345" });
      expect(res.total).toBe(0);
      expect(res.items.length).toBe(0);
      expect(res.totalPages).toBe(1);
    });
  });

  describe("Character Lookup by Slug or Codepoint", () => {
    it("should retrieve character by slug", () => {
      const char = getCharacterBySlugOrCodepoint("euro-sign-u20ac");
      expect(char).toBeDefined();
      expect(char?.char).toBe("€");
      expect(char?.dec).toBe(8364);
      expect(char?.utf8Bytes).toBe("0xE2 0x82 0xAC");
    });

    it("should retrieve character by codepoint", () => {
      const char = getCharacterBySlugOrCodepoint("U+00A9");
      expect(char).toBeDefined();
      expect(char?.char).toBe("©");
      expect(char?.name).toBe("COPYRIGHT SIGN");
    });
  });

  describe("Pagination Engine", () => {
    it("should correctly partition items across pages", () => {
      const pageSize = 5;
      const page1 = searchUnicodeCharacters({ pageSize, page: 1 });
      const page2 = searchUnicodeCharacters({ pageSize, page: 2 });

      expect(page1.items.length).toBe(5);
      expect(page2.items.length).toBe(5);
      // First item of page 1 should not equal first item of page 2
      expect(page1.items[0].codepoint).not.toBe(page2.items[0].codepoint);
    });
  });
});

