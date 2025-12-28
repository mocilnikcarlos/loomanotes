"use client";

import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type BlockStyle =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulletItem"
  | "orderedItem"
  | "taskItem"
  | "blockquote"
  | "codeBlock";

/* -------------------------------------------------------------------------- */
/*                              Block actions                                 */
/* -------------------------------------------------------------------------- */

type BlockAction = (editor: Editor) => void;

const BLOCK_ACTIONS: Record<BlockStyle, BlockAction> = {
  paragraph: (editor) => editor.chain().focus().setParagraph().run(),

  heading_1: (editor) =>
    editor.chain().focus().setNode("heading", { level: 1 }).run(),

  heading_2: (editor) =>
    editor.chain().focus().setNode("heading", { level: 2 }).run(),

  heading_3: (editor) =>
    editor.chain().focus().setNode("heading", { level: 3 }).run(),

  bulletItem: (editor) =>
    editor.chain().focus().setNode("bulletItem", { indent: 0 }).run(),

  orderedItem: (editor) =>
    editor.chain().focus().setNode("orderedItem", { indent: 0 }).run(),

  taskItem: (editor) =>
    editor
      .chain()
      .focus()
      .setNode("taskItem", { indent: 0, checked: false })
      .run(),

  blockquote: (editor) => editor.chain().focus().toggleBlockquote().run(),

  codeBlock: (editor) => editor.chain().focus().setCodeBlock().run(),
};

/* -------------------------------------------------------------------------- */
/*                                   Hook                                     */
/* -------------------------------------------------------------------------- */

export function useBlockStyleSwitcher(editor: Editor) {
  // 🔁 fuerza re-render cuando cambia el bloque activo
  useEditorState({
    editor,
    selector: ({ editor }) => ({
      block: getCurrentBlock(editor),
    }),
  });

  function exitCodeBlockIfNeeded(next: BlockStyle) {
    if (next !== "codeBlock" && editor.isActive("codeBlock")) {
      editor.chain().focus().setParagraph().run();
    }
  }

  function setBlock(type: BlockStyle) {
    exitCodeBlockIfNeeded(type);
    BLOCK_ACTIONS[type](editor);
  }

  return {
    currentBlock: getCurrentBlock(editor),
    setBlock,
  };
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getCurrentBlock(editor: Editor): BlockStyle {
  if (editor.isActive("heading", { level: 1 })) return "heading_1";
  if (editor.isActive("heading", { level: 2 })) return "heading_2";
  if (editor.isActive("heading", { level: 3 })) return "heading_3";
  if (editor.isActive("bulletItem")) return "bulletItem";
  if (editor.isActive("orderedItem")) return "orderedItem";
  if (editor.isActive("taskItem")) return "taskItem";
  if (editor.isActive("blockquote")) return "blockquote";
  if (editor.isActive("codeBlock")) return "codeBlock";

  return "paragraph";
}
