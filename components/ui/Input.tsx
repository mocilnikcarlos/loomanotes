"use client";

import { cn } from "@/utils/cn";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "sm" | "md";
  label?: ReactNode; // opcional
  legend?: ReactNode; // ayuda informativa
  helperText?: ReactNode; // error / feedback
  leftIcon?: ReactNode;
  rightIconButton?: {
    icon: ReactNode;
    onClick: () => void;
    ariaLabel?: string;
  };
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      label,
      legend,
      helperText,
      leftIcon,
      rightIconButton,
      error,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex items-center gap-2 rounded-full border bg-input transition-colors",
            "focus-within:border-input-border-focus",
            !error && "border-input-border hover:border-input-border-hover",
            error &&
              "border-input-error focus-within:border-input-border-error",
            inputSize === "md" && "py-3 px-4 text-sm",
            inputSize === "sm" && "py-2 px-3 text-sm",
            className
          )}
        >
          {leftIcon && (
            <span className="text-icon flex items-center">{leftIcon}</span>
          )}

          <input
            ref={ref}
            id={id}
            className={cn(
              "flex-1 bg-transparent outline-none text-input-text",
              "placeholder:text-input-placeholder",
              "appearance-none"
            )}
            {...props}
          />

          {rightIconButton && (
            <button
              type="button"
              onClick={rightIconButton.onClick}
              aria-label={rightIconButton.ariaLabel}
              className="text-icon hover:text-foreground transition-colors cursor-pointer"
            >
              {rightIconButton.icon}
            </button>
          )}
        </div>

        {legend && <span className="text-xs text-subtitle">{legend}</span>}

        {helperText && (
          <span
            className={cn(
              "text-xs",
              error ? "text-input-error" : "text-subtitle"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
