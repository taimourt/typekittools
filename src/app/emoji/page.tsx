import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { EMOJI_CATEGORIES, EMOJI_DATA } from "@/data/emoji-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { ArrowRight, Sparkles, Smile } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateCollectionPageJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = buildPageMetadata({
  title: "Emoji Library & Directory - Categorized 1-Click Copy",
  description:
    "Explore, search, and 1-click copy thousands of emojis across smileys, gestures, food, hearts, and animals with full skin-tone modifier support.",
  canonicalPath: "/emoji",
  category: "Emoji Directory",
});

export default function EmojiHubPage() {
  const collectionJsonLd = generateCollectionPageJsonLd({
    name: "Complete Emoji Directory",
    description: "Browse categorized emojis with 1-click copy and skin tone selectors.",
    url: "/emoji",
    itemCount: EMOJI_DATA.length,
  });

  return (
    <div className="container max-w-5xl py-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <Breadcrumbs items={[{ label: "Emoji Directory" }]} />

      {/* Hero Header */}
      <div className="space-y-3">
        <Badge variant="teal" className="uppercase font-mono text-[10px]">
          Emoji Directory
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Categorized Emoji Library & Picker
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          Quickly find and copy emojis for social media, messaging, and web applications. Choose a category below or use our interactive search tool with live skin-tone variations.
        </p>
      </div>

      <AdSlot zoneKey="HEADER_BELOW_NAV" />

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {EMOJI_CATEGORIES.map((cat) => {
          const count = EMOJI_DATA.filter((e) => e.category === cat.slug).length;

          return (
            <Link
              key={cat.slug}
              href={`/emoji/${cat.slug}`}
              className="p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-4xl group-hover:scale-110 transition-transform block">
                  {cat.iconChar}
                </span>

                <div>
                  <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between text-xs">
                <span className="font-mono text-muted-foreground">{count} emojis</span>
                <span className="font-semibold text-primary flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Direct link to Emoji Library Tool */}
      <section className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-foreground text-sm sm:text-base">
            Looking for all emojis on a single page?
          </h3>
          <p className="text-xs text-muted-foreground">
            Use our interactive Emoji Library utility with instant keyword filtering, recent emojis, and quick copy buffers.
          </p>
        </div>
        <Link
          href="/tools/emoji/emoji-library"
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          Open Emoji Tool
        </Link>
      </section>

      <AdSlot zoneKey="FOOTER_ABOVE" />
    </div>
  );
}

