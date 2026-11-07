"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { CopyButton } from "@/components/tools/copy-button";
import { ResetButton } from "@/components/tools/reset-button";

interface AsciiEntry {
  dec: number;
  hex: string;
  bin: string;
  char: string;
  desc: string;
  isControl: boolean;
  isExtended: boolean;
}

const CONTROL_NAMES: Record<number, string> = {
  0: "NUL (Null character)",
  1: "SOH (Start of Header)",
  2: "STX (Start of Text)",
  3: "ETX (End of Text)",
  4: "EOT (End of Transmission)",
  5: "ENQ (Enquiry)",
  6: "ACK (Acknowledge)",
  7: "BEL (Bell)",
  8: "BS (Backspace)",
  9: "HT (Horizontal Tab)",
  10: "LF (Line Feed / Newline)",
  11: "VT (Vertical Tab)",
  12: "FF (Form Feed)",
  13: "CR (Carriage Return)",
  14: "SO (Shift Out)",
  15: "SI (Shift In)",
  16: "DLE (Data Link Escape)",
  17: "DC1 (Device Control 1)",
  18: "DC2 (Device Control 2)",
  19: "DC3 (Device Control 3)",
  20: "DC4 (Device Control 4)",
  21: "NAK (Negative Acknowledge)",
  22: "SYN (Synchronous Idle)",
  23: "ETB (End of Trans. Block)",
  24: "CAN (Cancel)",
  25: "EM (End of Medium)",
  26: "SUB (Substitute)",
  27: "ESC (Escape)",
  28: "FS (File Separator)",
  29: "GS (Group Separator)",
  30: "RS (Record Separator)",
  31: "US (Unit Separator)",
  32: "Space",
  127: "DEL (Delete)",
};

function buildAsciiTable(): AsciiEntry[] {
  const table: AsciiEntry[] = [];
  for (let i = 0; i <= 255; i++) {
    const isControl = (i >= 0 && i <= 31) || i === 127;
    const isExtended = i > 127;
    let char = String.fromCharCode(i);
    let desc = CONTROL_NAMES[i] || (isExtended ? "Extended ASCII" : "Printable ASCII");

    if (isControl) {
      char = `^${String.fromCharCode(64 + (i === 127 ? 63 : i))}`;
    }

    table.push({
      dec: i,
      hex: i.toString(16).toUpperCase().padStart(2, "0"),
      bin: i.toString(2).padStart(8, "0"),
      char: isControl ? char : String.fromCharCode(i),
      desc,
      isControl,
      isExtended,
    });
  }
  return table;
}

const ASCII_DATA = buildAsciiTable();

export function AsciiTableTool() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "standard" | "extended" | "printable" | "control">("all");

  const filtered = ASCII_DATA.filter((entry) => {
    // Tab filter
    if (filter === "standard" && entry.isExtended) return false;
    if (filter === "extended" && !entry.isExtended) return false;
    if (filter === "printable" && (entry.isControl || entry.isExtended)) return false;
    if (filter === "control" && !entry.isControl) return false;

    // Search query
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      entry.dec.toString() === q ||
      entry.hex.toLowerCase() === q ||
      entry.char.toLowerCase() === q ||
      entry.desc.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Dec, Hex, or Char (e.g. 65, 41, A, ESC)..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {[
            { id: "all", label: "All (0–255)" },
            { id: "standard", label: "Standard (0–127)" },
            { id: "extended", label: "Extended (128–255)" },
            { id: "printable", label: "Printable (32–126)" },
            { id: "control", label: "Control (0–31)" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                filter === f.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
              <th className="p-3 font-mono text-center w-16">Dec</th>
              <th className="p-3 font-mono text-center w-16">Hex</th>
              <th className="p-3 font-mono text-center w-24">Binary</th>
              <th className="p-3 font-mono text-center w-16">Char</th>
              <th className="p-3">Description</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {filtered.map((item) => (
              <tr key={item.dec} className="hover:bg-muted/20 transition-colors">
                <td className="p-3 font-mono font-bold text-foreground text-center">
                  {item.dec}
                </td>
                <td className="p-3 font-mono font-bold text-primary text-center">
                  0x{item.hex}
                </td>
                <td className="p-3 font-mono text-xs text-muted-foreground text-center">
                  {item.bin}
                </td>
                <td className="p-3 font-mono text-base font-bold text-foreground text-center">
                  {item.isControl ? (
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                      {item.char}
                    </span>
                  ) : (
                    item.char
                  )}
                </td>
                <td className="p-3 font-medium text-foreground">
                  {item.desc}
                </td>
                <td className="p-3 text-right">
                  <CopyButton
                    text={item.isControl ? item.dec.toString() : item.char}
                    label="Copy"
                    size="sm"
                    variant="ghost"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

