"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dropcursor } from "@tiptap/extensions";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import {
  ParagraphWithBlock,
  HeadingWithBlock,
  BulletListWithBlock,
  BlockquoteWithBlock,
} from "./extensions/ParagraphWithBlock";
import { AsideBlockMenu } from "./ui/AsideBlockMenu";
import "@/styles/looma-blocks.css";
import { SlashCommand } from "./extensions/SlashCommand";
import { SlashMenuOverlay } from "./ui/SlashMenuOverlay";

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
        bulletList: false,
        blockquote: false,
      }),
      ParagraphWithBlock,
      HeadingWithBlock,
      BulletListWithBlock,
      BlockquoteWithBlock,
      SlashCommand,
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
          <SlashMenuOverlay editor={editor} />
          <AsideBlockMenu editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}
    </>
  );
}
