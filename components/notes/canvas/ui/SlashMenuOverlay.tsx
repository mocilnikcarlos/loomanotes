"use client";

import { Menu } from "@/components/ui/Menu";
import { useEffect, useState } from "react";
import { SlashMenu } from "./SlashMenu";
import {
  registerSlashMenu,
  SlashMenuContext,
} from "@/components/notes/canvas/helpers/slashMenuBridge";
import { BLOCKS } from "@/config/blocks.config";

export function SlashMenuOverlay({ editor }: { editor: any }) {
  const [ctx, setCtx] = useState<SlashMenuContext | null>(null);

  useEffect(() => {
    registerSlashMenu(setCtx);
  }, []);

  // 🔴 ESTE EFECTO ES EL QUE FALTABA
  useEffect(() => {
    if (!ctx) return;

    const updatePosition = () => {
      const { left, bottom } = editor.view.coordsAtPos(ctx.range.from);

      setCtx((prev) =>
        prev
          ? {
              ...prev,
              coords: {
                top: bottom + 8,
                left,
              },
            }
          : prev
      );
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [ctx, editor]);

  if (!ctx) return null;

  return (
    <Menu
      open
      coords={ctx.coords}
      className="max-h-[320px] max-w-[320px] overflow-y-auto overflow-x-hidden overscroll-contain"
      onOpenChange={(open) => {
        if (!open) setCtx(null);
      }}
    >
      <SlashMenu
        items={BLOCKS}
        command={(block) => {
          editor.chain().focus().deleteRange(ctx.range).run();

          block.insert(editor);
          setCtx(null);
        }}
      />
    </Menu>
  );
}
