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

  if (!ctx) return null;

  return (
    <Menu
      open
      coords={ctx.coords}
      onOpenChange={(open) => {
        if (!open) setCtx(null);
      }}
    >
      <SlashMenu
        items={BLOCKS}
        command={(block) => {
          editor
            .chain()
            .focus()
            .deleteRange(ctx.range)
            .insertContent(block.insert())
            .run();

          setCtx(null);
        }}
      />
    </Menu>
  );
}
