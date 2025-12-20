"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dropcursor from "@tiptap/extension-dropcursor";

import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { Block } from "./extensions/Block"; // ⬅️ NUEVO

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Tiptap({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  function wrapWithBlocks(content: any) {
    if (!content?.content) return content;

    return {
      type: "doc",
      content: content.content.map((node: any) => {
        if (node.type === "block") return node;

        return {
          type: "block",
          content: [node],
        };
      }),
    };
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Block,
      Dropcursor.configure({
        color: "rgba(255,255,255,0.4)",
        width: 2,
      }),
    ],
    content: initialContent
      ? wrapWithBlocks(initialContent)
      : {
          type: "doc",
          content: [
            {
              type: "block",
              content: [{ type: "paragraph" }],
            },
          ],
        },
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
