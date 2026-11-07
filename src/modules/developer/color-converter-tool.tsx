"use client";

import React, { useState, useMemo } from "react";
import { Palette, Copy, Check, Sparkles, Sliders, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { convertColor, ConvertedColorDetails } from "@/lib/developer/advanced-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_COLOR = "#0D9488"; // Tailwind Teal-600

export function ColorConverterTool() {
  const [input, setInput] = useState<string>(SAMPLE_COLOR);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const color: ConvertedColorDetails = useMemo(() => {
    return convertColor(input);
  }, [input]);

  const handleCopy = async (val: string, key: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const formats = [
    { label: "HEX", val: color.hex, id: "hex" },
    { label: "HEX with Alpha (8-digit)", val: color.hex8, id: "hex8" },
    { label: "RGB", val: color.rgb, id: "rgb" },
    { label: "RGBA", val: color.rgba, id: "rgba" },
    { label: "HSL", val: color.hsl, id: "hsl" },
    { label: "HSLA", val: color.hsla, id: "hsla" },
    { label: "CMYK (Print)", val: color.cmyk, id: "cmyk" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Input & Color Swatch */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center p-6 bg-muted/20 border border-border/60 rounded-xl">
        {/* Color Swatch & Native Picker */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div
            className="w-24 h-24 rounded-2xl shadow-md border-2 border-white/50 dark:border-black/50 relative overflow-hidden transition-all duration-300"
            style={{ backgroundColor: color.isValid ? color.rgba : "#ccc" }}
          >
            <input
              type="color"
              value={color.isValid ? color.hex : "#000000"}
              onChange={(e) => setInput(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium">Click swatch to pick</span>
        </div>

        {/* Input box */}
        <div className="sm:col-span-2 space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Enter Any Color Format (HEX, RGB, RGBA, HSL)
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="#0d9488, rgb(13, 148, 136), hsl(175, 84%, 32%)"
            className="w-full h-11 px-4 text-sm font-mono rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
          />
          {color.error && (
            <p className="text-xs text-red-500 font-medium">{color.error}</p>
          )}

          {/* Quick Swatches */}
          <div className="flex items-center gap-1.5 pt-1">
            {[
              { label: "Teal", hex: "#0D9488" },
              { label: "Indigo", hex: "#6366F1" },
              { label: "Rose", hex: "#F43F5E" },
              { label: "Amber", hex: "#F59E0B" },
              { label: "Emerald", hex: "#10B981" },
              { label: "Sky", hex: "#0EA5E9" },
            ].map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => setInput(swatch.hex)}
                className="w-5 h-5 rounded-full border border-black/10 shadow-xs hover:scale-110 transition-transform"
                style={{ backgroundColor: swatch.hex }}
                title={swatch.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Formats Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Color Code Formats
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formats.map((f) => (
            <div
              key={f.id}
              className="p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors shadow-xs space-y-1.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <span>{f.label}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCopy(f.val, f.id)}
                  disabled={!color.isValid}
                  className="h-6 px-2 text-xs"
                >
                  {copiedKey === f.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
              </div>

              <div className="font-mono text-xs text-foreground font-semibold bg-muted/20 p-2.5 rounded-lg select-all">
                {color.isValid ? f.val : <span className="opacity-30 italic">—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility Contrast Ratio Analysis */}
      {color.isValid && (
        <div className="p-4 bg-muted/20 border border-border/60 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              WCAG Accessibility & Contrast Check
            </span>
            <span className="text-xs text-muted-foreground">WCAG 2.1 Standard</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Against White */}
            <div className="p-3.5 rounded-lg bg-white text-slate-900 border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold">Contrast vs White (#FFFFFF)</div>
                <div className="text-lg font-bold font-mono">
                  {color.contrastWhite}:1
                </div>
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  color.contrastWhite >= 4.5
                    ? "bg-emerald-100 text-emerald-800"
                    : color.contrastWhite >= 3.0
                    ? "bg-amber-100 text-amber-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {color.contrastWhite >= 7.0
                  ? "AAA Pass"
                  : color.contrastWhite >= 4.5
                  ? "AA Pass"
                  : "Fail"}
              </span>
            </div>

            {/* Against Black */}
            <div className="p-3.5 rounded-lg bg-slate-950 text-white border border-slate-800 flex items-center justify-between shadow-xs">
              <div>
                <div className="text-xs font-bold">Contrast vs Black (#000000)</div>
                <div className="text-lg font-bold font-mono">
                  {color.contrastBlack}:1
                </div>
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  color.contrastBlack >= 4.5
                    ? "bg-emerald-900/60 text-emerald-300"
                    : color.contrastBlack >= 3.0
                    ? "bg-amber-900/60 text-amber-300"
                    : "bg-red-900/60 text-red-300"
                }`}
              >
                {color.contrastBlack >= 7.0
                  ? "AAA Pass"
                  : color.contrastBlack >= 4.5
                  ? "AA Pass"
                  : "Fail"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

