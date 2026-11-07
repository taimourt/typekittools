"use client";

import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, Check, Settings2, X } from "lucide-react";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  timestamp: number;
}

const STORAGE_KEY = "typekit_cookie_consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    advertising: false,
    timestamp: 0,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences(parsed);
      } else {
        // Show banner after brief delay
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const savePreferences = (updated: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setPreferences(updated);
      setIsVisible(false);
      setShowPreferences(false);
      // Dispatch global event for Google AdSense & Analytics scripts
      window.dispatchEvent(
        new CustomEvent("typekit-consent-update", { detail: updated })
      );
    } catch {
      // Fallback
    }
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: Date.now(),
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: Date.now(),
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      ...preferences,
      timestamp: Date.now(),
    });
  };

  if (!isVisible && !showPreferences) return null;

  return (
    <>
      {/* Floating Bottom Consent Banner */}
      {isVisible && !showPreferences && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 sm:p-5 bg-slate-900/95 backdrop-blur-md text-white border border-slate-800 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  Privacy & Cookie Preferences
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We use cookies and local storage to keep tools functional, analyze usage metrics, and serve relevant Google AdSense ads. All our typing tools run 100% locally in your browser without transmitting your input text.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1 border-t border-slate-800/80">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Customize
              </button>

              <button
                onClick={handleRejectNonEssential}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>

              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Granular Preference Customization Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Privacy & Data Consent Settings
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Customize your privacy preferences below. Essential cookies are required for basic site navigation and local preferences (like symbol tray & favorites).
            </p>

            <div className="space-y-3 divide-y divide-slate-100">
              {/* Category 1: Essential */}
              <div className="pt-2 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    Strictly Necessary Cookies
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                      Always Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Required for tool state, theme toggles, clipboard trays, and CSRF protection.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="rounded border-slate-300 text-teal-600 cursor-not-allowed opacity-60 mt-1"
                />
              </div>

              {/* Category 2: Analytics */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Analytics & Performance
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Anonymized telemetry to measure tool popularity, load speeds, and Core Web Vitals.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                  }
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer mt-1"
                />
              </div>

              {/* Category 3: Advertising */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Google AdSense & Targeted Advertising
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Permits Google AdSense to serve personalized ads based on your general interests. Disabling this shows non-personalized ads.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.advertising}
                  onChange={(e) =>
                    setPreferences((prev) => ({ ...prev, advertising: e.target.checked }))
                  }
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

