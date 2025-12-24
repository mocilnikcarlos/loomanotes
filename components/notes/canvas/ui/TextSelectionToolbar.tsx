"use client";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useTextSelectionToolbar } from "@/hooks/notes/useTextSelectionToolbar";
import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { TextColorPopover } from "./TextColorPopover";
import { useState, useEffect } from "react";
import { useEditorState } from "@tiptap/react";

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

  const [showColors, setShowColors] = useState(false);
  const [recentColors, setRecentColors] = useState<RecentColor[]>([]);

  const [activeTextColor, setActiveTextColor] = useState<string | null>(null);
  const [activeHighlightColor, setActiveHighlightColor] = useState<
    string | null
  >(null);

  const isBold = editor.isActive("bold");
  const isItalic = editor.isActive("italic");
  const isStrike = editor.isActive("strike");
  const isCode = editor.isActive("code");

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

  // -----------------------------
  // Close popover when toolbar hides
  // -----------------------------
  useEffect(() => {
    if (!visible) {
      setShowColors(false);
    }
  }, [visible]);

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
      className="absolute z-50 flex bg-card-hover gap-1 rounded-full border border-border p-1"
    >
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

      {/* ---- Color system ---- */}

      <Tooltip content="Color de texto">
        <ButtonIcon
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowColors((v) => !v)}
          size="sm"
          variant="ghost"
          icon={<Type size={14} />}
          style={activeTextColor ? { color: activeTextColor } : undefined}
        />
      </Tooltip>

      {showColors && (
        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2">
          <TextColorPopover
            editor={editor}
            recentColors={recentColors}
            activeTextColor={activeTextColor}
            activeHighlightColor={activeHighlightColor}
            onPushRecent={pushRecent}
          />
        </div>
      )}
    </div>
  );
}
