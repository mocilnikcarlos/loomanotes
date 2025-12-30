"use client";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Tooltip } from "@heroui/tooltip";

export type BlockToolbarAction = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type Props = {
  actions: BlockToolbarAction[];
};

export function BlockToolbar({ actions }: Props) {
  return (
    <div className="absolute top-1 right-1 z-5 flex gap-1 p-1 rounded-full bg-card/80 backdrop-blur border border-border shadow-sm backdrop-blur-sm opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 transition">
      {actions.map((action) => (
        <Tooltip content={action.label} key={action.id}>
          <ButtonIcon
            size="sm"
            icon={action.icon}
            onClick={action.onClick}
            disabled={action.disabled}
          />
        </Tooltip>
      ))}
    </div>
  );
}
