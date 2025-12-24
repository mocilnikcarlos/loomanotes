"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  danger?: boolean;
  onClick: () => void;
};

export function EditorMenuRow({
  label,
  icon: Icon,
  active,
  danger,
  onClick,
}: Props) {
  return (
    <button
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={[
        "flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2",
        "text-sm cursor-pointer transition-colors",
        "overflow-hidden",
        danger
          ? "text-[var(--danger)] hover:bg-[var(--danger-bg)]"
          : "text-foreground hover:bg-button-hover",
        active ? "bg-button font-medium" : "",
      ].join(" ")}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      <span className="truncate">{label}</span>
    </button>
  );
}
