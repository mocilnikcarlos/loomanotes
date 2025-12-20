import Paragraph from "@tiptap/extension-paragraph";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockView } from "./ui/BlockView";

export const ParagraphWithBlock = Paragraph.extend({
  draggable: false,
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});
