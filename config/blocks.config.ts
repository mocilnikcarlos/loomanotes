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
  | "horizontalRule";

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
  description: "Encabezado para la sección",
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
    title: "Texto",
    description: "Empieza a escribir libremente",
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
  createHeadingBlock(1, Heading1, "Título grande"),
  createHeadingBlock(2, Heading2, "Título mediano"),
  createHeadingBlock(3, Heading3, "Título pequeño"),

  // --------------------
  // Lists
  // --------------------
  {
    id: "bulletItem",
    type: "bulletItem",
    title: "Lista con viñetas",
    description: "Ítem de lista (estilo BlockNote)",
    label: "List",
    icon: List,

    // TRANSFORMA el bloque actual
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

    // INSERTA un bloque nuevo
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
    title: "Lista numerada",
    description: "Ítem numerado",
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
    title: "Lista de tareas",
    description: "Ítem de tarea marcable",
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
    title: "Cita",
    description: "Creá un bloque de cita",
    label: "Blockquote",
    icon: MessageSquareQuote,
    insert: (editor) => {
      editor.chain().focus().toggleBlockquote().run();
    },
    content: {
      type: "blockquote",
      content: [{ type: "paragraph" }],
    },
  },
  {
    id: "codeBlock",
    type: "codeBlock",
    title: "Bloque de código",
    description: "Escribí código con formato",
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
    title: "Separador",
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
    },
  },
];
