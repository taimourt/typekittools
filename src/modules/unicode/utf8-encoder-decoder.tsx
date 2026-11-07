"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeftRight, Binary, Hash, FileCode, Check, Copy, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import {
  encodeUtf8,
  decodeUtf8,
  analyzeUtf8Characters,
  Utf8ByteFormat,
} from "@/lib/unicode/text-transforms";
import { countUtf8Bytes } from "@/lib/unicode/graphemes";

const SAMPLE_TEXT = "TypeKitTools 🚀 €24.99 — Über cool!";
const SAMPLE_HEX = "54 79 70 65 4B 69 74 54 6F 6F 6C 73 20 F0 9F 96 80 20 E2 82 AC 32 34 2E 39 39";

export function Utf8EncoderDecoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [byteFormat, setByteFormat] = useState<Utf8ByteFormat>("hex");
  const [decodeFormat, setDecodeFormat] = useState<"auto" | "hex" | "decimal" | "binary">("auto");

  // Output for Encode
  const encodedOutput = useMemo(() => {
    if (mode !== "encode") return "";
    return encodeUtf8(input, byteFormat);
  }, [input, mode, byteFormat]);

  // Character breakdown for Encode
  const characterAnalysis = useMemo(() => {
    if (mode !== "encode" || !input) return [];
    return analyzeUtf8Characters(input).slice(0, 50); // limit to first 50 graphemes for smooth DOM
  }, [input, mode]);

  // Output for Decode
  const decodedResult = useMemo(() => {
    if (mode !== "decode") return { text: "", byteCount: 0 };
    return decodeUtf8(input, decodeFormat);
  }, [input, mode, decodeFormat]);

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    if (newMode === "encode") {
      setInput(SAMPLE_TEXT);
    } else {
      setInput(SAMPLE_HEX);
    }
  };

  const totalBytes = useMemo(() => {
    if (mode === "encode") {
      return countUtf8Bytes(input);
    }
    return decodedResult.byteCount;
  }, [input, mode, decodedResult]);

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => switchMode("encode")}
            className="text-xs font-semibold"
          >
            Encode Text to UTF-8
          </Button>
          <Button
            size="sm"
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => switchMode("decode")}
            className="text-xs font-semibold"
          >
            Decode UTF-8 Bytes to Text
          </Button>
        </div>

        {/* Quick Format Options */}
        {mode === "encode" ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Format:</span>
            {(
              [
                { id: "hex", label: "Hex" },
                { id: "binary", label: "Binary" },
                { id: "decimal", label: "Decimal" },
                { id: "percent", label: "URL %XX" },
                { id: "c-array", label: "C uint8_t" },
                { id: "base64", label: "Base64" },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setByteFormat(f.id)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors ${
                  byteFormat === f.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground mr-1">Input Format:</span>
            {(["auto", "hex", "decimal", "binary"] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setDecodeFormat(fmt)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono capitalize transition-colors ${
                  decodeFormat === fmt
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {fmt}
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
          label={mode === "encode" ? "INPUT UNICODE TEXT" : "INPUT UTF-8 BYTES (HEX / DEC / BIN)"}
          placeholder={
            mode === "encode"
              ? "Type or paste characters, symbols, accents, or emojis..."
              : "Paste bytes: e.g. E2 82 AC or 226 130 172 or 0xE2, 0x82, 0xAC"
          }
          sampleValue={mode === "encode" ? SAMPLE_TEXT : SAMPLE_HEX}
        />

        <div>
          {mode === "encode" ? (
            <SharedOutput
              value={encodedOutput}
              label={`ENCODED UTF-8 (${byteFormat.toUpperCase()})`}
              downloadFilename={`utf8-encoded.${byteFormat === "c-array" ? "c" : "txt"}`}
            />
          ) : (
            <SharedOutput
              value={decodedResult.text}
              label="DECODED UNICODE TEXT"
              errorMessage={decodedResult.error}
              downloadFilename="utf8-decoded.txt"
            />
          )}
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl">
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Total Bytes
          </div>
          <div className="text-xl font-bold font-mono text-primary">{totalBytes} B</div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Characters
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {Array.from(mode === "encode" ? input : decodedResult.text).length}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Avg Bytes/Char
          </div>
          <div className="text-xl font-bold font-mono text-foreground">
            {Array.from(mode === "encode" ? input : decodedResult.text).length > 0
              ? (
                  totalBytes /
                  Array.from(mode === "encode" ? input : decodedResult.text).length
                ).toFixed(2)
              : "0.00"}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Multi-byte Count
          </div>
          <div className="text-xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {characterAnalysis.filter((c) => c.byteCount > 1).length}
          </div>
        </div>
      </div>

      {/* Per-Character Byte Breakdown Table (for Encode Mode) */}
      {mode === "encode" && characterAnalysis.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Binary className="w-4 h-4 text-primary" />
              Per-Character UTF-8 Byte Breakdown
            </h3>
            <span className="text-xs text-muted-foreground">
              Showing first {characterAnalysis.length} characters
            </span>
          </div>

          <div className="border border-border/60 rounded-xl overflow-hidden shadow-xs overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground font-medium">
                <tr>
                  <th className="p-3 w-16 text-center">Glyph</th>
                  <th className="p-3">Codepoint</th>
                  <th className="p-3">Length</th>
                  <th className="p-3">Hex Bytes</th>
                  <th className="p-3">Binary Bytes</th>
                  <th className="p-3">Decimal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {characterAnalysis.map((item, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 text-center text-lg font-sans bg-muted/10 font-medium">
                      {item.char}
                    </td>
                    <td className="p-3 text-primary font-semibold">{item.hexCodePoint}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.byteCount === 1
                            ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                            : item.byteCount === 2
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                            : item.byteCount === 3
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        }`}
                      >
                        {item.byteCount} {item.byteCount === 1 ? "byte" : "bytes"}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-foreground">{item.bytesHex}</td>
                    <td className="p-3 text-muted-foreground text-[11px]">{item.bytesBin}</td>
                    <td className="p-3 text-muted-foreground">{item.bytesDec}</td>
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

