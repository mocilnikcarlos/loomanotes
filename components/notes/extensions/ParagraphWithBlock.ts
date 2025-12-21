import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockView } from "../nodeview/BlockView";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";

export const ParagraphWithBlock = Paragraph.extend({
  draggable: false,
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

export const HeadingWithBlock = Heading.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});
