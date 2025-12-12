"use client";

import { cn } from "@/utils/cn";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icono obligatorio */
  icon: ReactNode;

  /** Tamaño del botón */
  size?: "sm" | "md" | "lg";

  /** Variante visual */
  variant?: "primary" | "secondary" | "ghost";
}

export function ButtonIcon({
  icon,
  size = "md",
  variant = "ghost",
  className,
  ...props
}: ButtonIconProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none disabled:opacity-50 cursor-pointer";

  const sizeStyles = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }[size];

  const variantStyles = {
    primary: "bg-button hover:bg-button-hover text-foreground",
    secondary:
      "bg-transparent border border-border text-foreground hover:bg-button-hover",
    ghost: "bg-transparent hover:bg-button-hover text-foreground",
  }[variant];

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {icon}
    </button>
  );
}
