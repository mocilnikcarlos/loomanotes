import { resolveColor } from "@/config/editor.colors";

type Props = {
  activeTextColor: string | null;
  activeHighlightColor: string | null;
};

const normalizeHighlight = (color: string) =>
  color.length === 9 ? color.slice(0, 7) : color;

const highlightBackground = (hex: string) => `${hex}33`;

export function AppliedStyleSection({
  activeTextColor,
  activeHighlightColor,
}: Props) {
  if (!activeTextColor && !activeHighlightColor) return null;

  const highlightBase = activeHighlightColor
    ? normalizeHighlight(activeHighlightColor)
    : null;

  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-foreground font-bold uppercase">
        Estilo aplicado
      </span>

      <div className="flex gap-3">
        {/* Text color applied */}
        {activeTextColor && (
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center border"
            style={{ borderColor: resolveColor(activeTextColor as any) }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: resolveColor(activeTextColor as any) }}
            >
              A
            </span>
          </div>
        )}

        {/* Highlight applied */}
        {highlightBase && (
          <div
            className="h-7 w-7 rounded-full border"
            style={{
              borderColor: resolveColor(highlightBase as any),
              backgroundColor: highlightBackground(
                resolveColor(highlightBase as any)
              ),
            }}
          />
        )}
      </div>
    </section>
  );
}
