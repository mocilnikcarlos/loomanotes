import { Node, mergeAttributes } from "@tiptap/core";

export const OrderedItem = Node.create({
  name: "orderedItem",

  group: "block",
  content: "inline*",
  inline: false,
  selectable: true,
  defining: true,
  isolating: true,
  draggable: false,

  addAttributes() {
    return {
      indent: { default: 0 },
      listType: { default: "ordered" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="orderedItem"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "orderedItem",
      }),
      0,
    ];
  },
});
