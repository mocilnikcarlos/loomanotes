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
};

export function BlockInsertMenu({ editor, insertPos }: BlockInsertMenuProps) {
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
            const { state } = editor;
            const { $from } = state.selection;

            // Si no hay un lugar válido para insertar, salimos
            if ($from.depth === 0) return;

            const insertPos = $from.after();

            editor.chain().focus().setTextSelection(insertPos).run();

            block.insert(editor);
            setOpen(false);
          }}
        />
      ))}
    </Menu>
  );
}
