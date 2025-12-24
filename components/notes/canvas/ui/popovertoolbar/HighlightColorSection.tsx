import type { Editor } from "@tiptap/react";
import { BASE_COLORS, resolveColor } from "@/config/editor.colors";
import { RecentColor } from "./types";
import { ColorButton } from "./ColorButton";

type Props = {
  editor: Editor;
  activeHighlightColor: string | null;
  onPushRecent: (entry: RecentColor) => void;
};

const toHighlightColor = (hex: string) => `${hex}33`;
const normalizeHighlight = (color: string) =>
  color.length === 9 ? color.slice(0, 7) : color;

export function HighlightColorSection({
  editor,
  activeHighlightColor,
  onPushRecent,
}: Props) {
  const activeBaseColor = activeHighlightColor
    ? normalizeHighlight(activeHighlightColor)
    : null;

  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-foreground font-bold uppercase">
        Highlight Color
      </span>

      <div className="grid grid-cols-5 gap-2">
        {BASE_COLORS.map((color) => {
          const resolved = resolveColor(color);
          const isActive = activeBaseColor === resolved;

          return (
            <ColorButton
              key={color}
              color={resolved}
              variant="highlight"
              size="md"
              isActive={isActive}
              onClick={() => {
                if (isActive) {
                  editor.chain().focus().unsetHighlight().run();
                } else {
                  const highlightColor = toHighlightColor(resolved);

                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: highlightColor })
                    .run();

                  onPushRecent({
                    type: "highlight",
                    color: highlightColor,
                  });
                }
              }}
            >
              <ColorButton.Highlight />
            </ColorButton>
          );
        })}
      </div>
    </section>
  );
}
