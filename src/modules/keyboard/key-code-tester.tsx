"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface KeyData {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  locationName: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

const getLocationName = (loc: number) => {
  switch (loc) {
    case 0:
      return "Standard";
    case 1:
      return "Left (e.g. Left Shift)";
    case 2:
      return "Right (e.g. Right Shift)";
    case 3:
      return "Numpad";
    default:
      return "Unknown";
  }
};

export function KeyCodeTester() {
  const [keyData, setKeyData] = useState<KeyData | null>({
    key: "Space",
    code: "Space",
    keyCode: 32,
    which: 32,
    location: 0,
    locationName: "Standard",
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    metaKey: false,
  });
  const [copiedCode, setCopiedCode] = useState(false);
  const [history, setHistory] = useState<KeyData[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser default for space or tab when inspecting to prevent jump
      if (e.key === "Tab") {
        e.preventDefault();
      }

      const data: KeyData = {
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
        locationName: getLocationName(e.location),
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      };

      setKeyData(data);
      setHistory((prev) => [data, ...prev.slice(0, 9)]);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const jsSnippet = keyData
    ? `if (event.code === "${keyData.code}") {\n  // Action for ${keyData.key}\n}`
    : "";

  const handleCopySnippet = async () => {
    if (!jsSnippet) return;
    const ok = await copyToClipboard(jsSnippet);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Visual Key Prompt / Main Number */}
      <div className="text-center py-6 bg-muted/20 border border-dashed border-border rounded-xl space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          JavaScript keyCode / which
        </span>
        <div className="text-6xl sm:text-7xl font-extrabold text-primary font-mono tracking-tight">
          {keyData?.keyCode ?? "—"}
        </div>
        <div className="text-sm text-muted-foreground">
          Press any key on your physical keyboard to inspect it
        </div>
      </div>

      {/* Grid of Key Properties */}
      {keyData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border shadow-sm space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              event.key
            </span>
            <div className="text-lg font-bold font-mono text-foreground truncate">
              {keyData.key}
            </div>
            <p className="text-[11px] text-muted-foreground">Character value</p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border shadow-sm space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              event.code
            </span>
            <div className="text-lg font-bold font-mono text-foreground truncate">
              {keyData.code}
            </div>
            <p className="text-[11px] text-muted-foreground">Physical key location</p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border shadow-sm space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              event.which
            </span>
            <div className="text-lg font-bold font-mono text-foreground">
              {keyData.which}
            </div>
            <p className="text-[11px] text-muted-foreground">Deprecated legacy code</p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border shadow-sm space-y-1">
            <span className="text-xs font-mono text-muted-foreground uppercase">
              event.location
            </span>
            <div className="text-lg font-bold font-mono text-foreground">
              {keyData.location}
            </div>
            <p className="text-[11px] text-muted-foreground">{keyData.locationName}</p>
          </div>
        </div>
      )}

      {/* Modifier Flags */}
      {keyData && (
        <div className="p-4 rounded-lg bg-card border border-border flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Active Modifiers:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Ctrl", active: keyData.ctrlKey },
              { label: "Shift", active: keyData.shiftKey },
              { label: "Alt / Option", active: keyData.altKey },
              { label: "Meta / Cmd / Win", active: keyData.metaKey },
            ].map((m) => (
              <span
                key={m.label}
                className={`px-3 py-1 rounded-md text-xs font-mono border ${
                  m.active
                    ? "bg-primary text-primary-foreground border-primary font-bold shadow-sm"
                    : "bg-muted text-muted-foreground border-border/60"
                }`}
              >
                {m.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippet for Developers */}
      {keyData && (
        <div className="p-4 rounded-lg bg-muted/40 border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground font-mono">
              JavaScript Event Listener Snippet
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopySnippet}
              className="h-7 text-xs gap-1"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy JS
                </>
              )}
            </Button>
          </div>
          <pre className="p-3 rounded bg-card border border-border text-xs font-mono text-foreground overflow-x-auto">
            {jsSnippet}
          </pre>
        </div>
      )}

      {/* Recent Keystroke History */}
      {history.length > 1 && (
        <div className="space-y-2 pt-2 border-t border-border/40">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Keystrokes
          </span>
          <div className="flex flex-wrap gap-1.5">
            {history.map((h, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded bg-card border border-border text-xs font-mono text-foreground shadow-sm"
              >
                {h.key} <span className="text-[10px] text-muted-foreground font-sans">({h.code})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

