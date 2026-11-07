"use client";

import React, { useState, useMemo } from "react";
import { Binary, ArrowLeftRight, Copy, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { convertRadix, RadixConversions } from "@/lib/developer/dev-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_BIN = "01001000 01100101 01101100 01101100 01101111"; // "Hello"

export function BinaryConverterTool() {
  const [input, setInput] = useState<string>(SAMPLE_BIN);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const results: RadixConversions = useMemo(() => {
    return convertRadix(input, 2);
  }, [input]);

  const handleCopy = async (val: string, field: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const fields = [
    { label: "ASCII / UTF-8 Text", val: results.asciiText, id: "text", font: "font-sans" },
    { label: "Decimal (Base 10)", val: results.decimal, id: "dec", font: "font-mono" },
    { label: "Hexadecimal (Base 16)", val: results.hexadecimal, id: "hex", font: "font-mono" },
    { label: "Octal (Base 8)", val: results.octal, id: "oct", font: "font-mono" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="BINARY INPUT (0s AND 1s)"
        placeholder="Enter 8-bit binary bytes e.g. 01001000 01100101..."
        sampleValue={SAMPLE_BIN}
        errorMessage={results.error}
        rows={3}
      />

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Presets:</span>
        {[
          { label: "ASCII 'Hello'", val: "01001000 01100101 01101100 01101100 01101111" },
          { label: "Byte 255 (0xFF)", val: "11111111" },
          { label: "16-bit 1024", val: "00000100 00000000" },
          { label: "32-bit Max Int", val: "01111111 11111111 11111111 11111111" },
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

      {/* Outputs */}
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
            Bit Count
          </span>
          <span className="text-base font-bold text-primary">{results.bitLength} bits</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Byte Count
          </span>
          <span className="text-base font-bold text-foreground">{results.byteLength} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            1s (High Bits)
          </span>
          <span className="text-base font-bold text-foreground">
            {(input.match(/1/g) || []).length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            0s (Low Bits)
          </span>
          <span className="text-base font-bold text-foreground">
            {(input.match(/0/g) || []).length}
          </span>
        </div>
      </div>
    </div>
  );
}

