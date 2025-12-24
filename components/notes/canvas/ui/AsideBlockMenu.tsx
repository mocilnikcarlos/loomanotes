"use client";

import { useState, useRef } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { Editor } from "@tiptap/core";
import { offset, shift } from "@floating-ui/dom";
import { Menu } from "@/components/ui/Menu";
import { MenuDrag } from "./popovertoolbar/MenuDrag";
import { InsertMenuContent } from "./InsertMenuContent";

type Props = {
  editor: Editor;
};

type AsideMenuMode = "insert" | "actions" | null;

export function AsideBlockMenu({ editor }: Props) {
  const [insertPos, setInsertPos] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMode, setMenuMode] = useState<AsideMenuMode>(null);
  const activeNodeRef = useRef<HTMLElement | null>(null);
  const [menuCoords, setMenuCoords] = useState<{
    top: number;
    left: number;
  } | null>(null);

  function openMenu(
    mode: AsideMenuMode,
    e?: React.MouseEvent<HTMLButtonElement>
  ) {
    const dom = activeNodeRef.current;
    if (!dom) return;

    const rect = dom.getBoundingClientRect();

    // Default (acciones / drag)
    let top = rect.top + rect.height / 2;
    let left = rect.left - 2;

    // Caso botón "+"
    if (mode === "insert" && e) {
      const btnRect = (e.currentTarget as HTMLElement).getBoundingClientRect();

      top = btnRect.bottom + 6; // abajo del botón
      left = btnRect.right + 6; // a la derecha del +
    }

    setMenuCoords({ top, left });
    setMenuMode(mode);
    setMenuOpen(true);
  }

  return (
    <DragHandle
      editor={editor}
      computePositionConfig={{
        placement: "left",
        strategy: "absolute",
        middleware: [offset(8), shift()],
      }}
      onNodeChange={({ node, pos }) => {
        if (!node || pos == null) {
          activeNodeRef.current = null;
          setInsertPos(null);
          return;
        }

        const dom = editor.view.nodeDOM(pos) as HTMLElement | null;
        activeNodeRef.current = dom;
        setInsertPos(pos + node.nodeSize);
      }}
    >
      <div className="flex items-center gap-1">
        {/* Botón + */}
        <ButtonIcon
          variant="ghost"
          icon={<Plus size={14} />}
          tabIndex={-1}
          onClick={(e) => openMenu("insert", e)}
          className={
            menuMode === "actions"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }
        />

        {/* Botón drag */}
        <ButtonIcon
          variant="ghost"
          className={`cursor-grab ${
            menuMode === "insert"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
          icon={<GripVertical size={14} />}
          tabIndex={-1}
          onClick={() => openMenu("actions")}
        />

        {/* MENÚ ÚNICO */}
        <Menu
          open={menuOpen}
          coords={menuCoords ?? undefined}
          closeOnOutsideClick={true}
          onOpenChange={(open) => {
            if (!open) setMenuMode(null);
            setMenuOpen(open);
          }}
        >
          {menuMode === "insert" && (
            <InsertMenuContent
              editor={editor}
              insertPos={insertPos}
              onClose={() => setMenuOpen(false)}
            />
          )}

          {menuMode === "actions" && (
            <MenuDrag editor={editor} onClose={() => setMenuOpen(false)} />
          )}
        </Menu>
      </div>
    </DragHandle>
  );
}
