import { ToolDefinition } from "../types";
import { toolRegistry } from "../registry";

export const initialTools: ToolDefinition[] = [
  // 1. Symbol Copy & Paste Library
  {
    id: "symbol-copy",
    slug: "symbol-copy",
    name: "Symbol Copy & Paste Library",
    shortDescription:
      "Explore, search, and 1-click copy thousands of special characters, currency signs, arrows, math symbols, and stars into your personal collection tray.",
    category: "symbols",
    componentId: "SymbolCopyTool",
    iconName: "Sparkles",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Symbol Copy & Paste Library - Special Characters & Tray",
      metaTitle: "Symbol Copy & Paste Library - Copy Special Characters | TypeKitTools",
      metaDescription:
        "Fast 1-click symbol copy and paste library. Copy copyright glyphs (©), hearts (♥), checkmarks (✓), degree signs (°), arrows, and stars into a custom tray.",
      keywords: [
        "symbol copy paste",
        "copyright glyph",
        "c symbol",
        "copyright logo copy and paste",
        "c symbol copy and paste",
        "keyboard symbols",
        "keyboard copy paste",
        "heart in keyboard shortcut",
        "keyboard shortcut for heart",
        "keyboard shortcut for check",
        "alt code for check mark",
        "bullet shortcut keyboard",
        "copy right copy paste",
        "copy paste copyright symbol",
        "all rights reserved copy and paste",
      ],
      faq: [
        {
          question: "How do I copy multiple symbols at once?",
          answer: "Click '+Tray' on any symbol to add it to your copy tray, then click 'Copy All in Tray' to copy the entire string at once.",
        },
        {
          question: "How do I copy the copyright glyph (©) or trademark (™)?",
          answer: "Click the '©' or '™' card to copy it instantly to your clipboard, or use Windows Alt code Alt+0169 / Mac shortcut Option+G.",
        },
        {
          question: "How do I copy hearts (♥) and checkmarks (✓)?",
          answer: "Click the heart or checkmark symbol to copy it with one click, or add it to your tray to copy alongside other special characters.",
        },
      ],
    },
    relatedToolSlugs: ["unicode-search", "alt-code-finder", "fancy-text"],
  },

  // 2. Unicode Search
  {
    id: "unicode-search",
    slug: "unicode-search",
    name: "Unicode Search",
    shortDescription:
      "Search and lookup Unicode characters by name, codepoint (U+XXXX), hex values, or raw glyph with instant sub-millisecond results.",
    category: "unicode",
    componentId: "UnicodeSearchTool",
    iconName: "Search",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Unicode Character Search & Codepoint Lookup",
      metaTitle: "Unicode Search - Find Codepoints, Names & UTF-8 Bytes | TypeKitTools",
      metaDescription:
        "Fast Unicode character search engine. Search by character name, hex code point (U+XXXX), HTML entity, or symbol.",
      keywords: ["unicode search", "find unicode character", "lookup codepoint", "unicode name search", "hex codepoint finder"],
      faq: [
        {
          question: "Can I search by hex code point?",
          answer: "Yes, you can search for codes like 'U+20AC' or simply '20AC' to immediately find the corresponding character.",
        },
      ],
    },
    relatedToolSlugs: ["character-inspector", "unicode-converter", "symbol-copy"],
  },

  // 3. Alt Code Finder
  {
    id: "alt-code-finder",
    slug: "alt-code-finder",
    name: "Alt Code Finder",
    shortDescription:
      "Quickly find Windows numeric keypad Alt codes for any symbol, currency sign, degree mark, or accented letter with step-by-step keypad instructions.",
    category: "symbols",
    componentId: "AltCodeFinderTool",
    iconName: "Keyboard",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Windows Alt Code Finder & Keypad Reference",
      metaTitle: "Alt Code Finder - Windows Numeric Keypad Codes | TypeKitTools",
      metaDescription:
        "Find any Windows Alt code instantly. Search degree symbols (Alt+0176), copyright (Alt+0169), accents (ñ Alt+164), hearts, and arrows with step-by-step keypad instructions.",
      keywords: [
        "alt code finder",
        "alt keyboard",
        "alt symbols",
        "alt codes",
        "alt shortcut",
        "shortcut codes",
        "alt codes degree",
        "degree symbol alt code",
        "alt code copyright",
        "alt codes for accents",
        "alt codes letters",
        "alt codes symbols",
        "alt codes for windows",
        "alt keys shortcut",
        "windows codes",
        "alt signs",
        "symbols and codes",
      ],
      faq: [
        {
          question: "Do Alt codes work on laptops?",
          answer: "Laptops require either a dedicated numeric keypad, enabling the simulated Fn+NumLock keypad, or using our 1-click copy button.",
        },
        {
          question: "What is the Alt code for the degree symbol (°)?",
          answer: "The Windows Alt code for the degree symbol is Alt + 0176 (or Alt + 248) on the numeric keypad.",
        },
        {
          question: "What is the Alt code for the copyright symbol (©)?",
          answer: "The Windows Alt code for the copyright symbol is Alt + 0169 on the numeric keypad.",
        },
        {
          question: "What is the Alt code for the Spanish letter ñ?",
          answer: "Hold down Alt and type 164 for lowercase ñ, or Alt + 165 for uppercase Ñ on the numeric keypad.",
        },
      ],
    },
    relatedToolSlugs: ["symbol-copy", "accent-keyboard", "ascii-table"],
  },

  // 4. Accent Keyboard
  {
    id: "accent-keyboard",
    slug: "accent-keyboard",
    name: "Accent Keyboard (Virtual Accents)",
    shortDescription:
      "Virtual on-screen accent keyboard for Spanish, French, German, Italian, Portuguese, and Scandinavian letters with uppercase/lowercase toggles.",
    category: "keyboard",
    componentId: "AccentKeyboardTool",
    iconName: "Keyboard",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Online Accent Keyboard - Type Accents & Foreign Characters",
      metaTitle: "Virtual Accent Keyboard Online - Spanish, French, German | TypeKitTools",
      metaDescription:
        "Type accented characters on any computer without special hardware. Virtual keypad and physical shortcuts for Spanish (ñ, á), French (é, ç), German (ä, ö, ß) and more.",
      keywords: [
        "accent keyboard online",
        "shortcut keyboard for ñ",
        "keyboard ñ",
        "short cut for ñ",
        "alt codes for accents",
        "accent symbol on keyboard",
        "keyboard shortcuts for accents",
        "keyboard shortcuts for letters with accents",
        "accent letters on keyboard",
        "french keyboard shortcuts",
        "á keyboard",
        "ó keyboard",
        "à keyboard",
        "windows accents",
        "typing accents",
        "ñ in ms word",
        "keyboard code for ñ",
        "spanish keyboard online",
        "german umlaut keyboard",
      ],
      faq: [
        {
          question: "Can I type directly into the notepad?",
          answer: "Yes! The notepad is completely editable. You can type on your physical keyboard and click virtual buttons whenever you need an accent.",
        },
        {
          question: "What is the keyboard shortcut for the Spanish letter ñ?",
          answer: "On Windows with a numeric keypad, hold Alt and type 164 (or 165 for uppercase Ñ). On Mac, press Option + N, then press N. In Microsoft Word, press Ctrl + Shift + ~, then N.",
        },
        {
          question: "How do I type French accents like é and ç?",
          answer: "On Mac, press Option + E then E for é, and Option + C for ç. On Windows with a keypad, use Alt + 130 for é and Alt + 135 for ç.",
        },
      ],
    },
    relatedToolSlugs: ["key-code-tester", "alt-code-finder", "symbol-copy"],
  },

  // 5. Emoji Library
  {
    id: "emoji-library",
    slug: "emoji-library",
    name: "Emoji Library & Picker",
    shortDescription:
      "Browse, search, and copy emojis organized by categories: Smileys, Gestures, Hearts, Food, Animals, and Symbols with instant 1-click copy.",
    category: "emoji",
    componentId: "EmojiLibraryTool",
    iconName: "Smile",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Emoji Library & Search - Copy Emojis Online",
      metaTitle: "Emoji Library & Picker - Copy Paste Emojis with 1 Click | TypeKitTools",
      metaDescription:
        "Comprehensive online emoji library. Search smileys, gestures, hearts, and symbols with 1-click copy.",
      keywords: ["emoji library", "copy emoji", "emoji picker online", "search emojis", "emoji list copy paste"],
      faq: [
        {
          question: "Do these emojis work on Discord, Instagram, and Slack?",
          answer: "Yes! All emojis are standard Unicode pictographs supported natively by all modern social platforms and operating systems.",
        },
      ],
    },
    relatedToolSlugs: ["symbol-copy", "fancy-text", "character-counter"],
  },

  // 6. Unicode Converter
  {
    id: "unicode-converter",
    slug: "unicode-converter",
    name: "Unicode Converter",
    shortDescription:
      "Convert text between Unicode escape sequences (\\uXXXX), hex codepoints (U+XXXX), HTML decimal/hex entities, and UTF-8 hex bytes.",
    category: "unicode",
    componentId: "UnicodeConverterTool",
    iconName: "FileCode2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Unicode Converter - Text to \\uXXXX, Codepoints & Entities",
      metaTitle: "Unicode Converter Online - Escape Sequences, Codepoints, UTF-8 | TypeKitTools",
      metaDescription:
        "Convert strings to Unicode escape sequences, U+XXXX codepoints, HTML numeric entities, and UTF-8 bytes with instant bidirectional decoding.",
      keywords: ["unicode converter", "text to unicode escape", "codepoint converter", "utf8 hex converter", "decode unicode escape"],
      faq: [
        {
          question: "Does it support surrogate pairs for emojis?",
          answer: "Yes! It properly formats astral plane characters above U+FFFF using \\u{XXXXX} or standard UTF-16 surrogate pairs.",
        },
      ],
    },
    relatedToolSlugs: ["character-inspector", "html-entities", "base64"],
  },

  // 7. Character Inspector
  {
    id: "character-inspector",
    slug: "character-inspector",
    name: "Character Inspector",
    shortDescription:
      "Inspect any text character-by-character: view glyphs, Unicode codepoints, official character names, decimal values, UTF-8 bytes, and UTF-16 code units.",
    category: "unicode",
    componentId: "CharacterInspectorTool",
    iconName: "FileCode2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Character Inspector - Unicode Codepoints, Bytes & UTF-16 Units",
      metaTitle: "Character Inspector - Detailed Unicode Analysis | TypeKitTools",
      metaDescription:
        "Inspect every character in a string. See official Unicode character names, names of symbols on keyboard, hex values, UTF-8 bytes, surrogate pairs, and descriptions.",
      keywords: [
        "character inspector",
        "symbols keyboard name",
        "name of the symbol in keyboard",
        "name of keyboard buttons",
        "names of the symbols on a keyboard",
        "keyboard special character",
        "keyboard combinations for symbols",
        "name of all symbols on keyboard",
        "keyboard all symbol name",
        "unicode character lookup",
        "inspect codepoints",
        "utf8 byte inspector",
      ],
      faq: [
        {
          question: "What is a surrogate pair?",
          answer: "In UTF-16, characters beyond U+FFFF (such as emojis and rare historic scripts) require two 16-bit code units (a high surrogate and a low surrogate) to represent a single glyph.",
        },
        {
          question: "How do I find the official name of a keyboard symbol?",
          answer: "Paste or type any symbol into the Character Inspector input box to view its official Unicode standard name, category, and decimal value immediately.",
        },
      ],
    },
    relatedToolSlugs: ["unicode-search", "unicode-converter", "character-counter"],
  },

  // 8. HTML Entity Converter
  {
    id: "html-entities",
    slug: "html-entities",
    name: "HTML Entity Converter",
    shortDescription:
      "Encode characters into named HTML entities (&copy;, &euro;), decimal entities (&#169;), or hex entities (&#xA9;), and decode back to clean text.",
    category: "developer",
    componentId: "HtmlEntityTool",
    iconName: "Code2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "HTML Entity Converter - Encode & Decode HTML Entities",
      metaTitle: "HTML Entity Converter - Named, Decimal & Hex Entities | TypeKitTools",
      metaDescription:
        "Encode and decode HTML entities online. Convert special characters to &amp;, &lt;, &gt;, &copy;, decimal &#169;, or hex &#xA9;.",
      keywords: ["html entity converter", "encode html entities", "decode html entities", "named html entities", "special characters to html"],
      faq: [
        {
          question: "Why should I use HTML entities?",
          answer: "HTML entities prevent reserved characters like <, >, and & from breaking HTML layout or causing Cross-Site Scripting (XSS) vulnerabilities.",
        },
      ],
    },
    relatedToolSlugs: ["unicode-converter", "base64", "url-encode"],
  },

  // 9. ASCII Table
  {
    id: "ascii-table",
    slug: "ascii-table",
    name: "ASCII Table (0–255 Reference)",
    shortDescription:
      "Complete interactive Standard (0–127) and Extended (128–255) ASCII table with Decimal, Hexadecimal, Binary, Character, and Control codes.",
    category: "developer",
    componentId: "AsciiTableTool",
    iconName: "Binary",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "ASCII Table - Complete 0 to 255 Chart with Hex, Dec & Binary",
      metaTitle: "ASCII Table (0-255) - Standard & Extended ASCII Chart | TypeKitTools",
      metaDescription:
        "Full interactive ASCII table. Search decimal, hex, binary, and printable characters with control character descriptions.",
      keywords: ["ascii table", "ascii chart", "hex to ascii", "extended ascii table", "ascii code reference"],
      faq: [
        {
          question: "What is the difference between standard and extended ASCII?",
          answer: "Standard ASCII uses 7 bits (codes 0 to 127) representing the English alphabet, numbers, and control characters. Extended ASCII uses 8 bits (codes 128 to 255) to include accents, box-drawing, and symbols.",
        },
      ],
    },
    relatedToolSlugs: ["alt-code-finder", "base64", "unicode-converter"],
  },

  // 10. Fancy Text Generator
  {
    id: "fancy-text",
    slug: "fancy-text",
    name: "Fancy Text Generator",
    shortDescription:
      "Transform normal letters into stylish aesthetic Unicode fonts: Bold, Script, Fraktur, Double-struck, Monospace, and Bubbles with 1-click copy.",
    category: "generators",
    componentId: "FancyTextTool",
    iconName: "Sparkles",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Fancy Text Generator - Copy & Paste Aesthetic Fonts",
      metaTitle: "Fancy Font Generator - Copy & Paste Aesthetic Unicode Text | TypeKitTools",
      metaDescription:
        "Generate stylish, aesthetic Unicode fonts for social media, gaming usernames, and bios. Copy bold, italic, gothic, script, and bubble text with 1 click.",
      keywords: ["fancy text generator", "aesthetic font generator", "copy paste fonts", "unicode text generator", "fancy font copy paste"],
      faq: [
        {
          question: "How does the fancy text generator work?",
          answer: "It maps standard ASCII letters to decorative Unicode mathematical alphanumeric symbols that render uniformly across modern web browsers and social apps.",
        },
      ],
    },
    relatedToolSlugs: ["symbol-copy", "case-converter", "character-counter"],
  },

  // 11. Base64 Encoder/Decoder
  {
    id: "base64",
    slug: "base64",
    name: "Base64 Encoder & Decoder",
    shortDescription:
      "Encode text to Base64 format and decode Base64 strings safely with full UTF-8 Unicode character support and zero server latency.",
    category: "developer",
    componentId: "Base64Tool",
    iconName: "Binary",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Base64 Encoder and Decoder (UTF-8 Compatible)",
      metaTitle: "Base64 Encoder & Decoder Online (UTF-8 Safe) | TypeKitTools",
      metaDescription:
        "Fast, client-side Base64 encode and decode utility with complete UTF-8 Unicode support. No data is sent to any server.",
      keywords: ["base64 encoder", "base64 decoder", "base64 online", "utf-8 base64", "decode base64 string"],
      faq: [
        {
          question: "Is this Base64 tool safe for non-ASCII Unicode characters?",
          answer: "Yes! Standard browser btoa() fails on characters beyond Latin-1. Our tool uses UTF-8 byte encoding so emojis and accents decode without corruption.",
        },
      ],
    },
    relatedToolSlugs: ["url-encode", "json-formatter", "html-entities"],
  },

  // 12. URL Encoder/Decoder
  {
    id: "url-encode",
    slug: "url-encode",
    name: "URL Encoder & Decoder",
    shortDescription:
      "Encode query strings and URLs using percent-encoding (RFC 3986) or decode percent-encoded strings back to plain text.",
    category: "developer",
    componentId: "UrlEncodeTool",
    iconName: "Link2",
    isClientOnly: true,
    featured: false,
    seo: {
      title: "URL Encoder & Decoder - Percent-Encoding Utility",
      metaTitle: "URL Encoder & Decoder Online (Percent-Encoding) | TypeKitTools",
      metaDescription:
        "Encode and decode URLs and URI query parameters according to RFC 3986. Fast, responsive, and private client-side processing.",
      keywords: ["url encode", "url decode", "percent encoding", "encodeuricomponent online", "url parser"],
      faq: [
        {
          question: "What is percent-encoding?",
          answer: "Percent-encoding is a mechanism for encoding characters in a Uniform Resource Identifier (URI) using a percent sign (%) followed by two hexadecimal digits.",
        },
      ],
    },
    relatedToolSlugs: ["base64", "json-formatter", "html-entities"],
  },

  // 13. JSON Formatter & Validator
  {
    id: "json-formatter",
    slug: "json-formatter",
    name: "JSON Formatter, Validator & Minifier",
    shortDescription:
      "Format, prettify, validate, and minify JSON data with instant error detection and line/column pointer indicators.",
    category: "developer",
    componentId: "JsonFormatterTool",
    iconName: "Braces",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "JSON Formatter, Validator & Minifier Online",
      metaTitle: "JSON Formatter & Validator - Prettify, Minify JSON | TypeKitTools",
      metaDescription:
        "Free online JSON Formatter and validator. Beautify, fix indentation, validate syntax errors, and minify JSON strings with zero latency.",
      keywords: ["json formatter", "json validator", "prettify json", "json beautifier", "minify json"],
      faq: [
        {
          question: "Is my JSON data sent to a remote server?",
          answer: "Never. All parsing, validation, and formatting is executed locally inside your web browser. Your sensitive data never leaves your device.",
        },
      ],
    },
    relatedToolSlugs: ["base64", "case-converter", "uuid-generator"],
  },

  // 14. Character Counter
  {
    id: "character-counter",
    slug: "character-counter",
    name: "Character Counter & Text Analyzer",
    shortDescription:
      "Accurately count true visible characters (grapheme clusters), Unicode codepoints, words, sentences, UTF-8 bytes, and estimated reading time.",
    category: "unicode",
    componentId: "CharacterCounterTool",
    iconName: "Type",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Character Counter & Text Analyzer (Unicode Graphemes)",
      metaTitle: "Character Counter - Accurate Graphemes, Words & UTF-8 Bytes | TypeKitTools",
      metaDescription:
        "Count true visible characters, words, sentences, lines, and UTF-8 bytes. Handles multi-codepoint emojis (👨‍👩‍👧‍👦) and surrogate pairs accurately.",
      keywords: ["character counter", "word counter", "unicode character counter", "grapheme cluster counter", "utf8 byte counter"],
      faq: [
        {
          question: "Why does an emoji count as multiple characters in standard counters?",
          answer: "Most simple counters use JavaScript `.length`, which counts 16-bit code units. Emojis like 🚀 use 2 code units, and family emojis (👨‍👩‍👧‍👦) use 11 code units! Our tool counts true visual grapheme clusters as 1 character.",
        },
      ],
    },
    relatedToolSlugs: ["character-inspector", "invisible-character-tool", "case-converter"],
  },

  // 15. Invisible Character Tool
  {
    id: "invisible-character-tool",
    slug: "invisible-character-tool",
    name: "Invisible Character Tool & Cleaner",
    shortDescription:
      "Detect, highlight, count, and remove hidden zero-width spaces (ZWSP, ZWNJ, ZWJ), BOM marks, and non-breaking spaces causing formatting bugs.",
    category: "unicode",
    componentId: "ZeroWidthCleaner",
    iconName: "EyeOff",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Invisible Character Tool & Zero-Width Space Cleaner",
      metaTitle: "Invisible Character Tool - Detect & Remove Zero-Width Spaces | TypeKitTools",
      metaDescription:
        "Find and delete invisible zero-width spaces (ZWSP, ZWNJ, ZWJ), non-breaking spaces, and hidden Unicode characters causing syntax or formatting bugs.",
      keywords: ["invisible character tool", "zero width space cleaner", "detect invisible characters", "remove hidden unicode", "zwsp remover"],
      faq: [
        {
          question: "What is a zero-width space (ZWSP)?",
          answer: "A zero-width space (U+200B) is an invisible character used in typesetting to indicate word boundaries without rendering any visual space.",
        },
      ],
    },
    relatedToolSlugs: ["character-counter", "character-inspector", "json-formatter"],
  },

  // Key Code Tester
  {
    id: "key-code-tester",
    slug: "key-code-tester",
    name: "Key Code Tester & Event Inspector",
    shortDescription:
      "Press any key on your keyboard to instantly inspect JavaScript KeyboardEvent data: event.key, code, which, keyCode, and modifier states.",
    category: "keyboard",
    componentId: "KeyCodeTester",
    iconName: "Keyboard",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "JavaScript Key Code Tester & Keyboard Event Inspector",
      metaTitle: "JavaScript Key Code Tester & Keyboard Event Inspector | TypeKitTools",
      metaDescription:
        "Free online key code tester. Press any key to see event.key, event.code, which, keyCode, location, and keyboard event properties in real-time.",
      keywords: ["key code tester", "javascript keycode", "keyboard event inspector", "event key", "event code", "which keycode"],
      faq: [
        {
          question: "What is event.code vs event.key in JavaScript?",
          answer: "event.key represents the character generated by the key press considering layout, Shift, and Alt modifiers. event.code represents the physical key on the keyboard.",
        },
      ],
    },
    relatedToolSlugs: ["accent-keyboard", "ascii-table", "base64"],
  },

  // Case Converter
  {
    id: "case-converter",
    slug: "case-converter",
    name: "Case Converter",
    shortDescription:
      "Convert text effortlessly between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Title Case, and Sentence case.",
    category: "developer",
    componentId: "CaseConverterTool",
    iconName: "CaseSensitive",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Case Converter - camelCase, snake_case, PascalCase, kebab-case",
      metaTitle: "Case Converter Online - camelCase, snake_case, Title Case | TypeKitTools",
      metaDescription:
        "Convert text effortlessly between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE, Sentence case, and Title Case.",
      keywords: ["case converter", "camelcase converter", "snake case to camelcase", "kebab case", "title case converter"],
      faq: [
        {
          question: "What are the common naming conventions?",
          answer: "camelCase is standard in JavaScript/TypeScript; snake_case in Python; kebab-case in URLs and CSS; and PascalCase in React components and classes.",
        },
      ],
    },
    relatedToolSlugs: ["fancy-text", "json-formatter", "character-counter"],
  },

  // UUID Generator
  {
    id: "uuid-generator",
    slug: "uuid-generator",
    name: "UUID & ULID Generator",
    shortDescription:
      "Generate cryptographically secure Version 4 UUIDs (GUIDs) and time-sortable ULIDs individually or in bulk.",
    category: "developer",
    componentId: "UuidGeneratorTool",
    iconName: "Fingerprint",
    isClientOnly: true,
    featured: false,
    seo: {
      title: "UUID & ULID Generator Online (v4 UUID & GUID)",
      metaTitle: "UUID & ULID Generator - Generate Unique IDs | TypeKitTools",
      metaDescription:
        "Generate cryptographically random UUID v4 and sortable ULIDs in bulk. Choose uppercase/lowercase, hyphens or stripped formats.",
      keywords: ["uuid generator", "guid generator", "ulid generator", "uuid v4 online", "bulk uuid generator"],
      faq: [
        {
          question: "What is a UUID v4?",
          answer: "A UUID v4 is a 128-bit universally unique identifier generated using cryptographically strong pseudo-random numbers.",
        },
      ],
    },
    relatedToolSlugs: ["base64", "json-formatter"],
  },

  // Hash Generator
  {
    id: "hash-generator",
    slug: "hash-generator",
    name: "Cryptographic Hash Generator",
    shortDescription:
      "Generate MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, and HMAC signatures in real-time directly in your browser.",
    category: "developer",
    componentId: "HashGeneratorTool",
    iconName: "Hash",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Cryptographic Hash Generator - MD5, SHA-256, SHA-512 & HMAC",
      metaTitle: "Hash Generator Online - MD5, SHA-1, SHA-256, SHA-512 | TypeKitTools",
      metaDescription:
        "Fast, private online hash generator. Calculate MD5, SHA-1, SHA-256, SHA-384, SHA-512, CRC32, and HMAC message authentication codes locally.",
      keywords: ["hash generator", "md5 generator", "sha256 generator", "sha512 online", "hmac generator", "crc32 calculator"],
      faq: [
        {
          question: "Is my text or file sent to a remote server for hashing?",
          answer: "No. All hashes are computed 100% locally in your browser using the native Web Cryptography API and client-side algorithms.",
        },
        {
          question: "What is HMAC used for?",
          answer: "HMAC (Hash-based Message Authentication Code) is used to verify both data integrity and the authentication of a message using a shared secret key (e.g., GitHub and Stripe webhooks).",
        },
      ],
    },
    relatedToolSlugs: ["base64", "uuid-generator", "json-formatter"],
  },

  // Unix Timestamp Converter
  {
    id: "timestamp-converter",
    slug: "timestamp-converter",
    name: "Unix Timestamp & Epoch Converter",
    shortDescription:
      "Real-time Unix epoch clock and bidirectional converter between epoch timestamps (seconds/milliseconds) and human-readable dates across world timezones.",
    category: "developer",
    componentId: "TimestampConverterTool",
    iconName: "Clock",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Unix Timestamp Converter & Epoch Date Formatter",
      metaTitle: "Unix Timestamp Converter - Epoch to Human Date | TypeKitTools",
      metaDescription:
        "Convert Unix timestamps (seconds & milliseconds) to human-readable dates in UTC, ISO 8601, and local timezones. Live epoch clock with offset shortcuts.",
      keywords: ["timestamp converter", "unix epoch converter", "epoch to date", "convert timestamp to datetime", "epoch clock live"],
      faq: [
        {
          question: "What is Unix time?",
          answer: "Unix time is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC, not counting leap seconds.",
        },
        {
          question: "How do I know if my timestamp is in seconds or milliseconds?",
          answer: "Timestamps with 10 digits (e.g., 1762391000) are in seconds; timestamps with 13 digits (e.g., 1762391000000) are in milliseconds. TypeKitTools detects this automatically.",
        },
      ],
    },
    relatedToolSlugs: ["json-formatter", "base64", "hash-generator"],
  },

  // Diff Checker
  {
    id: "diff-checker",
    slug: "diff-checker",
    name: "Diff Checker & Text Comparison",
    shortDescription:
      "Compare two text files or code blocks with side-by-side split and inline unified views, additions/deletions stats, and unified patch export.",
    category: "developer",
    componentId: "DiffCheckerTool",
    iconName: "GitCompare",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Diff Checker - Compare Text & Code Online",
      metaTitle: "Diff Checker Online - Split & Unified Text Comparison | TypeKitTools",
      metaDescription:
        "Free online text diff checker. Compare two texts or code files side-by-side or unified inline with addition/deletion statistics and Git patch export.",
      keywords: ["diff checker", "text comparison tool", "compare text online", "code diff online", "git diff visualizer"],
      faq: [
        {
          question: "Can I export the diff as a Git patch?",
          answer: "Yes! Click the 'Copy Git Patch' button to generate standard unified patch format suitable for applying with git apply.",
        },
      ],
    },
    relatedToolSlugs: ["character-counter", "invisible-character-tool", "json-formatter"],
  },

  // Regex Tester
  {
    id: "regex-tester",
    slug: "regex-tester",
    name: "Regex Tester & Debugger",
    shortDescription:
      "Test and debug JavaScript regular expressions in real-time with live color match highlighting, capture group inspection, replacement mode, and cheat sheet.",
    category: "developer",
    componentId: "RegexTesterTool",
    iconName: "Search",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Regex Tester & Debugger - Test Regular Expressions Online",
      metaTitle: "Regex Tester & Debugger - Live Match Highlighting | TypeKitTools",
      metaDescription:
        "Test JavaScript regular expressions in real-time. Features live match visualizer, capture group inspector, string replacement mode, presets, and cheat sheet.",
      keywords: ["regex tester", "regular expression tester", "regex debugger", "javascript regex test", "regex cheatsheet"],
      faq: [
        {
          question: "What regex engine is used?",
          answer: "TypeKitTools uses your browser's native JavaScript (ECMAScript) RegExp engine, guaranteeing 100% compatibility with web and Node.js applications.",
        },
      ],
    },
    relatedToolSlugs: ["case-converter", "diff-checker", "character-counter"],
  },

  // Phase 8 - Batch A: Unicode and text
  {
    id: "utf8-encoder-decoder",
    slug: "utf8-encoder-decoder",
    name: "UTF-8 Encoder & Decoder",
    shortDescription:
      "Encode text into UTF-8 Hex, Binary, Decimal, Base64, and C byte arrays, or decode raw UTF-8 byte streams with multi-byte inspection.",
    category: "unicode",
    componentId: "Utf8EncoderDecoderTool",
    iconName: "Binary",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "UTF-8 Encoder & Decoder - Convert Text to Hex, Binary & Bytes",
      metaTitle: "UTF-8 Encoder & Decoder Online - Text to Bytes | TypeKitTools",
      metaDescription:
        "Fast UTF-8 text encoder and decoder. Convert text to Hex, Binary, Decimal, Percent-encoded, and C uint8_t byte arrays with character-by-character byte breakdown.",
      keywords: ["utf8 encoder", "utf8 decoder", "utf8 bytes to text", "text to utf8 hex", "utf8 binary converter", "multibyte utf8"],
      faq: [
        {
          question: "How many bytes does a UTF-8 character use?",
          answer: "UTF-8 uses 1 byte for ASCII characters (0-127), 2 bytes for Latin accents/Greek/Arabic, 3 bytes for Chinese/Japanese/common symbols, and 4 bytes for emoji and astral plane characters.",
        },
        {
          question: "What happens if a byte sequence is invalid UTF-8?",
          answer: "Our decoder uses standard fatal UTF-8 validation and highlights the exact illegal sequence without silent corruptions.",
        },
      ],
    },
    relatedToolSlugs: ["utf16-converter", "unicode-converter", "character-inspector", "base64"],
  },

  {
    id: "utf16-converter",
    slug: "utf16-converter",
    name: "UTF-16 Converter & Surrogate Pair Inspector",
    shortDescription:
      "Convert text to UTF-16 Big-Endian, Little-Endian, and \\uXXXX escapes, with surrogate pair breakdown (High/Low surrogates) for astral plane codepoints.",
    category: "unicode",
    componentId: "Utf16ConverterTool",
    iconName: "Layers",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "UTF-16 Converter & Surrogate Pair Inspector Online",
      metaTitle: "UTF-16 Converter - Surrogate Pairs & Code Units | TypeKitTools",
      metaDescription:
        "Convert text to UTF-16 Big-Endian, Little-Endian, and \\uXXXX escape notation. Inspect 16-bit code units and High/Low surrogate pairs for emoji and astral symbols.",
      keywords: ["utf16 converter", "surrogate pair calculator", "utf16 code units", "utf16 escapes", "high surrogate low surrogate"],
      faq: [
        {
          question: "What is a surrogate pair?",
          answer: "In UTF-16, characters above U+FFFF (astral planes, including emojis) cannot fit into a single 16-bit code unit. They are encoded as a pair of 16-bit units: a High Surrogate (0xD800-0xDBFF) followed by a Low Surrogate (0xDC00-0xDFFF).",
        },
      ],
    },
    relatedToolSlugs: ["utf8-encoder-decoder", "unicode-normalizer", "character-inspector"],
  },

  {
    id: "unicode-normalizer",
    slug: "unicode-normalizer",
    name: "Unicode Normalizer (NFC, NFD, NFKC, NFKD)",
    shortDescription:
      "Convert and compare Unicode strings across all four standard normalization forms: NFC, NFD, NFKC, and NFKD with character count and byte metrics.",
    category: "unicode",
    componentId: "UnicodeNormalizerTool",
    iconName: "Sparkles",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Unicode Normalizer - NFC, NFD, NFKC & NFKD Forms Online",
      metaTitle: "Unicode Normalizer - NFC, NFD, NFKC & NFKD | TypeKitTools",
      metaDescription:
        "Normalize Unicode text to NFC, NFD, NFKC, and NFKD forms. View side-by-side differences, canonical vs compatibility equivalence, and byte savings.",
      keywords: ["unicode normalizer", "nfc normalizer", "nfd normalizer", "nfkc nfkd", "unicode canonical decomposition", "normalize unicode online"],
      faq: [
        {
          question: "What is the difference between NFC and NFD?",
          answer: "NFC (Canonical Composition) combines characters and diacritics into precomposed forms (e.g. 'é' as 1 code point U+00E9). NFD (Canonical Decomposition) separates them into base letters and combining marks (e.g. 'e' + combining acute accent U+0301).",
        },
      ],
    },
    relatedToolSlugs: ["utf8-encoder-decoder", "invisible-character-tool", "character-counter"],
  },

  {
    id: "text-reverser",
    slug: "text-reverser",
    name: "Text Reverser & Upside-Down Flipper",
    shortDescription:
      "Reverse text characters, words, or lines, or flip text upside down with grapheme-cluster safety for emojis and combining accents.",
    category: "generators",
    componentId: "TextReverserTool",
    iconName: "ArrowLeftRight",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Text Reverser & Upside Down Flipper - Backward Text Generator",
      metaTitle: "Text Reverser Online - Reverse Words, Letters & Upside Down | TypeKitTools",
      metaDescription:
        "Free online text reverser. Reverse characters, words, lines, or flip text upside down. Grapheme-cluster safe for emojis and accented letters.",
      keywords: ["text reverser", "reverse text online", "backward text generator", "upside down text", "reverse words"],
      faq: [
        {
          question: "Will reversing break emojis or accented characters?",
          answer: "No. TypeKitTools uses grapheme cluster segmentation so multi-byte emojis (like flags and families) and combining diacritics remain intact when reversed.",
        },
      ],
    },
    relatedToolSlugs: ["fancy-text", "case-converter", "character-counter"],
  },

  {
    id: "text-repeater",
    slug: "text-repeater",
    name: "Text Repeater & Multiplier",
    shortDescription:
      "Repeat any text, string, or phrase up to 10,000 times with custom separators, line numbering, and instant download.",
    category: "generators",
    componentId: "TextRepeaterTool",
    iconName: "Repeat",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Text Repeater Online - Repeat Strings & Text Up to 10,000x",
      metaTitle: "Text Repeater Online - Repeat Words & Strings Fast | TypeKitTools",
      metaDescription:
        "Repeat text, words, and phrases up to 10,000 times with custom delimiters (newline, space, comma) and numbering styles. 1-click copy and text download.",
      keywords: ["text repeater", "repeat text online", "string multiplier", "word repeater", "repeat text 1000 times"],
      faq: [
        {
          question: "What is the maximum number of repetitions?",
          answer: "You can repeat text up to 10,000 times in a single operation, keeping browser memory and rendering lightning-fast.",
        },
      ],
    },
    relatedToolSlugs: ["text-reverser", "line-break-remover", "character-counter"],
  },

  {
    id: "line-break-remover",
    slug: "line-break-remover",
    name: "Line Break Remover & Text Formatter",
    shortDescription:
      "Remove unwanted hard line breaks from copied PDF text, emails, and terminal dumps while preserving paragraph structures or formatting into delimiters.",
    category: "generators",
    componentId: "LineBreakRemoverTool",
    iconName: "Scissors",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Line Break Remover - Clean Copied PDF & Text Paragraphs",
      metaTitle: "Line Break Remover Online - Fix Copied PDF Line Breaks | TypeKitTools",
      metaDescription:
        "Remove unwanted line breaks from PDF text, terminal outputs, and emails. Preserve paragraph structure, collapse excess spaces, or join lines with custom delimiters.",
      keywords: ["line break remover", "remove line breaks online", "remove newline from text", "fix pdf copied text", "remove paragraph breaks"],
      faq: [
        {
          question: "Can I keep paragraph breaks while removing single line wraps?",
          answer: "Yes! Choose 'Preserve Paragraphs' mode. It cleans hard line wraps within paragraphs while keeping double-line breaks intact.",
        },
      ],
    },
    relatedToolSlugs: ["invisible-character-tool", "character-counter", "diff-checker"],
  },

  // Phase 8 - Batch B: Developer utilities
  {
    id: "html-formatter",
    slug: "html-formatter",
    name: "HTML Formatter & Minifier",
    shortDescription:
      "Format, beautify, and indent HTML code or compress and minify HTML payloads with tag balancing and void element handling.",
    category: "developer",
    componentId: "HtmlFormatterTool",
    iconName: "Code2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "HTML Formatter & Minifier Online - Beautify HTML Code",
      metaTitle: "HTML Formatter & Minifier - Clean, Beautify HTML | TypeKitTools",
      metaDescription:
        "Free online HTML formatter and beautifier. Indent messy HTML with custom 2-space, 4-space, or tab options, or compress and minify HTML for fast production loading.",
      keywords: ["html formatter", "html beautifier", "minify html", "format html online", "html prettifier", "html indent"],
      faq: [
        {
          question: "Does this tool support void and self-closing tags?",
          answer: "Yes, standard HTML5 void elements like <meta>, <link>, <img>, and <br> are formatted cleanly without expecting closing tags.",
        },
      ],
    },
    relatedToolSlugs: ["css-formatter", "json-formatter", "html-entities"],
  },

  {
    id: "css-formatter",
    slug: "css-formatter",
    name: "CSS Formatter & Minifier",
    shortDescription:
      "Format, clean, and beautify CSS stylesheets with custom indentation or minify CSS rules and media queries for production performance.",
    category: "developer",
    componentId: "CssFormatterTool",
    iconName: "Palette",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "CSS Formatter & Minifier Online - Beautify CSS Stylesheets",
      metaTitle: "CSS Formatter & Minifier - Beautify CSS Code | TypeKitTools",
      metaDescription:
        "Format and beautify CSS stylesheets with clean indentation or minify CSS to reduce bundle size. Supports media queries, variables, and nested rule blocks.",
      keywords: ["css formatter", "css beautifier", "minify css", "css prettifier", "format css online", "css compressor"],
      faq: [
        {
          question: "Does this handle CSS media queries and pseudo-selectors?",
          answer: "Yes, nested @media blocks, @keyframes, pseudo-classes, and CSS variables are formatted and indented properly.",
        },
      ],
    },
    relatedToolSlugs: ["html-formatter", "css-escape", "diff-checker"],
  },

  {
    id: "css-escape",
    slug: "css-escape",
    name: "CSS Escape Generator",
    shortDescription:
      "Generate W3C CSS.escape() compliant selectors for complex class names (Tailwind, colons, slashes), IDs starting with numbers, and CSS content strings.",
    category: "developer",
    componentId: "CssEscapeTool",
    iconName: "Hash",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "CSS Escape Generator - W3C CSS.escape & Tailwind Selectors",
      metaTitle: "CSS Escape Generator - Escape Class Names & IDs | TypeKitTools",
      metaDescription:
        "Generate W3C CSS.escape() compliant selectors for querySelector and stylesheets. Escape Tailwind classes with colons and slashes, IDs starting with digits, and Unicode content.",
      keywords: ["css escape", "css.escape generator", "escape tailwind class", "css queryselector escape", "escape css id"],
      faq: [
        {
          question: "Why does querySelector fail on Tailwind classes like sm:hover:bg-red-500?",
          answer: "In CSS selectors, colons denote pseudo-classes. To select a class containing a literal colon, it must be escaped with a backslash (e.g. \\:).",
        },
      ],
    },
    relatedToolSlugs: ["css-formatter", "js-unicode-converter", "html-entities"],
  },

  {
    id: "js-unicode-converter",
    slug: "js-unicode-converter",
    name: "JavaScript Unicode Converter",
    shortDescription:
      "Convert JavaScript strings and code into \\uXXXX and ES6 \\u{XXXXX} Unicode escape sequences, or unescape back into clean readable text.",
    category: "developer",
    componentId: "JsUnicodeConverterTool",
    iconName: "Code",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "JavaScript Unicode Converter - \\uXXXX & ES6 \\u{XXXXX} Escaping",
      metaTitle: "JavaScript Unicode Converter - Escape & Unescape JS | TypeKitTools",
      metaDescription:
        "Bidirectional JavaScript Unicode escape converter. Transform text and JS code into \\uXXXX and ES6 \\u{XXXXX} escapes or decode escaped strings back into readable text.",
      keywords: ["javascript unicode converter", "js unicode escape", "unescape unicode javascript", "es6 unicode braces", "unicode to js string"],
      faq: [
        {
          question: "When should I use \\u{XXXXX} with curly braces?",
          answer: "ES6 introduced curly braces \\u{...} for code points above 0xFFFF (such as emoji and musical symbols), eliminating the need for 16-bit surrogate pairs.",
        },
      ],
    },
    relatedToolSlugs: ["utf8-encoder-decoder", "utf16-converter", "unicode-converter"],
  },

  {
    id: "hex-converter",
    slug: "hex-converter",
    name: "Hexadecimal Converter",
    shortDescription:
      "Convert Hexadecimal to Decimal, Binary, Octal, and ASCII text with BigInt arbitrary precision support for arbitrarily large values.",
    category: "developer",
    componentId: "HexConverterTool",
    iconName: "Hash",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Hexadecimal Converter - Hex to Decimal, Binary & Text Online",
      metaTitle: "Hex Converter - Convert Hex to Decimal, Binary, Text | TypeKitTools",
      metaDescription:
        "Free hexadecimal converter. Convert hex values to decimal, binary, octal, and UTF-8 ASCII text with arbitrary BigInt precision, byte grouping, and bit metrics.",
      keywords: ["hex converter", "hex to decimal", "hex to binary", "hex to text", "hexadecimal calculator", "bigint hex converter"],
      faq: [
        {
          question: "Can this convert large hex values like cryptographic hashes?",
          answer: "Yes, our engine uses native BigInt, allowing you to convert 128-bit, 256-bit (SHA-256), and larger hex strings without precision loss.",
        },
      ],
    },
    relatedToolSlugs: ["binary-converter", "decimal-converter", "hash-generator"],
  },

  {
    id: "binary-converter",
    slug: "binary-converter",
    name: "Binary Converter",
    shortDescription:
      "Convert Binary (Base 2) to Decimal, Hexadecimal, Octal, and ASCII text with 8-bit byte grouping, bit counts, and BigInt precision.",
    category: "developer",
    componentId: "BinaryConverterTool",
    iconName: "Binary",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Binary Converter - Binary to Decimal, Hex & Text Online",
      metaTitle: "Binary Converter - Convert Binary to Decimal, Hex, Text | TypeKitTools",
      metaDescription:
        "Convert binary (0s and 1s) to decimal, hexadecimal, octal, and ASCII text. Features 8-bit byte grouping, 1s/0s bit counting, and arbitrary precision.",
      keywords: ["binary converter", "binary to decimal", "binary to hex", "binary to text", "binary code translator", "base 2 converter"],
      faq: [
        {
          question: "How do I convert binary code to readable text?",
          answer: "Paste your 8-bit binary bytes (e.g. 01001000 01101001) into the input box to instantly see the decoded ASCII text.",
        },
      ],
    },
    relatedToolSlugs: ["hex-converter", "decimal-converter", "utf8-encoder-decoder"],
  },

  {
    id: "decimal-converter",
    slug: "decimal-converter",
    name: "Decimal Converter & Roman Numerals",
    shortDescription:
      "Convert Decimal numbers to Binary, Hexadecimal, Octal, Roman Numerals, and byte representations with arbitrary precision BigInt.",
    category: "developer",
    componentId: "DecimalConverterTool",
    iconName: "Calculator",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Decimal Converter - Decimal to Binary, Hex & Roman Numerals",
      metaTitle: "Decimal Converter - Base 10 to Binary, Hex, Roman | TypeKitTools",
      metaDescription:
        "Convert decimal numbers into binary, hexadecimal, octal, and Roman numerals. Features arbitrary-precision BigInt arithmetic, bit width, and byte diagnostics.",
      keywords: ["decimal converter", "decimal to binary", "decimal to hex", "decimal to roman numerals", "number base converter", "bigint decimal converter"],
      faq: [
        {
          question: "What is the maximum decimal number supported?",
          answer: "Our converter uses JavaScript BigInt arithmetic, supporting arbitrarily large integer values without the 53-bit Number.MAX_SAFE_INTEGER limit.",
        },
      ],
    },
    relatedToolSlugs: ["hex-converter", "binary-converter", "timestamp-converter"],
  },

  // Phase 8 - Batch C: Advanced tools
  {
    id: "json-validator",
    slug: "json-validator",
    name: "JSON Validator & Linter",
    shortDescription:
      "Strict RFC 8259 JSON validation with line/column error pinpointing, syntax auto-fix (trailing commas, quotes), and structural metrics.",
    category: "developer",
    componentId: "JsonValidatorTool",
    iconName: "FileJson",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "JSON Validator & Linter Online - Validate RFC 8259 JSON",
      metaTitle: "JSON Validator & Linter - Validate, Format & Fix JSON | TypeKitTools",
      metaDescription:
        "Free RFC 8259 JSON validator and linter. Pinpoint exact line and column syntax errors, auto-fix trailing commas and quotes, and inspect structural metrics.",
      keywords: ["json validator", "validate json online", "json linter", "rfc 8259 validator", "fix json online", "json syntax checker"],
      faq: [
        {
          question: "Can this tool fix trailing commas and single quotes?",
          answer: "Yes, click 'Attempt Auto-Fix' to replace single quotes with standard double quotes and strip illegal trailing commas before closing brackets.",
        },
      ],
    },
    relatedToolSlugs: ["json-formatter", "xml-formatter", "base64"],
  },

  {
    id: "xml-formatter",
    slug: "xml-formatter",
    name: "XML Formatter & Beautifier",
    shortDescription:
      "Format, clean, and indent XML, RSS, SVG, and SOAP payloads with custom indentation, well-formedness validation, and tag counting.",
    category: "developer",
    componentId: "XmlFormatterTool",
    iconName: "Code2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "XML Formatter & Beautifier Online - Format XML, RSS, SVG & SOAP",
      metaTitle: "XML Formatter & Beautifier - Indent & Clean XML | TypeKitTools",
      metaDescription:
        "Fast online XML formatter and beautifier. Indent messy XML, RSS feeds, SVG code, and SOAP requests with customizable 2-space, 4-space, or tab indentation.",
      keywords: ["xml formatter", "xml beautifier", "format xml online", "xml indent", "pretty print xml", "xml prettifier"],
      faq: [
        {
          question: "Does this handle self-closing tags and XML namespaces?",
          answer: "Yes, self-closing tags like <item id='1'/> and namespaced elements are formatted cleanly without breaking schema declarations.",
        },
      ],
    },
    relatedToolSlugs: ["html-formatter", "json-validator", "html-entities"],
  },

  {
    id: "markdown-previewer",
    slug: "markdown-previewer",
    name: "Markdown Previewer & Editor",
    shortDescription:
      "Dual-pane real-time GitHub Flavored Markdown (GFM) editor and visual previewer with instant HTML export and syntax styling.",
    category: "developer",
    componentId: "MarkdownPreviewerTool",
    iconName: "FileDown",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Markdown Previewer Online - Real-Time GitHub Flavored Markdown",
      metaTitle: "Markdown Previewer & Editor - Live GFM Preview | TypeKitTools",
      metaDescription:
        "Live dual-pane GitHub Flavored Markdown (GFM) editor and previewer. Renders headings, code blocks, checklists, tables, and blockquotes with 1-click HTML download.",
      keywords: ["markdown previewer", "markdown editor online", "live markdown preview", "github flavored markdown", "convert markdown to html"],
      faq: [
        {
          question: "Can I download the rendered document as an HTML file?",
          answer: "Yes, click 'Download HTML' to export a standalone, styled HTML file ready for publishing or sharing.",
        },
      ],
    },
    relatedToolSlugs: ["diff-checker", "html-formatter", "character-counter"],
  },

  {
    id: "url-parser",
    slug: "url-parser",
    name: "URL Parser & URI Analyzer",
    shortDescription:
      "Deconstruct any URL into protocol, origin, host, domain, port, path segments, query parameter table, and hash fragment.",
    category: "developer",
    componentId: "UrlParserTool",
    iconName: "Globe",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "URL Parser & URI Analyzer Online - Break Down URL Components",
      metaTitle: "URL Parser Online - Analyze Protocol, Host, Path, Params | TypeKitTools",
      metaDescription:
        "Deconstruct URLs and URIs into protocol, host, port, path segments, and query parameters. Inspect query strings as a table and copy individual parameters.",
      keywords: ["url parser", "parse url online", "uri analyzer", "url query string parser", "url component decoder"],
      faq: [
        {
          question: "Does this tool work with relative URLs?",
          answer: "If you enter a domain or relative path without a scheme, TypeKitTools automatically prefixes https:// to parse all components accurately.",
        },
      ],
    },
    relatedToolSlugs: ["query-string-builder", "url-encode", "base64"],
  },

  {
    id: "query-string-builder",
    slug: "query-string-builder",
    name: "Query String Builder & URL Encoder",
    shortDescription:
      "Visual table editor to build, encode, and format URL query strings and API parameters with array notation (brackets, repeat, comma).",
    category: "developer",
    componentId: "QueryStringBuilderTool",
    iconName: "Link2",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Query String Builder - Visual URL Parameter Editor Online",
      metaTitle: "Query String Builder - Build & Encode URL Parameters | TypeKitTools",
      metaDescription:
        "Build and test URL query strings visually. Add, toggle, and reorder parameters with automatic URI encoding and customizable array formatting.",
      keywords: ["query string builder", "url parameter builder", "build query string", "url encode params", "api query builder"],
      faq: [
        {
          question: "What array formats are supported for duplicate keys?",
          answer: "You can format repeated parameters using standard bracket notation (key[]=1&key[]=2), repeated keys (key=1&key=2), or comma-separated values (key=1,2).",
        },
      ],
    },
    relatedToolSlugs: ["url-parser", "url-encode", "json-formatter"],
  },

  {
    id: "jwt-decoder",
    slug: "jwt-decoder",
    name: "JWT Decoder (JSON Web Token)",
    shortDescription:
      "Decode and inspect JSON Web Tokens (JWT) 100% locally in your browser with expiration countdown, header/payload formatting, and signature inspection.",
    category: "developer",
    componentId: "JwtDecoderTool",
    iconName: "KeyRound",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "JWT Decoder Online - 100% Client-Side JSON Web Token Inspector",
      metaTitle: "JWT Decoder - Decode Token Header & Payload Locally | TypeKitTools",
      metaDescription:
        "Fast, private JSON Web Token (JWT) decoder. Inspect claims (iss, sub, exp, iat), check token validity and expiration, and view header/payload with zero network transmission.",
      keywords: ["jwt decoder", "decode jwt online", "json web token inspector", "jwt expiry checker", "client side jwt decoder", "decode bearer token"],
      faq: [
        {
          question: "Is it safe to paste my production JWT tokens here?",
          answer: "Yes! TypeKitTools decodes JWTs 100% client-side in your local browser window. No token data, claims, or headers are ever transmitted to our servers.",
        },
      ],
    },
    relatedToolSlugs: ["base64", "json-validator", "hash-generator"],
  },

  {
    id: "color-converter",
    slug: "color-converter",
    name: "Color Converter (HEX, RGB, HSL, CMYK)",
    shortDescription:
      "Convert colors between HEX, RGB, RGBA, HSL, HSLA, and CMYK with native color picker, 8-digit hex alpha, and WCAG accessibility contrast check.",
    category: "developer",
    componentId: "ColorConverterTool",
    iconName: "Palette",
    isClientOnly: true,
    featured: true,
    seo: {
      title: "Color Converter - HEX, RGB, HSL, CMYK & WCAG Contrast Check",
      metaTitle: "Color Converter Online - HEX to RGB, HSL, CMYK | TypeKitTools",
      metaDescription:
        "Convert colors between HEX, RGB, RGBA, HSL, HSLA, and CMYK. Features interactive color swatch picker, 8-digit hex with alpha, and WCAG contrast ratio scoring.",
      keywords: ["color converter", "hex to rgb", "rgb to hsl", "hex to cmyk", "color code converter", "wcag contrast checker"],
      faq: [
        {
          question: "What is the difference between 6-digit and 8-digit HEX?",
          answer: "An 8-digit HEX color includes an extra pair of hex digits at the end to represent alpha transparency (e.g. #0D948880 is 50% opacity).",
        },
      ],
    },
    relatedToolSlugs: ["css-formatter", "css-escape", "hex-converter"],
  },
];

// Register all tools into the singleton registry
toolRegistry.registerAll(initialTools);
