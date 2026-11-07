import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { initialTools } from "@/lib/tools/definitions";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/search/search-bar";
import { ArrowRight, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "All Free Online Tools Directory",
  description:
    "Browse our complete catalog of free browser utilities: typing speed tests, JavaScript key code inspectors, Base64 converters, JSON validators, and fancy font generators.",
};

const categories = [
  { label: "All Utilities", slug: "all" },
  { label: "Keyboard & Typing", slug: "keyboard" },
  { label: "Unicode & Characters", slug: "unicode" },
  { label: "Text Generators", slug: "generators" },
  { label: "Developer Encoders", slug: "developer" },
  { label: "Emoji Tools", slug: "emoji" },
];

export default function AllToolsPage() {
  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <Breadcrumbs items={[{ label: "Tools" }]} />

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="teal" className="uppercase font-mono text-[10px]">
            Directory
          </Badge>
          <span className="text-xs text-muted-foreground">
            {initialTools.length} utilities available
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All Free Online Tools
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Zero downloads, zero installations, and zero server logging. Every tool runs directly inside your web browser.
        </p>
      </div>

      <div className="max-w-xl">
        <SearchBar variant="compact" placeholder="Filter tools by name, description, or keyword..." />
      </div>

      {/* Grouped by Category */}
      <div className="space-y-10 pt-4">
        {["keyboard", "unicode", "generators", "developer", "emoji"].map((cat) => {
          const catTools = initialTools.filter((t) => t.category === cat);
          if (catTools.length === 0) return null;

          return (
            <div key={cat} className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <h2 className="text-base font-bold uppercase tracking-wider text-foreground">
                  {cat} Tools
                </h2>
                <Link
                  href={`/tools/${cat}`}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  View category <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {catTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.category}/${tool.slug}`}
                    className="p-4 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tool.name}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

