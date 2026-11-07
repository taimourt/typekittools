"use client";

import React from "react";
import Link from "next/link";
import { Keyboard, Heart, Shield, Globe2 } from "lucide-react";
import { footerNavigation } from "@/config/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground mt-16">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="col-span-2 lg:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
                <Keyboard className="h-4 w-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                TypeKit<span className="text-primary">Tools</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              The high-performance, private utility suite for typing speed tests, special characters, Windows Alt codes, Mac Option shortcuts, Unicode analysis, and developer utilities.
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Globe2 className="h-3.5 w-3.5 text-primary" /> US • UK • CA • AU
              </span>
              <span className="flex items-center gap-1 font-mono text-[11px]">
                <Shield className="h-3.5 w-3.5 text-emerald-600" /> Client-Side Privacy
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {footerNavigation.categories.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {footerNavigation.popularTools.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Reference */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
              Typing Guides
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {footerNavigation.guides.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/60 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} TypeKitTools.com. All rights reserved. Free online utilities.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("typekit_cookie_consent");
                  window.location.reload();
                }
              }}
              className="hover:text-foreground transition-colors underline decoration-dotted underline-offset-2"
            >
              Cookie Preferences
            </button>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

