import { redirect } from "next/navigation";
import { getUser } from "@/lib/services/users/getUser";
import UserProvider from "./UserProvider";
import { routes } from "@/utils/routes/route";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect(routes.auth.login);

  return (
    <UserProvider user={user}>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Aside */}
        <aside className="w-64 shrink-0 border-r border-border p-4">
          aside
        </aside>

        {/* Main column */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 shrink-0 border-b border-border px-6 flex items-center">
            header
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto flex w-full max-w-[1200px]">{children}</div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
}
