"use client";

import React, { useState, useMemo } from "react";
import { KeyRound, ShieldAlert, ShieldCheck, Copy, Check, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SharedInput } from "@/components/tools/shared-input";
import { decodeJwt, DecodedJwt } from "@/lib/developer/advanced-transforms";
import { copyToClipboard } from "@/lib/utils";

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRrdF8yMDI2In0.eyJzdWIiOiJ1c3JfMDE5MmY4YTMiLCJuYW1lIjoiQWxpY2UgRGV2ZWxvcGVyIiwiZW1haWwiOiJhbGljZUB0eXBla2l0dG9vbHMuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzYyMzkwODAwLCJleHAiOjE3NjI0Nzc2MDB9.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";

export function JwtDecoderTool() {
  const [token, setToken] = useState<string>(SAMPLE_JWT);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const decoded: DecodedJwt = useMemo(() => {
    return decodeJwt(token);
  }, [token]);

  const handleCopy = async (obj: any, section: string) => {
    const text = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  // Color-coded token parts
  const tokenParts = useMemo(() => {
    const parts = token.trim().split(".");
    return {
      header: parts[0] || "",
      payload: parts[1] || "",
      signature: parts[2] || "",
    };
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Privacy Guarantee Alert */}
      <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>100% Client-Side Privacy:</strong> Decoding happens entirely inside your browser. No token data or secrets are transmitted over the network.
          </span>
        </div>
      </div>

      {/* Input */}
      <SharedInput
        value={token}
        onChange={setToken}
        label="ENCODED JSON WEB TOKEN (HEADER.PAYLOAD.SIGNATURE)"
        placeholder="Paste eyJhbGciOi... JWT token"
        sampleValue={SAMPLE_JWT}
        errorMessage={decoded.error}
        rows={4}
      />

      {/* Visual Token Breakdown */}
      {tokenParts.header && (
        <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-1.5 font-mono text-xs break-all leading-relaxed select-all">
          <div className="text-[11px] font-sans font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Segmented Token Anatomy:
          </div>
          <span className="text-red-500 font-semibold">{tokenParts.header}</span>
          <span className="text-muted-foreground">.</span>
          <span className="text-purple-500 font-semibold">{tokenParts.payload}</span>
          {tokenParts.signature && (
            <>
              <span className="text-muted-foreground">.</span>
              <span className="text-cyan-500 font-semibold">{tokenParts.signature}</span>
            </>
          )}
        </div>
      )}

      {/* Status Bar */}
      {decoded.isValid && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
            decoded.isExpired
              ? "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-300"
              : "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {decoded.isExpired ? (
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                {decoded.isExpired ? "Token Expired (Signature Present)" : "Token Valid & Active"}
              </div>
              <div className="text-xs opacity-90">
                {decoded.expiresAt
                  ? `Expires: ${decoded.expiresAt.toUTCString()}`
                  : "No expiration claim (exp) specified"}
              </div>
            </div>
          </div>

          {decoded.issuedAt && (
            <div className="text-xs font-mono opacity-80 text-right">
              <div>Issued At:</div>
              <div>{decoded.issuedAt.toLocaleDateString()}</div>
            </div>
          )}
        </div>
      )}

      {/* Decoded Sections Grid */}
      {decoded.isValid && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header */}
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-card shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                HEADER: Algorithm & Token Type
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(decoded.header, "header")}
                className="h-6 px-2 text-xs"
              >
                {copiedSection === "header" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <pre className="p-3 bg-muted/30 border border-border/50 rounded-lg font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-card shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                PAYLOAD: Data & Claims
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopy(decoded.payload, "payload")}
                className="h-6 px-2 text-xs"
              >
                {copiedSection === "payload" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <pre className="p-3 bg-muted/30 border border-border/50 rounded-lg font-mono text-xs text-foreground overflow-x-auto leading-relaxed">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

