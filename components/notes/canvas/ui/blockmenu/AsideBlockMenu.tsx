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

    console.log("➕ openMenu");
    console.log("mode:", nextMode);
    console.log("activeBlockPosRef:", activeBlockPosRef.current);
    console.log("activeNodeRef:", activeNodeRef.current);

    // 1️⃣ Posición del bloque dueño del botón +
    const blockPos = activeBlockPosRef.current;
    if (blockPos == null) {
      console.warn("⛔ No active block pos");
      return;
    }

    const { state, view } = editor;
    const node = state.doc.nodeAt(blockPos);

    console.log("📦 node at pos:", node?.type.name, node);

    if (!node) return;

    // 2️⃣ FORZAMOS EL FOCO DENTRO DEL BLOQUE (FORMA CORRECTA)
    const focusPos = blockPos + 1;
    const $pos = state.doc.resolve(focusPos);

    const trFocus = state.tr.setSelection(TextSelection.near($pos));

    view.dispatch(trFocus);
    view.focus();

    console.log("🎯 Focus forced to block at pos:", blockPos);

    // 3️⃣ NodeSelection SOLO para acciones
    if (nextMode === "actions") {
      const tr = state.tr.setSelection(
        NodeSelection.create(state.doc, blockPos)
      );
      view.dispatch(tr);
      view.focus();
    }

    // 4️⃣ Posicionamos el menú
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
        console.log("🔁 onNodeChange");
        console.log("node:", node?.type.name);
        console.log("pos:", pos);

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
            <InsertMenuContent editor={editor} onClose={closeMenu} />
          )}

          {mode === "actions" && (
            <MenuDrag editor={editor} onClose={closeMenu} />
          )}
        </Menu>
      </div>
    </DragHandle>
  );
}
