import { redirect } from "next/navigation";
import { getCurrentAdminSession } from "@/lib/auth/session";
import { adminService } from "@/lib/db/admin-service";
import Link from "next/link";
import {
  Wrench,
  FolderTree,
  ArrowLeftRight,
  ShieldCheck,
  CheckCircle,
  Activity,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default async function AdminOverviewPage() {
  const session = await getCurrentAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const overview = adminService.getOverview();
  const { kpi, recentLogs, categories } = overview;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>System Overview & KPIs</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Welcome back, <span className="text-slate-200 font-medium">{session.name}</span>. Real-time statistics across all 22 tools and SEO engines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/tools"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold shadow-sm transition-all"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Manage Tools</span>
          </Link>
          <Link
            href="/admin/redirects"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>New Redirect</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Tools breakdown */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Tool Catalogue</span>
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">{kpi.totalTools}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">{kpi.publishedTools} Live</span>
              <span>•</span>
              <span className="text-amber-400 font-medium">{kpi.draftTools} Drafts</span>
              <span>•</span>
              <span className="text-blue-400 font-medium">{kpi.featuredTools} Featured</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Pages breakdown */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Published Pages</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">{kpi.publishedPages}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">{kpi.publishedArticles} Articles</span>
              <span>•</span>
              <span className="text-slate-400">{kpi.totalCategories} Categories</span>
              <span>•</span>
              <span className="text-amber-400">{kpi.draftPages} Draft Pages</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Ads & Monetization */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Ad Monetization</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">{kpi.activeAdPlacements} / {kpi.totalAdPlacements}</div>
            <p className="mt-2 text-xs text-slate-400 flex items-center gap-1">
              <span className="text-purple-400 font-medium">Google AdSense</span>
              <span>•</span>
              <span>Zero-CLS reserved height</span>
            </p>
          </div>
        </div>

        {/* Metric 4: System Security & Activity */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Security & Audit</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-extrabold text-white tracking-tight">{kpi.totalAuditLogs}</div>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium">{kpi.totalUsers} Administrators</span>
              <span>•</span>
              <span className="text-slate-400">{kpi.totalLinks} Links</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Category Distribution & System Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Table */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FolderTree className="w-4 h-4 text-teal-400" />
              <span>Category Distribution & Catalogue Density</span>
            </h2>
            <Link
              href="/admin/categories"
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
            >
              <span>Manage Categories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4 text-center">Tool Density</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-xs">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{c.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">/tools/{c.slug}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-200 font-semibold font-mono">
                        {c.toolCount} tools
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Live</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Infrastructure & Security Health */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <span>Infrastructure Health</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Framework</span>
              <span className="font-mono text-white font-semibold">Next.js 15.5 App Router</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Runtime Engine</span>
              <span className="font-mono text-white font-semibold">Node.js 24 + TypeScript</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Unicode Database</span>
              <span className="font-mono text-white font-semibold">Official Unicode 16.0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">Target Geographies</span>
              <span className="font-mono text-teal-300 font-semibold">US, UK, CA, AU</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400">CLS Protection</span>
              <span className="font-mono text-emerald-400 font-semibold">0.00 Cumulative Shift</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Audit Log Stream */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Recent Administrative Actions</span>
          </h2>
          <Link
            href="/admin/audit"
            className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
          >
            <span>Full Audit Trail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-800/60">
          {recentLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 hover:bg-slate-900/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-teal-950 text-teal-400 border border-teal-800">
                  {log.action}
                </span>
                <span className="text-slate-300 font-medium">{log.entityType} ({log.entityId})</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-mono">{log.userEmail}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span className="font-mono text-[11px]">{log.ipAddress}</span>
                <span>•</span>
                <span>{new Date(log.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

