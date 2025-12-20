"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dropcursor } from "@tiptap/extensions";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { ParagraphWithBlock } from "./extensions/ParagraphWithBlock";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical } from "lucide-react";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

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
    content: initialContent ?? "<p></p>",
    immediatelyRender: false,
    onUpdate,
  });

  if (!editor) return null;

  return (
    <div id="editor-drag-ghost-root">
      {editor && (
        <>
          <DragHandle editor={editor}>
            <ButtonIcon
              variant="ghost"
              className="cursor-grab"
              icon={<GripVertical size={14} />}
              tabIndex={-1}
            />
          </DragHandle>
          <EditorContent editor={editor} />
        </>
      )}
    </div>
  );
}
