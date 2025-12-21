"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dropcursor } from "@tiptap/extensions";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import {
  ParagraphWithBlock,
  HeadingWithBlock,
} from "./extensions/ParagraphWithBlock";
import { AsideBlockMenu } from "./AsideBlockMenu";
import "@/styles/looma-blocks.css";

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
        heading: false,
      }),
      ParagraphWithBlock,
      HeadingWithBlock,
      Dropcursor,
    ],
    content: initialContent ?? "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  if (!editor) return null;

  return (
    <>
      {editor && (
        <div id="editor-drag-ghost-root">
          <AsideBlockMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </>
  );
}
