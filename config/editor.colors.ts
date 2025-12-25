export const BASE_COLORS = [
  "foreground",
  "#6B7280",
  "#EF4444",
  "#F59E0B",
  "#84CC16",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
] as const;

export type ColorToken = (typeof BASE_COLORS)[number];

export const resolveColor = (token: ColorToken): string => {
  if (token === "foreground") return "var(--foreground)";
  return token;
};
