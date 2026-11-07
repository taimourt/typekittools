"use client";

import React, { useState } from "react";
import { Search, Keyboard, Check, Info } from "lucide-react";
import { allSymbols } from "@/data/symbols-data";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

export function AltCodeFinderTool() {
  const [query, setQuery] = useState("");

  const altSymbols = allSymbols.filter((s) => s.altCodeWindows);

  const filtered = altSymbols.filter((s) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      s.character === q ||
      (s.altCodeWindows && s.altCodeWindows.toLowerCase().includes(q)) ||
      (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Notice box */}
      <div className="p-4 rounded-xl border border-sky-200 bg-sky-50 dark:bg-sky-950/30 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-xs flex items-start gap-3">
        <Info className="h-4 w-4 text-sky-600 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <span className="font-bold">How to use Windows Alt Codes:</span>
          <p>
            1. Ensure <strong>Num Lock</strong> is ON on your physical keyboard.<br />
            2. Hold down the left <strong>ALT</strong> key.<br />
            3. Type the number on the <strong>numeric keypad</strong> (the top row number keys will not work).<br />
            4. Release the ALT key. The symbol appears immediately.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>FIND BY SYMBOL, NAME, OR ALT CODE NUMBER</span>
          <ResetButton onReset={() => setQuery("")} disabled={!query} />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type e.g. 0169, Euro, Copyright, Degree, 248, ©..."
            className="w-full h-11 pl-9 pr-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Grid of Alt Code Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Found {filtered.length} Alt codes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((s) => (
            <div
              key={s.slug}
              className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/40 transition-colors flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-mono text-xl font-bold text-foreground">
                  {s.character}
                </span>
                <div>
                  <h4 className="text-xs font-bold text-foreground truncate max-w-[140px]">
                    {s.name}
                  </h4>
                  <div className="text-xs font-mono text-primary font-extrabold mt-0.5">
                    {s.altCodeWindows}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1 shrink-0">
                <CopyButton text={s.character} label="Char" size="sm" variant="outline" />
                <CopyButton text={s.altCodeWindows || ""} label="Code" size="sm" variant="secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

