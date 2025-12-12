"use client";

import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Espaciado vertical entre hijos */
  gap?: "sm" | "md" | "lg";

  /** Padding interno del section */
  padding?: "none" | "sm" | "md" | "lg";
}

export function Section({
  gap = "md",
  padding = "none",
  className,
  ...props
}: SectionProps) {
  const gapStyles = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  }[gap];

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }[padding];

  return (
    <section
      className={cn(
        "flex w-full flex-col",
        gapStyles,
        paddingStyles,
        className
      )}
      {...props}
    />
  );
}
