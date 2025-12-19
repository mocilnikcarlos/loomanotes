"use client";

import { Download } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { Tooltip } from "@heroui/tooltip";
import { useT } from "@/hooks/utils/useT";

interface DownloadButtonProps {
  noteId: string;
}

export function DownloadButton({ noteId }: DownloadButtonProps) {
  const { t } = useT();

  return (
    <Tooltip content={t("dashboard.note.tooltipDownload")}>
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
