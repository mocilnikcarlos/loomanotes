"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { AsideBlockMenu } from "./ui/AsideBlockMenu";
import { SlashMenuOverlay } from "./ui/SlashMenuOverlay";
import { createEditorExtensions } from "./extensions/editor.extensions";
import { TextSelectionToolbar } from "./ui/popovertoolbar/TextSelectionToolbar";

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Tiptap({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  const editor = useEditor({
    extensions: createEditorExtensions(),
    content: initialContent ?? "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  if (!editor) return null;

  return (
    <>
      {editor && (
        <div id="editor-drag-ghost-root">
          <SlashMenuOverlay editor={editor} />
          <AsideBlockMenu editor={editor} />
          <TextSelectionToolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </>
  );
}
