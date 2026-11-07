"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Copy, Check, Hash, Key, RefreshCw, Upload, ShieldCheck, Info } from "lucide-react";
import { md5, crc32, computeSubtleHash, computeHmac } from "@/lib/utils/hash";

interface HashResult {
  name: string;
  bits: number;
  value: string;
  isWeak?: boolean;
}

export function HashGeneratorTool() {
  const [input, setInput] = useState<string>("Hello, TypeKitTools developer!");
  const [hmacKey, setHmacKey] = useState<string>("");
  const [enableHmac, setEnableHmac] = useState<boolean>(false);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [hashes, setHashes] = useState<HashResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isCancelled = false;

    async function calculate() {
      if (!input && !hmacKey) {
        setHashes([]);
        return;
      }

      const md5Val = md5(input);
      const crcVal = crc32(input);
      const sha1Val = await computeSubtleHash("SHA-1", input);
      const sha256Val = await computeSubtleHash("SHA-256", input);
      const sha384Val = await computeSubtleHash("SHA-384", input);
      const sha512Val = await computeSubtleHash("SHA-512", input);

      let hmac256Val = "";
      let hmac512Val = "";
      if (enableHmac && hmacKey) {
        hmac256Val = await computeHmac("SHA-256", hmacKey, input);
        hmac512Val = await computeHmac("SHA-512", hmacKey, input);
      }

      if (isCancelled) return;

      const format = (v: string) => (isUppercase ? v.toUpperCase() : v.toLowerCase());

      const results: HashResult[] = [
        { name: "MD5", bits: 128, value: format(md5Val), isWeak: true },
        { name: "SHA-1", bits: 160, value: format(sha1Val), isWeak: true },
        { name: "SHA-256", bits: 256, value: format(sha256Val) },
        { name: "SHA-384", bits: 384, value: format(sha384Val) },
        { name: "SHA-512", bits: 512, value: format(sha512Val) },
        { name: "CRC32", bits: 32, value: format(crcVal) },
      ];

      if (enableHmac && hmacKey) {
        results.push(
          { name: "HMAC-SHA256", bits: 256, value: format(hmac256Val) },
          { name: "HMAC-SHA512", bits: 512, value: format(hmac512Val) }
        );
      }

      setHashes(results);
    }

    startTransition(() => {
      calculate();
    });

    return () => {
      isCancelled = true;
    };
  }, [input, hmacKey, enableHmac, isUppercase]);

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  const copyAll = async () => {
    const text = hashes.map((h) => `${h.name} (${h.bits}-bit):\n${h.value}`).join("\n\n");
    await copyToClipboard(text, "all");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) setInput(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            UPPERCASE Hex
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none">
            <input
              type="checkbox"
              checked={enableHmac}
              onChange={(e) => setEnableHmac(e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Enable HMAC Secret Key
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Upload File
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => setInput("")}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Clear
          </button>

          {hashes.length > 0 && (
            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors"
            >
              {copiedKey === "all" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === "all" ? "Copied All!" : "Copy All Hashes"}
            </button>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-slate-800">
          Source Text / Payload:
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste text to generate cryptographic hashes..."
          rows={3}
          className="w-full p-3 font-mono text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner resize-y transition-all"
        />
        <div className="flex justify-between items-center text-xs text-slate-500 px-1">
          <span>{input.length} characters ({new TextEncoder().encode(input).length} UTF-8 bytes)</span>
          <span className="text-teal-700 font-medium">Computed 100% locally in your browser</span>
        </div>
      </div>

      {/* HMAC Key Input */}
      {enableHmac && (
        <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-xl space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-teal-900">
            <Key className="w-4 h-4 text-teal-600" />
            HMAC Secret Key:
          </label>
          <input
            type="text"
            value={hmacKey}
            onChange={(e) => setHmacKey(e.target.value)}
            placeholder="Enter your secret key (e.g. secret_token_xyz)..."
            className="w-full px-3 py-2 font-mono text-sm bg-white border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner"
          />
          <p className="text-xs text-teal-700">
            Calculates Hash-based Message Authentication Codes (HMAC) for webhook signature verification.
          </p>
        </div>
      )}

      {/* Hash Results Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <Hash className="w-4 h-4 text-teal-600" />
          Generated Cryptographic Hashes
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {hashes.map((item) => (
            <div
              key={item.name}
              className="p-3.5 bg-white border border-slate-200 rounded-xl hover:border-teal-300 transition-all shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-800">{item.name}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.bits}-bit
                  </span>
                  {item.isWeak && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                      Legacy / Not Collision Resistant
                    </span>
                  )}
                  {!item.isWeak && item.name.startsWith("SHA-") && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Secure
                    </span>
                  )}
                </div>

                <button
                  onClick={() => copyToClipboard(item.value, item.name)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                    copiedKey === item.name
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  title={`Copy ${item.name}`}
                >
                  {copiedKey === item.name ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === item.name ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="font-mono text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-2.5 break-all select-all">
                {item.value || <span className="text-slate-400 italic">Empty string</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational & Comparison Notes */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal-600" />
          Cryptographic Hash Reference & Security Guide
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">SHA-256 & SHA-512</span>
            <p>
              Standard in TLS/SSL certificates, Bitcoin blockchain, Git commit signing, and password hashing (PBKDF2/Argon2). Highly collision-resistant.
            </p>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">MD5 & SHA-1</span>
            <p>
              Cryptographically broken due to practical collision attacks. Suitable only for legacy checksums, cache busting, and non-security integrity checks.
            </p>
          </div>
          <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
            <span className="font-semibold text-slate-900 block">CRC32 Checksum</span>
            <p>
              32-bit cyclic redundancy check designed to detect accidental transmission noise in Ethernet frames, ZIP archives, and PNG chunks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

