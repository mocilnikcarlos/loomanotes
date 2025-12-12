"use client";

import { cn } from "@/utils/cn";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  children,
  icon,
  iconPosition = "left",
  size = "md",
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const hasText = Boolean(children);
  const hasIcon = Boolean(icon);

  const baseStyles =
    "inline-flex items-center justify-center bg-card rounded-md transition-colors font-medium focus:outline-none disabled:opacity-50 cursor-pointer";

  const sizeStyles = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  }[size];

  const variantStyles = {
    primary: "bg-button hover:bg-button-hover text-foreground",
    secondary: "text-foreground border border-border hover:bg-button/40",
    ghost: "bg-transparent hover:bg-card-hover text-foreground",
  }[variant];

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {hasIcon && iconPosition === "left" && (
        <span
          className={cn(
            hasText && "mr-2",
            "flex items-center justify-center text-foreground"
          )}
        >
          {icon}
        </span>
      )}

      {hasText && <span>{children}</span>}

      {hasIcon && iconPosition === "right" && (
        <span
          className={cn(
            hasText && "ml-2",
            "flex items-center justify-center text-foreground"
          )}
        >
          {icon}
        </span>
      )}
    </button>
  );
}
