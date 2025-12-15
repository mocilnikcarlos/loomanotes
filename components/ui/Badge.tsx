"use client";

import { cn } from "@/utils/cn";
import { ReactNode } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

type Status = "success" | "warning" | "danger" | "info";

interface StatusBadgeProps {
  status: Status;
  children: ReactNode;
  showIcon?: boolean;
  className?: string;
}

const STATUS_CONFIG: Record<
  Status,
  {
    icon: ReactNode;
    className: string;
  }
> = {
  success: {
    icon: <CheckCircle size={14} />,
    className: "bg-success text-foreground-secondary",
  },
  warning: {
    icon: <AlertTriangle size={14} />,
    className: "bg-warning text-foreground-secondary",
  },
  danger: {
    icon: <XCircle size={14} />,
    className: "bg-danger text-foreground-secondary",
  },
  info: {
    icon: <Info size={14} />,
    className: "bg-info text-foreground-secondary",
  },
};

export function Badge({
  status,
  children,
  showIcon = false,
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        "leading-none select-none",
        config.className,
        className
      )}
    >
      {showIcon && <span className="flex items-center">{config.icon}</span>}
      <span>{children}</span>
    </span>
  );
}
