"use client";

import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { Menu } from "@/components/ui/Menu";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Link as LinkIcon } from "lucide-react";
import { LinkMenu } from "./LinkMenu";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
};

export function LinkSection({ editor }: Props) {
  const [open, setOpen] = useState(false);
  const isLink = editor.isActive("link");

  const { t } = useT();

  return (
    <Menu
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          requestAnimationFrame(() => {
            editor.commands.focus();
          });
        }
      }}
      position="bottom-end"
      trigger={
        <Tooltip content={t("canvas.toolbar.link.tooltip")}>
          <ButtonIcon
            onMouseDown={(e) => e.preventDefault()}
            aria-pressed={isLink}
            data-active={isLink}
            size="sm"
            variant="ghost"
            icon={<LinkIcon size={14} />}
          />
        </Tooltip>
      }
    >
      <LinkMenu editor={editor} onClose={() => setOpen(false)} />
    </Menu>
  );
}
