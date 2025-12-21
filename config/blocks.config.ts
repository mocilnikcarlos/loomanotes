export const BLOCKS = [
  {
    type: "paragraph",
    label: "Paragraph",
    insert: () => ({
      type: "paragraph",
    }),
  },
  {
    type: "heading",
    label: "Heading",
    insert: () => ({
      type: "heading",
      attrs: { level: 2 },
    }),
  },
  {
    type: "bulletList",
    label: "List",
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
