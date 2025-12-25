import type { Editor } from "@tiptap/core";

export function insertBlockBelow(
  editor: Editor,
  blockPos: number,
  content: any
) {
  const { state, view } = editor;
  const node = state.doc.nodeAt(blockPos);
  if (!node) return;

  const insertPos = blockPos + node.nodeSize;

  const tr = state.tr.insert(insertPos, content);
  view.dispatch(tr);
  editor.commands.focus(insertPos + 1);
}
