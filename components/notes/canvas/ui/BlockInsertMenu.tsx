"use client";

import { Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { Menu } from "@/components/ui/Menu";
import { BLOCKS } from "@/config/blocks.config";
import { BlockMenuItem } from "./BlockMenuItem";

type BlockInsertMenuProps = {
  editor: Editor;
  insertPos: number | null;
};

export function BlockInsertMenu({ editor, insertPos }: BlockInsertMenuProps) {
  return (
    <Menu
      position="right"
      trigger={
        <ButtonIcon variant="ghost" icon={<Plus size={14} />} tabIndex={-1} />
      }
    >
      {BLOCKS.map((block) => (
        <BlockMenuItem
          key={block.id}
          icon={block.icon}
          title={block.title}
          description={block.description}
          onSelect={() => {
            if (insertPos == null) return;

            editor
              .chain()
              .focus()
              .insertContentAt(insertPos, block.insert())
              .run();
          }}
        />
      ))}
    </Menu>
  );
}
