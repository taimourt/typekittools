import React from "react";
import Link from "next/link";
import {
  Keyboard,
  Binary,
  FileCode2,
  Sparkles,
  Smile,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  HelpCircle,
  Clock,
  ChevronDown,
} from "lucide-react";
import { SearchBar } from "@/components/search/search-bar";
import { QuickSymbolGrid } from "@/components/symbols/quick-symbol-grid";
import { AdSlot } from "@/components/ads/ad-slot";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { initialTools } from "@/lib/tools/definitions";
import { guidesData } from "@/data/guides-data";
import { siteConfig } from "@/config/site";

const categories = [
  {
    title: "Symbols & Special Characters",
    slug: "symbols",
    description: "Windows Alt codes, currency symbols, arrows, math, and copy-paste characters.",
    icon: Sparkles,
    count: "10,000+ characters",
    href: "/symbols",
    color: "text-amber-600 bg-amber-500/10",
  },
  {
    title: "Keyboard & Typing Tools",
    slug: "keyboard",
    description: "Key event tester, typing speed tests (WPM), keyboard layout guides, and shortcuts.",
    icon: Keyboard,
    count: "4 core utilities",
    href: "/tools/keyboard",
    color: "text-sky-600 bg-sky-500/10",
  },
  {
    title: "Unicode Utilities",
    slug: "unicode",
    description: "Character inspector, codepoint lookup, zero-width space remover, and homoglyphs.",
    icon: FileCode2,
    count: "5 inspectors",
    href: "/tools/unicode",
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    title: "Text Generators",
    slug: "generators",
    description: "Aesthetic fancy fonts, small text, upside down, strikethrough, and NATO phonetic.",
    icon: Zap,
    count: "30+ font styles",
    href: "/tools/generators",
    color: "text-purple-600 bg-purple-500/10",
  },
  {
    title: "Developer Tools",
    slug: "developer",
    description: "Base64, JSON formatter, URL encoder, Hash generator, UUIDs, and timestamps.",
    icon: Binary,
    count: "10+ utilities",
    href: "/tools/developer",
    color: "text-indigo-600 bg-indigo-500/10",
  },
  {
    title: "Emoji Tools",
    slug: "emoji",
    description: "Categorized emoji picker, skin tones, emoji combinations, and copy-ready slugs.",
    icon: Smile,
    count: "3,600+ emojis",
    href: "/tools/emoji",
    color: "text-rose-600 bg-rose-500/10",
  },
];

const homeFaqs = [
  {
    question: "How do Windows Alt codes work on modern keyboards?",
    answer:
      "Windows Alt codes require holding down the left Alt key while entering numeric numbers on your physical numeric keypad (with Num Lock enabled). Releasing Alt produces the symbol. For laptops without a numeric keypad, you can use our 1-click copy symbol grid or Windows Key + Period (.).",
  },
  {
    question: "How do I type or copy the copyright symbol (©) and trademark (™)?",
    answer:
      "On Windows, hold Alt and type 0169 on the numeric keypad for © (or Alt+0153 for ™). On macOS, press Option + G for © (or Option + 2 for ™). In Microsoft Word, press Ctrl + Alt + C. You can also copy them with a single click from our Symbol Copy library.",
  },
  {
    question: "What is the keyboard shortcut to type the Spanish letter ñ?",
    answer:
      "On Windows with a numeric keypad, hold Alt and type 164 for lowercase ñ (or Alt + 165 for capital Ñ). On macOS, press Option + N, then press N again. In Microsoft Word, press Ctrl + Shift + ~, followed by N.",
  },
  {
    question: "What is the Alt code for the degree symbol (°)?",
    answer:
      "The Windows Alt code for the degree symbol is Alt + 0176 (or Alt + 248) on the numeric keypad. On macOS, press Option + Shift + 8. In Word, press Ctrl + Shift + @ then Spacebar.",
  },
  {
    question: "How do I type special symbols in Microsoft Word and Google Docs?",
    answer:
      "In Microsoft Word, you can type the four-character Unicode hex code followed by Alt + X (e.g., 00A9 then Alt+X turns into ©, and 2665 then Alt+X turns into ♥). In Google Docs, use Insert > Special Characters or type AutoCorrect triggers like (c) for ©.",
  },
  {
    question: "How do I type special characters and accents on a Mac?",
    answer:
      "On macOS, hold down the Option (⌥) key while pressing a designated letter or number (e.g. Option+3 for £, Option+G for ©, Option+E for acute accents). You can also press and hold letters to trigger the native macOS accent picker popup.",
  },
  {
    question: "Is my text data stored or sent to any server when using these tools?",
    answer:
      "No. All utility processing—including Base64 conversions, JSON formatting, keyboard event testing, and invisible space cleaning—runs 100% locally in your web browser. No tool input is logged, collected, or transmitted to remote servers.",
  },
  {
    question: "Are these tools free to use for commercial and personal work?",
    answer:
      "Yes. Every tool and character reference table on TypeKitTools is completely free to use without registration, subscriptions, or limits.",
  },
  {
    question: "Which keyboard layouts are supported?",
    answer:
      "Our tools and guides support US ANSI, UK ISO, Canadian Multilingual, Australian English, and standard international QWERTY layouts.",
  },
];

export default function HomePage() {
  const featuredTools = initialTools.filter((t) => t.featured);
  const recentlyAddedTools = initialTools.slice(4, 10);
  const guidesList = Object.values(guidesData);

  // FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="space-y-14 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Top Banner Advertisement (Zero CLS) */}
      <div className="container max-w-5xl pt-4">
        <AdSlot zoneKey="HEADER_BELOW_NAV" showBorder={false} />
      </div>

      {/* 1 & 2. Hero Section */}
      <section className="container max-w-4xl text-center space-y-6 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary">
          <Shield className="h-3.5 w-3.5" />
          <span>100% Free & Client-Side Privacy: Your data never leaves your device</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            The All-In-One Platform for{" "}
            <span className="text-primary underline decoration-primary/30 underline-offset-8">
              Typing, Symbols
            </span>{" "}
            & Developer Tools
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Instant online utilities for typing tests, Windows Alt codes, Mac shortcuts, Unicode character analysis, fancy text generators, and developer encoders.
          </p>
        </div>

        {/* 3. Search Bar */}
        <div className="pt-2 max-w-2xl mx-auto">
          <SearchBar variant="hero" />
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground/80">Trending:</span>
            <Link href="/tools/keyboard/key-code-tester" className="hover:text-primary transition-colors underline decoration-border">
              Key Code Tester
            </Link>
            <span>•</span>
            <Link href="/symbols/currency" className="hover:text-primary transition-colors underline decoration-border">
              Currency Symbols
            </Link>
            <span>•</span>
            <Link href="/tools/developer/base64" className="hover:text-primary transition-colors underline decoration-border">
              Base64 Encoder
            </Link>
            <span>•</span>
            <Link href="/tools/generators/fancy-text" className="hover:text-primary transition-colors underline decoration-border">
              Fancy Fonts
            </Link>
            <span>•</span>
            <Link href="/guides/alt-codes-list" className="hover:text-primary transition-colors underline decoration-border">
              Alt Codes
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Popular Symbols (Interactive 1-Click Copy) */}
      <section className="container max-w-5xl space-y-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Popular Symbols & Alt Codes
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click any symbol to copy directly to your clipboard with Windows Alt codes and Mac shortcuts.
            </p>
          </div>
          <Link
            href="/symbols"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            All Symbols <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <QuickSymbolGrid limit={24} showCategoryTabs={true} />
      </section>

      {/* 6. Main Tool Categories */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-border/60 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Main Tool Categories
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore specialized toolkits crafted for typists, writers, and developers.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all directory <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.slug} href={cat.href} className="group">
                <Card className="h-full hover:border-primary/50 hover:shadow-card-hover transition-all duration-150">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 border-0">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-lg ${cat.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <CardTitle className="text-sm font-semibold group-hover:text-primary transition-colors">
                        {cat.title}
                      </CardTitle>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                      {cat.count}
                    </span>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">
                      {cat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. Featured Tools */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Featured Tools
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Instant utilities running completely in your browser with zero latency.
            </p>
          </div>
          <Badge variant="teal" className="text-[10px] uppercase font-mono">
            Zero Server Latency
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group block"
            >
              <div className="h-full p-4 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 hover:shadow-card-hover transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                    {tool.category}
                  </Badge>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. Recently Added Tools */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Recently Added Tools
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fresh utility releases and text encoders.
            </p>
          </div>
          <Link href="/tools" className="text-xs text-primary hover:underline flex items-center gap-1">
            Browse all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyAddedTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group block"
            >
              <div className="h-full p-4 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 transition-all space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {tool.category}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 font-medium">
                    New
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {tool.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Educational Guides */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Educational Typing & Character Guides
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Comprehensive reference tables for US, UK, Canada, and Australia keyboards.
            </p>
          </div>
          <Link href="/guides" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
            All guides <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidesList.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
              <div className="h-full p-5 rounded-xl border border-border bg-card shadow-card hover:border-primary/50 transition-all flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                      {guide.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {guide.readingTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {guide.summary}
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
      </section>

      {/* 10. Frequently Asked Questions Section */}
      <section className="container max-w-5xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <HelpCircle className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-muted-foreground">
              Common questions about typing special characters, Alt codes, and our free utilities.
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/60 rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm">
          {homeFaqs.map((faq, i) => (
            <div key={i} className="py-4 first:pt-0 last:pb-0 space-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                {faq.question}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
