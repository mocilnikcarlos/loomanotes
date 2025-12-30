import type { FileMeta } from "@/components/notes/canvas/ui/files/helper/type";

export function getFileMeta(path?: string, src?: string): FileMeta | null {
  const raw = path?.split("/").pop() ?? src?.split("?")[0].split("/").pop();

  if (!raw) return null;

  const parts = raw.split(".");
  const extension = parts.pop()!.toLowerCase();
  const name = parts.join(".");

  const typeMap: Record<string, FileMeta["type"]> = {
    png: "image",
    jpg: "image",
    jpeg: "image",
    webp: "image",
    gif: "image",

    pdf: "pdf",

    doc: "word",
    docx: "word",

    xls: "excel",
    xlsx: "excel",

    zip: "archive",
    rar: "archive",
    "7z": "archive",
  };

  return {
    name,
    extension,
    type: typeMap[extension] ?? "unknown",
    path,
    src,
  };
}
