"use client";

import type { Editor } from "@tiptap/react";
import { AppliedColorPreview } from "./AppliedColorPreview";
import { ColorGrid } from "./ColorGrid";

const normalizeHighlight = (color: string | null) =>
  color && color.length === 9 ? color.slice(0, 7) : color;

type Props = {
  editor: Editor;
  activeTextColor: string | null;
  activeHighlightColor: string | null;
};

export function ColorPopover({
  editor,
  activeTextColor,
  activeHighlightColor,
}: Props) {
  return (
    <div className="flex flex-col gap-6 p-2">
      <AppliedColorPreview
        textColor={activeTextColor}
        highlightColor={activeHighlightColor}
      />

      <ColorGrid
        editor={editor}
        variant="text"
        activeColor={activeTextColor}
        onSelect={(color) => {
          if (!color) editor.chain().focus().unsetColor().run();
          else editor.chain().focus().setColor(color).run();
        }}
      />

      <ColorGrid
        editor={editor}
        variant="highlight"
        activeColor={normalizeHighlight(activeHighlightColor)}
        onSelect={(color) => {
          if (!color) editor.chain().focus().unsetHighlight().run();
          else
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: `${color}33` })
              .run();
        }}
      />
    </div>
  );
}
