"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, ArrowRightLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

/**
 * UTF-8 Safe Base64 Encoding & Decoding
 */
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUtf8(str: string): string {
  // Strip whitespace and line breaks
  const sanitized = str.replace(/\s+/g, "");
  const binary = atob(sanitized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("Hello, World! 🚀 TypeKitTools");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Re-calculate whenever input or mode changes
  React.useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = utf8ToBase64(input);
        setOutput(encoded);
        setError(null);
      } else {
        const decoded = base64ToUtf8(input);
        setOutput(decoded);
        setError(null);
      }
    } catch (err: any) {
      setError(mode === "decode" ? "Invalid Base64 string format" : err.message);
      setOutput("");
    }
  }, [input, mode]);

  const handleCopy = async () => {
    if (!output) return;
    const ok = await copyToClipboard(output);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-muted p-1 text-xs font-medium">
            <button
              onClick={() => setMode("encode")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                mode === "encode"
                  ? "bg-card text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Encode to Base64
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-3 py-1.5 rounded-md transition-all ${
                mode === "decode"
                  ? "bg-card text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Decode from Base64
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {output && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              className="text-xs gap-1.5 h-8"
              title="Use output as input and toggle mode"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              Swap
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput("")}
            className="text-xs text-muted-foreground hover:text-foreground h-8"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Input / Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>{mode === "encode" ? "PLAIN TEXT INPUT" : "BASE64 INPUT"}</span>
            <span className="font-mono text-[11px]">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder={
              mode === "encode"
                ? "Enter or paste plain text here (Unicode & emojis supported)..."
                : "Paste Base64 encoded string here..."
            }
            className="w-full p-3.5 rounded-lg border border-input bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
          />
        </div>

        {/* Output Card */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>{mode === "encode" ? "BASE64 OUTPUT" : "DECODED TEXT OUTPUT"}</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px]">{output.length} chars</span>
              {output && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="h-6 px-2 text-[11px] gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={error ? error : output}
              rows={10}
              placeholder="Output will appear automatically as you type..."
              className={`w-full p-3.5 rounded-lg border font-mono text-xs sm:text-sm resize-y focus:outline-none ${
                error
                  ? "border-destructive/50 bg-destructive/5 text-destructive"
                  : "border-border bg-muted/20 text-foreground"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

