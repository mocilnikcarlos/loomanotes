// Core
import type { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import { all, createLowlight } from "lowlight";

// NodeView
import { BlockView } from "../nodeview/BlockView";

// Nodes
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import { CodeBlockWithWrapper } from "./extend/CodeBlockWithWrapper";
import { BulletItem } from "./extend/BulletItem";
import { OrderedItem } from "./extend/OrderedItem";
import { TaskItem } from "./extend/TaskItem";
import { Blockquote } from "./extend/Blockquote";
import { ImageBlock } from "./extend/ImageBlock";
import { ImageBlockView } from "../nodeview/ImageBlockView";
import { PasteImageExtension } from "./extend/PasteImageExtension";

// Commands / Custom
import { SlashCommand } from "./extend/plugins/SlashCommand";
import { LinkBoundaryExtension } from "./extend/plugins/LinkBoundaryExtension";
import { ClearMarksOnEnterExtension } from "./extend/plugins/ClearMarksOnEnterExtension";
import { BulletItemBehavior } from "./extend/commands/BulletItemBehavior";
import { TaskItemToggleExtension } from "./extend/plugins/TaskItemToggleExtension";
import { PlainBlockBehavior } from "./extend/commands/PlainBlockBehavior";

// Marks
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FontSize } from "./extend/plugins/FontSizeExtensions";
import { LinkWithTooltip } from "./extend/plugins/LinkWithTooltip";

/* -------------------------------------------------------------------------- */
/*                                  Lowlight                                  */
/* -------------------------------------------------------------------------- */

const lowlight = createLowlight(all);

/* -------------------------------------------------------------------------- */
/*                              NodeView factory                              */
/* -------------------------------------------------------------------------- */

function withBlockView(node: Node) {
  return node.extend({
    draggable: false,

    addNodeView() {
      return ReactNodeViewRenderer(BlockView);
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                             Extension factory                              */
/* -------------------------------------------------------------------------- */

export function createEditorExtensions(placeholders: {
  paragraph: string;
  heading: string;
  bulletItem: string;
  orderedItem: string;
  taskItem: string;
  blockquote: string;
  codeBlock: string;
}) {
  return [
    // ------------------------------------------------------------------
    // StarterKit (desactivado selectivamente)
    // ------------------------------------------------------------------
    StarterKit.configure({
      paragraph: false,
      heading: false,
      blockquote: false,
      codeBlock: false,
      bulletList: false,
      orderedList: false,
      horizontalRule: false,
    }),

    // ------------------------------------------------------------------
    // Custom
    // ------------------------------------------------------------------
    Blockquote,
    ImageBlock.extend({
      addNodeView() {
        return ReactNodeViewRenderer(ImageBlockView);
      },
    }),
    PasteImageExtension,

    // ------------------------------------------------------------------
    // Core blocks (con BlockView)
    // ------------------------------------------------------------------
    withBlockView(Paragraph),
    withBlockView(Heading),
    withBlockView(HorizontalRule),

    // ------------------------------------------------------------------
    // Lists (✅ draggable por item, no por contenedor)
    // ------------------------------------------------------------------
    BulletItem,
    OrderedItem,
    TaskItem,

    // ------------------------------------------------------------------
    // Code
    // ------------------------------------------------------------------
    CodeBlockWithWrapper.configure({
      lowlight,
    }),

    // ------------------------------------------------------------------
    // Misc
    // ------------------------------------------------------------------
    Dropcursor,

    // ------------------------------------------------------------------
    // Commands
    // ------------------------------------------------------------------
    SlashCommand,
    BulletItemBehavior,
    TaskItemToggleExtension,
    PlainBlockBehavior,

    // ------------------------------------------------------------------
    // Placeholder
    // ------------------------------------------------------------------
    Placeholder.configure({
      placeholder: ({ node }) => {
        switch (node.type.name) {
          case "paragraph":
            return placeholders.paragraph;
          case "heading":
            return placeholders.heading;
          case "bulletItem":
            return placeholders.bulletItem;
          case "orderedItem":
            return placeholders.orderedItem;
          case "taskItem":
            return placeholders.taskItem;
          case "blockquote":
            return placeholders.blockquote;
          case "codeBlock":
            return placeholders.codeBlock;
          default:
            return "";
        }
      },
      showOnlyWhenEditable: false,
      includeChildren: true,
    }),

    // ------------------------------------------------------------------
    // Marks (explícitos)
    // ------------------------------------------------------------------
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    TextStyleKit,
    FontFamily,
    FontSize,
    Subscript,
    Superscript,
    Color,
    Highlight.configure({ multicolor: true }),

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

    // ------------------------------------------------------------------
    // Cleaner / UX polish
    // ------------------------------------------------------------------
    LinkBoundaryExtension,
    ClearMarksOnEnterExtension,
  ];
}
