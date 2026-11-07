export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  {
    title: "Symbols",
    href: "/symbols",
    description: "Alt codes, currency, arrows, math, and copy special characters.",
    children: [
      { title: "All Symbols Explorer", href: "/symbols", description: "Interactive symbol explorer & search" },
      { title: "Currency Symbols", href: "/symbols/currency", description: "$, €, £, ¥, ₹, ₿ and global money signs" },
      { title: "Arrow Symbols", href: "/symbols/arrows", description: "→, ←, ↑, ↓, ⇄, ➔ direction symbols" },
      { title: "Math & Scientific", href: "/symbols/math", description: "±, ×, ÷, ≠, ≈, ∞, √, ∑, π, °" },
      { title: "Punctuation & Legal", href: "/symbols/punctuation", description: "©, ®, ™, •, §, †, em dashes" },
      { title: "Stars & Sparkles", href: "/symbols/stars", description: "★, ☆, ✦, ✧, geometric shapes" },
      { title: "Checkmarks & Crosses", href: "/symbols/checkmarks", description: "✓, ✔, ✗, ✘, tick marks and crosses" },
    ],
  },
  {
    title: "Typing Tools",
    href: "/tools/keyboard",
    description: "Key event inspectors, typing tests, and layout guides.",
    children: [
      { title: "Key Code Tester", href: "/tools/keyboard/key-code-tester", description: "Inspect JavaScript event.key, code, which" },
      { title: "Typing Speed Test", href: "/tools/keyboard/typing-test", description: "Measure WPM and keystroke accuracy" },
      { title: "Keyboard Layout Guide", href: "/guides/keyboard-layouts", description: "ANSI vs ISO, US vs UK layouts" },
      { title: "Mac Option Shortcuts", href: "/guides/mac-option-shortcuts", description: "How to type special characters on Mac" },
    ],
  },
  {
    title: "Unicode Tools",
    href: "/tools/unicode",
    description: "Unicode inspectors, codepoints, and zero-width cleaners.",
    children: [
      { title: "Unicode Inspector", href: "/tools/unicode/character-inspector", description: "Inspect codepoints, utf-8 bytes, and categories" },
      { title: "Zero-Width Space Cleaner", href: "/tools/unicode/invisible-character-tool", description: "Detect and remove invisible characters" },
      { title: "Unicode Normalization Guide", href: "/guides/unicode-normalization", description: "NFC vs NFD forms explained" },
    ],
  },
  {
    title: "Text Generators",
    href: "/tools/generators",
    description: "Fancy Unicode styling, small text, upside down, and NATO phonetic.",
    children: [
      { title: "Fancy Text Generator", href: "/tools/generators/fancy-text", description: "Bold, script, gothic, fraktur fonts" },
      { title: "Small Text (Sub/Super)", href: "/tools/generators/small-text", description: "Subscript and superscript characters" },
      { title: "Case Converter", href: "/tools/developer/case-converter", description: "camelCase, snake_case, CONSTANT_CASE" },
    ],
  },
  {
    title: "Emoji Tools",
    href: "/tools/emoji",
    description: "Search emojis, copy symbols, and view combinations.",
    children: [
      { title: "Emoji Picker & Search", href: "/tools/emoji/picker", description: "Browse emojis with skin tone support" },
    ],
  },
  {
    title: "Developer Tools",
    href: "/tools/developer",
    description: "Base64, JSON formatting, URL encoding, hashes, and UUIDs.",
    children: [
      { title: "Base64 Encoder/Decoder", href: "/tools/developer/base64", description: "Encode & decode UTF-8 Base64 strings" },
      { title: "JSON Formatter & Validator", href: "/tools/developer/json-formatter", description: "Prettify, minify, and validate JSON" },
      { title: "URL Encoder/Decoder", href: "/tools/developer/url-encode", description: "Encode & decode URL URI components" },
      { title: "UUID & ULID Generator", href: "/tools/developer/uuid-generator", description: "Generate random UUID v4 and ULIDs" },
      { title: "Case Converter", href: "/tools/developer/case-converter", description: "camelCase, snake_case, kebab-case" },
      { title: "Hash Generator", href: "/tools/developer/hash-generator", description: "SHA-256, SHA-512, MD5" },
      { title: "Unix Timestamp Converter", href: "/tools/developer/timestamp-converter", description: "Convert epoch to human date" },
    ],
  },
  {
    title: "Guides",
    href: "/guides",
    description: "Reference tutorials and keyboard shortcuts.",
    children: [
      { title: "All Guides & Tutorials", href: "/guides", description: "Complete educational library" },
      { title: "Windows Alt Codes Master List", href: "/guides/alt-codes-list", description: "NumPad guide for Windows 10 & 11" },
      { title: "Mac Option Key Shortcuts", href: "/guides/mac-option-shortcuts", description: "Type accents & symbols on macOS" },
      { title: "Keyboard Layouts (ANSI vs ISO)", href: "/guides/keyboard-layouts", description: "US, UK, and Canadian differences" },
      { title: "Unicode Normalization (NFC vs NFD)", href: "/guides/unicode-normalization", description: "Developer string normalization" },
    ],
  },
];

export const footerNavigation = {
  categories: [
    { title: "Symbols & Alt Codes", href: "/symbols" },
    { title: "Typing & Keyboard Tools", href: "/tools/keyboard" },
    { title: "Unicode Utilities", href: "/tools/unicode" },
    { title: "Text Generators", href: "/tools/generators" },
    { title: "Emoji Directory", href: "/emoji" },
    { title: "Developer Tools", href: "/tools/developer" },
    { title: "Educational Articles", href: "/articles" },
    { title: "Typing Guides", href: "/guides" },
  ],
  popularTools: [
    { title: "Key Code Tester", href: "/tools/keyboard/key-code-tester" },
    { title: "Base64 Encoder & Decoder", href: "/tools/developer/base64" },
    { title: "JSON Formatter & Validator", href: "/tools/developer/json-formatter" },
    { title: "UUID & ULID Generator", href: "/tools/developer/uuid-generator" },
    { title: "Zero-Width Space Cleaner", href: "/tools/unicode/invisible-character-tool" },
    { title: "Case Converter", href: "/tools/developer/case-converter" },
    { title: "Currency Symbols", href: "/symbols/currency" },
  ],
  guides: [
    { title: "Windows Alt Codes Master List", href: "/guides/alt-codes-list" },
    { title: "Mac Option Key Shortcuts", href: "/guides/mac-option-shortcuts" },
    { title: "ANSI vs ISO Keyboard Differences", href: "/guides/keyboard-layouts" },
    { title: "Unicode Normalization Explained", href: "/guides/unicode-normalization" },
  ],
  company: [
    { title: "About TypeKitTools", href: "/about" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Contact", href: "/contact" },
  ],
};
