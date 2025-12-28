import { Node, mergeAttributes } from "@tiptap/core";

export const Blockquote = Node.create({
  name: "blockquote",

  group: "block",
  content: "inline*",
  defining: true,
  isolating: true,

  parseHTML() {
    return [{ tag: "blockquote" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "blockquote",
      mergeAttributes(HTMLAttributes, {
        "data-type": "blockquote",
      }),
      0,
    ];
  },
});
