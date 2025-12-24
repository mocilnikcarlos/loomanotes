"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";
import { computePosition, offset, shift } from "@floating-ui/dom";

type Position = {
  top: number;
  left: number;
};

export function useTextSelectionToolbar(editor: Editor | null) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const view = editor.view;
      const { selection } = editor.state;

      // 1. No foco
      if (!editor.isFocused) {
        setVisible(false);
        return;
      }

      // 2. Drag activo
      if ((view as any).dragging) {
        setVisible(false);
        return;
      }

      // 3. Solo TextSelection
      if (!(selection instanceof TextSelection)) {
        setVisible(false);
        return;
      }

      const { from, to } = selection;

      // 4. Selección vacía
      if (from === to) {
        setVisible(false);
        return;
      }

      // 5. Sin texto real
      const text = editor.state.doc.textBetween(from, to, " ");
      if (!text.trim()) {
        setVisible(false);
        return;
      }

      // 6. DOM selection válida
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) {
        setVisible(false);
        return;
      }

      const range = domSelection.getRangeAt(0);

      // 👉 MOSTRAMOS PRIMERO
      setVisible(true);

      // 👉 POSICIONAMOS DESPUÉS
      requestAnimationFrame(async () => {
        const toolbarEl = document.querySelector(
          "[data-text-toolbar]"
        ) as HTMLElement | null;

        if (!toolbarEl) return;

        const virtualReference = {
          getBoundingClientRect: () => range.getBoundingClientRect(),
        };

        const { x, y } = await computePosition(
          virtualReference as any,
          toolbarEl,
          {
            placement: "top",
            middleware: [offset(8), shift({ padding: 8 })],
          }
        );

        setPosition({
          top: y + window.scrollY,
          left: x + window.scrollX,
        });
      });
    };

    const onBlur = ({ event }: any) => {
      const relatedTarget = event?.relatedTarget as HTMLElement | null;

      if (relatedTarget?.closest("[data-text-toolbar]")) return;

      setVisible(false);
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    editor.on("blur", onBlur);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
      editor.off("blur", onBlur);
    };
  }, [editor]);

  return { visible, position };
}
