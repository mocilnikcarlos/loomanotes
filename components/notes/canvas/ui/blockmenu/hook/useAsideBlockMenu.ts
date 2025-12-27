// useAsideBlockMenu.ts
"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/core";
import { NodeSelection, TextSelection } from "prosemirror-state";
import { findDraggableBlock } from "../helper/findBlockElement";

export type AsideUIState = "idle" | "insert" | "actions";

type BlockRect = {
  top: number;
  left: number;
  height: number;
};

function findBlockElement(el: Element | null): HTMLElement | null {
  if (!el) return null;

  let node: HTMLElement | null = el as HTMLElement;
  const foundLists: HTMLElement[] = [];

  while (node && node !== document.body) {
    if (
      node.classList?.contains("looma-block") &&
      node.dataset.type === "bulletList"
    ) {
      foundLists.push(node);
    }
    node = node.parentElement;
  }

  if (foundLists.length > 0) {
    return foundLists[foundLists.length - 1];
  }

  return el.closest(
    '.looma-block[data-type="paragraph"], .looma-block[data-type^="heading"]'
  ) as HTMLElement | null;
}

export function useAsideBlockMenu(editor: Editor) {
  const [uiState, setUIState] = useState<AsideUIState>("idle");
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const [activeBlockRect, setActiveBlockRect] = useState<BlockRect | null>(
    null
  );
  const [animatedTop, setAnimatedTop] = useState<number | null>(null);

  const activeNodeRef = useRef<HTMLElement | null>(null);
  const activeBlockPosRef = useRef<number | null>(null);
  const lastBlockRef = useRef<HTMLElement | null>(null);

  function openMenu(next: AsideUIState, e: React.MouseEvent) {
    e.stopPropagation();

    const blockPos = activeBlockPosRef.current;
    const dom = activeNodeRef.current;
    if (blockPos == null || !dom) return;

    const { state, view } = editor;
    const focusPos = blockPos + 1;

    view.dispatch(
      state.tr.setSelection(TextSelection.near(state.doc.resolve(focusPos)))
    );
    view.focus();

    if (next === "actions") {
      view.dispatch(
        state.tr.setSelection(NodeSelection.create(state.doc, blockPos))
      );
    }

    const rect = dom.getBoundingClientRect();

    setCoords({
      top: rect.top + rect.height / 2,
      left: rect.left - 8,
    });

    setUIState(next);
  }

  function closeMenu() {
    setUIState("idle");
  }

  /* Hover tracking */
  useEffect(() => {
    const root = editor.view.dom;

    function onMouseMove(e: MouseEvent) {
      const block = findDraggableBlock(e.target as Element | null);

      if (!block || block === lastBlockRef.current) return;

      lastBlockRef.current = block;
      const rect = block.getBoundingClientRect();

      setActiveBlockRect({
        top: rect.top + window.scrollY,
        left: rect.left,
        height: rect.height,
      });
    }

    root.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => root.removeEventListener("mousemove", onMouseMove);
  }, [editor]);

  /* Init animation */
  useEffect(() => {
    if (!activeBlockRect) return;

    const target = activeBlockRect.top + activeBlockRect.height / 2;

    setAnimatedTop((prev) => {
      if (prev == null) return target;
      return prev;
    });
  }, [activeBlockRect]);

  /* Smooth follow */
  useEffect(() => {
    if (!activeBlockRect) return;

    let raf: number;
    const target = activeBlockRect.top + activeBlockRect.height / 2;

    function step() {
      setAnimatedTop((current) => {
        if (current == null) return target;

        const delta = target - current;
        if (Math.abs(delta) < 0.5) return target;

        return current + delta * 0.18;
      });

      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [activeBlockRect]);

  function onNodeChange(pos: number | null) {
    if (pos == null) {
      activeNodeRef.current = null;
      activeBlockPosRef.current = null;
      return;
    }

    activeBlockPosRef.current = pos;
    activeNodeRef.current = editor.view.nodeDOM(pos) as HTMLElement | null;
  }

  return {
    uiState,
    coords,
    animatedTop,
    activeBlockRect,
    activeBlockPosRef,
    openMenu,
    closeMenu,
    onNodeChange,
  };
}
