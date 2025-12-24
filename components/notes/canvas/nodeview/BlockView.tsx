"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export function BlockView({ node }: any) {
  const textAlign = node.attrs?.textAlign;

  return (
    <NodeViewWrapper
      className="looma-block"
      data-type={node.type.name}
      data-level={node.attrs?.level}
    >
      <div
        className="flex items-center"
        style={textAlign ? { textAlign } : undefined}
      >
        <NodeViewContent className="flex-1" />
      </div>
    </NodeViewWrapper>
  );
}
