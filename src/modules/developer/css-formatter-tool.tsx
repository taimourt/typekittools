"use client";

import React, { useState, useMemo } from "react";
import { Palette, Minimize2, Sparkles, Copy, Check, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { formatCss, minifyCss } from "@/lib/developer/dev-transforms";

const SAMPLE_CSS = `.btn{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1rem;font-size:0.875rem;font-weight:600;border-radius:0.5rem;transition:all 0.2s ease}.btn-primary{background-color:#0d9488;color:#ffffff;box-shadow:0 1px 2px 0 rgba(0,0,0,0.05)}.btn-primary:hover{background-color:#0f766e}@media(max-width:768px){.btn{width:100%;margin-bottom:0.5rem}}`;

export function CssFormatterTool() {
  const [input, setInput] = useState<string>(SAMPLE_CSS);
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [indentSize, setIndentSize] = useState<number | "tab">(2);

  const { formatted, ruleCount } = useMemo(() => {
    if (mode === "minify") {
      const min = minifyCss(input);
      return { formatted: min, ruleCount: (input.match(/\{/g) || []).length };
    }
    return formatCss(input, { indent: indentSize });
  }, [input, mode, indentSize]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "beautify" ? "default" : "outline"}
            onClick={() => setMode("beautify")}
            className="text-xs font-semibold gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format & Beautify CSS</span>
          </Button>
          <Button
            size="sm"
            variant={mode === "minify" ? "default" : "outline"}
            onClick={() => setMode("minify")}
            className="text-xs font-semibold gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify CSS</span>
          </Button>
        </div>

        {mode === "beautify" && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Indent:</span>
            {(
              [
                { id: 2, label: "2 Spaces" },
                { id: 4, label: "4 Spaces" },
                { id: "tab", label: "Tabs" },
              ] as const
            ).map((opt) => (
              <button
                key={String(opt.id)}
                onClick={() => setIndentSize(opt.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors ${
                  indentSize === opt.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="RAW OR MINIFIED CSS"
          placeholder="Paste CSS styles here..."
          sampleValue={SAMPLE_CSS}
          rows={12}
        />

        <SharedOutput
          value={formatted}
          label={mode === "beautify" ? "BEAUTIFIED CSS" : "MINIFIED CSS"}
          downloadFilename={`styles.${mode === "minify" ? "min.css" : "css"}`}
          rows={12}
        />
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Original Size
          </span>
          <span className="text-base font-bold text-foreground">{input.length} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Output Size
          </span>
          <span className="text-base font-bold text-foreground">{formatted.length} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Rule Blocks
          </span>
          <span className="text-base font-bold text-primary">{ruleCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Compression
          </span>
          <span
            className={`text-base font-bold ${
              formatted.length <= input.length
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-foreground"
            }`}
          >
            {input.length > 0
              ? `${Math.round(((formatted.length - input.length) / input.length) * 100)}%`
              : "0%"}
          </span>
        </div>
      </div>
    </div>
  );
}

