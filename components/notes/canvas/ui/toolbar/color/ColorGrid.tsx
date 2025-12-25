import { BASE_COLORS, resolveColor } from "@/config/editor.colors";
import { Editor } from "@tiptap/core";
import { ColorButton } from "./ColorButton";

type Variant = "text" | "highlight";

export function ColorGrid({
  editor,
  variant,
  activeColor,
  onSelect,
}: {
  editor: Editor;
  variant: Variant;
  activeColor: string | null;
  onSelect: (color: string | null) => void;
}) {
  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase">
        {variant === "text" ? "Text color" : "Highlight color"}
      </span>

      <div className="grid grid-cols-5 gap-2">
        {BASE_COLORS.map((color) => {
          const resolved = resolveColor(color);
          const isActive = activeColor === resolved;

          return (
            <ColorButton
              key={color}
              color={resolved}
              variant={variant}
              isActive={isActive}
              onClick={() => onSelect(isActive ? null : resolved)}
            >
              {variant === "text" && <ColorButton.Text />}
            </ColorButton>
          );
        })}
      </div>
    </section>
  );
}
