import { getUser } from "@/lib/services/users/getUser";
import { routes } from "@/utils/routes/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect(routes.auth.login);

  if (user.role !== "admin") {
    redirect(routes.dashboard.root); // adentro, pibe
  }

  return {children};
}
