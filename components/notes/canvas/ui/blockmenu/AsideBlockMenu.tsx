"use client";

import { useRef, useState } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus, X } from "lucide-react";
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

type AsideUIState = "idle" | "insert" | "actions";

export function AsideBlockMenu({ editor }: Props) {
  const [uiState, setUIState] = useState<AsideUIState>("idle");
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(
    null
  );

  const activeNodeRef = useRef<HTMLElement | null>(null);
  const activeBlockPosRef = useRef<number | null>(null);

  function openMenu(next: AsideUIState, e: React.MouseEvent) {
    e.stopPropagation();

    const blockPos = activeBlockPosRef.current;
    if (blockPos == null) return;

    const { state, view } = editor;
    const node = state.doc.nodeAt(blockPos);
    if (!node) return;

    // foco lógico correcto
    const focusPos = blockPos + 1;
    const $pos = state.doc.resolve(focusPos);
    view.dispatch(state.tr.setSelection(TextSelection.near($pos)));
    view.focus();

    if (next === "actions") {
      view.dispatch(
        state.tr.setSelection(NodeSelection.create(state.doc, blockPos))
      );
    }

    const dom = activeNodeRef.current;
    if (!dom) return;

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
        {/* ESTADO IDLE → botones visibles */}
        {uiState === "idle" && (
          <>
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
          </>
        )}

        {/* ESTADO INSERT → menú insert (NO cierra con click afuera) */}
        {uiState === "insert" && coords && (
          <Menu open coords={coords} closeOnOutsideClick={false}>
            <div className="flex items-center justify-between px-2 pb-1">
              <span className="text-xs text-muted">Insertar bloque</span>
              <ButtonIcon
                size="sm"
                icon={<X size={12} />}
                variant="ghost"
                onClick={closeMenu}
              />
            </div>

            <InsertMenuContent
              editor={editor}
              blockPos={activeBlockPosRef.current}
              onClose={closeMenu}
            />
          </Menu>
        )}

        {/* ESTADO ACTIONS → menú drag (SÍ cierra con click afuera) */}
        {uiState === "actions" && coords && (
          <Menu
            open
            coords={coords}
            onOpenChange={(open) => {
              if (!open) closeMenu();
            }}
          >
            <MenuDrag
              editor={editor}
              blockPos={activeBlockPosRef.current}
              onClose={closeMenu}
            />
          </Menu>
        )}
      </div>
    </DragHandle>
  );
}
