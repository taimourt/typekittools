"use client";

import React, { useState, useEffect } from "react";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { ResetButton } from "@/components/tools/reset-button";
import { ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAMED_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
  "©": "&copy;",
  "®": "&reg;",
  "™": "&trade;",
  "€": "&euro;",
  "£": "&pound;",
  "¥": "&yen;",
  "¢": "&cent;",
  "§": "&sect;",
  "°": "&deg;",
  "±": "&plusmn;",
  "×": "&times;",
  "÷": "&divide;",
  "•": "&bull;",
  "—": "&mdash;",
  "–": "&ndash;",
  "…": "&hellip;",
};

function encodeHtml(text: string, type: "named" | "decimal" | "hex"): string {
  let out = "";
  for (const char of text) {
    if (type === "named" && NAMED_MAP[char]) {
      out += NAMED_MAP[char];
    } else if (char.charCodeAt(0) > 127 || char === "&" || char === "<" || char === ">" || char === '"' || char === "'") {
      const cp = char.codePointAt(0);
      if (!cp) continue;
      if (type === "hex") {
        out += `&#x${cp.toString(16).toUpperCase()};`;
      } else {
        out += `&#${cp};`;
      }
    } else {
      out += char;
    }
  }
  return out;
}

function decodeHtml(html: string): string {
  if (typeof document !== "undefined") {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  // Basic regex fallback
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
}

export function HtmlEntityTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [type, setType] = useState<"named" | "decimal" | "hex">("named");
  const [input, setInput] = useState("<div class='price'>Special: €99 & 50¢ © 2026</div>");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    if (mode === "encode") {
      setOutput(encodeHtml(input, type));
    } else {
      setOutput(decodeHtml(input));
    }
  }, [input, mode, type]);

  const handleSwap = () => {
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-lg bg-muted p-1 text-xs font-medium">
            <button
              onClick={() => setMode("encode")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                mode === "encode"
                  ? "bg-card text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Encode HTML
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                mode === "decode"
                  ? "bg-card text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Decode HTML
            </button>
          </div>

          {mode === "encode" && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground">Format:</span>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="bg-card border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none"
              >
                <option value="named">Named (&amp;copy;)</option>
                <option value="decimal">Decimal (&amp;#169;)</option>
                <option value="hex">Hexadecimal (&amp;#xA9;)</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {output && (
            <Button variant="outline" size="sm" onClick={handleSwap} className="h-8 text-xs gap-1.5">
              <ArrowRightLeft className="h-3.5 w-3.5" />
              Swap
            </Button>
          )}
          <ResetButton onReset={() => setInput("")} disabled={!input} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SharedInput
          value={input}
          onChange={setInput}
          label={mode === "encode" ? "RAW TEXT / HTML INPUT" : "HTML ENTITY INPUT"}
          placeholder="Paste or enter content..."
          sampleValue="<div class='price'>Special: €99 & 50¢ © 2026</div>"
        />

        <SharedOutput
          value={output}
          label={mode === "encode" ? "ENCODED ENTITIES" : "DECODED PLAIN TEXT"}
          downloadFilename="html-entities.txt"
        />
      </div>
    </div>
  );
}

