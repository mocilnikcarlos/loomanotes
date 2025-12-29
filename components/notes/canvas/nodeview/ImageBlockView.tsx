"use client";

import { NodeViewWrapper } from "@tiptap/react";
import { useRef, useState } from "react";
import { useUploadAsset } from "@/hooks/assets/useUploadAsset";

export function ImageBlockView({ node, updateAttributes }: any) {
  const { src, path } = node.attrs;
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, loading } = useUploadAsset("notes");
  const [error, setError] = useState<string | null>(null);

  const onPickFile = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    try {
      const { path, url } = await upload(file);
      updateAttributes({
        path,
        src: url,
      });
    } catch {
      setError("upload_failed");
    }
  };

  return (
    <NodeViewWrapper className="looma-block" data-type="imageBlock">
      <div className="w-full">
        {src ? (
          <img
            src={src}
            alt=""
            className="max-w-full rounded-md"
            draggable={false}
          />
        ) : (
          <div className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted">
            <button
              type="button"
              onClick={onPickFile}
              disabled={loading}
              className="rounded-md px-3 py-1 hover:bg-muted"
            >
              {loading ? "Subiendo…" : "Subir imagen"}
            </button>

            {error && (
              <span className="text-xs text-danger">Error al subir</span>
            )}
          </div>
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
