/**
 * Unicode Character Database (UCD) Importer & Data Pipeline
 * Official Source: https://www.unicode.org/Public/16.0.0/ucd/
 * Specification: Unicode Standard Version 16.0.0
 */

export interface UnicodeCharacterRecord {
  codepoint: string;          // e.g. "U+20AC"
  hex: string;                // e.g. "20AC"
  dec: number;                // e.g. 8364
  char: string;               // e.g. "€"
  name: string;               // e.g. "EURO SIGN"
  category: string;           // e.g. "Currency Symbols" (Sc)
  categoryCode: string;       // e.g. "Sc", "Sm", "So", "Po", "Lu", "Ll"
  block: string;              // e.g. "Currency Symbols", "Arrows", "Mathematical Operators"
  script: string;             // e.g. "Common", "Latin", "Greek"
  htmlEntity?: string;        // e.g. "&euro;"
  htmlDec: string;            // e.g. "&#8364;"
  htmlHex: string;            // e.g. "&#x20AC;"
  utf8Bytes: string;          // e.g. "0xE2 0x82 0xAC"
  altCodeWindows?: string;    // e.g. "Alt + 0128"
  macShortcut?: string;       // e.g. "Option + Shift + 2"
  aliases: string[];          // Curated search keywords & common names
  slug: string;               // URL-friendly identifier
}

/**
 * Standard General Category mapping from UCD codes to human-readable names
 */
export const UCD_CATEGORY_MAP: Record<string, string> = {
  Lu: "Uppercase Letter",
  Ll: "Lowercase Letter",
  Lt: "Titlecase Letter",
  Lm: "Modifier Letter",
  Lo: "Other Letter",
  Mn: "Nonspacing Mark",
  Mc: "Spacing Mark",
  Me: "Enclosing Mark",
  Nd: "Decimal Number",
  Nl: "Letter Number",
  No: "Other Number",
  Pc: "Connector Punctuation",
  Pd: "Dash Punctuation",
  Ps: "Open Punctuation",
  Pe: "Close Punctuation",
  Pi: "Initial Quote Punctuation",
  Pf: "Final Quote Punctuation",
  Po: "Other Punctuation",
  Sm: "Math Symbol",
  Sc: "Currency Symbol",
  Sk: "Modifier Symbol",
  So: "Other Symbol",
  Zs: "Space Separator",
  Zl: "Line Separator",
  Zp: "Paragraph Separator",
  Cc: "Control",
  Cf: "Format",
  Cs: "Surrogate",
  Co: "Private Use",
  Cn: "Unassigned",
};

/**
 * Common HTML named entity lookups
 */
export const HTML_NAMED_ENTITIES: Record<string, string> = {
  "34": "&quot;",
  "38": "&amp;",
  "60": "&lt;",
  "62": "&gt;",
  "160": "&nbsp;",
  "161": "&iexcl;",
  "162": "&cent;",
  "163": "&pound;",
  "164": "&curren;",
  "165": "&yen;",
  "167": "&sect;",
  "169": "&copy;",
  "174": "&reg;",
  "176": "&deg;",
  "177": "&plusmn;",
  "182": "&para;",
  "183": "&middot;",
  "191": "&iquest;",
  "215": "&times;",
  "247": "&divide;",
  "8211": "&ndash;",
  "8212": "&mdash;",
  "8216": "&lsquo;",
  "8217": "&rsquo;",
  "8220": "&ldquo;",
  "8221": "&rdquo;",
  "8222": "&bdquo;",
  "8224": "&dagger;",
  "8225": "&Dagger;",
  "8226": "&bull;",
  "8230": "&hellip;",
  "8240": "&permil;",
  "8364": "&euro;",
  "8482": "&trade;",
  "8592": "&larr;",
  "8593": "&uarr;",
  "8594": "&rarr;",
  "8595": "&darr;",
  "8596": "&harr;",
  "8656": "&lArr;",
  "8658": "&rArr;",
  "8704": "&forall;",
  "8706": "&part;",
  "8707": "&exist;",
  "8709": "&empty;",
  "8711": "&nabla;",
  "8712": "&isin;",
  "8719": "&prod;",
  "8721": "&sum;",
  "8722": "&minus;",
  "8730": "&radic;",
  "8733": "&prop;",
  "8734": "&infin;",
  "8736": "&ang;",
  "8743": "&and;",
  "8744": "&or;",
  "8745": "&cap;",
  "8746": "&cup;",
  "8747": "&int;",
  "8756": "&there4;",
  "8764": "&sim;",
  "8773": "&cong;",
  "8776": "&asymp;",
  "8800": "&ne;",
  "8801": "&equiv;",
  "8804": "&le;",
  "8805": "&ge;",
  "8834": "&sub;",
  "8835": "&sup;",
  "9824": "&spades;",
  "9827": "&clubs;",
  "9829": "&hearts;",
  "9830": "&diams;",
};

