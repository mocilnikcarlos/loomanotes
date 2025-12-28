"use client";

import { useLayoutEffect, useRef, useState, useCallback } from "react";
import type { Editor } from "@tiptap/react";
import { TextSelection } from "prosemirror-state";
import { computePosition, offset, shift, flip } from "@floating-ui/dom";

export function useTextSelectionToolbar(editor: Editor | null) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const isSelectingRef = useRef(false);
  const [isPositioned, setIsPositioned] = useState(false);

  const updatePosition = useCallback(async () => {
    if (!editor || !editor.isFocused || isSelectingRef.current) return;

    const { selection } = editor.state;
    if (!(selection instanceof TextSelection) || selection.empty) {
      setVisible(false);
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection || domSelection.rangeCount === 0) return;

    const range = domSelection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (rect.width === 0) return;

    const toolbarEl = document.querySelector(
      "[data-text-toolbar]"
    ) as HTMLElement;

    if (!toolbarEl) {
      setVisible(true);
      return;
    }

    const { x, y } = await computePosition(
      { getBoundingClientRect: () => rect },
      toolbarEl,
      {
        placement: "top",
        middleware: [offset(12), flip(), shift({ padding: 10 })],
      }
    );

    setPosition({ top: y, left: x });
    setIsPositioned(true);
    setVisible(true);
  }, [editor]);

  useLayoutEffect(() => {
    if (visible && position.top === 0 && position.left === 0) {
      updatePosition();
    }
  }, [visible, position, updatePosition]);

  useLayoutEffect(() => {
    if (!editor) return;

    const onMouseDown = () => {
      isSelectingRef.current = true;
      setVisible(false);
      setPosition({ top: 0, left: 0 });
      setIsPositioned(false);
    };

    const onMouseUp = () => {
      isSelectingRef.current = false;
      setTimeout(updatePosition, 20);
    };

    const dom = editor.view.dom;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    editor.on("selectionUpdate", updatePosition);
    editor.on("focus", updatePosition);
    editor.on("blur", () => setVisible(false));

    return () => {
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      editor.off("selectionUpdate", updatePosition);
      editor.off("focus", updatePosition);
      editor.off("blur", () => setVisible(false));
    };
  }, [editor, updatePosition]);

  return { visible, position, isPositioned };
}
