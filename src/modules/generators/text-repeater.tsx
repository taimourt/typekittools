"use client";

import React, { useState, useMemo } from "react";
import { Repeat, Copy, Check, Download, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { repeatText } from "@/lib/unicode/text-transforms";

const SAMPLE_TEXT = "TypeKitTools is blazing fast! 🚀";

export function TextRepeaterTool() {
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [repeatCount, setRepeatCount] = useState<number>(10);
  const [delimiter, setDelimiter] = useState<string>("\n");
  const [customDelimiter, setCustomDelimiter] = useState<string>("");
  const [numbering, setNumbering] = useState<"none" | "number" | "parens" | "brackets">("number");

  const effectiveDelimiter = delimiter === "custom" ? customDelimiter : delimiter;

  const { result, charCount, wordCount, lineCount } = useMemo(() => {
    return repeatText(input, repeatCount, {
      delimiter: effectiveDelimiter,
      numbering,
    });
  }, [input, repeatCount, effectiveDelimiter, numbering]);

  return (
    <div className="space-y-6">
      {/* Configuration Controls Bar */}
      <div className="p-4 bg-muted/30 border border-border/60 rounded-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Repetition Count */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Repetitions (1 - 10,000)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10000}
                value={repeatCount}
                onChange={(e) => setRepeatCount(Math.max(1, Math.min(10000, Number(e.target.value) || 1)))}
                className="w-full h-9 px-3 text-sm font-mono rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex gap-1">
                {[5, 10, 50, 100].map((quick) => (
                  <button
                    key={quick}
                    type="button"
                    onClick={() => setRepeatCount(quick)}
                    className="px-2 py-1 text-[11px] font-mono rounded-md border border-border/60 bg-muted/60 hover:bg-muted text-foreground transition-colors"
                  >
                    {quick}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Separator / Delimiter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Separator
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full h-9 px-3 text-xs font-medium rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="\n">New Line (\n)</option>
              <option value=" ">Space ( )</option>
              <option value=", ">Comma with Space (, )</option>
              <option value="; ">Semicolon (; )</option>
              <option value="custom">Custom Separator...</option>
            </select>
            {delimiter === "custom" && (
              <input
                type="text"
                placeholder="Enter custom delimiter..."
                value={customDelimiter}
                onChange={(e) => setCustomDelimiter(e.target.value)}
                className="w-full h-8 px-2.5 mt-1.5 text-xs font-mono rounded-md border border-input bg-background text-foreground"
              />
            )}
          </div>

          {/* Line Numbering */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Numbering Style
            </label>
            <select
              value={numbering}
              onChange={(e) => setNumbering(e.target.value as any)}
              className="w-full h-9 px-3 text-xs font-medium rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="none">No Numbering</option>
              <option value="number">1. Text, 2. Text</option>
              <option value="parens">(1) Text, (2) Text</option>
              <option value="brackets">[001] Text, [002] Text</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="TEXT TO REPEAT"
          placeholder="Enter text, string, or phrase..."
          sampleValue={SAMPLE_TEXT}
          rows={6}
        />

        <SharedOutput
          value={result}
          label={`REPEATED OUTPUT (${repeatCount}X)`}
          downloadFilename="repeated-text.txt"
          rows={6}
        />
      </div>

      {/* Output Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Total Copies
          </span>
          <span className="text-base font-bold text-primary">{repeatCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Lines Generated
          </span>
          <span className="text-base font-bold text-foreground">{lineCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Total Words
          </span>
          <span className="text-base font-bold text-foreground">{wordCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Total Characters
          </span>
          <span className="text-base font-bold text-foreground">{charCount}</span>
        </div>
      </div>
    </div>
  );
}

