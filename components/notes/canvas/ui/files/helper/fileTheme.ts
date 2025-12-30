import {
  Image,
  FileText,
  FileArchive,
  FileSpreadsheet,
  FileQuestion,
} from "lucide-react";

export const FILE_THEME = {
  image: {
    color: "bg-violet-600/90",
    icon: Image,
  },
  pdf: {
    color: "bg-red-600/90",
    icon: FileText,
  },
  word: {
    color: "bg-blue-600/90",
    icon: FileText,
  },
  excel: {
    color: "bg-green-600/90",
    icon: FileSpreadsheet,
  },
  archive: {
    color: "bg-yellow-600/90",
    icon: FileArchive,
  },
  unknown: {
    color: "bg-muted",
    icon: FileQuestion,
  },
} as const;
