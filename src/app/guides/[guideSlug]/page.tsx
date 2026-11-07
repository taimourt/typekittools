import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { guidesData } from "@/data/guides-data";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { Clock, BookOpen, ArrowRight, Sparkles, HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

interface GuidePageProps {
  params: Promise<{
    guideSlug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(guidesData).map((slug) => ({
    guideSlug: slug,
  }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const guide = guidesData[resolvedParams.guideSlug];

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.url}/guides/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const resolvedParams = await params;
  const guide = guidesData[resolvedParams.guideSlug];

  if (!guide) {
    notFound();
  }

  // Article & FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.metaDescription,
        author: {
          "@type": "Organization",
          name: siteConfig.name,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/icons/logo.png`,
          },
        },
        mainEntityOfPage: `${siteConfig.url}/guides/${guide.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="container max-w-4xl py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[{ label: "Guides", href: "/guides" }, { label: guide.title }]}
      />

      {/* Guide Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="teal" className="uppercase font-mono text-[10px]">
            {guide.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
            {guide.readingTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {guide.title}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {guide.subtitle}
        </p>

        {/* Summary Card */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-1">
          <span className="font-semibold text-primary block">Executive Summary</span>
          <p>{guide.summary}</p>
        </div>
      </header>

      {/* Ad Placement Below Header */}
      <AdSlot zoneKey="ARTICLE_INLINE" />

      {/* Main Sections */}
      <div className="space-y-8 text-foreground/90">
        {guide.sections.map((sec, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {sec.heading}
            </h2>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {sec.content}
            </div>

            {/* Reference Table if present */}
            {sec.table && (
              <div className="overflow-x-auto rounded-xl border border-border bg-card my-4 shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 font-semibold text-foreground">
                      {sec.table.headers.map((h, i) => (
                        <th key={i} className="p-3 font-mono text-xs uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-muted/20 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`p-3 ${
                              cIdx === 0
                                ? "font-mono font-bold text-base text-foreground"
                                : cIdx === 2
                                ? "font-mono font-semibold text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Frequently Asked Questions */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="p-6 rounded-xl border border-border bg-card space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base">
            <HelpCircle className="h-4 w-4 text-primary" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/60">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="py-3 space-y-1">
                <h3 className="text-sm font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cross-linking to related utilities */}
      <section className="p-6 rounded-xl border border-border bg-muted/20 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recommended Tools for This Guide
        </h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tools/keyboard/key-code-tester"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <span>Key Code Tester</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/symbols"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <span>1-Click Symbols Library</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            href="/tools/unicode/invisible-character-tool"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <span>Zero-Width Space Cleaner</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
    </article>
  );
}

