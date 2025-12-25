"use client";

import { useState, useRef } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { offset, shift } from "@floating-ui/dom";
import { Menu } from "@/components/ui/Menu";
import { MenuDrag } from "./MenuDrag";
import { InsertMenuContent } from "./InsertMenuContent";
import { NodeSelection, TextSelection } from "prosemirror-state";

type Props = {
  editor: Editor;
};

type AsideMenuMode = "insert" | "actions" | null;

export function AsideBlockMenu({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AsideMenuMode>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );
  const activeNodeRef = useRef<HTMLElement | null>(null);
  const activeBlockPosRef = useRef<number | null>(null);

  function openMenu(nextMode: AsideMenuMode, e: React.MouseEvent) {
    e.stopPropagation();

    const blockPos = activeBlockPosRef.current;
    if (blockPos == null) return;

    const { state, view } = editor;
    const node = state.doc.nodeAt(blockPos);

    if (!node) return;

    const focusPos = blockPos + 1;
    const $pos = state.doc.resolve(focusPos);

    const trFocus = state.tr.setSelection(TextSelection.near($pos));

    view.dispatch(trFocus);
    view.focus();

    if (nextMode === "actions") {
      const tr = state.tr.setSelection(
        NodeSelection.create(state.doc, blockPos)
      );
      view.dispatch(tr);
      view.focus();
    }

    const dom = activeNodeRef.current;
    if (!dom) return;

    const rect = dom.getBoundingClientRect();

    let top = rect.top + rect.height / 2;
    let left = rect.left - 8;

    if (nextMode === "insert") {
      const btn = e.currentTarget.getBoundingClientRect();
      top = btn.bottom + 6;
      left = btn.right + 6;
    }

    setCoords({ top, left });
    setMode(nextMode);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
    setMode(null);
  }

  return (
    <DragHandle
      editor={editor}
      computePositionConfig={{
        placement: "left",
        middleware: [offset(8), shift()],
      }}
      onNodeChange={({ node, pos }) => {
        if (!node || pos == null) {
          activeNodeRef.current = null;
          activeBlockPosRef.current = null;
          return;
        }

        activeBlockPosRef.current = pos;
        activeNodeRef.current = editor.view.nodeDOM(pos) as HTMLElement | null;
      }}
    >
      <div className="flex items-center gap-1">
        <ButtonIcon
          icon={<Plus size={14} />}
          variant="ghost"
          tabIndex={-1}
          onClick={(e) => openMenu("insert", e)}
        />

        <ButtonIcon
          icon={<GripVertical size={14} />}
          variant="ghost"
          tabIndex={-1}
          onClick={(e) => openMenu("actions", e)}
        />

        <Menu
          open={open}
          coords={coords ?? undefined}
          onOpenChange={(v) => {
            if (!v) closeMenu();
          }}
        >
          {mode === "insert" && (
            <InsertMenuContent
              editor={editor}
              blockPos={activeBlockPosRef.current}
              onClose={closeMenu}
            />
          )}

          {mode === "actions" && (
            <MenuDrag
              editor={editor}
              blockPos={activeBlockPosRef.current}
              onClose={closeMenu}
            />
          )}
        </Menu>
      </div>
    </DragHandle>
  );
}
