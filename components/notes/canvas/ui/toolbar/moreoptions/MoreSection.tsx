"use client";

import type { Editor } from "@tiptap/react";
import { useState } from "react";
import { Tooltip } from "@heroui/tooltip";
import { Menu } from "@/components/ui/Menu";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { MoreHorizontal } from "lucide-react";
import { TextToolbarMoreMenu } from "./TextToolbarMoreMenu";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
};

export function MoreSection({ editor }: Props) {
  const [open, setOpen] = useState(false);

  const { t } = useT();

  return (
    <Menu
      open={open}
      onOpenChange={setOpen}
      position="bottom-end"
      trigger={
        <Tooltip content={t("canvas.toolbar.more.tooltip")}>
          <ButtonIcon
            onMouseDown={(e) => e.preventDefault()}
            size="sm"
            variant="ghost"
            icon={<MoreHorizontal size={14} />}
          />
        </Tooltip>
      }
    >
      <TextToolbarMoreMenu editor={editor} onClose={() => setOpen(false)} />
    </Menu>
  );
}
