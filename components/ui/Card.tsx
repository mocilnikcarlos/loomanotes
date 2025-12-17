"use client";

import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "4xl": "rounded-4xl",
} as const;

export function Card({
  className,
  noPadding = false,
  rounded = "4xl",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative border border-border bg-card text-foreground flex w-full flex-col gap-4",
        roundedMap[rounded],
        "shadow-[0_5px_8px_-12px_rgba(0,0,0,0.35)]",
        !noPadding && "p-4",
        className
      )}
      {...props}
    />
  );
}
