"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Shield } from "lucide-react";
import { ToolDefinition } from "@/lib/tools/types";
import { Badge } from "@/components/ui/badge";

interface CategoryToolGridProps {
  tools: ToolDefinition[];
  categoryName: string;
}

export function CategoryToolGrid({ tools, categoryName }: CategoryToolGridProps) {
  const [filterQuery, setFilterQuery] = useState("");

  const filtered = tools.filter((t) => {
    const q = filterQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.seo.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Search / Filter Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder={`Filter ${categoryName.toLowerCase()} by name or keyword...`}
          className="w-full h-10 pl-9 pr-3 rounded-xl border border-input bg-card text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/70"
        />
        {filterQuery && (
          <button
            onClick={() => setFilterQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted/60"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="p-5 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-border/40 mt-3 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-emerald-600" />
                  Client-Side
                </span>
                <span className="text-primary font-medium group-hover:underline">Launch Tool &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center border border-dashed border-border rounded-xl space-y-2">
          <p className="text-sm font-semibold text-foreground">
            No tools match &quot;{filterQuery}&quot;
          </p>
          <p className="text-xs text-muted-foreground">
            Try a broader keyword or clear your filter.
          </p>
        </div>
      )}
    </div>
  );
}

