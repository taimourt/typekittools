"use client";

import React, { useState } from "react";
import { Copy, Check, RefreshCw, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

function generateUUIDv4(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback RFC 4122 v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateULID(): string {
  const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const now = Date.now();
  let timeStr = "";
  let time = now;
  for (let i = 9; i >= 0; i--) {
    timeStr = ENCODING[time % 32] + timeStr;
    time = Math.floor(time / 32);
  }
  let randomStr = "";
  for (let i = 0; i < 16; i++) {
    const rand = Math.floor(Math.random() * 32);
    randomStr += ENCODING[rand];
  }
  return timeStr + randomStr;
}

export function UuidGeneratorTool() {
  const [type, setType] = useState<"uuid" | "ulid">("uuid");
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [items, setItems] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const generate = React.useCallback(() => {
    const result: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let val = type === "uuid" ? generateUUIDv4() : generateULID();
      if (!hyphens && type === "uuid") {
        val = val.replace(/-/g, "");
      }
      if (uppercase) {
        val = val.toUpperCase();
      } else {
        val = val.toLowerCase();
      }
      result.push(val);
    }
    setItems(result);
  }, [type, quantity, uppercase, hyphens]);

  React.useEffect(() => {
    generate();
  }, [generate]);

  const handleCopyOne = async (val: string, idx: number) => {
    const ok = await copyToClipboard(val);
    if (ok) {
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleCopyAll = async () => {
    const text = items.join("\n");
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Configuration Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 border border-border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-lg bg-card border border-border p-1 text-xs">
            <button
              onClick={() => setType("uuid")}
              className={`px-3 py-1 rounded-md ${
                type === "uuid" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              UUID v4
            </button>
            <button
              onClick={() => setType("ulid")}
              className={`px-3 py-1 rounded-md ${
                type === "ulid" ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              ULID (Time-sortable)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="text-muted-foreground font-medium">Count:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-card border border-border rounded px-2 py-1 text-xs text-foreground focus:outline-none"
            >
              <option value={1}>1 ID</option>
              <option value={5}>5 IDs</option>
              <option value={10}>10 IDs</option>
              <option value={25}>25 IDs</option>
              <option value={50}>50 IDs</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-border text-primary"
            />
            <span>Uppercase</span>
          </label>

          {type === "uuid" && (
            <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded border-border text-primary"
              />
              <span>Hyphens</span>
            </label>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={generate} className="text-xs h-8 gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Generate New
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyAll} className="text-xs h-8 gap-1.5">
            {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            Copy All
          </Button>
        </div>
      </div>

      {/* Generated IDs list */}
      <div className="space-y-2">
        {items.map((item, idx) => {
          const isCopied = copiedIndex === idx;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors group"
            >
              <span className="font-mono text-xs sm:text-sm text-foreground select-all truncate pr-3">
                {item}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopyOne(item, idx)}
                className="h-7 px-2 text-xs text-muted-foreground group-hover:text-foreground shrink-0 gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

