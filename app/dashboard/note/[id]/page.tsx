// app/dashboard/note/[id]/page.tsx
export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Note</h1>
      <p>ID: {id}</p>
    </div>
  );
}
