"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { AsideBlockMenu } from "./ui/blockmenu/AsideBlockMenu";
import { SlashMenuOverlay } from "./ui/SlashMenuOverlay";
import { createEditorExtensions } from "./extensions/editor.extensions";
import { useEffect } from "react";
import { SelectionToolbar } from "./ui/toolbar/SelectionToolbar";

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Canvas({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  const editor = useEditor({
    extensions: createEditorExtensions(),
    content: initialContent ?? "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  useEffect(() => {
    if (!editor) return;

    const clearMarksIfEmpty = () => {
      const { state } = editor;
      const isEmpty = state.doc.textContent.length === 0;

      if (isEmpty) {
        const tr = state.tr.setStoredMarks([]);
        editor.view.dispatch(tr);
      }
    };

    editor.on("update", clearMarksIfEmpty);

    return () => {
      editor.off("update", clearMarksIfEmpty);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <>
      {editor && (
        <div id="editor-drag-ghost-root">
          <SlashMenuOverlay editor={editor} />
          <AsideBlockMenu editor={editor} />
          <SelectionToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </>
  );
}
