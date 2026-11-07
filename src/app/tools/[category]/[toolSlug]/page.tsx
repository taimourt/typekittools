import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { toolRegistry } from "@/lib/tools/registry";
import { initialTools } from "@/lib/tools/definitions";
import { ToolShell } from "@/components/tools/tool-shell";
import { getToolComponent } from "@/lib/tools/component-mapper";
import { siteConfig } from "@/config/site";

interface ToolPageProps {
  params: Promise<{
    category: string;
    toolSlug: string;
  }>;
}

// Generate static params for production static export
export async function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") {
    return [];
  }
  return initialTools.map((t) => ({
    category: t.category,
    toolSlug: t.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = toolRegistry.getBySlug(resolvedParams.toolSlug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.url}/tools/${tool.category}/${tool.slug}`;

  return {
    title: tool.seo.metaTitle,
    description: tool.seo.metaDescription,
    keywords: tool.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: tool.seo.metaTitle,
      description: tool.seo.metaDescription,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seo.metaTitle,
      description: tool.seo.metaDescription,
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = toolRegistry.getBySlug(resolvedParams.toolSlug);

  if (!tool || tool.category !== resolvedParams.category) {
    notFound();
  }

  const Component = getToolComponent(tool.componentId);

  return (
    <ToolShell tool={tool}>
      {Component ? (
        <Component />
      ) : (
        <div className="p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-foreground">
            {tool.name} Engine Initializing
          </p>
          <p className="text-xs text-muted-foreground">
            This tool is part of our upcoming phased release. Check back shortly!
          </p>
        </div>
      )}
    </ToolShell>
  );
}

