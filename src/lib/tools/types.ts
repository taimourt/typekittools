import { ComponentType } from "react";
import { z } from "zod";

export type ToolCategory =
  | "symbols"
  | "keyboard"
  | "unicode"
  | "generators"
  | "developer"
  | "emoji";

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolHowToStep {
  title: string;
  instruction: string;
}

export interface ToolSeoMetadata {
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  faq: ToolFaq[];
  howToSteps?: ToolHowToStep[];
}

export interface ToolDefinition<TInput = any, TOutput = any> {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  componentId: string;
  iconName: string; // Lucide icon name
  isClientOnly: boolean;
  featured?: boolean;

  // Validation schema
  inputSchema?: z.ZodSchema<TInput>;
  
  // SEO & Content
  seo: ToolSeoMetadata;

  // Cross-linking
  relatedToolSlugs: string[];
  relatedSymbolCollections?: string[];
}

export interface ToolComponentProps {
  tool: ToolDefinition;
}

