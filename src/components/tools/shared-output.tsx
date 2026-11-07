"use client";

import React from "react";
import { CopyButton } from "./copy-button";
import { DownloadButton } from "./download-button";
import { countUtf8Bytes } from "@/lib/unicode/graphemes";

interface SharedOutputProps {
  value: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  downloadFilename?: string;
  errorMessage?: string | null;
  className?: string;
  showCounts?: boolean;
  extraActions?: React.ReactNode;
}

export function SharedOutput({
  value,
  label = "OUTPUT",
  placeholder = "Output will appear automatically...",
  rows = 8,
  downloadFilename = "output.txt",
  errorMessage,
  className,
  showCounts = true,
  extraActions,
}: SharedOutputProps) {
  const charCount = Array.from(value).length;
  const byteCount = countUtf8Bytes(value);

  return (
    <div className={`space-y-2 ${className || ""}`}>
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground select-none">
        <span className="uppercase tracking-wider">{label}</span>

        <div className="flex items-center gap-2">
          {showCounts && value && (
            <span className="font-mono text-[11px] opacity-80">
              {charCount} chars • {byteCount} B
            </span>
          )}

          {extraActions}

          <DownloadButton
            content={value}
            filename={downloadFilename}
          />

          <CopyButton text={value} />
        </div>
      </div>

      {/* Output Area */}
      <textarea
        readOnly
        value={errorMessage ? errorMessage : value}
        rows={rows}
        placeholder={placeholder}
        className={`w-full p-3.5 rounded-xl border font-mono text-xs sm:text-sm resize-y focus:outline-none transition-colors ${
          errorMessage
            ? "border-destructive/60 bg-destructive/5 text-destructive"
            : "border-border bg-muted/20 text-foreground"
        }`}
      />
    </div>
  );
}

