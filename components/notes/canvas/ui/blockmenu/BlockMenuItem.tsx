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
    <MenuItem onClick={onSelect} className="group w-full overflow-hidden">
      <div className="flex w-full items-center gap-4">
        {/* Icono */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-card text-foreground transition-colors group-hover:text-primary">
          {Icon && <Icon className="h-5 w-5" />}
        </div>

        {/* Texto */}
        <div className="flex flex-1 min-w-0 flex-col gap-1 text-left">
          <span className="truncate text-md font-medium">{title}</span>

          {description && (
            <span className="truncate text-sm text-subtitle">
              {description}
            </span>
          )}
        </div>
      </div>
    </MenuItem>
  );
}
