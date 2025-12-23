import type { Editor } from "@tiptap/react";
import { BASE_COLORS } from "@/config/editor.colors";
import { RecentColor } from "./types";

type Props = {
  editor: Editor;
  activeTextColor: string | null;
  onPushRecent: (entry: RecentColor) => void;
};

export function TextColorSection({
  editor,
  activeTextColor,
  onPushRecent,
}: Props) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Text Color</span>

      <div className="grid grid-cols-5 gap-2">
        {BASE_COLORS.map((color) => {
          const isActive = activeTextColor === color;

          return (
            <button
              key={color}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                if (isActive) {
                  editor.chain().focus().unsetColor().run();
                } else {
                  editor.chain().focus().setColor(color).run();
                  onPushRecent({ type: "text", color });
                }
              }}
              className={`h-7 w-7 rounded-full border flex items-center justify-center cursor-pointer
                ${isActive ? "ring-2 ring-offset-2 ring-primary" : "border-border"}
              `}
            >
              <span className="text-xs font-bold" style={{ color }}>
                A
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
