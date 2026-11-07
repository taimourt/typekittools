"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, Copy, Check, Link2, Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedOutput } from "@/components/tools/shared-output";
import { buildQueryString } from "@/lib/developer/advanced-transforms";
import { copyToClipboard } from "@/lib/utils";

interface QueryParamItem {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

const INITIAL_PARAMS: QueryParamItem[] = [
  { id: "1", key: "query", value: "unicode tools", enabled: true },
  { id: "2", key: "page", value: "1", enabled: true },
  { id: "3", key: "limit", value: "25", enabled: true },
  { id: "4", key: "tags", value: "developer", enabled: true },
  { id: "5", key: "tags", value: "unicode", enabled: true },
  { id: "6", key: "debug", value: "true", enabled: false },
];

export function QueryStringBuilderTool() {
  const [baseUrl, setBaseUrl] = useState<string>("https://api.typekittools.com/v1/search");
  const [params, setParams] = useState<QueryParamItem[]>(INITIAL_PARAMS);
  const [arrayFormat, setArrayFormat] = useState<"brackets" | "repeat" | "comma">("brackets");
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const fullUrl = useMemo(() => {
    return buildQueryString(params, {
      arrayFormat,
      baseUrl,
      prefixQuestionMark: true,
    });
  }, [params, arrayFormat, baseUrl]);

  const addParam = () => {
    const newItem: QueryParamItem = {
      id: Math.random().toString(36).substring(2, 9),
      key: "",
      value: "",
      enabled: true,
    };
    setParams([...params, newItem]);
  };

  const removeParam = (id: string) => {
    setParams(params.filter((p) => p.id !== id));
  };

  const updateParam = (id: string, field: "key" | "value" | "enabled", val: any) => {
    setParams(
      params.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(fullUrl);
    if (ok) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Base URL Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Base Request URL (Optional Endpoint)
        </label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="w-full h-10 px-3.5 text-xs font-mono rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
        />
      </div>

      {/* Query Parameters Table */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">Query Parameters</span>
            <span className="text-xs text-muted-foreground">
              ({params.filter((p) => p.enabled).length} active)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Array Notation Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground">Duplicate Keys:</span>
              {(
                [
                  { id: "brackets", label: "key[]=1&key[]=2" },
                  { id: "repeat", label: "key=1&key=2" },
                  { id: "comma", label: "key=1,2" },
                ] as const
              ).map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  onClick={() => setArrayFormat(fmt.id)}
                  className={`px-2 py-1 text-[11px] font-mono rounded-md transition-colors ${
                    arrayFormat === fmt.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={addParam}
              className="text-xs gap-1.5 h-8 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Parameter</span>
            </Button>
          </div>
        </div>

        <div className="border border-border/60 rounded-xl overflow-hidden shadow-xs">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground font-medium">
              <tr>
                <th className="p-3 w-12 text-center">Active</th>
                <th className="p-3 w-1/3">Key (Name)</th>
                <th className="p-3">Value</th>
                <th className="p-3 w-16 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {params.map((p) => (
                <tr
                  key={p.id}
                  className={`transition-colors ${p.enabled ? "bg-card" : "opacity-40 bg-muted/20"}`}
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.enabled}
                      onChange={(e) => updateParam(p.id, "enabled", e.target.checked)}
                      className="rounded text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={p.key}
                      onChange={(e) => updateParam(p.id, "key", e.target.value)}
                      placeholder="param_name"
                      className="w-full h-8 px-2.5 text-xs font-mono rounded-md border border-input bg-background text-foreground"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={p.value}
                      onChange={(e) => updateParam(p.id, "value", e.target.value)}
                      placeholder="param_value"
                      className="w-full h-8 px-2.5 text-xs font-mono rounded-md border border-input bg-background text-foreground"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={() => removeParam(p.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Query String Output */}
      <SharedOutput
        value={fullUrl}
        label="COMPILED & ENCODED FULL URL / QUERY STRING"
        downloadFilename="url-query.txt"
        rows={4}
      />
    </div>
  );
}

