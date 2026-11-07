"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, Check, X, Smartphone, Monitor, Tablet, Save, AlertCircle, Sparkles } from "lucide-react";
import { AdminAdPlacementRecord } from "@/lib/db/admin-service";

export default function AdminAdsPage() {
  const [placements, setPlacements] = useState<AdminAdPlacementRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activePlacement, setActivePlacement] = useState<AdminAdPlacementRecord | null>(null);

  const fetchPlacements = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/ads");
      if (!res.ok) throw new Error("Failed to load ad placements.");
      const data = await res.json();
      setPlacements(data.placements || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacements();
  }, []);

  const handleToggle = async (placement: AdminAdPlacementRecord) => {
    try {
      const res = await fetch("/api/admin/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zoneKey: placement.zoneKey,
          isEnabled: !placement.isEnabled,
        }),
      });
      if (res.ok) {
        setPlacements(
          placements.map((p) =>
            p.zoneKey === placement.zoneKey ? { ...p, isEnabled: !p.isEnabled } : p
          )
        );
      }
    } catch {
      // Fallback
    }
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlacement) return;

    try {
      setError(null);
      const res = await fetch("/api/admin/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activePlacement),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update placement.");
      }

      setSuccessMsg(`Ad placement '${activePlacement.name}' saved.`);
      setTimeout(() => setSuccessMsg(null), 3000);
      setActivePlacement(null);
      fetchPlacements();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-primary" />
            Advertisement Placements Manager
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure Google AdSense slots, eligible page templates, device visibility, and zero-CLS layout height.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Placements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-2 p-8 text-center text-xs text-muted-foreground">
            Loading advertisement zones...
          </div>
        ) : (
          placements.map((placement) => (
            <div
              key={placement.id}
              className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 hover:border-primary/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-primary tracking-wider">
                    {placement.zoneKey}
                  </span>
                  <button
                    onClick={() => handleToggle(placement)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition-colors ${
                      placement.isEnabled
                        ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {placement.isEnabled ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    {placement.isEnabled ? "Serving Live" : "Disabled"}
                  </button>
                </div>

                <h3 className="text-base font-bold text-foreground">{placement.name}</h3>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span>Reserved Space (CLS)</span>
                    <span className="font-mono text-foreground font-semibold">
                      {placement.minHeight}px
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span>Ad Format</span>
                    <span className="font-mono text-foreground uppercase text-[10px]">
                      {placement.format}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-border/40">
                    <span>Device Visibility</span>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className={`flex items-center gap-1 ${placement.deviceVisibility.desktop ? "text-primary" : "text-muted-foreground line-through opacity-40"}`}>
                        <Monitor className="w-3.5 h-3.5" /> Desktop
                      </span>
                      <span className={`flex items-center gap-1 ${placement.deviceVisibility.tablet ? "text-primary" : "text-muted-foreground line-through opacity-40"}`}>
                        <Tablet className="w-3.5 h-3.5" /> Tablet
                      </span>
                      <span className={`flex items-center gap-1 ${placement.deviceVisibility.mobile ? "text-primary" : "text-muted-foreground line-through opacity-40"}`}>
                        <Smartphone className="w-3.5 h-3.5" /> Mobile
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="block text-[10px] uppercase font-mono tracking-wider text-muted-foreground mb-1.5">
                      Eligible Page Templates
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {placement.eligiblePageTypes.map((pt) => (
                        <span key={pt} className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-foreground border border-border/60">
                          /{pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">
                  Slot: {placement.adSlotId || "Default"}
                </span>
                <button
                  onClick={() => setActivePlacement(placement)}
                  className="px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                >
                  Configure Placement
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Placement Modal */}
      {activePlacement && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground">Configure Ad Placement</h2>
                <span className="text-xs text-primary font-mono">{activePlacement.zoneKey}</span>
              </div>
              <button
                onClick={() => setActivePlacement(null)}
                className="p-1 rounded-lg text-muted-foreground hover:bg-muted"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-1">Friendly Name</label>
                <input
                  type="text"
                  value={activePlacement.name}
                  onChange={(e) => setActivePlacement({ ...activePlacement, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-foreground block mb-1">AdSense Client ID</label>
                  <input
                    type="text"
                    value={activePlacement.adClientId}
                    onChange={(e) => setActivePlacement({ ...activePlacement, adClientId: e.target.value })}
                    placeholder="ca-pub-0000000000000000"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">AdSense Slot ID</label>
                  <input
                    type="text"
                    value={activePlacement.adSlotId}
                    onChange={(e) => setActivePlacement({ ...activePlacement, adSlotId: e.target.value })}
                    placeholder="1234567890"
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-foreground block mb-1">Min Height (CLS Reservation)</label>
                  <input
                    type="number"
                    min={50}
                    max={600}
                    value={activePlacement.minHeight}
                    onChange={(e) => setActivePlacement({ ...activePlacement, minHeight: parseInt(e.target.value) || 90 })}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-foreground block mb-1">Default Format</label>
                  <select
                    value={activePlacement.format}
                    onChange={(e) => setActivePlacement({ ...activePlacement, format: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                  >
                    <option value="horizontal">Horizontal (Leaderboard)</option>
                    <option value="rectangle">Rectangle (Inline / Bottom)</option>
                    <option value="vertical">Vertical</option>
                    <option value="auto">Auto Responsive</option>
                  </select>
                </div>
              </div>

              {/* Device Visibility */}
              <div>
                <label className="font-semibold text-foreground block mb-1.5">Device Visibility</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePlacement.deviceVisibility.desktop}
                      onChange={(e) =>
                        setActivePlacement({
                          ...activePlacement,
                          deviceVisibility: { ...activePlacement.deviceVisibility, desktop: e.target.checked },
                        })
                      }
                      className="rounded border-border"
                    />
                    <span>Desktop</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePlacement.deviceVisibility.tablet}
                      onChange={(e) =>
                        setActivePlacement({
                          ...activePlacement,
                          deviceVisibility: { ...activePlacement.deviceVisibility, tablet: e.target.checked },
                        })
                      }
                      className="rounded border-border"
                    />
                    <span>Tablet</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activePlacement.deviceVisibility.mobile}
                      onChange={(e) =>
                        setActivePlacement({
                          ...activePlacement,
                          deviceVisibility: { ...activePlacement.deviceVisibility, mobile: e.target.checked },
                        })
                      }
                      className="rounded border-border"
                    />
                    <span>Mobile</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setActivePlacement(null)}
                  className="px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

