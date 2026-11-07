"use client";

import React, { useState, useEffect } from "react";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { ResetButton } from "@/components/tools/reset-button";
import { toUnicodeEscapes, decodeUnicodeEscapes } from "@/lib/unicode/graphemes";

type TargetFormat = "escape" | "codepoints" | "html_dec" | "html_hex" | "utf8_hex" | "decode";

export function UnicodeConverterTool() {
  const [input, setInput] = useState("Hello 🚀 €100");
  const [format, setFormat] = useState<TargetFormat>("escape");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (format === "escape") {
        setOutput(toUnicodeEscapes(input));
        setError(null);
      } else if (format === "codepoints") {
        const cps = Array.from(input).map((char) => {
          const cp = char.codePointAt(0);
          return cp ? `U+${cp.toString(16).toUpperCase().padStart(4, "0")}` : "";
        });
        setOutput(cps.join(" "));
        setError(null);
      } else if (format === "html_dec") {
        const dec = Array.from(input).map((char) => `&#${char.codePointAt(0)};`);
        setOutput(dec.join(""));
        setError(null);
      } else if (format === "html_hex") {
        const hex = Array.from(input).map(
          (char) => `&#x${char.codePointAt(0)?.toString(16).toUpperCase()};`
        );
        setOutput(hex.join(""));
        setError(null);
      } else if (format === "utf8_hex") {
        const bytes = new TextEncoder().encode(input);
        const hex = Array.from(bytes).map((b) => b.toString(16).toUpperCase().padStart(2, "0"));
        setOutput(hex.join(" "));
        setError(null);
      } else if (format === "decode") {
        setOutput(decodeUnicodeEscapes(input));
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to convert Unicode sequence");
      setOutput("");
    }
  }, [input, format]);

  return (
    <div className="p-6 space-y-6">
      {/* Target Format Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "escape", label: "\\uXXXX Escape" },
            { id: "codepoints", label: "U+XXXX Codepoints" },
            { id: "html_dec", label: "&#123; Decimal" },
            { id: "html_hex", label: "&#xHEX; Hex" },
            { id: "utf8_hex", label: "UTF-8 Bytes" },
            { id: "decode", label: "Decode to Text" },
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => setFormat(fmt.id as TargetFormat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                format === fmt.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        <ResetButton onReset={() => setInput("")} disabled={!input} />
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SharedInput
          value={input}
          onChange={setInput}
          label={format === "decode" ? "ENCODED UNICODE INPUT" : "PLAIN TEXT INPUT"}
          placeholder={
            format === "decode"
              ? "Paste \\u0048\\u0065\\u006C\\u006C\\u006F or &#8364;..."
              : "Type or paste text with characters, accents, emojis..."
          }
          sampleValue="Hello 🚀 €100"
          errorMessage={error}
        />

        <SharedOutput
          value={output}
          label="CONVERTED OUTPUT"
          downloadFilename={`unicode-${format}.txt`}
          errorMessage={error}
        />
      </div>
    </div>
  );
}

