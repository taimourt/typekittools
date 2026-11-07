"use client";

import { useState, useEffect } from "react";
import { History, Search, ShieldCheck, ChevronDown, ChevronRight, User } from "lucide-react";
import type { AdminAuditRecord } from "@/lib/db/admin-service";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AdminAuditRecord[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/audit?limit=200")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLogs(data);
      })
      .catch(console.error);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredLogs = logs.filter((log) => {
    return (
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.entityType.toLowerCase().includes(search.toLowerCase()) ||
      log.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search)
    );
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Security & Audit Logs</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              {logs.length} Events
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable chronological record of administrative actions, logins, status changes, and redirect updates.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          placeholder="Filter by action, email, IP, or entity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
      </div>

      {/* Log Feed */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-800/60 text-xs">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No audit records matching your search query.
            </div>
          ) : (
            filteredLogs.map((log) => {
              const isExpanded = expandedId === log.id;

              return (
                <div key={log.id} className="hover:bg-slate-900/30 transition-colors">
                  <div
                    onClick={() => toggleExpand(log.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <button className="text-slate-500">
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-teal-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-teal-950 text-teal-400 border border-teal-800">
                        {log.action}
                      </span>

                      <span className="font-semibold text-white">
                        {log.entityType} ({log.entityId})
                      </span>

                      <span className="text-slate-500">•</span>

                      <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                        <User className="w-3 h-3 text-slate-500" />
                        <span>{log.userEmail}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px] sm:text-right">
                      <span>IP: {log.ipAddress}</span>
                      <span>•</span>
                      <span>{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-10 pb-4 pt-1 border-t border-slate-900 bg-slate-900/40">
                      <div className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-1.5">
                        Payload Details
                      </div>
                      <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-teal-300 overflow-x-auto">
                        {JSON.stringify(log.payload, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

