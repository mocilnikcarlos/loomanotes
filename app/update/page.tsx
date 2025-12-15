import { getUser } from "@/lib/services/users/getUser";
import DebugClient from "../debug/DebugClient";

export default async function DebugPage() {
  const user = await getUser();

  return <DebugClient user={user} />;
}
