import { describe, it, expect } from "vitest";
import {
  splitGraphemes,
  countGraphemes,
  countCodePoints,
  countUtf8Bytes,
  toUnicodeEscapes,
  decodeUnicodeEscapes,
  toHtmlEntities,
} from "../../src/lib/unicode/graphemes";
import { toolRegistry } from "../../src/lib/tools/registry";
import { initialTools } from "../../src/lib/tools/definitions";
import { allSymbols } from "../../src/data/symbols-data";

describe("Phase 3: 15 Tools Processing Engine Unit Tests", () => {
  // Test Tool Registry completeness
  it("should have all 15 Phase 3 tools registered", () => {
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

    for (const slug of requiredSlugs) {
      const tool = toolRegistry.getBySlug(slug);
      expect(tool, `Tool with slug '${slug}' should be registered`).toBeDefined();
      expect(tool?.name).toBeTruthy();
      expect(tool?.shortDescription).toBeTruthy();
      expect(tool?.componentId).toBeTruthy();
    }
  });

  // 1. Unicode & Grapheme Processing Tests
  describe("Unicode & Grapheme Analysis (Surrogate Pairs & Combining Characters)", () => {
    it("should handle normal ASCII input", () => {
      const text = "Hello World";
      expect(countGraphemes(text)).toBe(11);
      expect(countCodePoints(text)).toBe(11);
      expect(countUtf8Bytes(text)).toBe(11);
    });

    it("should handle empty input cleanly", () => {
      expect(countGraphemes("")).toBe(0);
      expect(countCodePoints("")).toBe(0);
      expect(countUtf8Bytes("")).toBe(0);
      expect(splitGraphemes("")).toEqual([]);
    });

    it("should handle astral plane surrogate pairs (e.g. Rocket 🚀 U+1F680)", () => {
      const rocket = "🚀";
      // JavaScript UTF-16 length is 2 code units
      expect(rocket.length).toBe(2);
      // But visible grapheme count is 1
      expect(countGraphemes(rocket)).toBe(1);
      // Code point count is 1
      expect(countCodePoints(rocket)).toBe(1);
      // UTF-8 bytes for 4-byte astral plane character is 4
      expect(countUtf8Bytes(rocket)).toBe(4);
    });

    it("should handle multi-codepoint family emoji (👨‍👩‍👧‍👦)", () => {
      const family = "👨‍👩‍👧‍👦";
      // In UTF-16 it is length 11 with ZWJ
      expect(family.length).toBeGreaterThan(5);
      // In modern Intl.Segmenter it is 1 visual grapheme
      expect(countGraphemes(family)).toBe(1);
    });

    it("should handle large input (10,000+ characters)", () => {
      const largeText = "A".repeat(10000) + "🚀".repeat(1000);
      expect(countGraphemes(largeText)).toBe(11000);
      expect(countCodePoints(largeText)).toBe(11000);
      expect(countUtf8Bytes(largeText)).toBe(10000 + 1000 * 4);
    });
  });

  // 2. Unicode Escape Converter Tests
  describe("Unicode Escape Converter", () => {
    it("should encode plain text to \\uXXXX and \\u{XXXXX}", () => {
      const text = "€ 🚀";
      const escaped = toUnicodeEscapes(text);
      expect(escaped).toContain("\\u20AC");
      expect(escaped).toContain("\\u{1F680}");
    });

    it("should decode \\uXXXX and \\u{XXXXX} back to character", () => {
      const escaped = "\\u20AC and \\u{1F680}";
      const decoded = decodeUnicodeEscapes(escaped);
      expect(decoded).toBe("€ and 🚀");
    });

    it("should decode HTML numeric decimal (&#8364;) and hex (&#x20AC;)", () => {
      const htmlDec = "&#8364; and &#x20AC;";
      const decoded = decodeUnicodeEscapes(htmlDec);
      expect(decoded).toBe("€ and €");
    });
  });

  // 3. HTML Entity Converter Tests
  describe("HTML Entity Converter", () => {
    it("should encode reserved characters to named entities", () => {
      const raw = "<div class='test'>& \"Hello\" © €</div>";
      const encoded = toHtmlEntities(raw, "named");
      expect(encoded).toContain("&lt;div");
      expect(encoded).toContain("&amp;");
      expect(encoded).toContain("&quot;Hello&quot;");
      expect(encoded).toContain("&copy;");
      expect(encoded).toContain("&euro;");
    });

    it("should encode to decimal entities", () => {
      const raw = "© €";
      const encoded = toHtmlEntities(raw, "decimal");
      expect(encoded).toContain("&#169;");
      expect(encoded).toContain("&#8364;");
    });

    it("should encode to hex entities", () => {
      const raw = "© €";
      const encoded = toHtmlEntities(raw, "hex");
      expect(encoded).toContain("&#xA9;");
      expect(encoded).toContain("&#x20AC;");
    });
  });

  // 4. Base64 UTF-8 Safe Tests
  describe("Base64 UTF-8 Safe Processing", () => {
    function utf8ToBase64(str: string): string {
      const bytes = new TextEncoder().encode(str);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
      return btoa(binary);
    }

    function base64ToUtf8(str: string): string {
      const sanitized = str.replace(/\s+/g, "");
      const binary = atob(sanitized);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    }

    it("should encode and decode special characters, accents, and emojis", () => {
      const original = "Testing Base64 with €100, 日本語, and 🚀";
      const encoded = utf8ToBase64(original);
      expect(encoded).toBeTruthy();
      expect(base64ToUtf8(encoded)).toBe(original);
    });

    it("should throw a clean error on invalid base64 input", () => {
      expect(() => {
        base64ToUtf8("ThisIsNotValidBase64@@@!!!");
      }).toThrow();
    });
  });

  // 5. JSON Formatter & Validator Tests
  describe("JSON Formatter Logic", () => {
    it("should format valid JSON with 2 spaces", () => {
      const raw = '{"name":"TypeKit","tools":15}';
      const formatted = JSON.stringify(JSON.parse(raw), null, 2);
      expect(formatted).toContain('\n  "name": "TypeKit"');
    });

    it("should minify JSON string", () => {
      const raw = '{\n  "a": 1,\n  "b": 2\n}';
      const minified = JSON.stringify(JSON.parse(raw));
      expect(minified).toBe('{"a":1,"b":2}');
    });

    it("should throw syntax error on invalid JSON", () => {
      expect(() => {
        JSON.parse('{ invalid: json, missing quotes }');
      }).toThrow();
    });
  });

  // 6. Invisible Characters Detection & Stripping
  describe("Invisible Character Tool Logic", () => {
    const INVISIBLE_REGEX = /[\u200B-\u200D\uFEFF\u2060\u202A-\u202E\u200E\u200F\u00A0]/g;

    it("should detect and clean zero-width spaces", () => {
      const dirty = "Type\u200BKit\uFEFFTools\u200C";
      const cleaned = dirty.replace(INVISIBLE_REGEX, "");
      expect(cleaned).toBe("TypeKitTools");
    });

    it("should handle clean input without changes", () => {
      const clean = "Plain standard text without invisible chars";
      expect(clean.replace(INVISIBLE_REGEX, "")).toBe(clean);
    });
  });

  // 7. Symbols Dataset Verification
  describe("Symbols Dataset Integrity", () => {
    it("should have over 30 verified special characters", () => {
      expect(allSymbols.length).toBeGreaterThanOrEqual(30);
    });

    it("every symbol must have valid character, name, slug, and codepoint", () => {
      for (const s of allSymbols) {
        expect(s.character).toBeTruthy();
        expect(s.name).toBeTruthy();
        expect(s.slug).toBeTruthy();
        expect(s.codepoint).toMatch(/^U\+[0-9A-F]{4,6}$/i);
      }
    });
  });
});

