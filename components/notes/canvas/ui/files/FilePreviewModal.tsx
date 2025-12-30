"use client";

import { X, Download, FileWarning } from "lucide-react";
import { FILE_THEME } from "./helper/fileTheme";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import type { FileMeta } from "@/components/notes/canvas/ui/files/helper/type";
import { downloadFile } from "./helper/downloadFile";
import { useT } from "@/hooks/utils/useT";

type Props = {
  file: FileMeta;
  open: boolean;
  onClose: () => void;
};

export function FilePreviewModal({ file, open, onClose }: Props) {
  if (!open) return null;

  const theme = FILE_THEME[file.type];
  const Icon = theme.icon;
  const { t } = useT();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      {/* header */}
      <div className="flex items-center justify-between px-6 py-4 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className={`rounded-md px-2 py-1 ${theme.color}`}>
            <Icon size={16} />
          </div>

          <div className="flex flex-col">
            <span className="font-medium">{file.name}</span>
            <span className="text-xs uppercase text-subtitle">
              {file.extension}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {file.src && (
            <ButtonIcon
              icon={<Download size={16} />}
              onClick={() =>
                file.src &&
                downloadFile(file.src, `${file.name}.${file.extension}`)
              }
            />
          )}
          <ButtonIcon icon={<X size={16} />} onClick={onClose} />
        </div>
      </div>

      {/* content */}
      <div className="flex h-[calc(100%-64px)] items-center justify-center p-6">
        {file.type === "image" && file.src ? (
          <img
            src={file.src}
            alt=""
            className="max-h-full max-w-full rounded-md"
          />
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <FileWarning size={64} className="text-primary" />
            {t("canvas.imageBlock.errors.modal.errorDescription")}
          </div>
        )}
      </div>
    </div>
  );
}
