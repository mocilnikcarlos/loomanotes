"use client";

import type { Editor } from "@tiptap/react";
import { useTextSelectionToolbar } from "@/hooks/notes/useTextSelectionToolbar";
import { ToolbarDivider } from "../shared/ToolbarDivider";

// Sections
import { BlockStyleSection } from "./blockstyle/BlockStyleSection";
import { FontSection } from "./fontstyle/FontSection";
import { AlignSection } from "./textalign/AlignSection";
import { InlineStyleSection } from "./inlinestyle/InlineStyleSection";
import { ColorSection } from "./color/ColorSection";
import { LinkSection } from "./link/LinkSection";
import { MoreSection } from "./moreoptions/MoreSection";

type Props = {
  editor: Editor;
};

export function SelectionToolbar({ editor }: Props) {
  const { visible, position } = useTextSelectionToolbar(editor);

  if (!visible) return null;

  return (
    <div
      data-text-toolbar
      onMouseDown={(e) => e.stopPropagation()}
      style={{ top: position.top, left: position.left }}
      className="
        absolute z-50 flex items-center gap-1 p-1 rounded-full
        bg-[var(--toolbar-bg)]
        border border-[var(--toolbar-border)]
        shadow-[var(--toolbar-shadow)]
      "
    >
      <BlockStyleSection editor={editor} />
      <ToolbarDivider />

      <FontSection editor={editor} />
      <ToolbarDivider />

      <AlignSection editor={editor} />
      <ToolbarDivider />

      <InlineStyleSection editor={editor} />
      <ToolbarDivider />

      <ColorSection editor={editor} />
      <ToolbarDivider />

      <LinkSection editor={editor} />
      <ToolbarDivider />

      <MoreSection editor={editor} />
    </div>
  );
}
