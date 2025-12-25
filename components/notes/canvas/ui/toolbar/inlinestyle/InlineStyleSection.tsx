"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Bold, Italic, Strikethrough, Code } from "lucide-react";

type Props = {
  editor: Editor;
};

export function InlineStyleSection({ editor }: Props) {
  const isBold = editor.isActive("bold");
  const isItalic = editor.isActive("italic");
  const isStrike = editor.isActive("strike");
  const isCode = editor.isActive("code");

  return (
    <>
      <Tooltip content="Negrita">
        <ButtonIcon
          aria-pressed={isBold}
          data-active={isBold}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleBold().run()}
          size="sm"
          variant="ghost"
          icon={<Bold size={14} />}
          className={isBold ? "bg-content2 border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content="Cursiva">
        <ButtonIcon
          aria-pressed={isItalic}
          data-active={isItalic}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleItalic().run()}
          size="sm"
          variant="ghost"
          icon={<Italic size={14} />}
          className={isItalic ? "bg-content2 border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content="Tachado">
        <ButtonIcon
          aria-pressed={isStrike}
          data-active={isStrike}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleStrike().run()}
          size="sm"
          variant="ghost"
          icon={<Strikethrough size={14} />}
          className={isStrike ? "bg-content2 border border-border" : undefined}
        />
      </Tooltip>

      <Tooltip content="Código">
        <ButtonIcon
          aria-pressed={isCode}
          data-active={isCode}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().toggleCode().run()}
          size="sm"
          variant="ghost"
          icon={<Code size={14} />}
          className={isCode ? "bg-content2 border border-border" : undefined}
        />
      </Tooltip>
    </>
  );
}
