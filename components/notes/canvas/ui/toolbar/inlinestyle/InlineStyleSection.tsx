"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Bold, Italic, Strikethrough, Code, Underline } from "lucide-react";
import { useT } from "@/hooks/utils/useT";

type Props = {
  editor: Editor;
};

export function InlineStyleSection({ editor }: Props) {
  const isBold = editor.isActive("bold");
  const isItalic = editor.isActive("italic");
  const isStrike = editor.isActive("strike");
  const isCode = editor.isActive("code");
  const isUnderline = editor.isActive("underline");

  const { t } = useT();

  return (
    <>
      <Tooltip content={t("canvas.toolbar.inlineStyle.tooltipBold")}>
        <ButtonIcon
          aria-pressed={isBold}
          data-active={isBold}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleBold().run()}
          size="sm"
          variant="ghost"
          icon={<Bold size={14} />}
          className={isBold ? "border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.inlineStyle.tooltipItalic")}>
        <ButtonIcon
          aria-pressed={isItalic}
          data-active={isItalic}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleItalic().run()}
          size="sm"
          variant="ghost"
          icon={<Italic size={14} />}
          className={isItalic ? "border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.inlineStyle.tooltipStrike")}>
        <ButtonIcon
          aria-pressed={isStrike}
          data-active={isStrike}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleStrike().run()}
          size="sm"
          variant="ghost"
          icon={<Strikethrough size={14} />}
          className={isStrike ? "border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.inlineStyle.tooltipUnderline")}>
        <ButtonIcon
          aria-pressed={isUnderline}
          data-active={isUnderline}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleUnderline().run()}
          size="sm"
          variant="ghost"
          icon={<Underline size={14} />}
          className={isUnderline ? "border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content={t("canvas.toolbar.inlineStyle.tooltipCode")}>
        <ButtonIcon
          aria-pressed={isCode}
          data-active={isCode}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleCode().run()}
          size="sm"
          variant="ghost"
          icon={<Code size={14} />}
          className={isCode ? "border border-border" : undefined}
        />
      </Tooltip>
    </>
  );
}
