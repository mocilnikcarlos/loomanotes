"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";

export function TaskItemView({ node, updateAttributes }: NodeViewProps) {
  const checked = !!node.attrs.checked;

  return (
    <NodeViewWrapper
      className="looma-block"
      data-type="taskItem"
      data-checked={checked}
    >
      {/* Checkbox */}
      <div
        className="looma-task-checkbox"
        role="checkbox"
        aria-checked={checked}
        tabIndex={-1}
        onClick={() => {
          updateAttributes({
            checked: !checked,
          });
        }}
      />

      {/* Texto */}
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
}
