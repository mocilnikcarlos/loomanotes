"use client";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useTextSelectionToolbar } from "@/hooks/notes/useTextSelectionToolbar";
import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { TextColorPopover } from "./TextColorPopover";
import { useState, useEffect } from "react";
import { useEditorState } from "@tiptap/react";
import { BlockStylePopover } from "./BlockStylePopover";
import { ToolbarDivider } from "./ToolbarDivider";
import { Button } from "@/components/ui/Button";
import { BLOCKS } from "@/config/blocks.config";
import { useBlockStyleSwitcher } from "@/hooks/notes/useBlockStyleSwitcher";
import { Menu } from "@/components/ui/Menu";

// Icons
import { Code, Bold, Italic, Strikethrough, Type } from "lucide-react";

type Props = {
  editor: Editor;
};

type RecentColor = {
  type: "text" | "highlight";
  color: string;
};

export function TextSelectionToolbar({ editor }: Props) {
  const { visible, position } = useTextSelectionToolbar(editor);

  const [recentColors, setRecentColors] = useState<RecentColor[]>([]);

  const [activeTextColor, setActiveTextColor] = useState<string | null>(null);
  const [activeHighlightColor, setActiveHighlightColor] = useState<
    string | null
  >(null);

  const isBold = editor.isActive("bold");
  const isItalic = editor.isActive("italic");
  const isStrike = editor.isActive("strike");
  const isCode = editor.isActive("code");

  const { currentBlock } = useBlockStyleSwitcher(editor);

  // -----------------------------
  // Sync styles with editor state
  // -----------------------------
  useEffect(() => {
    if (!editor) return;

    const updateActiveStyles = () => {
      const { selection } = editor.state;

      // Si no hay selección, no mostramos estilos aplicados
      if (selection.empty) {
        setActiveTextColor(null);
        setActiveHighlightColor(null);
        return;
      }

      // ---- TEXT COLOR ----
      const rawTextColor = editor.getAttributes("textStyle")?.color;

      const textColor =
        rawTextColor &&
        rawTextColor !== "inherit" &&
        rawTextColor !== "currentColor"
          ? rawTextColor
          : null;

      // ---- HIGHLIGHT COLOR ----
      const highlightColor = editor.getAttributes("highlight")?.color ?? null;

      setActiveTextColor(textColor);
      setActiveHighlightColor(highlightColor);
    };

    updateActiveStyles();

    editor.on("selectionUpdate", updateActiveStyles);
    editor.on("transaction", updateActiveStyles);

    return () => {
      editor.off("selectionUpdate", updateActiveStyles);
      editor.off("transaction", updateActiveStyles);
    };
  }, [editor]);

  useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
    }),
  });

  const blockTitle =
    BLOCKS.find((b) => b.id === currentBlock)?.title ?? "Texto";

  // -----------------------------
  // Recent colors helper
  // -----------------------------
  function pushRecent(entry: RecentColor) {
    setRecentColors((prev) => {
      const next = [
        entry,
        ...prev.filter(
          (c) => !(c.color === entry.color && c.type === entry.type)
        ),
      ];
      return next.slice(0, 5);
    });
  }

  if (!visible) return null;

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
      }}
      className="absolute z-50 flex items-center bg-card gap-1 rounded-full border border-border p-1"
    >
      <Menu
        trigger={
          <Tooltip content="Estilo de bloque">
            <Button
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
            >
              {blockTitle}
            </Button>
          </Tooltip>
        }
      >
        <BlockStylePopover editor={editor} />
      </Menu>

      <ToolbarDivider />
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
      <ToolbarDivider />
      {/* ---- Color system ---- */}

      <Menu
        trigger={
          <Tooltip content="Color de texto">
            <ButtonIcon
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
              icon={<Type size={14} />}
              style={activeTextColor ? { color: activeTextColor } : undefined}
            />
          </Tooltip>
        }
        onOpenChange={() => {
          // si en el futuro hay otro menú, se coordina acá
        }}
        position="bottom-end"
      >
        <TextColorPopover
          editor={editor}
          recentColors={recentColors}
          activeTextColor={activeTextColor}
          activeHighlightColor={activeHighlightColor}
          onPushRecent={pushRecent}
        />
      </Menu>
    </div>
  );
}
