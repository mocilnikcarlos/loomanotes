"use client";

import Loader from "@/components/ui/Loader";
import { FileWarning, Image } from "lucide-react";
import FeedbackBanner from "../FeedbackBanner";

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
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <Loader />
          </div>
        ) : (
          <>
            <Image /> <span>Subir imagen</span>
          </>
        )}
      </button>

      {error && (
        <FeedbackBanner leading={<FileWarning />}>
          Error al subir. Eliminá este bloque y volvé a intentar
        </FeedbackBanner>
      )}
    </div>
  );
}
