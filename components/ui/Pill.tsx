"use client";

import { cn } from "@/utils/cn";
import { type HTMLAttributes, type ReactNode } from "react";

interface PillProps extends HTMLAttributes<HTMLDivElement> {
  /** Elemento a la izquierda (icono, dot, timer, etc.) */
  leading?: ReactNode;

  /** Tamaño de la píldora */
  size?: "sm" | "md";
}

export function Pill({
  leading,
  size = "md",
  className,
  children,
  ...props
}: PillProps) {
  const sizeStyles = {
    sm: "h-7 px-3 text-xs gap-2",
    md: "h-9 px-4 text-sm gap-2.5",
  }[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full",
        "bg-pill text-foreground",
        "border border-white/10",
        "shadow-[0_0_20px_rgba(47,50,49,0.15)]",
        "select-none",
        sizeStyles,
        className
      )}
      {...props}
    >
      {leading && (
        <span className="flex items-center justify-center">{leading}</span>
      )}

      <span className="whitespace-nowrap">{children}</span>
    </div>
  );
}
