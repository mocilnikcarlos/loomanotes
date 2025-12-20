"use client";

import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Grab } from "lucide-react";

export function BlockView() {
  return (
    <NodeViewWrapper
      className="looma-block flex items-start gap-2"
      data-type="block"
    >
      {/* HANDLE */}
      <div data-drag-handle contentEditable={false}>
        <ButtonIcon variant="ghost" icon={<Grab size={14} />} tabIndex={-1} />
      </div>

      {/* EDITABLE CONTENT */}
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
}
