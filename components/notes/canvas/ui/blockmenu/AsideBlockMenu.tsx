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

  function openMenu(nextMode: AsideMenuMode, e: React.MouseEvent) {
    e.stopPropagation();

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
          return;
        }

        const $pos = editor.state.doc.resolve(pos);

        let depth = $pos.depth;
        while (depth > 0 && !$pos.node(depth).isBlock) {
          depth--;
        }

        const blockPos = depth === 0 ? 0 : $pos.before(depth);

        activeNodeRef.current = editor.view.nodeDOM(
          blockPos
        ) as HTMLElement | null;
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
