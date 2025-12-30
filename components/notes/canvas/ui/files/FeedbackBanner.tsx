"use client";

import { ReactNode } from "react";

type FeedbackBannerProps = {
  leading: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function FeedbackBanner({
  leading,
  children,
  className = "",
}: FeedbackBannerProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md border border-danger/35 bg-danger-bg px-6 py-4 text-sm text-foreground ${className}`}
    >
      <span className="text-2xl">{leading}</span>
      <span>{children}</span>
    </div>
  );
}
