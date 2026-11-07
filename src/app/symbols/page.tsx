import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdvancedSymbolLibrary } from "@/modules/symbols/advanced-symbol-library";
import { AdSlot } from "@/components/ads/ad-slot";
import { Sparkles, Shield, Keyboard } from "lucide-react";
import Link from "next/link";
import { symbolCategories } from "@/data/symbols-data";

export const metadata: Metadata = {
  title: "Unicode Symbol Library & Character Explorer - Copy Special Characters",
  description:
    "Comprehensive Unicode 16.0 symbol library. Search, inspect, multi-select, and 1-click copy currency signs ($, €, £, ¥), arrows, math symbols, stars, and Windows Alt codes.",
};

export default function SymbolsPage() {
  return (
    <div className="container max-w-6xl py-6 space-y-8">
      <Breadcrumbs items={[{ label: "Symbols & Special Characters" }]} />

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="teal" className="uppercase font-mono text-[10px]">
            Unicode 16.0 Database
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            Official UCD Dataset
          </Badge>
          <Badge variant="outline" className="text-[10px]">
            Zero Server Latency
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Unicode Symbol Library & Character Explorer
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          Search by symbol name, character glyph, hex codepoint (U+XXXX), or decimal code. Click any character to inspect its UTF-8 bytes, HTML entities, Windows Alt codes, and macOS shortcuts, or use Multi-Select to combine multiple symbols.
        </p>
      </div>

      {/* Advanced Symbol Library Interface */}
      <AdvancedSymbolLibrary />

      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* Quick Category Deep Links */}
      <section className="space-y-3 pt-6 border-t border-border/60">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Specialized Symbol Collections
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {symbolCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/symbols/${c.slug}`}
              className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all text-center group"
            >
              <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                {c.name}
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
