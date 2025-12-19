"use client";

import { useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import type { Block } from "@blocknote/core";
import { loomaSchema } from "@/lib/blocknote/schema";

import "@blocknote/mantine/style.css";
import "@/styles/looma-editor-clean.css";

type CanvasProps = {
  noteId: string;
  initialContent?: Block[] | null;
};

export function Canvas({ noteId, initialContent }: CanvasProps) {
  const editor = useCreateBlockNote({
    schema: loomaSchema,
    initialContent: initialContent?.length
      ? initialContent
      : [{ type: "paragraph" }],
    dictionary: {
      placeholders: {
        default: "Escribe tu nota...",
      },
    } as any,
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
    if (editor) {
      save(editor.document);
    }
  }, editor);

  useEffect(() => {
    return () => save.cancel();
  }, [save]);

  if (!editor) return null;

  return (
    <BlockNoteView
      editor={editor}
      sideMenu={false}
      slashMenu={false}
      formattingToolbar={false}
      linkToolbar={false}
      filePanel={false}
      tableHandles={false}
      className="looma-editor--clean text-foreground"
    />
  );
}
