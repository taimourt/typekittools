import { toolRegistry } from "../tools/registry";
import { initialTools } from "../tools/definitions/index";
import { symbolCategories, allSymbols } from "../../data/symbols-data";
import { guidesData } from "../../data/guides-data";
import { UNICODE_CHARACTERS } from "../../data/unicode/characters-data";
import { adminService, type AdminCmsArticle } from "../db/admin-service";

export type SeoIssueCode =
  | "MISSING_H1"
  | "MISSING_TITLE"
  | "MISSING_DESCRIPTION"
  | "DUPLICATE_SLUG"
  | "MISSING_CANONICAL"
  | "BROKEN_INTERNAL_LINK"
  | "THIN_CONTENT"
  | "UNPUBLISHED_TOOL_LINK"
  | "INVALID_STRUCTURED_DATA";

export type SeoSeverity = "ERROR" | "WARNING" | "NOTICE";

export interface SeoValidationIssue {
  id: string;
  code: SeoIssueCode;
  severity: SeoSeverity;
  pageUrl: string;
  pageTitle: string;
  pageType: "tool" | "symbol_detail" | "symbol_category" | "guide" | "article" | "category";
  message: string;
  recommendation: string;
}

export interface SeoAuditReport {
  healthScore: number; // 0 - 100
  totalPagesInspected: number;
  totalIssues: number;
  errorsCount: number;
  warningsCount: number;
  noticesCount: number;
  issues: SeoValidationIssue[];
  inspectedAt: string;
}

/**
 * Executes a comprehensive technical SEO validation across all platform pages.
 */
export function runSeoAudit(): SeoAuditReport {
  // Ensure registry has tools
  toolRegistry.registerAll(initialTools);
  const tools = toolRegistry.getAll();
  const cmsArticles = adminService.getCmsArticles();
  const categories = adminService.getCategories();

  const issues: SeoValidationIssue[] = [];
  let pagesInspected = 0;

  // 1. Build Route Lookup Index to detect duplicate slugs & broken links
  const validRoutes = new Set<string>();
  const publishedToolSlugs = new Set<string>();
  const allToolSlugs = new Set<string>();
  const slugCounts = new Map<string, string[]>();

  // Helper to record slugs
  function trackSlug(slug: string, url: string) {
    if (!slugCounts.has(slug)) {
      slugCounts.set(slug, []);
    }
    slugCounts.get(slug)!.push(url);
    validRoutes.add(url);
  }

  // Base routes
  validRoutes.add("/");
  validRoutes.add("/symbols");
  validRoutes.add("/guides");
  validRoutes.add("/articles");
  validRoutes.add("/tools");

  const adminTools = adminService.getTools();
  const adminToolMap = new Map(adminTools.map((at) => [at.slug, at.isPublished]));

  // Track tools
  for (const t of tools) {
    allToolSlugs.add(t.slug);
    const isPublished = adminToolMap.has(t.slug) ? adminToolMap.get(t.slug) : true;
    if (isPublished) {
      publishedToolSlugs.add(t.slug);
    }
    trackSlug(t.slug, `/tools/${t.category}/${t.slug}`);
  }

  // Track categories
  for (const c of categories) {
    trackSlug(c.slug, `/tools/${c.slug}`);
  }

  // Track symbol collections
  for (const sc of symbolCategories) {
    trackSlug(sc.slug, `/symbols/${sc.slug}`);
  }

  // Track guides
  for (const gSlug of Object.keys(guidesData)) {
    trackSlug(gSlug, `/guides/${gSlug}`);
  }

  // Track CMS articles
  for (const art of cmsArticles) {
    trackSlug(art.slug, `/articles/${art.slug}`);
  }

  // Check for duplicate slugs
  for (const [slug, urls] of slugCounts.entries()) {
    if (urls.length > 1) {
      issues.push({
        id: `dup-${slug}`,
        code: "DUPLICATE_SLUG",
        severity: "ERROR",
        pageUrl: urls[0],
        pageTitle: `Duplicate Slug: ${slug}`,
        pageType: "tool",
        message: `Slug '${slug}' is used across multiple pages: ${urls.join(", ")}`,
        recommendation: "Assign unique, non-colliding URL slugs to each page to prevent canonical ranking cannibalization.",
      });
    }
  }

  // --- 2. Audit Tools Pages ---
  for (const tool of tools) {
    pagesInspected++;
    const url = `/tools/${tool.category}/${tool.slug}`;

    // H1 & Title
    if (!tool.name || tool.name.trim().length === 0) {
      issues.push({
        id: `tool-h1-${tool.id}`,
        code: "MISSING_H1",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: tool.slug,
        pageType: "tool",
        message: "Tool is missing a primary H1 heading title.",
        recommendation: "Provide a clear, keyword-targeted tool name.",
      });
    }

    if (!tool.seo.metaTitle || tool.seo.metaTitle.trim().length === 0) {
      issues.push({
        id: `tool-title-${tool.id}`,
        code: "MISSING_TITLE",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: tool.name,
        pageType: "tool",
        message: "Tool is missing an SEO title tag.",
        recommendation: "Add a title under 60 characters with high-intent keywords.",
      });
    }

    // Meta Description
    if (!tool.seo.metaDescription || tool.seo.metaDescription.trim().length < 50) {
      issues.push({
        id: `tool-desc-${tool.id}`,
        code: "MISSING_DESCRIPTION",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: tool.name,
        pageType: "tool",
        message: `Meta description is too short (${tool.seo.metaDescription?.length || 0} characters).`,
        recommendation: "Write an informative meta description between 120 and 160 characters targeting US/UK/CA/AU audiences.",
      });
    }

    // Thin Content Check: shortDescription + howToSteps + faq
    const totalWords =
      (tool.shortDescription?.split(/\s+/).length || 0) +
      (tool.seo.howToSteps?.reduce((acc, s) => acc + s.instruction.split(/\s+/).length, 0) || 0) +
      (tool.seo.faq?.reduce((acc, f) => acc + f.answer.split(/\s+/).length, 0) || 0);

    if (totalWords < 50) {
      issues.push({
        id: `tool-thin-${tool.id}`,
        code: "THIN_CONTENT",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: tool.name,
        pageType: "tool",
        message: `Tool has thin informational content (${totalWords} words).`,
        recommendation: "Add comprehensive How-To steps, FAQs, or usage examples to provide high value to search engines.",
      });
    }

    // Internal link checks
    if (tool.relatedToolSlugs) {
      for (const relSlug of tool.relatedToolSlugs) {
        if (!allToolSlugs.has(relSlug)) {
          issues.push({
            id: `tool-broken-${tool.id}-${relSlug}`,
            code: "BROKEN_INTERNAL_LINK",
            severity: "ERROR",
            pageUrl: url,
            pageTitle: tool.name,
            pageType: "tool",
            message: `Related tool link '${relSlug}' does not exist in registry.`,
            recommendation: "Update or remove invalid slug from tool's relatedToolSlugs array.",
          });
        } else if (!publishedToolSlugs.has(relSlug)) {
          issues.push({
            id: `tool-unpub-${tool.id}-${relSlug}`,
            code: "UNPUBLISHED_TOOL_LINK",
            severity: "WARNING",
            pageUrl: url,
            pageTitle: tool.name,
            pageType: "tool",
            message: `Related tool link references unpublished tool '${relSlug}'.`,
            recommendation: "Either publish the target tool or remove the cross-link from public view.",
          });
        }
      }
    }

    // Structured data verification
    if (tool.seo.faq) {
      for (let i = 0; i < tool.seo.faq.length; i++) {
        const faq = tool.seo.faq[i];
        if (!faq.question || !faq.answer) {
          issues.push({
            id: `tool-schema-${tool.id}-${i}`,
            code: "INVALID_STRUCTURED_DATA",
            severity: "ERROR",
            pageUrl: url,
            pageTitle: tool.name,
            pageType: "tool",
            message: `FAQ item #${i + 1} has an empty question or answer.`,
            recommendation: "Ensure all FAQ items contain valid questions and answers for FAQPage schema.",
          });
        }
      }
    }
  }

  // --- 3. Audit Symbol Categories ---
  for (const cat of symbolCategories) {
    pagesInspected++;
    const url = `/symbols/${cat.slug}`;

    if (!cat.name) {
      issues.push({
        id: `symcat-name-${cat.slug}`,
        code: "MISSING_H1",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: cat.slug,
        pageType: "symbol_category",
        message: "Symbol collection lacks an H1 title name.",
        recommendation: "Provide a descriptive collection name.",
      });
    }

    const count = allSymbols.filter((s) => s.category === cat.slug).length;
    if (count === 0) {
      issues.push({
        id: `symcat-empty-${cat.slug}`,
        code: "THIN_CONTENT",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: cat.name,
        pageType: "symbol_category",
        message: "Symbol category contains zero characters.",
        recommendation: "Populate symbols into this collection or unpublish category.",
      });
    }
  }

  // --- 4. Audit Educational Guides ---
  for (const [slug, guide] of Object.entries(guidesData)) {
    pagesInspected++;
    const url = `/guides/${slug}`;

    if (!guide.title) {
      issues.push({
        id: `guide-h1-${slug}`,
        code: "MISSING_H1",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: slug,
        pageType: "guide",
        message: "Educational guide lacks a title.",
        recommendation: "Provide a full H1 guide title.",
      });
    }

    if (!guide.metaDescription || guide.metaDescription.length < 50) {
      issues.push({
        id: `guide-desc-${slug}`,
        code: "MISSING_DESCRIPTION",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: guide.title,
        pageType: "guide",
        message: "Guide meta description is under 50 characters.",
        recommendation: "Expand meta description with intent-specific keywords.",
      });
    }

    const wordCount = guide.sections.reduce(
      (acc, s) => acc + s.content.split(/\s+/).length,
      0
    );
    if (wordCount < 200) {
      issues.push({
        id: `guide-thin-${slug}`,
        code: "THIN_CONTENT",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: guide.title,
        pageType: "guide",
        message: `Guide content is thin (${wordCount} words; recommended >= 200).`,
        recommendation: "Add more detailed practical examples and instructions.",
      });
    }
  }

  // --- 5. Audit CMS Articles ---
  for (const article of cmsArticles) {
    pagesInspected++;
    const url = `/articles/${article.slug}`;

    if (!article.title) {
      issues.push({
        id: `art-title-${article.id}`,
        code: "MISSING_H1",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: article.slug,
        pageType: "article",
        message: "CMS article lacks an H1 title.",
        recommendation: "Add a headline title.",
      });
    }

    if (!article.seoDescription || article.seoDescription.length < 50) {
      issues.push({
        id: `art-desc-${article.id}`,
        code: "MISSING_DESCRIPTION",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: article.title,
        pageType: "article",
        message: "CMS article meta description is missing or under 50 characters.",
        recommendation: "Add an SEO meta description between 120 and 160 characters.",
      });
    }

    // Check internal links
    if (article.internalLinks) {
      for (const link of article.internalLinks) {
        if (!validRoutes.has(link.targetUrl) && !link.targetUrl.startsWith("http")) {
          issues.push({
            id: `art-broken-${article.id}-${link.targetUrl}`,
            code: "BROKEN_INTERNAL_LINK",
            severity: "ERROR",
            pageUrl: url,
            pageTitle: article.title,
            pageType: "article",
            message: `Article contains broken internal link to '${link.targetUrl}'.`,
            recommendation: "Verify destination URL exists or update the anchor target.",
          });
        }
      }
    }
  }

  // --- 6. Audit Sample of Character Detail Pages ---
  const sampleChars = UNICODE_CHARACTERS.slice(0, 15);
  for (const char of sampleChars) {
    pagesInspected++;
    const url = `/symbols/detail/${char.slug}`;

    if (!char.name) {
      issues.push({
        id: `char-name-${char.codepoint}`,
        code: "MISSING_H1",
        severity: "ERROR",
        pageUrl: url,
        pageTitle: char.codepoint,
        pageType: "symbol_detail",
        message: "Character detail lacks official name.",
        recommendation: "Ensure official Unicode name is present.",
      });
    }

    if (!char.codepoint.startsWith("U+")) {
      issues.push({
        id: `char-code-${char.codepoint}`,
        code: "INVALID_STRUCTURED_DATA",
        severity: "WARNING",
        pageUrl: url,
        pageTitle: char.name,
        pageType: "symbol_detail",
        message: `Codepoint '${char.codepoint}' does not follow U+XXXX standard notation.`,
        recommendation: "Prefix hex codepoint with standard 'U+' notation.",
      });
    }
  }

  // Calculate Health Score (industry standard site-wide weighted formula)
  const errorsCount = issues.filter((i) => i.severity === "ERROR").length;
  const warningsCount = issues.filter((i) => i.severity === "WARNING").length;
  const noticesCount = issues.filter((i) => i.severity === "NOTICE").length;

  // Scale deductions by total pages inspected to accurately reflect site-wide technical health
  const errorPenalty = (errorsCount / Math.max(1, pagesInspected)) * 50;
  const warningPenalty = (warningsCount / Math.max(1, pagesInspected * 2)) * 20;
  const penalty = Math.min(100, Math.round(errorPenalty + warningPenalty));
  const healthScore = Math.max(0, 100 - penalty);

  return {
    healthScore,
    totalPagesInspected: pagesInspected,
    totalIssues: issues.length,
    errorsCount,
    warningsCount,
    noticesCount,
    issues,
    inspectedAt: new Date().toISOString(),
  };
}
