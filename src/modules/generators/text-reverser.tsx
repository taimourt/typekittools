"use client";

import React, { useState, useMemo } from "react";
import { ArrowLeftRight, RefreshCcw, Copy, Check, Sparkles, FlipVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { reverseText } from "@/lib/unicode/text-transforms";

const SAMPLE_TEXT = "Hello World! 🚀 TypeKitTools flips text upside down & reverses graphemes accurately.";

export function TextReverserTool() {
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [mode, setMode] = useState<"characters" | "words" | "words-chars" | "lines" | "upside-down">(
    "characters"
  );

  const reversed = useMemo(() => {
    return reverseText(input, mode);
  }, [input, mode]);

  const modes = [
    {
      id: "characters",
      label: "Reverse Characters",
      desc: "Inverts every character while keeping emoji and surrogate pairs intact",
    },
    {
      id: "words",
      label: "Reverse Words",
      desc: "Reverses the order of words in each line",
    },
    {
      id: "words-chars",
      label: "Reverse Each Word",
      desc: "Reverses characters within each individual word",
    },
    {
      id: "lines",
      label: "Reverse Lines",
      desc: "Flips line order from bottom to top",
    },
    {
      id: "upside-down",
      label: "Upside Down (Flip)",
      desc: "Maps letters to Unicode upside-down flipped characters",
    },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-2 bg-muted/30 border border-border/60 rounded-xl">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors text-left flex items-center gap-1.5 ${
              mode === m.id
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "bg-muted/60 hover:bg-muted text-foreground"
            }`}
          >
            {m.id === "upside-down" ? (
              <FlipVertical className="w-3.5 h-3.5" />
            ) : (
              <ArrowLeftRight className="w-3.5 h-3.5" />
            )}
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {/* IO Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="ORIGINAL TEXT"
          placeholder="Type or paste text to reverse..."
          sampleValue={SAMPLE_TEXT}
        />

        <SharedOutput
          value={reversed}
          label={`REVERSED TEXT (${modes.find((m) => m.id === mode)?.label.toUpperCase()})`}
          downloadFilename={`reversed-${mode}.txt`}
        />
      </div>

      {/* Description Note */}
      <div className="p-3.5 bg-muted/20 border border-border/50 rounded-xl text-xs text-muted-foreground flex items-center justify-between">
        <span>
          <strong>Active Mode:</strong> {modes.find((m) => m.id === mode)?.desc}.
        </span>
        <span className="font-mono text-[11px] text-primary">Unicode Grapheme Safe</span>
      </div>
    </div>
  );
}

