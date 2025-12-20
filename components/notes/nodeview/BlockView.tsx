"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import "@/styles/globals.css";

export function BlockView() {
  return (
    <NodeViewWrapper className="flex items-center">
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
}
