/**
 * Text and Unicode Transformation Engine for TypeKitTools Batch A
 * Handles UTF-8/UTF-16 encoding & decoding, Unicode normalizations,
 * grapheme-safe reversing, repeating, and line-break sanitization.
 */

import { splitGraphemes, countUtf8Bytes, toHexCodePoint } from "./graphemes";

export type Utf8ByteFormat = "hex" | "binary" | "decimal" | "percent" | "c-array" | "base64";

export interface Utf8CharDetail {
  char: string;
  codePoint: number;
  hexCodePoint: string;
  byteCount: number;
  bytesHex: string;
  bytesDec: string;
  bytesBin: string;
}

/**
 * Encode string into various UTF-8 representations
 */
export function encodeUtf8(text: string, format: Utf8ByteFormat = "hex"): string {
  if (!text) return "";
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);

  switch (format) {
    case "hex":
      return Array.from(bytes)
        .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
        .join(" ");

    case "binary":
      return Array.from(bytes)
        .map((b) => b.toString(2).padStart(8, "0"))
        .join(" ");

    case "decimal":
      return Array.from(bytes).join(" ");

    case "percent":
      return Array.from(bytes)
        .map((b) => "%" + b.toString(16).toUpperCase().padStart(2, "0"))
        .join("");

    case "c-array":
      return `const uint8_t data[] = { ${Array.from(bytes)
        .map((b) => "0x" + b.toString(16).toUpperCase().padStart(2, "0"))
        .join(", ")} };`;

    case "base64": {
      let binary = "";
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }

    default:
      return Array.from(bytes)
        .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
        .join(" ");
  }
}

/**
 * Decode byte input (Hex, Dec, or Binary) back to string with error handling
 */
export function decodeUtf8(
  input: string,
  format: "auto" | "hex" | "decimal" | "binary" = "auto"
): { text: string; error?: string; byteCount: number } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { text: "", byteCount: 0 };
  }

  try {
    let bytes: number[] = [];

    // Auto-detect format if set to auto
    let detectedFormat = format;
    if (detectedFormat === "auto") {
      if (trimmed.startsWith("0x") || trimmed.startsWith("\\x") || /^[0-9a-fA-F\s,]+$/i.test(trimmed)) {
        detectedFormat = "hex";
      } else if (/^[01\s]+$/.test(trimmed)) {
        detectedFormat = "binary";
      } else if (/^[0-9\s,]+$/.test(trimmed)) {
        detectedFormat = "decimal";
      } else {
        detectedFormat = "hex";
      }
    }

    if (detectedFormat === "binary") {
      const tokens = trimmed.split(/\s+/).filter(Boolean);
      for (const tok of tokens) {
        if (!/^[01]{1,8}$/.test(tok)) {
          return { text: "", error: `Invalid binary byte sequence: "${tok}"`, byteCount: 0 };
        }
        bytes.push(parseInt(tok, 2));
      }
    } else if (detectedFormat === "decimal") {
      const tokens = trimmed.split(/[\s,]+/).filter(Boolean);
      for (const tok of tokens) {
        const num = parseInt(tok, 10);
        if (isNaN(num) || num < 0 || num > 255) {
          return { text: "", error: `Invalid decimal byte value (must be 0-255): "${tok}"`, byteCount: 0 };
        }
        bytes.push(num);
      }
    } else {
      // Hex format: strip 0x, \x, %, commas
      const cleanHex = trimmed
        .replace(/0x|\\x|%/gi, " ")
        .replace(/[,;]/g, " ")
        .trim();
      const tokens = cleanHex.split(/\s+/).filter(Boolean);

      for (const tok of tokens) {
        if (tok.length === 2) {
          const val = parseInt(tok, 16);
          if (isNaN(val)) return { text: "", error: `Invalid hex byte: "${tok}"`, byteCount: 0 };
          bytes.push(val);
        } else if (tok.length % 2 === 0) {
          for (let i = 0; i < tok.length; i += 2) {
            const val = parseInt(tok.substring(i, i + 2), 16);
            if (isNaN(val)) return { text: "", error: `Invalid hex pair: "${tok.substring(i, i + 2)}"`, byteCount: 0 };
            bytes.push(val);
          }
        } else {
          return { text: "", error: `Hex values must have even character lengths: "${tok}"`, byteCount: 0 };
        }
      }
    }

    const uint8 = new Uint8Array(bytes);
    const decoder = new TextDecoder("utf-8", { fatal: true });
    const text = decoder.decode(uint8);
    return { text, byteCount: bytes.length };
  } catch (err: any) {
    return {
      text: "",
      error: `UTF-8 decoding error: ${err.message || "Invalid UTF-8 byte stream or replacement error."}`,
      byteCount: 0,
    };
  }
}

/**
 * Detailed per-character UTF-8 breakdown
 */
export function analyzeUtf8Characters(text: string): Utf8CharDetail[] {
  if (!text) return [];
  const encoder = new TextEncoder();
  const graphemes = splitGraphemes(text);

  return graphemes.map((char) => {
    const cp = char.codePointAt(0) || 0;
    const bytes = encoder.encode(char);
    return {
      char,
      codePoint: cp,
      hexCodePoint: toHexCodePoint(cp),
      byteCount: bytes.length,
      bytesHex: Array.from(bytes)
        .map((b) => b.toString(16).toUpperCase().padStart(2, "0"))
        .join(" "),
      bytesDec: Array.from(bytes).join(", "),
      bytesBin: Array.from(bytes)
        .map((b) => b.toString(2).padStart(8, "0"))
        .join(" "),
    };
  });
}

/**
 * UTF-16 Conversion Details
 */
export interface Utf16CharDetail {
  char: string;
  codePoint: number;
  hexCodePoint: string;
  isAstral: boolean;
  codeUnits: number[];
  codeUnitsHex: string[];
  highSurrogate?: string;
  lowSurrogate?: string;
}

/**
 * Encode string into UTF-16 code units and surrogate pair breakdown
 */
export function analyzeUtf16(text: string): {
  codeUnitsBEHex: string;
  codeUnitsLEHex: string;
  escapedString: string;
  totalCodeUnits: number;
  details: Utf16CharDetail[];
} {
  if (!text) {
    return { codeUnitsBEHex: "", codeUnitsLEHex: "", escapedString: "", totalCodeUnits: 0, details: [] };
  }

  const details: Utf16CharDetail[] = [];
  let totalCodeUnits = 0;
  let beHexArr: string[] = [];
  let leHexArr: string[] = [];
  let escapedStr = "";

  const graphemes = splitGraphemes(text);

  for (const char of graphemes) {
    const cp = char.codePointAt(0) || 0;
    const isAstral = cp > 0xffff;
    const charCodeUnits: number[] = [];

    for (let i = 0; i < char.length; i++) {
      const cu = char.charCodeAt(i);
      charCodeUnits.push(cu);
      totalCodeUnits += 1;

      const be = cu.toString(16).toUpperCase().padStart(4, "0");
      beHexArr.push(be);

      // Little-endian byte order
      const lowByte = (cu & 0xff).toString(16).toUpperCase().padStart(2, "0");
      const highByte = ((cu >> 8) & 0xff).toString(16).toUpperCase().padStart(2, "0");
      leHexArr.push(`${lowByte} ${highByte}`);
    }

    if (cp > 0xffff) {
      escapedStr += `\\u{${cp.toString(16).toUpperCase()}}`;
    } else {
      escapedStr += `\\u${cp.toString(16).toUpperCase().padStart(4, "0")}`;
    }

    let highSurrogate: string | undefined;
    let lowSurrogate: string | undefined;

    if (isAstral && charCodeUnits.length >= 2) {
      highSurrogate = `0x${charCodeUnits[0].toString(16).toUpperCase().padStart(4, "0")}`;
      lowSurrogate = `0x${charCodeUnits[1].toString(16).toUpperCase().padStart(4, "0")}`;
    }

    details.push({
      char,
      codePoint: cp,
      hexCodePoint: toHexCodePoint(cp),
      isAstral,
      codeUnits: charCodeUnits,
      codeUnitsHex: charCodeUnits.map((cu) => `0x${cu.toString(16).toUpperCase().padStart(4, "0")}`),
      highSurrogate,
      lowSurrogate,
    });
  }

  return {
    codeUnitsBEHex: beHexArr.join(" "),
    codeUnitsLEHex: leHexArr.join(" "),
    escapedString: escapedStr,
    totalCodeUnits,
    details,
  };
}

/**
 * Decode UTF-16 Hex or Escape sequence into text
 */
export function decodeUtf16(input: string): { text: string; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) return { text: "" };

  try {
    // If it has \uXXXX or \u{XXXXX} format
    if (trimmed.includes("\\u")) {
      const decoded = trimmed
        .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
        .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
      return { text: decoded };
    }

    // Hex tokens (e.g. 0x0048, 0048, 00 48)
    const cleanTokens = trimmed
      .replace(/0x/gi, " ")
      .replace(/[,;]/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const codeUnits: number[] = [];
    for (const tok of cleanTokens) {
      if (tok.length === 4) {
        const val = parseInt(tok, 16);
        if (isNaN(val)) return { text: "", error: `Invalid 16-bit hex code unit: "${tok}"` };
        codeUnits.push(val);
      } else if (tok.length === 2) {
        const val = parseInt(tok, 16);
        if (isNaN(val)) return { text: "", error: `Invalid hex byte: "${tok}"` };
        codeUnits.push(val);
      } else {
        return { text: "", error: `Tokens must be 2 or 4 hex characters: "${tok}"` };
      }
    }

    return { text: String.fromCharCode(...codeUnits) };
  } catch (err: any) {
    return { text: "", error: `UTF-16 decoding error: ${err.message}` };
  }
}

/**
 * Unicode Normalization Forms (NFC, NFD, NFKC, NFKD)
 */
export function normalizeUnicode(text: string): {
  original: string;
  nfc: string;
  nfd: string;
  nfkc: string;
  nfkd: string;
  comparison: {
    form: "NFC" | "NFD" | "NFKC" | "NFKD";
    name: string;
    description: string;
    value: string;
    charCount: number;
    byteCount: number;
    isIdentical: boolean;
  }[];
} {
  const nfc = text.normalize("NFC");
  const nfd = text.normalize("NFD");
  const nfkc = text.normalize("NFKC");
  const nfkd = text.normalize("NFKD");

  return {
    original: text,
    nfc,
    nfd,
    nfkc,
    nfkd,
    comparison: [
      {
        form: "NFC",
        name: "Canonical Composition (NFC)",
        description: "Characters are combined into composed precomposed forms (e.g., e + ´ = é). Recommended default for web content (W3C standard).",
        value: nfc,
        charCount: Array.from(nfc).length,
        byteCount: countUtf8Bytes(nfc),
        isIdentical: nfc === text,
      },
      {
        form: "NFD",
        name: "Canonical Decomposition (NFD)",
        description: "Characters are separated into base letters followed by combining diacritical marks (e.g., é = e + ´). Used by Apple HFS+ filesystems.",
        value: nfd,
        charCount: Array.from(nfd).length,
        byteCount: countUtf8Bytes(nfd),
        isIdentical: nfd === text,
      },
      {
        form: "NFKC",
        name: "Compatibility Composition (NFKC)",
        description: "Applies compatibility decomposition (normalizing ligatures, fractions, superscripts to standard forms) followed by canonical composition.",
        value: nfkc,
        charCount: Array.from(nfkc).length,
        byteCount: countUtf8Bytes(nfkc),
        isIdentical: nfkc === text,
      },
      {
        form: "NFKD",
        name: "Compatibility Decomposition (NFKD)",
        description: "Decomposes all characters by both canonical and compatibility mappings (e.g., 2⁴ becomes 24, ½ becomes 1/2, ﬁ becomes fi).",
        value: nfkd,
        charCount: Array.from(nfkd).length,
        byteCount: countUtf8Bytes(nfkd),
        isIdentical: nfkd === text,
      },
    ],
  };
}

/**
 * Unicode Upside Down / Inverted Character Mapping
 */
const UPSIDE_DOWN_MAP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ",
  i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d",
  q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x",
  y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H",
  I: "I", J: "ſ", K: "⋊", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ",
  Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X",
  Y: "⅄", Z: "Z",
  "0": "0", "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ",
  "6": "9", "7": "ㄥ", "8": "8", "9": "6",
  ".": "˙", ",": "'", "'": ",", "\"": "„", "`": ",",
  "?": "¿", "!": "¡", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", "&": "⅋", "_": "‾",
};

/**
 * Text Reversal with multiple modes
 */
export function reverseText(
  text: string,
  mode: "characters" | "words" | "words-chars" | "lines" | "upside-down" = "characters"
): string {
  if (!text) return "";

  switch (mode) {
    case "characters":
      // Grapheme-cluster safe reversal (preserves emoji flags, family sequences, combining accents)
      return splitGraphemes(text).reverse().join("");

    case "words":
      return text
        .split("\n")
        .map((line) => line.split(" ").reverse().join(" "))
        .join("\n");

    case "words-chars":
      return text
        .split("\n")
        .map((line) =>
          line
            .split(" ")
            .map((word) => splitGraphemes(word).reverse().join(""))
            .join(" ")
        )
        .join("\n");

    case "lines":
      return text.split("\n").reverse().join("\n");

    case "upside-down": {
      const graphemes = splitGraphemes(text);
      return graphemes
        .reverse()
        .map((g) => UPSIDE_DOWN_MAP[g] || g)
        .join("");
    }

    default:
      return splitGraphemes(text).reverse().join("");
  }
}

/**
 * Text Repeater with delimiters and numbering options
 */
export function repeatText(
  text: string,
  count: number,
  options: {
    delimiter?: string;
    numbering?: "none" | "number" | "parens" | "brackets";
  } = {}
): {
  result: string;
  charCount: number;
  wordCount: number;
  lineCount: number;
} {
  if (!text || count <= 0) {
    return { result: "", charCount: 0, wordCount: 0, lineCount: 0 };
  }

  // Safety ceiling: prevent browser tab crash with runaway memory
  const safeCount = Math.min(Math.max(1, count), 10000);
  const delimiter = options.delimiter !== undefined ? options.delimiter : "\n";
  const numbering = options.numbering || "none";

  const items: string[] = [];
  const padLength = String(safeCount).length;

  for (let i = 1; i <= safeCount; i++) {
    let item = text;
    if (numbering === "number") {
      item = `${i}. ${text}`;
    } else if (numbering === "parens") {
      item = `(${i}) ${text}`;
    } else if (numbering === "brackets") {
      const padded = String(i).padStart(padLength, "0");
      item = `[${padded}] ${text}`;
    }
    items.push(item);
  }

  const result = items.join(delimiter);
  const lines = result.split("\n").length;
  const words = result.trim() ? result.trim().split(/\s+/).length : 0;

  return {
    result,
    charCount: Array.from(result).length,
    wordCount: words,
    lineCount: lines,
  };
}

/**
 * Line Break Remover
 */
export function removeLineBreaks(
  text: string,
  options: {
    mode?: "all" | "preserve-paragraphs" | "custom";
    delimiter?: string;
    trimLines?: boolean;
    collapseSpaces?: boolean;
  } = {}
): {
  result: string;
  removedBreaks: number;
  originalLines: number;
  finalLines: number;
} {
  if (!text) {
    return { result: "", removedBreaks: 0, originalLines: 0, finalLines: 0 };
  }

  const mode = options.mode || "all";
  const delimiter = options.delimiter !== undefined ? options.delimiter : " ";
  const trimLines = options.trimLines ?? true;
  const collapseSpaces = options.collapseSpaces ?? true;

  const originalLines = text.split(/\r\n|\r|\n/).length;

  let result = "";

  if (mode === "preserve-paragraphs") {
    // Double newlines (paragraphs) are preserved
    const paragraphs = text.split(/\n\s*\n/);
    const cleanedParagraphs = paragraphs.map((para) => {
      let lines = para.split(/\r\n|\r|\n/);
      if (trimLines) {
        lines = lines.map((l) => l.trim()).filter(Boolean);
      }
      return lines.join(" ");
    });
    result = cleanedParagraphs.join("\n\n");
  } else if (mode === "custom") {
    let lines = text.split(/\r\n|\r|\n/);
    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }
    result = lines.join(delimiter);
  } else {
    // Mode "all": remove all line breaks, replace with space
    let lines = text.split(/\r\n|\r|\n/);
    if (trimLines) {
      lines = lines.map((l) => l.trim()).filter(Boolean);
    }
    result = lines.join(" ");
  }

  if (collapseSpaces) {
    result = result.replace(/[ \t]+/g, " ");
  }

  const finalLines = result.split(/\r\n|\r|\n/).length;
  const removedBreaks = Math.max(0, originalLines - finalLines);

  return {
    result,
    removedBreaks,
    originalLines,
    finalLines,
  };
}

