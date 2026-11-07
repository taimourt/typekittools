"use client";

import React, { useState, useEffect } from "react";
import { Clock, Play, Pause, Copy, Check, Calendar, ArrowRightLeft, Globe, Info } from "lucide-react";

export function TimestampConverterTool() {
  // Live Clock State
  const [now, setNow] = useState<number>(Date.now());
  const [isClockRunning, setIsClockRunning] = useState<boolean>(true);

  // Mode 1: Timestamp -> Date
  const [inputTimestamp, setInputTimestamp] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Mode 2: Date -> Timestamp
  const [inputDateString, setInputDateString] = useState<string>("");
  const [inputTimezone, setInputTimezone] = useState<"LOCAL" | "UTC">("LOCAL");

  // Keep live clock ticking
  useEffect(() => {
    if (!isClockRunning) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [isClockRunning]);

  // Initialize inputTimestamp with current time on first mount
  useEffect(() => {
    setInputTimestamp(Math.floor(Date.now() / 1000).toString());
    const d = new Date();
    // format as YYYY-MM-DDTHH:mm:ss for datetime-local
    const pad = (n: number) => n.toString().padStart(2, "0");
    const localIso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    setInputDateString(localIso);
  }, []);

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  // Parse input timestamp
  const parseTimestamp = (val: string): Date | null => {
    const trimmed = val.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) return null;
    const num = Number(trimmed);
    if (isNaN(num)) return null;
    // If length <= 11 digits, treat as seconds; if >= 12, treat as ms
    const isSeconds = Math.abs(num) < 100000000000;
    const ms = isSeconds ? num * 1000 : num;
    const date = new Date(ms);
    return isNaN(date.getTime()) ? null : date;
  };

  const parsedDate = parseTimestamp(inputTimestamp);

  // Calculate relative time
  const getRelativeTime = (d: Date): string => {
    const diffSec = Math.round((d.getTime() - now) / 1000);
    const absSec = Math.abs(diffSec);
    const isFuture = diffSec > 0;

    if (absSec < 5) return "Just now";
    if (absSec < 60) return isFuture ? `In ${absSec} seconds` : `${absSec} seconds ago`;
    const min = Math.round(absSec / 60);
    if (min < 60) return isFuture ? `In ${min} minute${min > 1 ? "s" : ""}` : `${min} minute${min > 1 ? "s" : ""} ago`;
    const hours = Math.round(min / 60);
    if (hours < 24) return isFuture ? `In ${hours} hour${hours > 1 ? "s" : ""}` : `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.round(hours / 24);
    if (days < 365) return isFuture ? `In ${days} day${days > 1 ? "s" : ""}` : `${days} day${days > 1 ? "s" : ""} ago`;
    const years = (days / 365).toFixed(1);
    return isFuture ? `In ${years} years` : `${years} years ago`;
  };

  // Convert Date Picker to Timestamp
  const getPickedTimestamp = (): { sec: number; ms: number } | null => {
    if (!inputDateString) return null;
    try {
      let d: Date;
      if (inputTimezone === "UTC") {
        d = new Date(inputDateString + "Z");
      } else {
        d = new Date(inputDateString);
      }
      if (isNaN(d.getTime())) return null;
      return {
        sec: Math.floor(d.getTime() / 1000),
        ms: d.getTime(),
      };
    } catch {
      return null;
    }
  };

  const pickedTs = getPickedTimestamp();

  // Adjust Timestamp
  const adjustTimestamp = (seconds: number) => {
    const cur = parseTimestamp(inputTimestamp);
    if (!cur) return;
    const newSec = Math.floor(cur.getTime() / 1000) + seconds;
    setInputTimestamp(newSec.toString());
  };

  // Target timezone formats
  const targetTimezones = [
    { label: "UTC (Universal)", zone: "UTC" },
    { label: "New York (US Eastern)", zone: "America/New_York" },
    { label: "Los Angeles (US Pacific)", zone: "America/Los_Angeles" },
    { label: "London (UK GMT/BST)", zone: "Europe/London" },
    { label: "Toronto (Canada Eastern)", zone: "America/Toronto" },
    { label: "Sydney (Australia AEST)", zone: "Australia/Sydney" },
  ];

  return (
    <div className="space-y-6">
      {/* Realtime Epoch Header Clock Banner */}
      <div className="p-4 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-xl shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-lg">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-teal-300">
              Current Unix Epoch Time
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-2xl font-bold tracking-tight">
                {Math.floor(now / 1000)}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                ({now} ms)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsClockRunning(!isClockRunning)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
          >
            {isClockRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isClockRunning ? "Pause Clock" : "Resume Clock"}
          </button>

          <button
            onClick={() => {
              const currentSec = Math.floor(Date.now() / 1000).toString();
              setInputTimestamp(currentSec);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg shadow-xs transition-colors"
          >
            Use Current Time
          </button>
        </div>
      </div>

      {/* Main Two-Column Converters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Converter 1: Epoch Timestamp to Human Date */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <ArrowRightLeft className="w-4 h-4 text-teal-600" />
              Timestamp to Human Date
            </h3>
            <span className="text-xs text-slate-500">Auto-detects sec / ms</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Enter Unix Timestamp (Seconds or Milliseconds):
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="e.g. 1762391000 or 1762391000000"
                className="w-full px-3 py-2.5 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              {inputTimestamp && (
                <button
                  onClick={() => setInputTimestamp("")}
                  className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Relative Adjustments */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium mr-1">Offsets:</span>
            <button
              onClick={() => adjustTimestamp(-86400)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              -1 Day
            </button>
            <button
              onClick={() => adjustTimestamp(3600)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              +1 Hour
            </button>
            <button
              onClick={() => adjustTimestamp(86400)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              +1 Day
            </button>
            <button
              onClick={() => adjustTimestamp(604800)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              +7 Days
            </button>
            <button
              onClick={() => adjustTimestamp(2592000)}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
            >
              +30 Days
            </button>
          </div>

          {/* Formatted Output Fields */}
          {parsedDate ? (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              {/* Relative Time Banner */}
              <div className="p-2.5 bg-teal-50 text-teal-900 rounded-lg text-xs font-semibold flex items-center justify-between">
                <span>Relative:</span>
                <span className="font-mono text-teal-800">{getRelativeTime(parsedDate)}</span>
              </div>

              {/* UTC Output */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">GMT / UTC</div>
                  <div className="font-mono text-xs text-slate-900 font-semibold">{parsedDate.toUTCString()}</div>
                </div>
                <button
                  onClick={() => copyText(parsedDate.toUTCString(), "utc")}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors"
                  title="Copy UTC String"
                >
                  {copiedKey === "utc" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* ISO 8601 */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">ISO 8601</div>
                  <div className="font-mono text-xs text-slate-900 font-semibold">{parsedDate.toISOString()}</div>
                </div>
                <button
                  onClick={() => copyText(parsedDate.toISOString(), "iso")}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors"
                  title="Copy ISO 8601"
                >
                  {copiedKey === "iso" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Local Time */}
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Your Local System Time</div>
                  <div className="font-mono text-xs text-slate-900 font-semibold">{parsedDate.toString()}</div>
                </div>
                <button
                  onClick={() => copyText(parsedDate.toString(), "local")}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors"
                  title="Copy Local Time"
                >
                  {copiedKey === "local" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Enter a valid integer Unix timestamp above to view formatted human dates.
            </div>
          )}
        </div>

        {/* Converter 2: Human Date to Timestamp */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-teal-600" />
              Human Date to Unix Timestamp
            </h3>
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setInputTimezone("LOCAL")}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  inputTimezone === "LOCAL" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                Local
              </button>
              <button
                onClick={() => setInputTimezone("UTC")}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  inputTimezone === "UTC" ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                UTC
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Select Date & Time ({inputTimezone}):
            </label>
            <input
              type="datetime-local"
              step="1"
              value={inputDateString}
              onChange={(e) => setInputDateString(e.target.value)}
              className="w-full px-3 py-2.5 font-mono text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {pickedTs ? (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Timestamp in Seconds</div>
                  <div className="font-mono text-lg font-bold text-teal-800">{pickedTs.sec}</div>
                </div>
                <button
                  onClick={() => copyText(pickedTs.sec.toString(), "ts_sec")}
                  className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
                >
                  {copiedKey === "ts_sec" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "ts_sec" ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Timestamp in Milliseconds</div>
                  <div className="font-mono text-lg font-bold text-slate-800">{pickedTs.ms}</div>
                </div>
                <button
                  onClick={() => copyText(pickedTs.ms.toString(), "ts_ms")}
                  className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors flex items-center gap-1"
                >
                  {copiedKey === "ts_ms" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "ts_ms" ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="text-xs text-slate-500 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
                <span className="font-semibold text-teal-900">Python / JavaScript Equivalent:</span>
                <div className="font-mono text-[11px] text-teal-800 mt-1">
                  JS: <code className="bg-white px-1 py-0.5 rounded border border-teal-200">Math.floor(Date.now() / 1000)</code>
                  <br />
                  Py: <code className="bg-white px-1 py-0.5 rounded border border-teal-200 mt-0.5 inline-block">import time; int(time.time())</code>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              Pick a date and time to see its exact Unix timestamp representation.
            </div>
          )}
        </div>
      </div>

      {/* World Timezone Matrix for Selected Timestamp */}
      {parsedDate && (
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              Target Market Timezone Equivalents ({inputTimestamp}s)
            </h4>
            <span className="text-xs text-slate-500">US, UK, Canada & Australia</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {targetTimezones.map((tz) => {
              const formatted = new Intl.DateTimeFormat("en-US", {
                timeZone: tz.zone,
                dateStyle: "medium",
                timeStyle: "medium",
              }).format(parsedDate);

              return (
                <div key={tz.zone} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-[11px] font-semibold text-slate-500">{tz.label}</div>
                  <div className="font-mono text-xs text-slate-900 font-bold mt-0.5">{formatted}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Educational Guide Box */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
        <h4 className="font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal-600" />
          What is Unix Epoch Time?
        </h4>
        <p>
          Unix time (also known as POSIX or Epoch time) is the number of seconds that have elapsed since the Unix epoch: <strong>00:00:00 UTC on 1 January 1970</strong> (excluding leap seconds).
        </p>
        <p>
          <strong>Year 2038 Problem (Y2K38):</strong> On 19 January 2038 at 03:14:07 UTC, 32-bit signed integers will overflow past 2,147,483,647. Modern 64-bit systems handle timestamps for billions of years safely into the future.
        </p>
      </div>
    </div>
  );
}

