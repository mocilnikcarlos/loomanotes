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

import type { Editor } from "@tiptap/core";

export type BlockConfig = {
  id: string;
  type: string;
  title: string;
  description?: string;
  label?: string;
  icon: any;

  // SlashMenu (transforma)
  insert: (editor: Editor) => void;

  // PlusMenu (inserta debajo)
  content?: any;

  level?: number;
};

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
    insert: (editor: Editor) => {
      editor.chain().focus().setNode("paragraph").run();
    },
    content: {
      type: "paragraph",
    },
  },

  // --------------------
  // Headings (TRANSFORM)
  // --------------------
  {
    id: "heading_1",
    type: "heading",
    level: 1,
    title: "Titulo grande",
    description: "Encabezado grande para la sección",
    label: "Heading",
    icon: Heading1,
    insert: (editor: Editor) => {
      editor.chain().focus().setNode("heading", { level: 1 }).run();
    },
    content: {
      type: "heading",
      attrs: { level: 1 },
    },
  },
  {
    id: "heading_2",
    type: "heading",
    level: 2,
    title: "Titulo mediano",
    description: "Encabezado mediano para la sección",
    label: "Heading",
    icon: Heading2,
    insert: (editor: Editor) => {
      editor.chain().focus().setNode("heading", { level: 2 }).run();
    },
    content: {
      type: "heading",
      attrs: { level: 2 },
    },
  },
  {
    id: "heading_3",
    type: "heading",
    level: 3,
    title: "Titulo pequeño",
    description: "Encabezado pequeño para la sección",
    label: "Heading",
    icon: Heading3,
    insert: (editor: Editor) => {
      editor.chain().focus().setNode("heading", { level: 3 }).run();
    },
    content: {
      type: "heading",
      attrs: { level: 3 },
    },
  },

  // --------------------
  // Lists
  // --------------------
  {
    id: "bulletList",
    type: "bulletList",
    title: "Lista con viñetas",
    description: "Creá una lista sin numerar",
    label: "List",
    icon: List,
    insert: (editor: Editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
    content: {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [{ type: "paragraph" }],
        },
      ],
    },
  },
  {
    id: "orderedList",
    type: "orderedList",
    title: "Lista numerada",
    description: "Creá una lista ordenada",
    label: "Ordered list",
    icon: ListOrdered,
    insert: (editor: Editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
    content: {
      type: "orderedList",
      content: [
        {
          type: "listItem",
          content: [{ type: "paragraph" }],
        },
      ],
    },
  },
  {
    id: "taskList",
    type: "taskList",
    title: "Lista de tareas",
    description: "Checklist con tareas marcables",
    label: "Task list",
    icon: CheckSquare,
    insert: (editor: Editor) => {
      editor.chain().focus().toggleTaskList().run();
    },
    content: {
      type: "taskList",
      content: [
        {
          type: "taskItem",
          content: [{ type: "paragraph" }],
        },
      ],
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
    insert: (editor: Editor) => {
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
    insert: (editor: Editor) => {
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
    insert: (editor: Editor) => {
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
