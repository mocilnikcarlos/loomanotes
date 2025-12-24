"use client";

import type { Editor } from "@tiptap/core";
import { useBlockStyleSwitcher } from "@/hooks/notes/useBlockStyleSwitcher";
import { AsideDivider } from "@/components/dashboard/aside/ui/AsideDivider";
import { BLOCKS } from "@/config/blocks.config";
import type { LucideIcon } from "lucide-react";

type Props = {
  editor: Editor;
  onSelect?: () => void;
};

const BLOCK_STYLE_IDS = [
  "paragraph",
  "heading_1",
  "heading_2",
  "heading_3",
  "bulletList",
  "orderedList",
  "taskList",
  "blockquote",
  "codeBlock",
] as const;

export function BlockStylePopover({ editor, onSelect }: Props) {
  const { currentBlock, setBlock } = useBlockStyleSwitcher(editor);

  function handleSelect(type: Parameters<typeof setBlock>[0]) {
    setBlock(type);
    onSelect?.();
  }

  const items = BLOCKS.filter((b) => BLOCK_STYLE_IDS.includes(b.id as any));

  return (
    <div
      onMouseDown={(e) => e.preventDefault()}
      className="flex flex-col gap-1"
    >
      <span className="px-2 py-1 text-xs text-foreground">Turn into</span>

      {items.map((block) => {
        const needsDivider =
          block.id === "bulletList" || block.id === "blockquote";

        return (
          <div key={block.id}>
            <Item
              label={block.title}
              icon={block.icon}
              active={currentBlock === block.id}
              onClick={() => handleSelect(block.id as any)}
            />

            {needsDivider && <AsideDivider />}
          </div>
        );
      })}
    </div>
  );
}

function Item({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full min-w-0 items-center gap-2 rounded-lg px-3 py-2",
        "text-sm text-foreground cursor-pointer",
        "hover:bg-button-hover transition-colors",
        "overflow-hidden",
        active ? "bg-button font-medium" : "",
      ].join(" ")}
    >
      {Icon && <Icon size={14} />}
      {label}
    </button>
  );
}
