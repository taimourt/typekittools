"use client";

import React, { useState, useMemo } from "react";
import { Code2, Minimize2, Sparkles, Copy, Check, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { formatHtml, minifyHtml } from "@/lib/developer/dev-transforms";

const SAMPLE_HTML = `<!DOCTYPE html><html><head><title>TypeKitTools Demo</title><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head><body><header class="site-header"><nav><a href="/">Home</a><a href="/tools">Tools</a></nav></header><main><section class="hero"><h1>TypeKitTools</h1><p>High-performance character & developer tools suite.</p><button type="button" class="btn primary">Get Started</button></section></main><footer><p>&copy; 2026 TypeKitTools. All rights reserved.</p></footer></body></html>`;

export function HtmlFormatterTool() {
  const [input, setInput] = useState<string>(SAMPLE_HTML);
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const [indentSize, setIndentSize] = useState<number | "tab">(2);

  const { formatted, tagCount, error } = useMemo(() => {
    if (mode === "minify") {
      const min = minifyHtml(input);
      return { formatted: min, tagCount: (input.match(/<[a-zA-Z0-9\-]+/g) || []).length, error: undefined };
    }
    return formatHtml(input, { indent: indentSize });
  }, [input, mode, indentSize]);

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "beautify" ? "default" : "outline"}
            onClick={() => setMode("beautify")}
            className="text-xs font-semibold gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format & Beautify HTML</span>
          </Button>
          <Button
            size="sm"
            variant={mode === "minify" ? "default" : "outline"}
            onClick={() => setMode("minify")}
            className="text-xs font-semibold gap-1.5"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Minify HTML</span>
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
          label="RAW OR MINIFIED HTML"
          placeholder="Paste HTML code here..."
          sampleValue={SAMPLE_HTML}
          rows={12}
        />

        <SharedOutput
          value={formatted}
          label={mode === "beautify" ? "FORMATTED & INDENTED HTML" : "MINIFIED HTML"}
          errorMessage={error}
          downloadFilename={`code.${mode === "minify" ? "min.html" : "html"}`}
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
            HTML Tags Found
          </span>
          <span className="text-base font-bold text-primary">{tagCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Size Change
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

