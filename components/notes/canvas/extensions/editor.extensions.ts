import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";

import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlockView } from "../nodeview/BlockView";
import { TaskItemView } from "../nodeview/TaskItemView";

// Blocks base
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import {
  BulletList,
  OrderedList,
  ListItem,
  TaskList,
  TaskItem,
} from "@tiptap/extension-list";

import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

// lowlight (según doc oficial)
import { all, createLowlight } from "lowlight";

import { SlashCommand } from "./SlashCommand";

// =====================================================
// Lowlight setup
// =====================================================

const lowlight = createLowlight(all);

// =====================================================
// Block wrappers (NodeView único)
// =====================================================

const ParagraphWithBlock = Paragraph.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const HeadingWithBlock = Heading.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const BlockquoteWithBlock = Blockquote.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const BulletListWithBlock = BulletList.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const OrderedListWithBlock = OrderedList.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const TaskListWithBlock = TaskList.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
});

const CodeBlockWithBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockView);
  },
}).configure({
  lowlight,
});

// =====================================================
// Factory
// =====================================================

export function createEditorExtensions() {
  return [
    StarterKit.configure({
      paragraph: false,
      heading: false,
      blockquote: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      codeBlock: false,
      horizontalRule: false,
    }),

    // Core
    ParagraphWithBlock,
    HeadingWithBlock,
    BlockquoteWithBlock,

    // Lists
    BulletListWithBlock,
    OrderedListWithBlock,
    ListItem,

    // Tasks
    TaskListWithBlock,
    TaskItem.extend({
      addNodeView() {
        return ReactNodeViewRenderer(TaskItemView);
      },
    }).configure({
      nested: true,
    }),

    // Code
    CodeBlockWithBlock,

    // Misc
    HorizontalRule,
    Dropcursor,

    // Commands
    SlashCommand,
  ];
}
