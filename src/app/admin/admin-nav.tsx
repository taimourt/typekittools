"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderTree,
  ArrowLeftRight,
  Settings,
  History,
  ExternalLink,
  LogOut,
  ShieldAlert,
  FileText,
  Sparkles,
} from "lucide-react";
import type { AdminSessionPayload } from "@/lib/auth/session";

interface AdminNavProps {
  user: AdminSessionPayload;
}

export function AdminNav({ user }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show navigation
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Tools Catalogue", href: "/admin/tools", icon: Wrench },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Symbol Manager", href: "/admin/symbols", icon: Sparkles },
    { label: "CMS Articles", href: "/admin/cms", icon: FileText },
    { label: "Internal Links", href: "/admin/links", icon: ExternalLink },
    { label: "Ad Placements", href: "/admin/ads", icon: Settings },
    { label: "Users & Roles", href: "/admin/users", icon: ShieldAlert },
    { label: "SEO Validator", href: "/admin/seo-validator", icon: Sparkles },
    { label: "Redirects (301/308)", href: "/admin/redirects", icon: ArrowLeftRight },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
    { label: "Audit Logs", href: "/admin/audit", icon: History },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <aside className="w-full md:w-64 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
      {/* Brand Header */}
      <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white tracking-tight">TypeKitTools</div>
            <div className="text-[10px] uppercase font-semibold tracking-wider text-teal-400">
              Command Center
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-teal-500/15 text-teal-300 border border-teal-500/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-teal-400" : "text-slate-500"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer & Actions */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-medium text-slate-200 truncate">{user.name}</p>
            <p className="text-[11px] text-slate-500 font-mono truncate">{user.email}</p>
          </div>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-950 text-teal-400 border border-teal-800">
            {user.role}
          </span>
        </div>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
          <Link
            href="/"
            target="_blank"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium border border-slate-700/60 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="flex items-center justify-center p-1.5 rounded-md bg-slate-900 text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-slate-700/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

