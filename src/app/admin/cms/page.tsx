"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  ExternalLink,
  CheckCircle,
  XCircle,
  Calendar,
  Globe,
  HelpCircle,
  Link as LinkIcon,
  Clock,
  Sparkles,
} from "lucide-react";
import type { AdminCmsArticle } from "@/lib/db/admin-service";

export default function AdminCmsPage() {
  const [articles, setArticles] = useState<AdminCmsArticle[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "scheduled" | "draft">("all");
  const [editingArticle, setEditingArticle] = useState<Partial<AdminCmsArticle> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = () => {
    fetch("/api/admin/cms")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setArticles(data);
      })
      .catch(console.error);
  };

  const handleTogglePublished = async (article: AdminCmsArticle) => {
    const nextVal = !article.isPublished;
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, isPublished: nextVal } : a))
    );

    try {
      const res = await fetch("/api/admin/cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: article.id, isPublished: nextVal }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      showMessage(`Updated publication status for "${article.title}".`);
    } catch {
      fetchArticles();
      showMessage("Error updating status.", true);
    }
  };

  const handleToggleIndexable = async (article: AdminCmsArticle) => {
    const nextVal = !article.isIndexable;
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, isIndexable: nextVal } : a))
    );

    try {
      const res = await fetch("/api/admin/cms", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: article.id, isIndexable: nextVal }),
      });
      if (!res.ok) throw new Error("Failed to update indexing");
      showMessage(`Updated indexing directive for "${article.title}".`);
    } catch {
      fetchArticles();
      showMessage("Error updating indexing.", true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this CMS article?")) return;

    setArticles((prev) => prev.filter((a) => a.id !== id));
    try {
      const res = await fetch(`/api/admin/cms?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete article");
      showMessage("Article deleted.");
    } catch {
      fetchArticles();
      showMessage("Error deleting article.", true);
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    setIsSaving(true);

    try {
      const isNew = !editingArticle.id;
      const res = await fetch("/api/admin/cms", {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingArticle),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save article");
      }

      const data = await res.json();
      if (isNew) {
        setArticles((prev) => [data.article, ...prev]);
        showMessage("Created new article successfully!");
      } else {
        setArticles((prev) =>
          prev.map((a) => (a.id === data.article.id ? data.article : a))
        );
        showMessage("Saved changes to article!");
      }
      setEditingArticle(null);
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

  const now = new Date();
  const filteredArticles = articles.filter((a) => {
    if (filter === "published") {
      return a.isPublished && new Date(a.publishedAt) <= now;
    }
    if (filter === "scheduled") {
      return a.isPublished && new Date(a.publishedAt) > now;
    }
    if (filter === "draft") {
      return !a.isPublished;
    }
    return true;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>CMS Content & SEO Pages</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {articles.length} Articles
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Author high-intent educational articles, configure publishing schedules, and manage canonical indexing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {statusMessage && (
            <div className="px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium">
              {statusMessage}
            </div>
          )}
          <button
            onClick={() =>
              setEditingArticle({
                title: "",
                subtitle: "",
                slug: "",
                category: "Developer Guides",
                summary: "",
                contentMarkdown: "",
                seoTitle: "",
                seoDescription: "",
                isPublished: true,
                isIndexable: true,
                publishedAt: new Date().toISOString(),
                readingTime: "4 min read",
                faqs: [],
                internalLinks: [],
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
        {[
          { key: "all", label: `All (${articles.length})` },
          {
            key: "published",
            label: `Live (${articles.filter((a) => a.isPublished && new Date(a.publishedAt) <= now).length})`,
          },
          {
            key: "scheduled",
            label: `Scheduled (${articles.filter((a) => a.isPublished && new Date(a.publishedAt) > now).length})`,
          },
          {
            key: "draft",
            label: `Drafts (${articles.filter((a) => !a.isPublished).length})`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              filter === tab.key
                ? "bg-teal-500/15 text-teal-300 border border-teal-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Indexing</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
              {filteredArticles.map((article) => {
                const isScheduled =
                  article.isPublished && new Date(article.publishedAt) > now;

                return (
                  <tr key={article.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="font-semibold text-white truncate">{article.title}</div>
                      <div className="font-mono text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>/articles/{article.slug}</span>
                        <a
                          href={`/articles/${article.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-500 hover:text-teal-400"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-[11px] font-medium">
                        {article.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleToggleIndexable(article)}
                        title={article.isIndexable ? "Included in Google index" : "Marked noindex"}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all cursor-pointer ${
                          article.isIndexable
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                            : "bg-slate-900 text-slate-500 border-slate-800"
                        }`}
                      >
                        <Globe className="w-3 h-3" />
                        <span>{article.isIndexable ? "index" : "noindex"}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublished(article)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                          isScheduled
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            : article.isPublished
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-red-500/15 text-red-400 border-red-500/30"
                        }`}
                      >
                        {isScheduled ? (
                          <>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Scheduled</span>
                          </>
                        ) : article.isPublished ? (
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
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingArticle({ ...article })}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Article Editor Modal */}
      {editingArticle && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">
                  {editingArticle.id ? `Edit: ${editingArticle.title}` : "Create New SEO Article"}
                </h3>
              </div>
              <button
                onClick={() => setEditingArticle(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={editingArticle.title || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="e.g. How Cryptographic Hashes Work"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="how-cryptographic-hashes-work"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Reading Time
                  </label>
                  <input
                    type="text"
                    value={editingArticle.readingTime || "4 min read"}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, readingTime: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Schedule Publication Date
                  </label>
                  <input
                    type="datetime-local"
                    value={
                      editingArticle.publishedAt
                        ? new Date(editingArticle.publishedAt).toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        publishedAt: new Date(e.target.value).toISOString(),
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Executive Summary
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.summary || ""}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, summary: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Concise 1-2 sentence executive overview..."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Markdown Content
                </label>
                <textarea
                  rows={8}
                  value={editingArticle.contentMarkdown || ""}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, contentMarkdown: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500 text-xs leading-relaxed"
                  placeholder="## Section Heading&#10;&#10;Detailed technical explanations..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    SEO Meta Title
                  </label>
                  <input
                    type="text"
                    value={editingArticle.seoTitle || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, seoTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Canonical URL Override
                  </label>
                  <input
                    type="text"
                    value={editingArticle.canonicalUrl || ""}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, canonicalUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="https://typekittools.com/articles/slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  SEO Meta Description
                </label>
                <textarea
                  rows={2}
                  value={editingArticle.seoDescription || ""}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, seoDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="140-160 character description targeting search intent..."
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingArticle.isPublished !== false}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, isPublished: e.target.checked })
                    }
                    className="rounded border-slate-700 bg-slate-950 text-teal-500 focus:ring-teal-500"
                  />
                  <span>Published (Live on site)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={editingArticle.isIndexable !== false}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, isIndexable: e.target.checked })
                    }
                    className="rounded border-slate-700 bg-slate-950 text-teal-500 focus:ring-teal-500"
                  />
                  <span>Indexable (Include in sitemap & robots)</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
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
                  <span>{isSaving ? "Saving..." : "Save Article"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

