import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { adminService } from "@/lib/db/admin-service";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { AdSlot } from "@/components/ads/ad-slot";
import { Clock, HelpCircle, ArrowRight, BookOpen, Share2 } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { generateArticleJsonLd, generateFaqPageJsonLd } from "@/lib/seo/jsonld";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = adminService.getCmsArticleBySlug(resolvedParams.slug);

  if (!article || !article.isPublished) {
    return {
      title: "Article Not Found",
    };
  }

  return buildPageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.summary,
    canonicalPath: article.canonicalUrl || `/articles/${article.slug}`,
    category: article.category,
    ogType: "article",
    isIndexable: article.isIndexable,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = adminService.getCmsArticleBySlug(resolvedParams.slug);

  // Enforce publication & scheduled date check
  const now = new Date();
  if (
    !article ||
    !article.isPublished ||
    new Date(article.publishedAt) > now
  ) {
    notFound();
  }

  const articleJsonLd = generateArticleJsonLd({
    title: article.title,
    description: article.seoDescription || article.summary,
    url: `/articles/${article.slug}`,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
  });

  const faqJsonLd =
    article.faqs && article.faqs.length > 0
      ? generateFaqPageJsonLd(article.faqs)
      : null;

  return (
    <article className="container max-w-4xl py-8 space-y-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumbs
        items={[
          { label: "Articles", href: "/articles" },
          { label: article.category, href: "/articles" },
          { label: article.title },
        ]}
      />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="teal" className="uppercase font-mono text-[10px]">
            {article.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
            {article.readingTime}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            • Published {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {article.title}
        </h1>
        {article.subtitle && (
          <p className="text-base text-muted-foreground leading-relaxed">
            {article.subtitle}
          </p>
        )}

        {/* Executive Summary Card */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-1">
          <span className="font-semibold text-primary block">Executive Summary</span>
          <p>{article.summary}</p>
        </div>
      </header>

      <AdSlot zoneKey="ARTICLE_INLINE" />

      {/* Main Markdown Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line">
        {article.contentMarkdown}
      </div>

      {/* FAQs */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="p-6 rounded-2xl border border-border bg-card space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base">
            <HelpCircle className="h-4 w-4 text-primary" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-border/60">
            {article.faqs.map((faq, i) => (
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

      {/* Contextual Internal Linking */}
      {article.internalLinks && article.internalLinks.length > 0 && (
        <section className="p-6 rounded-2xl border border-border bg-muted/20 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Related TypeKitTools Utilities & References
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.internalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.targetUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <span>{link.anchorText}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdSlot zoneKey="FOOTER_ABOVE" />
    </article>
  );
}

