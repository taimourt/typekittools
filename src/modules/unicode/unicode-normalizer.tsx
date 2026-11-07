"use client";

import React, { useState, useMemo } from "react";
import { Sparkles, Copy, Check, Info, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { normalizeUnicode } from "@/lib/unicode/text-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_TEXT = "Café résumé — 2⁴ = 16 & ½ cup — ﬃ ligature — \u0065\u0301 decomposed";

export function UnicodeNormalizerTool() {
  const [input, setInput] = useState<string>(SAMPLE_TEXT);
  const [copiedForm, setCopiedForm] = useState<string | null>(null);

  const normalizationResult = useMemo(() => {
    return normalizeUnicode(input);
  }, [input]);

  const handleCopy = async (text: string, formName: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedForm(formName);
      setTimeout(() => setCopiedForm(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="INPUT UNICODE TEXT TO NORMALIZE"
        placeholder="Type or paste characters with accents, ligatures, or decomposed marks..."
        sampleValue={SAMPLE_TEXT}
        rows={4}
      />

      {/* Normalization Forms Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Standard Unicode Normalization Forms
          </h3>
          <span className="text-xs text-muted-foreground">
            W3C & Unicode 16.0 Specification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {normalizationResult.comparison.map((item) => (
            <div
              key={item.form}
              className="p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold font-mono bg-primary/10 text-primary">
                      {item.form}
                    </span>
                    <span className="text-xs font-semibold text-foreground">{item.name}</span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.isIdentical
                        ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-semibold"
                    }`}
                  >
                    {item.isIdentical ? "Identical to input" : "Transformed"}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Normalized Value Box */}
                <div className="p-3 bg-muted/30 border border-border/50 rounded-lg font-mono text-xs text-foreground break-all max-h-32 overflow-y-auto select-all">
                  {item.value || <span className="opacity-40 italic">Empty string</span>}
                </div>
              </div>

              {/* Card Footer: Metrics & Copy */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                <span>
                  {item.charCount} chars • {item.byteCount} bytes
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(item.value, item.form)}
                  className="h-7 text-xs font-sans gap-1.5"
                >
                  {copiedForm === item.form ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy {item.form}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Guide Alert */}
      <div className="p-4 bg-muted/20 border border-border/60 rounded-xl space-y-2 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <Info className="w-4 h-4 text-primary" />
          Which Normalization Form Should I Use?
        </div>
        <p className="leading-relaxed">
          <strong className="text-foreground">NFC (Canonical Composition)</strong> is the official W3C web recommendation and standard for database storage and indexing. It ensures that accented letters like <code className="text-primary font-mono">é</code> are represented as a single compact code point (<code className="text-primary font-mono">U+00E9</code>) rather than two separate bytes (<code className="text-primary font-mono">e + \u0301</code>).
        </p>
        <p className="leading-relaxed">
          <strong className="text-foreground">NFKC / NFKD (Compatibility Forms)</strong> are ideal for search engines and natural language processing (NLP) because they map typographical variants (such as fullwidth letters, fractions, superscripts, and ligatures like <code className="text-primary font-mono">ﬁ</code>) back to plain ASCII letters (<code className="text-primary font-mono">fi</code>).
        </p>
      </div>
    </div>
  );
}

