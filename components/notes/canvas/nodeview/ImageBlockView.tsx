"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Trash, Download, Expand } from "lucide-react";

import { ImageUploader } from "../ui/files/image/ImageUploader";
import { useImageUpload } from "../ui/files/hooks/useImageUpload";
import { FilePreview } from "../ui/files/FilePreview";
import { getFileMeta } from "../ui/files/helper/getFileMeta";
import { downloadFile } from "../ui/files/helper/downloadFile";
import FeedbackBanner from "../ui/files/FeedbackBanner";

export function ImageBlockView({ node, updateAttributes, editor }: any) {
  const { src, missing, width } = node.attrs;

  const meta = getFileMeta(undefined, src ?? undefined);

  const { inputRef, pickFile, onFileChange, loading, error } = useImageUpload(
    ({ path, url }) => {
      updateAttributes({ path, src: url, missing: false });
    }
  );

  const [tempWidth, setTempWidth] = useState<string | null>(null);

  const onResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = (e.currentTarget.parentElement as HTMLElement)
      .offsetWidth;

    const parentWidth =
      e.currentTarget.closest(".looma-block")?.parentElement?.offsetWidth ??
      startWidth;

    let nextWidth = width;

    const onMouseMove = (ev: MouseEvent) => {
      const delta = ev.clientX - startX;
      const nextPx = startWidth + delta;

      const percent = Math.min(100, Math.max(30, (nextPx / parentWidth) * 100));

      nextWidth = `${percent}%`;
      setTempWidth(nextWidth);
    };

    const onMouseUp = () => {
      updateAttributes({ width: nextWidth });
      setTempWidth(null);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  /**
   * Auto-upload (paste / drag)
   */
  useEffect(() => {
    if (src || missing) return;

    let tries = 0;

    const interval = setInterval(() => {
      const pastedFile = (window as any).__PASTED_IMAGE__;
      if (!pastedFile) {
        if (++tries > 10) clearInterval(interval);
        return;
      }

      delete (window as any).__PASTED_IMAGE__;
      clearInterval(interval);

      const fakeEvent = {
        target: { files: [pastedFile] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onFileChange(fakeEvent);
    }, 50);

    return () => clearInterval(interval);
  }, [src, missing, onFileChange]);

  /**
   * Eliminar bloque (NO archivo)
   */
  const deleteBlock = () => {
    editor.commands.deleteSelection();
  };

  /**
   * RENDER: archivo eliminado
   */
  if (missing) {
    return (
      <NodeViewWrapper
        className="group relative looma-block"
        data-type="imageBlock"
      >
        <FeedbackBanner leading="🥺​">
          Este archivo fue eliminado
        </FeedbackBanner>
      </NodeViewWrapper>
    );
  }

  /**
   * RENDER normal
   */
  return (
    <NodeViewWrapper className="relative looma-block" data-type="imageBlock">
      <div className="w-full">
        {src && meta ? (
          <FilePreview
            file={meta}
            width={tempWidth ?? width}
            showToolbar
            onResizeStart={onResizeStart}
            toolbarActions={[
              {
                id: "download",
                icon: <Download size={14} />,
                label: "Descargar",
                onClick: () =>
                  downloadFile(src, `${meta.name}.${meta.extension}`),
              },
              {
                id: "delete",
                icon: <Trash size={14} />,
                label: "Quitar imagen",
                onClick: deleteBlock,
              },
            ]}
          />
        ) : (
          <ImageUploader loading={loading} error={error} onPick={pickFile} />
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    </NodeViewWrapper>
  );
}
