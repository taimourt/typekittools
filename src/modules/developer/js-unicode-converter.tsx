"use client";

import React, { useState, useMemo } from "react";
import { Code, ArrowLeftRight, Sparkles, Copy, Check, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { convertJsUnicode } from "@/lib/developer/dev-transforms";

const SAMPLE_JS = `const greeting = "Hello, world! 🚀 €100 Über café";
const regex = /[\\u{1F600}-\\u{1F64F}]/u;`;

const SAMPLE_ESCAPED = `const greeting = "Hello, world! \\u{1F680} \\u20AC100 \\u00DCber caf\\u00E9";`;

export function JsUnicodeConverterTool() {
  const [input, setInput] = useState<string>(SAMPLE_JS);
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [es6Braces, setEs6Braces] = useState<boolean>(true);
  const [allChars, setAllChars] = useState<boolean>(false);

  const converted = useMemo(() => {
    return convertJsUnicode(input, mode, { es6Braces, allChars });
  }, [input, mode, es6Braces, allChars]);

  const switchMode = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput(newMode === "encode" ? SAMPLE_JS : SAMPLE_ESCAPED);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => switchMode("encode")}
            className="text-xs font-semibold"
          >
            Escape JS to Unicode (\uXXXX)
          </Button>
          <Button
            size="sm"
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => switchMode("decode")}
            className="text-xs font-semibold"
          >
            Unescape Unicode to Clean Text
          </Button>
        </div>

        {mode === "encode" && (
          <div className="flex items-center gap-4 text-xs font-medium text-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={es6Braces}
                onChange={(e) => setEs6Braces(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>ES6 \u{"{XXXXX}"} for astral planes</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={allChars}
                onChange={(e) => setAllChars(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Escape all characters (ASCII included)</span>
            </label>
          </div>
        )}
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label={mode === "encode" ? "RAW JAVASCRIPT / STRING" : "ESCAPED JAVASCRIPT CODE"}
          placeholder={
            mode === "encode"
              ? "Paste JavaScript code or string literals..."
              : "Paste \\u0048\\u0065\\u006C\\u006C\\u006F or \\u{1F680}..."
          }
          sampleValue={mode === "encode" ? SAMPLE_JS : SAMPLE_ESCAPED}
          rows={10}
        />

        <SharedOutput
          value={converted}
          label={mode === "encode" ? "UNICODE ESCAPED JAVASCRIPT" : "UNESCAPED CLEAN JAVASCRIPT"}
          downloadFilename="js-unicode.js"
          rows={10}
        />
      </div>

      {/* Quick Tips */}
      <div className="p-4 bg-muted/20 border border-border/60 rounded-xl space-y-1.5 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground">Compatibility Notice:</div>
        <p className="leading-relaxed">
          Standard <code className="text-primary font-mono">\uXXXX</code> escapes support characters in the Basic Multilingual Plane (up to U+FFFF). For emoji and astral symbols (U+10000+), modern ECMAScript (ES2015+) supports <code className="text-primary font-mono">\u{"{XXXXX}"}</code> syntax with the <code className="text-primary font-mono">u</code> flag. Disabling ES6 brackets converts them into traditional UTF-16 surrogate pairs (<code className="text-primary font-mono">\uD83D\uDE80</code>).
        </p>
      </div>
    </div>
  );
}

