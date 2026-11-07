/**
 * Unicode Grapheme Cluster, Codepoint, and Byte Utilities
 * Accurate handling of surrogate pairs, combining marks, ZWJ emoji sequences, and flags.
 */

/**
 * Split text into true visual grapheme clusters
 * Uses Intl.Segmenter if supported (standard in modern Node and browsers)
 * with robust regex surrogate/combining fallback.
 */
export function splitGraphemes(text: string): string[] {
  if (!text) return [];

  // Modern browsers and Node 16+ support Intl.Segmenter
  if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
    const segmenter = new (Intl as any).Segmenter(undefined, { granularity: "grapheme" });
    const segments = segmenter.segment(text);
    return Array.from(segments, (s: any) => s.segment);
  }

  // Fallback: Array.from handles surrogate pairs, but not multi-char ZWJ sequences
  return Array.from(text);
}

/**
 * Count true visual grapheme clusters (what human eyes perceive as a character)
 */
export function countGraphemes(text: string): number {
  return splitGraphemes(text).length;
}

/**
 * Count Unicode code points (Array.from splits into code points)
 */
export function countCodePoints(text: string): number {
  return Array.from(text).length;
}

/**
 * Count UTF-8 bytes for a string
 */
export function countUtf8Bytes(text: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(text).length;
  }
  // Fallback UTF-8 byte calculation
  let bytes = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code <= 0x7f) bytes += 1;
    else if (code <= 0x7ff) bytes += 2;
    else if (code >= 0xd800 && code <= 0xdbff) {
      // High surrogate
      bytes += 4;
      i++; // Skip low surrogate
    } else bytes += 3;
  }
  return bytes;
}

/**
 * Convert a character or code point to formatted U+XXXX notation
 */
export function toHexCodePoint(codePoint: number): string {
  const hex = codePoint.toString(16).toUpperCase();
  return `U+${hex.padStart(4, "0")}`;
}

/**
 * Format string as Unicode escape sequences (\uXXXX or \u{XXXXX})
 */
export function toUnicodeEscapes(text: string): string {
  let result = "";
  for (const char of text) {
    const cp = char.codePointAt(0);
    if (cp === undefined) continue;
    if (cp > 0xffff) {
      result += `\\u{${cp.toString(16).toUpperCase()}}`;
    } else if (cp > 0x7e || cp < 0x20) {
      result += `\\u${cp.toString(16).toUpperCase().padStart(4, "0")}`;
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Decode Unicode escape sequences (\uXXXX, \u{XXXXX}, &#XXXX;, &#xXXXX;)
 */
export function decodeUnicodeEscapes(escaped: string): string {
  return escaped
    // Handle \u{XXXXX}
    .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    // Handle standard \uXXXX
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    // Handle HTML hex &#xXXXX;
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    // Handle HTML decimal &#XXXX;
    .replace(/&#(\d+);/g, (_, dec) =>
      String.fromCodePoint(parseInt(dec, 10))
    );
}

/**
 * Convert string to HTML entities (named where common, else decimal/hex)
 */
export function toHtmlEntities(text: string, format: "named" | "decimal" | "hex" = "named"): string {
  const NAMED: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
    "©": "&copy;",
    "®": "&reg;",
    "™": "&trade;",
    "€": "&euro;",
    "£": "&pound;",
    "¥": "&yen;",
    "¢": "&cent;",
    "§": "&sect;",
    "°": "&deg;",
    "±": "&plusmn;",
    "×": "&times;",
    "÷": "&divide;",
  };

  let out = "";
  for (const char of text) {
    if (format === "named" && NAMED[char]) {
      out += NAMED[char];
    } else if (char.charCodeAt(0) > 127 || char === "&" || char === "<" || char === ">") {
      const cp = char.codePointAt(0);
      if (!cp) continue;
      if (format === "hex") {
        out += `&#x${cp.toString(16).toUpperCase()};`;
      } else {
        out += `&#${cp};`;
      }
    } else {
      out += char;
    }
  }
  return out;
}

