"use client";

import { Star } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useAsideStore } from "@/store/aside.store";
import { Tooltip } from "@heroui/tooltip";

interface FavoriteButtonProps {
  noteId: string;
}

export function FavoriteButton({ noteId }: FavoriteButtonProps) {
  const isFavorite = useAsideStore((s) => s.isFavorite(noteId));
  const toggleFavorite = useAsideStore((s) => s.toggleFavorite);

  return (
    <Tooltip content="Agregar a favoritos">
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
