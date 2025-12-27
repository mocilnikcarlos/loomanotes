"use client";

import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus, X } from "lucide-react";
import { offset, shift } from "@floating-ui/dom";
import type { Editor } from "@tiptap/core";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Menu } from "@/components/ui/Menu";
import { MenuDrag } from "./MenuDrag";
import { InsertMenuContent } from "./InsertMenuContent";
import { useAsideBlockMenu } from "./hook/useAsideBlockMenu";
import { normalizeDragHandlePos } from "./helper/normalizeDragPosToListItem";

type Props = {
  editor: Editor;
};

export function AsideBlockMenu({ editor }: Props) {
  const {
    uiState,
    coords,
    animatedTop,
    activeBlockRect,
    activeBlockPosRef,
    openMenu,
    closeMenu,
    onNodeChange,
  } = useAsideBlockMenu(editor);

  return (
    <DragHandle
      editor={editor}
      computePositionConfig={{
        placement: "left",
        middleware: [offset(8), shift()],
      }}
      onNodeChange={({ pos }) => {
        const safePos = normalizeDragHandlePos(editor, pos);

        if (safePos == null) {
          onNodeChange(null);
          return;
        }

        onNodeChange(safePos);
      }}
    >
      <div className="flex items-center gap-1">
        {animatedTop != null && activeBlockRect && uiState === "idle" && (
          <div
            style={{
              position: "fixed",
              left: activeBlockRect.left - 84,
              top: animatedTop,
              transform: "translateY(-50%)",
              display: "flex",
              gap: 4,
              zIndex: 9999,
              pointerEvents: "auto",
              opacity: 0.9,
            }}
          >
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
          </div>
        )}

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

        {uiState === "actions" && coords && (
          <Menu
            open
            coords={coords}
            onOpenChange={(open) => !open && closeMenu()}
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
