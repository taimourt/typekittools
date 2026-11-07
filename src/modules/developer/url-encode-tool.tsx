"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

export function UrlEncodeTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState<string>("https://example.com/search?q=special characters & symbols 🚀");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (!input) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
        setError(null);
      } else {
        setOutput(decodeURIComponent(input));
        setError(null);
      }
    } catch (err: any) {
      setError("Malformed URI sequence: could not decode string");
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
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div className="inline-flex rounded-lg bg-muted p-1 text-xs font-medium">
          <button
            onClick={() => setMode("encode")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mode === "encode"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Encode URL
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              mode === "decode"
                ? "bg-card text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Decode URL
          </button>
        </div>

        <div className="flex items-center gap-2">
          {output && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              className="text-xs gap-1.5 h-8"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>{mode === "encode" ? "PLAIN URL INPUT" : "PERCENT-ENCODED INPUT"}</span>
            <span className="font-mono text-[11px]">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder={
              mode === "encode"
                ? "Paste URL or query parameter..."
                : "Paste percent-encoded string (e.g. %20, %2F)..."
            }
            className="w-full p-3.5 rounded-lg border border-input bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>{mode === "encode" ? "PERCENT-ENCODED OUTPUT" : "DECODED URL OUTPUT"}</span>
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
          <textarea
            readOnly
            value={error || output}
            rows={8}
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
  );
}

