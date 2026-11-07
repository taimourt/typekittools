"use client";

import { useState, useEffect } from "react";
import { Settings, Save, ShieldCheck, DollarSign, Globe, AlertTriangle } from "lucide-react";
import type { AdminSiteSettingRecord } from "@/lib/db/admin-service";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSiteSettingRecord[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data: AdminSiteSettingRecord[]) => {
        if (Array.isArray(data)) {
          setSettings(data);
          const map: Record<string, string> = {};
          data.forEach((s) => {
            map[s.key] = s.value;
          });
          setFormData(map);
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveField = async (key: string) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: formData[key] }),
      });
      if (!res.ok) throw new Error("Failed to save setting");
      setStatusMessage(`Updated ${key} successfully.`);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err: any) {
      setStatusMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Global Site Settings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
              Configuration
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure platform branding, Google AdSense monetization parameters, and target locales.
          </p>
        </div>

        {statusMessage && (
          <div className="px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-medium animate-fadeIn">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Brand Identity */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Globe className="w-4 h-4 text-teal-400" />
            <span>Platform Branding & Geographic Targeting</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Site Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData["SITE_NAME"] || ""}
                  onChange={(e) => handleChange("SITE_NAME", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSaveField("SITE_NAME")}
                  disabled={isSaving}
                  className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Target Locales
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData["TARGET_LOCALES"] || ""}
                  onChange={(e) => handleChange("TARGET_LOCALES", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSaveField("TARGET_LOCALES")}
                  disabled={isSaving}
                  className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Comma-separated target markets: en-US, en-GB, en-CA, en-AU</p>
            </div>
          </div>
        </div>

        {/* AdSense Monetization */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Monetization & Google AdSense Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Global AdSense Display Master Toggle
              </label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = formData["ENABLE_ADS"] === "true" ? "false" : "true";
                    handleChange("ENABLE_ADS", nextVal);
                    handleSaveField("ENABLE_ADS");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    formData["ENABLE_ADS"] === "true"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  {formData["ENABLE_ADS"] === "true" ? "ENABLED (Rendering Live Ads)" : "DISABLED (Zero AdSense Injections)"}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                When enabled, ads load strictly according to GDPR/CCPA user consent with reserved zero CLS layout containers.
              </p>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Publisher Client ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  value={formData["ADSENSE_CLIENT_ID"] || ""}
                  onChange={(e) => handleChange("ADSENSE_CLIENT_ID", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSaveField("ADSENSE_CLIENT_ID")}
                  disabled={isSaving}
                  className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics & Security */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Analytics & Maintenance Mode</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={formData["GA_MEASUREMENT_ID"] || ""}
                  onChange={(e) => handleChange("GA_MEASUREMENT_ID", e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSaveField("GA_MEASUREMENT_ID")}
                  disabled={isSaving}
                  className="px-3 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Maintenance Banner
              </label>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = formData["MAINTENANCE_MODE"] === "true" ? "false" : "true";
                    handleChange("MAINTENANCE_MODE", nextVal);
                    handleSaveField("MAINTENANCE_MODE");
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    formData["MAINTENANCE_MODE"] === "true"
                      ? "bg-amber-500/15 text-amber-400 border-amber-500/40"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  {formData["MAINTENANCE_MODE"] === "true" ? "ACTIVE (Maintenance Alert Shown)" : "OFF (Normal Operations)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

