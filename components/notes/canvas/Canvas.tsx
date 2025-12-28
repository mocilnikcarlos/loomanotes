"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useSaveNoteContent } from "@/hooks/notes/useSaveNoteContent";
import { AsideBlockMenu } from "./ui/blockmenu/AsideBlockMenu";
import { SlashMenuOverlay } from "./ui/SlashMenuOverlay";
import { createEditorExtensions } from "./extensions/editor.extensions";
import { useEffect } from "react";
import { SelectionToolbar } from "./ui/toolbar/SelectionToolbar";
import { useT } from "@/hooks/utils/useT";

type Props = {
  noteId: string;
  initialContent?: any;
};

export default function Canvas({ noteId, initialContent }: Props) {
  const { onUpdate } = useSaveNoteContent(noteId);

  const { t } = useT();

  const editor = useEditor({
    extensions: createEditorExtensions({
      paragraph: t("canvas.placeholder.paragraph"),
      heading: t("canvas.placeholder.heading"),
      bulletItem: t("canvas.placeholder.bullet"),
      orderedItem: t("canvas.placeholder.ordered"),
      taskItem: t("canvas.placeholder.task"),
      blockquote: t("canvas.placeholder.blockquote"),
      codeBlock: t("canvas.placeholder.code"),
    }),
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
