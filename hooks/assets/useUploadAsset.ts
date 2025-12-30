"use client";

import { useState, useCallback } from "react";

type UploadContext = "notes" | "avatar";

type UploadResult = {
  url: string;
  path: string;
  mime: string;
  size: number;
};

export function useUploadAsset(context: UploadContext) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<UploadResult> => {
      setLoading(true);
      setError(null);

      try {
        const form = new FormData();
        form.append("file", file);
        form.append("context", context);

        const res = await fetch("/api/assets/upload", {
          method: "POST",
          body: form,
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.message ?? "upload_failed");
        }

        return json as UploadResult;
      } catch (err: any) {
        setError(err.message ?? "upload_failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [context]
  );

  return {
    upload,
    loading,
    error,
  };
}
