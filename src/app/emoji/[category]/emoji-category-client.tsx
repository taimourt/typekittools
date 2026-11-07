"use client";

import React, { useState } from "react";
import { Search, Check, Copy, Sparkles } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import type { EmojiRecord } from "@/data/emoji-data";

interface EmojiCategoryClientProps {
  emojis: EmojiRecord[];
  categoryName: string;
}

const SKIN_TONES = [
  { label: "Default", modifier: "", display: "🟡" },
  { label: "Light", modifier: "\u{1F3FB}", display: "🏻" },
  { label: "Medium-Light", modifier: "\u{1F3FC}", display: "🏼" },
  { label: "Medium", modifier: "\u{1F3FD}", display: "🏽" },
  { label: "Medium-Dark", modifier: "\u{1F3FE}", display: "🏾" },
  { label: "Dark", modifier: "\u{1F3FF}", display: "🏿" },
];

export function EmojiCategoryClient({ emojis, categoryName }: EmojiCategoryClientProps) {
  const [search, setSearch] = useState("");
  const [activeSkinTone, setActiveSkinTone] = useState("");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const handleCopy = async (char: string) => {
    const success = await copyToClipboard(char);
    if (success) {
      setCopiedChar(char);
      setTimeout(() => setCopiedChar(null), 1500);
    }
  };

  const filtered = emojis.filter((e) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const hasSkinToneSupport = emojis.some((e) => e.supportsSkinTone);

  return (
    <div className="space-y-6">
      {/* Controls: Search & Skin Tone */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${categoryName.toLowerCase()}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Skin Tone Selector */}
        {hasSkinToneSupport && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase font-mono mr-1">
              Skin:
            </span>
            {SKIN_TONES.map((tone) => (
              <button
                key={tone.label}
                onClick={() => setActiveSkinTone(tone.modifier)}
                title={tone.label}
                className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center border transition-all cursor-pointer ${
                  activeSkinTone === tone.modifier
                    ? "bg-primary/15 border-primary shadow-sm"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                {tone.display}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {filtered.map((item) => {
          const renderedChar =
            item.supportsSkinTone && activeSkinTone
              ? `${item.char}${activeSkinTone}`
              : item.char;

          const isCopied = copiedChar === renderedChar;

          return (
            <button
              key={item.name}
              onClick={() => handleCopy(renderedChar)}
              title={`Click to copy: ${item.name}`}
              className={`group relative p-3 rounded-xl border bg-card hover:bg-muted/30 transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                isCopied ? "border-primary bg-primary/10 scale-95" : "border-border hover:border-primary/40"
              }`}
            >
              <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                {renderedChar}
              </span>
              <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium text-center truncate max-w-full">
                {item.name}
              </span>

              {isCopied && (
                <div className="absolute inset-0 rounded-xl bg-primary/20 backdrop-blur-[1px] flex items-center justify-center text-primary font-bold text-xs animate-in fade-in">
                  <Check className="w-4 h-4 mr-0.5" />
                  Copied!
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
          No emojis matching &ldquo;{search}&rdquo; in this category.
        </div>
      )}
    </div>
  );
}

