"use client";

import { useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/core";

export type BlockStyle =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulletList"
  | "orderedList"
  | "taskList"
  | "blockquote"
  | "codeBlock";

export function useBlockStyleSwitcher(editor: Editor) {
  // 🔁 fuerza re-render cuando cambia el estado del editor
  useEditorState({
    editor,
    selector: ({ editor }) => ({
      block: getCurrentBlock(editor),
    }),
  });

  function clearCodeBlock() {
    if (editor.isActive("codeBlock")) {
      editor.chain().focus().setParagraph().run();
    }
  }

  function setBlock(type: BlockStyle) {
    switch (type) {
      case "paragraph":
        clearCodeBlock();
        editor.chain().focus().setParagraph().run();
        break;

      case "heading_1":
        clearCodeBlock();
        editor.chain().focus().setNode("heading", { level: 1 }).run();
        break;

      case "heading_2":
        clearCodeBlock();
        editor.chain().focus().setNode("heading", { level: 2 }).run();
        break;

      case "heading_3":
        clearCodeBlock();
        editor.chain().focus().setNode("heading", { level: 3 }).run();
        break;

      case "bulletList":
        clearCodeBlock();
        editor.chain().focus().toggleBulletList().run();
        break;

      case "orderedList":
        clearCodeBlock();
        editor.chain().focus().toggleOrderedList().run();
        break;

      case "taskList":
        clearCodeBlock();
        editor.chain().focus().toggleTaskList().run();
        break;

      case "blockquote":
        clearCodeBlock();
        editor.chain().focus().toggleBlockquote().run();
        break;

      case "codeBlock":
        editor.chain().focus().setCodeBlock().run();
        break;
    }
  }

  return {
    currentBlock: getCurrentBlock(editor),
    setBlock,
  };
}

// ----------------------------
// Helpers
// ----------------------------

function getCurrentBlock(editor: Editor): BlockStyle {
  if (editor.isActive("heading", { level: 1 })) return "heading_1";
  if (editor.isActive("heading", { level: 2 })) return "heading_2";
  if (editor.isActive("heading", { level: 3 })) return "heading_3";
  if (editor.isActive("bulletList")) return "bulletList";
  if (editor.isActive("orderedList")) return "orderedList";
  if (editor.isActive("taskList")) return "taskList";
  if (editor.isActive("blockquote")) return "blockquote";
  if (editor.isActive("codeBlock")) return "codeBlock";
  return "paragraph";
}
