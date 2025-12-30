"use client";

import Loader from "@/components/ui/Loader";
import { FileWarning, Image } from "lucide-react";
import FeedbackBanner from "../FeedbackBanner";
import { useT } from "@/hooks/utils/useT";

type Props = {
  loading: boolean;
  error: string | null;
  onPick: () => void;
};

export function ImageUploader({ loading, error, onPick }: Props) {
  const { t } = useT();

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
            <Image /> <span>{t("canvas.imageBlock.updateBlock.update")}</span>
          </>
        )}
      </button>
      {error && (
        <FeedbackBanner leading={<FileWarning />}>
          {t("canvas.imageBlock.errors.errorUpdate.errorDescription")}
        </FeedbackBanner>
      )}
    </div>
  );
}
