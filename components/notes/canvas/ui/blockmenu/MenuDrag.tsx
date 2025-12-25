"use client";

import type { Editor } from "@tiptap/react";
import { CopyPlus, Trash } from "lucide-react";
import { addToast } from "@heroui/toast";
import { EditorMenuRow } from "../shared/EditorMenuRow";
import { TextSelection } from "@tiptap/pm/state";

type Props = {
  editor: Editor;
  onClose: () => void;
};

export function MenuDrag({ editor, onClose }: Props) {
  function duplicateCurrentBlock() {
    const { state, view } = editor;
    const { selection } = state;
    const $from = selection.$from;

    for (let depth = $from.depth; depth > 0; depth--) {
      const node = $from.node(depth);
      if (!node.isBlock) continue;

      const pos = $from.before(depth);
      const insertPos = pos + node.nodeSize;

      const tr = state.tr.insert(insertPos, node.copy(node.content));

      tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));

      view.dispatch(tr);

      addToast({ description: "Bloque duplicado" });
      return;
    }
  }

  function deleteCurrentBlock() {
    const { state, view } = editor;
    const { selection } = state;
    const $from = selection.$from;

    for (let depth = $from.depth; depth > 0; depth--) {
      const node = $from.node(depth);
      if (!node.isBlock) continue;

      const from = $from.before(depth);
      const to = from + node.nodeSize;

      const tr = state.tr.delete(from, to);
      const $next = tr.doc.resolve(Math.min(from, tr.doc.content.size));

      tr.setSelection(TextSelection.near($next));
      view.dispatch(tr);

      addToast({ description: "Bloque eliminado" });
      return;
    }
  }

  return (
    <div className="flex flex-col gap-1 p-1 w-56">
      <EditorMenuRow
        label="Duplicar bloque"
        icon={CopyPlus}
        onClick={() => {
          duplicateCurrentBlock();
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />

      <EditorMenuRow
        label="Eliminar bloque"
        icon={Trash}
        danger
        onClick={() => {
          deleteCurrentBlock();
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />
    </div>
  );
}
