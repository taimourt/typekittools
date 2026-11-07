"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

function toWords(input: string): string[] {
  return (
    input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[-_./\\]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
  );
}

const cases = [
  {
    name: "UPPERCASE",
    description: "All letters converted to capital uppercase",
    convert: (str: string) => str.toUpperCase(),
  },
  {
    name: "lowercase",
    description: "All letters converted to small lowercase",
    convert: (str: string) => str.toLowerCase(),
  },
  {
    name: "camelCase",
    description: "Standard JavaScript/TypeScript variable format",
    convert: (str: string) => {
      const words = toWords(str);
      return words
        .map((w, i) =>
          i === 0
            ? w.toLowerCase()
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
        )
        .join("");
    },
  },
  {
    name: "snake_case",
    description: "Python, Ruby & SQL database column format",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.toLowerCase())
        .join("_"),
  },
  {
    name: "kebab-case",
    description: "URL slugs and CSS class convention",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.toLowerCase())
        .join("-"),
  },
  {
    name: "PascalCase",
    description: "React components, classes, and types convention",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(""),
  },
  {
    name: "CONSTANT_CASE",
    description: "Environment variables and constants",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.toUpperCase())
        .join("_"),
  },
  {
    name: "Title Case",
    description: "Headings, titles, and articles",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" "),
  },
  {
    name: "Sentence case",
    description: "Standard natural language sentence",
    convert: (str: string) => {
      const trimmed = str.trim();
      if (!trimmed) return "";
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    },
  },
  {
    name: "aLtErNaTiNg cAsE",
    description: "SpongeBob mocking alternating letter casing",
    convert: (str: string) =>
      str
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
  },
  {
    name: "iNVERSE cASE",
    description: "Inverts uppercase to lowercase and vice versa",
    convert: (str: string) =>
      str
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
  },
  {
    name: "dot.case",
    description: "Object property paths and package identifiers",
    convert: (str: string) =>
      toWords(str)
        .map((w) => w.toLowerCase())
        .join("."),
  },
];

export function CaseConverterTool() {
  const [input, setInput] = useState("TypeKitTools is an awesome utility suite");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Input Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>INPUT TEXT</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("")}
            className="h-6 text-[11px] text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="Type or paste text to convert casing..."
          className="w-full p-3.5 rounded-lg border border-input bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
      </div>

      {/* Case Options Grid */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Converted Variations
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cases.map((c, i) => {
            const converted = input ? c.convert(input) : "";
            const isCopied = copiedIndex === i;

            return (
              <div
                key={c.name}
                className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-border/80 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground font-mono">
                    {c.name}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!converted}
                    onClick={() => handleCopy(converted, i)}
                    className="h-6 px-2 text-[11px] gap-1"
                  >
                    {isCopied ? (
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

                <div className="p-2 rounded bg-muted/40 font-mono text-xs text-foreground truncate select-all">
                  {converted || <span className="text-muted-foreground opacity-40">...</span>}
                </div>

                <span className="text-[10px] text-muted-foreground">
                  {c.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

