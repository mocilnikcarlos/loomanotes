"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Trash, Download, Expand } from "lucide-react";

import { ImageUploader } from "../ui/files/image/ImageUploader";
import { useImageUpload } from "../ui/files/hooks/useImageUpload";
import { FilePreview } from "../ui/files/FilePreview";
import { getFileMeta } from "../ui/files/helper/getFileMeta";
import { downloadFile } from "../ui/files/helper/downloadFile";
import { BlockToolbar } from "../ui/files/image/BlockToolbar";

export function ImageBlockView({ node, updateAttributes, editor }: any) {
  const { src, missing } = node.attrs;
  const [resizeMode, setResizeMode] = useState(false);

  const meta = getFileMeta(undefined, src ?? undefined);

  const { inputRef, pickFile, onFileChange, loading, error } = useImageUpload(
    ({ path, url }) => {
      updateAttributes({ path, src: url, missing: false });
    }
  );

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
        <BlockToolbar
          actions={[
            {
              id: "delete",
              icon: <Trash size={14} />,
              label: "Eliminar bloque",
              onClick: deleteBlock,
            },
          ]}
        />

        <div className="flex items-center gap-3 rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted">
          <span>🗑️</span>
          <span>Este archivo fue eliminado</span>
        </div>
      </NodeViewWrapper>
    );
  }

  /**
   * RENDER normal
   */
  return (
    <NodeViewWrapper
      className="group relative looma-block"
      data-type="imageBlock"
    >
      {src && meta && (
        <BlockToolbar
          actions={[
            {
              id: "download",
              icon: <Download size={14} />,
              label: "Descargar",
              onClick: () =>
                downloadFile(src, `${meta.name}.${meta.extension}`),
            },
            {
              id: "resize",
              icon: <Expand size={14} />,
              label: "Redimensionar",
              onClick: () => setResizeMode(true),
            },
            {
              id: "delete",
              icon: <Trash size={14} />,
              label: "Eliminar bloque",
              onClick: deleteBlock,
            },
          ]}
        />
      )}

      <div className="w-full">
        {src ? (
          <FilePreview file={meta!} />
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
