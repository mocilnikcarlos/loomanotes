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
import { LinkMenu } from "./LinkMenu";
import {
  TIPTAP_FONT_FAMILIES,
  TIPTAP_FONT_SIZES,
} from "@/config/tiptapfont.config";

// Icons
import {
  Code,
  Bold,
  Italic,
  Strikethrough,
  Type,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

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
  const isLink = editor.isActive("link");
  const isAlignLeft = editor.isActive({ textAlign: "left" });
  const isAlignCenter = editor.isActive({ textAlign: "center" });
  const isAlignRight = editor.isActive({ textAlign: "right" });
  const isAlignJustify = editor.isActive({ textAlign: "justify" });

  const { currentBlock } = useBlockStyleSwitcher(editor);
  const [linkOpen, setLinkOpen] = useState(false);

  const blockTitle =
    BLOCKS.find((b) => b.id === currentBlock)?.title ?? "Texto";

  const textStyle = editor.getAttributes("textStyle");

  const currentFontFamily =
    TIPTAP_FONT_FAMILIES.find((f) => f.cssValue === textStyle?.fontFamily)
      ?.label ?? "Inter";

  const currentFontSize =
    TIPTAP_FONT_SIZES.find((s) => s.value === textStyle?.fontSize)?.label ??
    "16";

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
    selector: ({ editor }) => {
      const textStyle = editor.getAttributes("textStyle");

      return {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        strike: editor.isActive("strike"),
        code: editor.isActive("code"),

        left: editor.isActive({ textAlign: "left" }),
        center: editor.isActive({ textAlign: "center" }),
        right: editor.isActive({ textAlign: "right" }),
        justify: editor.isActive({ textAlign: "justify" }),

        fontFamily: textStyle?.fontFamily ?? null,
        fontSize: textStyle?.fontSize ?? null,
      };
    },
  });

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
      data-text-toolbar
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      style={{
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
      }}
      className="
        absolute z-50 flex items-center gap-1 p-1 rounded-full
        bg-[var(--toolbar-bg)]
        border border-[var(--toolbar-border)]
        shadow-[var(--toolbar-shadow)]"
    >
      <Menu
        trigger={
          <Tooltip content="Estilo de bloque">
            <Button
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
              className="whitespace-nowrap"
            >
              {blockTitle}
            </Button>
          </Tooltip>
        }
        className="h-[240px] overflow-auto"
      >
        <BlockStylePopover editor={editor} />
      </Menu>

      <ToolbarDivider />

      <Menu
        trigger={
          <Tooltip content="Fuente">
            <Button
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
              className="whitespace-nowrap"
            >
              {currentFontFamily}
            </Button>
          </Tooltip>
        }
      >
        <div className="flex flex-col gap-1 p-1">
          {TIPTAP_FONT_FAMILIES.map((font) => (
            <Button
              key={font.id}
              size="sm"
              variant="ghost"
              className="justify-start w-full"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor.chain().focus();
                font.cssValue
                  ? editor.commands.setFontFamily(font.cssValue)
                  : editor.commands.unsetFontFamily();
              }}
            >
              {font.label}
            </Button>
          ))}
        </div>
      </Menu>

      <Menu
        trigger={
          <Tooltip content="Tamaño de texto">
            <Button
              onMouseDown={(e) => e.preventDefault()}
              size="sm"
              variant="ghost"
            >
              {currentFontSize}
            </Button>
          </Tooltip>
        }
      >
        <div className="flex flex-col gap-1 p-1">
          {TIPTAP_FONT_SIZES.map((size) => (
            <Button
              key={size.id}
              size="sm"
              variant="ghost"
              className="justify-start"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setMark("textStyle", { fontSize: size.value })
                  .run()
              }
            >
              {size.label}
            </Button>
          ))}
        </div>
      </Menu>

      <ToolbarDivider />

      <Tooltip content="Alinear izquierda">
        <ButtonIcon
          aria-pressed={isAlignLeft}
          data-active={isAlignLeft}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          size="sm"
          variant="ghost"
          icon={<AlignLeft size={14} />}
          className={
            isAlignLeft ? "bg-content2 border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content="Centrar">
        <ButtonIcon
          aria-pressed={isAlignCenter}
          data-active={isAlignCenter}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          size="sm"
          variant="ghost"
          icon={<AlignCenter size={14} />}
          className={
            isAlignCenter ? "bg-content2 border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content="Alinear derecha">
        <ButtonIcon
          aria-pressed={isAlignRight}
          data-active={isAlignRight}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          size="sm"
          variant="ghost"
          icon={<AlignRight size={14} />}
          className={
            isAlignRight ? "bg-content2 border border-border" : undefined
          }
        />
      </Tooltip>

      <Tooltip content="Justificar">
        <ButtonIcon
          aria-pressed={isAlignJustify}
          data-active={isAlignJustify}
          onMouseDown={(e) => e.preventDefault()}
          disabled={!editor.can().chain().focus().setTextAlign("justify").run()}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          size="sm"
          variant="ghost"
          icon={<AlignJustify size={14} />}
          className={
            isAlignJustify ? "bg-content2 border border-border" : undefined
          }
        />
      </Tooltip>

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
      {/* ---- Link ---- */}

      <Menu
        open={linkOpen}
        onOpenChange={(open) => {
          setLinkOpen(open);

          if (open) {
            editor.commands.blur();
          } else {
            requestAnimationFrame(() => {
              editor.commands.focus();
            });
          }
        }}
        position="bottom-end"
        trigger={
          <Tooltip content="Enlace">
            <ButtonIcon
              aria-pressed={isLink}
              data-active={isLink}
              size="sm"
              variant="ghost"
              icon={<LinkIcon size={14} />}
            />
          </Tooltip>
        }
      >
        <LinkMenu editor={editor} onClose={() => setLinkOpen(false)} />
      </Menu>

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
