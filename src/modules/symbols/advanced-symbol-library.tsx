"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Copy,
  Check,
  Star,
  Clock,
  Layers,
  Info,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { UnicodeCharacterRecord } from "@/scripts/import-unicode";
import { searchUnicodeCharacters } from "@/lib/unicode/search";
import { UNICODE_CHARACTERS } from "@/data/unicode/characters-data";
import { copyToClipboard } from "@/lib/utils";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

export function AdvancedSymbolLibrary() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedChar, setSelectedChar] = useState<UnicodeCharacterRecord | null>(UNICODE_CHARACTERS[1]); // default to Euro
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedSet, setSelectedSet] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites" | "recent">("all");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  // Load favorites & recent from localStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("tkt_symbol_favorites");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedRecent = localStorage.getItem("tkt_symbol_recent");
      if (savedRecent) setRecent(JSON.parse(savedRecent));
    } catch (e) {
      // LocalStorage access exception safe
    }
  }, []);

  // Save favorites & recent
  const toggleFavorite = (codepoint: string) => {
    const updated = favorites.includes(codepoint)
      ? favorites.filter((c) => c !== codepoint)
      : [...favorites, codepoint];
    setFavorites(updated);
    try {
      localStorage.setItem("tkt_symbol_favorites", JSON.stringify(updated));
    } catch {}
  };

  const recordRecent = (codepoint: string) => {
    const updated = [codepoint, ...recent.filter((c) => c !== codepoint)].slice(0, 20);
    setRecent(updated);
    try {
      localStorage.setItem("tkt_symbol_recent", JSON.stringify(updated));
    } catch {}
  };

  const handleCopySingle = async (rec: UnicodeCharacterRecord) => {
    const ok = await copyToClipboard(rec.char);
    if (ok) {
      setCopiedChar(rec.char);
      recordRecent(rec.codepoint);
      setTimeout(() => setCopiedChar(null), 1500);
    }
  };

  const handleToggleSelect = (char: string) => {
    setSelectedSet((prev) =>
      prev.includes(char) ? prev.filter((c) => c !== char) : [...prev, char]
    );
  };

  // Perform paginated search
  const searchResults = searchUnicodeCharacters({
    query,
    category: selectedCategory,
    page,
    pageSize: 36,
  });

  // Handle active tab filter
  let displayedItems = searchResults.items;
  if (activeTab === "favorites") {
    displayedItems = UNICODE_CHARACTERS.filter((c) => favorites.includes(c.codepoint));
  } else if (activeTab === "recent") {
    displayedItems = recent
      .map((cp) => UNICODE_CHARACTERS.find((c) => c.codepoint === cp))
      .filter(Boolean) as UnicodeCharacterRecord[];
  }

  // Unique categories list
  const categories = [
    "all",
    "Currency Symbol",
    "Math Symbol",
    "Other Symbol",
    "Other Punctuation",
    "Dash Punctuation",
  ];

  const relatedSymbols = selectedChar
    ? UNICODE_CHARACTERS.filter(
        (c) => c.category === selectedChar.category && c.codepoint !== selectedChar.codepoint
      ).slice(0, 6)
    : [];

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, symbol, codepoint (U+20AC), or decimal (8364)..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-input bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/70"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted/60"
              >
                Clear
              </button>
            )}
          </div>

          {/* Mode Toggles */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="inline-flex rounded-lg bg-muted p-1 text-xs">
              <button
                onClick={() => {
                  setActiveTab("all");
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === "all" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground"
                }`}
              >
                All Symbols
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === "favorites" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span>Favorites ({favorites.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("recent")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === "recent" ? "bg-card text-foreground font-semibold shadow-sm" : "text-muted-foreground"
                }`}
              >
                <Clock className="h-3 w-3" />
                <span>Recent</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMultiSelectMode(!multiSelectMode);
                setSelectedSet([]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors select-none ${
                multiSelectMode
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              {multiSelectMode ? "Cancel Select" : "Multi-Select"}
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Select Floating Action Bar */}
      {multiSelectMode && (
        <div className="p-4 rounded-xl border border-primary/30 bg-primary/10 flex flex-wrap items-center justify-between gap-3 animate-in fade-in-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-primary">
              Selected: {selectedSet.length} symbols
            </span>
            <div className="p-1 px-3 rounded bg-card border font-mono text-lg text-foreground min-w-32 tracking-wider">
              {selectedSet.join("") || <span className="text-xs font-sans text-muted-foreground">Click symbols below</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ResetButton onReset={() => setSelectedSet([])} disabled={selectedSet.length === 0} label="Clear" />
            <CopyButton
              text={selectedSet.join("")}
              label="Copy Selected String"
              variant="default"
              disabled={selectedSet.length === 0}
            />
          </div>
        </div>
      )}

      {/* Main Grid & Detail Panel Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Character Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {displayedItems.length} of {activeTab === "all" ? searchResults.total : displayedItems.length} characters
            </span>
            <span>Click to inspect details</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
            {displayedItems.map((rec) => {
              const isSelected = selectedChar?.codepoint === rec.codepoint;
              const isMultiPicked = selectedSet.includes(rec.char);
              const isCopied = copiedChar === rec.char;
              const isFav = favorites.includes(rec.codepoint);

              return (
                <div
                  key={rec.codepoint}
                  onClick={() => {
                    if (multiSelectMode) {
                      handleToggleSelect(rec.char);
                    } else {
                      setSelectedChar(rec);
                    }
                  }}
                  className={`group relative flex flex-col items-center justify-between p-3 h-28 rounded-xl border cursor-pointer transition-all select-none text-center ${
                    isMultiPicked
                      ? "border-primary bg-primary/10 ring-2 ring-primary"
                      : isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/50 shadow-sm"
                  }`}
                >
                  {/* Favorite indicator pin */}
                  {isFav && (
                    <Star className="absolute top-1.5 left-1.5 h-3 w-3 text-amber-500 fill-amber-500" />
                  )}

                  {/* Copied Overlay */}
                  {isCopied && (
                    <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center z-10 animate-in fade-in-50">
                      <Check className="h-5 w-5 mb-0.5" />
                      <span className="text-[10px] font-bold uppercase">Copied!</span>
                    </div>
                  )}

                  {/* Glyph */}
                  <span className="text-3xl font-mono text-foreground group-hover:scale-110 transition-transform mt-1">
                    {rec.char}
                  </span>

                  {/* Name & Codepoint */}
                  <div className="w-full">
                    <span className="text-[10px] font-bold text-foreground truncate block">
                      {rec.name}
                    </span>
                    <span className="text-[9px] font-mono text-muted-foreground truncate block opacity-70">
                      {rec.codepoint}
                    </span>
                  </div>

                  {/* Quick Copy Action on Hover */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopySingle(rec);
                    }}
                    className="absolute bottom-1 right-1 p-1 rounded bg-muted/80 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy character"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>

          {displayedItems.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border rounded-2xl space-y-2">
              <p className="text-sm font-semibold text-foreground">
                No matching Unicode characters found
              </p>
              <p className="text-xs text-muted-foreground">
                Try searching for another codepoint, symbol name, or category.
              </p>
            </div>
          )}

          {/* Pagination Controls */}
          {activeTab === "all" && searchResults.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-border/60 text-xs">
              <span className="text-muted-foreground font-mono">
                Page {searchResults.page} of {searchResults.totalPages}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={searchResults.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
                </button>
                <button
                  disabled={searchResults.page >= searchResults.totalPages}
                  onClick={() => setPage((p) => Math.min(searchResults.totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors flex items-center gap-1"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Unicode Detail Side-Panel */}
        {selectedChar && (
          <div className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-5 sticky top-20">
            {/* Header / Big Preview */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center font-mono text-4xl font-extrabold text-foreground shadow-sm">
                  {selectedChar.char}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {selectedChar.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono font-bold text-primary">
                      {selectedChar.codepoint}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {selectedChar.categoryCode}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite(selectedChar.codepoint)}
                className="p-2 rounded-lg text-muted-foreground hover:text-amber-500 transition-colors"
                title={favorites.includes(selectedChar.codepoint) ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={`h-5 w-5 ${
                    favorites.includes(selectedChar.codepoint)
                      ? "text-amber-500 fill-amber-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>

            {/* Quick Action Copy Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <CopyButton
                text={selectedChar.char}
                label="Copy Character"
                variant="default"
                className="w-full"
              />
              <CopyButton
                text={selectedChar.codepoint}
                label="Copy U+ Code"
                variant="outline"
                className="w-full"
              />
            </div>

            {/* Detailed Properties Table */}
            <div className="space-y-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground text-[10px]">
                Character Properties
              </span>

              <div className="space-y-1.5 font-mono bg-muted/20 p-3 rounded-xl border border-border/60">
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Decimal:</span>
                  <span className="font-bold text-foreground">{selectedChar.dec}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">UTF-8 Bytes:</span>
                  <span className="font-bold text-foreground">{selectedChar.utf8Bytes}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">HTML Entity:</span>
                  <span className="font-bold text-foreground">
                    {selectedChar.htmlEntity || selectedChar.htmlDec}
                  </span>
                </div>
                {selectedChar.altCodeWindows && (
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Windows Alt:</span>
                    <span className="font-bold text-primary">{selectedChar.altCodeWindows}</span>
                  </div>
                )}
                {selectedChar.macShortcut && (
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Mac Shortcut:</span>
                    <span className="font-bold text-foreground">{selectedChar.macShortcut}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1">
                  <span className="text-muted-foreground">Unicode Block:</span>
                  <span className="font-sans font-medium text-foreground">{selectedChar.block}</span>
                </div>
              </div>
            </div>

            {/* Link to Dedicated Detail Page */}
            <Link
              href={`/symbols/detail/${selectedChar.slug}`}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <span>View Full Character Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            {/* Related Symbols */}
            {relatedSymbols.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Related Characters ({selectedChar.category})
                </span>
                <div className="flex flex-wrap gap-2">
                  {relatedSymbols.map((rel) => (
                    <button
                      key={rel.codepoint}
                      onClick={() => setSelectedChar(rel)}
                      title={rel.name}
                      className="w-9 h-9 rounded-lg border border-border bg-card font-mono text-base font-bold text-foreground hover:border-primary transition-colors flex items-center justify-center"
                    >
                      {rel.char}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

