"use client";

import React, { useState } from "react";
import { Copy, Trash2, ArrowUp, Sparkles } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";
import { DownloadButton } from "@/components/tools/download-button";

interface LanguageAccents {
  name: string;
  lower: string[];
  upper: string[];
}

const ACCENT_SETS: Record<string, LanguageAccents> = {
  all: {
    name: "Common Accents",
    lower: ["á", "à", "â", "ä", "ã", "å", "æ", "ç", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ñ", "ó", "ò", "ô", "ö", "õ", "ø", "œ", "ß", "ú", "ù", "û", "ü", "¿", "¡"],
    upper: ["Á", "À", "Â", "Ä", "Ã", "Å", "Æ", "Ç", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ñ", "Ó", "Ò", "Ô", "Ö", "Õ", "Ø", "Œ", "ẞ", "Ú", "Ù", "Û", "Ü", "¿", "¡"],
  },
  spanish: {
    name: "Spanish (Español)",
    lower: ["á", "é", "í", "ó", "ú", "ü", "ñ", "¿", "¡"],
    upper: ["Á", "É", "Í", "Ó", "Ú", "Ü", "Ñ", "¿", "¡"],
  },
  french: {
    name: "French (Français)",
    lower: ["é", "è", "ê", "ë", "à", "â", "ç", "î", "ï", "ô", "ù", "û", "ü", "œ", "æ"],
    upper: ["É", "È", "Ê", "Ë", "À", "Â", "Ç", "Î", "Ï", "Ô", "Ù", "Û", "Ü", "Œ", "Æ"],
  },
  german: {
    name: "German (Deutsch)",
    lower: ["ä", "ö", "ü", "ß"],
    upper: ["Ä", "Ö", "Ü", "ẞ"],
  },
  portuguese: {
    name: "Portuguese (Português)",
    lower: ["á", "é", "í", "ó", "ú", "â", "ê", "ô", "ã", "õ", "ç"],
    upper: ["Á", "É", "Í", "Ó", "Ú", "Â", "Ê", "Ô", "Ã", "Õ", "Ç"],
  },
  scandinavian: {
    name: "Nordic (Å, Æ, Ø, Ä, Ö)",
    lower: ["å", "æ", "ø", "ä", "ö"],
    upper: ["Å", "Æ", "Ø", "Ä", "Ö"],
  },
};

export function AccentKeyboardTool() {
  const [activeLang, setActiveLang] = useState("all");
  const [isUppercase, setIsUppercase] = useState(false);
  const [text, setText] = useState("Type or click accent keys below: señor, café, naïve, déjà vu");

  const currentSet = ACCENT_SETS[activeLang];
  const keys = isUppercase ? currentSet.upper : currentSet.lower;

  const handleKeyPress = (char: string) => {
    setText((prev) => prev + char);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Language Tabs & Shift Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/60">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {Object.entries(ACCENT_SETS).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setActiveLang(key)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                activeLang === key
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsUppercase(!isUppercase)}
            className={`px-3 py-1 rounded-md text-xs font-mono font-semibold flex items-center gap-1 transition-colors border ${
              isUppercase
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-foreground hover:bg-muted"
            }`}
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {isUppercase ? "UPPERCASE" : "lowercase"}
          </button>
        </div>
      </div>

      {/* Virtual Accent Keypad */}
      <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Virtual Keyboard Keys (Click to Insert)
        </div>
        <div className="flex flex-wrap gap-2">
          {keys.map((k, i) => (
            <button
              key={i}
              onClick={() => handleKeyPress(k)}
              className="w-10 h-10 rounded-lg bg-card border border-border shadow-sm hover:border-primary hover:bg-primary/5 active:scale-95 transition-all font-mono text-lg font-bold text-foreground flex items-center justify-center select-none"
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Notepad */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>EDITABLE NOTEPAD ({Array.from(text).length} chars)</span>
          <div className="flex items-center gap-2">
            <ResetButton onReset={() => setText("")} disabled={!text} />
            <DownloadButton content={text} filename="accent-text.txt" />
            <CopyButton text={text} label="Copy Text" variant="default" />
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Your accented text will appear here. You can also type directly into this box..."
          className="w-full p-4 rounded-xl border border-input bg-background font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
        />
      </div>

      {/* Physical Keyboard Shortcuts Reference */}
      <div className="p-4 rounded-xl border border-border bg-card shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Physical Keyboard Shortcuts Quick Reference</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-border/80 text-muted-foreground">
                <th className="pb-2 font-semibold">Letter</th>
                <th className="pb-2 font-semibold">Windows Alt Code</th>
                <th className="pb-2 font-semibold">Mac Option Shortcut</th>
                <th className="pb-2 font-semibold">MS Word Shortcut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono text-xs">
              <tr>
                <td className="py-1.5 font-bold text-foreground">ñ / Ñ</td>
                <td className="py-1.5 text-primary">Alt + 164 / Alt + 165</td>
                <td className="py-1.5">Option + N, then N</td>
                <td className="py-1.5">Ctrl + Shift + ~, then N</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">é / É</td>
                <td className="py-1.5 text-primary">Alt + 130 / Alt + 144</td>
                <td className="py-1.5">Option + E, then E</td>
                <td className="py-1.5">Ctrl + &apos;, then E</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">á / Á</td>
                <td className="py-1.5 text-primary">Alt + 160 / Alt + 0193</td>
                <td className="py-1.5">Option + E, then A</td>
                <td className="py-1.5">Ctrl + &apos;, then A</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">ó / Ó</td>
                <td className="py-1.5 text-primary">Alt + 162 / Alt + 0211</td>
                <td className="py-1.5">Option + E, then O</td>
                <td className="py-1.5">Ctrl + &apos;, then O</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">à / À</td>
                <td className="py-1.5 text-primary">Alt + 133 / Alt + 0192</td>
                <td className="py-1.5">Option + `, then A</td>
                <td className="py-1.5">Ctrl + `, then A</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">ü / Ü</td>
                <td className="py-1.5 text-primary">Alt + 129 / Alt + 154</td>
                <td className="py-1.5">Option + U, then U</td>
                <td className="py-1.5">Ctrl + Shift + :, then U</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">ç / Ç</td>
                <td className="py-1.5 text-primary">Alt + 135 / Alt + 128</td>
                <td className="py-1.5">Option + C</td>
                <td className="py-1.5">Ctrl + ,, then C</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-foreground">¿ / ¡</td>
                <td className="py-1.5 text-primary">Alt + 168 / Alt + 173</td>
                <td className="py-1.5">Option + Shift + ? / Option + 1</td>
                <td className="py-1.5">Alt + Ctrl + Shift + ? / !</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

