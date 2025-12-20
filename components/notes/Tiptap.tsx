"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";

import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { ParagraphWithBlock } from "./extensions/ParagraphWithBlock";

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Tiptap({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
      }),
      ParagraphWithBlock,
      Dropcursor,
    ],
    content: "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  if (!editor) return null;

  return (
    <div id="editor-drag-ghost-root">
      <EditorContent editor={editor} />
    </div>
  );
}
