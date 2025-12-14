// app/dashboard/notebook/[id]/page.tsx
export default async function NotebookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Notebook</h1>
      <p>ID: {id}</p>
    </div>
  );
}
