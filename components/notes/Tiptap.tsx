"use client";

import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Tiptap({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent ?? "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  if (!editor) return null;

  return (
    <div className="p-4">
      <EditorContent editor={editor} />
    </div>
  );
}
