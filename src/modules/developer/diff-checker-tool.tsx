"use client";

import React, { useState, useMemo } from "react";
import { GitCompare, ArrowLeftRight, Copy, Check, FileCode, Columns, AlignJustify, RefreshCw, Info } from "lucide-react";
import { computeLineDiff, generateUnifiedPatch } from "@/lib/utils/diff";

const SAMPLE_ORIGINAL = `function calculateTotal(items, taxRate) {
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price;
  }
  const tax = subtotal * taxRate;
  return subtotal + tax;
}`;

const SAMPLE_MODIFIED = `function calculateTotal(items, taxRate = 0.08) {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }
  const subtotal = items.reduce((acc, item) => acc + (item.price || 0), 0);
  const tax = subtotal * taxRate;
  return Math.round((subtotal + tax) * 100) / 100;
}`;

export function DiffCheckerTool() {
  const [original, setOriginal] = useState<string>(SAMPLE_ORIGINAL);
  const [modified, setModified] = useState<string>(SAMPLE_MODIFIED);
  const [viewMode, setViewMode] = useState<"unified" | "split">("split");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);

  const diff = useMemo(() => {
    return computeLineDiff(original, modified, { ignoreWhitespace });
  }, [original, modified, ignoreWhitespace]);

  const swapTexts = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  const loadSample = () => {
    setOriginal(SAMPLE_ORIGINAL);
    setModified(SAMPLE_MODIFIED);
  };

  const copyPatch = async () => {
    const patch = generateUnifiedPatch("code.js", original, modified, diff);
    try {
      await navigator.clipboard.writeText(patch);
      setCopiedPatch(true);
      setTimeout(() => setCopiedPatch(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("split")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === "split" ? "bg-white text-teal-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              Side-by-Side (Split)
            </button>
            <button
              onClick={() => setViewMode("unified")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === "unified" ? "bg-white text-teal-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <AlignJustify className="w-3.5 h-3.5" />
              Inline (Unified)
            </button>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Ignore Whitespace
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={swapTexts}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Swap Original and Modified texts"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-slate-600" />
            Swap
          </button>

          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-600" />
            Sample Code
          </button>

          <button
            onClick={() => {
              setOriginal("");
              setModified("");
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear
          </button>

          <button
            onClick={copyPatch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
          >
            {copiedPatch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedPatch ? "Patch Copied!" : "Copy Git Patch"}
          </button>
        </div>
      </div>

      {/* Input Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Original Text (Before)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {original.split("\n").length} lines
            </span>
          </div>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            placeholder="Paste your original text or code here..."
            rows={8}
            className="w-full p-3 font-mono text-xs bg-white border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 shadow-inner resize-y"
          />
        </div>

        {/* Right Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Modified Text (After)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {modified.split("\n").length} lines
            </span>
          </div>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            placeholder="Paste your modified text or code here..."
            rows={8}
            className="w-full p-3 font-mono text-xs bg-white border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-inner resize-y"
          />
        </div>
      </div>

      {/* Diff Result Statistics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-white rounded-xl shadow-md">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-teal-400" />
          <span className="font-bold text-sm">Diff Comparison Results</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
            +{diff.additions} additions
          </span>
          <span className="px-2.5 py-1 rounded bg-rose-900/60 text-rose-300 border border-rose-700/60">
            -{diff.deletions} deletions
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {diff.unchanged} unchanged lines
          </span>
        </div>
      </div>

      {/* Rendered Diff View */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        {diff.lines.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            Both inputs are empty. Paste text above to compare.
          </div>
        ) : viewMode === "unified" ? (
          /* UNIFIED VIEW */
          <div className="divide-y divide-slate-100 font-mono text-xs overflow-x-auto">
            {diff.lines.map((line, idx) => {
              const isAdd = line.type === "added";
              const isDel = line.type === "removed";

              return (
                <div
                  key={idx}
                  className={`flex items-start ${
                    isAdd
                      ? "bg-emerald-50/70 text-emerald-950"
                      : isDel
                      ? "bg-rose-50/70 text-rose-950"
                      : "bg-white text-slate-800"
                  }`}
                >
                  {/* Old Gutter */}
                  <div className="w-12 py-1 px-2 text-right text-slate-400 select-none bg-slate-50 border-r border-slate-200 text-[11px]">
                    {line.oldLineNumber || ""}
                  </div>
                  {/* New Gutter */}
                  <div className="w-12 py-1 px-2 text-right text-slate-400 select-none bg-slate-50 border-r border-slate-200 text-[11px]">
                    {line.newLineNumber || ""}
                  </div>
                  {/* Prefix Sign */}
                  <div className="w-6 py-1 text-center font-bold select-none text-slate-500">
                    {isAdd ? "+" : isDel ? "-" : " "}
                  </div>
                  {/* Line Content */}
                  <div className="flex-1 py-1 px-2 whitespace-pre overflow-x-auto">
                    {line.text || " "}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* SPLIT / SIDE-BY-SIDE VIEW */
          <div className="divide-y divide-slate-100 font-mono text-xs overflow-x-auto">
            {diff.lines.map((line, idx) => {
              const isAdd = line.type === "added";
              const isDel = line.type === "removed";

              return (
                <div key={idx} className="grid grid-cols-2 divide-x divide-slate-200">
                  {/* Left Column (Original/Removed) */}
                  <div
                    className={`flex items-start ${
                      isDel ? "bg-rose-50/80 text-rose-950" : isAdd ? "bg-slate-50/50" : "bg-white text-slate-800"
                    }`}
                  >
                    <div className="w-12 py-1 px-2 text-right text-slate-400 select-none bg-slate-50 border-r border-slate-200 text-[11px]">
                      {line.oldLineNumber || ""}
                    </div>
                    <div className="w-5 py-1 text-center font-bold select-none text-rose-600">
                      {isDel ? "-" : " "}
                    </div>
                    <div className="flex-1 py-1 px-2 whitespace-pre overflow-x-auto">
                      {!isAdd ? line.text || " " : ""}
                    </div>
                  </div>

                  {/* Right Column (Modified/Added) */}
                  <div
                    className={`flex items-start ${
                      isAdd ? "bg-emerald-50/80 text-emerald-950" : isDel ? "bg-slate-50/50" : "bg-white text-slate-800"
                    }`}
                  >
                    <div className="w-12 py-1 px-2 text-right text-slate-400 select-none bg-slate-50 border-r border-slate-200 text-[11px]">
                      {line.newLineNumber || ""}
                    </div>
                    <div className="w-5 py-1 text-center font-bold select-none text-emerald-600">
                      {isAdd ? "+" : " "}
                    </div>
                    <div className="flex-1 py-1 px-2 whitespace-pre overflow-x-auto">
                      {!isDel ? line.text || " " : ""}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Guide Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
        <h4 className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal-600" />
          How Text Diff Works
        </h4>
        <p>
          This comparison engine utilizes the Longest Common Subsequence (LCS) algorithm to accurately isolate text additions and deletions between versions. Click <strong>Copy Git Patch</strong> to generate a standard unified patch that can be applied using <code className="bg-white px-1 py-0.5 rounded border border-slate-200">git apply</code>.
        </p>
      </div>
    </div>
  );
}

