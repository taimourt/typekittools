"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle2, AlertCircle, Sparkles, Minimize2, Copy, Check, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { validateJson } from "@/lib/developer/advanced-transforms";

const SAMPLE_VALID_JSON = `{
  "name": "TypeKitTools",
  "version": "1.0.0",
  "features": [
    "Unicode Search",
    "JSON Validator",
    "UTF-8 Encoder"
  ],
  "settings": {
    "theme": "dark",
    "telemetry": false
  }
}`;

export function JsonValidatorTool() {
  const [input, setInput] = useState<string>(SAMPLE_VALID_JSON);
  const [indentSize, setIndentSize] = useState<number>(2);

  const validation = useMemo(() => {
    return validateJson(input);
  }, [input]);

  const beautified = useMemo(() => {
    if (!validation.isValid || !validation.parsed) return "";
    return JSON.stringify(validation.parsed, null, indentSize);
  }, [validation, indentSize]);

  const minified = useMemo(() => {
    if (!validation.isValid || !validation.parsed) return "";
    return JSON.stringify(validation.parsed);
  }, [validation]);

  const handleFixCommonIssues = () => {
    let fixed = input
      // Replace single quotes with double quotes around keys and values
      .replace(/'/g, '"')
      // Remove trailing commas before closing braces/brackets
      .replace(/,(\s*[\]}])/g, "$1")
      // Quote unquoted object keys
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');
    setInput(fixed);
  };

  return (
    <div className="space-y-6">
      {/* Validation Status Banner */}
      <div
        className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
          validation.isValid
            ? "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
            : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-800 dark:text-red-300"
        }`}
      >
        <div className="flex items-center gap-3">
          {validation.isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          )}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider">
              {validation.isValid ? "Valid RFC 8259 JSON" : "Invalid JSON Syntax"}
            </div>
            <div className="text-xs opacity-90">
              {validation.isValid
                ? "Document structure, quotation, and brackets adhere strictly to JSON standards."
                : validation.error}
            </div>
          </div>
        </div>

        {!validation.isValid && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleFixCommonIssues}
            className="text-xs bg-white/80 dark:bg-black/40 border-red-300 hover:bg-white text-red-900 dark:text-red-200"
          >
            Attempt Auto-Fix (Quotes & Trailing Commas)
          </Button>
        )}
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="JSON INPUT (VALIDATE & FORMAT)"
          placeholder="Paste JSON text here..."
          sampleValue={SAMPLE_VALID_JSON}
          errorMessage={
            validation.isValid
              ? null
              : `${validation.error}${
                  validation.line ? ` (Line ${validation.line}, Col ${validation.column})` : ""
                }`
          }
          rows={14}
        />

        <div className="space-y-4">
          <SharedOutput
            value={beautified}
            label={`FORMATTED JSON (${indentSize} SPACES)`}
            downloadFilename="formatted.json"
            rows={14}
            extraActions={
              <div className="flex items-center gap-1 mr-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setInput(minified)}
                  disabled={!validation.isValid}
                  className="h-6 text-[11px] gap-1 px-2"
                >
                  <Minimize2 className="w-3 h-3" />
                  Minify Input
                </Button>
              </div>
            }
          />
        </div>
      </div>

      {/* Structural Metrics */}
      {validation.isValid && validation.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-sans">
              Total Keys
            </span>
            <span className="text-base font-bold text-primary">{validation.stats.keys}</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-sans">
              Nesting Depth
            </span>
            <span className="text-base font-bold text-foreground">{validation.stats.depth} levels</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-sans">
              Payload Size
            </span>
            <span className="text-base font-bold text-foreground">{validation.stats.byteSize} B</span>
          </div>
          <div>
            <span className="text-muted-foreground block text-[10px] uppercase font-sans">
              Minified Savings
            </span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {input.length > 0
                ? `${Math.max(0, Math.round(((input.length - minified.length) / input.length) * 100))}%`
                : "0%"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

