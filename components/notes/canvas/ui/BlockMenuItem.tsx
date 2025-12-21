"use client";

import { MenuItem } from "@/components/ui/Menu";

type BlockMenuItemProps = {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  onSelect: () => void;
};

export function BlockMenuItem({
  icon: Icon,
  title,
  description,
  onSelect,
}: BlockMenuItemProps) {
  return (
    <MenuItem onClick={onSelect}>
      <div className="flex items-start gap-3">
        {/* Icono */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
          {Icon && <Icon className="h-4 w-4" />}
        </div>

        {/* Texto */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium">{title}</span>
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      </div>
    </MenuItem>
  );
}
