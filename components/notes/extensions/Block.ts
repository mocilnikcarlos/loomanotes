import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockView } from "./ui/BlockView";

export const Block = Node.create({
  name: "block",

  group: "block",

  content: "paragraph", // 🔴 CLAVE: NO block+
  draggable: true,
  isolating: true,
  defining: true,

  parseHTML() {
    return [{ tag: "div[data-type='block']" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "block" }, 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});
