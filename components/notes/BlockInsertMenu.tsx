"use client";

import { Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { Menu, MenuItem } from "@/components/ui/Menu";
import { BLOCKS } from "@/config/blocks.config";

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
        <MenuItem
          key={block.type}
          onClick={() => {
            if (insertPos == null) return;

            editor
              .chain()
              .focus()
              .insertContentAt(insertPos, block.insert())
              .run();
          }}
        >
          {block.label}
        </MenuItem>
      ))}
    </Menu>
  );
}
