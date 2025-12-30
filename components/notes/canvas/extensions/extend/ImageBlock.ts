import { Node, mergeAttributes } from "@tiptap/core";

export const ImageBlock = Node.create({
  name: "imageBlock",

  group: "block",
  atom: true,
  selectable: true,
  draggable: false,
  isolating: true,

  addAttributes() {
    return {
      path: { default: null },
      src: { default: null },
      alt: { default: null },
      uploading: { default: false },
      missing: { default: false },
      width: { default: "auto" },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="imageBlock"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "imageBlock",
      }),
    ];
  },
});
