import { UNICODE_CHARACTERS } from "@/data/unicode/characters-data";
import { UnicodeCharacterRecord } from "@/scripts/import-unicode";

export interface SearchOptions {
  query?: string;
  category?: string;
  block?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function searchUnicodeCharacters(options: SearchOptions = {}): PaginatedResult<UnicodeCharacterRecord> {
  const {
    query = "",
    category = "all",
    block = "all",
    page = 1,
    pageSize = 36,
  } = options;

  const q = query.toLowerCase().trim();

  // Filter records
  const filtered = UNICODE_CHARACTERS.filter((rec) => {
    // Category match
    if (category !== "all" && rec.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Block match
    if (block !== "all" && rec.block.toLowerCase() !== block.toLowerCase()) {
      return false;
    }

    if (!q) return true;

    // Search matches:
    // 1. Direct character glyph match
    if (rec.char === q) return true;

    // 2. Codepoint match (e.g. "U+20AC", "20AC", "u+20ac")
    const cleanQ = q.startsWith("u+") ? q.slice(2) : q;
    if (rec.hex.toLowerCase() === cleanQ || rec.codepoint.toLowerCase() === q) {
      return true;
    }

    // 3. Decimal match (e.g. "8364")
    if (rec.dec.toString() === q) return true;

    // 4. Official name match
    if (rec.name.toLowerCase().includes(q)) return true;

    // 5. Aliases & keywords
    if (rec.aliases.some((alias) => alias.toLowerCase().includes(q))) return true;

    // 6. Category / Block names
    if (rec.category.toLowerCase().includes(q) || rec.block.toLowerCase().includes(q)) return true;

    // 7. Alt code / HTML entity
    if (rec.altCodeWindows && rec.altCodeWindows.toLowerCase().includes(q)) return true;
    if (rec.htmlEntity && rec.htmlEntity.toLowerCase().includes(q)) return true;

    return false;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  const validPage = Math.max(1, Math.min(page, totalPages));
  const start = (validPage - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    total,
    page: validPage,
    pageSize,
    totalPages,
  };
}

export function getCharacterBySlugOrCodepoint(identifier: string): UnicodeCharacterRecord | undefined {
  const clean = identifier.toLowerCase().trim();
  return UNICODE_CHARACTERS.find((rec) => {
    return (
      rec.slug.toLowerCase() === clean ||
      rec.codepoint.toLowerCase() === clean ||
      rec.hex.toLowerCase() === clean ||
      rec.char === identifier
    );
  });
}

