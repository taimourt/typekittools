"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowLeftRight, Copy, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { convertRadix, decimalToRoman, RadixConversions } from "@/lib/developer/dev-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_DEC = "2026";

export function DecimalConverterTool() {
  const [input, setInput] = useState<string>(SAMPLE_DEC);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const results: RadixConversions = useMemo(() => {
    return convertRadix(input, 10);
  }, [input]);

  const romanNumeral = useMemo(() => {
    const num = parseInt(input.trim(), 10);
    if (!isNaN(num) && num > 0 && num <= 3999999) {
      return decimalToRoman(num);
    }
    return "";
  }, [input]);

  const handleCopy = async (val: string, field: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const fields = [
    { label: "Hexadecimal (Base 16)", val: results.hexadecimal, id: "hex", font: "font-mono" },
    { label: "Binary (Base 2)", val: results.binary, id: "bin", font: "font-mono" },
    { label: "Octal (Base 8)", val: results.octal, id: "oct", font: "font-mono" },
    { label: "Roman Numerals", val: romanNumeral, id: "roman", font: "font-serif" },
    { label: "ASCII / Character (if byte code)", val: results.asciiText, id: "text", font: "font-sans" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="DECIMAL INTEGER (BASE 10)"
        placeholder="Enter decimal number e.g. 255, 65535, or arbitrary large BigInt..."
        sampleValue={SAMPLE_DEC}
        errorMessage={results.error}
        rows={2}
      />

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Presets:</span>
        {[
          { label: "Year 2026", val: "2026" },
          { label: "255 (Byte)", val: "255" },
          { label: "65,535 (16-bit)", val: "65535" },
          { label: "4,294,967,295 (32-bit)", val: "4294967295" },
          { label: "2^64-1 (64-bit uint)", val: "18446744073709551615" },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setInput(preset.val)}
            className="px-2.5 py-1 text-xs rounded-md border border-border/60 bg-muted/50 hover:bg-muted text-foreground transition-colors font-mono"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Conversion Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div
            key={f.id}
            className="p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors shadow-xs space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {f.label}
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(f.val, f.id)}
                disabled={!f.val}
                className="h-6 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                {copiedField === f.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            <div
              className={`p-3 bg-muted/30 border border-border/50 rounded-lg text-xs text-foreground break-all max-h-32 overflow-y-auto select-all ${f.font}`}
            >
              {f.val || <span className="opacity-30 italic">No output</span>}
            </div>
          </div>
        ))}
      </div>

      {/* KPI Bit Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Binary Digits
          </span>
          <span className="text-base font-bold text-primary">{results.bitLength} bits</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Byte Requirement
          </span>
          <span className="text-base font-bold text-foreground">{results.byteLength} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Hex Digits
          </span>
          <span className="text-base font-bold text-foreground">
            {results.hexadecimal.replace(/\s+/g, "").length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Engine
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            BigInt (Infinite Precision)
          </span>
        </div>
      </div>
    </div>
  );
}

