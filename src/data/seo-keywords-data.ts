/**
 * Google Keyword Planner Dataset & Semantic Cluster Definitions
 * Extracted directly from official Keyword Stats export (387 Keywords, >2.6M monthly volume)
 */

export type KeywordClusterType =
  | "copyright_legal"
  | "accents_foreign"
  | "alt_codes_shortcuts"
  | "math_scientific"
  | "arrows"
  | "hearts_stars_shapes"
  | "punctuation_keyboard"
  | "word_shortcuts"
  | "general_keyboard_symbols";

export interface PlannerKeyword {
  keyword: string;
  searches: number;
  competition: "Low" | "Medium" | "High";
  cluster: KeywordClusterType;
  primarySymbol?: string | null;
  targetRoute?: string | null;
}

export interface ClusterSummary {
  id: KeywordClusterType;
  name: string;
  totalMonthlySearches: number;
  keywordCount: number;
  primaryRoute: string;
  topKeywords: string[];
  description: string;
}

export const PLANNER_KEYWORDS: PlannerKeyword[] = [
  {
    "keyword": "c symbol",
    "searches": 500000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright glyph",
    "searches": 500000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "alt codes",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes degree",
    "searches": 50000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "alt keyboard",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt keyboard mac",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt shortcut",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt symbols",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "keyboard and symbol",
    "searches": 50000,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "keyboard copy paste",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts emojis",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts in word",
    "searches": 50000,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "keyboard special character",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard sy",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard \u00f1",
    "searches": 50000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "letters on a keyboard",
    "searches": 50000,
    "competition": "High",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "name of keyboard buttons",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "name of the symbol in keyboard",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "names of the symbols on a keyboard",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "on key board",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "shortcut codes",
    "searches": 50000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "shortcut keyboard for \u00f1",
    "searches": 50000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "shortcuts word",
    "searches": 50000,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "symbols in a keyboard",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols keyboard name",
    "searches": 50000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "accent letters on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "accent symbol on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "accents on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "all symbols on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt code copyright",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "alt code for check mark",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "alt code shortcuts",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes for accents",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "alt codes for windows",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes letters",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes symbols",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt icon",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt keyboard letters",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt keys shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt letters",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt signs",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alternative letters",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "arrow on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "arrow symbol in keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "bullet keyboard shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "bullet shortcut keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "c symbol copy and paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "code on keyboard",
    "searches": 5000,
    "competition": "High",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "codes windows",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "copy paste copyright symbol",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copy right copy and paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copy right copy paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copy to keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "copyright logo copy and paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright mac keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright sign copy and paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright sign copy paste",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol in keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "degree symbol alt code",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "degree symbol shortcut mac",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "down arrow symbol keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2193",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "french keyboard shortcuts",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e9",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "heart in keyboard shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2665",
    "targetRoute": "/symbols/hearts"
  },
  {
    "keyword": "in key board",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard all symbol name",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard all symbols",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard check symbol",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "keyboard combinations for symbols",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard copy",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcut arrow",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "keyboard shortcut for check",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "keyboard shortcut for check symbol",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "keyboard shortcut for heart",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2665",
    "targetRoute": "/symbols/hearts"
  },
  {
    "keyword": "keyboard shortcut for pi",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard shortcut for typing",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard shortcuts and symbols",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "keyboard shortcuts for accents",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard shortcuts for letters with accents",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard shortcuts microsoft word",
    "searches": 5000,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "keyboard shortcuts typing",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard square",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b2",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard up arrow",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2191",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "mark on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "name of all symbols on keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "o keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "short cut for \u00f1",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "shortcut for bullet",
    "searches": 5000,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "shortcut for symbols in keyboard",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "square keyboard shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b2",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "symbol codes",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol shortcut mac",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols and codes",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols in keyboard shortcuts",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols on keyboard shortcuts",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols shortcuts",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols typing",
    "searches": 5000,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "type shortcut",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "up arrow symbol keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2191",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "windows codes",
    "searches": 5000,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "windows symbols",
    "searches": 5000,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "word symbols",
    "searches": 5000,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "\u00e0 keyboard",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e0",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e1 keyboard",
    "searches": 5000,
    "competition": "Medium",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f3 keyboard",
    "searches": 5000,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f3",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "accent shortcuts windows",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "acute accent on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "all alt codes",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "all keyboard letters",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "all letters in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "all symbol name in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt c shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt code for trademark",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u2122",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "alt codes excel",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes for math symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt codes word",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "alt commands keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt copyright",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "alt degree symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "alt for degree symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "alt in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt keys keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt number symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt shortcut for degree symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "alt shortcuts for symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt symbol keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt symbols copy and paste",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "alt \u00f1",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "alternate keyboard",
    "searches": 500,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "and shortcut symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "and symbol in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "arrow up keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2191",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "at shortcut keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "at sign keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "@",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "bullet on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "c symbol copy",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "check in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "check in keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "check shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "check shortcut in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "check shortcut keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "code for copyright symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "code for \u00f1 on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "code keyboard symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "code symbols for letters",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "codes for keyboard symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "control alt keys",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "copyright c copy paste",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright font",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright keyboard shortcut mac",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright logo copy paste",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol alt",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol alt code",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol font",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol how to type",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright symbol windows",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "ctrl alt keys",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "ctrl alt symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "heart emoji keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2665",
    "targetRoute": "/symbols/hearts"
  },
  {
    "keyword": "infinity keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "insert copyright symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "key shortcut for \u00f1",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard accent codes",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard code for \u00f1",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard letters and numbers",
    "searches": 500,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard letters and symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "keyboard letters numbers",
    "searches": 500,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard letters shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard letters symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard number symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcut codes",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "keyboard shortcut for letters",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcut for plus minus",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard shortcut for square",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u25a0",
    "targetRoute": "/symbols/shapes"
  },
  {
    "keyword": "keyboard shortcut for \u00e9",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e9",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard shortcuts for math symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts for symbols windows",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts for \u00f1",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard symbols above numbers",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols and meanings",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard typing symbols",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keypad symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keypad symbol name",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "mac symbol keyboard shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "make a copyright symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "make symbols with keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "microsoft alt codes",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "microsoft word symbols shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "no on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "number symbol in word",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "numbers and symbols on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "plus in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "plus minus keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "plus minus symbol keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "plus on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "right arrow in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "right arrow keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "section shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "\u00a7",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "shortcut for check",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "sign shortcut keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "special character code",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "special character shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "square shortcut keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b2",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "star in keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2605",
    "targetRoute": "/symbols/stars"
  },
  {
    "keyword": "symbol meanings on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol number code",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol shortcuts windows",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol using keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols in keyboard name",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols on a keyboard and their names",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols on windows keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "type arrow on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "type copyright symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "type right arrow",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "typing accents",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "typing shortcuts in word",
    "searches": 500,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "up symbol keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "website symbol in word",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "windows accents",
    "searches": 500,
    "competition": "Medium",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "windows alt",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "windows alt shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "windows arrows",
    "searches": 500,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "windows letters",
    "searches": 500,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "with symbol on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "word alt key shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "word copyright symbol",
    "searches": 500,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "word keyboard shortcuts symbols",
    "searches": 500,
    "competition": "Medium",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "word symbols codes",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "word symbols shortcuts",
    "searches": 500,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "\u00e0 in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e0",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e0 on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e0",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e9 keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e9",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 code in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 in keyboard shortcut",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 in ms word",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 in word",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 shortcut in keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 windows",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00fc on keyboard",
    "searches": 500,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "& keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "a with accent keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "acute keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "all keyboard codes",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "all keyboard symbols copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "all rights reserved copy",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "all rights reserved copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "all symbols on keyboard copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "all the symbols in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alt shortcut for check",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "alt symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alternate symbols on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "alternative letters on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "and keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "and symbol keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "and symbol shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "arrow right keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "arrow to the right keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2192",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "arrow up in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "arrows",
    "primarySymbol": "\u2191",
    "targetRoute": "/symbols/arrows"
  },
  {
    "keyword": "at on windows keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "at symbol shortcut in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "at type keyboard",
    "searches": 50,
    "competition": "Medium",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "basic keyboard symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "bullet in keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "bullet key shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "bullet shortcut in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2022",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "by symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "c copyright symbol copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "c keyboard symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "check on keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "code letters symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "code of \u00f1 on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "copyright all rights reserved copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright emoji copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright mark copy and paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright paste",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "copyright windows",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "ctrl alt commands",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "ctrl alt keyboard shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "ctrl number codes",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "ctrl symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "ctrl symbols keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "different keyboard symbols and their names",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "emoji symbols keyboard shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "find symbols on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "heart shortcut in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2665",
    "targetRoute": "/symbols/hearts"
  },
  {
    "keyword": "in keyboard symbol names",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "insert symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "insert symbol shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard alphabet shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard alt characters",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard codes for letters",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard command for \u00f1",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard how to use symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard in word",
    "searches": 50,
    "competition": "Medium",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "keyboard numbers typing symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard shortcut check",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "keyboard shortcut for a",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcut for at",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcut of \u00f1",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard shortcut \u00f1",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard shortcuts for special letters",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts letters and symbols",
    "searches": 50,
    "competition": "Medium",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "keyboard shortcuts to make symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard shortcuts when typing",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard signs symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols and names",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols and their meaning",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols how to type",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard symbols with meaning",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "keyboard typing accented letters",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "keyboard typing code",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "keyboard with accent marks",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "letters and symbols keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "letters in a keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "mark keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "math keyboard shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "microsoft keyboard symbol shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "microsoft keyboard symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "microsoft word alt",
    "searches": 50,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "microsoft word alt codes",
    "searches": 50,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "microsoft word \u00f1 shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "more keyboard symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "more symbols on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "name of all symbols in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "name of all the symbols on a keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "names of different symbols on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "no symbol on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "not on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "number sign keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "#",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "number sign symbol on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "#",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "number symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "on a keyboard symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "pi shortcut keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "plus sign keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u00b1",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "points shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "right on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "select using keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "short cut \u00f1",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "shortcut codes for symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "shortcut for and symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "shortcut of and symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "punctuation_keyboard",
    "primarySymbol": "&",
    "targetRoute": "/symbols/keyboard-signs"
  },
  {
    "keyword": "sign in keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol at keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol of copy",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol on keyboard shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol shortcut in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbol type in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols for letters code",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols in word shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "word_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/guides/keyboard-symbol-shortcuts"
  },
  {
    "keyword": "symbols on numbers keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols on the keyboard and their names",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols to make with keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols used in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "symbols with name in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "the symbol on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "this symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "type at symbol on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "type check in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "hearts_stars_shapes",
    "primarySymbol": "\u2713",
    "targetRoute": "/symbols/checkmarks"
  },
  {
    "keyword": "type copyright",
    "searches": 50,
    "competition": "Low",
    "cluster": "copyright_legal",
    "primarySymbol": "\u00a9",
    "targetRoute": "/symbols/legal"
  },
  {
    "keyword": "type symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "typing codes for symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "typing symbols in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "math_scientific",
    "primarySymbol": "\u03c0",
    "targetRoute": "/symbols/math"
  },
  {
    "keyword": "up on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "us keyboard symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "windows alt commands",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "windows alt keyboard shortcuts",
    "searches": 50,
    "competition": "Low",
    "cluster": "alt_codes_shortcuts",
    "primarySymbol": null,
    "targetRoute": "/tools/symbols/alt-code-finder"
  },
  {
    "keyword": "windows keyboard shortcuts for symbols",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "with shortcut symbol",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "word \u00f1",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e0 keyboard code",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e0",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e1 alt",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00e1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00e7 keyboard code",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 in microsoft",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 keyboard code",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 microsoft word",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 on word",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 symbol in keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f1 word shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f3 keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f3",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00f4 on keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "general_keyboard_symbols",
    "primarySymbol": null,
    "targetRoute": "/symbols"
  },
  {
    "keyword": "\u00fc keyboard shortcut",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  },
  {
    "keyword": "\u00fc shortcut keyboard",
    "searches": 50,
    "competition": "Low",
    "cluster": "accents_foreign",
    "primarySymbol": "\u00f1",
    "targetRoute": "/symbols/accents"
  }
];

export const KEYWORD_CLUSTERS: ClusterSummary[] = [
  {
    "id": "copyright_legal",
    "name": "Copyright, Trademark & Legal Glyphs",
    "totalMonthlySearches": 1070450,
    "keywordCount": 43,
    "primaryRoute": "/symbols/legal",
    "topKeywords": [
      "c symbol",
      "copyright glyph",
      "alt code copyright",
      "c symbol copy and paste",
      "copy paste copyright symbol",
      "copy right copy and paste"
    ],
    "description": "High-intent queries for copyright symbol (\u00a9), registered trademark (\u00ae), and trademark (\u2122) copy-paste, Alt codes, and shortcuts."
  },
  {
    "id": "general_keyboard_symbols",
    "name": "General Keyboard Symbols & Special Characters",
    "totalMonthlySearches": 681400,
    "keywordCount": 155,
    "primaryRoute": "/symbols",
    "topKeywords": [
      "keyboard copy paste",
      "keyboard shortcuts emojis",
      "keyboard special character",
      "keyboard sy",
      "keyboard symbols",
      "name of keyboard buttons"
    ],
    "description": "Mass-volume searches for keyboard symbol names, keyboard layout references, typing shortcuts, and copy-paste character tables."
  },
  {
    "id": "alt_codes_shortcuts",
    "name": "Windows Alt Codes & Keyboard Shortcuts",
    "totalMonthlySearches": 350150,
    "keywordCount": 28,
    "primaryRoute": "/tools/symbols/alt-code-finder",
    "topKeywords": [
      "alt codes",
      "alt keyboard",
      "alt keyboard mac",
      "alt shortcut",
      "alt symbols",
      "shortcut codes"
    ],
    "description": "Direct queries looking for Windows numeric keypad Alt codes, Mac Option equivalents, and symbol combination codes."
  },
  {
    "id": "accents_foreign",
    "name": "Spanish Accents & Foreign Letters",
    "totalMonthlySearches": 226650,
    "keywordCount": 60,
    "primaryRoute": "/symbols/accents",
    "topKeywords": [
      "keyboard \u00f1",
      "letters on a keyboard",
      "shortcut keyboard for \u00f1",
      "accent letters on keyboard",
      "accent symbol on keyboard",
      "accents on keyboard"
    ],
    "description": "Queries for Spanish \u00f1/\u00d1, French accents (\u00e9, \u00e0, \u00e7), German umlauts (\u00fc), and international diacritics keyboard shortcuts."
  },
  {
    "id": "word_shortcuts",
    "name": "Microsoft Word & Document Symbol Shortcuts",
    "totalMonthlySearches": 114200,
    "keywordCount": 16,
    "primaryRoute": "/guides/keyboard-symbol-shortcuts",
    "topKeywords": [
      "keyboard shortcuts in word",
      "shortcuts word",
      "keyboard shortcuts microsoft word",
      "word symbols",
      "alt codes word",
      "microsoft word symbols shortcuts"
    ],
    "description": "Keyboard shortcuts specifically in Microsoft Word, Google Docs, and desktop word processors for special characters."
  },
  {
    "id": "math_scientific",
    "name": "Mathematical & Scientific Symbols",
    "totalMonthlySearches": 96350,
    "keywordCount": 28,
    "primaryRoute": "/symbols/math",
    "topKeywords": [
      "alt codes degree",
      "degree symbol alt code",
      "degree symbol shortcut mac",
      "keyboard shortcut for pi",
      "keyboard shortcut for typing",
      "keyboard shortcuts typing"
    ],
    "description": "Searches for degree symbol (\u00b0), plus-minus (\u00b1), superscript square (\u00b2), pi (\u03c0), and mathematical operators."
  },
  {
    "id": "punctuation_keyboard",
    "name": "Punctuation & Keyboard Signs",
    "totalMonthlySearches": 57900,
    "keywordCount": 15,
    "primaryRoute": "/symbols/keyboard-signs",
    "topKeywords": [
      "keyboard and symbol",
      "keyboard shortcuts and symbols",
      "and symbol in keyboard",
      "at sign keyboard shortcut",
      "keyboard letters and symbols",
      "numbers and symbols on keyboard"
    ],
    "description": "Shortcuts and Alt codes for ampersand (&), at-sign (@), number sign (#), section sign (\u00a7), and keyboard punctuation."
  },
  {
    "id": "hearts_stars_shapes",
    "name": "Hearts, Stars, Checkmarks & Bullets",
    "totalMonthlySearches": 50400,
    "keywordCount": 27,
    "primaryRoute": "/symbols/checkmarks",
    "topKeywords": [
      "alt code for check mark",
      "bullet keyboard shortcut",
      "bullet shortcut keyboard",
      "heart in keyboard shortcut",
      "keyboard check symbol",
      "keyboard shortcut for check"
    ],
    "description": "Searches for heart emojis/symbols (\u2665), checkmarks (\u2713), stars (\u2605), bullets (\u2022), and geometric squares."
  },
  {
    "id": "arrows",
    "name": "Directional Arrows & Pointers",
    "totalMonthlySearches": 33150,
    "keywordCount": 15,
    "primaryRoute": "/symbols/arrows",
    "topKeywords": [
      "arrow on keyboard",
      "arrow symbol in keyboard",
      "down arrow symbol keyboard",
      "keyboard shortcut arrow",
      "keyboard up arrow",
      "up arrow symbol keyboard"
    ],
    "description": "Shortcuts and copy-paste for right (\u2192), left (\u2190), up (\u2191), down (\u2193), and double exchange arrows."
  }
];


/**
 * Find all keywords associated with a specific character
 */
export function findKeywordsForSymbol(char: string): PlannerKeyword[] {
  return PLANNER_KEYWORDS.filter((k) => k.primarySymbol === char);
}

/**
 * Find all keywords in a cluster
 */
export function findKeywordsByCluster(cluster: KeywordClusterType): PlannerKeyword[] {
  return PLANNER_KEYWORDS.filter((k) => k.cluster === cluster);
}

/**
 * Filter keywords matching a search query
 */
export function searchPlannerKeywords(query: string, limit = 20): PlannerKeyword[] {
  const q = query.toLowerCase().trim();
  if (!q) return PLANNER_KEYWORDS.slice(0, limit);
  return PLANNER_KEYWORDS.filter((k) => k.keyword.toLowerCase().includes(q)).slice(0, limit);
}
