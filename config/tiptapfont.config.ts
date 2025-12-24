export type TiptapFontFamily = {
  id: string;
  label: string;
  cssValue: string;
};

export type TiptapFontSize = {
  id: string;
  label: string;
  value: string;
};

export const TIPTAP_FONT_FAMILIES: TiptapFontFamily[] = [
  {
    id: "elms",
    label: "Elms Sans",
    cssValue: "var(--font-elms_sans)",
  },
  {
    id: "serif",
    label: "Serif",
    cssValue: "serif",
  },
  {
    id: "mono",
    label: "Mono",
    cssValue: "monospace",
  },
  {
    id: "tahoma",
    label: "Tahoma",
    cssValue: "Tahoma, Verdana, Segoe UI, sans-serif",
  },
  {
    id: "verdana",
    label: "Verdana",
    cssValue: "Verdana, Tahoma, Segoe UI, sans-serif",
  },
];

export const TIPTAP_FONT_SIZES: TiptapFontSize[] = [
  { id: "xs", label: "12", value: "12px" },
  { id: "sm", label: "14", value: "14px" },
  { id: "md", label: "16", value: "16px" }, // default
  { id: "lg", label: "18", value: "18px" },
  { id: "xl", label: "24", value: "24px" },
  { id: "xxl", label: "32", value: "32px" },
];
