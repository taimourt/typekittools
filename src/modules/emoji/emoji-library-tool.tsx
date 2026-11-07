"use client";

import React, { useState } from "react";
import { Search, Copy, Check, Smile, Heart, ThumbsUp, Coffee, Zap } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

interface EmojiItem {
  char: string;
  name: string;
  category: "smileys" | "people" | "gestures" | "hearts" | "food" | "symbols";
  keywords: string[];
}

const EMOJI_LIST: EmojiItem[] = [
  // Smileys
  { char: "😀", name: "Grinning Face", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { char: "😃", name: "Grinning Face with Big Eyes", category: "smileys", keywords: ["happy", "joy"] },
  { char: "😄", name: "Grinning Face with Smiling Eyes", category: "smileys", keywords: ["laugh", "happy"] },
  { char: "😁", name: "Beaming Face with Smiling Eyes", category: "smileys", keywords: ["cheer", "teeth"] },
  { char: "😆", name: "Grinning Squinting Face", category: "smileys", keywords: ["laugh", "lol"] },
  { char: "😅", name: "Grinning Face with Sweat", category: "smileys", keywords: ["hot", "nervous"] },
  { char: "🤣", name: "Rolling on the Floor Laughing", category: "smileys", keywords: ["rofl", "lol", "laugh"] },
  { char: "😂", name: "Face with Tears of Joy", category: "smileys", keywords: ["cry", "tears", "laugh"] },
  { char: "🙂", name: "Slightly Smiling Face", category: "smileys", keywords: ["smile", "ok"] },
  { char: "🙃", name: "Upside-Down Face", category: "smileys", keywords: ["silly", "irony"] },
  { char: "😉", name: "Winking Face", category: "smileys", keywords: ["wink", "flirt"] },
  { char: "😊", name: "Smiling Face with Smiling Eyes", category: "smileys", keywords: ["warm", "blush"] },
  { char: "😇", name: "Smiling Face with Halo", category: "smileys", keywords: ["angel", "innocent"] },
  { char: "🥰", name: "Smiling Face with Hearts", category: "smileys", keywords: ["love", "crush", "hearts"] },
  { char: "😍", name: "Heart Eyes", category: "smileys", keywords: ["love", "heart", "eyes"] },
  { char: "🤩", name: "Star-Struck", category: "smileys", keywords: ["star", "excited", "wow"] },
  { char: "😘", name: "Face Blowing a Kiss", category: "smileys", keywords: ["kiss", "love"] },
  { char: "😋", name: "Face Savoring Food", category: "smileys", keywords: ["yum", "delicious"] },
  { char: "😎", name: "Smiling Face with Sunglasses", category: "smileys", keywords: ["cool", "shades"] },
  { char: "🤓", name: "Nerd Face", category: "smileys", keywords: ["geek", "smart", "glasses"] },
  { char: "🧐", name: "Face with Monocle", category: "smileys", keywords: ["inspect", "curious"] },
  { char: "🥳", name: "Partying Face", category: "smileys", keywords: ["party", "celebrate", "birthday"] },
  { char: "🤔", name: "Thinking Face", category: "smileys", keywords: ["think", "hmm", "ponder"] },
  { char: "🤫", name: "Shushing Face", category: "smileys", keywords: ["quiet", "secret", "shh"] },

  // Gestures
  { char: "👍", name: "Thumbs Up", category: "gestures", keywords: ["approve", "ok", "yes", "like"] },
  { char: "👎", name: "Thumbs Down", category: "gestures", keywords: ["disapprove", "no", "bad"] },
  { char: "👌", name: "OK Hand", category: "gestures", keywords: ["perfect", "good"] },
  { char: "✌️", name: "Victory Hand", category: "gestures", keywords: ["peace", "v"] },
  { char: "🤞", name: "Crossed Fingers", category: "gestures", keywords: ["luck", "hope"] },
  { char: "🤟", name: "Love-You Gesture", category: "gestures", keywords: ["ily", "rock"] },
  { char: "🤘", name: "Sign of the Horns", category: "gestures", keywords: ["rock", "metal"] },
  { char: "🤙", name: "Call Me Hand", category: "gestures", keywords: ["shaka", "hang loose"] },
  { char: "👏", name: "Clapping Hands", category: "gestures", keywords: ["applause", "bravo"] },
  { char: "🙌", name: "Raising Hands", category: "gestures", keywords: ["celebrate", "praise"] },
  { char: "👐", name: "Open Hands", category: "gestures", keywords: ["hug"] },
  { char: "🤝", name: "Handshake", category: "gestures", keywords: ["agreement", "deal", "meeting"] },
  { char: "🙏", name: "Folded Hands", category: "gestures", keywords: ["please", "thank you", "pray"] },
  { char: "💪", name: "Flexed Biceps", category: "gestures", keywords: ["strong", "workout", "muscle"] },

  // Hearts
  { char: "❤️", name: "Red Heart", category: "hearts", keywords: ["love", "romance"] },
  { char: "🧡", name: "Orange Heart", category: "hearts", keywords: ["warmth"] },
  { char: "💛", name: "Yellow Heart", category: "hearts", keywords: ["friendship"] },
  { char: "💚", name: "Green Heart", category: "hearts", keywords: ["nature"] },
  { char: "💙", name: "Blue Heart", category: "hearts", keywords: ["trust", "peace"] },
  { char: "💜", name: "Purple Heart", category: "hearts", keywords: ["honor"] },
  { char: "🖤", name: "Black Heart", category: "hearts", keywords: ["dark"] },
  { char: "🤍", name: "White Heart", category: "hearts", keywords: ["pure"] },
  { char: "💖", name: "Sparkling Heart", category: "hearts", keywords: ["special", "shine"] },
  { char: "✨", name: "Sparkles", category: "hearts", keywords: ["magic", "stars", "glitter"] },
  { char: "🔥", name: "Fire", category: "hearts", keywords: ["hot", "lit", "trend"] },

  // Food & Objects
  { char: "☕", name: "Hot Beverage (Coffee)", category: "food", keywords: ["coffee", "tea", "cafe"] },
  { char: "🍕", name: "Pizza", category: "food", keywords: ["food", "cheese"] },
  { char: "🍔", name: "Hamburger", category: "food", keywords: ["burger", "fast food"] },
  { char: "🍟", name: "French Fries", category: "food", keywords: ["fries"] },
  { char: "🍣", name: "Sushi", category: "food", keywords: ["japanese", "fish"] },
  { char: "🍦", name: "Soft Ice Cream", category: "food", keywords: ["dessert", "sweet"] },
  { char: "🍩", name: "Doughnut", category: "food", keywords: ["donut", "sweet"] },

  // Symbols
  { char: "🚀", name: "Rocket", category: "symbols", keywords: ["launch", "fast", "space"] },
  { char: "💡", name: "Light Bulb", category: "symbols", keywords: ["idea", "smart"] },
  { char: "🎉", name: "Party Popper", category: "symbols", keywords: ["tada", "celebration"] },
  { char: "⭐", name: "Star", category: "symbols", keywords: ["rating", "favorite"] },
  { char: "⚡", name: "High Voltage", category: "symbols", keywords: ["lightning", "power", "electric"] },
  { char: "🎯", name: "Bullseye", category: "symbols", keywords: ["target", "goal"] },
  { char: "💻", name: "Laptop", category: "symbols", keywords: ["computer", "code", "dev"] },
];

export function EmojiLibraryTool() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  const filtered = EMOJI_LIST.filter((e) => {
    const matchCat = selectedCat === "all" || e.category === selectedCat;
    const q = search.toLowerCase().trim();
    const matchSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.char === q ||
      e.keywords.some((k) => k.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const handleCopy = async (char: string) => {
    await copyToClipboard(char);
    setCopiedChar(char);
    setTimeout(() => setCopiedChar(null), 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emoji (e.g. smile, heart, coffee, rocket)..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {["all", "smileys", "gestures", "hearts", "food", "symbols"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCat === cat
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Found {filtered.length} emojis</span>
          <span>Click any emoji to copy</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
          {filtered.map((item, idx) => {
            const isCopied = copiedChar === item.char;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleCopy(item.char)}
                title={`${item.name} - Click to copy`}
                className="group relative flex flex-col items-center justify-center p-3 h-20 rounded-xl border border-border bg-card shadow-sm hover:border-primary hover:shadow-card-hover transition-all text-center select-none"
              >
                {isCopied && (
                  <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground flex flex-col items-center justify-center z-10 animate-in fade-in-50">
                    <Check className="h-4 w-4 mb-0.5" />
                    <span className="text-[9px] font-bold uppercase">Copied</span>
                  </div>
                )}
                <span className="text-3xl group-hover:scale-125 transition-transform">
                  {item.char}
                </span>
                <span className="text-[9px] text-muted-foreground truncate w-full mt-1">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

