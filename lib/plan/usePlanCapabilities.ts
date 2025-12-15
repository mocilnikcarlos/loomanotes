"use client";

import { useUser } from "@/context/user/UserContext";

type Params = {
  looseNotesCount?: number;
};

export function usePlanCapabilities(params?: Params) {
  const user = useUser();

  const looseNotesCount = params?.looseNotesCount ?? 0;

  const isFree = user?.plan === "free";
  const isPremium = user?.plan === "premium";

  const MAX_FREE_NOTES = 3;

  const canCreateNote =
    isPremium || (isFree && looseNotesCount < MAX_FREE_NOTES);

  const canCreateNotebook = isPremium;

  return {
    // info
    isFree,
    isPremium,

    // creación
    canCreateNote,
    canCreateNotebook,

    // visualización
    canViewNotes: true,
    canViewNotebooks: true,

    // acciones
    canMoveNotes: true,
    canRenameNote: isPremium,
    canDeleteNote: isPremium,
    canRenameNotebook: isPremium,
    canDeleteNotebook: isPremium,
  };
}
