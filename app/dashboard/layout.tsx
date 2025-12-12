// app/dashboard/layout.tsx
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

  return <UserProvider user={user}>{children}</UserProvider>;
}
