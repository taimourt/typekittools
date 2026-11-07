/**
 * Centralized Google Analytics 4 (GA4) Utility
 * 
 * Privacy Guarantees:
 * 1. NEVER collects or transmits user-entered tool input or raw text.
 * 2. Anonymizes IP addresses by default.
 * 3. Supports Google Consent Mode v2 (ad_storage, ad_user_data, ad_personalization, analytics_storage).
 * 4. Only tracks anonymized operational metadata: tool category, tool ID, character count bucket, and error codes.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export type ConsentState = "granted" | "denied";

export interface GoogleConsentPreferences {
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  analytics_storage: ConsentState;
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

/**
 * Send pageview event to GA4
 */
export function pageview(url: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Track high-level tool execution without logging any actual user content
 */
export function trackToolExecution(
  toolId: string,
  category: string,
  meta?: {
    charCountBucket?: "empty" | "short" | "medium" | "long" | "huge";
    durationMs?: number;
  }
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "tool_execute", {
    tool_id: toolId,
    tool_category: category,
    char_count_bucket: meta?.charCountBucket || "unspecified",
    duration_ms: meta?.durationMs !== undefined ? Math.round(meta.durationMs) : undefined,
  });
}

/**
 * Track copy-to-clipboard actions (metadata only)
 */
export function trackCopyAction(
  toolId: string,
  itemType: "symbol" | "text" | "hash" | "code" | "collection"
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "copy_to_clipboard", {
    tool_id: toolId,
    item_type: itemType,
  });
}

/**
 * Track tool reset / clear action
 */
export function trackToolReset(toolId: string): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "tool_reset", {
    tool_id: toolId,
  });
}

/**
 * Track error occurrences without leaking sensitive user text
 */
export function trackToolError(
  toolId: string,
  errorCode: string
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "tool_error", {
    tool_id: toolId,
    error_code: errorCode,
  });
}

/**
 * Update Google Consent Mode v2 state
 */
export function updateGoogleConsent(prefs: {
  analytics: boolean;
  advertising: boolean;
}): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const consentConfig: GoogleConsentPreferences = {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.advertising ? "granted" : "denied",
    ad_user_data: prefs.advertising ? "granted" : "denied",
    ad_personalization: prefs.advertising ? "granted" : "denied",
  };

  window.gtag("consent", "update", consentConfig);
}

