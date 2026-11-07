import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface BuildMetadataOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  category?: string;
  keywords?: string[];
  isIndexable?: boolean;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Builds standard, production-grade Next.js metadata with Open Graph,
 * Twitter cards, canonical URLs, and indexability controls.
 */
export function buildPageMetadata(options: BuildMetadataOptions): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url || "https://typekittools.com";
  
  // Format canonical URL
  const canonicalUrl = options.canonicalPath
    ? options.canonicalPath.startsWith("http")
      ? options.canonicalPath
      : `${baseUrl}${options.canonicalPath.startsWith("/") ? options.canonicalPath : `/${options.canonicalPath}`}`
    : baseUrl;

  // Format OG Image URL
  const ogSearchParams = new URLSearchParams({
    title: options.title,
    ...(options.category ? { category: options.category } : {}),
  });
  const ogImageUrl = `${baseUrl}/api/og?${ogSearchParams.toString()}`;

  const isIndexable = options.isIndexable !== false;

  return {
    title: `${options.title} | ${siteConfig.name}`,
    description: options.description,
    keywords: options.keywords || [
      "typing tools",
      "special characters",
      "alt codes",
      "unicode utilities",
      "developer tools",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
        "en-GB": canonicalUrl,
        "en-CA": canonicalUrl,
        "en-AU": canonicalUrl,
      },
    },
    robots: isIndexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
        },
    openGraph: {
      title: `${options.title} | ${siteConfig.name}`,
      description: options.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: options.ogType || "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options.modifiedTime ? { modifiedTime: options.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${options.title} | ${siteConfig.name}`,
      description: options.description,
      images: [ogImageUrl],
    },
  };
}

