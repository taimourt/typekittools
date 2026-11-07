import { describe, it, expect } from "vitest";

// UTF-8 Base64 functions
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUtf8(str: string): string {
  const sanitized = str.replace(/\s+/g, "");
  const binary = atob(sanitized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Case converter logic
function toWords(input: string): string[] {
  return (
    input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_./\\]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );
}

function toCamelCase(str: string): string {
  return toWords(str)
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
    .join("");
}

function toSnakeCase(str: string): string {
  return toWords(str)
    .map((w) => w.toLowerCase())
    .join("_");
}

function toKebabCase(str: string): string {
  return toWords(str)
    .map((w) => w.toLowerCase())
    .join("-");
}

function toConstantCase(str: string): string {
  return toWords(str)
    .map((w) => w.toUpperCase())
    .join("_");
}

describe("Developer Utilities Unit Tests", () => {
  describe("Base64 UTF-8 Safe Converter", () => {
    it("should encode and decode ASCII text", () => {
      const original = "Hello World!";
      const encoded = utf8ToBase64(original);
      expect(encoded).toBe("SGVsbG8gV29ybGQh");
      expect(base64ToUtf8(encoded)).toBe(original);
    });

    it("should encode and decode complex UTF-8 characters and emojis without error", () => {
      const original = "Unicode 🚀 日本語 € £ ¥ §";
      const encoded = utf8ToBase64(original);
      const decoded = base64ToUtf8(encoded);
      expect(decoded).toBe(original);
    });
  });

  describe("Case Converters", () => {
    const input = "TypeKit tools online utility platform";

    it("should convert to camelCase", () => {
      expect(toCamelCase(input)).toBe("typeKitToolsOnlineUtilityPlatform");
    });

    it("should convert to snake_case", () => {
      expect(toSnakeCase(input)).toBe("type_kit_tools_online_utility_platform");
    });

    it("should convert to kebab-case", () => {
      expect(toKebabCase(input)).toBe("type-kit-tools-online-utility-platform");
    });

    it("should convert to CONSTANT_CASE", () => {
      expect(toConstantCase(input)).toBe("TYPE_KIT_TOOLS_ONLINE_UTILITY_PLATFORM");
    });
  });

  describe("Invisible Character Cleaner", () => {
    it("should strip zero-width space and BOM", () => {
      const dirty = "Test\u200BString\uFEFFWith\u200CHidden";
      const cleaned = dirty.replace(/[\u200B-\u200D\uFEFF\u2060\u202A-\u202E\u200E\u200F\u00A0]/g, "");
      expect(cleaned).toBe("TestStringWithHidden");
    });
  });

  describe("URL Encoder & Decoder", () => {
    it("should percent-encode special query parameters", () => {
      const original = "param=hello world & symbol=€";
      const encoded = encodeURIComponent(original);
      expect(encoded).toContain("%20");
      expect(decodeURIComponent(encoded)).toBe(original);
    });
  });
});
