"use client";

import React, { createContext, useContext } from "react";

/* ------------------ Context ------------------ */

type ColorButtonContextValue = {
  color: string;
};

const ColorButtonContext = createContext<ColorButtonContextValue | null>(null);

function useColorButton() {
  return useContext(ColorButtonContext);
}

/* ------------------ Types ------------------ */

type ColorButtonProps = {
  color: string;
  isActive: boolean;
  size?: "sm" | "md";
  variant: "text" | "highlight";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

type ColorButtonComponent = React.FC<ColorButtonProps> & {
  Text: React.FC;
  Highlight: React.FC;
};

/* ------------------ Root ------------------ */

export const ColorButton = (({
  color,
  isActive,
  size = "md",
  variant,
  onClick,
  children,
  className = "",
}: ColorButtonProps) => {
  const sizeClasses = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const highlightBackground = (hex: string) => `${hex}33`; // ~20% alpha

  const style =
    variant === "text"
      ? {
          borderColor: color,
        }
      : {
          borderColor: color,
          backgroundColor: highlightBackground(color),
        };

  return (
    <ColorButtonContext.Provider value={{ color }}>
      <button
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        style={style}
        className={`
            ${sizeClasses}
            relative
            rounded-full
            cursor-pointer
            flex items-center justify-center
            border
            transition-colors
            ${className}
        `}
      >
        {children}
      </button>
    </ColorButtonContext.Provider>
  );
}) as ColorButtonComponent;

/* ------------------ Subcomponents ------------------ */

ColorButton.Text = function Text() {
  const ctx = useColorButton();
  if (!ctx) return null;

  return (
    <span
      className="text-xs font-bold relative z-10"
      style={{ color: ctx.color }}
    >
      A
    </span>
  );
};

ColorButton.Highlight = function Highlight() {
  return null;
};
