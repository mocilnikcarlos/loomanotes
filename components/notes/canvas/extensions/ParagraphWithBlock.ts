import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockView } from "../nodeview/BlockView";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import { BulletList } from "@tiptap/extension-list";
import Blockquote from "@tiptap/extension-blockquote";

export const ParagraphWithBlock = Paragraph.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

export const HeadingWithBlock = Heading.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

export const BulletListWithBlock = BulletList.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

export const BlockquoteWithBlock = Blockquote.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});
