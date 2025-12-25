"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { Menu } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { BLOCKS } from "@/config/blocks.config";
import { useBlockStyleSwitcher } from "@/hooks/notes/useBlockStyleSwitcher";
import { BlockStylePopover } from "./BlockStylePopover";

type Props = {
  editor: Editor;
};

export function BlockStyleSection({ editor }: Props) {
  const { currentBlock } = useBlockStyleSwitcher(editor);

  const blockTitle =
    BLOCKS.find((b) => b.id === currentBlock)?.title ?? "Texto";

  return (
    <Menu
      className="h-[240px] overflow-auto"
      trigger={
        <Tooltip content="Estilo de bloque">
          <Button
            onMouseDown={(e) => e.preventDefault()}
            size="sm"
            variant="ghost"
            className="whitespace-nowrap"
          >
            {blockTitle}
          </Button>
        </Tooltip>
      }
    >
      <BlockStylePopover editor={editor} />
    </Menu>
  );
}
