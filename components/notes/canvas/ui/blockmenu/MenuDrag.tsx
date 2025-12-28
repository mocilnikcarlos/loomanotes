"use client";

import type { Editor } from "@tiptap/react";
import { CopyPlus, Trash } from "lucide-react";
import { addToast } from "@heroui/toast";
import { EditorMenuRow } from "../shared/EditorMenuRow";
import { TextSelection } from "@tiptap/pm/state";
import { useT } from "@/hooks/utils/useT";
import { NodeSelection } from "@tiptap/pm/state";

type Props = {
  editor: Editor;
  blockPos: number | null;
  onClose: () => void;
};

export function MenuDrag({ editor, onClose, blockPos }: Props) {
  const { t } = useT();

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

    addToast({ title: t("canvas.asideMenuDrag.toastDouble") });
  }

  function deleteSelectedBlock(editor: Editor) {
    const { state, view } = editor;
    const { selection } = state;
    let tr = state.tr;

    // Caso 1: NodeSelection (ideal)
    if (selection instanceof NodeSelection) {
      const from = selection.from;
      const to = selection.to;

      tr = tr.delete(from, to);
    } else {
      // Caso 2: TextSelection / GapCursor
      const $from = selection.$from;

      // Preferimos nodeAfter (HR suele estar ahí)
      let node = $from.nodeAfter;
      let from = $from.pos;
      let to = from + (node?.nodeSize ?? 0);

      // Fallback: nodeBefore
      if (!node) {
        node = $from.nodeBefore;
        if (!node) return;

        to = $from.pos;
        from = to - node.nodeSize;
      }

      tr = tr.delete(from, to);
    }

    const nextPos = Math.min(tr.selection.from, tr.doc.content.size);
    tr.setSelection(TextSelection.near(tr.doc.resolve(nextPos)));

    view.dispatch(tr);

    addToast({ title: t("canvas.asideMenuDrag.toastDelete") });
  }

  return (
    <div className="flex flex-col gap-1 p-1 w-56">
      <EditorMenuRow
        label={t("canvas.asideMenuDrag.labelDouble")}
        icon={CopyPlus}
        onClick={() => {
          if (blockPos == null) return;
          duplicateBlockAtPos(editor, blockPos);
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />

      <EditorMenuRow
        label={t("canvas.asideMenuDrag.labelDelete")}
        icon={Trash}
        danger
        onClick={() => {
          deleteSelectedBlock(editor);
          onClose();
          requestAnimationFrame(() => editor.commands.focus());
        }}
      />
    </div>
  );
}
