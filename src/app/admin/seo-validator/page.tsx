"use client";

import { useState, useEffect } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { SeoAuditReport, SeoValidationIssue, SeoSeverity } from "@/lib/seo/validator";

export default function AdminSeoValidatorPage() {
  const [report, setReport] = useState<SeoAuditReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<"ALL" | SeoSeverity>("ALL");
  const [search, setSearch] = useState("");

  const loadAudit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/seo-validator");
      if (!res.ok) throw new Error("Failed to load SEO report");
      const data: SeoAuditReport = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAudit();
  }, []);

  const filteredIssues = (report?.issues || []).filter((issue) => {
    const matchesSeverity =
      severityFilter === "ALL" || issue.severity === severityFilter;
    const matchesSearch =
      issue.pageUrl.toLowerCase().includes(search.toLowerCase()) ||
      issue.message.toLowerCase().includes(search.toLowerCase()) ||
      issue.code.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Automated SEO Quality & Audit Engine</span>
            {report && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 font-mono font-semibold">
                Score: {report.healthScore}/100
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time crawler inspecting missing H1s, thin content, broken cross-links, duplicate slugs, and structured data errors.
          </p>
        </div>

        <button
          onClick={loadAudit}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>{isLoading ? "Running Audit..." : "Rerun SEO Audit"}</span>
        </button>
      </div>

      {/* KPI Cards */}
      {report && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">SEO Health Score</span>
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {report.healthScore}%
              </span>
              <span className="text-xs text-emerald-400 font-medium">Optimal Indexing</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Inspected Pages</span>
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {report.totalPagesInspected}
              </span>
              <p className="mt-1 text-xs text-slate-400">Tools, guides, symbols & articles</p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Blocking Errors</span>
              <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {report.errorsCount}
              </span>
              <p className="mt-1 text-xs text-slate-400">Broken links or missing H1s</p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-semibold uppercase tracking-wider">Warnings & Notices</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {report.warningsCount + report.noticesCount}
              </span>
              <p className="mt-1 text-xs text-slate-400">Thin content & short descriptions</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search issues by URL or issue message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {(["ALL", "ERROR", "WARNING", "NOTICE"] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                severityFilter === sev
                  ? "bg-teal-500/15 text-teal-300 border border-teal-500/40"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Checklist Issue Code</th>
                <th className="py-3 px-4">Target Page URL</th>
                <th className="py-3 px-4">Problem Detected</th>
                <th className="py-3 px-4">Actionable Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        issue.severity === "ERROR"
                          ? "bg-red-500/15 text-red-400 border-red-500/30"
                          : issue.severity === "WARNING"
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono font-semibold text-white">
                    {issue.code}
                  </td>

                  <td className="py-3 px-4 font-mono text-teal-400">
                    <a
                      href={issue.pageUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>{issue.pageUrl}</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  </td>

                  <td className="py-3 px-4 text-slate-300 max-w-xs">
                    {issue.message}
                  </td>

                  <td className="py-3 px-4 text-slate-400 max-w-sm">
                    {issue.recommendation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="font-semibold text-white text-sm">
              All Inspected Pages Pass SEO Quality Checks!
            </p>
            <p className="text-slate-500">
              No broken internal links, thin content, or duplicate slugs found matching your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

