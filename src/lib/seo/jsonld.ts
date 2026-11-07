import { siteConfig } from "@/config/site";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url || "https://typekittools.com";

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        ...(item.url
          ? { item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}` }
          : {}),
      })),
    ],
  };
}

/**
 * Generate SoftwareApplication / WebApplication Schema for Tools
 */
export function generateSoftwareApplicationJsonLd(tool: {
  name: string;
  description: string;
  category?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    description: tool.description,
    url: tool.url ? (tool.url.startsWith("http") ? tool.url : `${BASE_URL}${tool.url}`) : BASE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: BASE_URL,
    },
  };
}

/**
 * Generate Article Schema for Educational Guides & Articles
 */
export function generateArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
}) {
  const fullUrl = article.url.startsWith("http") ? article.url : `${BASE_URL}${article.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: fullUrl,
    url: fullUrl,
    author: {
      "@type": "Organization",
      name: article.authorName || siteConfig.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/api/og?title=${encodeURIComponent(siteConfig.name)}`,
      },
    },
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.updatedAt || article.publishedAt || new Date().toISOString(),
  };
}

/**
 * Generate FAQPage Schema
 */
export function generateFaqPageJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo Schema
 */
export function generateHowToJsonLd(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * Generate DefinedTerm Schema for Unicode Characters
 */
export function generateDefinedTermJsonLd(char: {
  name: string;
  character: string;
  codepoint: string;
  block?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: `${char.name} (${char.character})`,
    termCode: char.codepoint,
    inDefinedTermSet: `Unicode Standard (Block: ${char.block || "General"})`,
    url: char.url ? (char.url.startsWith("http") ? char.url : `${BASE_URL}${char.url}`) : undefined,
  };
}

/**
 * Generate CollectionPage Schema for Symbol or Tool Categories
 */
export function generateCollectionPageJsonLd(collection: {
  name: string;
  description: string;
  url: string;
  itemCount: number;
}) {
  const fullUrl = collection.url.startsWith("http") ? collection.url : `${BASE_URL}${collection.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: fullUrl,
    numberOfItems: collection.itemCount,
  };
}

/**
 * Generate WebSite Schema with Sitelinks Searchbox
 */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/tools/unicode/unicode-search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

