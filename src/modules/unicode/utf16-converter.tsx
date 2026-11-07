"use client";

import React, { useState, useMemo } from "react";
import { Layers, ArrowLeftRight, Binary, Code, Check, Copy, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { analyzeUtf16, decodeUtf16 } from "@/lib/unicode/text-transforms";

const SAMPLE_TEXT = "TypeKit 🚀 €100 — 𝄞 Musical Clef";
const SAMPLE_UTF16 = "\\u0054\\u0079\\u0070\\u0065\\u004B\\u0069\\u0074\\u0020\\u{1F680}\\u0020\\u20AC\\u0031\\u0030\\u0030";

export function Utf16ConverterTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [outputFormat, setOutputFormat] = useState<"escapes" | "be-hex" | "le-hex">("escapes");

  const utf16Analysis = useMemo(() => {
    if (mode !== "encode") return null;
    return analyzeUtf16(input);
  }, [input, mode]);

  const outputValue = useMemo(() => {
    if (mode !== "encode" || !utf16Analysis) return "";
    if (outputFormat === "escapes") return utf16Analysis.escapedString;
    if (outputFormat === "be-hex") return utf16Analysis.codeUnitsBEHex;
    return utf16Analysis.codeUnitsLEHex;
  }, [mode, utf16Analysis, outputFormat]);

  const decodedResult = useMemo(() => {
    if (mode !== "decode") return { text: "" };
    return decodeUtf16(input);
  }, [input, mode]);

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput(newMode === "encode" ? SAMPLE_TEXT : SAMPLE_UTF16);
  };

  const astralCount = utf16Analysis?.details.filter((d) => d.isAstral).length || 0;

  return (
    <div className="space-y-6">
      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => switchMode("encode")}
            className="text-xs font-semibold"
          >
            Encode Text to UTF-16
          </Button>
          <Button
            size="sm"
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => switchMode("decode")}
            className="text-xs font-semibold"
          >
            Decode UTF-16 to Text
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Output Format:</span>
            {(
              [
                { id: "escapes", label: "\\uXXXX Escapes" },
                { id: "be-hex", label: "Big-Endian Hex" },
                { id: "le-hex", label: "Little-Endian Hex" },
              ] as const
            ).map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setOutputFormat(fmt.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors ${
                  outputFormat === fmt.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {fmt.label}
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
          label={mode === "encode" ? "INPUT UNICODE TEXT" : "INPUT UTF-16 (ESCAPES OR HEX CODE UNITS)"}
          placeholder={
            mode === "encode"
              ? "Type text with emoji, surrogate pairs, or foreign characters..."
              : "Paste \\u0048\\u0065\\u006C\\u006C\\u006F or 0048 0065 006C 006C 006F"
          }
          sampleValue={mode === "encode" ? SAMPLE_TEXT : SAMPLE_UTF16}
        />

        <div>
          {mode === "encode" ? (
            <SharedOutput
              value={outputValue}
              label={`UTF-16 OUTPUT (${outputFormat.toUpperCase()})`}
              downloadFilename="utf16-encoded.txt"
            />
          ) : (
            <SharedOutput
              value={decodedResult.text}
              label="DECODED UNICODE TEXT"
              errorMessage={decodedResult.error}
              downloadFilename="utf16-decoded.txt"
            />
          )}
        </div>
      </div>

      {/* Metrics Row */}
      {mode === "encode" && utf16Analysis && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl">
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              16-bit Code Units
            </div>
            <div className="text-xl font-bold font-mono text-primary">
              {utf16Analysis.totalCodeUnits}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Total Bytes
            </div>
            <div className="text-xl font-bold font-mono text-foreground">
              {utf16Analysis.totalCodeUnits * 2} B
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              BMP Characters
            </div>
            <div className="text-xl font-bold font-mono text-foreground">
              {utf16Analysis.details.length - astralCount}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Surrogate Pairs (Astral)
            </div>
            <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
              {astralCount}
            </div>
          </div>
        </div>
      )}

      {/* Surrogate Pair Breakdown Table */}
      {mode === "encode" && utf16Analysis && utf16Analysis.details.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              UTF-16 Code Unit & Surrogate Pair Inspection
            </h3>
            <span className="text-xs text-muted-foreground">
              {utf16Analysis.details.length} characters analyzed
            </span>
          </div>

          <div className="border border-border/60 rounded-xl overflow-hidden shadow-xs overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground font-medium">
                <tr>
                  <th className="p-3 w-16 text-center">Glyph</th>
                  <th className="p-3">Codepoint</th>
                  <th className="p-3">Plane</th>
                  <th className="p-3">16-bit Code Units</th>
                  <th className="p-3">High Surrogate</th>
                  <th className="p-3">Low Surrogate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {utf16Analysis.details.slice(0, 50).map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 text-center text-lg font-sans bg-muted/10 font-medium">
                      {row.char}
                    </td>
                    <td className="p-3 font-semibold text-primary">{row.hexCodePoint}</td>
                    <td className="p-3">
                      {row.isAstral ? (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                          Astral Plane (U+10000+)
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                          BMP (Basic Multilingual Plane)
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-foreground font-semibold">
                      {row.codeUnitsHex.join(" ")}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {row.highSurrogate || <span className="opacity-30">—</span>}
                    </td>
                    <td className="p-3 text-muted-foreground">
                      {row.lowSurrogate || <span className="opacity-30">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

