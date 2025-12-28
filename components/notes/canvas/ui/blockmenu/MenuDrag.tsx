"use client";

import type { Editor } from "@tiptap/react";
import { CopyPlus, Trash } from "lucide-react";
import { addToast } from "@heroui/toast";
import { EditorMenuRow } from "../shared/EditorMenuRow";
import { TextSelection } from "@tiptap/pm/state";

type Props = {
  editor: Editor;
  blockPos: number | null;
  onClose: () => void;
};

export function MenuDrag({ editor, onClose, blockPos }: Props) {
  function duplicateBlockAtPos(editor: Editor, blockPos: number) {
    const { state, view } = editor;
    const node = state.doc.nodeAt(blockPos);
    if (!node) return;

    const insertPos = blockPos + node.nodeSize;

    const json = node.toJSON();
    const newNode = state.schema.nodeFromJSON(json);

    const tr = state.tr.insert(insertPos, newNode);

    tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));

    view.dispatch(tr);

    requestAnimationFrame(() => {
      editor.commands.focus();
    });

    addToast({ title: "Bloque duplicado" });
  }

  function deleteBlockAtPos(editor: Editor, blockPos: number) {
    const { state, view } = editor;
    const node = state.doc.nodeAt(blockPos);
    if (!node) return;

    const from = blockPos;
    const to = blockPos + node.nodeSize;

    const tr = state.tr.delete(from, to);
    const nextPos = Math.min(from, tr.doc.content.size);

    tr.setSelection(TextSelection.near(tr.doc.resolve(nextPos)));
    view.dispatch(tr);

    addToast({ title: "Bloque eliminado" });
  }

  return (
    <div className="flex flex-col gap-1 p-1 w-56">
      <EditorMenuRow
        label="Duplicar bloque"
        icon={CopyPlus}
        onClick={() => {
          if (blockPos == null) return;
          duplicateBlockAtPos(editor, blockPos);
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />

      <EditorMenuRow
        label="Eliminar bloque"
        icon={Trash}
        danger
        onClick={() => {
          if (blockPos == null) return;
          deleteBlockAtPos(editor, blockPos);
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />
    </div>
  );
}
