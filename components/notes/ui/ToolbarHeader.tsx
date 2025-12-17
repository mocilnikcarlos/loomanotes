"use client";

import { DownloadButton } from "./DownloadButton";
import { FavoriteButton } from "./FavoriteButton";

interface ToolbarHeaderProps {
  noteId: string;
}

export function ToolbarHeader({ noteId }: ToolbarHeaderProps) {
  return (
    <div className="flex items-center gap-1">
      <FavoriteButton noteId={noteId} />

      <DownloadButton noteId={noteId} />
    </div>
  );
}
