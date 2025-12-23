"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

type Position = {
  top: number;
  left: number;
};

export function useTextSelectionToolbar(editor: Editor | null) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { selection } = editor.state;

      if (selection.empty || !editor.isFocused) {
        setVisible(false);
        return;
      }

      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setVisible(false);
        return;
      }

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setPosition({
        top: rect.top + window.scrollY - 50,
        left: rect.left + window.scrollX + rect.width / 2,
      });

      setVisible(true);
    };

    const onBlur = () => setVisible(false);

    editor.on("selectionUpdate", update);
    editor.on("blur", onBlur);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("blur", onBlur);
    };
  }, [editor]);

  return {
    visible,
    position,
  };
}
