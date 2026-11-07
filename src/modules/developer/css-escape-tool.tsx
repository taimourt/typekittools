"use client";

import React, { useState, useMemo } from "react";
import { Hash, Code, Copy, Check, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { escapeCssSelector } from "@/lib/developer/dev-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_INPUT = "sm:hover:bg-red-500/20";

export function CssEscapeTool() {
  const [input, setInput] = useState<string>(SAMPLE_INPUT);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { selectorEscape, cssContentEscape, tailwindClassEscape } = useMemo(() => {
    return escapeCssSelector(input);
  }, [input]);

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const escapeVariants = [
    {
      key: "selector",
      title: "CSS.escape() Standard Selector",
      description: "Conforms to W3C CSS Syntax Level 3. Use in querySelector('#' + id) or .class",
      exampleQuery: `document.querySelector(".${selectorEscape}")`,
      value: selectorEscape,
    },
    {
      key: "tailwind",
      title: "Tailwind CSS Arbitrary / Complex Class Escape",
      description: "Escapes colons, brackets, slashes, and periods for stylesheet rule definitions",
      exampleQuery: `.${tailwindClassEscape} { ... }`,
      value: `.${tailwindClassEscape}`,
    },
    {
      key: "content",
      title: "CSS Content Property Escape (Hex Code Points)",
      description: "Safe for pseudo-element content: '\\XXXX' rules without encoding issues",
      exampleQuery: `.icon::before { ${cssContentEscape} }`,
      value: cssContentEscape,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="IDENTIFIER, CLASS NAME, ID OR STRING TO ESCAPE"
        placeholder="e.g. sm:hover:bg-red-500, 123-header, user.profile"
        sampleValue={SAMPLE_INPUT}
        rows={2}
      />

      {/* Quick Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Presets:</span>
        {[
          { label: "Tailwind with Colons & Slashes", val: "sm:hover:bg-red-500/20" },
          { label: "ID Starting with Number", val: "123-dashboard-header" },
          { label: "Dot in Class Name", val: "btn.primary.active" },
          { label: "Special Symbols & Emoji", val: "tag#🔥-trending" },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => setInput(preset.val)}
            className="px-2.5 py-1 text-xs rounded-md border border-border/60 bg-muted/50 hover:bg-muted text-foreground transition-colors font-mono"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Escaped Cards */}
      <div className="space-y-4">
        {escapeVariants.map((variant) => (
          <div
            key={variant.key}
            className="p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  {variant.title}
                </h4>
                <p className="text-xs text-muted-foreground">{variant.description}</p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCopy(variant.value, variant.key)}
                className="h-7 text-xs gap-1.5"
              >
                {copiedKey === variant.key ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Escaped Output Box */}
            <div className="p-3 bg-muted/30 border border-border/50 rounded-lg font-mono text-xs text-foreground break-all select-all">
              {variant.value || <span className="opacity-40 italic">Empty identifier</span>}
            </div>

            {/* Usage in Code */}
            <div className="text-[11px] text-muted-foreground font-mono bg-muted/10 p-2 rounded-md">
              <span className="text-muted-foreground/60 select-none mr-2">{"// Usage:"}</span>
              <span className="text-primary">{variant.exampleQuery}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Educational Note */}
      <div className="p-4 bg-muted/20 border border-border/60 rounded-xl space-y-2 text-xs text-muted-foreground">
        <div className="font-semibold text-foreground flex items-center gap-1.5">
          <Info className="w-4 h-4 text-primary" />
          Why Are CSS Escapes Required?
        </div>
        <p className="leading-relaxed">
          In CSS and querySelector, characters such as colons (<code className="font-mono text-primary">:</code>), periods (<code className="font-mono text-primary">.</code>), hashes (<code className="font-mono text-primary">#</code>), and brackets (<code className="font-mono text-primary">[]</code>) have special grammatical meaning (pseudo-classes, class selectors, ID selectors, and attribute selectors). When utility-first frameworks like Tailwind use class names like <code className="font-mono text-primary">sm:hover:bg-red-500</code>, trying to select them with <code className="font-mono text-primary">document.querySelector(&quot;.sm:hover:bg-red-500&quot;)</code> throws a DOMException error unless escaped as <code className="font-mono text-primary">.sm\\:hover\\:bg-red-500</code>.
        </p>
      </div>
    </div>
  );
}

