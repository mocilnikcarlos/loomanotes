"use client";

import { cn } from "@/utils/cn";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Si querés desactivar el padding por completo
   * (ej: layouts complejos o grids internos).
   */
  noPadding?: boolean;
  /**
   * Tamaño del redondeo de la card
   * Valores posibles: "sm", "md", "xl", "2xl", "4xl" (default)
   */
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

export function Card({
  className,
  noPadding = false,
  rounded = "4xl", // Valor por defecto
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative border border-border bg-card text-foreground flex w-full flex-col gap-4",
        `rounded-${rounded}`, // Variable de redondeo
        // shadow fuerte pero controlado (no glow, no cringe)
        "shadow-[0_5px_8px_-12px_rgba(0,0,0,0.35)]",
        !noPadding && "p-4",
        className
      )}
      {...props}
    />
  );
}
