type Props = {
  activeTextColor: string | null;
  activeHighlightColor: string | null;
};

export function AppliedStyleSection({
  activeTextColor,
  activeHighlightColor,
}: Props) {
  if (!activeTextColor && !activeHighlightColor) return null;

  return (
    <section className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">Estilo aplicado</span>

      <div className="flex gap-3">
        {activeTextColor && (
          <div
            className="h-7 w-7 rounded-full border flex items-center justify-center"
            style={{ boxShadow: `0 0 0 2px ${activeTextColor}` }}
          >
            <span
              className="text-xs font-bold"
              style={{ color: activeTextColor }}
            >
              A
            </span>
          </div>
        )}

        {activeHighlightColor && (
          <div
            className="h-7 w-7 rounded-full border"
            style={{
              backgroundColor: activeHighlightColor,
              boxShadow: `0 0 0 2px ${activeHighlightColor}`,
            }}
          />
        )}
      </div>
    </section>
  );
}
