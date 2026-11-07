"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Star,
  CheckCircle,
  XCircle,
  Edit,
  Save,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { AdminToolRecord } from "@/lib/db/admin-service";

export default function AdminToolsPage() {
  const [tools, setTools] = useState<AdminToolRecord[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingTool, setEditingTool] = useState<AdminToolRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/tools")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTools(data);
      })
      .catch(console.error);
  }, []);

  const handleToggle = async (tool: AdminToolRecord, field: "isPublished" | "isFeatured") => {
    const nextValue = !tool[field];
    // Optimistic update
    setTools((prev) =>
      prev.map((t) => (t.id === tool.id ? { ...t, [field]: nextValue } : t))
    );

    try {
      const res = await fetch("/api/admin/tools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: tool.id, [field]: nextValue }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showMessage(`Updated ${tool.name} ${field === "isPublished" ? "visibility" : "featured status"}.`);
    } catch {
      // Revert on error
      setTools((prev) =>
        prev.map((t) => (t.id === tool.id ? { ...t, [field]: !nextValue } : t))
      );
      showMessage("Error saving change to server.", true);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTool) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/tools", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTool),
      });

      if (!res.ok) throw new Error("Failed to save tool details");
      const data = await res.json();
      setTools((prev) =>
        prev.map((t) => (t.id === data.tool.id ? data.tool : t))
      );
      showMessage(`Saved metadata for ${editingTool.name}!`);
      setEditingTool(null);
    } catch (err: any) {
      showMessage(err.message, true);
    } finally {
      setIsSaving(false);
    }
  };

  const showMessage = (msg: string, isErr = false) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const filteredTools = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || t.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Tools & Utilities Catalogue</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {tools.length} Registered
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage live tool publication, featured status, and on-page technical SEO metadata.
          </p>
        </div>

        {statusMessage && (
          <div className="px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium animate-fadeIn">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tool title, slug, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
        >
          <option value="all">All Categories</option>
          <option value="symbols">Symbols & Special Characters</option>
          <option value="keyboard">Keyboard & Typing</option>
          <option value="unicode">Unicode Utilities</option>
          <option value="generators">Text Generators</option>
          <option value="developer">Developer Utilities</option>
          <option value="emoji">Emoji Directory</option>
        </select>
      </div>

      {/* Tools Table */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Tool</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
              {filteredTools.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-white truncate">{tool.name}</div>
                    <div className="font-mono text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>/tools/{tool.categoryId}/{tool.slug}</span>
                      <a
                        href={`/tools/${tool.categoryId}/${tool.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-teal-400"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-medium uppercase tracking-wider">
                      {tool.categoryId}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggle(tool, "isFeatured")}
                      title={tool.isFeatured ? "Featured on homepage" : "Not featured"}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                        tool.isFeatured
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-slate-900 text-slate-600 border-slate-800 hover:text-slate-400"
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggle(tool, "isPublished")}
                      title={tool.isPublished ? "Visible to public" : "Draft / Hidden"}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        tool.isPublished
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/15 text-red-400 border-red-500/30"
                      }`}
                    >
                      {tool.isPublished ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setEditingTool({ ...tool })}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit SEO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEO Metadata Edit Modal */}
      {editingTool && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">
                  Edit Tool Metadata: {editingTool.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingTool(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Public Title
                </label>
                <input
                  type="text"
                  value={editingTool.name}
                  onChange={(e) =>
                    setEditingTool({ ...editingTool, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Meta Title (Google SERP Title Tag)
                </label>
                <input
                  type="text"
                  value={editingTool.metaTitle || ""}
                  onChange={(e) =>
                    setEditingTool({ ...editingTool, metaTitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Tool Name | TypeKitTools"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Meta Description (Google Snippet)
                </label>
                <textarea
                  rows={3}
                  value={editingTool.metaDescription || ""}
                  onChange={(e) =>
                    setEditingTool({
                      ...editingTool,
                      metaDescription: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="150-160 character description targeting US/UK/CA/AU audiences..."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  SEO Keywords (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingTool.metaKeywords?.join(", ") || ""}
                  onChange={(e) =>
                    setEditingTool({
                      ...editingTool,
                      metaKeywords: e.target.value
                        .split(",")
                        .map((k) => k.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="unicode, converter, utf8, developer tools"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingTool(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

