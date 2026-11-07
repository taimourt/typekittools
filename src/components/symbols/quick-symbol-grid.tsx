"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { allSymbols, symbolCategories, SymbolItem } from "@/data/symbols-data";
import { copyToClipboard } from "@/lib/utils";

interface QuickSymbolGridProps {
  initialCategory?: string;
  limit?: number;
  showCategoryTabs?: boolean;
}

export function QuickSymbolGrid({
  initialCategory = "all",
  limit = 24,
  showCategoryTabs = true,
}: QuickSymbolGridProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const filteredSymbols =
    selectedCategory === "all"
      ? allSymbols
      : allSymbols.filter((s) => s.category === selectedCategory);

  const displaySymbols = limit ? filteredSymbols.slice(0, limit) : filteredSymbols;

  const handleCopy = async (symbol: SymbolItem) => {
    const ok = await copyToClipboard(symbol.character);
    if (ok) {
      setCopiedChar(symbol.character);
      setTimeout(() => setCopiedChar(null), 1500);
    }
  };

  return (
    <div className="space-y-4">
      {/* Category Pills */}
      {showCategoryTabs && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Symbols
          </button>
          {symbolCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Symbol Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
        {displaySymbols.map((s) => {
          const isCopied = copiedChar === s.character;

          return (
            <button
              key={s.slug}
              onClick={() => handleCopy(s)}
              title={`${s.name} (${s.character}) - Click to copy\n${s.altCodeWindows ? s.altCodeWindows : ""}\n${s.macShortcut ? s.macShortcut : ""}`}
              className="group relative flex flex-col items-center justify-between p-3 h-24 rounded-xl border border-border bg-card shadow-sm hover:border-primary/60 hover:shadow-card-hover transition-all text-center select-none"
            >
              {/* Copied Overlay Badge */}
              {isCopied ? (
                <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center animate-in fade-in-50 zoom-in-95 duration-100 z-10">
                  <Check className="h-5 w-5 mb-0.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Copied!</span>
                </div>
              ) : null}

              {/* Character Glyph */}
              <span className="text-2xl sm:text-3xl font-mono text-foreground group-hover:scale-110 transition-transform mt-0.5">
                {s.character}
              </span>

              {/* Subtitle / Details */}
              <div className="w-full">
                <div className="text-[10px] font-medium text-foreground truncate max-w-full">
                  {s.name}
                </div>
                <div className="text-[9px] font-mono text-muted-foreground truncate opacity-80">
                  {s.altCodeWindows || s.codepoint}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Micro-toast instruction notice */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 px-1">
        <span className="flex items-center gap-1.5 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
          Click any symbol to copy directly to clipboard
        </span>
        <Link
          href="/symbols"
          className="text-primary hover:underline text-[11px] font-medium flex items-center gap-1"
        >
          View all 10,000+ symbols & alt codes <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

