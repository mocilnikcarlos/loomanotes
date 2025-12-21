import { CaseSensitive, Heading1, List } from "lucide-react";

export const BLOCKS = [
  {
    type: "paragraph",
    title: "Texto",
    description: "Empieza a escribir libremente",
    label: "Paragraph",
    icon: CaseSensitive,
    insert: () => ({
      type: "paragraph",
    }),
  },
  {
    type: "heading",
    title: "Titulo grande",
    description: "Encabezado grande para la seccion",
    label: "Heading",
    icon: Heading1,
    insert: () => ({
      type: "heading",
      attrs: { level: 1 },
    }),
  },
  {
    type: "bulletList",
    title: "Lista de puntos",
    description: "Crea una lista con viñetas",
    label: "List",
    icon: List,
    insert: () => ({
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [{ type: "paragraph" }],
        },
      ],
    }),
  },
];
