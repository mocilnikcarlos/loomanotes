import {
  CaseSensitive,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MessageSquareQuote,
  Minus,
  Code,
  CheckSquare,
  Image,
} from "lucide-react";

import type { Editor, JSONContent } from "@tiptap/core";
import type { LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type BlockType =
  | "paragraph"
  | "heading"
  | "bulletItem"
  | "orderedItem"
  | "taskItem"
  | "blockquote"
  | "codeBlock"
  | "horizontalRule"
  | "imageBlock";

export type BlockConfig = {
  id: string;
  type: BlockType;
  title: string;
  description?: string;
  label?: string;
  icon: LucideIcon;

  /** Transforma el bloque actual */
  insert: (editor: Editor) => void;

  /** Inserta contenido nuevo (PlusMenu) */
  content?: JSONContent;

  /** Solo para headings */
  level?: 1 | 2 | 3;
};

/* -------------------------------------------------------------------------- */
/*                               Block factories                              */
/* -------------------------------------------------------------------------- */

const createHeadingBlock = (
  level: 1 | 2 | 3,
  icon: LucideIcon,
  title: string
): BlockConfig => ({
  id: `heading_${level}`,
  type: "heading",
  level,
  title,
  description: "canvas.typeBlock.heading.description",
  label: "Heading",
  icon,
  insert: (editor) => {
    editor.chain().focus().setNode("heading", { level }).run();
  },
  content: {
    type: "heading",
    attrs: { level },
  },
});

/* -------------------------------------------------------------------------- */
/*                                   Blocks                                   */
/* -------------------------------------------------------------------------- */

export const BLOCKS: BlockConfig[] = [
  // --------------------
  // Paragraph
  // --------------------
  {
    id: "paragraph",
    type: "paragraph",
    title: "canvas.typeBlock.paragraph.title",
    description: "canvas.typeBlock.paragraph.description",
    label: "Paragraph",
    icon: CaseSensitive,
    insert: (editor) => {
      editor.chain().focus().setNode("paragraph").run();
    },
    content: {
      type: "paragraph",
    },
  },

  // --------------------
  // Headings
  // --------------------
  createHeadingBlock(1, Heading1, "canvas.typeBlock.heading.1.title"),
  createHeadingBlock(2, Heading2, "canvas.typeBlock.heading.2.title"),
  createHeadingBlock(3, Heading3, "canvas.typeBlock.heading.3.title"),

  // --------------------
  // Lists
  // --------------------
  {
    id: "bulletItem",
    type: "bulletItem",
    title: "canvas.typeBlock.bullet.title",
    description: "canvas.typeBlock.bullet.description",
    label: "List",
    icon: List,
    insert: (editor) => {
      editor
        .chain()
        .focus()
        .setNode("bulletItem", {
          listType: "bullet",
          indent: 0,
        })
        .run();
    },
    content: {
      type: "bulletItem",
      attrs: {
        listType: "bullet",
        indent: 0,
      },
    },
  },
  {
    id: "orderedItem",
    type: "orderedItem",
    title: "canvas.typeBlock.ordered.title",
    description: "canvas.typeBlock.ordered.description",
    label: "Ordered list",
    icon: ListOrdered,
    insert: (editor) => {
      editor
        .chain()
        .focus()
        .setNode("orderedItem", {
          listType: "ordered",
          indent: 0,
        })
        .run();
    },
    content: {
      type: "orderedItem",
      attrs: {
        listType: "ordered",
        indent: 0,
      },
    },
  },
  {
    id: "taskItem",
    type: "taskItem",
    title: "canvas.typeBlock.task.title",
    description: "canvas.typeBlock.task.description",
    label: "Task",
    icon: CheckSquare,
    insert: (editor) => {
      editor
        .chain()
        .focus()
        .setNode("taskItem", {
          indent: 0,
          checked: false,
        })
        .run();
    },
    content: {
      type: "taskItem",
      attrs: {
        indent: 0,
        checked: false,
      },
    },
  },

  // --------------------
  // Other blocks
  // --------------------
  {
    id: "blockquote",
    type: "blockquote",
    title: "canvas.typeBlock.blockquote.title",
    description: "canvas.typeBlock.blockquote.description",
    label: "Blockquote",
    icon: MessageSquareQuote,
    insert: (editor) => {
      editor
        .chain()
        .focus()
        .setNode("blockquote", {
          listType: "blockquote",
        })
        .run();
    },
    content: {
      type: "blockquote",
      content: [{ type: "paragraph" }],
    },
  },
  {
    id: "codeBlock",
    type: "codeBlock",
    title: "canvas.typeBlock.codeblock.title",
    description: "canvas.typeBlock.codeblock.description",
    label: "Code",
    icon: Code,
    insert: (editor) => {
      editor.chain().focus().setCodeBlock({ language: "javascript" }).run();
    },
    content: {
      type: "codeBlock",
      attrs: { language: "javascript" },
    },
  },
  {
    id: "divider",
    type: "horizontalRule",
    title: "canvas.typeBlock.divider.title",
    description: "canvas.typeBlock.divider.description",
    icon: Minus,
    insert: (editor) => {
      editor
        .chain()
        .focus()
        .insertContent([{ type: "horizontalRule" }, { type: "paragraph" }])
        .run();
    },
    content: {
      type: "horizontalRule",
      content: [{ type: "paragraph" }],
    },
  },
  {
    id: "image",
    type: "imageBlock",
    title: "canvas.typeBlock.image.title",
    description: "canvas.typeBlock.image.description",
    label: "Image",
    icon: Image,
    insert: (editor) => {
      // placeholder: se inserta vacío
      editor
        .chain()
        .focus()
        .insertContent({
          type: "imageBlock",
          attrs: {
            path: null,
            src: null,
          },
        })
        .run();
    },
  },
];
