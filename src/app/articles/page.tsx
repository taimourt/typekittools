import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { adminService } from "@/lib/db/admin-service";
import { guidesData } from "@/data/guides-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { BookOpen, Clock, ArrowRight, Sparkles } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Educational Articles & Developer Guides",
  description:
    "In-depth technical guides, tutorials, and references on keyboard shortcuts, character encodings, cryptographic hashing, and Unicode standards.",
  canonicalPath: "/articles",
});

export default function ArticlesDirectoryPage() {
  const cmsArticles = adminService.getEligiblePublishedArticles();
  const guides = Object.values(guidesData);

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Articles & Guides" }]} />

      {/* Header */}
      <div className="space-y-3">
        <Badge variant="teal" className="uppercase font-mono text-[10px]">
          Knowledge Hub
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Articles & Educational Guides
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          Comprehensive, non-thin developer guides and typing references. Learn the engineering behind Unicode normalization, cryptographic digests, keyboard scan codes, and character standards.
        </p>
      </div>

      <AdSlot zoneKey="HEADER_BELOW_NAV" />

      {/* Published Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cmsArticles.map((article) => (
          <article
            key={article.id}
            className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary font-mono">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                  <Clock className="w-3 h-3" />
                  {article.readingTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">
                Updated {new Date(article.updatedAt).toLocaleDateString()}
              </span>
              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}

        {/* Guides mirrored in articles */}
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 font-mono">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                  <Clock className="w-3 h-3" />
                  {guide.readingTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground font-mono">
                Comprehensive Reference
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdSlot zoneKey="FOOTER_ABOVE" />
    </div>
  );
}

