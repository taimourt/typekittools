"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID, updateGoogleConsent } from "@/lib/analytics/ga4";

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || GA_MEASUREMENT_ID;

  useEffect(() => {
    // Listen for cookie consent updates
    const handleConsent = (e: any) => {
      if (e.detail) {
        updateGoogleConsent({
          analytics: Boolean(e.detail.analytics),
          advertising: Boolean(e.detail.advertising),
        });
      }
    };

    window.addEventListener("typekit-consent-update" as any, handleConsent);
    return () => {
      window.removeEventListener("typekit-consent-update" as any, handleConsent);
    };
  }, []);

  if (!measurementId || measurementId === "G-XXXXXXXXXX") {
    return null;
  }

  return (
    <>
      {/* 1. Default Google Consent Mode v2 (Strict Privacy: Denied until explicit consent) */}
      <Script
        id="google-consent-mode-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `,
        }}
      />

      {/* 2. Global Site Tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* 3. GA4 Initialization */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

