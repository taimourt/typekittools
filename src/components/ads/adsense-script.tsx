"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { CookiePreferences } from "@/components/layout/cookie-consent";

export function AdSenseScript() {
  const [canLoadAdSense, setCanLoadAdSense] = useState<boolean>(false);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Check initial stored consent
    try {
      const stored = localStorage.getItem("typekit_cookie_consent");
      if (stored) {
        const pref = JSON.parse(stored) as CookiePreferences;
        if (pref.advertising) {
          setCanLoadAdSense(true);
        }
      }
    } catch {
      // Fallback
    }

    // Listen for consent updates
    const handleConsent = (e: CustomEvent<CookiePreferences>) => {
      if (e.detail?.advertising) {
        setCanLoadAdSense(true);
      } else {
        setCanLoadAdSense(false);
      }
    };

    window.addEventListener("typekit-consent-update" as any, handleConsent);
    return () => {
      window.removeEventListener("typekit-consent-update" as any, handleConsent);
    };
  }, []);

  if (!publisherId || !canLoadAdSense) {
    return null;
  }

  return (
    <Script
      id="adsbygoogle-init"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
    />
  );
}

