import { EditableNoteTitle } from "./EditableNoteTitle";
import { ToolbarHeader } from "./ToolbarHeader";

interface HeaderNoteProps {
  noteId: string;
  title: string;
  onDraftChange: (next: string) => void;
  onCommitTitle: (final: string) => Promise<void> | void;
}

export function HeaderNote({
  noteId,
  title,
  onDraftChange,
  onCommitTitle,
}: HeaderNoteProps) {
  return (
    <div className="flex items-start gap-6 w-full px-[80px] mb-8">
      <div className="flex-1 min-w-0">
        <EditableNoteTitle
          value={title}
          onDraftChange={onDraftChange}
          onCommit={onCommitTitle}
        />
      </div>

      <div className="shrink-0">
        <ToolbarHeader noteId={noteId} />
      </div>
    </div>
  );
}
