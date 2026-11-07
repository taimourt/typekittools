import { ToolDefinition, ToolCategory } from "./types";

/**
 * In-memory registry of all tools available on TypeKitTools.com
 */
class ToolRegistryManager {
  private tools: Map<string, ToolDefinition> = new Map();
  private toolsBySlug: Map<string, ToolDefinition> = new Map();

  /**
   * Register a tool definition
   */
  public register(tool: ToolDefinition): void {
    if (this.tools.has(tool.id)) {
      console.warn(`Tool with ID "${tool.id}" is already registered. Overwriting.`);
    }
    this.tools.set(tool.id, tool);
    this.toolsBySlug.set(tool.slug, tool);
  }

  /**
   * Register multiple tools at once
   */
  public registerAll(tools: ToolDefinition[]): void {
    for (const tool of tools) {
      this.register(tool);
    }
  }

  /**
   * Retrieve a tool by its unique ID
   */
  public getById(id: string): ToolDefinition | undefined {
    return this.tools.get(id);
  }

  /**
   * Retrieve a tool by its URL slug
   */
  public getBySlug(slug: string): ToolDefinition | undefined {
    return this.toolsBySlug.get(slug);
  }

  /**
   * Get all tools belonging to a category
   */
  public getByCategory(category: ToolCategory): ToolDefinition[] {
    return Array.from(this.tools.values()).filter(
      (tool) => tool.category === category
    );
  }

  /**
   * Get all featured tools
   */
  public getFeaturedTools(): ToolDefinition[] {
    return Array.from(this.tools.values()).filter((tool) => tool.featured);
  }

  /**
   * Get all registered tools
   */
  public getAllTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }

  public getAll(): ToolDefinition[] {
    return this.getAllTools();
  }

  /**
   * Search tools by query (name, description, keywords)
   */
  public searchTools(query: string): ToolDefinition[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAllTools();

    return Array.from(this.tools.values()).filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(q);
      const matchDesc = tool.shortDescription.toLowerCase().includes(q);
      const matchKeyword = tool.seo.keywords.some((kw) =>
        kw.toLowerCase().includes(q)
      );
      return matchName || matchDesc || matchKeyword;
    });
  }
}

export const toolRegistry = new ToolRegistryManager();

