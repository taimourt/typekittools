import { initialTools } from "@/lib/tools/definitions";
import { allSymbols } from "./symbols-data";
import { guidesData } from "./guides-data";

export type SearchResultType = "tool" | "symbol" | "category" | "guide";

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  type: SearchResultType;
  href: string;
  badge?: string;
  previewChar?: string;
  keywords: string[];
}

export function buildSearchIndex(): SearchItem[] {
  const index: SearchItem[] = [];

  // 1. Index Tools
  for (const t of initialTools) {
    index.push({
      id: `tool-${t.id}`,
      title: t.name,
      subtitle: t.shortDescription,
      type: "tool",
      href: `/tools/${t.category}/${t.slug}`,
      badge: t.category,
      keywords: [t.name, t.slug, t.category, ...t.seo.keywords],
    });
  }

  // 2. Index Symbols
  for (const s of allSymbols) {
    index.push({
      id: `symbol-${s.slug}`,
      title: `${s.name} (${s.character})`,
      subtitle: `${s.codepoint}${s.altCodeWindows ? ` • ${s.altCodeWindows}` : ""}${s.macShortcut ? ` • Mac: ${s.macShortcut}` : ""}${s.wordShortcut ? ` • Word: ${s.wordShortcut}` : ""}`,
      type: "symbol",
      href: `/symbols/${s.category}`,
      badge: s.category,
      previewChar: s.character,
      keywords: [
        s.name,
        s.character,
        s.codepoint,
        s.category,
        s.slug,
        s.altCodeWindows || "",
        s.macShortcut || "",
        s.wordShortcut || "",
        ...(s.keywords || []),
      ],
    });
  }

  // 3. Index Categories
  const categories = [
    { title: "Symbols & Special Characters", slug: "symbols", desc: "Alt codes, currency, arrows, math, and punctuation characters.", href: "/symbols" },
    { title: "Copyright & Trademark Glyphs", slug: "legal", desc: "Copyright ©, Registered ®, Trademark ™, and Service Mark ℠ shortcuts and Alt codes.", href: "/symbols/legal" },
    { title: "Spanish & Foreign Accents", slug: "accents", desc: "Shortcuts for accented vowels and consonants: ñ, Ñ, é, á, ó, à, ü, ç, ¿, ¡.", href: "/symbols/accents" },
    { title: "Hearts & Emoticon Symbols", slug: "hearts", desc: "Alt codes, keyboard shortcuts, and copy-paste for black heart ♥, white heart ♡, and red heart ❤.", href: "/symbols/hearts" },
    { title: "Geometric Shapes & Squares", slug: "shapes", desc: "Solid squares ■, hollow squares □, up/down triangles ▲ ▼, and diamonds ◆.", href: "/symbols/shapes" },
    { title: "Keyboard Signs & Punctuation", slug: "keyboard-signs", desc: "Alt codes and keyboard shortcuts for Ampersand &, At-sign @, Hash #, Section §, Bullet •, Caret ^, Pipe |, Tilde ~.", href: "/symbols/keyboard" },
    { title: "Keyboard & Typing Tools", slug: "keyboard", desc: "Key code testers, typing speed tests, and keyboard event inspectors.", href: "/tools/keyboard" },
    { title: "Unicode Utilities", slug: "unicode", desc: "Unicode inspectors, codepoint lookup, and zero-width space cleaners.", href: "/tools/unicode" },
    { title: "Text Generators", slug: "generators", desc: "Fancy fonts, small text, upside down, and NATO phonetic alphabet.", href: "/tools/generators" },
    { title: "Developer Utilities", slug: "developer", desc: "Base64, JSON formatter, URL encoder, hash, UUID, and case converters.", href: "/tools/developer" },
    { title: "Emoji Directory", slug: "emoji", desc: "Categorized emoji search, skin tone variations, and copy shortcuts.", href: "/tools/emoji" },
    { title: "Typing & Keyboard Guides", slug: "guides", desc: "Reference guides for Windows Alt codes, Mac Option shortcuts, and layouts.", href: "/guides" },
  ];

  for (const c of categories) {
    index.push({
      id: `category-${c.slug}`,
      title: c.title,
      subtitle: c.desc,
      type: "category",
      href: c.href,
      badge: "Category",
      keywords: [c.title, c.slug, "category", "directory"],
    });
  }

  // 4. Index Educational Guides
  for (const g of Object.values(guidesData)) {
    index.push({
      id: `guide-${g.slug}`,
      title: g.title,
      subtitle: g.summary,
      type: "guide",
      href: `/guides/${g.slug}`,
      badge: g.category,
      keywords: [g.title, g.slug, g.category, g.subtitle],
    });
  }

  return index;
}

export const searchIndex = buildSearchIndex();

/**
 * Fast client-side multi-field query matching
 */
export function querySearchIndex(query: string, limit = 15): Record<SearchResultType, SearchItem[]> {
  const q = query.toLowerCase().trim();
  const grouped: Record<SearchResultType, SearchItem[]> = {
    tool: [],
    symbol: [],
    category: [],
    guide: [],
  };

  if (!q) return grouped;

  for (const item of searchIndex) {
    // Title match has highest priority
    const titleMatch = item.title.toLowerCase().includes(q);
    // Subtitle / description match
    const subtitleMatch = item.subtitle.toLowerCase().includes(q);
    // Preview character exact match (e.g. typing '$' or '€')
    const charMatch = item.previewChar && item.previewChar === q;
    // Keyword match
    const keywordMatch = item.keywords.some((k) => k.toLowerCase().includes(q));

    if (titleMatch || subtitleMatch || charMatch || keywordMatch) {
      if (grouped[item.type].length < limit) {
        grouped[item.type].push(item);
      }
    }
  }

  return grouped;
}

