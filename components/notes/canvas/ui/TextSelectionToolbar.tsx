"use client";

import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useTextSelectionToolbar } from "@/hooks/notes/useTextSelectionToolbar";
import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { TextColorPopover } from "./TextColorPopover";
import { useState, useEffect, useMemo } from "react";

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

  const activeTextColor = useMemo(() => {
    return editor.getAttributes("textStyle")?.color ?? null;
  }, [editor, editor.state]);

  const activeHighlightColor = useMemo(() => {
    return editor.getAttributes("highlight")?.color ?? null;
  }, [editor, editor.state]);

  useEffect(() => {
    if (!visible) {
      setShowColors(false);
    }
  }, [visible]);

  useEffect(() => {
    function handleClickOutside() {
      setShowColors(false);
    }

    if (showColors) {
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColors]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowColors(false);
      }
    }

    if (showColors) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [showColors]);

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
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          variant="ghost"
          icon={<Bold size={14} />}
        />
      </Tooltip>

      <Tooltip content="Cursiva">
        <ButtonIcon
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          variant="ghost"
          icon={<Italic size={14} />}
        />
      </Tooltip>

      <Tooltip content="Tachado">
        <ButtonIcon
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          size="sm"
          variant="ghost"
          icon={<Strikethrough size={14} />}
        />
      </Tooltip>

      <Tooltip content="Código">
        <ButtonIcon
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().toggleCode().run()}
          size="sm"
          variant="ghost"
          icon={<Code size={14} />}
        />
      </Tooltip>

      {/* ---- Separator mental: acá empieza otro sistema ---- */}

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
            onSelect={() => setShowColors(false)}
          />
        </div>
      )}
    </div>
  );
}
