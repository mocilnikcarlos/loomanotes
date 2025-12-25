import {
  CaseSensitive,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  MessageSquareQuote,
  Minus,
  Code,
} from "lucide-react";

import type { Editor } from "@tiptap/core";

export const BLOCKS = [
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
  },

  // --------------------
  // Task list (INSERT)
  // --------------------
  {
    id: "taskList",
    type: "taskList",
    title: "Lista de tareas",
    description: "Creá una lista con checkboxes",
    icon: CheckSquare,
    insert: (editor: Editor) => {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "taskList",
          content: [
            {
              type: "taskItem",
              attrs: { checked: false },
              content: [{ type: "paragraph" }],
            },
          ],
        })
        .run();
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
  },
];
