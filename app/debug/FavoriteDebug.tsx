"use client";

import { useState } from "react";
import { useAsideStore } from "@/store/aside.store";

export default function FavoriteDebug() {
  const [noteId, setNoteId] = useState("");
  const favorites = useAsideStore((s) => s.favorites);
  const setFavorites = useAsideStore((s) => s.setFavorites);

  async function addFavorite() {
    if (!noteId) return;

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        entity_type: "note",
        entity_id: noteId,
      }),
    });

    if (!res.ok) {
      console.error("POST failed");
      return;
    }

    // feedback local para debug
    setFavorites([...Array.from(favorites), noteId]);
  }

  async function removeFavorite() {
    if (!noteId) return;

    const res = await fetch(
      `/api/favorites?entity_type=note&entity_id=${noteId}`,
      { method: "DELETE" }
    );

    if (!res.ok) {
      console.error("DELETE failed");
      return;
    }

    // feedback local para debug
    const next = new Set(favorites);
    next.delete(noteId);
    setFavorites(Array.from(next));
  }

  return (
    <div className="space-y-4 border rounded p-4">
      <h2 className="text-lg font-medium">⭐ Favorite Debug (Happy Path)</h2>

      {/* INPUT */}
      <input
        value={noteId}
        onChange={(e) => setNoteId(e.target.value)}
        placeholder="note id (uuid)"
        className="border px-2 py-1 rounded w-full"
      />

      {/* ACTIONS */}
      <div className="flex gap-2">
        <button
          onClick={addFavorite}
          disabled={!noteId}
          className="px-3 py-1 rounded bg-green-600 text-white"
        >
          Agregar favorito (POST)
        </button>

        <button
          onClick={removeFavorite}
          disabled={!noteId}
          className="px-3 py-1 rounded bg-red-600 text-white"
        >
          Eliminar favorito (DELETE)
        </button>
      </div>

      {/* STORE */}
      <div>
        <h3 className="text-sm font-medium">Store favorites (debug)</h3>
        <pre className="text-xs bg-muted p-2 rounded">
          {JSON.stringify(Array.from(favorites), null, 2)}
        </pre>
      </div>

      {/* STATUS */}
      {noteId && (
        <div className="text-sm">
          Este ID en el store está:{" "}
          <strong>
            {favorites.has(noteId) ? "⭐ favorito" : "no favorito"}
          </strong>
        </div>
      )}
    </div>
  );
}
