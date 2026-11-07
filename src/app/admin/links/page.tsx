"use client";

import React, { useState, useEffect } from "react";
import { Link2, Plus, ExternalLink, Check, Trash2, Edit3, X, AlertCircle } from "lucide-react";
import { AdminInternalLinkRecord } from "@/lib/db/admin-service";

export default function AdminLinksPage() {
  const [links, setLinks] = useState<AdminInternalLinkRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form State
  const [anchorText, setAnchorText] = useState<string>("");
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("tools");
  const [description, setDescription] = useState<string>("");

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/links");
      if (!res.ok) throw new Error("Failed to load internal links.");
      const data = await res.json();
      setLinks(data.links || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await fetch("/api/admin/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anchorText, targetUrl, category, description }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create internal link.");
      }

      setShowModal(false);
      setAnchorText("");
      setTargetUrl("");
      setDescription("");
      fetchLinks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggle = async (link: AdminInternalLinkRecord) => {
    try {
      const res = await fetch("/api/admin/links", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: link.id, isActive: !link.isActive }),
      });
      if (res.ok) {
        setLinks(links.map((l) => (l.id === link.id ? { ...l, isActive: !l.isActive } : l)));
      }
    } catch {
      // Fallback
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this internal link?")) return;
    try {
      const res = await fetch(`/api/admin/links?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(links.filter((l) => l.id !== id));
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" />
            Internal Link Architecture Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Build high-intent contextual cross-links between utilities, educational guides, and symbol libraries to boost PageRank distribution.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Internal Link</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Links Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 text-muted-foreground border-b border-border/80 font-mono uppercase text-[10px]">
              <tr>
                <th className="px-4 py-3">Anchor Text</th>
                <th className="px-4 py-3">Target Path</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 font-mono">Recorded Hits</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    Loading internal links...
                  </td>
                </tr>
              ) : links.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                    No internal links defined.
                  </td>
                </tr>
              ) : (
                links.map((link) => (
                  <tr key={link.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        {link.anchorText}
                      </div>
                      {link.description && (
                        <div className="text-[10px] text-muted-foreground line-clamp-1">{link.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-primary text-[11px]">
                      <a href={link.targetUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                        {link.targetUrl}
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border uppercase">
                        {link.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-foreground font-semibold">
                      {link.clickCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggle(link)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors ${
                          link.isActive
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {link.isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {link.isActive ? "Active" : "Paused"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(link.id)}
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

      {/* Create Link Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-foreground">Add Internal Link</h2>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Anchor Text</label>
                <input
                  type="text"
                  required
                  value={anchorText}
                  onChange={(e) => setAnchorText(e.target.value)}
                  placeholder="e.g. Online Hash Generator"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Target Relative URL</label>
                <input
                  type="text"
                  required
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="/tools/developer/hash-generator"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background font-mono"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                >
                  <option value="tools">Tools & Utilities</option>
                  <option value="guides">Typing Guides</option>
                  <option value="articles">Articles</option>
                  <option value="symbols">Symbols</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Description (Internal Note)</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contextual purpose or landing target"
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

