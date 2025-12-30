"use client";

import { useState } from "react";
import { FileHoverBanner } from "./FileHoverBanner";
import { FilePreviewModal } from "./FilePreviewModal";
import type { FileMeta } from "@/components/notes/canvas/ui/files/helper/type";
import { BlockToolbar } from "./image/BlockToolbar";

type ToolbarAction = {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

type Props = {
  file: FileMeta;
  showToolbar?: boolean;
  toolbarActions?: ToolbarAction[];
  width: string;
  onResizeStart?: (e: React.MouseEvent) => void;
};

export function FilePreview({
  file,
  showToolbar = false,
  toolbarActions = [],
  width,
  onResizeStart,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center">
        <div
          className="group relative inline-block rounded-md overflow-hidden"
          style={{ width }}
        >
          {/* TOOLBAR */}
          {showToolbar && toolbarActions.length > 0 && (
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition">
              <BlockToolbar actions={toolbarActions} />
            </div>
          )}

          {/* IMAGE */}
          <img
            src={file.src}
            alt=""
            draggable={false}
            className="block w-full h-auto"
          />

          {/* HOVER BANNER */}
          <FileHoverBanner file={file} onClick={() => setOpen(true)} />

          {/* RESIZE HANDLE */}
          {onResizeStart && (
            <div
              className="absolute top-0 right-0 h-full w-2 cursor-ew-resize opacity-0 group-hover:opacity-100"
              onMouseDown={onResizeStart}
            />
          )}
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
