"use client";

import React, { useState } from "react";
import { Copy, Check, Minimize2, Maximize2, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_JSON = `{
  "name": "TypeKitTools",
  "version": "1.0.0",
  "features": [
    "Keyboard & Typing Testers",
    "Alt Codes & Special Characters",
    "Unicode Character Inspectors",
    "Developer Encoding Tools"
  ],
  "performance": {
    "zeroServerLogging": true,
    "instantClientExecution": true
  }
}`;

export function JsonFormatterTool() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = (spaces: number) => {
    if (!input.trim()) {
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      setInput(formatted);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const minifyJson = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCopy = async () => {
    if (!input) return;
    const ok = await copyToClipboard(input);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            onClick={() => formatJson(2)}
            className="text-xs h-8 gap-1.5"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Beautify (2 Spaces)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => formatJson(4)}
            className="text-xs h-8"
          >
            Beautify (4 Spaces)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={minifyJson}
            className="text-xs h-8 gap-1.5"
          >
            <Minimize2 className="h-3.5 w-3.5" />
            Minify JSON
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInput(SAMPLE_JSON)}
            className="text-xs h-8 text-primary"
          >
            Load Sample
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-8 gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setInput("");
              setError(null);
            }}
            className="text-xs h-8 text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Error banner if invalid */}
      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-2 text-destructive text-xs font-mono">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Invalid JSON Syntax: {error}</span>
        </div>
      )}

      {/* Editor Area */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Instant validate
            try {
              if (e.target.value.trim()) {
                JSON.parse(e.target.value);
                setError(null);
              }
            } catch (err: any) {
              setError(err.message);
            }
          }}
          rows={16}
          placeholder="Paste raw JSON here..."
          className="w-full p-4 rounded-xl border border-input bg-card font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
        <span>Characters: {input.length}</span>
        <span className={error ? "text-destructive" : "text-emerald-600"}>
          {error ? "Syntax: Invalid" : "Syntax: Valid JSON"}
        </span>
      </div>
    </div>
  );
}

