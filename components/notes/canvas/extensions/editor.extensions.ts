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
import Blockquote from "@tiptap/extension-blockquote";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { CodeBlockWithWrapper } from "./CodeBlockWithWrapper";

// Commands / Custom
import { SlashCommand } from "./SlashCommand";
import { LinkBoundaryExtension } from "./LinkBoundaryExtension";
import { ClearMarksOnEnterExtension } from "./ClearMarksOnEnterExtension";

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
import { FontSize } from "./FontSizeExtensions";
import { LinkWithTooltip } from "./LinkWithTooltip";
import { BulletItem } from "./extend/BulletItem";
import { BulletItemBehavior } from "./extend/commands/BulletItemBehavior";

/* -------------------------------------------------------------------------- */
/*                                  Lowlight                                  */
/* -------------------------------------------------------------------------- */

const lowlight = createLowlight(all);

/* -------------------------------------------------------------------------- */
/*                              NodeView factory                              */
/* -------------------------------------------------------------------------- */

function withBlockView(node: Node) {
  return node.extend({
    addNodeView() {
      return ReactNodeViewRenderer(BlockView);
    },
  });
}

/* -------------------------------------------------------------------------- */
/*                             Extension factory                              */
/* -------------------------------------------------------------------------- */

export function createEditorExtensions() {
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
    // Core blocks (con BlockView)
    // ------------------------------------------------------------------
    withBlockView(Paragraph),
    withBlockView(Heading),
    withBlockView(Blockquote),

    // ------------------------------------------------------------------
    // Lists (✅ draggable por item, no por contenedor)
    // ------------------------------------------------------------------
    BulletItem,
    BulletItemBehavior,

    withBlockView(TaskList),
    TaskItem.configure({
      nested: true,
    }),

    // ------------------------------------------------------------------
    // Code
    // ------------------------------------------------------------------
    CodeBlockWithWrapper.configure({
      lowlight,
    }),

    // ------------------------------------------------------------------
    // Misc
    // ------------------------------------------------------------------
    HorizontalRule,
    Dropcursor,

    // ------------------------------------------------------------------
    // Commands
    // ------------------------------------------------------------------
    SlashCommand,

    // ------------------------------------------------------------------
    // Placeholder
    // ------------------------------------------------------------------
    Placeholder.configure({
      placeholder: ({ node, editor }) => {
        const { $from } = editor.state.selection;

        if (node.type.name === "paragraph" && $from.depth === 1) {
          return "Escribe / o haz clic en el botón + para agregar contenido";
        }

        return "";
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
