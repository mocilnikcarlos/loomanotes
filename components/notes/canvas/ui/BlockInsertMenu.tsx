"use client";

import { Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { Menu } from "@/components/ui/Menu";
import { BLOCKS } from "@/config/blocks.config";
import { BlockMenuItem } from "./BlockMenuItem";
import { useState } from "react";

type BlockInsertMenuProps = {
  editor: Editor;
  insertPos: number | null;
  activeNode: any | null;
  activePos: number | null;
};

export function BlockInsertMenu({
  editor,
  insertPos,
  activeNode,
  activePos,
}: BlockInsertMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <Menu
      position="right"
      open={open}
      onOpenChange={setOpen}
      className="max-h-[320px] max-w-[320px] overflow-y-auto overflow-x-hidden overscroll-contain"
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
            if (!activeNode || activePos == null) return;

            const isEmpty =
              activeNode.isTextblock && activeNode.content.size === 0;

            editor.chain().focus();

            if (isEmpty) {
              // 🔁 TRANSFORMAR bloque actual
              editor.commands.setTextSelection(activePos);
              block.insert(editor);
            } else if (insertPos != null) {
              // ➕ INSERTAR bloque nuevo debajo
              editor.commands.setTextSelection(insertPos);
              block.insert(editor);
            }

            setOpen(false);
          }}
        />
      ))}
    </Menu>
  );
}
