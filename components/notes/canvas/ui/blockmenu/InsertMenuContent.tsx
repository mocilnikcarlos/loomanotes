"use client";

import type { Editor } from "@tiptap/core";
import { BLOCKS } from "@/config/blocks.config";
import { BlockMenuItem } from "./BlockMenuItem";
import { useT } from "@/hooks/utils/useT";
import { addToast } from "@heroui/toast";

type Props = {
  editor: Editor;
  blockPos: number | null;
  onClose: () => void;
};

export function InsertMenuContent({ editor, onClose, blockPos }: Props) {
  const { t } = useT();

  function insertBlockBelow(editor: Editor, blockPos: number, content: any) {
    const { state, view } = editor;

    const parentNode = state.doc.nodeAt(blockPos);
    if (!parentNode) return;

    const insertPos = blockPos + parentNode.nodeSize;

    const node = state.schema.nodeFromJSON(content);

    const tr = state.tr.insert(insertPos, node);
    view.dispatch(tr);

    addToast({
      title: t("canvas.asideMenuPlus.toast"),
    });

    editor.commands.focus(insertPos + 1);
  }

  return (
    <div className="max-h-[320px] w-[320px] overflow-y-auto">
      {BLOCKS.map((block) => (
        <BlockMenuItem
          key={block.id}
          icon={block.icon}
          title={t(block.title)}
          description={block.description ? t(block.description) : undefined}
          onSelect={() => {
            if (blockPos == null) return;
            if (!block.content) return;

            insertBlockBelow(editor, blockPos, block.content);
            onClose();
          }}
        />
      ))}
    </div>
  );
}
