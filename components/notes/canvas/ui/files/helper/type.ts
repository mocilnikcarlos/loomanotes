export type FileMeta = {
  name: string;
  extension: string;
  type: "image" | "pdf" | "word" | "excel" | "archive" | "unknown";
  path?: string;
  src?: string;
};
