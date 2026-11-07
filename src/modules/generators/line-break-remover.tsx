"use client";

import React, { useState, useMemo } from "react";
import { AlignLeft, Copy, Check, Scissors, RotateCcw, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { removeLineBreaks } from "@/lib/unicode/text-transforms";

const SAMPLE_TEXT = `This is a paragraph copied from a PDF document
where lines are forcibly wrapped with hard line breaks
at arbitrary margins rather than flowing naturally.

This is a second paragraph that was also hard-wrapped
across multiple individual lines in an email or terminal output.

And here is a third paragraph that should remain separate.`;

export function LineBreakRemoverTool() {
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [mode, setMode] = useState<"all" | "preserve-paragraphs" | "custom">("preserve-paragraphs");
  const [customDelimiter, setCustomDelimiter] = useState<string>(", ");
  const [trimLines, setTrimLines] = useState<boolean>(true);
  const [collapseSpaces, setCollapseSpaces] = useState<boolean>(true);

  const { result, removedBreaks, originalLines, finalLines } = useMemo(() => {
    return removeLineBreaks(input, {
      mode,
      delimiter: customDelimiter,
      trimLines,
      collapseSpaces,
    });
  }, [input, mode, customDelimiter, trimLines, collapseSpaces]);

  return (
    <div className="space-y-6">
      {/* Options Toolbar */}
      <div className="p-4 bg-muted/30 border border-border/60 rounded-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Mode Selector */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Clean Mode:</span>
            {(
              [
                { id: "preserve-paragraphs", label: "Preserve Paragraphs (PDF Clean)" },
                { id: "all", label: "Remove All Line Breaks (Single Line)" },
                { id: "custom", label: "Replace with Custom Delimiter" },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  mode === m.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Checkbox Options */}
          <div className="flex items-center gap-4 text-xs font-medium text-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Trim line edges</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={collapseSpaces}
                onChange={(e) => setCollapseSpaces(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Collapse multiple spaces</span>
            </label>
          </div>
        </div>

        {/* Custom Delimiter Input */}
        {mode === "custom" && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/40">
            <span className="text-xs text-muted-foreground">Replacement Delimiter:</span>
            <input
              type="text"
              value={customDelimiter}
              onChange={(e) => setCustomDelimiter(e.target.value)}
              placeholder=", "
              className="w-48 h-8 px-2.5 text-xs font-mono rounded-md border border-input bg-background text-foreground"
            />
            <span className="text-[11px] text-muted-foreground">
              (Use <code className="font-mono">, </code> for CSV or <code className="font-mono"> | </code> for tables)
            </span>
          </div>
        )}
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="ORIGINAL TEXT (WITH UNWANTED BREAKS)"
          placeholder="Paste PDF text, email, or hard-wrapped paragraph..."
          sampleValue={SAMPLE_TEXT}
          rows={7}
        />

        <SharedOutput
          value={result}
          label="CLEANED CONTINUOUS TEXT"
          downloadFilename="cleaned-text.txt"
          rows={7}
        />
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Original Lines
          </span>
          <span className="text-base font-bold text-foreground">{originalLines}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Cleaned Lines
          </span>
          <span className="text-base font-bold text-foreground">{finalLines}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Line Breaks Removed
          </span>
          <span className="text-base font-bold text-primary">{removedBreaks}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Reduction Factor
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {originalLines > 0 ? `${Math.round((removedBreaks / originalLines) * 100)}%` : "0%"}
          </span>
        </div>
      </div>
    </div>
  );
}

