import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { UNICODE_CHARACTERS } from "@/data/unicode/characters-data";
import { getCharacterBySlugOrCodepoint } from "@/lib/unicode/search";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/tools/copy-button";
import { AdSlot } from "@/components/ads/ad-slot";
import { ArrowRight, Sparkles, Keyboard, Info, Check, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";

interface CharDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return UNICODE_CHARACTERS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: CharDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const char = getCharacterBySlugOrCodepoint(resolvedParams.slug);

  if (!char) {
    return {
      title: "Character Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.url}/symbols/detail/${char.slug}`;

  return {
    title: `${char.char} ${char.name} (${char.codepoint}) - How to Type & Copy`,
    description: `How to type the ${char.name} (${char.char}). Learn Windows Alt codes (${char.altCodeWindows || "N/A"}), Mac Option shortcuts, HTML entities (${char.htmlEntity || char.htmlDec}), and Unicode codepoint ${char.codepoint}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${char.char} ${char.name} (${char.codepoint}) | TypeKitTools`,
      description: `Complete typing guide and Unicode details for ${char.name} (${char.char}).`,
      url: canonicalUrl,
    },
  };
}

export default async function CharacterDetailPage({ params }: CharDetailPageProps) {
  const resolvedParams = await params;
  const char = getCharacterBySlugOrCodepoint(resolvedParams.slug);

  if (!char) {
    notFound();
  }

  const related = UNICODE_CHARACTERS.filter(
    (c) => c.category === char.category && c.codepoint !== char.codepoint
  ).slice(0, 8);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Type the ${char.name} (${char.char})`,
    description: `Instructions for typing ${char.name} on Windows, Mac, and web applications.`,
    step: [
      {
        "@type": "HowToStep",
        name: "Windows Alt Code",
        text: char.altCodeWindows
          ? `Press and hold Alt, type ${char.altCodeWindows.replace("Alt + ", "")} on the numeric keypad, then release Alt.`
          : `Use the Windows emoji/symbol picker by pressing Win + Period (.).`,
      },
      {
        "@type": "HowToStep",
        name: "Mac Keyboard Shortcut",
        text: char.macShortcut
          ? `Press ${char.macShortcut} on your Apple keyboard.`
          : `Press Control + Command + Space to open the macOS Character Viewer.`,
      },
      {
        "@type": "HowToStep",
        name: "HTML / Web Code",
        text: `In HTML source code, insert ${char.htmlEntity || char.htmlDec}.`,
      },
    ],
  };

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Symbols", href: "/symbols" },
          { label: char.category, href: `/symbols` },
          { label: `${char.char} ${char.name}` },
        ]}
      />

      {/* Hero Character Header */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-muted/60 border border-border flex items-center justify-center font-mono text-5xl sm:text-6xl font-extrabold text-foreground shadow-sm shrink-0">
            {char.char}
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="teal" className="uppercase font-mono text-[10px]">
                {char.category}
              </Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                {char.codepoint}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                Unicode 16.0
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {char.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Official Unicode character in the <strong>{char.block}</strong> block. Use the copy buttons or follow the platform-specific instructions below to type this character.
            </p>

            {/* Quick Copy Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <CopyButton text={char.char} label="Copy Character" variant="default" />
              <CopyButton text={char.codepoint} label="Copy Codepoint" variant="outline" />
              {char.htmlEntity && (
                <CopyButton text={char.htmlEntity} label="Copy HTML Entity" variant="outline" />
              )}
            </div>
          </div>
        </div>
      </div>

      <AdSlot zoneKey="TOOL_BELOW_MAIN" />

      {/* How to Type Instructions Across Operating Systems */}
      <section className="p-6 rounded-2xl border border-border bg-card space-y-4">
        <div className="flex items-center gap-2">
          <Keyboard className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            How to Type the {char.name} ({char.char})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Windows Instructions */}
          <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
            <span className="text-xs font-mono font-bold text-primary uppercase">
              Windows Instructions
            </span>
            <div className="text-sm font-semibold text-foreground">
              {char.altCodeWindows ? (
                <span>Hold <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">Alt</kbd> + type <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono text-primary font-bold">{char.altCodeWindows.replace("Alt + ", "")}</kbd> on NumPad</span>
              ) : (
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">Win</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">.</kbd> (Period)</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {char.altCodeWindows
                ? "Num Lock must be turned on. Numbers must be typed on the physical numeric keypad on the right."
                : "Opens the Windows 10/11 native emoji and symbol picker where you can search and insert this character."}
            </p>
          </div>

          {/* Mac Instructions */}
          <div className="p-4 rounded-xl border border-border/70 bg-muted/20 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase">
              macOS (Apple) Instructions
            </span>
            <div className="text-sm font-semibold text-foreground">
              {char.macShortcut ? (
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono text-emerald-700 font-bold">{char.macShortcut}</kbd></span>
              ) : (
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">Cmd</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono">Space</kbd></span>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {char.macShortcut
                ? "Standard macOS mnemonic Option key shortcut compatible with US and International Mac keyboards."
                : "Opens the macOS Character Viewer palette to search and double-click the character."}
            </p>
          </div>
        </div>
      </section>

      {/* Complete Technical Data Table */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-foreground">
          Technical Specifications & Encoding Details
        </h2>

        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <tbody className="divide-y divide-border/50 font-mono">
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans w-48">Unicode Codepoint</td>
                <td className="p-3 font-bold text-primary">{char.codepoint}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">Decimal Value</td>
                <td className="p-3 font-bold text-foreground">{char.dec}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">Hexadecimal Value</td>
                <td className="p-3 font-bold text-foreground">0x{char.hex}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">UTF-8 Bytes</td>
                <td className="p-3 font-bold text-foreground">{char.utf8Bytes}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">HTML Named Entity</td>
                <td className="p-3 font-bold text-foreground">{char.htmlEntity || "—"}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">HTML Decimal Entity</td>
                <td className="p-3 font-bold text-foreground">{char.htmlDec}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">HTML Hex Entity</td>
                <td className="p-3 font-bold text-foreground">{char.htmlHex}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">General Category</td>
                <td className="p-3 font-sans font-medium text-foreground">{char.category} ({char.categoryCode})</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">Unicode Block</td>
                <td className="p-3 font-sans font-medium text-foreground">{char.block}</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="p-3 text-muted-foreground font-sans">Script</td>
                <td className="p-3 font-sans font-medium text-foreground">{char.script}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Characters */}
      {related.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-border/60">
          <h2 className="text-base font-bold text-foreground">
            Related {char.category} Characters
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map((rel) => (
              <Link
                key={rel.codepoint}
                href={`/symbols/detail/${rel.slug}`}
                className="p-3 rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all flex items-center gap-3 group"
              >
                <span className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-mono text-xl font-bold text-foreground group-hover:scale-110 transition-transform">
                  {rel.char}
                </span>
                <div className="truncate">
                  <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors block truncate">
                    {rel.name}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {rel.codepoint}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

