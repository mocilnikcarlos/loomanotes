"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { Content } from "@tiptap/core";
import { createEditorExtensions } from "./extensions/editor.extensions";

type NoteRendererProps = {
  content: Content;
};

export function NoteRenderer({ content }: NoteRendererProps) {
  const editor = useEditor({
    extensions: createEditorExtensions(),
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="looma-note-renderer">
      <EditorContent editor={editor} />
    </div>
  );
}
