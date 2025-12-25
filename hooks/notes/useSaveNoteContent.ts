"use client";

import { useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import type { Editor } from "@tiptap/core";

const SAVE_DELAY = 800;

export function useSaveNoteContent(noteId: string) {
  const saveRef = useRef(
    debounce(async (editor: Editor) => {
      const content = editor.getJSON();

      try {
        const res = await fetch(`/api/notes/${noteId}/content`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("Save error:", error);
        }
      } catch (err) {
        console.error("Network error saving note:", err);
      }
    }, SAVE_DELAY)
  );

  const onUpdate = useCallback(({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();

    // Garantizar que el documento nunca quede vacío
    if (!json.content || json.content.length === 0) {
      editor.commands.setContent({
        type: "doc",
        content: [{ type: "paragraph" }],
      });
      return;
    }

    saveRef.current(editor);
  }, []);

  return { onUpdate };
}
