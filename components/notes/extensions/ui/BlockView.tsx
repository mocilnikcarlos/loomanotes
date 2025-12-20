"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export function BlockView() {
  return (
    <NodeViewWrapper
      className="block group relative flex gap-2 items-center"
      data-type="block"
    >
      {/* DRAG HANDLE */}
      <div
        data-drag-handle
        contentEditable={false}
        className="
          drag-handle
          opacity-0
          group-hover:opacity-100
          cursor-grab
          select-none
        "
      >
        ⋮⋮
      </div>

      {/* CONTENIDO (paragraph adentro) */}
      <NodeViewContent className="py-3 bg-black" />
    </NodeViewWrapper>
  );
}
