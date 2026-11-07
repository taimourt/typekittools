"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Keyboard,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Search,
  Code2,
  Binary,
  Smile,
  Hash,
} from "lucide-react";
import { mainNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/search-bar";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary text-primary-foreground font-bold shadow-sm group-hover:bg-primary-hover transition-colors">
            <Keyboard className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight leading-none text-foreground flex items-center gap-1">
              TypeKit<span className="text-primary font-extrabold">Tools</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono mt-0.5">
              Online Utilities & Symbols
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {mainNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.children && item.children.some((c) => pathname.startsWith(c.href)));

            return (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors",
                    isActive
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDropdown === item.title && (
                  <div className="absolute top-full left-0 w-72 pt-1.5 z-50">
                    <div className="rounded-xl border border-border bg-card p-2 shadow-lg divide-y divide-border/30 animate-in fade-in-50 zoom-in-95 duration-100">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="flex flex-col p-2 rounded-lg hover:bg-muted/70 transition-colors text-left"
                        >
                          <span className="text-xs font-semibold text-foreground">
                            {sub.title}
                          </span>
                          {sub.description && (
                            <span className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                              {sub.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <SearchBar variant="compact" className="hidden md:block w-48 lg:w-64" placeholder="Quick search..." />

          <Link href="/tools">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              All Tools
            </Button>
          </Link>

          {/* Mobile menu hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-4 shadow-lg max-h-[80vh] overflow-y-auto">
          {mainNavigation.map((item) => (
            <div key={item.title} className="space-y-1">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold text-sm text-foreground flex items-center justify-between py-1"
              >
                <span>{item.title}</span>
              </Link>
              {item.children && (
                <div className="pl-3 border-l-2 border-border/60 space-y-1 mt-1">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-muted-foreground hover:text-foreground py-1"
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-2 border-t border-border">
            <Link
              href="/guides/alt-codes-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-medium text-primary py-1.5"
            >
              📖 Windows Alt Code Master List
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

