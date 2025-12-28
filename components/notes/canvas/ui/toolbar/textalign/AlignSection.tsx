"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
};

export function AlignSection({ editor }: Props) {
  const isLeft = editor.isActive({ textAlign: "left" });
  const isCenter = editor.isActive({ textAlign: "center" });
  const isRight = editor.isActive({ textAlign: "right" });
  const isJustify = editor.isActive({ textAlign: "justify" });

  const { t } = useT();

  return (
    <>
      <Tooltip content={t("canvas.toolbar.align.tooltipLeft")}>
        <ButtonIcon
          aria-pressed={isLeft}
          data-active={isLeft}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          size="sm"
          variant="ghost"
          icon={<AlignLeft size={14} />}
          className={
            isLeft ? "bg-button-hover border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.align.tooltipCenter")}>
        <ButtonIcon
          aria-pressed={isCenter}
          data-active={isCenter}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          size="sm"
          variant="ghost"
          icon={<AlignCenter size={14} />}
          className={
            isCenter ? "bg-button-hover border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.align.tooltipRight")}>
        <ButtonIcon
          aria-pressed={isRight}
          data-active={isRight}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          size="sm"
          variant="ghost"
          icon={<AlignRight size={14} />}
          className={
            isRight ? "bg-button-hover border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.align.tooltipJustify")}>
        <ButtonIcon
          aria-pressed={isJustify}
          data-active={isJustify}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          size="sm"
          variant="ghost"
          icon={<AlignJustify size={14} />}
          className={
            isJustify ? "bg-button-hover border border-border" : undefined
          }
        />
      </Tooltip>
    </>
  );
}
