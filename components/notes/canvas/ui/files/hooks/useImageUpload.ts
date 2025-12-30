"use client";

import { useRef, useState } from "react";
import { useUploadAsset } from "@/hooks/assets/useUploadAsset";

export function useImageUpload(
  onUploaded: (data: { path: string; url: string }) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, loading } = useUploadAsset("notes");
  const [error, setError] = useState<string | null>(null);

  const pickFile = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    try {
      const result = await upload(file);
      onUploaded(result);
    } catch {
      setError("upload_failed");
    }
  };

  return {
    inputRef,
    pickFile,
    onFileChange,
    loading,
    error,
  };
}
