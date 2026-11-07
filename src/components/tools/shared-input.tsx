"use client";

import React from "react";
import { Clipboard, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SharedInputProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  sampleValue?: string;
  errorMessage?: string | null;
  className?: string;
  showCounts?: boolean;
}

export function SharedInput({
  value,
  onChange,
  label = "INPUT",
  placeholder = "Type or paste content here...",
  rows = 8,
  sampleValue,
  errorMessage,
  className,
  showCounts = true,
}: SharedInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) onChange(text);
    } catch (e) {
      console.warn("Clipboard access not allowed or failed");
    }
  };

  const charCount = Array.from(value).length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={`space-y-2 ${className || ""}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground select-none">
        <span className="uppercase tracking-wider">{label}</span>

        <div className="flex items-center gap-2">
          {showCounts && (
            <span className="font-mono text-[11px] opacity-80">
              {charCount} chars • {wordCount} words
            </span>
          )}

          {sampleValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange(sampleValue)}
              className="h-6 px-1.5 text-[11px] text-primary gap-1"
            >
              <Sparkles className="h-3 w-3" />
              Sample
            </Button>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            className="h-6 px-1.5 text-[11px] text-muted-foreground hover:text-foreground gap-1"
          >
            <Clipboard className="h-3 w-3" />
            Paste
          </Button>

          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange("")}
              className="h-6 px-1.5 text-[11px] text-muted-foreground hover:text-foreground gap-1"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Textarea Area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full p-3.5 rounded-xl border bg-background font-mono text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-colors ${
          errorMessage
            ? "border-destructive/60 bg-destructive/5"
            : "border-input"
        }`}
      />

      {/* Error Message */}
      {errorMessage && (
        <div className="text-xs text-destructive font-mono pt-0.5">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

