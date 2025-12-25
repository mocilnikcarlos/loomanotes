"use client";

import type { Editor } from "@tiptap/react";
import { Tooltip } from "@heroui/tooltip";
import { Menu } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import {
  TIPTAP_FONT_FAMILIES,
  TIPTAP_FONT_SIZES,
} from "@/config/tiptapfont.config";

type Props = {
  editor: Editor;
};

export function FontSection({ editor }: Props) {
  const textStyle = editor.getAttributes("textStyle");

  const currentFontFamily =
    TIPTAP_FONT_FAMILIES.find((f) => f.cssValue === textStyle?.fontFamily)
      ?.label ?? "Elms Sans";

  const currentFontSize =
    TIPTAP_FONT_SIZES.find((s) => s.value === textStyle?.fontSize)?.label ??
    "16";

  return (
    <>
      {/* Font family */}
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

      {/* Font size */}
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
    </>
  );
}
