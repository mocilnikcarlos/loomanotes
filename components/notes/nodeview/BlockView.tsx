"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import "@/styles/looma-blocks.css";

export function BlockView({ node }: any) {
  return (
    <NodeViewWrapper
      className="flex items-center looma-block"
      data-type={node.type.name}
      data-level={node.attrs?.level}
    >
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
}
