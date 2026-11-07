import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { initialTools } from "@/lib/tools/definitions";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CategoryToolGrid } from "@/components/tools/category-tool-grid";
import { AdSlot } from "@/components/ads/ad-slot";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { ToolCategory } from "@/lib/tools/types";
import { siteConfig } from "@/config/site";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const categoryDetails: Record<
  string,
  {
    name: string;
    title: string;
    description: string;
    educationalLinks: Array<{ title: string; href: string; tag: string }>;
    relatedCategories: Array<{ name: string; href: string }>;
  }
> = {
  keyboard: {
    name: "Keyboard & Typing Tools",
    title: "Keyboard & Typing Tools - Key Code Testers & Typing Speed Tests",
    description:
      "Inspect JavaScript keyboard events in real-time, test your typing speed (WPM), practice keystroke accuracy, and learn keyboard layout shortcuts.",
    educationalLinks: [
      { title: "Windows Alt Codes Master List", href: "/guides/alt-codes-list", tag: "NumPad Reference" },
      { title: "How to Type on Mac with Option Key", href: "/guides/mac-option-shortcuts", tag: "macOS Guide" },
      { title: "US vs UK Keyboard Differences", href: "/guides/keyboard-layouts", tag: "Hardware Standards" },
    ],
    relatedCategories: [
      { name: "Symbols & Alt Codes", href: "/symbols" },
      { name: "Unicode Utilities", href: "/tools/unicode" },
      { name: "Developer Tools", href: "/tools/developer" },
    ],
  },
  unicode: {
    name: "Unicode Utilities",
    title: "Unicode Utilities - Character Inspectors & Zero-Width Cleaners",
    description:
      "Analyze Unicode code points, hex values, UTF-8 encodings, and remove invisible zero-width spaces that cause silent bugs in code and JSON data.",
    educationalLinks: [
      { title: "Unicode Normalization Explained (NFC vs NFD)", href: "/guides/unicode-normalization", tag: "Developer Guide" },
      { title: "Windows Alt Codes Master List", href: "/guides/alt-codes-list", tag: "Unicode Codes" },
    ],
    relatedCategories: [
      { name: "Developer Tools", href: "/tools/developer" },
      { name: "Symbols & Alt Codes", href: "/symbols" },
      { name: "Keyboard Tools", href: "/tools/keyboard" },
    ],
  },
  generators: {
    name: "Text Generators",
    title: "Text Generators - Fancy Fonts, Small Text & Unicode Styling",
    description:
      "Generate and 1-click copy aesthetic fancy fonts, superscript and subscript letters, strikethrough text, and NATO phonetic alphabet codes.",
    educationalLinks: [
      { title: "How to Type Special Characters on Mac", href: "/guides/mac-option-shortcuts", tag: "Shortcut Guide" },
      { title: "Windows Alt Codes Master List", href: "/guides/alt-codes-list", tag: "Symbol Reference" },
    ],
    relatedCategories: [
      { name: "Symbols & Alt Codes", href: "/symbols" },
      { name: "Emoji Tools", href: "/tools/emoji" },
      { name: "Developer Tools", href: "/tools/developer" },
    ],
  },
  developer: {
    name: "Developer Utilities",
    title: "Developer Tools - Base64, JSON Formatter, Hash, UUID & Case Converters",
    description:
      "Fast, private browser utilities for software developers: Base64 encode/decode, JSON prettify/minify, SHA-256 hashes, UUID generation, and timestamp calculations.",
    educationalLinks: [
      { title: "Unicode Normalization Explained", href: "/guides/unicode-normalization", tag: "String Comparison" },
      { title: "ANSI vs ISO Keyboard Differences", href: "/guides/keyboard-layouts", tag: "Developer Hardware" },
    ],
    relatedCategories: [
      { name: "Unicode Utilities", href: "/tools/unicode" },
      { name: "Keyboard Tools", href: "/tools/keyboard" },
      { name: "Text Generators", href: "/tools/generators" },
    ],
  },
  emoji: {
    name: "Emoji Tools",
    title: "Emoji Directory - Search Emojis & Copy Character Codes",
    description:
      "Search, filter, and 1-click copy thousands of emojis organized by categories with skin tone variations.",
    educationalLinks: [
      { title: "Unicode Normalization Explained", href: "/guides/unicode-normalization", tag: "Emoji Encoding" },
    ],
    relatedCategories: [
      { name: "Symbols & Alt Codes", href: "/symbols" },
      { name: "Text Generators", href: "/tools/generators" },
    ],
  },
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const info = categoryDetails[resolvedParams.category];
  if (!info) return {};

  const canonicalUrl = `${siteConfig.url}/tools/${resolvedParams.category}`;

  return {
    title: info.title,
    description: info.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: info.title,
      description: info.description,
      url: canonicalUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const catSlug = resolvedParams.category as ToolCategory;
  const info = categoryDetails[catSlug];

  if (!info) {
    notFound();
  }

  const tools = initialTools.filter((t) => t.category === catSlug);

  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: "Tools", href: "/tools" }, { label: info.name }]}
      />

      {/* Header */}
      <div className="space-y-3">
        <Badge variant="teal" className="uppercase font-mono text-[10px]">
          Category Toolkit
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {info.name}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {info.description}
        </p>
      </div>

      {/* Interactive Tool Grid with Real-time Filter */}
      <CategoryToolGrid tools={tools} categoryName={info.name} />

      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* Relevant Educational Guides */}
      {info.educationalLinks && info.educationalLinks.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border/60">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-base font-bold text-foreground">
              Educational Guides & Reference Tutorials
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {info.educationalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-primary font-semibold uppercase">
                    {link.tag}
                  </span>
                  <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                </div>
                <div className="pt-2 text-[11px] text-primary flex items-center gap-1 mt-2">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Categories */}
      {info.relatedCategories && info.relatedCategories.length > 0 && (
        <section className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Explore Related Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {info.relatedCategories.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <span>{c.name}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
