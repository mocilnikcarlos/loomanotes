import type { Editor } from "@tiptap/react";
import { BASE_COLORS, resolveColor } from "@/config/editor.colors";
import { RecentColor } from "./types";
import { ColorButton } from "./ColorButton";

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
      <span className="text-xs text-foreground font-bold uppercase">
        Text Color
      </span>

      <div className="grid grid-cols-5 gap-2">
        {BASE_COLORS.map((color) => {
          const resolved = resolveColor(color);
          const isActive = activeTextColor === resolved;

          return (
            <ColorButton
              size="md"
              key={color}
              color={resolved}
              variant="text"
              isActive={isActive}
              onClick={() => {
                if (isActive) {
                  editor.chain().focus().unsetColor().run();
                } else {
                  editor.chain().focus().setColor(color).run();
                  onPushRecent({ type: "text", color });
                }
              }}
            >
              <ColorButton.Text />
            </ColorButton>
          );
        })}
      </div>
    </section>
  );
}
