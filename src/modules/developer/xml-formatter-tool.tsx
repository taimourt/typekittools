"use client";

import React, { useState, useMemo } from "react";
import { Code2, Minimize2, Sparkles, Copy, Check, FileCode, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { SharedOutput } from "@/components/tools/shared-output";
import { formatXml } from "@/lib/developer/advanced-transforms";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>TypeKitTools Updates</title><link>https://typekittools.com</link><description>Developer & character utilities updates</description><item><title>Phase 8 Launch</title><link>https://typekittools.com/tools</link><pubDate>Sat, 07 Nov 2026 00:00:00 GMT</pubDate><guid isPermaLink="true">https://typekittools.com/updates/phase-8</guid></item></channel></rss>`;

export function XmlFormatterTool() {
  const [input, setInput] = useState<string>(SAMPLE_XML);
  const [indentSize, setIndentSize] = useState<number | "tab">(2);

  const { formatted, isValid, error, tagCount } = useMemo(() => {
    return formatXml(input, { indent: indentSize });
  }, [input, indentSize]);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-muted/30 border border-border/60 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            XML Formatter & Beautifier
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-muted-foreground mr-1">Indent:</span>
          {(
            [
              { id: 2, label: "2 Spaces" },
              { id: 4, label: "4 Spaces" },
              { id: "tab", label: "Tabs" },
            ] as const
          ).map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => setIndentSize(opt.id)}
              className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors ${
                indentSize === opt.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main IO Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SharedInput
          value={input}
          onChange={setInput}
          label="RAW OR COMPACT XML / RSS / SVG / SOAP"
          placeholder="Paste XML document here..."
          sampleValue={SAMPLE_XML}
          errorMessage={error}
          rows={14}
        />

        <SharedOutput
          value={formatted}
          label="BEAUTIFIED & INDENTED XML"
          downloadFilename="document.xml"
          rows={14}
        />
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/20 border border-border/50 rounded-xl font-mono text-xs">
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Original Length
          </span>
          <span className="text-base font-bold text-foreground">{input.length} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Formatted Length
          </span>
          <span className="text-base font-bold text-foreground">{formatted.length} B</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            XML Elements
          </span>
          <span className="text-base font-bold text-primary">{tagCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground block text-[10px] uppercase font-sans">
            Validation
          </span>
          <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
            {isValid ? "Well-Formed" : "Syntax Error"}
          </span>
        </div>
      </div>
    </div>
  );
}

