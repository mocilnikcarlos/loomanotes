"use client";

import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Si querés desactivar el padding por completo
   * (ej: layouts complejos o grids internos).
   */
  noPadding?: boolean;
}

export function Card({ className, noPadding = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-4xl border border-border bg-card text-foreground",
        // shadow fuerte pero controlado (no glow, no cringe)
        "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
        !noPadding && "p-4",
        className
      )}
      {...props}
    />
  );
}
