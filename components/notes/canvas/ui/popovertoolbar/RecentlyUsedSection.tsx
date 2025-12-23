import type { Editor } from "@tiptap/react";
import { RecentColor } from "./types";

type Props = {
  editor: Editor;
  recentColors: RecentColor[];
  activeTextColor: string | null;
  activeHighlightColor: string | null;
  onSelect?: () => void;
};

export function RecentlyUsedSection({
  editor,
  recentColors,
  activeTextColor,
  activeHighlightColor,
  onSelect,
}: Props) {
  if (recentColors.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Recently Used</span>

      <div className="flex gap-2">
        {recentColors.map(({ type, color }) => {
          const isActive =
            (type === "text" && color === activeTextColor) ||
            (type === "highlight" && color === activeHighlightColor);

          return (
            <button
              key={`${type}-${color}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (type === "text") {
                  editor.chain().focus().setColor(color).run();
                } else {
                  editor.chain().focus().toggleHighlight({ color }).run();
                }
                onSelect?.();
              }}
              className={`
                h-6 w-6 rounded-full border flex items-center justify-center
                ${isActive ? "ring-2" : ""}
              `}
              style={{
                boxShadow: isActive ? `0 0 0 2px ${color}` : undefined,
                backgroundColor: type === "highlight" ? color : undefined,
              }}
            >
              {type === "text" && (
                <span className="text-xs font-bold" style={{ color }}>
                  A
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
