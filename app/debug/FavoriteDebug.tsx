"use client";

import { useState } from "react";
import { useAsideStore } from "@/store/aside.store";

export default function FavoriteDebug() {
  const [noteId, setNoteId] = useState("");

  const favorites = useAsideStore((s) => s.favorites);
  const toggleFavorite = useAsideStore((s) => s.toggleFavorite);
  const isFavorite = useAsideStore((s) => s.isFavorite);

  return (
    <div className="space-y-4 border rounded p-4">
      <h2 className="text-lg font-medium">⭐ Favorite Debug</h2>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          placeholder="note id (uuid)"
          className="border px-2 py-1 rounded w-full"
        />

        <button
          onClick={() => toggleFavorite(noteId)}
          disabled={!noteId}
          className="px-3 py-1 rounded bg-primary text-primary-foreground"
        >
          Toggle
        </button>
      </div>

      {/* STATUS */}
      {noteId && (
        <div className="text-sm">
          Estado actual:{" "}
          <strong>{isFavorite(noteId) ? "⭐ favorita" : "no favorita"}</strong>
        </div>
      )}

      {/* STORE DUMP */}
      <div>
        <h3 className="text-sm font-medium">Store favorites</h3>
        <pre className="text-xs bg-muted p-2 rounded">
          {JSON.stringify(Array.from(favorites), null, 2)}
        </pre>
      </div>
    </div>
  );
}
