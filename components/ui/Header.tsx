"use client";

import { cn } from "@/utils/cn";
import { ReactNode } from "react";

type HeaderSize = "h1" | "h2" | "h3" | "h4" | "h5";

interface HeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  size?: HeaderSize;
  className?: string;
}

export function Header({
  title,
  subtitle,
  size = "h2",
  className,
}: HeaderProps) {
  const TitleTag = size;

  const titleStyles = {
    h1: "text-3xl font-light",
    h2: "text-2xl font-light",
    h3: "text-xl font-regular",
    h4: "text-md font-regular",
    h5: "text-sm font-regular",
  }[size];

  const subtitleStyles = {
    h1: "text-base font-light",
    h2: "text-sm font-light",
    h3: "text-sm font-light",
    h4: "text-sm font-regular",
    h5: "text-sm font-regular",
  }[size];

  return (
    <header className={cn("flex flex-col gap-1", className)}>
      <TitleTag className={cn("text-title", titleStyles)}>{title}</TitleTag>

      {subtitle && (
        <p className={cn("text-subtitle", subtitleStyles)}>{subtitle}</p>
      )}
    </header>
  );
}
