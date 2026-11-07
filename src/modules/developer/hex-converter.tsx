"use client";

import React, { useState, useMemo } from "react";
import { Hash, Binary, ArrowLeftRight, Copy, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { convertRadix, RadixConversions } from "@/lib/developer/dev-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_HEX = "48 65 6C 6C 6F 20 57 6F 72 6C 64";

export function HexConverterTool() {
  const [input, setInput] = useState<string>(SAMPLE_HEX);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const results: RadixConversions = useMemo(() => {
    return convertRadix(input, 16);
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
    { label: "Decimal Integer", val: results.decimal, id: "dec", font: "font-mono" },
    { label: "Binary (Base 2)", val: results.binary, id: "bin", font: "font-mono" },
    { label: "Octal (Base 8)", val: results.octal, id: "oct", font: "font-mono" },
    { label: "Formatted Hex (Base 16)", val: results.hexadecimal, id: "hex", font: "font-mono" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="HEXADECIMAL INPUT (HEX BYTES OR INTEGER)"
        placeholder="e.g. 48 65 6C 6C 6F or 0x1A2F or FFA0"
        sampleValue={SAMPLE_HEX}
        errorMessage={results.error}
        rows={3}
      />

      {/* Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Presets:</span>
        {[
          { label: "ASCII 'Hello World'", val: "48 65 6C 6C 6F 20 57 6F 72 6C 64" },
          { label: "Byte 255 (0xFF)", val: "FF" },
          { label: "16-bit Port (8080)", val: "1F 90" },
          { label: "32-bit IPv4 (127.0.0.1)", val: "7F 00 00 01" },
          { label: "Max 64-bit BigInt", val: "FFFFFFFFFFFFFFFF" },
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

      {/* Conversion Result Cards */}
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

      {/* Bit & Byte Diagnostics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Byte Length
          </span>
          <span className="text-base font-bold text-primary">{results.byteLength} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Bit Width
          </span>
          <span className="text-base font-bold text-foreground">{results.bitLength} bits</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Standard Type
          </span>
          <span className="text-base font-bold text-foreground">
            {results.bitLength <= 8
              ? "uint8_t"
              : results.bitLength <= 16
              ? "uint16_t"
              : results.bitLength <= 32
              ? "uint32_t"
              : results.bitLength <= 64
              ? "uint64_t"
              : "BigInt (>64 bits)"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Arbitrary Precision
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            BigInt Active
          </span>
        </div>
      </div>
    </div>
  );
}

