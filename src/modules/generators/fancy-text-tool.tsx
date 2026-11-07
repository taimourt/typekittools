"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { SharedInput } from "@/components/tools/shared-input";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

interface FontStyle {
  name: string;
  category: string;
  transform: (str: string) => string;
}

// Unicode offsets helper
function mapChars(str: string, upperOffset: number, lowerOffset: number, digitsOffset?: number): string {
  let result = "";
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      result += String.fromCodePoint(upperOffset + (code - 65));
    } else if (code >= 97 && code <= 122) {
      result += String.fromCodePoint(lowerOffset + (code - 97));
    } else if (digitsOffset && code >= 48 && code <= 57) {
      result += String.fromCodePoint(digitsOffset + (code - 48));
    } else {
      result += ch;
    }
  }
  return result;
}

const FONT_STYLES: FontStyle[] = [
  {
    name: "Bold Serif",
    category: "Math Bold",
    transform: (s) => mapChars(s, 0x1d400, 0x1d41a, 0x1d7ce),
  },
  {
    name: "Bold Sans-Serif",
    category: "Clean Modern",
    transform: (s) => mapChars(s, 0x1d5d4, 0x1d5ee, 0x1d7ec),
  },
  {
    name: "Italic Serif",
    category: "Slanted",
    transform: (s) => mapChars(s, 0x1d434, 0x1d44e),
  },
  {
    name: "Bold Italic",
    category: "Emphasis",
    transform: (s) => mapChars(s, 0x1d468, 0x1d482),
  },
  {
    name: "Script / Cursive",
    category: "Calligraphy",
    transform: (s) => mapChars(s, 0x1d49c, 0x1d4b6),
  },
  {
    name: "Bold Script",
    category: "Heavy Calligraphy",
    transform: (s) => mapChars(s, 0x1d4d0, 0x1d4ea),
  },
  {
    name: "Fraktur / Gothic",
    category: "Vintage Medieval",
    transform: (s) => mapChars(s, 0x1d504, 0x1d51e),
  },
  {
    name: "Bold Fraktur",
    category: "Heavy Gothic",
    transform: (s) => mapChars(s, 0x1d56c, 0x1d586),
  },
  {
    name: "Double-Struck (Blackboard)",
    category: "Mathematics",
    transform: (s) => mapChars(s, 0x1d538, 0x1d552, 0x1d7d8),
  },
  {
    name: "Monospace",
    category: "Typewriter / Code",
    transform: (s) => mapChars(s, 0x1d670, 0x1d68a, 0x1d7f6),
  },
  {
    name: "Fullwidth / Vaporwave",
    category: "Aesthetic",
    transform: (s) => mapChars(s, 0xff21, 0xff41, 0xff10),
  },
  {
    name: "Circled Bubbles",
    category: "Decorative",
    transform: (s) => mapChars(s, 0x24b6, 0x24d0, 0x2460),
  },
  {
    name: "Strikethrough",
    category: "Struck Text",
    transform: (s) => s.split("").map((c) => c + "\u0336").join(""),
  },
  {
    name: "Underline",
    category: "Underlined",
    transform: (s) => s.split("").map((c) => c + "\u0332").join(""),
  },
];

export function FancyTextTool() {
  const [input, setInput] = useState("TypeKit Tools");

  return (
    <div className="p-6 space-y-6">
      <SharedInput
        value={input}
        onChange={setInput}
        label="TYPE YOUR TEXT TO TRANSFORM"
        rows={2}
        placeholder="Type words, phrases, or social media bios here..."
        sampleValue="TypeKit Tools"
      />

      {/* Font Variations Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>GENERATED UNICODE FONTS ({FONT_STYLES.length} STYLES)</span>
          <span>1-Click Copy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FONT_STYLES.map((style) => {
            const transformed = input ? style.transform(input) : "";

            return (
              <div
                key={style.name}
                className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-foreground">
                      {style.name}
                    </span>
                    <span className="ml-2 text-[10px] font-mono text-muted-foreground uppercase">
                      {style.category}
                    </span>
                  </div>

                  <CopyButton text={transformed} label="Copy" size="sm" />
                </div>

                <div className="p-3 rounded-lg bg-muted/30 border border-border/40 font-mono text-base text-foreground truncate select-all">
                  {transformed || <span className="text-muted-foreground text-xs opacity-50">Preview will appear here...</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

