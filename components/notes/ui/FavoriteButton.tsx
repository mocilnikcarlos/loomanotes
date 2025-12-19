"use client";

import { Star } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useAsideStore } from "@/store/aside.store";
import { Tooltip } from "@heroui/tooltip";
import { useT } from "@/hooks/utils/useT";

interface FavoriteButtonProps {
  noteId: string;
}

export function FavoriteButton({ noteId }: FavoriteButtonProps) {
  const isFavorite = useAsideStore((s) => s.isFavorite(noteId));
  const toggleFavorite = useAsideStore((s) => s.toggleFavorite);
  const { t } = useT();

  return (
    <Tooltip content={t("dashboard.note.tooltipFavorite")}>
      <ButtonIcon
        aria-label="Toggle favorite"
        onClick={() => toggleFavorite(noteId)}
        icon={
          <Star
            className={
              isFavorite ? "fill-primary text-primary" : "text-foreground"
            }
          />
        }
      />
    </Tooltip>
  );
}
