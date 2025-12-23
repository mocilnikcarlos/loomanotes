"use client";

import { useState, useRef } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { BlockInsertMenu } from "./BlockInsertMenu";
import { offset, shift } from "@floating-ui/dom";

type Props = {
  editor: Editor;
};

export function AsideBlockMenu({ editor }: Props) {
  const [insertPos, setInsertPos] = useState<number | null>(null);
  const activeNodeRef = useRef<HTMLElement | null>(null);

  return (
    <DragHandle
      editor={editor}
      computePositionConfig={{
        placement: "left",
        strategy: "absolute",
        middleware: [offset(8), shift()],
      }}
      onNodeChange={({ node, pos }) => {
        if (!node || pos == null) {
          activeNodeRef.current = null;
          setInsertPos(null);
          return;
        }

        const dom = editor.view.nodeDOM(pos) as HTMLElement | null;
        activeNodeRef.current = dom;

        // siempre insertar debajo
        setInsertPos(pos + node.nodeSize);
      }}
      getReferencedVirtualElement={() => {
        const dom = activeNodeRef.current;
        if (!dom) return null;

        const rect = dom.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;

        return {
          getBoundingClientRect: () => ({
            x: rect.left,
            y: centerY,
            width: 0,
            height: 0,
            top: centerY,
            bottom: centerY,
            left: rect.left,
            right: rect.left,
          }),
        };
      }}
    >
      <div className="flex items-center gap-1">
        <BlockInsertMenu editor={editor} insertPos={insertPos} />

        <ButtonIcon
          variant="ghost"
          className="cursor-grab"
          icon={<GripVertical size={14} />}
          tabIndex={-1}
        />
      </div>
    </DragHandle>
  );
}
