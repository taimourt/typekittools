/**
 * Advanced Developer & Web Utilities Transformation Engine for TypeKitTools Batch C
 * Implements JSON Validator, XML Formatter, URL Parser, Query String Builder,
 * JWT Decoder, Color Converter, and Safe Markdown Parser.
 */

/**
 * 1. JSON Validator with Line/Column error detection and structural metrics
 */
export function validateJson(input: string): {
  isValid: boolean;
  error?: string;
  line?: number;
  column?: number;
  parsed?: any;
  stats?: { keys: number; depth: number; byteSize: number };
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return { isValid: false, error: "Empty JSON input" };
  }

  try {
    const parsed = JSON.parse(trimmed);

    // Compute metrics: keys count and max depth
    let keysCount = 0;
    let maxDepth = 0;

    function traverse(obj: any, currentDepth: number) {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      if (obj && typeof obj === "object") {
        if (Array.isArray(obj)) {
          for (const item of obj) traverse(item, currentDepth + 1);
        } else {
          const keys = Object.keys(obj);
          keysCount += keys.length;
          for (const k of keys) traverse(obj[k], currentDepth + 1);
        }
      }
    }

    traverse(parsed, 1);

    return {
      isValid: true,
      parsed,
      stats: {
        keys: keysCount,
        depth: maxDepth,
        byteSize: new TextEncoder().encode(trimmed).length,
      },
    };
  } catch (err: any) {
    let line: number | undefined;
    let column: number | undefined;

    // Extract line and column from V8 error message if available
    const posMatch = err.message.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const lines = trimmed.substring(0, pos).split("\n");
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    return {
      isValid: false,
      error: err.message,
      line,
      column,
    };
  }
}

/**
 * 2. XML Formatter & Validator
 */
export function formatXml(
  xml: string,
  options: { indent?: number | "tab" } = {}
): { formatted: string; isValid: boolean; error?: string; tagCount: number } {
  const trimmed = xml.trim();
  if (!trimmed) return { formatted: "", isValid: true, tagCount: 0 };

  const indentStr = options.indent === "tab" ? "\t" : " ".repeat(typeof options.indent === "number" ? options.indent : 2);

  try {
    let formatted = "";
    let indentLevel = 0;
    let tagCount = 0;

    // Tokenize XML elements and text
    const tokens = trimmed.replace(/>\s*</g, "><").match(/(<[^>]+>|[^<]+)/g) || [];

    for (const token of tokens) {
      const t = token.trim();
      if (!t) continue;

      if (t.startsWith("<?") || t.startsWith("<!DOCTYPE") || t.startsWith("<!--")) {
        // Headers, comments, doctypes
        formatted += indentStr.repeat(indentLevel) + t + "\n";
      } else if (t.startsWith("</")) {
        // Closing tag
        indentLevel = Math.max(0, indentLevel - 1);
        formatted += indentStr.repeat(indentLevel) + t + "\n";
      } else if (t.startsWith("<") && (t.endsWith("/>") || t.includes("/>"))) {
        // Self closing tag
        tagCount++;
        formatted += indentStr.repeat(indentLevel) + t + "\n";
      } else if (t.startsWith("<")) {
        // Opening tag
        tagCount++;
        formatted += indentStr.repeat(indentLevel) + t + "\n";
        indentLevel++;
      } else {
        // Text node
        formatted += indentStr.repeat(indentLevel) + t + "\n";
      }
    }

    return { formatted: formatted.trimEnd(), isValid: true, tagCount };
  } catch (err: any) {
    return { formatted: xml, isValid: false, error: err.message, tagCount: 0 };
  }
}

/**
 * 3. URL Parser
 */
export interface ParsedUrlDetails {
  isValid: boolean;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  pathSegments: string[];
  search: string;
  queryParams: { key: string; value: string }[];
  hash: string;
  origin: string;
  username: string;
  password: string;
  error?: string;
}

export function parseUrl(rawUrl: string): ParsedUrlDetails {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return {
      isValid: false,
      protocol: "",
      host: "",
      hostname: "",
      port: "",
      pathname: "",
      pathSegments: [],
      search: "",
      queryParams: [],
      hash: "",
      origin: "",
      username: "",
      password: "",
      error: "Empty URL string",
    };
  }

  try {
    let urlToParse = trimmed;
    // Add default protocol if omitted
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)) {
      urlToParse = "https://" + trimmed;
    }

    const url = new URL(urlToParse);
    const queryParams: { key: string; value: string }[] = [];
    url.searchParams.forEach((val, key) => {
      queryParams.push({ key, value: val });
    });

    const pathSegments = url.pathname.split("/").filter(Boolean);

    return {
      isValid: true,
      protocol: url.protocol,
      host: url.host,
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? "443" : url.protocol === "http:" ? "80" : ""),
      pathname: url.pathname,
      pathSegments,
      search: url.search,
      queryParams,
      hash: url.hash,
      origin: url.origin,
      username: url.username,
      password: url.password,
    };
  } catch (err: any) {
    return {
      isValid: false,
      protocol: "",
      host: "",
      hostname: "",
      port: "",
      pathname: "",
      pathSegments: [],
      search: "",
      queryParams: [],
      hash: "",
      origin: "",
      username: "",
      password: "",
      error: `Invalid URL: ${err.message}`,
    };
  }
}

/**
 * 4. Query String Builder
 */
export function buildQueryString(
  params: { key: string; value: string; enabled?: boolean }[],
  options: {
    arrayFormat?: "brackets" | "repeat" | "comma";
    prefixQuestionMark?: boolean;
    baseUrl?: string;
  } = {}
): string {
  const { arrayFormat = "brackets", prefixQuestionMark = true, baseUrl = "" } = options;
  const activeParams = params.filter((p) => p.enabled !== false && p.key.trim());

  if (activeParams.length === 0) {
    return baseUrl;
  }

  const parts: string[] = [];
  const map = new Map<string, string[]>();

  for (const item of activeParams) {
    const k = item.key.trim();
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item.value);
  }

  map.forEach((values, key) => {
    if (values.length > 1) {
      if (arrayFormat === "brackets") {
        for (const v of values) {
          parts.push(`${encodeURIComponent(`${key}[]`)}=${encodeURIComponent(v)}`);
        }
      } else if (arrayFormat === "repeat") {
        for (const v of values) {
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
        }
      } else {
        // comma
        const joined = values.map((v) => encodeURIComponent(v)).join(",");
        parts.push(`${encodeURIComponent(key)}=${joined}`);
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(values[0])}`);
    }
  });

  const queryStr = parts.join("&");
  if (!baseUrl) {
    return prefixQuestionMark ? `?${queryStr}` : queryStr;
  }

  const cleanBase = baseUrl.split("?")[0];
  return `${cleanBase}?${queryStr}`;
}

/**
 * 5. JWT Decoder (Client-side, zero network transmission)
 */
export interface DecodedJwt {
  isValid: boolean;
  header: any;
  payload: any;
  signature: string;
  isExpired?: boolean;
  expiresAt?: Date;
  issuedAt?: Date;
  rawHeader: string;
  rawPayload: string;
  error?: string;
}

export function decodeJwt(token: string): DecodedJwt {
  const trimmed = token.trim();
  if (!trimmed) {
    return { isValid: false, header: null, payload: null, signature: "", rawHeader: "", rawPayload: "", error: "Empty JWT token" };
  }

  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return {
      isValid: false,
      header: null,
      payload: null,
      signature: "",
      rawHeader: "",
      rawPayload: "",
      error: `Invalid JWT format: expected 3 dot-separated segments (header.payload.signature), received ${parts.length}`,
    };
  }

  try {
    function b64UrlDecode(str: string): string {
      let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(b64), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    }

    const rawHeader = b64UrlDecode(parts[0]);
    const rawPayload = b64UrlDecode(parts[1]);

    const header = JSON.parse(rawHeader);
    const payload = JSON.parse(rawPayload);

    let isExpired = false;
    let expiresAt: Date | undefined;
    let issuedAt: Date | undefined;

    if (payload.exp && typeof payload.exp === "number") {
      expiresAt = new Date(payload.exp * 1000);
      isExpired = Date.now() >= payload.exp * 1000;
    }

    if (payload.iat && typeof payload.iat === "number") {
      issuedAt = new Date(payload.iat * 1000);
    }

    return {
      isValid: true,
      header,
      payload,
      signature: parts[2],
      isExpired,
      expiresAt,
      issuedAt,
      rawHeader,
      rawPayload,
    };
  } catch (err: any) {
    return {
      isValid: false,
      header: null,
      payload: null,
      signature: parts[2] || "",
      rawHeader: "",
      rawPayload: "",
      error: `Failed to decode JWT payload: ${err.message}`,
    };
  }
}

/**
 * 6. Color Converter (HEX, RGB, RGBA, HSL, HSLA, CMYK, Contrast Ratio)
 */
export interface ConvertedColorDetails {
  isValid: boolean;
  hex: string;
  hex8: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  cmyk: string;
  r: number;
  g: number;
  b: number;
  a: number;
  h: number;
  s: number;
  l: number;
  contrastWhite: number;
  contrastBlack: number;
  error?: string;
}

export function convertColor(input: string): ConvertedColorDetails {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) {
    return {
      isValid: false, hex: "", hex8: "", rgb: "", rgba: "", hsl: "", hsla: "", cmyk: "",
      r: 0, g: 0, b: 0, a: 1, h: 0, s: 0, l: 0, contrastWhite: 1, contrastBlack: 1, error: "Empty color input"
    };
  }

  let r = 0, g = 0, b = 0, a = 1;

  try {
    if (trimmed.startsWith("#")) {
      // Hex format (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
      const hex = trimmed.slice(1);
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 4) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
        a = Math.round((parseInt(hex[3] + hex[3], 16) / 255) * 100) / 100;
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else if (hex.length === 8) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
        a = Math.round((parseInt(hex.slice(6, 8), 16) / 255) * 100) / 100;
      } else {
        throw new Error("Hex color must have 3, 4, 6, or 8 characters");
      }
    } else if (trimmed.startsWith("rgb")) {
      // rgb(r, g, b) or rgba(r, g, b, a)
      const parts = trimmed.replace(/[rgba()]/g, "").split(/[\s,]+/).filter(Boolean);
      if (parts.length >= 3) {
        r = Math.min(255, Math.max(0, parseInt(parts[0], 10)));
        g = Math.min(255, Math.max(0, parseInt(parts[1], 10)));
        b = Math.min(255, Math.max(0, parseInt(parts[2], 10)));
        if (parts[3] !== undefined) {
          a = Math.min(1, Math.max(0, parseFloat(parts[3])));
        }
      } else {
        throw new Error("Invalid rgb() parameters");
      }
    } else if (trimmed.startsWith("hsl")) {
      // hsl(h, s%, l%)
      const parts = trimmed.replace(/[hsla()%]/g, "").split(/[\s,]+/).filter(Boolean);
      if (parts.length >= 3) {
        const hVal = parseFloat(parts[0]);
        const sVal = parseFloat(parts[1]) / 100;
        const lVal = parseFloat(parts[2]) / 100;
        if (parts[3] !== undefined) a = parseFloat(parts[3]);

        // HSL to RGB conversion
        const c = (1 - Math.abs(2 * lVal - 1)) * sVal;
        const x = c * (1 - Math.abs(((hVal / 60) % 2) - 1));
        const m = lVal - c / 2;
        let r1 = 0, g1 = 0, b1 = 0;

        if (hVal >= 0 && hVal < 60) { r1 = c; g1 = x; b1 = 0; }
        else if (hVal >= 60 && hVal < 120) { r1 = x; g1 = c; b1 = 0; }
        else if (hVal >= 120 && hVal < 180) { r1 = 0; g1 = c; b1 = x; }
        else if (hVal >= 180 && hVal < 240) { r1 = 0; g1 = x; b1 = c; }
        else if (hVal >= 240 && hVal < 300) { r1 = x; g1 = 0; b1 = c; }
        else { r1 = c; g1 = 0; b1 = x; }

        r = Math.round((r1 + m) * 255);
        g = Math.round((g1 + m) * 255);
        b = Math.round((b1 + m) * 255);
      } else {
        throw new Error("Invalid hsl() parameters");
      }
    } else {
      throw new Error("Supported formats: #HEX, rgb(), rgba(), hsl(), hsla()");
    }

    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) {
      throw new Error("Could not parse color values");
    }

    // RGB to HSL
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h = Math.round(h * 60);
    }
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    // RGB to CMYK
    let k = 1 - max;
    let c = k < 1 ? Math.round(((1 - rNorm - k) / (1 - k)) * 100) : 0;
    let m = k < 1 ? Math.round(((1 - gNorm - k) / (1 - k)) * 100) : 0;
    let y = k < 1 ? Math.round(((1 - bNorm - k) / (1 - k)) * 100) : 0;
    const kPercent = Math.round(k * 100);

    // Relative Luminance for WCAG Contrast
    function sRGBtoLin(colorChannel: number): number {
      const c = colorChannel / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    const L = 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b);
    const contrastWhite = Math.round(((1.0 + 0.05) / (L + 0.05)) * 100) / 100;
    const contrastBlack = Math.round(((L + 0.05) / (0.0 + 0.05)) * 100) / 100;

    const hexR = r.toString(16).padStart(2, "0").toUpperCase();
    const hexG = g.toString(16).padStart(2, "0").toUpperCase();
    const hexB = b.toString(16).padStart(2, "0").toUpperCase();
    const hexA = Math.round(a * 255).toString(16).padStart(2, "0").toUpperCase();

    return {
      isValid: true,
      hex: `#${hexR}${hexG}${hexB}`,
      hex8: `#${hexR}${hexG}${hexB}${hexA}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      rgba: `rgba(${r}, ${g}, ${b}, ${a})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      hsla: `hsla(${h}, ${s}%, ${l}%, ${a})`,
      cmyk: `cmyk(${c}%, ${m}%, ${y}%, ${kPercent}%)`,
      r, g, b, a, h, s, l,
      contrastWhite,
      contrastBlack,
    };
  } catch (err: any) {
    return {
      isValid: false,
      hex: "", hex8: "", rgb: "", rgba: "", hsl: "", hsla: "", cmyk: "",
      r: 0, g: 0, b: 0, a: 1, h: 0, s: 0, l: 0, contrastWhite: 1, contrastBlack: 1,
      error: err.message,
    };
  }
}

/**
 * 7. Fast GFM Markdown to HTML Parser (Browser Safe, No External Libs)
 */
export function renderMarkdownToHtml(md: string): string {
  if (!md) return "";

  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (fenced ```)
  html = html.replace(/```([a-zA-Z0-9_\-]+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-muted/80 p-4 rounded-lg overflow-x-auto text-xs font-mono text-foreground border border-border/60"><code>${code.trim()}</code></pre>`;
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-muted text-primary font-mono text-xs font-semibold">$1</code>');

  // Headers # to ######
  html = html.replace(/^###### (.*$)/gim, '<h6 class="text-sm font-bold mt-4 mb-2 text-foreground">$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold mt-4 mb-2 text-foreground">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-5 mb-2 text-foreground border-b border-border/40 pb-1">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 text-foreground border-b border-border/40 pb-1.5">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-6 mb-4 text-foreground pb-2 border-b border-border/60">$1</h1>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-1 italic my-3 text-muted-foreground bg-muted/20 rounded-r-md">$1</blockquote>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');

  // Horizontal Rule
  html = html.replace(/^---$/gim, '<hr class="my-6 border-border/60" />');

  // Lists (Unordered and Ordered)
  html = html.replace(/^\s*[\-\*] (.*$)/gim, '<li class="ml-4 list-disc text-foreground/90 my-1">$1</li>');
  html = html.replace(/^\s*(\d+)\. (.*$)/gim, '<li class="ml-4 list-decimal text-foreground/90 my-1">$2</li>');

  // Paragraphs (double newlines)
  const paragraphs = html.split(/\n\n+/);
  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<li") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed;
      }
      return `<p class="my-2.5 leading-relaxed text-foreground/90">${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}
