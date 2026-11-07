"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  onReset: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function ResetButton({
  onReset,
  label = "Reset",
  className,
  disabled = false,
}: ResetButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={disabled}
      onClick={onReset}
      className={`text-xs gap-1.5 text-muted-foreground hover:text-foreground h-8 select-none ${className || ""}`}
      title="Reset all inputs and outputs"
    >
      <RotateCcw className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Button>
  );
}

