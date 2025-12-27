import { Node, mergeAttributes } from "@tiptap/core";

export const BulletItem = Node.create({
  name: "bulletItem",

  group: "block",
  content: "inline*",
  inline: false,
  selectable: true,
  defining: true,

  // 👇 clave: lo trata como textblock
  marks: "_",
  isolating: false,

  addAttributes() {
    return {
      indent: { default: 0 },
      listType: { default: "bullet" }, // bullet | ordered | task
      checked: { default: false }, // si querés task
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="bulletItem"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "bulletItem" }),
      0,
    ];
  },
});
