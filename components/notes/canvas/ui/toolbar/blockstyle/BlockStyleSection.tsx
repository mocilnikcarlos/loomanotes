"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { Menu } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { BLOCKS } from "@/config/blocks.config";
import { useBlockStyleSwitcher } from "@/hooks/notes/useBlockStyleSwitcher";
import { BlockStylePopover } from "./BlockStylePopover";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
};

export function BlockStyleSection({ editor }: Props) {
  const { currentBlock } = useBlockStyleSwitcher(editor);
  const { t } = useT();

  const blockTitle =
    BLOCKS.find((b) => b.id === currentBlock)?.title ??
    t("canvas.typeBlock.paragraph.title");

  return (
    <Menu
      className="h-[240px] overflow-auto"
      trigger={
        <Tooltip content={t("canvas.toolbar.typeBlock.tooltip")}>
          <Button
            onMouseDown={(e) => e.preventDefault()}
            size="sm"
            variant="ghost"
            className="whitespace-nowrap"
          >
            {t(blockTitle)}
          </Button>
        </Tooltip>
      }
    >
      <BlockStylePopover editor={editor} />
    </Menu>
  );
}
