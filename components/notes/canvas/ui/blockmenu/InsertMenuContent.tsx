"use client";

import type { Editor } from "@tiptap/core";
import { BLOCKS } from "@/config/blocks.config";
import { BlockMenuItem } from "./BlockMenuItem";

type Props = {
  editor: Editor;
  blockPos: number | null;
  onClose: () => void;
};

export function InsertMenuContent({ editor, onClose, blockPos }: Props) {
  function insertBlockBelow(editor: Editor, blockPos: number, content: any) {
    const { state, view } = editor;

    const parentNode = state.doc.nodeAt(blockPos);
    if (!parentNode) return;

    const insertPos = blockPos + parentNode.nodeSize;

    const node = state.schema.nodeFromJSON(content);

    const tr = state.tr.insert(insertPos, node);
    view.dispatch(tr);

    editor.commands.focus(insertPos + 1);
  }

  return (
    <div className="max-h-[320px] w-[320px] overflow-y-auto">
      {BLOCKS.map((block) => (
        <BlockMenuItem
          key={block.id}
          icon={block.icon}
          title={block.title}
          description={block.description}
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
