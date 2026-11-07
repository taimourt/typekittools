"use client";

import React, { useEffect, useState } from "react";
import { adZones, AdZoneConfig } from "@/config/ads";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  zoneKey: keyof typeof adZones | string;
  className?: string;
  showBorder?: boolean;
  pageType?: "tools" | "articles" | "symbols" | "guides" | "home";
}

/**
 * Enterprise Reusable AdSlot Component
 * 
 * Strict Performance & Compliance Specifications:
 * 1. Zero Cumulative Layout Shift (CLS): Strictly reserves explicit vertical space via inline minHeight.
 * 2. Clear Visual Separation: Explicitly labelled "ADVERTISEMENT" with distinct dashed borders and muted background so it is NEVER mistaken for tool controls.
 * 3. Responsive Device Targeting: Adapts dynamically across mobile, tablet, and desktop viewports.
 * 4. Google AdSense Certified CMP Compliance: Only serves real ads when user grants advertising consent.
 */
export function AdSlot({
  zoneKey,
  className,
  showBorder = true,
  pageType,
}: AdSlotProps) {
  const [isAdAllowed, setIsAdAllowed] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const zone: AdZoneConfig | undefined = adZones[zoneKey];
  const minHeight = zone?.minHeight || 90;
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("typekit_cookie_consent");
      if (stored) {
        const pref = JSON.parse(stored);
        if (pref.advertising) {
          setIsAdAllowed(true);
        }
      }
    } catch {
      // Fallback
    }

    const handleConsent = (e: any) => {
      if (e.detail?.advertising) {
        setIsAdAllowed(true);
      } else {
        setIsAdAllowed(false);
      }
    };

    window.addEventListener("typekit-consent-update" as any, handleConsent);
    return () => {
      window.removeEventListener("typekit-consent-update" as any, handleConsent);
    };
  }, []);

  if (!zone) return null;

  return (
    <aside
      aria-label={zone.ariaLabel}
      role="complementary"
      className={cn(
        "w-full flex flex-col items-center justify-center my-6 overflow-hidden transition-all select-none rounded-xl",
        showBorder
          ? "border border-dashed border-border/70 bg-muted/20 hover:border-border transition-colors"
          : "bg-transparent",
        className
      )}
      style={{ minHeight: `${minHeight}px` }}
    >
      {/* Explicit Ad Disclosure Bar (Google Ads Quality Guideline) */}
      <div className="flex items-center justify-between w-full px-3 py-1 bg-muted/30 border-b border-border/40 text-[10px] text-muted-foreground/75 uppercase tracking-widest font-mono">
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
          Advertisement
        </span>
        <span className="text-[9px] opacity-60 lowercase font-sans">
          sponsored placement • not a tool control
        </span>
      </div>

      {/* Ad Delivery Space */}
      <div className="flex-1 flex items-center justify-center p-4 text-center w-full">
        {isEnabled && isAdAllowed && publisherId ? (
          <div
            id={`ad-${zone.id}`}
            className="w-full flex items-center justify-center min-h-[50px]"
          >
            {/* Google AdSense ins tag */}
            <ins
              className="adsbygoogle"
              style={{ display: "block", width: "100%", height: "100%" }}
              data-ad-client={publisherId}
              data-ad-slot="1234567890"
              data-ad-format={zone.defaultFormat === "rectangle" ? "rectangle" : "auto"}
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          <div className="text-xs text-muted-foreground/60 font-mono flex flex-col sm:flex-row items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-background border border-border/60 text-[11px] font-semibold text-muted-foreground">
              {zone.name}
            </span>
            <span className="text-[11px]">
              Reserved Space ({zone.defaultFormat} • {minHeight}px min-height • zero CLS)
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
