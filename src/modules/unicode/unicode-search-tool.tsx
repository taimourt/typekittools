"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Filter } from "lucide-react";
import { allSymbols } from "@/data/symbols-data";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

export function UnicodeSearchTool() {
  const [query, setQuery] = useState("Euro");

  const results = allSymbols.filter((s) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.codepoint.toLowerCase().includes(q) ||
      s.character === q ||
      (s.altCodeWindows && s.altCodeWindows.toLowerCase().includes(q)) ||
      (s.htmlEntity && s.htmlEntity.toLowerCase().includes(q)) ||
      s.category.toLowerCase().includes(q) ||
      (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>SEARCH BY NAME, CODEPOINT (U+XXXX), OR SYMBOL</span>
          <ResetButton onReset={() => setQuery("")} disabled={!query} />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. U+20AC, Euro, Copyright, Arrow, ©..."
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>Found {results.length} Unicode matching characters</span>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {results.map((s) => (
          <div
            key={s.slug}
            className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center font-mono text-2xl font-bold text-foreground">
                {s.character}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-foreground">{s.name}</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                    {s.codepoint}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex flex-wrap gap-2">
                  <span>Category: <strong className="text-foreground">{s.category}</strong></span>
                  {s.altCodeWindows && <span>• Windows: <strong className="text-foreground font-mono">{s.altCodeWindows}</strong></span>}
                  {s.htmlEntity && <span>• HTML: <strong className="text-foreground font-mono">{s.htmlEntity}</strong></span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <CopyButton text={s.character} label="Copy Char" variant="outline" />
              <CopyButton text={s.codepoint} label="Copy U+" variant="secondary" />
            </div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="p-8 text-center border border-dashed border-border rounded-xl space-y-2">
            <p className="text-sm font-semibold text-foreground">
              No Unicode characters found for &quot;{query}&quot;
            </p>
            <p className="text-xs text-muted-foreground">
              Try searching by hex codepoint (e.g. U+00A9) or generic names like &quot;Dollar&quot;, &quot;Star&quot;, &quot;Plus&quot;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

