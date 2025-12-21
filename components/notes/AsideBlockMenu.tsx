"use client";

import { useState } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";

type Props = {
  editor: Editor;
};

export function AsideBlockMenu({ editor }: Props) {
  const [currentPos, setCurrentPos] = useState<number | null>(null);

  return (
    <DragHandle
      editor={editor}
      computePositionConfig={{
        placement: "left-start",
        strategy: "absolute",
      }}
      onNodeChange={({ pos }) => {
        setCurrentPos(pos ?? null);
      }}
    >
      <div className="flex items-center gap-1">
        {/* PLUS — sin acción por ahora */}
        <ButtonIcon
          variant="ghost"
          icon={<Plus size={14} />}
          tabIndex={-1}
          onClick={() => {
            // futuro: abrir menu contextual
            // currentPos es correcto y útil
          }}
        />

        {/* DRAG */}
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
