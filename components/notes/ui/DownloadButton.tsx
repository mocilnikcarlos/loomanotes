"use client";

import { Download } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Tooltip } from "@heroui/tooltip";

interface DownloadButtonProps {
  noteId: string;
}

export function DownloadButton({ noteId }: DownloadButtonProps) {
  return (
    <Tooltip content="Descargar nota">
      <ButtonIcon
        aria-label="Download note"
        onClick={() => {
          window.location.href = `/api/notes/${noteId}/export`;
        }}
        icon={<Download />}
      />
    </Tooltip>
  );
}
