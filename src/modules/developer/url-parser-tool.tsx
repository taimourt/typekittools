"use client";

import React, { useState, useMemo } from "react";
import { Globe, Link2, Copy, Check, Table, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { parseUrl } from "@/lib/developer/advanced-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_URL = "https://admin:secret@api.typekittools.com:8443/v1/tools/unicode?category=developer&featured=true&sort=desc#results-tray";

export function UrlParserTool() {
  const [input, setInput] = useState<string>(SAMPLE_URL);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const parsed = useMemo(() => {
    return parseUrl(input);
  }, [input]);

  const handleCopy = async (val: string, key: string) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const components = [
    { label: "Protocol / Scheme", val: parsed.protocol, id: "protocol" },
    { label: "Origin", val: parsed.origin, id: "origin" },
    { label: "Host (with port)", val: parsed.host, id: "host" },
    { label: "Hostname / Domain", val: parsed.hostname, id: "hostname" },
    { label: "Port", val: parsed.port || "(Standard)", id: "port" },
    { label: "Pathname", val: parsed.pathname, id: "pathname" },
    { label: "Query String", val: parsed.search || "(None)", id: "search" },
    { label: "Hash / Fragment", val: parsed.hash || "(None)", id: "hash" },
    { label: "Username", val: parsed.username || "(None)", id: "username" },
    { label: "Password", val: parsed.password || "(None)", id: "password" },
  ];

  return (
    <div className="space-y-6">
      {/* Input */}
      <SharedInput
        value={input}
        onChange={setInput}
        label="URL OR URI TO PARSE"
        placeholder="e.g. https://example.com:8080/path/to/page?user=123#section"
        sampleValue={SAMPLE_URL}
        errorMessage={parsed.error}
        rows={2}
      />

      {/* Components Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          URL Constitutional Components
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {components.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-xl border border-border/60 bg-card hover:border-primary/40 transition-colors shadow-xs space-y-1.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                <span>{c.label}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(c.val, c.id)}
                  className="hover:text-foreground text-muted-foreground transition-colors"
                >
                  {copiedKey === c.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="font-mono text-xs text-foreground font-semibold break-all bg-muted/20 p-2 rounded-md">
                {c.val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Path Segments */}
      {parsed.pathSegments.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Path Hierarchy ({parsed.pathSegments.length} Segments)
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            {parsed.pathSegments.map((seg, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-muted-foreground">/</span>}
                <span className="px-2.5 py-1 bg-muted/60 text-xs font-mono rounded-md font-semibold text-foreground border border-border/50">
                  {seg}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Query Parameters Table */}
      {parsed.queryParams.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Table className="w-4 h-4 text-primary" />
            Query String Parameters ({parsed.queryParams.length})
          </h3>

          <div className="border border-border/60 rounded-xl overflow-hidden shadow-xs overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground font-medium">
                <tr>
                  <th className="p-3 w-1/3">Key / Parameter</th>
                  <th className="p-3">Decoded Value</th>
                  <th className="p-3 w-20 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {parsed.queryParams.map((p, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="p-3 font-semibold text-primary">{p.key}</td>
                    <td className="p-3 text-foreground break-all">{p.value}</td>
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(`${p.key}=${p.value}`, `param-${idx}`)}
                        className="h-6 px-2 text-xs"
                      >
                        {copiedKey === `param-${idx}` ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

