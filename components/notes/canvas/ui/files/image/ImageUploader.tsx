"use client";

import { Image } from "lucide-react";

type Props = {
  loading: boolean;
  error: string | null;
  onPick: () => void;
};

export function ImageUploader({ loading, error, onPick }: Props) {
  return (
    <div className="flex items-start">
      <button
        type="button"
        onClick={onPick}
        disabled={loading}
        className="flex gap-4 px-6 py-4 bg-card hover:bg-card-hover cursor-pointer w-full rounded-md"
      >
        <Image />
        {loading ? "Subiendo…" : "Subir imagen"}
      </button>

      {error && <span className="text-xs text-danger">Error al subir</span>}
    </div>
  );
}
