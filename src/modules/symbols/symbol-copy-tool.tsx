"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Trash2, Sparkles, ArrowRight } from "lucide-react";
import { allSymbols, symbolCategories, SymbolItem } from "@/data/symbols-data";
import { copyToClipboard } from "@/lib/utils";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

export function SymbolCopyTool() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [tray, setTray] = useState("");
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const filtered = allSymbols.filter((s) => {
    const matchCat = selectedCat === "all" || s.category === selectedCat;
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.character === q ||
      s.codepoint.toLowerCase().includes(q) ||
      (s.altCodeWindows && s.altCodeWindows.toLowerCase().includes(q)) ||
      (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  const handleCopySingle = async (s: SymbolItem) => {
    await copyToClipboard(s.character);
    setCopiedSymbol(s.character);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  const handleAddToTray = (char: string) => {
    setTray((prev) => prev + char);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbol (e.g. Euro, Arrow, Degree)..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          <button
            onClick={() => setSelectedCat("all")}
            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCat === "all"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {symbolCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCat(c.slug)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCat === c.slug
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Copy Tray (Collected symbols) */}
      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-primary">
          <span>SYMBOL TRAY (CLICK SYMBOLS TO COMBINE)</span>
          <div className="flex items-center gap-2">
            <ResetButton onReset={() => setTray("")} label="Clear Tray" disabled={!tray} />
            <CopyButton text={tray} label="Copy All in Tray" variant="default" disabled={!tray} />
          </div>
        </div>
        <div className="min-h-12 p-3 rounded-lg bg-card border border-border font-mono text-xl sm:text-2xl text-foreground flex items-center justify-between break-all select-all">
          {tray || <span className="text-muted-foreground text-xs font-sans">Click any symbol below to append here...</span>}
        </div>
      </div>

      {/* Symbols Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {filtered.length} symbols</span>
          <span>Click to copy or add to tray</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {filtered.map((s) => {
            const isCopied = copiedSymbol === s.character;
            return (
              <div
                key={s.slug}
                className="group relative flex flex-col items-center justify-between p-2.5 h-24 rounded-xl border border-border bg-card shadow-sm hover:border-primary transition-all text-center"
              >
                {/* 1-Click Copy Overlay */}
                {isCopied && (
                  <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center z-10 animate-in fade-in-50">
                    <Check className="h-4 w-4 mb-0.5" />
                    <span className="text-[10px] font-bold">Copied!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleCopySingle(s)}
                  className="w-full flex-1 flex flex-col items-center justify-center focus:outline-none"
                  title="Click to copy single symbol"
                >
                  <span className="text-2xl sm:text-3xl font-mono text-foreground group-hover:scale-110 transition-transform">
                    {s.character}
                  </span>
                  <span className="text-[10px] font-medium text-foreground truncate w-full mt-1">
                    {s.name}
                  </span>
                </button>

                <div className="w-full flex items-center justify-between pt-1 border-t border-border/40 text-[9px] text-muted-foreground font-mono">
                  <span>{s.altCodeWindows ? s.altCodeWindows.split(" ")[1] : s.codepoint}</span>
                  <button
                    type="button"
                    onClick={() => handleAddToTray(s.character)}
                    className="text-primary hover:underline font-bold"
                    title="Add to tray"
                  >
                    +Tray
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

