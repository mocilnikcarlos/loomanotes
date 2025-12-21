import {
  CaseSensitive,
  Heading1,
  Heading2,
  Heading3,
  List,
} from "lucide-react";

export const BLOCKS = [
  {
    id: "paragraph",
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
    id: "heading_1",
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
    id: "heading_2",
    type: "heading",
    title: "Titulo mediano",
    description: "Encabezado mediano para la seccion",
    label: "Heading",
    icon: Heading2,
    insert: () => ({
      type: "heading",
      attrs: { level: 2 },
    }),
  },
  {
    id: "heading_3",
    type: "heading",
    title: "Titulo pequeño",
    description: "Encabezado pequeño para la seccion",
    label: "Heading",
    icon: Heading3,
    insert: () => ({
      type: "heading",
      attrs: { level: 3 },
    }),
  },
  {
    id: "bulletList",
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
