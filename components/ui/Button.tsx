"use client";

import { cn } from "@/utils/cn";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost" | "brand";
  loading?: boolean;
}

export function Button({
  children,
  icon,
  iconPosition = "left",
  size = "md",
  variant = "primary",
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const hasText = Boolean(children);
  const hasIcon = Boolean(icon);

  const baseStyles =
    "inline-flex shrink-0 w-fit items-center justify-center rounded-full transition-colors font-regular focus:outline-none disabled:opacity-50 cursor-pointer";

  const sizeStyles = {
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-6 text-base",
    lg: "h-12 px-8 text-lg",
  }[size];

  const variantStyles = {
    primary: "bg-button hover:bg-button-hover text-foreground",
    secondary:
      "bg-transparent text-foreground border border-border hover:bg-button-hover",
    ghost: "bg-transparent hover:bg-button-hover text-foreground",
    brand: "bg-primary hover:bg-primary-hover text-foreground-secondary",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        baseStyles,
        sizeStyles,
        variantStyles,
        loading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Icon left */}
      {!loading && hasIcon && iconPosition === "left" && (
        <span className={cn(hasText && "mr-2", "flex items-center")}>
          {icon}
        </span>
      )}

      {/* Content */}
      {hasText && (
        <span className={cn(loading && "opacity-70")}>
          {loading ? "Cargando…" : children}
        </span>
      )}

      {/* Icon right */}
      {!loading && hasIcon && iconPosition === "right" && (
        <span className={cn(hasText && "ml-2", "flex items-center")}>
          {icon}
        </span>
      )}
    </button>
  );
}
