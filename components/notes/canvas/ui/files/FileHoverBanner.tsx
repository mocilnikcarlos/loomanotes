"use client";

import { FILE_THEME } from "./helper/fileTheme";
import type { FileMeta } from "@/components/notes/canvas/ui/files/helper/type";

type Props = {
  file: FileMeta;
  onClick?: () => void;
};

export function FileHoverBanner({ file, onClick }: Props) {
  const theme = FILE_THEME[file.type];
  const Icon = theme.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3 text-xs text-foreground bg-card/80 backdrop-blur-sm cursor-pointer opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0"
    >
      <div className={`rounded-md px-2 py-1 ${theme.color}`}>
        <Icon size={14} />
      </div>

      <div className="flex min-w-0 flex-col text-left">
        <span className="truncate font-medium">{file.name}</span>
        <span className="opacity-70 uppercase">.{file.extension}</span>
      </div>
    </button>
  );
}
