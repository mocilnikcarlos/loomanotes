import type { Editor } from "@tiptap/react";
import { HIGHLIGHT_COLORS } from "@/config/editor.colors";
import { RecentColor } from "./types";
import { Undo2 } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";

type Props = {
  editor: Editor;
  onPushRecent: (entry: RecentColor) => void;
  onSelect?: () => void;
};

export function HighlightColorSection({
  editor,
  onPushRecent,
  onSelect,
}: Props) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Highlight Color</span>
      <Tooltip content="Quitar fondo" placement="right">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().unsetHighlight().run();
            onSelect?.();
          }}
          className="h-6 w-6 rounded-full flex items-center justify-center border border-border bg-transparent cursor-pointer"
        >
          <Undo2 size={12} />
        </button>
      </Tooltip>

      <div className="grid grid-cols-5 gap-2">
        {HIGHLIGHT_COLORS.map((color) => (
          <button
            key={color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              editor.chain().focus().toggleHighlight({ color }).run();
              onPushRecent({ type: "highlight", color });
            }}
            className="h-6 w-6 rounded-full border border-border cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </section>
  );
}
