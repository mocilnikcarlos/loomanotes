"use client";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import { Grab } from "lucide-react";

export function BlockView() {
  return (
    <NodeViewWrapper
      className="looma-block flex items-start gap-2"
      data-type="block"
    >
      {/* HANDLE (no editable) */}
      <div data-drag-handle contentEditable={false}>
        <ButtonIcon variant="ghost" icon={<Grab size={14} />} />
      </div>

      {/* CONTENIDO */}
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
}
