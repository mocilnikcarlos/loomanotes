import type { Editor } from "@tiptap/react";
import { BASE_COLORS } from "@/config/editor.colors";
import { RecentColor } from "./types";

type Props = {
  editor: Editor;
  activeHighlightColor: string | null;
  onPushRecent: (entry: RecentColor) => void;
};

const highlight = (hex: string) => `${hex}33`; // ~20% alpha

export function HighlightColorSection({
  editor,
  activeHighlightColor,
  onPushRecent,
}: Props) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Highlight Color</span>

      <div className="grid grid-cols-5 gap-2">
        {BASE_COLORS.map((color) => {
          const bg = highlight(color);
          const isActive = activeHighlightColor === bg;

          return (
            <button
              key={color}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (isActive) {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  editor.chain().focus().toggleHighlight({ color: bg }).run();
                  onPushRecent({ type: "highlight", color: bg });
                }
              }}
              className={`h-6 w-6 rounded-full border cursor-pointer
                ${isActive ? "ring-2 ring-offset-2 ring-primary" : "border-border"}
              `}
              style={{ backgroundColor: bg }}
            />
          );
        })}
      </div>
    </section>
  );
}
