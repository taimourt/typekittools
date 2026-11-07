import { describe, it, expect } from "vitest";
import { toolRegistry } from "../../src/lib/tools/registry";
import { initialTools } from "../../src/lib/tools/definitions";

describe("ToolRegistry", () => {
  it("should have initial tools registered", () => {
    expect(toolRegistry.getAllTools().length).toBeGreaterThanOrEqual(initialTools.length);
  });

  it("should retrieve a tool by its unique id", () => {
    const tool = toolRegistry.getById("key-code-tester");
    expect(tool).toBeDefined();
    expect(tool?.name).toBe("Key Code Tester & Event Inspector");
    expect(tool?.category).toBe("keyboard");
  });

  it("should retrieve a tool by its slug", () => {
    const tool = toolRegistry.getBySlug("base64");
    expect(tool).toBeDefined();
    expect(tool?.id).toBe("base64");
  });

  it("should filter tools by category", () => {
    const devTools = toolRegistry.getByCategory("developer");
    expect(devTools.length).toBeGreaterThan(0);
    expect(devTools.every((t) => t.category === "developer")).toBe(true);
  });

  it("should find featured tools", () => {
    const featured = toolRegistry.getFeaturedTools();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.every((t) => t.featured)).toBe(true);
  });

  it("should search tools by query keywords", () => {
    const searchResults = toolRegistry.searchTools("base64");
    expect(searchResults.some((t) => t.id === "base64")).toBe(true);
  });
});

