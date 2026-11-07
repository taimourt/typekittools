"use client";

import React, { useState, useEffect } from "react";
import { Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { UniversalSearchDialog } from "./universal-search-dialog";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  variant?: "hero" | "compact";
}

export function SearchBar({
  className,
  placeholder = "Search tools, symbols, alt codes, Unicode characters...",
  variant = "hero",
}: SearchBarProps) {
  const [open, setOpen] = useState(false);

  // Global keyboard shortcut: Cmd+K / Ctrl+K opens dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isHero = variant === "hero";

  return (
    <>
      <div className={cn("relative w-full cursor-pointer", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "flex items-center justify-between w-full transition-all duration-150 rounded-xl bg-card border text-left",
            isHero
              ? "h-14 px-4 shadow-sm border-border hover:border-primary/60 hover:shadow-card-hover"
              : "h-9 px-3 border-border/80 text-sm hover:border-primary/60"
          )}
        >
          <div className="flex items-center gap-3 text-muted-foreground/80 truncate">
            <Search className={isHero ? "h-5 w-5 shrink-0" : "h-4 w-4 shrink-0"} />
            <span className={cn("truncate font-normal", isHero ? "text-sm sm:text-base text-muted-foreground" : "text-xs")}>
              {placeholder}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-muted/60 border border-border/50 px-2 py-0.5 rounded shrink-0">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      <UniversalSearchDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
