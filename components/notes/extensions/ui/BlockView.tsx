"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export function BlockView() {
  return (
    <NodeViewWrapper className="looma-block flex items-center gap-2">
      <NodeViewContent className="flex-1 py-2" />
    </NodeViewWrapper>
  );
}
