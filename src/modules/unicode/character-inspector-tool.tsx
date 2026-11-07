"use client";

import React, { useState } from "react";
import { SharedInput } from "@/components/tools/shared-input";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";
import { allSymbols } from "@/data/symbols-data";

interface CharDetail {
  index: number;
  char: string;
  codePoint: number;
  hexCodePoint: string;
  decimal: number;
  utf8Hex: string;
  utf16Units: string;
  name: string;
  isSurrogatePair: boolean;
}

function inspectString(str: string): CharDetail[] {
  const result: CharDetail[] = [];
  const encoder = new TextEncoder();
  let idx = 0;

  for (const char of str) {
    const cp = char.codePointAt(0);
    if (cp === undefined) continue;

    // Check if surrogate pair in UTF-16 (code point > 0xFFFF)
    const isSurrogatePair = char.length > 1;
    let utf16Units = "";
    if (isSurrogatePair) {
      utf16Units = `0x${char.charCodeAt(0).toString(16).toUpperCase()} 0x${char.charCodeAt(1).toString(16).toUpperCase()}`;
    } else {
      utf16Units = `0x${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
    }

    // UTF-8 bytes
    const utf8Bytes = Array.from(encoder.encode(char))
      .map((b) => `0x${b.toString(16).toUpperCase().padStart(2, "0")}`)
      .join(" ");

    // Lookup name if available in our symbols database or fallback
    const matched = allSymbols.find((s) => s.character === char);
    let name = matched ? matched.name : `Unicode Character`;
    if (char === " ") name = "Space";
    else if (char === "\n") name = "Line Feed (Newline)";
    else if (char === "\t") name = "Horizontal Tab";

    result.push({
      index: idx++,
      char: char === " " ? "␣" : char === "\n" ? "↵" : char,
      codePoint: cp,
      hexCodePoint: `U+${cp.toString(16).toUpperCase().padStart(4, "0")}`,
      decimal: cp,
      utf8Hex: utf8Bytes,
      utf16Units,
      name,
      isSurrogatePair,
    });
  }

  return result;
}

export function CharacterInspectorTool() {
  const [input, setInput] = useState("€100 🚀 TypeKit");

  const details = inspectString(input);

  return (
    <div className="p-6 space-y-6">
      <SharedInput
        value={input}
        onChange={setInput}
        label="STRING TO INSPECT"
        rows={3}
        placeholder="Type or paste any characters, emojis, symbols, or text..."
        sampleValue="€100 🚀 TypeKit"
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>CHARACTER BREAKDOWN ({details.length} characters)</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                <th className="p-3 font-mono text-center w-12">#</th>
                <th className="p-3 font-mono text-center w-14">Glyph</th>
                <th className="p-3">Codepoint</th>
                <th className="p-3">Character Name</th>
                <th className="p-3 font-mono">Decimal</th>
                <th className="p-3 font-mono">UTF-8 Bytes</th>
                <th className="p-3 font-mono">UTF-16 Units</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {details.map((d) => (
                <tr key={d.index} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-mono text-xs text-muted-foreground text-center">
                    {d.index + 1}
                  </td>
                  <td className="p-3 font-mono text-xl font-bold text-foreground text-center">
                    {d.char}
                  </td>
                  <td className="p-3 font-mono font-bold text-primary">
                    {d.hexCodePoint}
                  </td>
                  <td className="p-3 font-medium text-foreground">
                    {d.name}
                    {d.isSurrogatePair && (
                      <span className="ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700">
                        Surrogate Pair
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-muted-foreground">
                    {d.decimal}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {d.utf8Hex}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {d.utf16Units}
                  </td>
                  <td className="p-3 text-right">
                    <CopyButton text={d.char} label="Copy" size="sm" variant="ghost" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

