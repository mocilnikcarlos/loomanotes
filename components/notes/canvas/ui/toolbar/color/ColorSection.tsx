"use client";

import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Menu } from "@/components/ui/Menu";
import { ColorButton } from "./ColorButton";
import { ColorPopover } from "./ColorPopover";

type Props = {
  editor: Editor;
};

export function ColorSection({ editor }: Props) {
  const [activeTextColor, setActiveTextColor] = useState<string | null>(null);
  const [activeHighlightColor, setActiveHighlightColor] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { selection } = editor.state;

      if (selection.empty) {
        setActiveTextColor(null);
        setActiveHighlightColor(null);
        return;
      }

      const rawTextColor = editor.getAttributes("textStyle")?.color;
      const textColor =
        rawTextColor &&
        rawTextColor !== "inherit" &&
        rawTextColor !== "currentColor"
          ? rawTextColor
          : null;

      const highlightColor = editor.getAttributes("highlight")?.color ?? null;

      setActiveTextColor(textColor);
      setActiveHighlightColor(highlightColor);
    };

    update();

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return (
    <Menu
      position="bottom-end"
      trigger={
        <ColorButton
          variant="text"
          color={activeTextColor ?? "currentColor"}
          isActive={!!activeTextColor}
          onClick={() => {}}
        >
          <ColorButton.Text />
        </ColorButton>
      }
    >
      <ColorPopover
        editor={editor}
        activeTextColor={activeTextColor}
        activeHighlightColor={activeHighlightColor}
      />
    </Menu>
  );
}
