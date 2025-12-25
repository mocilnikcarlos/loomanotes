// app/dashboard/note/[id]/page.tsx

import NoteRendererPageClient from "./NoteRendererTest";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NoteRendererPageClient id={id} />;
}
