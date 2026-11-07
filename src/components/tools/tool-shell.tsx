"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ToolDefinition } from "@/lib/tools/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/ad-slot";
import {
  Share2,
  Check,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Shield,
  ChevronDown,
} from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

interface ToolShellProps {
  tool: ToolDefinition;
  children: React.ReactNode;
}

export function ToolShell({ tool, children }: ToolShellProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleShare = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const breadcrumbs = [
    { label: "Tools", href: "/tools" },
    {
      label: tool.category.charAt(0).toUpperCase() + tool.category.slice(1),
      href: `/tools/${tool.category}`,
    },
    { label: tool.name },
  ];

  // SoftwareApplication & FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        operatingSystem: "Any",
        applicationCategory: "UtilityApplication",
        description: tool.shortDescription,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.seo.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="container max-w-5xl py-6 space-y-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Tool Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="teal" className="uppercase tracking-wider font-mono text-[10px]">
              {tool.category}
            </Badge>
            {tool.isClientOnly && (
              <Badge variant="secondary" className="flex items-center gap-1 text-[10px]">
                <Shield className="h-3 w-3 text-emerald-600" />
                Private (Runs in Browser)
              </Badge>
            )}
            <Badge variant="outline" className="text-[10px]">
              Free Utility
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="text-xs flex items-center gap-1.5 h-8"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied Link!
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                Share Tool
              </>
            )}
          </Button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {tool.name}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {tool.shortDescription}
        </p>
      </div>

      {/* Main Tool Interactive Workspace */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        {children}
      </div>

      {/* Primary Tool Bottom Advertisement Zone (Strict zero-CLS reservation) */}
      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* How-To Usage Guide Section */}
      {tool.seo.howToSteps && tool.seo.howToSteps.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2>How to Use the {tool.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {tool.seo.howToSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    {step.title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.instruction}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Frequently Asked Questions */}
      {tool.seo.faq && tool.seo.faq.length > 0 && (
        <section className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center gap-2 text-foreground font-semibold text-base">
            <HelpCircle className="h-4 w-4 text-primary" />
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="divide-y divide-border/60">
            {tool.seo.faq.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-3">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-1"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform duration-150 shrink-0 ml-2 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-2 text-xs text-muted-foreground leading-relaxed pr-6">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Contextual Cross-Linking / Related Tools */}
      {tool.relatedToolSlugs && tool.relatedToolSlugs.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Related Utilities
          </h3>
          <div className="flex flex-wrap gap-2">
            {tool.relatedToolSlugs.map((slug) => (
              <Link
                key={slug}
                href={`/tools/${tool.category}/${slug}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <span>{slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
            {tool.relatedSymbolCollections?.map((col) => (
              <Link
                key={col}
                href={`/symbols/${col}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium text-emerald-700 hover:border-emerald-500 transition-colors"
              >
                <span>{col.replace(/-/g, " ")} Symbols</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

