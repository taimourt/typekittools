"use client";

import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  content: string;
  filename?: string;
  mimeType?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function DownloadButton({
  content,
  filename = "typekittools-output.txt",
  mimeType = "text/plain;charset=utf-8",
  label = "Download",
  className,
  disabled = false,
}: DownloadButtonProps) {
  const handleDownload = () => {
    if (!content || disabled) return;
    try {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download file:", e);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={disabled || !content}
      onClick={handleDownload}
      className={`text-xs gap-1.5 h-8 select-none ${className || ""}`}
      title={`Download as ${filename}`}
    >
      <Download className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Button>
  );
}

