"use client";

import { Download } from "lucide-react";
import { Tooltip } from "@heroui/react";
import { FavoriteButton } from "./FavoriteButton";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

interface ToolbarHeaderProps {
  noteId: string;
}

export function ToolbarHeader({ noteId }: ToolbarHeaderProps) {
  return (
    <div className="flex items-center gap-1">
      <FavoriteButton noteId={noteId} />

      <ButtonIcon aria-label="Download note" icon={<Download />} />
    </div>
  );
}
