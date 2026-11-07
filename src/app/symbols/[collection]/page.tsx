import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { allSymbols, symbolCategories } from "@/data/symbols-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { QuickSymbolGrid } from "@/components/symbols/quick-symbol-grid";
import { AdSlot } from "@/components/ads/ad-slot";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

interface CollectionPageProps {
  params: Promise<{
    collection: string;
  }>;
}

export async function generateStaticParams() {
  return symbolCategories.map((c) => ({
    collection: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = symbolCategories.find((c) => c.slug === resolvedParams.collection);

  if (!cat) {
    return {
      title: "Symbol Collection Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.url}/symbols/${cat.slug}`;

  return {
    title: `${cat.name} - Copy & Paste Special Characters with Alt Codes`,
    description: `Browse, search, and 1-click copy ${cat.name}. Includes Windows numeric keypad Alt codes, Mac Option shortcuts, HTML entities, and Unicode codepoints.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cat.name} | TypeKitTools`,
      description: cat.description,
      url: canonicalUrl,
    },
  };
}

export default async function SymbolCollectionPage({
  params,
}: CollectionPageProps) {
  const resolvedParams = await params;
  const cat = symbolCategories.find((c) => c.slug === resolvedParams.collection);

  if (!cat) {
    notFound();
  }

  const symbolsInCat = allSymbols.filter((s) => s.category === cat.slug);
  const otherCats = symbolCategories.filter((c) => c.slug !== cat.slug);

  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <Breadcrumbs
        items={[{ label: "Symbols", href: "/symbols" }, { label: cat.name }]}
      />

      <div className="space-y-3">
        <Badge variant="teal" className="uppercase font-mono text-[10px]">
          Collection
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {cat.name}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {cat.description}. Click any symbol to copy directly to your clipboard, or view the reference table below for Windows Alt codes and Mac Option shortcuts.
        </p>
      </div>

      {/* 1-Click Interactive Grid */}
      <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
        <QuickSymbolGrid
          initialCategory={cat.slug}
          limit={100}
          showCategoryTabs={false}
        />
      </div>

      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* Full Reference Table */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Complete {cat.name} Shortcut Reference Table
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {symbolsInCat.length} characters
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                <th className="p-3 font-mono">Symbol</th>
                <th className="p-3">Name</th>
                <th className="p-3 font-mono">Windows Alt Code</th>
                <th className="p-3">Mac Shortcut</th>
                <th className="p-3 font-mono">Codepoint</th>
                <th className="p-3 font-mono">HTML</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {symbolsInCat.map((s) => (
                <tr key={s.slug} className="hover:bg-muted/20 transition-colors">
                  <td className="p-3 font-mono text-xl font-bold text-foreground">
                    {s.character}
                  </td>
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 font-mono text-primary font-semibold">
                    {s.altCodeWindows || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {s.macShortcut || "—"}
                  </td>
                  <td className="p-3 font-mono text-muted-foreground">
                    {s.codepoint}
                  </td>
                  <td className="p-3 font-mono text-muted-foreground">
                    {s.htmlEntity || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Other Symbol Categories */}
      <section className="space-y-3 pt-4 border-t border-border/60">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Explore Other Symbol Collections
        </h3>
        <div className="flex flex-wrap gap-2">
          {otherCats.map((c) => (
            <Link
              key={c.slug}
              href={`/symbols/${c.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <span>{c.name}</span>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

