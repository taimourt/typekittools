import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Typing Guides, Keyboard Shortcuts & Alt Codes Reference",
  description:
    "Comprehensive typing guides, Windows numeric keypad Alt code tables, macOS Option key shortcut maps, and international keyboard layout tutorials.",
};

const guides = [
  {
    title: "Windows Alt Codes Master List (Numeric Keypad Reference)",
    slug: "alt-codes-list",
    description:
      "A complete guide to typing special characters on Windows using the numeric keypad. Includes four-digit Alt codes (Alt+0169 for ©) and classic ASCII codes.",
    tag: "Windows",
  },
  {
    title: "How to Type Special Characters on macOS (Option Key Combinations)",
    slug: "mac-option-shortcuts",
    description:
      "Master the Mac Option (⌥) and Option+Shift keys to type currency symbols, accents (é, ñ, ü), em dashes, ellipsis, and Greek letters with zero external software.",
    tag: "macOS",
  },
  {
    title: "Keyboard Layout Guide: ANSI vs ISO, US vs UK Differences",
    slug: "keyboard-layouts",
    description:
      "Discover why the @ and \" symbols swap places, the difference between US and UK English keyboards, and how to configure your OS input settings.",
    tag: "Hardware & Layouts",
  },
  {
    title: "Unicode Normalization Explained: NFC vs NFD Forms",
    slug: "unicode-normalization",
    description:
      "Understand why identical-looking accented characters like 'é' fail string equality comparisons in code, and how Unicode normalization resolves search issues.",
    tag: "Technical Unicode",
  },
];

export default function GuidesDirectoryPage() {
  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <Breadcrumbs items={[{ label: "Guides & Tutorials" }]} />

      <div className="space-y-3">
        <Badge variant="teal" className="uppercase font-mono text-[10px]">
          Knowledge Base
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Typing Guides & Character References
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Practical step-by-step tutorials on mastering keyboard shortcuts, special characters, and Unicode typing across Windows, macOS, Chromebook, and Linux.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
            <div className="h-full p-5 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                  {guide.tag}
                </span>
                <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {guide.title}
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs text-primary font-medium">
                <span>Read Tutorial</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

