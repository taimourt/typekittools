"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Command,
  ArrowRight,
  Sparkles,
  Keyboard,
  FileText,
  Layers,
  Copy,
  Check,
  X,
} from "lucide-react";
import { querySearchIndex, SearchItem, SearchResultType } from "@/data/search-index";
import { copyToClipboard } from "@/lib/utils";

interface UniversalSearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function UniversalSearchDialog({ open, onClose }: UniversalSearchDialogProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedChar, setCopiedChar] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce input to avoid high CPU churn on fast keystrokes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setSelectedIndex(0);
    }, 120);
    return () => clearTimeout(timer);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const resultsGrouped = querySearchIndex(debouncedQuery, 8);
  const allResultsFlat: SearchItem[] = [
    ...resultsGrouped.tool,
    ...resultsGrouped.symbol,
    ...resultsGrouped.guide,
    ...resultsGrouped.category,
  ];

  const totalResultsCount = allResultsFlat.length;

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          totalResultsCount > 0 ? (prev + 1) % totalResultsCount : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          totalResultsCount > 0 ? (prev - 1 + totalResultsCount) % totalResultsCount : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = allResultsFlat[selectedIndex];
        if (selected) {
          if (selected.type === "symbol" && selected.previewChar) {
            handleCopyChar(selected.previewChar);
          } else {
            router.push(selected.href);
            onClose();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, totalResultsCount, selectedIndex, allResultsFlat, router, onClose]);

  const handleCopyChar = async (char: string) => {
    await copyToClipboard(char);
    setCopiedChar(char);
    setTimeout(() => {
      setCopiedChar(null);
      onClose();
    }, 800);
  };

  if (!open) return null;

  let currentGlobalIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Search Modal Card */}
      <div className="relative z-50 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border h-14">
          <Search className="h-5 w-5 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, symbols, alt codes, guides, and categories..."
            className="w-full bg-transparent border-0 outline-none text-foreground text-sm sm:text-base placeholder:text-muted-foreground/70"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded bg-muted/60 ml-2"
            >
              Clear
            </button>
          ) : (
            <span className="text-[10px] font-mono text-muted-foreground/70 border border-border/60 bg-muted/40 px-2 py-0.5 rounded">
              ESC to close
            </span>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {debouncedQuery.trim() === "" ? (
            /* Suggested / Empty state */
            <div className="py-6 px-4 space-y-4 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Key Code Tester",
                  "Base64 Encoder",
                  "Euro Sign €",
                  "Alt Codes List",
                  "Mac Option Key",
                  "Zero Width Cleaner",
                  "JSON Formatter",
                  "Arrow Symbols",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs text-foreground transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResultsCount > 0 ? (
            /* Grouped Results */
            <div className="space-y-4">
              {/* Tools Group */}
              {resultsGrouped.tool.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span>Tools & Utilities ({resultsGrouped.tool.length})</span>
                  </div>
                  {resultsGrouped.tool.map((item) => {
                    currentGlobalIndex++;
                    const isSelected = selectedIndex === currentGlobalIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {item.subtitle}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Symbols Group */}
              {resultsGrouped.symbol.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Keyboard className="h-3 w-3 text-emerald-600" />
                    <span>Symbols & Alt Codes ({resultsGrouped.symbol.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {resultsGrouped.symbol.map((item) => {
                      currentGlobalIndex++;
                      const isSelected = selectedIndex === currentGlobalIndex;
                      const isCopied = copiedChar === item.previewChar;

                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (item.previewChar) handleCopyChar(item.previewChar);
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl border border-border/50 cursor-pointer transition-colors ${
                            isSelected ? "bg-primary/10 border-primary" : "hover:bg-muted/60 bg-card"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-mono text-lg font-bold text-foreground">
                              {item.previewChar}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-foreground truncate max-w-[150px]">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[150px]">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] px-2 py-0.5 rounded bg-muted/60 text-muted-foreground font-mono flex items-center gap-1">
                            {isCopied ? (
                              <>
                                <Check className="h-3 w-3 text-emerald-600" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Educational Guides Group */}
              {resultsGrouped.guide.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <FileText className="h-3 w-3 text-indigo-600" />
                    <span>Typing Guides ({resultsGrouped.guide.length})</span>
                  </div>
                  {resultsGrouped.guide.map((item) => {
                    currentGlobalIndex++;
                    const isSelected = selectedIndex === currentGlobalIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {item.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-primary font-medium shrink-0 ml-2">
                          Read Guide &rarr;
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Categories Group */}
              {resultsGrouped.category.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Layers className="h-3 w-3 text-amber-600" />
                    <span>Categories ({resultsGrouped.category.length})</span>
                  </div>
                  {resultsGrouped.category.map((item) => {
                    currentGlobalIndex++;
                    const isSelected = selectedIndex === currentGlobalIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          router.push(item.href);
                          onClose();
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-foreground">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {item.subtitle}
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* No results empty state */
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-foreground">
                No matching results for &quot;{debouncedQuery}&quot;
              </p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try searching for a character name like &quot;Euro&quot;, a tool like &quot;Base64&quot;, or keyboard shortcut terms like &quot;Alt Code&quot;.
              </p>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 border-t border-border bg-muted/30 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span>Client-Side Instant Index</span>
        </div>
      </div>
    </div>
  );
}

