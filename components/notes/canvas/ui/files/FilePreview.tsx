"use client";

import { useState } from "react";
import { FileHoverBanner } from "./FileHoverBanner";
import { FilePreviewModal } from "./FilePreviewModal";
import type { FileMeta } from "@/components/notes/canvas/ui/files/helper/type";

type Props = {
  file: FileMeta;
};

export function FilePreview({ file }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="group relative inline-block rounded-md overflow-hidden">
          <img
            src={file.src}
            alt=""
            draggable={false}
            className="max-h-[80vh] max-w-full object-contain"
          />

          <FileHoverBanner file={file} onClick={() => setOpen(true)} />
        </div>
      </div>

      <FilePreviewModal
        file={file}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
