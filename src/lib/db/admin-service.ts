import fs from "node:fs";
import path from "node:path";
import { hashPassword, verifyPassword } from "../auth/crypto";
import type { AdminSessionPayload } from "../auth/session";

export interface AdminToolRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  componentId: string;
  isFeatured: boolean;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  sortOrder: number;
  updatedAt: string;
}

export interface AdminCategoryRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
  isPublished: boolean;
  toolCount?: number;
}

export interface AdminRedirectRecord {
  id: string;
  sourcePath: string;
  targetPath: string;
  statusCode: 301 | 308;
  isActive: boolean;
  hitCount: number;
  createdAt: string;
}

export interface AdminSiteSettingRecord {
  key: string;
  value: string;
  description: string;
  isPublic: boolean;
  updatedAt: string;
}

export interface AdminAuditRecord {
  id: string;
  userId: string;
  userEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  payload: any;
  ipAddress: string;
  createdAt: string;
}

export interface AdminCmsArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  summary: string;
  contentMarkdown: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  isIndexable: boolean;
  isPublished: boolean;
  publishedAt: string;
  readingTime: string;
  faqs: Array<{ question: string; answer: string }>;
  internalLinks: Array<{ anchorText: string; targetUrl: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: AdminSessionPayload["role"];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAdPlacementRecord {
  id: string;
  zoneKey: string;
  name: string;
  isEnabled: boolean;
  eligiblePageTypes: Array<"tools" | "articles" | "symbols" | "guides" | "home">;
  deviceVisibility: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
  adClientId: string;
  adSlotId: string;
  format: "auto" | "rectangle" | "horizontal" | "vertical";
  minHeight: number;
  updatedAt: string;
}

export interface AdminCustomSymbolRecord {
  id: string;
  character: string;
  name: string;
  codepoint: string;
  category: string;
  keywords: string[];
  isPublished: boolean;
  source: "manual" | "imported";
  createdAt: string;
  updatedAt: string;
}

export interface AdminInternalLinkRecord {
  id: string;
  anchorText: string;
  targetUrl: string;
  category: string;
  description?: string;
  clickCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminStoreState {
  users: AdminUserRecord[];
  tools: AdminToolRecord[];
  categories: AdminCategoryRecord[];
  redirects: AdminRedirectRecord[];
  settings: AdminSiteSettingRecord[];
  auditLogs: AdminAuditRecord[];
  cmsArticles: AdminCmsArticle[];
  adPlacements: AdminAdPlacementRecord[];
  customSymbols: AdminCustomSymbolRecord[];
  internalLinks: AdminInternalLinkRecord[];
}

const STORE_PATH = path.join(process.cwd(), ".data", "admin-store.json");

// Default Administrator Password: AdminPassword2026!
const DEFAULT_ADMIN_HASH = hashPassword("AdminPassword2026!");

const INITIAL_CATEGORIES: AdminCategoryRecord[] = [
  {
    id: "cat-symbols",
    slug: "symbols",
    name: "Symbols & Special Characters",
    description: "Alt codes, currency symbols, arrows, math, and copy-paste characters.",
    icon: "Sparkles",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: "cat-keyboard",
    slug: "keyboard",
    name: "Keyboard & Typing",
    description: "Key event tester, typing speed tests, layout guides, and shortcuts.",
    icon: "Keyboard",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: "cat-unicode",
    slug: "unicode",
    name: "Unicode Utilities",
    description: "Character inspector, codepoint lookup, zero-width space remover, and homoglyphs.",
    icon: "FileCode2",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: "cat-generators",
    slug: "generators",
    name: "Text Generators",
    description: "Aesthetic fancy fonts, small text, upside down, strikethrough, and NATO phonetic.",
    icon: "Sparkles",
    sortOrder: 4,
    isPublished: true,
  },
  {
    id: "cat-developer",
    slug: "developer",
    name: "Developer Utilities",
    description: "Base64, JSON formatter, URL encoder, Hash generator, Diff checker, Regex tester, and timestamps.",
    icon: "Binary",
    sortOrder: 5,
    isPublished: true,
  },
  {
    id: "cat-emoji",
    slug: "emoji",
    name: "Emoji Directory",
    description: "Categorized emoji picker, skin tones, combinations, and copy-ready slugs.",
    icon: "Smile",
    sortOrder: 6,
    isPublished: true,
  },
];

const INITIAL_TOOLS: AdminToolRecord[] = [
  {
    id: "tool-1",
    slug: "symbol-copy",
    name: "Symbol Copy & Paste Library",
    description: "Search, filter, and 1-click copy thousands of symbols, currency marks, arrows, and math signs.",
    categoryId: "symbols",
    componentId: "SymbolCopyTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Symbol Copy & Paste Library | All Symbols, Accents & Math",
    metaDescription: "Instant 1-click copy for thousands of symbols, currency signs, arrows, and mathematical operators.",
    metaKeywords: ["symbols", "copy paste symbols", "alt codes", "currency signs"],
    sortOrder: 1,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-2",
    slug: "unicode-search",
    name: "Unicode Character Search",
    description: "Search 150,000+ characters by official name, hex code point, decimal code, or glyph.",
    categoryId: "unicode",
    componentId: "UnicodeSearchTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Unicode Character Search | Official Unicode 16.0 Database",
    metaDescription: "Lookup characters across the complete Unicode standard by name, hex code point, or category.",
    metaKeywords: ["unicode search", "unicode lookup", "code point finder"],
    sortOrder: 2,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-3",
    slug: "alt-code-finder",
    name: "Alt Code Finder",
    description: "Look up numeric keypad Alt codes for Windows and Option-key shortcuts for macOS.",
    categoryId: "symbols",
    componentId: "AltCodeFinderTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Alt Code Finder | Windows Alt Key Codes & Mac Option Shortcuts",
    metaDescription: "Quick lookup for Windows Alt codes and Mac Option shortcuts with 1-click copy.",
    metaKeywords: ["alt codes", "alt code finder", "mac option shortcuts"],
    sortOrder: 3,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-4",
    slug: "accent-keyboard",
    name: "Virtual Accent Keyboard",
    description: "Type accented letters and diacritics for Spanish, French, German, and Portuguese easily.",
    categoryId: "keyboard",
    componentId: "AccentKeyboardTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Virtual Accent Keyboard | Type Accented Characters Online",
    metaDescription: "Online interactive virtual keyboard for typing European accented letters and diacritics.",
    metaKeywords: ["accent keyboard", "spanish accents", "french accents"],
    sortOrder: 4,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-5",
    slug: "emoji-library",
    name: "Emoji Library & Directory",
    description: "Full emoji directory with categories, skin-tone modifier selector, and fast 1-click copy.",
    categoryId: "emoji",
    componentId: "EmojiLibraryTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Emoji Library & Directory | Copy Emoji with Skin Tones",
    metaDescription: "Searchable emoji catalogue with categories, keywords, and skin-tone modifiers.",
    metaKeywords: ["emoji library", "copy emoji", "emoji keyboard"],
    sortOrder: 5,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-6",
    slug: "unicode-converter",
    name: "Unicode Converter",
    description: "Convert text to and from Unicode escape sequences (\\uXXXX), UTF-8 hex bytes, and HTML entities.",
    categoryId: "unicode",
    componentId: "UnicodeConverterTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "Unicode Converter | Escape Sequences, UTF-8 & Entities",
    metaDescription: "Bidirectional text converter for Unicode escapes, hex byte representations, and HTML character codes.",
    metaKeywords: ["unicode converter", "unicode escape", "utf8 converter"],
    sortOrder: 6,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-7",
    slug: "character-inspector",
    name: "Character Inspector",
    description: "Deep inspect any string to reveal hidden zero-width spaces, surrogate pairs, and grapheme counts.",
    categoryId: "unicode",
    componentId: "CharacterInspectorTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Character Inspector | Grapheme Clusters & Code Point Analysis",
    metaDescription: "Inspect characters, surrogate pairs, grapheme clusters, and zero-width codes.",
    metaKeywords: ["character inspector", "grapheme cluster", "surrogate pairs"],
    sortOrder: 7,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-8",
    slug: "html-entities",
    name: "HTML Entity Converter",
    description: "Encode text to named, decimal, and hex HTML entities for safe embedding in web pages.",
    categoryId: "developer",
    componentId: "HtmlEntityConverterTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "HTML Entity Converter | Named, Decimal & Hex Entities",
    metaDescription: "Encode text into safe HTML entities and decode HTML entities back to readable text.",
    metaKeywords: ["html entity converter", "html escape", "html decode"],
    sortOrder: 8,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-9",
    slug: "ascii-table",
    name: "ASCII Table Reference",
    description: "Complete standard and extended ASCII chart (0-255) with decimal, hex, octal, and descriptions.",
    categoryId: "developer",
    componentId: "AsciiTableTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "ASCII Table Reference | Full 0-255 Standard & Extended Chart",
    metaDescription: "Searchable ASCII reference chart with Dec, Hex, Oct, Binary, and character names.",
    metaKeywords: ["ascii table", "ascii chart", "ascii characters"],
    sortOrder: 9,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-10",
    slug: "fancy-text",
    name: "Fancy Text Generator",
    description: "Transform standard text into aesthetic Unicode typography: Fraktur, bold script, bubbles, small caps.",
    categoryId: "generators",
    componentId: "FancyTextTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Fancy Text Generator | Cool Aesthetic Unicode Fonts",
    metaDescription: "Generate cool aesthetic fonts for Instagram, Twitter/X, Discord, and gaming nicknames.",
    metaKeywords: ["fancy text generator", "aesthetic fonts", "cool text"],
    sortOrder: 10,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-11",
    slug: "base64",
    name: "Base64 Encoder / Decoder",
    description: "Encode strings and binary files to Base64 format and decode Base64 back to plain text.",
    categoryId: "developer",
    componentId: "Base64Tool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "Base64 Encoder / Decoder | RFC 4648 Compliant",
    metaDescription: "Fast browser-based Base64 encoding and decoding with UTF-8 support.",
    metaKeywords: ["base64 encoder", "base64 decoder", "base64 convert"],
    sortOrder: 11,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-12",
    slug: "url-encode",
    name: "URL Encoder / Decoder",
    description: "Percent-encode text for query parameters or decode URL-encoded web strings.",
    categoryId: "developer",
    componentId: "UrlEncodeTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "URL Encoder & Decoder | Percent-Encoding Online",
    metaDescription: "URL encode and decode strings according to RFC 3986.",
    metaKeywords: ["url encode", "url decode", "percent encoding"],
    sortOrder: 12,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-13",
    slug: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Prettify, validate, minify, and inspect JSON payloads with real-time error syntax highlighting.",
    categoryId: "developer",
    componentId: "JsonFormatterTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "JSON Formatter & Validator | Prettify & Minify Online",
    metaDescription: "Format, validate, prettify, and minify JSON data with instant syntax error detection.",
    metaKeywords: ["json formatter", "json validator", "prettify json"],
    sortOrder: 13,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-14",
    slug: "character-counter",
    name: "Character & Word Counter",
    description: "Count visible characters, graphemes, words, sentences, reading time, and byte sizes.",
    categoryId: "keyboard",
    componentId: "CharacterCounterTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Character Counter & Word Counter | Accurate Grapheme Count",
    metaDescription: "Live character, word, sentence, reading time, and UTF-8 byte counter.",
    metaKeywords: ["character counter", "word counter", "grapheme count"],
    sortOrder: 14,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-15",
    slug: "invisible-character-tool",
    name: "Invisible Character Cleaner",
    description: "Detect, copy, or strip zero-width spaces, word joiners, and hidden formatting characters.",
    categoryId: "unicode",
    componentId: "InvisibleCharacterTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Invisible Character Cleaner & Copier | Zero-Width Remover",
    metaDescription: "Detect, copy, and strip zero-width spaces, soft hyphens, and hidden Unicode characters.",
    metaKeywords: ["invisible character", "zero width space", "clean hidden characters"],
    sortOrder: 15,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-16",
    slug: "hash-generator",
    name: "Cryptographic Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, and HMAC signatures in real-time.",
    categoryId: "developer",
    componentId: "HashGeneratorTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Cryptographic Hash Generator | MD5, SHA-256, CRC32 & HMAC",
    metaDescription: "Fast, client-side cryptographic hashing for MD5, SHA-1, SHA-256, SHA-512, CRC32 and HMAC.",
    metaKeywords: ["hash generator", "md5 generator", "sha256 generator", "hmac"],
    sortOrder: 16,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-17",
    slug: "timestamp-converter",
    name: "Unix Timestamp & Epoch Converter",
    description: "Convert Unix epoch timestamps to human-readable dates across US, UK, Canada, and Australian timezones.",
    categoryId: "developer",
    componentId: "TimestampConverterTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Unix Timestamp & Epoch Converter | Live Clock & Timezones",
    metaDescription: "Bidirectional epoch converter with real-time live clock, relative offsets, and target market timezones.",
    metaKeywords: ["unix timestamp", "epoch converter", "timestamp to date"],
    sortOrder: 17,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-18",
    slug: "diff-checker",
    name: "Text Diff Checker",
    description: "Compare two code snippets or texts side-by-side or unified with additions and deletions stats.",
    categoryId: "developer",
    componentId: "DiffCheckerTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Text Diff Checker | Split & Unified Code Comparison",
    metaDescription: "Compare text and code side-by-side with line diffing, visual highlights, and patch export.",
    metaKeywords: ["diff checker", "text compare", "code diff"],
    sortOrder: 18,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-19",
    slug: "regex-tester",
    name: "Regex Tester & Match Visualizer",
    description: "Live regular expression tester with capture groups, substitution tool, presets, and cheat sheet.",
    categoryId: "developer",
    componentId: "RegexTesterTool",
    isFeatured: true,
    isPublished: true,
    metaTitle: "Regex Tester & Match Visualizer | Live JavaScript Regex",
    metaDescription: "Interactive regular expression tester with live highlight visualizer, flags, presets, and regex cheat sheet.",
    metaKeywords: ["regex tester", "regex visualizer", "regular expression online"],
    sortOrder: 19,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-20",
    slug: "key-code-tester",
    name: "JavaScript KeyCode Tester",
    description: "Press any key to inspect event.key, event.code, which, and modifier states in real-time.",
    categoryId: "keyboard",
    componentId: "SymbolCopyTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "JavaScript KeyCode Tester | event.key & event.code Inspector",
    metaDescription: "Interactive key code inspector showing keyboard event values for web developers.",
    metaKeywords: ["keycode tester", "event key", "event code"],
    sortOrder: 20,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-21",
    slug: "case-converter",
    name: "Text Case Converter",
    description: "Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    categoryId: "generators",
    componentId: "SymbolCopyTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "Text Case Converter | camelCase, snake_case & Title Case",
    metaDescription: "Convert strings between all common programmer and formatting text casing styles.",
    metaKeywords: ["case converter", "camelCase", "snake_case", "title case"],
    sortOrder: 21,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tool-22",
    slug: "uuid-generator",
    name: "UUID / GUID Generator",
    description: "Generate cryptographically secure RFC 4122 v4 UUIDs individually or in bulk.",
    categoryId: "developer",
    componentId: "SymbolCopyTool",
    isFeatured: false,
    isPublished: true,
    metaTitle: "UUID / GUID Generator | RFC 4122 v4 Bulk Generator",
    metaDescription: "Generate random cryptographically secure UUID version 4 strings online.",
    metaKeywords: ["uuid generator", "guid generator", "random uuid"],
    sortOrder: 22,
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_REDIRECTS: AdminRedirectRecord[] = [
  {
    id: "red-1",
    sourcePath: "/alt-codes",
    targetPath: "/tools/symbols/alt-code-finder",
    statusCode: 301,
    isActive: true,
    hitCount: 142,
    createdAt: new Date().toISOString(),
  },
  {
    id: "red-2",
    sourcePath: "/emojis",
    targetPath: "/tools/emoji/emoji-library",
    statusCode: 301,
    isActive: true,
    hitCount: 88,
    createdAt: new Date().toISOString(),
  },
  {
    id: "red-3",
    sourcePath: "/json-formatter",
    targetPath: "/tools/developer/json-formatter",
    statusCode: 301,
    isActive: true,
    hitCount: 205,
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_SETTINGS: AdminSiteSettingRecord[] = [
  {
    key: "SITE_NAME",
    value: "TypeKitTools",
    description: "Public brand name rendered in headers, titles, and copyright",
    isPublic: true,
    updatedAt: new Date().toISOString(),
  },
  {
    key: "ENABLE_ADS",
    value: "false",
    description: "Master switch for Google AdSense advertisement rendering",
    isPublic: true,
    updatedAt: new Date().toISOString(),
  },
  {
    key: "ADSENSE_CLIENT_ID",
    value: "",
    description: "Publisher client ID (e.g. ca-pub-XXXXXXXXXXXXXXXX)",
    isPublic: false,
    updatedAt: new Date().toISOString(),
  },
  {
    key: "GA_MEASUREMENT_ID",
    value: "",
    description: "Google Analytics 4 Measurement ID (G-XXXXXXXXXX)",
    isPublic: false,
    updatedAt: new Date().toISOString(),
  },
  {
    key: "TARGET_LOCALES",
    value: "en-US,en-GB,en-CA,en-AU",
    description: "Primary geographic target markets",
    isPublic: true,
    updatedAt: new Date().toISOString(),
  },
  {
    key: "MAINTENANCE_MODE",
    value: "false",
    description: "Display maintenance banner across public pages",
    isPublic: true,
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_CMS_ARTICLES: AdminCmsArticle[] = [
  {
    id: "art-1",
    slug: "how-cryptographic-hashes-work",
    title: "How Cryptographic Hashes Work: MD5 vs SHA-256 Security Guide",
    subtitle: "A developer guide to hash functions, collision resistance, and password salting",
    category: "Developer Utilities",
    summary:
      "Understand how cryptographic hashing algorithms transform arbitrary data into fixed-size digests. Learn why MD5 is obsolete for passwords and why SHA-256 and Argon2 are industry standards.",
    contentMarkdown: `## What Is a Cryptographic Hash Function?

A cryptographic hash function is a mathematical algorithm that maps data of arbitrary size to a bit array of a fixed size (called the "hash digest" or "checksum"). It is designed to be a one-way function—a function that is practically infeasible to invert or reverse.

### Five Fundamental Properties of Secure Hashes

1. **Deterministic**: The exact same input message will always produce the identical hash digest output.
2. **Quick Computation**: The algorithm can evaluate the hash value quickly for any given data.
3. **Pre-image Resistance (One-Way)**: Given a hash output *h*, it is computationally infeasible to find any original message *m* such that *hash(m) = h*.
4. **Small Changes Change the Output (Avalanche Effect)**: Changing even a single bit in the input message completely randomizes the resulting hash output.
5. **Collision Resistance**: It is computationally infeasible to find two completely different input messages that produce the exact same hash output.

### MD5 vs SHA-256: Which Should You Use?

- **MD5 (Message Digest 5)**: Created in 1991 by Ronald Rivest. It produces a 128-bit (32 hexadecimal character) digest. In 2004, researchers demonstrated practical hash collisions. While MD5 remains widely used for rapid file checksum verification and non-security cache keys, it must **never** be used for password hashing, digital signatures, or SSL certificates.
- **SHA-256 (Secure Hash Algorithm 2)**: Developed by the National Security Agency (NSA) as part of the SHA-2 family. It outputs a 256-bit (64 hexadecimal character) digest and is mathematically robust against known collision attacks. SHA-256 powers Bitcoin proof-of-work, TLS 1.3 handshakes, and Git repository signatures.`,
    seoTitle: "How Cryptographic Hashes Work: MD5 vs SHA-256 Security Guide",
    seoDescription:
      "Comprehensive developer guide explaining cryptographic hashing, the avalanche effect, MD5 collision vulnerabilities, and SHA-256 standards.",
    canonicalUrl: "https://typekittools.com/articles/how-cryptographic-hashes-work",
    isIndexable: true,
    isPublished: true,
    publishedAt: new Date().toISOString(),
    readingTime: "5 min read",
    faqs: [
      {
        question: "Can an MD5 or SHA-256 hash be decrypted?",
        answer:
          "No. Cryptographic hashes are not encryption algorithms; they do not possess a decryption key. They are mathematical one-way digests. The only way to find the original input is brute-force searching or precomputed rainbow tables.",
      },
      {
        question: "What is an HMAC?",
        answer:
          "HMAC (Hash-based Message Authentication Code) combines a cryptographic hash function with a secret shared cryptographic key to verify both data integrity and authentication.",
      },
    ],
    internalLinks: [
      { anchorText: "Online Hash Generator", targetUrl: "/tools/developer/hash-generator" },
      { anchorText: "Base64 Encoder Tool", targetUrl: "/tools/developer/base64" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "art-2",
    slug: "unix-epoch-time-and-dst",
    title: "Unix Epoch Time: How Timestamps and Daylight Saving Time Work",
    subtitle: "Understanding seconds since January 1, 1970, UTC offsets, and the Year 2038 Problem",
    category: "Developer Utilities",
    summary:
      "Unix time represents the total seconds elapsed since January 1, 1970 00:00:00 UTC. Discover how it solves timezone chaos and how to convert it across world cities.",
    contentMarkdown: `## What Is Unix Epoch Time?

Unix time (also known as POSIX time or Epoch time) is an unambiguous system for tracking a point in time. It is defined as the number of non-leap seconds that have elapsed since the **Unix Epoch**: midnight Coordinated Universal Time (00:00:00 UTC) on **January 1, 1970**.

Because Unix timestamps are stored as a single integer, computers can compare, sort, and subtract dates across any international boundary without dealing with local daylight saving time rules or timezone shifts.

### The Year 2038 Problem (Y2038)

Systems that store Unix timestamps as a signed 32-bit integer will overflow at **03:14:07 UTC on Tuesday, 19 January 2038** (when the count exceeds 2,147,483,647). After this second, the integer wraps around to -2,147,483,648, representing the year 1901.

Modern 64-bit operating systems and database architectures (such as PostgreSQL and 64-bit Node.js) store timestamps as signed 64-bit integers, pushing the expiration date approximately 292 billion years into the future.`,
    seoTitle: "Unix Epoch Time: How Timestamps and Daylight Saving Work",
    seoDescription:
      "A developer guide to Unix timestamps, epoch time calculation, the Year 2038 problem, and converting timestamps across timezones.",
    canonicalUrl: "https://typekittools.com/articles/unix-epoch-time-and-dst",
    isIndexable: true,
    isPublished: true,
    publishedAt: new Date().toISOString(),
    readingTime: "4 min read",
    faqs: [
      {
        question: "Does Unix time count leap seconds?",
        answer:
          "Unix time ignores leap seconds. Each day is treated as having exactly 86,400 seconds. When UTC introduces a leap second, the clock repeats or steps back to stay synchronized.",
      },
      {
        question: "How do I convert a Unix timestamp to human-readable date in JavaScript?",
        answer:
          "In JavaScript, pass the timestamp multiplied by 1000 into the Date constructor: new Date(timestamp * 1000).toLocaleString().",
      },
    ],
    internalLinks: [
      { anchorText: "Unix Timestamp Converter", targetUrl: "/tools/developer/timestamp-converter" },
      { anchorText: "Diff Checker Tool", targetUrl: "/tools/developer/diff-checker" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "art-3",
    slug: "zero-width-spaces-in-code",
    title: "Hidden Zero-Width Spaces: How Invisible Characters Break Code and Web Forms",
    subtitle: "Detecting and cleaning U+200B, U+FEFF, and invisible Unicode whitespace",
    category: "Unicode Utilities",
    summary:
      "Zero-width spaces are non-printing characters that cause mysterious syntax errors in programming languages and copy-paste failures. Learn how to clean them.",
    contentMarkdown: `## What Are Invisible Zero-Width Characters?

Unicode includes several invisible formatting characters that occupy zero visual pixels of horizontal space on a computer screen. While designed for specific linguistic typography and word-breaking algorithms, they frequently cause baffling bugs when accidentally pasted into source code, API keys, or web forms.

### Common Invisible Unicode Characters

- **U+200B (Zero-Width Space)**: Used in non-spaced languages (like Thai or Khmer) to signal valid line break positions without displaying a physical space.
- **U+200C (Zero-Width Non-Joiner, ZWNJ)**: Prevents two adjacent Arabic, Persian, or Indic letters from forming a cursive ligature.
- **U+200D (Zero-Width Joiner, ZWJ)**: Glues characters together; heavily used by emoji sequences (e.g. Woman Technologist 👩‍💻 is 👩 + ZWJ + 💻).
- **U+FEFF (Zero-Width No-Break Space / Byte Order Mark)**: Placed at the very start of text files to indicate UTF-16 byte order. When embedded inside UTF-8 strings, it acts as an invisible phantom character.

### Why They Break Code

Compilers and interpreters (such as Python, Node.js, and Java) treat invisible characters as illegal unrecognized identifiers rather than standard ASCII whitespace. An invisible character pasted into an API key, database query, or JSON payload can result in failed authentication or corrupt checksums.`,
    seoTitle: "Hidden Zero-Width Spaces: How Invisible Characters Break Code",
    seoDescription:
      "Learn what invisible zero-width spaces (U+200B, U+FEFF) are, why they cause syntax errors, and how to detect and clean them.",
    canonicalUrl: "https://typekittools.com/articles/zero-width-spaces-in-code",
    isIndexable: true,
    isPublished: true,
    publishedAt: new Date().toISOString(),
    readingTime: "4 min read",
    faqs: [
      {
        question: "How can I tell if text has zero-width characters?",
        answer:
          "Use the TypeKitTools Invisible Character Cleaner or Character Inspector tool. It analyzes strings at the raw codepoint level and highlights all non-printing characters.",
      },
    ],
    internalLinks: [
      { anchorText: "Invisible Character Cleaner", targetUrl: "/tools/unicode/invisible-character-tool" },
      { anchorText: "Character Inspector", targetUrl: "/tools/unicode/character-inspector" },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_AD_PLACEMENTS: AdminAdPlacementRecord[] = [
  {
    id: "ad-placement-1",
    zoneKey: "HEADER_BELOW_NAV",
    name: "Header Leaderboard (Below Navigation)",
    isEnabled: true,
    eligiblePageTypes: ["tools", "articles", "symbols", "guides", "home"],
    deviceVisibility: { desktop: true, tablet: true, mobile: true },
    adClientId: "ca-pub-0000000000000000",
    adSlotId: "1234567890",
    format: "horizontal",
    minHeight: 90,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ad-placement-2",
    zoneKey: "TOOL_BELOW_MAIN",
    name: "Tool Bottom Placement (Below Utility Controls)",
    isEnabled: true,
    eligiblePageTypes: ["tools"],
    deviceVisibility: { desktop: true, tablet: true, mobile: true },
    adClientId: "ca-pub-0000000000000000",
    adSlotId: "2345678901",
    format: "rectangle",
    minHeight: 250,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ad-placement-3",
    zoneKey: "ARTICLE_INLINE",
    name: "Article In-Content Placement (Editorial Flow)",
    isEnabled: true,
    eligiblePageTypes: ["articles", "guides"],
    deviceVisibility: { desktop: true, tablet: true, mobile: false },
    adClientId: "ca-pub-0000000000000000",
    adSlotId: "3456789012",
    format: "rectangle",
    minHeight: 250,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ad-placement-4",
    zoneKey: "FOOTER_ABOVE",
    name: "Footer Placement (Above Platform Footer)",
    isEnabled: true,
    eligiblePageTypes: ["tools", "articles", "symbols", "guides", "home"],
    deviceVisibility: { desktop: true, tablet: true, mobile: true },
    adClientId: "ca-pub-0000000000000000",
    adSlotId: "4567890123",
    format: "horizontal",
    minHeight: 90,
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_CUSTOM_SYMBOLS: AdminCustomSymbolRecord[] = [
  {
    id: "sym-1",
    character: "€",
    name: "Euro Sign",
    codepoint: "U+20AC",
    category: "currency",
    keywords: ["euro", "money", "europe", "eur"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-2",
    character: "§",
    name: "Section Sign",
    codepoint: "U+00A7",
    category: "legal",
    keywords: ["section", "paragraph", "legal", "law"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-3",
    character: "°",
    name: "Degree Sign",
    codepoint: "U+00B0",
    category: "math",
    keywords: ["degree", "temperature", "angle", "celsius"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-4",
    character: "©",
    name: "Copyright Sign",
    codepoint: "U+00A9",
    category: "legal",
    keywords: ["copyright", "rights", "reserved", "c"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-5",
    character: "✓",
    name: "Check Mark",
    codepoint: "U+2713",
    category: "punctuation",
    keywords: ["check", "tick", "yes", "correct", "done"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-6",
    character: "→",
    name: "Rightwards Arrow",
    codepoint: "U+2192",
    category: "arrows",
    keywords: ["arrow", "right", "next", "direction"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sym-7",
    character: "∞",
    name: "Infinity",
    codepoint: "U+221E",
    category: "math",
    keywords: ["infinity", "forever", "math", "loop"],
    isPublished: true,
    source: "manual",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const INITIAL_INTERNAL_LINKS: AdminInternalLinkRecord[] = [
  {
    id: "link-1",
    anchorText: "Symbol Copy & Paste Library",
    targetUrl: "/tools/symbols/symbol-copy",
    category: "tools",
    description: "Instant 1-click clipboard copy for currency, arrows, and math symbols",
    clickCount: 1420,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-2",
    anchorText: "Unicode Character Search",
    targetUrl: "/tools/unicode/unicode-search",
    category: "tools",
    description: "Search 150,000+ characters by official name, hex, decimal or glyph",
    clickCount: 980,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-3",
    anchorText: "Alt Code Finder",
    targetUrl: "/tools/symbols/alt-code-finder",
    category: "tools",
    description: "Numeric keypad Alt codes for Windows and Option-key shortcuts for Mac",
    clickCount: 840,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-4",
    anchorText: "Cryptographic Hash Generator",
    targetUrl: "/tools/developer/hash-generator",
    category: "tools",
    description: "Client-side MD5, SHA-256, SHA-512, CRC32 and HMAC hashing",
    clickCount: 610,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-5",
    anchorText: "Invisible Character Cleaner",
    targetUrl: "/tools/unicode/invisible-character-tool",
    category: "tools",
    description: "Detect, inspect and strip zero-width spaces and hidden unicode characters",
    clickCount: 490,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "link-6",
    anchorText: "Windows Alt Codes Master List",
    targetUrl: "/guides/alt-codes-list",
    category: "guides",
    description: "Comprehensive guide to typing special characters using numeric keypad",
    clickCount: 730,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

class AdminService {
  private state: AdminStoreState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): AdminStoreState {
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        let modified = false;

        if (!parsed.cmsArticles) {
          parsed.cmsArticles = INITIAL_CMS_ARTICLES;
          modified = true;
        }
        if (!parsed.adPlacements) {
          parsed.adPlacements = INITIAL_AD_PLACEMENTS;
          modified = true;
        }
        if (!parsed.customSymbols) {
          parsed.customSymbols = INITIAL_CUSTOM_SYMBOLS;
          modified = true;
        }
        if (!parsed.internalLinks) {
          parsed.internalLinks = INITIAL_INTERNAL_LINKS;
          modified = true;
        }
        if (parsed.users && !parsed.users.some((u: any) => u.role === "editor")) {
          parsed.users.push({
            id: "usr-editor-1",
            email: "editor@typekittools.com",
            name: "Senior Content Editor",
            passwordHash: hashPassword("EditorPassword2026!"),
            role: "editor",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          modified = true;
        }
        if (parsed.users && !parsed.users.some((u: any) => u.role === "author")) {
          parsed.users.push({
            id: "usr-author-1",
            email: "author@typekittools.com",
            name: "Technical Author",
            passwordHash: hashPassword("AuthorPassword2026!"),
            role: "author",
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          modified = true;
        }
        if (modified) {
          this.saveState(parsed);
        }
        return parsed;
      }
    } catch {
      // Fallback to fresh defaults
    }

    const defaultState: AdminStoreState = {
      users: [
        {
          id: "usr-admin-1",
          email: "admin@typekittools.com",
          name: "System Administrator",
          passwordHash: DEFAULT_ADMIN_HASH,
          role: "super_admin",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "usr-editor-1",
          email: "editor@typekittools.com",
          name: "Senior Content Editor",
          passwordHash: hashPassword("EditorPassword2026!"),
          role: "editor",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "usr-author-1",
          email: "author@typekittools.com",
          name: "Technical Author",
          passwordHash: hashPassword("AuthorPassword2026!"),
          role: "author",
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      tools: INITIAL_TOOLS,
      categories: INITIAL_CATEGORIES,
      redirects: INITIAL_REDIRECTS,
      settings: INITIAL_SETTINGS,
      cmsArticles: INITIAL_CMS_ARTICLES,
      adPlacements: INITIAL_AD_PLACEMENTS,
      customSymbols: INITIAL_CUSTOM_SYMBOLS,
      internalLinks: INITIAL_INTERNAL_LINKS,
      auditLogs: [
        {
          id: "audit-init-1",
          userId: "usr-admin-1",
          userEmail: "admin@typekittools.com",
          action: "SYSTEM_INITIALIZED",
          entityType: "SYSTEM",
          entityId: "system",
          payload: { version: "1.0.0", toolsSeeded: INITIAL_TOOLS.length },
          ipAddress: "127.0.0.1",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    this.saveState(defaultState);
    return defaultState;
  }

  private saveState(state: AdminStoreState): void {
    try {
      const dir = path.dirname(STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORE_PATH, JSON.stringify(state, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to save admin store state:", err);
    }
  }

  // --- Authentication ---
  public async authenticate(
    email: string,
    plainPassword: string
  ): Promise<{ user: AdminSessionPayload | null; error?: string }> {
    const user = this.state.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive
    );

    if (!user) {
      return { user: null, error: "Invalid email or password." };
    }

    const isValid = verifyPassword(plainPassword, user.passwordHash);
    if (!isValid) {
      return { user: null, error: "Invalid email or password." };
    }

    const sessionPayload: AdminSessionPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
    };

    return { user: sessionPayload };
  }

  // --- Overview KPIs ---
  public getOverview() {
    const publishedTools = this.state.tools.filter((t) => t.isPublished).length;
    const draftTools = this.state.tools.filter((t) => !t.isPublished).length;
    const publishedArticles = (this.state.cmsArticles || []).filter((a) => a.isPublished).length;
    const draftArticles = (this.state.cmsArticles || []).filter((a) => !a.isPublished).length;

    // Total public indexable pages: tools + articles + category hubs + symbol categories + core hubs + guides
    const publishedPages = publishedTools + publishedArticles + this.state.categories.length + 8 + 4;
    const draftPages = draftTools + draftArticles;

    return {
      kpi: {
        totalTools: this.state.tools.length,
        publishedTools,
        draftTools,
        featuredTools: this.state.tools.filter((t) => t.isFeatured).length,
        totalCategories: this.state.categories.length,
        publishedPages,
        draftPages,
        activeRedirects: this.state.redirects.filter((r) => r.isActive).length,
        totalRedirectHits: this.state.redirects.reduce((acc, r) => acc + r.hitCount, 0),
        totalAuditLogs: this.state.auditLogs.length,
        totalCmsArticles: (this.state.cmsArticles || []).length,
        publishedArticles,
        totalSymbols: (this.state.customSymbols || []).length,
        totalLinks: (this.state.internalLinks || []).length,
        totalAdPlacements: (this.state.adPlacements || []).length,
        activeAdPlacements: (this.state.adPlacements || []).filter((p) => p.isEnabled).length,
        totalUsers: this.state.users.length,
      },
      recentChanges: this.state.auditLogs.slice(-10).reverse(),
      recentLogs: this.state.auditLogs.slice(-10).reverse(),
      categories: this.state.categories.map((c) => ({
        ...c,
        toolCount: this.state.tools.filter((t) => t.categoryId === c.slug).length,
      })),
    };
  }

  // --- Tools Management ---
  public getTools(): AdminToolRecord[] {
    return [...this.state.tools];
  }

  public updateTool(
    id: string,
    updates: Partial<AdminToolRecord>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminToolRecord | null {
    const index = this.state.tools.findIndex((t) => t.id === id || t.slug === id);
    if (index === -1) return null;

    const previous = this.state.tools[index];
    const updated: AdminToolRecord = {
      ...previous,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.state.tools[index] = updated;
    this.logAudit(
      adminUser,
      "UPDATE_TOOL",
      "TOOL",
      updated.id,
      { before: previous, after: updated },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  // --- Categories Management ---
  public getCategories(): AdminCategoryRecord[] {
    return this.state.categories.map((c) => ({
      ...c,
      toolCount: this.state.tools.filter((t) => t.categoryId === c.slug).length,
    }));
  }

  public updateCategory(
    id: string,
    updates: Partial<AdminCategoryRecord>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminCategoryRecord | null {
    const index = this.state.categories.findIndex((c) => c.id === id || c.slug === id);
    if (index === -1) return null;

    const previous = this.state.categories[index];
    const updated = { ...previous, ...updates };
    this.state.categories[index] = updated;

    this.logAudit(
      adminUser,
      "UPDATE_CATEGORY",
      "CATEGORY",
      updated.id,
      { before: previous, after: updated },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  // --- Redirects Management ---
  public getRedirects(): AdminRedirectRecord[] {
    return [...this.state.redirects];
  }

  public createRedirect(
    data: { sourcePath: string; targetPath: string; statusCode?: 301 | 308 },
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminRedirectRecord {
    const newRecord: AdminRedirectRecord = {
      id: `red-${Date.now()}`,
      sourcePath: data.sourcePath.startsWith("/") ? data.sourcePath : `/${data.sourcePath}`,
      targetPath: data.targetPath.startsWith("/") ? data.targetPath : `/${data.targetPath}`,
      statusCode: data.statusCode || 301,
      isActive: true,
      hitCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.state.redirects.unshift(newRecord);
    this.logAudit(adminUser, "CREATE_REDIRECT", "REDIRECT", newRecord.id, newRecord, ip);
    this.saveState(this.state);
    return newRecord;
  }

  public toggleRedirect(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminRedirectRecord | null {
    const r = this.state.redirects.find((rec) => rec.id === id);
    if (!r) return null;

    r.isActive = !r.isActive;
    this.logAudit(
      adminUser,
      r.isActive ? "ACTIVATE_REDIRECT" : "DEACTIVATE_REDIRECT",
      "REDIRECT",
      r.id,
      { isActive: r.isActive },
      ip
    );
    this.saveState(this.state);
    return r;
  }

  public deleteRedirect(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): boolean {
    const initialLen = this.state.redirects.length;
    this.state.redirects = this.state.redirects.filter((r) => r.id !== id);
    if (this.state.redirects.length !== initialLen) {
      this.logAudit(adminUser, "DELETE_REDIRECT", "REDIRECT", id, {}, ip);
      this.saveState(this.state);
      return true;
    }
    return false;
  }

  // --- CMS Articles & SEO Pages Management ---
  public getCmsArticles(includeUnpublished = true): AdminCmsArticle[] {
    const articles = this.state.cmsArticles || [];
    if (includeUnpublished) {
      return [...articles];
    }
    return articles.filter((a) => a.isPublished);
  }

  public getEligiblePublishedArticles(): AdminCmsArticle[] {
    const now = new Date();
    return (this.state.cmsArticles || []).filter(
      (a) => a.isPublished && a.isIndexable !== false && new Date(a.publishedAt) <= now
    );
  }

  public getCmsArticleBySlug(slug: string): AdminCmsArticle | null {
    const cleanSlug = slug.toLowerCase().trim();
    return (
      (this.state.cmsArticles || []).find((a) => a.slug.toLowerCase() === cleanSlug) || null
    );
  }

  public createCmsArticle(
    data: Omit<AdminCmsArticle, "id" | "createdAt" | "updatedAt">,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminCmsArticle {
    const cleanSlug = data.slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newArticle: AdminCmsArticle = {
      ...data,
      id: `art-${Date.now()}`,
      slug: cleanSlug,
      isIndexable: data.isIndexable !== false,
      isPublished: data.isPublished !== false,
      publishedAt: data.publishedAt || new Date().toISOString(),
      readingTime: data.readingTime || "4 min read",
      faqs: data.faqs || [],
      internalLinks: data.internalLinks || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!this.state.cmsArticles) {
      this.state.cmsArticles = [];
    }

    this.state.cmsArticles.unshift(newArticle);
    this.logAudit(adminUser, "CREATE_ARTICLE", "CMS_ARTICLE", newArticle.id, newArticle, ip);
    this.saveState(this.state);
    return newArticle;
  }

  public updateCmsArticle(
    id: string,
    updates: Partial<AdminCmsArticle>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminCmsArticle | null {
    if (!this.state.cmsArticles) this.state.cmsArticles = [];
    const index = this.state.cmsArticles.findIndex((a) => a.id === id || a.slug === id);
    if (index === -1) return null;

    const previous = this.state.cmsArticles[index];
    const updated: AdminCmsArticle = {
      ...previous,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.state.cmsArticles[index] = updated;
    this.logAudit(
      adminUser,
      "UPDATE_ARTICLE",
      "CMS_ARTICLE",
      updated.id,
      { before: previous, after: updated },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  public deleteCmsArticle(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): boolean {
    if (!this.state.cmsArticles) return false;
    const initialLen = this.state.cmsArticles.length;
    this.state.cmsArticles = this.state.cmsArticles.filter((a) => a.id !== id && a.slug !== id);
    if (this.state.cmsArticles.length !== initialLen) {
      this.logAudit(adminUser, "DELETE_ARTICLE", "CMS_ARTICLE", id, {}, ip);
      this.saveState(this.state);
      return true;
    }
    return false;
  }

  // --- Site Settings ---
  public getSettings(): AdminSiteSettingRecord[] {
    return [...this.state.settings];
  }

  public updateSetting(
    key: string,
    value: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminSiteSettingRecord | null {
    const setting = this.state.settings.find((s) => s.key === key);
    if (!setting) return null;

    const previousValue = setting.value;
    setting.value = value;
    setting.updatedAt = new Date().toISOString();

    this.logAudit(
      adminUser,
      "UPDATE_SETTING",
      "SITE_SETTING",
      key,
      { key, before: previousValue, after: value },
      ip
    );
    this.saveState(this.state);
    return setting;
  }

  // --- User & Role Management (Super Admin Guarded) ---
  public getUsers(): Omit<AdminUserRecord, "passwordHash">[] {
    return this.state.users.map(({ passwordHash, ...safe }) => safe);
  }

  public createUser(
    data: {
      email: string;
      name: string;
      password: string;
      role: AdminSessionPayload["role"];
    },
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): Omit<AdminUserRecord, "passwordHash"> {
    if (adminUser.role !== "super_admin") {
      throw new Error("Only Super Administrators can create users.");
    }

    const existing = this.state.users.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) {
      throw new Error(`User with email '${data.email}' already exists.`);
    }

    const newUser: AdminUserRecord = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: data.email.trim().toLowerCase(),
      name: data.name.trim(),
      passwordHash: hashPassword(data.password),
      role: data.role,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.users.push(newUser);
    this.logAudit(
      adminUser,
      "USER_CREATED",
      "USER",
      newUser.id,
      { email: newUser.email, role: newUser.role },
      ip
    );
    this.saveState(this.state);

    const { passwordHash, ...safeUser } = newUser;
    return safeUser;
  }

  public updateUser(
    id: string,
    updates: {
      name?: string;
      email?: string;
      role?: AdminSessionPayload["role"];
      password?: string;
      isActive?: boolean;
    },
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): Omit<AdminUserRecord, "passwordHash"> | null {
    if (adminUser.role !== "super_admin") {
      throw new Error("Only Super Administrators can modify users.");
    }

    const index = this.state.users.findIndex((u) => u.id === id);
    if (index === -1) return null;

    const current = this.state.users[index];
    const updated: AdminUserRecord = {
      ...current,
      name: updates.name ? updates.name.trim() : current.name,
      email: updates.email ? updates.email.trim().toLowerCase() : current.email,
      role: updates.role || current.role,
      isActive: updates.isActive !== undefined ? updates.isActive : current.isActive,
      passwordHash: updates.password ? hashPassword(updates.password) : current.passwordHash,
      updatedAt: new Date().toISOString(),
    };

    this.state.users[index] = updated;
    this.logAudit(
      adminUser,
      "USER_UPDATED",
      "USER",
      id,
      { role: updated.role, isActive: updated.isActive },
      ip
    );
    this.saveState(this.state);

    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }

  public deleteUser(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): boolean {
    if (adminUser.role !== "super_admin") {
      throw new Error("Only Super Administrators can delete users.");
    }
    if (adminUser.userId === id) {
      throw new Error("Cannot delete your own administrator account.");
    }

    const index = this.state.users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    const removed = this.state.users.splice(index, 1)[0];
    this.logAudit(
      adminUser,
      "USER_DELETED",
      "USER",
      id,
      { email: removed.email, role: removed.role },
      ip
    );
    this.saveState(this.state);
    return true;
  }

  // --- Advertisement Placement Management ---
  public getAdPlacements(): AdminAdPlacementRecord[] {
    return [...(this.state.adPlacements || [])];
  }

  public getAdPlacement(zoneKey: string): AdminAdPlacementRecord | null {
    return (this.state.adPlacements || []).find((p) => p.zoneKey === zoneKey) || null;
  }

  public updateAdPlacement(
    zoneKey: string,
    updates: Partial<AdminAdPlacementRecord>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminAdPlacementRecord | null {
    const list = this.state.adPlacements || [];
    const index = list.findIndex((p) => p.zoneKey === zoneKey);
    if (index === -1) return null;

    const current = list[index];
    const updated: AdminAdPlacementRecord = {
      ...current,
      ...updates,
      zoneKey: current.zoneKey,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    this.state.adPlacements = list;
    this.logAudit(
      adminUser,
      "AD_PLACEMENT_UPDATED",
      "AD_PLACEMENT",
      zoneKey,
      { isEnabled: updated.isEnabled, eligiblePageTypes: updated.eligiblePageTypes, deviceVisibility: updated.deviceVisibility },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  public toggleAdPlacement(
    zoneKey: string,
    isEnabled: boolean,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminAdPlacementRecord | null {
    return this.updateAdPlacement(zoneKey, { isEnabled }, adminUser, ip);
  }

  // --- Symbol Management & Importer ---
  public getCustomSymbols(category?: string): AdminCustomSymbolRecord[] {
    const symbols = this.state.customSymbols || [];
    if (!category || category === "all") return symbols;
    return symbols.filter((s) => s.category.toLowerCase() === category.toLowerCase());
  }

  public createCustomSymbol(
    data: {
      character: string;
      name: string;
      codepoint: string;
      category: string;
      keywords: string[];
      isPublished?: boolean;
    },
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminCustomSymbolRecord {
    const list = this.state.customSymbols || [];
    const newSymbol: AdminCustomSymbolRecord = {
      id: `sym-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      character: data.character,
      name: data.name,
      codepoint: data.codepoint.startsWith("U+") ? data.codepoint : `U+${data.codepoint}`,
      category: data.category,
      keywords: data.keywords || [],
      isPublished: data.isPublished !== false,
      source: "manual",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newSymbol);
    this.state.customSymbols = list;
    this.logAudit(
      adminUser,
      "SYMBOL_CREATED",
      "SYMBOL",
      newSymbol.id,
      { name: newSymbol.name, character: newSymbol.character, codepoint: newSymbol.codepoint },
      ip
    );
    this.saveState(this.state);
    return newSymbol;
  }

  public updateCustomSymbol(
    id: string,
    updates: Partial<AdminCustomSymbolRecord>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminCustomSymbolRecord | null {
    const list = this.state.customSymbols || [];
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const updated: AdminCustomSymbolRecord = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    this.state.customSymbols = list;
    this.logAudit(
      adminUser,
      "SYMBOL_UPDATED",
      "SYMBOL",
      id,
      { name: updated.name, isPublished: updated.isPublished },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  public deleteCustomSymbol(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): boolean {
    const list = this.state.customSymbols || [];
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return false;

    const removed = list.splice(index, 1)[0];
    this.state.customSymbols = list;
    this.logAudit(
      adminUser,
      "SYMBOL_DELETED",
      "SYMBOL",
      id,
      { name: removed.name, character: removed.character },
      ip
    );
    this.saveState(this.state);
    return true;
  }

  public importSymbolsFromJson(
    rawJson: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): { imported: number; skipped: number; errors: string[] } {
    let parsed: any[];
    try {
      parsed = JSON.parse(rawJson);
      if (!Array.isArray(parsed)) {
        return { imported: 0, skipped: 0, errors: ["Root element must be a JSON array of symbol objects."] };
      }
    } catch (e: any) {
      return { imported: 0, skipped: 0, errors: [`JSON Parse Error: ${e.message}`] };
    }

    const list = this.state.customSymbols || [];
    const existingCodepoints = new Set(list.map((s) => s.codepoint.toUpperCase()));
    let imported = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (let i = 0; i < parsed.length; i++) {
      const item = parsed[i];
      if (!item.character || !item.name) {
        errors.push(`Item #${i + 1} skipped: character and name are required.`);
        skipped++;
        continue;
      }

      const codepoint = (item.codepoint || `U+${item.character.codePointAt(0).toString(16).toUpperCase()}`).trim();
      if (existingCodepoints.has(codepoint.toUpperCase())) {
        skipped++;
        continue;
      }

      const newSymbol: AdminCustomSymbolRecord = {
        id: `sym-imp-${Date.now()}-${i}`,
        character: item.character,
        name: item.name,
        codepoint: codepoint.startsWith("U+") ? codepoint : `U+${codepoint}`,
        category: item.category || "custom",
        keywords: Array.isArray(item.keywords) ? item.keywords : [],
        isPublished: true,
        source: "imported",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      list.push(newSymbol);
      existingCodepoints.add(codepoint.toUpperCase());
      imported++;
    }

    this.state.customSymbols = list;
    this.logAudit(
      adminUser,
      "SYMBOLS_BULK_IMPORTED",
      "SYMBOL",
      "bulk-import",
      { importedCount: imported, skippedCount: skipped, errorCount: errors.length },
      ip
    );
    this.saveState(this.state);
    return { imported, skipped, errors };
  }

  // --- Internal Link Manager ---
  public getInternalLinks(): AdminInternalLinkRecord[] {
    return [...(this.state.internalLinks || [])];
  }

  public createInternalLink(
    data: {
      anchorText: string;
      targetUrl: string;
      category: string;
      description?: string;
    },
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminInternalLinkRecord {
    const list = this.state.internalLinks || [];
    const newLink: AdminInternalLinkRecord = {
      id: `link-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      anchorText: data.anchorText.trim(),
      targetUrl: data.targetUrl.trim(),
      category: data.category.trim(),
      description: data.description?.trim(),
      clickCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newLink);
    this.state.internalLinks = list;
    this.logAudit(
      adminUser,
      "INTERNAL_LINK_CREATED",
      "INTERNAL_LINK",
      newLink.id,
      { anchorText: newLink.anchorText, targetUrl: newLink.targetUrl },
      ip
    );
    this.saveState(this.state);
    return newLink;
  }

  public updateInternalLink(
    id: string,
    updates: Partial<AdminInternalLinkRecord>,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): AdminInternalLinkRecord | null {
    const list = this.state.internalLinks || [];
    const index = list.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const updated: AdminInternalLinkRecord = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    this.state.internalLinks = list;
    this.logAudit(
      adminUser,
      "INTERNAL_LINK_UPDATED",
      "INTERNAL_LINK",
      id,
      { anchorText: updated.anchorText, isActive: updated.isActive },
      ip
    );
    this.saveState(this.state);
    return updated;
  }

  public deleteInternalLink(
    id: string,
    adminUser: AdminSessionPayload,
    ip = "127.0.0.1"
  ): boolean {
    const list = this.state.internalLinks || [];
    const index = list.findIndex((l) => l.id === id);
    if (index === -1) return false;

    const removed = list.splice(index, 1)[0];
    this.state.internalLinks = list;
    this.logAudit(
      adminUser,
      "INTERNAL_LINK_DELETED",
      "INTERNAL_LINK",
      id,
      { anchorText: removed.anchorText, targetUrl: removed.targetUrl },
      ip
    );
    this.saveState(this.state);
    return true;
  }

  // --- Audit Logs ---
  public getAuditLogs(limit = 100): AdminAuditRecord[] {
    return this.state.auditLogs.slice(-limit).reverse();
  }

  public logAudit(
    adminUser: AdminSessionPayload | { userId: string; email: string },
    action: string,
    entityType: string,
    entityId: string,
    payload: any,
    ip = "127.0.0.1"
  ): void {
    const entry: AdminAuditRecord = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: adminUser.userId,
      userEmail: adminUser.email,
      action,
      entityType,
      entityId,
      payload,
      ipAddress: ip,
      createdAt: new Date().toISOString(),
    };

    this.state.auditLogs.push(entry);
    // Keep max 500 records in file store
    if (this.state.auditLogs.length > 500) {
      this.state.auditLogs = this.state.auditLogs.slice(-500);
    }
    this.saveState(this.state);
  }
}

// Singleton instance
export const adminService = new AdminService();
