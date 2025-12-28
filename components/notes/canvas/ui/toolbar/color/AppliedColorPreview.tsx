"use client";
import { resolveColor } from "@/config/editor.colors";
import { useT } from "@/hooks/utils/useT";

const normalizeHighlight = (color: string) =>
  color.length === 9 ? color.slice(0, 7) : color;

const highlightBackground = (hex: string) => `${hex}33`;

type Props = {
  textColor: string | null;
  highlightColor: string | null;
};

export function AppliedColorPreview({ textColor, highlightColor }: Props) {
  const { t } = useT();
  if (!textColor && !highlightColor) return null;

  const highlightBase = highlightColor
    ? normalizeHighlight(highlightColor)
    : null;

  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-foreground font-bold uppercase">
        {t("canvas.toolbar.color.appliedTitle")}
      </span>

      <div className="flex gap-3">
        {textColor && (
          <div
            className="h-7 w-7 rounded-full flex items-center justify-center border"
            style={{ borderColor: resolveColor(textColor as any) }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: resolveColor(textColor as any) }}
            >
              A
            </span>
          </div>
        )}

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
