"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export function BlockView() {
  return (
    <NodeViewWrapper className="relative" data-type="block">
      <div className="flex items-start gap-2 py-3">
        <div
          data-drag-handle
          draggable="true"
          contentEditable={false}
          className="drag-handle cursor-grab select-none text-gray-400"
        >
          ⋮⋮
        </div>

        <NodeViewContent className="bg-black flex-1" />
      </div>
    </NodeViewWrapper>
  );
}
