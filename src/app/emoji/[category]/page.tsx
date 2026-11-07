import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { EMOJI_CATEGORIES, EMOJI_DATA, EmojiRecord } from "@/data/emoji-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { ArrowRight, Sparkles, Smile } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateCollectionPageJsonLd } from "@/lib/seo/jsonld";
import { EmojiCategoryClient } from "./emoji-category-client";

interface EmojiCategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return EMOJI_CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: EmojiCategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = EMOJI_CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!cat) {
    return {
      title: "Emoji Category Not Found",
    };
  }

  return buildPageMetadata({
    title: `${cat.name} Emojis (${cat.iconChar}) - Copy & Paste`,
    description: `Browse, search, and 1-click copy ${cat.name} emojis (${cat.iconChar}). Includes skin-tone variations, Unicode names, and copy-ready symbols.`,
    canonicalPath: `/emoji/${cat.slug}`,
    category: "Emoji Directory",
  });
}

export default async function EmojiCategoryPage({ params }: EmojiCategoryPageProps) {
  const resolvedParams = await params;
  const cat = EMOJI_CATEGORIES.find((c) => c.slug === resolvedParams.category);

  if (!cat) {
    notFound();
  }

  const categoryEmojis = EMOJI_DATA.filter((e) => e.category === cat.slug);
  const otherCategories = EMOJI_CATEGORIES.filter((c) => c.slug !== cat.slug);

  const collectionJsonLd = generateCollectionPageJsonLd({
    name: `${cat.name} Emojis`,
    description: cat.description,
    url: `/emoji/${cat.slug}`,
    itemCount: categoryEmojis.length,
  });

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Emoji", href: "/emoji" },
          { label: cat.name },
        ]}
      />

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="teal" className="uppercase font-mono text-[10px]">
            Emoji Category
          </Badge>
          <span className="text-xl">{cat.iconChar}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {cat.name} Emojis
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {cat.description} Click any emoji to copy instantly to your clipboard, or apply skin-tone modifiers below.
        </p>
      </div>

      <AdSlot zoneKey="HEADER_BELOW_NAV" />

      {/* Interactive Emoji Grid Client Component */}
      <EmojiCategoryClient emojis={categoryEmojis} categoryName={cat.name} />

      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* Other Emoji Categories */}
      <section className="space-y-4 pt-6 border-t border-border/60">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Explore Other Emoji Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/emoji/${c.slug}`}
              className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {c.iconChar}
              </span>
              <div className="truncate">
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block truncate">
                  {c.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Browse Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

