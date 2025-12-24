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
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

// lowlight (según doc oficial)
import { all, createLowlight } from "lowlight";
import { SlashCommand } from "./SlashCommand";
import { LinkBoundaryExtension } from "./LinkBoundaryExtension";
import { ClearMarksOnEnterExtension } from "./ClearMarksOnEnterExtension";

// Mark
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { LinkWithTooltip } from "./LinkWithTooltip";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize } from "./FontSizeExtensions";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";

// =====================================================
// Lowlight setup
// =====================================================

const lowlight = createLowlight(all);

// =====================================================
// Block wrappers (NodeView único)
// =====================================================

// const ParagraphWithBlock = Paragraph (mas adelante agregar este bloque y cambiar los css para no pasarle blockview)

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

const CodeBlock = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "hljs",
      },
    };
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
    CodeBlock,

    // Misc
    HorizontalRule,
    Dropcursor,

    // Commands
    SlashCommand,

    // Placeholder
    Placeholder.configure({
      placeholder: ({ node, editor }) => {
        const { $from } = editor.state.selection;

        // Solo paragraph raíz
        if (node.type.name === "paragraph" && $from.depth === 1) {
          return "Escribe / o haz clic en el botón + para agregar contenido";
        }

        return "";
      },
      showOnlyWhenEditable: false,
      includeChildren: true,
    }),

    // Marks (EXPLÍCITOS)
    Bold,
    Italic,
    Strike,
    Code,
    TextStyleKit,
    FontFamily,
    FontSize,
    Subscript,
    Superscript,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
    LinkWithTooltip.configure({
      openOnClick: true,
      autolink: true,
      linkOnPaste: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      HTMLAttributes: {
        rel: "noopener noreferrer",
        target: "_blank",
      },
    }),
    TextAlign.configure({
      types: ["paragraph", "heading", "blockquote"],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: "left",
    }),

    // Cleaner
    LinkBoundaryExtension,
    ClearMarksOnEnterExtension,
  ];
}
