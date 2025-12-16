// app/dashboard/note/[id]/page.tsx
import NotePageClient from "./NotePageClient";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NotePageClient id={id} />;
}
