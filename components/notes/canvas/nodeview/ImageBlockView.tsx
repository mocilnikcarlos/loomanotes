"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { useEffect } from "react";
import { Trash, Download } from "lucide-react";

import { ImageUploader } from "../ui/files/image/ImageUploader";
import { useImageUpload } from "../ui/files/hooks/useImageUpload";
import { FilePreview } from "../ui/files/FilePreview";
import { getFileMeta } from "../ui/files/helper/getFileMeta";
import { downloadFile } from "../ui/files/helper/downloadFile";
import FeedbackBanner from "../ui/files/FeedbackBanner";
import { useImageResize } from "../ui/files/hooks/useImageResize";
import { useT } from "@/hooks/utils/useT";

export function ImageBlockView({ node, updateAttributes, editor }: any) {
  const { src, missing, width } = node.attrs;

  const meta = getFileMeta(undefined, src ?? undefined);

  const { inputRef, pickFile, onFileChange, loading, error } = useImageUpload(
    ({ path, url }) => {
      updateAttributes({ path, src: url, missing: false });
    }
  );

  const resize = useImageResize({
    width,
    onCommit: (next) => updateAttributes({ width: next }),
  });

  const { t } = useT();

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
        <FeedbackBanner
          leading={t("canvas.imageBlock.errors.missingBlock.leading")}
        >
          {t("canvas.imageBlock.errors.missingBlock.description")}
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
            width={resize.width}
            showToolbar
            onResizeStart={resize.onResizeStart}
            toolbarActions={[
              {
                id: "download",
                icon: <Download size={14} />,
                label: t("canvas.imageBlock.toolbarActions.download"),
                onClick: () =>
                  downloadFile(src, `${meta.name}.${meta.extension}`),
              },
              {
                id: "delete",
                icon: <Trash size={14} />,
                label: t("canvas.imageBlock.toolbarActions.delete"),
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
