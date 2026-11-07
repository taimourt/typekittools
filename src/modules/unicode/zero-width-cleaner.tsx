"use client";

import React, { useState } from "react";
import { Copy, Check, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

// List of invisible and zero-width Unicode characters
const INVISIBLE_CHARS: { [key: string]: { name: string; hex: string } } = {
  "\u200B": { name: "Zero-Width Space (ZWSP)", hex: "U+200B" },
  "\u200C": { name: "Zero-Width Non-Joiner (ZWNJ)", hex: "U+200C" },
  "\u200D": { name: "Zero-Width Joiner (ZWJ)", hex: "U+200D" },
  "\uFEFF": { name: "Zero-Width No-Break Space (BOM)", hex: "U+FEFF" },
  "\u2060": { name: "Word Joiner (WJ)", hex: "U+2060" },
  "\u202A": { name: "Left-to-Right Embedding", hex: "U+202A" },
  "\u202B": { name: "Right-to-Left Embedding", hex: "U+202B" },
  "\u202C": { name: "Pop Directional Formatting", hex: "U+202C" },
  "\u200E": { name: "Left-to-Right Mark (LRM)", hex: "U+200E" },
  "\u200F": { name: "Right-to-Left Mark (RLM)", hex: "U+200F" },
  "\u00A0": { name: "Non-Breaking Space (NBSP)", hex: "U+00A0" },
};

const INVISIBLE_REGEX = /[\u200B-\u200D\uFEFF\u2060\u202A-\u202E\u200E\u200F\u00A0]/g;

export function ZeroWidthCleaner() {
  const [input, setInput] = useState(
    "Hello\u200BWorld!\uFEFF Hidden\u200C characters here."
  );
  const [cleaned, setCleaned] = useState("");
  const [detected, setDetected] = useState<Array<{ name: string; hex: string; count: number }>>([]);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    // Detect invisible characters
    const counts: Record<string, number> = {};
    for (const char of input) {
      if (INVISIBLE_CHARS[char]) {
        counts[char] = (counts[char] || 0) + 1;
      }
    }

    const detectedList = Object.entries(counts).map(([char, count]) => ({
      name: INVISIBLE_CHARS[char].name,
      hex: INVISIBLE_CHARS[char].hex,
      count,
    }));
    setDetected(detectedList);

    // Strip characters
    const clean = input.replace(INVISIBLE_REGEX, "");
    setCleaned(clean);
  }, [input]);

  const handleCopy = async () => {
    if (!cleaned) return;
    const ok = await copyToClipboard(cleaned);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalInvisibleCount = detected.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Status banner */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
          totalInvisibleCount > 0
            ? "bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300"
            : "bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300"
        }`}
      >
        <div className="flex items-center gap-3">
          {totalInvisibleCount > 0 ? (
            <EyeOff className="h-5 w-5 text-amber-600 shrink-0" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
          )}
          <div>
            <div className="text-sm font-bold">
              {totalInvisibleCount > 0
                ? `${totalInvisibleCount} Invisible Character${
                    totalInvisibleCount > 1 ? "s" : ""
                  } Detected!`
                : "Clean: No hidden zero-width spaces detected"}
            </div>
            <div className="text-xs opacity-80">
              {totalInvisibleCount > 0
                ? "These hidden characters can cause silent bugs in code and JSON."
                : "Your text is completely free of zero-width and invisible formatting artifacts."}
            </div>
          </div>
        </div>

        {totalInvisibleCount > 0 && (
          <Button
            size="sm"
            onClick={handleCopy}
            className="text-xs shrink-0 bg-primary hover:bg-primary-hover text-primary-foreground gap-1.5"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            Copy Cleaned Text
          </Button>
        )}
      </div>

      {/* Detected Breakdown Table */}
      {detected.length > 0 && (
        <div className="p-4 rounded-xl border border-border bg-card space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Detected Invisible Characters Breakdown
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {detected.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="font-semibold text-foreground">{item.hex}</span>
                  <p className="text-[10px] text-muted-foreground font-sans truncate">
                    {item.name}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  x{item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor & Cleaner Side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>INPUT TEXT (MAY CONTAIN HIDDEN CHARS)</span>
            <span className="font-mono text-[11px]">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder="Paste text here to inspect for hidden spaces..."
            className="w-full p-3.5 rounded-lg border border-input bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>CLEANED TEXT (ALL INVISIBLE CHARS STRIPPED)</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px]">{cleaned.length} chars</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-6 px-2 text-[11px] gap-1"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <textarea
            readOnly
            value={cleaned}
            rows={10}
            placeholder="Cleaned text will appear here..."
            className="w-full p-3.5 rounded-lg border border-border bg-muted/20 font-mono text-xs sm:text-sm text-foreground resize-y focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

