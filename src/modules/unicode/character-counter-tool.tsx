"use client";

import React, { useState } from "react";
import { SharedInput } from "@/components/tools/shared-input";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";
import {
  countGraphemes,
  countCodePoints,
  countUtf8Bytes,
} from "@/lib/unicode/graphemes";

export function CharacterCounterTool() {
  const [text, setText] = useState(
    "TypeKitTools measures true Unicode characters, emojis like 🚀 and 👨‍👩‍👧‍👦, and UTF-8 bytes!"
  );

  // Accurate counts
  const graphemeCount = countGraphemes(text);
  const codePointCount = countCodePoints(text);
  const utf16Length = text.length;
  const utf8Bytes = countUtf8Bytes(text);

  // Text metrics
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1 : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim()).length : 0;
  const lines = text ? text.split("\n").length : 0;

  // Reading & speaking times (average 200 wpm reading, 130 wpm speaking)
  const readingTimeSec = Math.ceil((words / 200) * 60);
  const speakingTimeSec = Math.ceil((words / 130) * 60);

  // Density breakdown
  const letters = (text.match(/[\p{L}]/gu) || []).length;
  const numbers = (text.match(/[0-9]/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const emojis = (text.match(/\p{Extended_Pictographic}/gu) || []).length;

  return (
    <div className="p-6 space-y-6">
      <SharedInput
        value={text}
        onChange={setText}
        label="PASTE OR TYPE TEXT TO ANALYZE"
        rows={6}
        sampleValue="TypeKitTools measures true Unicode characters, emojis like 🚀 and 👨‍👩‍👧‍👦, and UTF-8 bytes!"
      />

      {/* Primary Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            Visible Characters
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-primary font-mono">
            {graphemeCount}
          </div>
          <p className="text-[10px] text-muted-foreground">True grapheme clusters</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            Word Count
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
            {words}
          </div>
          <p className="text-[10px] text-muted-foreground">Whitespace delimited</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            UTF-8 Bytes
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
            {utf8Bytes}
          </div>
          <p className="text-[10px] text-muted-foreground">Payload size on wire</p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-1">
          <span className="text-xs font-mono text-muted-foreground uppercase">
            JS .length (UTF-16)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
            {utf16Length}
          </div>
          <p className="text-[10px] text-muted-foreground">Code units including surrogates</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-0.5">
          <span className="text-muted-foreground">Sentences:</span>
          <div className="text-base font-bold text-foreground font-mono">{sentences}</div>
        </div>
        <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-0.5">
          <span className="text-muted-foreground">Paragraphs:</span>
          <div className="text-base font-bold text-foreground font-mono">{paragraphs}</div>
        </div>
        <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-0.5">
          <span className="text-muted-foreground">Est. Reading Time:</span>
          <div className="text-base font-bold text-foreground font-mono">
            {readingTimeSec < 60 ? `${readingTimeSec}s` : `${Math.ceil(readingTimeSec / 60)}m`}
          </div>
        </div>
        <div className="p-3 rounded-lg border border-border/60 bg-muted/20 space-y-0.5">
          <span className="text-muted-foreground">Est. Speaking Time:</span>
          <div className="text-base font-bold text-foreground font-mono">
            {speakingTimeSec < 60 ? `${speakingTimeSec}s` : `${Math.ceil(speakingTimeSec / 60)}m`}
          </div>
        </div>
      </div>

      {/* Breakdown Bar */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Detailed Character Breakdown
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
          <div className="p-2 rounded bg-muted/40 flex items-center justify-between">
            <span className="text-muted-foreground">Letters:</span>
            <span className="font-bold text-foreground">{letters}</span>
          </div>
          <div className="p-2 rounded bg-muted/40 flex items-center justify-between">
            <span className="text-muted-foreground">Numbers:</span>
            <span className="font-bold text-foreground">{numbers}</span>
          </div>
          <div className="p-2 rounded bg-muted/40 flex items-center justify-between">
            <span className="text-muted-foreground">Spaces:</span>
            <span className="font-bold text-foreground">{spaces}</span>
          </div>
          <div className="p-2 rounded bg-muted/40 flex items-center justify-between">
            <span className="text-muted-foreground">Emojis:</span>
            <span className="font-bold text-foreground">{emojis}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

