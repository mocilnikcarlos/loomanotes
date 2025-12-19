"use client";

import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";

import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import type { Block } from "@blocknote/core";
import "@/styles/blocknote.css";

type CanvasProps = {
  noteId: string;
  initialContent?: Block[] | null;
};

export function Canvas({ noteId, initialContent }: CanvasProps) {
  const editor = useCreateBlockNote({
    initialContent:
      initialContent && initialContent.length > 0
        ? initialContent
        : [{ type: "paragraph" }],
  });

  const save = useMemo(
    () =>
      debounce((document: unknown) => {
        fetch(`/api/notes/${noteId}/content`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: document }),
        });
      }, 800),
    [noteId]
  );

  useEditorChange((editor) => {
    save(editor.document);
  }, editor);

  useEffect(() => {
    return () => save.cancel();
  }, [save]);

  return (
    <div className="looma-editor">
      <BlockNoteView editor={editor} />
    </div>
  );
}
