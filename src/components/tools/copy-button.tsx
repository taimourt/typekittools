"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "icon" | "icon-sm";
  className?: string;
  disabled?: boolean;
}

export function CopyButton({
  text,
  label = "Copy",
  variant = "outline",
  size = "sm",
  className,
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isIconOnly = size === "icon" || size === "icon-sm";

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled || !text}
      onClick={handleCopy}
      className={`text-xs gap-1.5 transition-all select-none ${className || ""}`}
      title={copied ? "Copied to clipboard!" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600" />
          {!isIconOnly && <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied!</span>}
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {!isIconOnly && <span>{label}</span>}
        </>
      )}
    </Button>
  );
}

