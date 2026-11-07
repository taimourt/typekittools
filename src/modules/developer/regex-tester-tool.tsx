"use client";

import React, { useState, useMemo } from "react";
import { Search, Copy, Check, AlertCircle, Sparkles, BookOpen, Replace, Info } from "lucide-react";

interface PresetPattern {
  name: string;
  pattern: string;
  flags: string;
  sample: string;
}

const PRESET_PATTERNS: PresetPattern[] = [
  {
    name: "Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: "g",
    sample: "Contact us at support@typekittools.com or admin@example.org for questions.",
  },
  {
    name: "URL / Web Address",
    pattern: "https?:\\/\\/[a-zA-Z0-9.-]+(?:\\.[a-zA-Z]{2,})+(?:\\/[^\\s]*)?",
    flags: "g",
    sample: "Visit https://typekittools.com or http://subdomain.example.co.uk/page?id=10.",
  },
  {
    name: "IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    flags: "g",
    sample: "Local router is at 192.168.1.1, Google DNS is 8.8.8.8, invalid is 999.1.2.3.",
  },
  {
    name: "Hex Color Code",
    pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b",
    flags: "gi",
    sample: "Primary theme: #0d9488, background: #FFF, accent: #f43f5e, dark: #0f172a.",
  },
  {
    name: "ISO Date (YYYY-MM-DD)",
    pattern: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
    flags: "g",
    sample: "Release scheduled on 2026-11-06 and next sprint begins on 2026-11-20.",
  },
  {
    name: "US / Canada Phone",
    pattern: "\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})",
    flags: "g",
    sample: "Call toll-free (800) 555-0199 or mobile 415-555-2671 anytime.",
  },
];

interface RegexMatch {
  index: number;
  length: number;
  text: string;
  groups: string[];
}

export function RegexTesterTool() {
  const [pattern, setPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean; s: boolean; u: boolean }>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: true,
  });
  const [testString, setTestString] = useState<string>(
    "Contact our team at hello@typekittools.com or send feedback to developer.tools@company.co.uk!"
  );
  const [replacement, setReplacement] = useState<string>("<$1>");
  const [activeTab, setActiveTab] = useState<"matches" | "replace" | "cheatsheet">("matches");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Build active flags string
  const flagsString = useMemo(() => {
    let s = "";
    if (flags.g) s += "g";
    if (flags.i) s += "i";
    if (flags.m) s += "m";
    if (flags.s) s += "s";
    if (flags.u) s += "u";
    return s;
  }, [flags]);

  // Execute regex matching safely
  const { matches, error, regex } = useMemo(() => {
    if (!pattern) return { matches: [], error: null, regex: null };
    try {
      const reg = new RegExp(pattern, flagsString);
      const list: RegexMatch[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        let loopLimit = 0;
        // Reset lastIndex
        reg.lastIndex = 0;
        while ((m = reg.exec(testString)) !== null && loopLimit < 2000) {
          loopLimit++;
          list.push({
            index: m.index,
            length: m[0].length,
            text: m[0],
            groups: m.slice(1),
          });
          // Prevent infinite loop on zero-length matches
          if (m.index === reg.lastIndex) {
            reg.lastIndex++;
          }
        }
      } else {
        const m = reg.exec(testString);
        if (m) {
          list.push({
            index: m.index,
            length: m[0].length,
            text: m[0],
            groups: m.slice(1),
          });
        }
      }

      return { matches: list, error: null, regex: reg };
    } catch (err: any) {
      return { matches: [], error: err.message || "Invalid regular expression", regex: null };
    }
  }, [pattern, flagsString, testString, flags.g]);

  // Compute replaced text
  const replacedText = useMemo(() => {
    if (!regex || error) return testString;
    try {
      return testString.replace(regex, replacement);
    } catch {
      return testString;
    }
  }, [regex, error, testString, replacement]);

  const toggleFlag = (flag: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const loadPreset = (preset: PresetPattern) => {
    setPattern(preset.pattern);
    setTestString(preset.sample);
    setFlags({
      g: preset.flags.includes("g"),
      i: preset.flags.includes("i"),
      m: preset.flags.includes("m"),
      s: preset.flags.includes("s"),
      u: preset.flags.includes("u"),
    });
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  // Render Highlighted HTML
  const renderHighlightedText = () => {
    if (!matches.length) return testString;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((m, i) => {
      // Unmatched prefix
      if (m.index > lastIndex) {
        elements.push(testString.substring(lastIndex, m.index));
      }
      // Highlighted match
      elements.push(
        <mark
          key={i}
          className="bg-amber-300 text-slate-900 font-semibold px-0.5 rounded shadow-xs border-b-2 border-amber-500"
          title={`Match #${i + 1} at position [${m.index}..${m.index + m.length}]`}
        >
          {testString.substring(m.index, m.index + m.length)}
        </mark>
      );
      lastIndex = m.index + m.length;
    });

    if (lastIndex < testString.length) {
      elements.push(testString.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div className="space-y-6">
      {/* Pattern Input & Flag Controls */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
          Regular Expression (JavaScript / ECMAScript):
        </label>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Regex Slash Container */}
          <div className="flex-1 flex items-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 shadow-inner">
            <span className="font-mono text-slate-400 font-bold text-lg select-none mr-2">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              className="flex-1 font-mono text-sm bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400"
            />
            <span className="font-mono text-slate-400 font-bold text-lg select-none mx-2">/</span>
            <span className="font-mono text-teal-600 font-bold text-sm select-none">{flagsString}</span>
          </div>

          {/* Flag Toggle Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            {(["g", "i", "m", "s", "u"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                className={`w-7 h-7 font-mono text-xs font-bold rounded flex items-center justify-center transition-colors ${
                  flags[f] ? "bg-teal-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title={
                  f === "g"
                    ? "global: don't return after first match"
                    : f === "i"
                    ? "ignoreCase: case-insensitive match"
                    : f === "m"
                    ? "multiline: ^ and $ match line boundaries"
                    : f === "s"
                    ? "dotAll: . matches newlines"
                    : "unicode: full Unicode code point handling"
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Error notification if regex syntax is invalid */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Regex Error: {error}</span>
          </div>
        )}
      </div>

      {/* Preset Library Carousel */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Quick Presets:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {PRESET_PATTERNS.map((p) => (
            <button
              key={p.name}
              onClick={() => loadPreset(p)}
              className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-300 rounded-lg shadow-2xs transition-colors"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Test String Input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Test String:
          </label>
          <span className="text-xs text-slate-500 font-mono">
            {testString.length} chars
          </span>
        </div>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Paste or type sample string here to test matches against your pattern..."
          rows={4}
          className="w-full p-3 font-mono text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner resize-y"
        />
      </div>

      {/* Live Visual Match Highlighter */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-teal-600" />
            Live Match Highlighting:
          </label>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
            {matches.length} {matches.length === 1 ? "match" : "matches"} found
          </span>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm text-slate-800 whitespace-pre-wrap break-words leading-relaxed min-h-[70px]">
          {renderHighlightedText()}
        </div>
      </div>

      {/* Multi-Tab Workspace: Match Details, Substitution / Replace, Cheat Sheet */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 pt-2 gap-2">
          <button
            onClick={() => setActiveTab("matches")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "matches"
                ? "border-teal-600 text-teal-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Match Details ({matches.length})
          </button>

          <button
            onClick={() => setActiveTab("replace")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "replace"
                ? "border-teal-600 text-teal-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Replace className="w-3.5 h-3.5" />
            Substitution / Replace
          </button>

          <button
            onClick={() => setActiveTab("cheatsheet")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "cheatsheet"
                ? "border-teal-600 text-teal-700 bg-white rounded-t-lg"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Regex Cheat Sheet
          </button>
        </div>

        {/* Tab 1: Match Details Table */}
        {activeTab === "matches" && (
          <div className="p-4">
            {matches.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                No matches found with current pattern and flags.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">Full Match</th>
                      <th className="py-2 px-3">Position [Start..End]</th>
                      <th className="py-2 px-3">Capture Groups</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {matches.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold text-slate-400">{idx + 1}</td>
                        <td className="py-2 px-3 text-teal-800 font-semibold">{m.text}</td>
                        <td className="py-2 px-3 text-slate-500">[{m.index}..{m.index + m.length}]</td>
                        <td className="py-2 px-3">
                          {m.groups.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {m.groups.map((g, gIdx) => (
                                <span key={gIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                                  ${gIdx + 1}: {g || <span className="italic text-slate-400">null</span>}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">None</span>
                          )}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => copyText(m.text, `m_${idx}`)}
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors"
                            title="Copy Match"
                          >
                            {copiedKey === `m_${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Substitution / Replace */}
        {activeTab === "replace" && (
          <div className="p-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Replacement Pattern (Supports $1, $2, $&):
              </label>
              <input
                type="text"
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
                placeholder="e.g. [$1] or [REDACTED]"
                className="w-full px-3 py-2 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Replaced Output:
                </label>
                <button
                  onClick={() => copyText(replacedText, "replaced")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors shadow-2xs"
                >
                  {copiedKey === "replaced" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === "replaced" ? "Copied" : "Copy Output"}
                </button>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs text-slate-900 whitespace-pre-wrap break-words min-h-[80px]">
                {replacedText}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Cheat Sheet */}
        {activeTab === "cheatsheet" && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Character Classes</h5>
              <div className="divide-y divide-slate-100 font-mono">
                <div className="py-1 flex justify-between"><code className="text-teal-700">\d</code><span className="text-slate-600 font-sans">Any digit [0-9]</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">\D</code><span className="text-slate-600 font-sans">Any non-digit</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">\w</code><span className="text-slate-600 font-sans">Word character [a-zA-Z0-9_]</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">\s</code><span className="text-slate-600 font-sans">Whitespace (spaces, tabs, breaks)</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">.</code><span className="text-slate-600 font-sans">Any character except newline</span></div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Quantifiers & Anchors</h5>
              <div className="divide-y divide-slate-100 font-mono">
                <div className="py-1 flex justify-between"><code className="text-teal-700">^ / $</code><span className="text-slate-600 font-sans">Start / end of string or line</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">\b</code><span className="text-slate-600 font-sans">Word boundary</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">*</code><span className="text-slate-600 font-sans">0 or more times (greedy)</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">+</code><span className="text-slate-600 font-sans">1 or more times (greedy)</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">?</code><span className="text-slate-600 font-sans">0 or 1 time (optional)</span></div>
                <div className="py-1 flex justify-between"><code className="text-teal-700">&#123;n,m&#125;</code><span className="text-slate-600 font-sans">Between n and m times</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guide Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
        <h4 className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal-600" />
          JavaScript Regular Expressions
        </h4>
        <p>
          Antigravity runs real ECMAScript RegExp engines natively in your browser. All tests evaluate locally with zero latency and complete privacy for proprietary strings or tokens.
        </p>
      </div>
    </div>
  );
}

