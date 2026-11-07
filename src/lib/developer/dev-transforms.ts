/**
 * Developer Utilities Transformation Engine for TypeKitTools Batch B
 * Handles HTML/CSS formatting & minification, CSS selector escaping,
 * JavaScript Unicode conversion, and multi-radix number systems (Hex, Binary, Decimal, BigInt).
 */

/**
 * Format HTML with configurable indentation
 */
export function formatHtml(
  html: string,
  options: { indent?: number | "tab"; wrapAttributes?: boolean } = {}
): { formatted: string; tagCount: number; error?: string } {
  const trimmed = html.trim();
  if (!trimmed) return { formatted: "", tagCount: 0 };

  const indentStr = options.indent === "tab" ? "\t" : " ".repeat(typeof options.indent === "number" ? options.indent : 2);

  const VOID_ELEMENTS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr", "!doctype"
  ]);

  try {
    let formatted = "";
    let indentLevel = 0;
    let tagCount = 0;

    // Tokenize tags and text content
    const tokens = trimmed.replace(/>\s*</g, "><").match(/(<[^>]+>|[^<]+)/g) || [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      if (!token) continue;

      if (token.startsWith("<!--")) {
        // Comment
        formatted += indentStr.repeat(indentLevel) + token + "\n";
      } else if (token.startsWith("<!") || token.startsWith("<?")) {
        // Doctype or XML declaration
        formatted += token + "\n";
      } else if (token.startsWith("</")) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
        formatted += indentStr.repeat(indentLevel) + token + "\n";
      } else if (token.startsWith("<")) {
        // Opening tag
        tagCount++;
        const tagNameMatch = token.match(/<([a-zA-Z0-9\-!]+)/);
        const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";
        const isSelfClosing = token.endsWith("/>") || VOID_ELEMENTS.has(tagName);

        formatted += indentStr.repeat(indentLevel) + token + "\n";

        if (!isSelfClosing) {
          indentLevel++;
        }
      } else {
        // Text node
        formatted += indentStr.repeat(indentLevel) + token + "\n";
      }
    }

    return { formatted: formatted.trimEnd(), tagCount };
  } catch (err: any) {
    return { formatted: html, tagCount: 0, error: err.message };
  }
}

/**
 * Minify HTML
 */
export function minifyHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<!--[\s\S]*?-->/g, "") // remove comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/>\s+</g, "><") // remove space between tags
    .trim();
}

/**
 * Format CSS stylesheet
 */
export function formatCss(
  css: string,
  options: { indent?: number | "tab" } = {}
): { formatted: string; ruleCount: number } {
  const trimmed = css.trim();
  if (!trimmed) return { formatted: "", ruleCount: 0 };

  const indentStr = options.indent === "tab" ? "\t" : " ".repeat(typeof options.indent === "number" ? options.indent : 2);

  let formatted = "";
  let indentLevel = 0;
  let ruleCount = 0;

  // Clean comments and normalize brackets
  const cleaned = trimmed
    .replace(/\s*\{\s*/g, " {\n")
    .replace(/\s*\}\s*/g, "\n}\n")
    .replace(/\s*;\s*/g, ";\n");

  const lines = cleaned.split("\n");

  for (const line of lines) {
    const l = line.trim();
    if (!l) continue;

    if (l === "}") {
      indentLevel = Math.max(0, indentLevel - 1);
      formatted += indentStr.repeat(indentLevel) + "}\n";
    } else if (l.endsWith("{")) {
      ruleCount++;
      formatted += indentStr.repeat(indentLevel) + l + "\n";
      indentLevel++;
    } else {
      const propFormatted = l.includes(":") ? l.replace(/\s*:\s*/, ": ") : l;
      formatted += indentStr.repeat(indentLevel) + propFormatted + "\n";
    }
  }

  return { formatted: formatted.trim(), ruleCount };
}

/**
 * Minify CSS stylesheet
 */
export function minifyCss(css: string): string {
  if (!css) return "";
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
    .replace(/\s+/g, " ") // collapse whitespace
    .replace(/\s*([\{\}:;,])\s*/g, "$1") // remove space around delimiters
    .replace(/;}/g, "}") // remove trailing semicolon
    .trim();
}

/**
 * Generate CSS Escaped Selectors & String Values (W3C CSS.escape spec)
 */
export function escapeCssSelector(identifier: string): {
  selectorEscape: string;
  cssContentEscape: string;
  tailwindClassEscape: string;
} {
  if (!identifier) {
    return { selectorEscape: "", cssContentEscape: "", tailwindClassEscape: "" };
  }

  // 1. Standard CSS.escape logic
  let selectorEscape = "";
  const len = identifier.length;

  for (let i = 0; i < len; i++) {
    const code = identifier.charCodeAt(i);
    const char = identifier.charAt(i);

    if (code === 0x0000) {
      selectorEscape += "\uFFFD";
      continue;
    }

    if (
      (code >= 0x0001 && code <= 0x001f) ||
      code === 0x007f ||
      (i === 0 && code >= 0x0030 && code <= 0x0039) || // Digit at index 0
      (i === 1 && code >= 0x0030 && code <= 0x0039 && identifier.charCodeAt(0) === 0x002d) // - followed by digit
    ) {
      selectorEscape += "\\" + code.toString(16) + " ";
      continue;
    }

    if (
      code >= 0x0080 ||
      char === "-" ||
      char === "_" ||
      (code >= 0x0030 && code <= 0x0039) ||
      (code >= 0x0041 && code <= 0x005a) ||
      (code >= 0x0061 && code <= 0x007a)
    ) {
      selectorEscape += char;
      continue;
    }

    selectorEscape += "\\" + char;
  }

  // 2. CSS 'content' property escape (\XXXX hex)
  let cssContentEscape = "";
  for (const char of identifier) {
    const cp = char.codePointAt(0) || 0;
    if (cp > 127 || char === '"' || char === "'") {
      cssContentEscape += "\\" + cp.toString(16).toUpperCase().padStart(4, "0") + " ";
    } else {
      cssContentEscape += char;
    }
  }

  // 3. Tailwind CSS escape (escaping colons, brackets, slashes)
  const tailwindClassEscape = identifier
    .replace(/([:\[\]\/%.#@*+?~=!$^&|\\,])/g, "\\$1");

  return {
    selectorEscape,
    cssContentEscape: `content: "${cssContentEscape.trim()}";`,
    tailwindClassEscape,
  };
}

/**
 * Convert JavaScript strings to/from Unicode Escapes
 */
export function convertJsUnicode(
  code: string,
  mode: "encode" | "decode",
  options: { es6Braces?: boolean; allChars?: boolean } = {}
): string {
  if (!code) return "";

  if (mode === "decode") {
    return code
      .replace(/\\u\{([0-9a-fA-F]+)\}/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  }

  // Encode mode
  const { es6Braces = true, allChars = false } = options;
  let result = "";

  for (const char of code) {
    const cp = char.codePointAt(0) || 0;
    if (allChars || cp > 127 || cp < 32) {
      if (cp > 0xffff && es6Braces) {
        result += `\\u{${cp.toString(16).toUpperCase()}}`;
      } else if (cp > 0xffff) {
        // Surrogate pair in legacy \uXXXX notation
        const high = Math.floor((cp - 0x10000) / 0x400) + 0xd800;
        const low = ((cp - 0x10000) % 0x400) + 0xdc00;
        result += `\\u${high.toString(16).toUpperCase()}\\u${low.toString(16).toUpperCase()}`;
      } else {
        result += `\\u${cp.toString(16).toUpperCase().padStart(4, "0")}`;
      }
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Multi-radix Number / Hex / Binary Converter
 */
export interface RadixConversions {
  decimal: string;
  hexadecimal: string;
  binary: string;
  octal: string;
  asciiText: string;
  byteLength: number;
  bitLength: number;
  error?: string;
}

export function convertRadix(
  input: string,
  fromBase: 2 | 8 | 10 | 16 | "text"
): RadixConversions {
  const trimmed = input.trim();
  if (!trimmed) {
    return { decimal: "", hexadecimal: "", binary: "", octal: "", asciiText: "", byteLength: 0, bitLength: 0 };
  }

  try {
    if (fromBase === "text") {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(trimmed);
      let hex = "";
      let bin = "";
      for (const b of bytes) {
        hex += b.toString(16).toUpperCase().padStart(2, "0") + " ";
        bin += b.toString(2).padStart(8, "0") + " ";
      }

      // Convert entire byte stream to big integer
      let bigNum = 0n;
      for (const b of bytes) {
        bigNum = (bigNum << 8n) + BigInt(b);
      }

      return {
        decimal: bigNum.toString(10),
        hexadecimal: hex.trim(),
        binary: bin.trim(),
        octal: bigNum.toString(8),
        asciiText: trimmed,
        byteLength: bytes.length,
        bitLength: bytes.length * 8,
      };
    }

    // Number base conversions with BigInt support
    let sanitized = trimmed.replace(/\s+|_/g, "");
    if (fromBase === 16 && sanitized.startsWith("0x")) sanitized = sanitized.slice(2);
    if (fromBase === 2 && sanitized.startsWith("0b")) sanitized = sanitized.slice(2);
    if (fromBase === 8 && sanitized.startsWith("0o")) sanitized = sanitized.slice(2);

    let bigVal: bigint;

    if (fromBase === 16) {
      if (!/^[0-9a-fA-F]+$/.test(sanitized)) throw new Error("Invalid hexadecimal number");
      bigVal = BigInt("0x" + sanitized);
    } else if (fromBase === 2) {
      if (!/^[01]+$/.test(sanitized)) throw new Error("Invalid binary number (only 0 and 1 allowed)");
      bigVal = BigInt("0b" + sanitized);
    } else if (fromBase === 8) {
      if (!/^[0-7]+$/.test(sanitized)) throw new Error("Invalid octal number (only 0-7 allowed)");
      bigVal = BigInt("0o" + sanitized);
    } else {
      if (!/^-?[0-9]+$/.test(sanitized)) throw new Error("Invalid decimal integer");
      bigVal = BigInt(sanitized);
    }

    // Binary with 8-bit byte grouping
    let rawBin = bigVal >= 0n ? bigVal.toString(2) : "-" + (-bigVal).toString(2);
    const paddedBinLength = Math.ceil(rawBin.length / 8) * 8;
    const paddedBin = rawBin.padStart(paddedBinLength, "0");
    const groupedBin = paddedBin.match(/.{1,8}/g)?.join(" ") || rawBin;

    // Hex with 2-character byte grouping
    let rawHex = bigVal >= 0n ? bigVal.toString(16).toUpperCase() : "-" + (-bigVal).toString(16).toUpperCase();
    if (rawHex.length % 2 !== 0 && !rawHex.startsWith("-")) rawHex = "0" + rawHex;
    const groupedHex = rawHex.match(/.{1,2}/g)?.join(" ") || rawHex;

    // Convert to ASCII if valid positive byte values
    let asciiText = "";
    if (bigVal >= 0n) {
      try {
        let temp = bigVal;
        const bytesRev: number[] = [];
        while (temp > 0n) {
          bytesRev.push(Number(temp & 0xffn));
          temp = temp >> 8n;
        }
        bytesRev.reverse();
        if (bytesRev.length > 0 && bytesRev.length <= 1000) {
          asciiText = new TextDecoder("utf-8").decode(new Uint8Array(bytesRev));
        }
      } catch {
        asciiText = "";
      }
    }

    const bitLength = bigVal >= 0n ? bigVal.toString(2).length : (-bigVal).toString(2).length;
    const byteLength = Math.ceil(bitLength / 8);

    return {
      decimal: bigVal.toString(10),
      hexadecimal: groupedHex,
      binary: groupedBin,
      octal: bigVal.toString(8),
      asciiText,
      byteLength,
      bitLength,
    };
  } catch (err: any) {
    return {
      decimal: "",
      hexadecimal: "",
      binary: "",
      octal: "",
      asciiText: "",
      byteLength: 0,
      bitLength: 0,
      error: err.message,
    };
  }
}

/**
 * Convert Decimal integer to Roman Numerals (up to 3,999,999)
 */
export function decimalToRoman(num: number): string {
  if (num <= 0 || num > 3999999 || !Number.isInteger(num)) return "";
  const lookup: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let roman = "";
  let n = num;
  for (const [val, letter] of lookup) {
    while (n >= val) {
      roman += letter;
      n -= val;
    }
  }
  return roman;
}
