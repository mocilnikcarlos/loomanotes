import type { Editor } from "@tiptap/react";
import { TEXT_COLORS } from "@/config/editor.colors";
import { RecentColor } from "./types";
import { Tooltip } from "@heroui/tooltip";

type Props = {
  editor: Editor;
  onPushRecent: (entry: RecentColor) => void;
  onSelect?: () => void;
};

export function TextColorSection({ editor, onPushRecent, onSelect }: Props) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Text Color</span>

      <Tooltip content="Quitar color" placement="right">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().unsetColor().run();
            onSelect?.();
          }}
          className="h-7 w-7 rounded-full border border-border flex items-center justify-center text-xs text-foreground cursor-pointer"
        >
          A
        </button>
      </Tooltip>

      <div className="grid grid-cols-5 gap-2">
        {TEXT_COLORS.map((color) => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().setColor(color).run();
              onPushRecent({ type: "text", color });
            }}
            className="h-7 w-7 rounded-full border border-border flex items-center justify-center cursor-pointer"
          >
            <span className="font-bold text-xs" style={{ color }}>
              A
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
