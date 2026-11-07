"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  X,
  TrendingUp,
} from "lucide-react";
import type { AdminRedirectRecord } from "@/lib/db/admin-service";

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<AdminRedirectRecord[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSource, setNewSource] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newStatusCode, setNewStatusCode] = useState<301 | 308>(301);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = () => {
    fetch("/api/admin/redirects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRedirects(data);
      })
      .catch(console.error);
  };

  const handleToggle = async (id: string, currentActive: boolean) => {
    // Optimistic
    setRedirects((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !currentActive } : r))
    );

    try {
      const res = await fetch("/api/admin/redirects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to toggle redirect");
      showMessage("Redirect status updated.");
    } catch {
      fetchRedirects();
      showMessage("Failed to update redirect.", true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this redirect rule?")) return;

    setRedirects((prev) => prev.filter((r) => r.id !== id));

    try {
      const res = await fetch(`/api/admin/redirects?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete redirect");
      showMessage("Redirect rule deleted.");
    } catch {
      fetchRedirects();
      showMessage("Error deleting redirect.", true);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourcePath: newSource,
          targetPath: newTarget,
          statusCode: newStatusCode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create redirect");
      }

      const data = await res.json();
      setRedirects((prev) => [data.redirect, ...prev]);
      setShowAddModal(false);
      setNewSource("");
      setNewTarget("");
      showMessage("Redirect rule successfully added!");
    } catch (err: any) {
      showMessage(err.message, true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMessage = (msg: string, isErr = false) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const totalHits = redirects.reduce((acc, r) => acc + r.hitCount, 0);

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>HTTP Redirects (301 / 308)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {redirects.length} Rules
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage permanent canonical redirects to preserve inbound backlinks and avoid 404s.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {statusMessage && (
            <div className="px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium">
              {statusMessage}
            </div>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Redirect</span>
          </button>
        </div>
      </div>

      {/* Redirects Table */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Source URL Path</th>
                <th className="py-3 px-4">Target Destination</th>
                <th className="py-3 px-4 text-center">Status Code</th>
                <th className="py-3 px-4 text-center">Hits Served</th>
                <th className="py-3 px-4 text-center">Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-amber-400">
                    {r.sourcePath}
                  </td>

                  <td className="py-3 px-4 font-mono text-teal-400">
                    <a
                      href={r.targetPath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>{r.targetPath}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-900 text-slate-300 border border-slate-800">
                      HTTP {r.statusCode}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="font-mono text-slate-300 font-semibold flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3 text-purple-400" />
                      <span>{r.hitCount}</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggle(r.id, r.isActive)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        r.isActive
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}
                    >
                      {r.isActive ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      title="Delete Redirect"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-900 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-teal-400" />
                <h3 className="font-bold text-white text-base">
                  Create Inbound Redirect Rule
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Source Path (Incoming URL)
                </label>
                <input
                  type="text"
                  placeholder="/old-tool-slug"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  Target Destination Path
                </label>
                <input
                  type="text"
                  placeholder="/tools/category/tool-slug"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                  HTTP Response Code
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewStatusCode(301)}
                    className={`py-2 px-3 rounded-lg border text-left font-mono font-semibold transition-all ${
                      newStatusCode === 301
                        ? "bg-teal-500/15 text-teal-300 border-teal-500/40"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    <div>301 Moved Permanently</div>
                    <div className="text-[10px] text-slate-500 font-sans mt-0.5 font-normal">
                      Standard SEO backlink pass
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewStatusCode(308)}
                    className={`py-2 px-3 rounded-lg border text-left font-mono font-semibold transition-all ${
                      newStatusCode === 308
                        ? "bg-teal-500/15 text-teal-300 border-teal-500/40"
                        : "bg-slate-950 text-slate-400 border-slate-800"
                    }`}
                  >
                    <div>308 Permanent Redirect</div>
                    <div className="text-[10px] text-slate-500 font-sans mt-0.5 font-normal">
                      Preserves HTTP method (POST/GET)
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isSubmitting ? "Adding..." : "Add Rule"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

