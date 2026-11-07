import { describe, it, expect } from "vitest";
import { querySearchIndex, searchIndex } from "../../src/data/search-index";
import { allSymbols } from "../../src/data/symbols-data";
import { guidesData } from "../../src/data/guides-data";

describe("Universal Search Index Unit Tests", () => {
  it("should build a comprehensive search index", () => {
    expect(searchIndex.length).toBeGreaterThan(30);
  });

  it("should find tools by name or description", () => {
    const results = querySearchIndex("base64");
    expect(results.tool.length).toBeGreaterThan(0);
    expect(results.tool.some((t) => t.title.toLowerCase().includes("base64"))).toBe(true);
  });

  it("should find symbols by name or character", () => {
    const resultsEuro = querySearchIndex("euro");
    expect(resultsEuro.symbol.length).toBeGreaterThan(0);
    expect(resultsEuro.symbol.some((s) => s.previewChar === "€")).toBe(true);

    const resultsChar = querySearchIndex("★");
    expect(resultsChar.symbol.length).toBeGreaterThan(0);
    expect(resultsChar.symbol.some((s) => s.previewChar === "★")).toBe(true);
  });

  it("should find educational guides by topic", () => {
    const results = querySearchIndex("alt codes");
    expect(results.guide.length).toBeGreaterThan(0);
    expect(results.guide.some((g) => g.title.toLowerCase().includes("alt codes"))).toBe(true);
  });

  it("should find categories by name", () => {
    const results = querySearchIndex("developer");
    expect(results.category.length).toBeGreaterThan(0);
  });

  it("should return empty groupings when query is empty", () => {
    const results = querySearchIndex("");
    expect(results.tool.length).toBe(0);
    expect(results.symbol.length).toBe(0);
    expect(results.guide.length).toBe(0);
    expect(results.category.length).toBe(0);
  });
});

