"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { ImageUploader } from "../ui/files/image/ImageUploader";
import { useImageUpload } from "../ui/files/hooks/useImageUpload";
import { FilePreview } from "../ui/files/FilePreview";
import { getFileMeta } from "../ui/files/helper/getFileMeta";

export function ImageBlockView({ node, updateAttributes }: any) {
  const { src } = node.attrs;

  const { inputRef, pickFile, onFileChange, loading, error } = useImageUpload(
    ({ path, url }) => {
      updateAttributes({ path, src: url });
    }
  );

  return (
    <NodeViewWrapper className="looma-block" data-type="imageBlock">
      <div className="w-full">
        {src ? (
          <FilePreview file={getFileMeta(undefined, src)!} />
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
