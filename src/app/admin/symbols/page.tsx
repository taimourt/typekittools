"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Plus, Upload, Check, Trash2, Search, AlertCircle, Copy, CheckCheck } from "lucide-react";
import { AdminCustomSymbolRecord } from "@/lib/db/admin-service";

export default function AdminSymbolsPage() {
  const [symbols, setSymbols] = useState<AdminCustomSymbolRecord[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showImportModal, setShowImportModal] = useState<boolean>(false);

  // New Symbol Form State
  const [char, setChar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [codepoint, setCodepoint] = useState<string>("");
  const [category, setCategory] = useState<string>("currency");
  const [keywords, setKeywords] = useState<string>("");

  // Import State
  const [importJson, setImportJson] = useState<string>("");
  const [importResult, setImportResult] = useState<any | null>(null);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSymbols = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/symbols?category=${selectedCategory}`);
      if (!res.ok) throw new Error("Failed to load symbols.");
      const data = await res.json();
      setSymbols(data.symbols || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSymbols();
  }, [selectedCategory]);

  const handleCreateSymbol = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await fetch("/api/admin/symbols", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: char,
          name,
          codepoint,
          category,
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          isPublished: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create symbol.");
      }

      setShowCreateModal(false);
      setChar("");
      setName("");
      setCodepoint("");
      setKeywords("");
      setSuccessMsg("Symbol created successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
      fetchSymbols();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsImporting(true);
      setImportResult(null);
      setError(null);

      const res = await fetch("/api/admin/symbols/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawJson: importJson }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed.");

      setImportResult(data);
      if (data.imported > 0) {
        fetchSymbols();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImporting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this symbol?")) return;
    try {
      const res = await fetch(`/api/admin/symbols?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSymbols(symbols.filter((s) => s.id !== id));
      }
    } catch {
      // Fallback
    }
  };

  const handleCopy = (glyph: string, id: string) => {
    navigator.clipboard.writeText(glyph);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredSymbols = symbols.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.character.includes(q) ||
      s.codepoint.toLowerCase().includes(q) ||
      s.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Symbol Manager & Unicode Importer
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage custom symbols, assign keywords and Alt code categories, and bulk import official Unicode definitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:border-primary/50 transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4 text-primary" />
            <span>Bulk JSON Importer</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Symbol</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search symbols by name, character glyph, or codepoint..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-card text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl border border-border bg-card text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
        >
          <option value="all">All Categories</option>
          <option value="currency">Currency</option>
          <option value="math">Math</option>
          <option value="arrows">Arrows</option>
          <option value="punctuation">Punctuation</option>
          <option value="legal">Legal</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/* Symbols Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground border-b border-border/80 font-mono uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3 w-16 text-center">Glyph</th>
                <th className="px-4 py-3">Character Name</th>
                <th className="px-4 py-3 font-mono">Codepoint</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Keywords</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    Loading symbols...
                  </td>
                </tr>
              ) : filteredSymbols.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No symbols found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredSymbols.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleCopy(item.character, item.id)}
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-background text-lg font-serif hover:border-primary transition-all relative group"
                        title="Click to copy glyph"
                      >
                        {item.character}
                        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[8px] rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {copiedId === item.id ? <CheckCheck className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-foreground">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">Source: {item.source}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-primary font-semibold text-[11px]">
                      {item.codepoint}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.keywords.map((kw, i) => (
                          <span key={i} className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Symbol Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-foreground">Add Custom Symbol</h2>
            <form onSubmit={handleCreateSymbol} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Character Glyph</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={char}
                    onChange={(e) => {
                      setChar(e.target.value);
                      if (e.target.value && !codepoint) {
                        const code = e.target.value.codePointAt(0);
                        if (code) {
                          setCodepoint(`U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
                        }
                      }
                    }}
                    placeholder="e.g. €"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-base text-center font-serif"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Codepoint</label>
                  <input
                    type="text"
                    required
                    value={codepoint}
                    onChange={(e) => setCodepoint(e.target.value)}
                    placeholder="U+20AC"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Official Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="EURO SIGN"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background uppercase font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                >
                  <option value="currency">Currency</option>
                  <option value="math">Mathematical Operators</option>
                  <option value="arrows">Arrows</option>
                  <option value="punctuation">Punctuation</option>
                  <option value="legal">Legal & Technical</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Search Keywords (comma separated)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="euro, money, eur, cash"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold"
                >
                  Save Symbol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Bulk Unicode JSON Importer
            </h2>
            <p className="text-xs text-muted-foreground">
              Paste an array of Unicode character JSON objects. The importer validates, automatically prefixes hex codepoints with standard U+ notation, and prevents duplicate entries.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <textarea
                rows={8}
                required
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder={`[\n  {\n    "character": "₹",\n    "name": "INDIAN RUPEE SIGN",\n    "codepoint": "U+20B9",\n    "category": "currency",\n    "keywords": ["rupee", "inr", "india"]\n  }\n]`}
                className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono text-[11px] focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />

              {importResult && (
                <div className="p-3 rounded-xl bg-muted text-xs space-y-1">
                  <div className="text-emerald-600 font-semibold">
                    ✓ Imported {importResult.imported} symbols ({importResult.skipped} skipped).
                  </div>
                  {importResult.errors?.length > 0 && (
                    <div className="text-destructive font-mono text-[10px]">
                      {importResult.errors.join(", ")}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowImportModal(false);
                    setImportJson("");
                    setImportResult(null);
                  }}
                  className="px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isImporting}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-sm disabled:opacity-50"
                >
                  {isImporting ? "Processing..." : "Run Bulk Import"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

