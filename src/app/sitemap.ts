import { MetadataRoute } from "next";
import { toolRegistry } from "@/lib/tools/registry";
import { initialTools } from "@/lib/tools/definitions";
import { UNICODE_CHARACTERS } from "@/data/unicode/characters-data";
import { symbolCategories } from "@/data/symbols-data";
import { guidesData } from "@/data/guides-data";
import { EMOJI_CATEGORIES } from "@/data/emoji-data";
import { adminService } from "@/lib/db/admin-service";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url || "https://typekittools.com";
  const now = new Date();

  // Ensure tool registry is initialized
  toolRegistry.registerAll(initialTools);
  const tools = toolRegistry.getAll();
  const eligibleCmsArticles = adminService.getEligiblePublishedArticles();

  const routes: MetadataRoute.Sitemap = [
    // 1. Core Platform Hubs (Always eligible)
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/symbols`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/emoji`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 2. Category Hubs (6 Core Hubs)
  const categories = ["symbols", "keyboard", "unicode", "generators", "developer", "emoji"];
  for (const cat of categories) {
    routes.push({
      url: `${baseUrl}/tools/${cat}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // 3. Emoji Category Pages (8 Dedicated Hubs)
  for (const emojiCat of EMOJI_CATEGORIES) {
    routes.push({
      url: `${baseUrl}/emoji/${emojiCat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // 4. Symbol Collections (8 Collections)
  for (const col of symbolCategories) {
    routes.push({
      url: `${baseUrl}/symbols/${col.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // 5. Individual Tools (Only Published & Indexable)
  const adminTools = adminService.getTools();
  const adminToolMap = new Map(adminTools.map((at) => [at.slug, at.isPublished]));

  for (const tool of tools) {
    const isPublished = adminToolMap.has(tool.slug) ? adminToolMap.get(tool.slug) : true;
    if (isPublished) {
      routes.push({
        url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: tool.featured ? 0.9 : 0.8,
      });
    }
  }

  // 6. Character Detail Pages
  for (const char of UNICODE_CHARACTERS) {
    routes.push({
      url: `${baseUrl}/symbols/detail/${char.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // 7. Educational Guides
  for (const slug of Object.keys(guidesData)) {
    routes.push({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // 8. Published CMS Articles (Excludes drafts, noindex, and scheduled future articles)
  for (const article of eligibleCmsArticles) {
    routes.push({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return routes;
}
