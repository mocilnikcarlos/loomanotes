import { getUser } from "@/lib/services/users/getUser";
import DebugClient from "./DebugClient";
import FavoriteDebug from "./FavoriteDebug";

export default async function DebugPage() {
  const user = await getUser();

  return (
    <>
      <DebugClient user={user} />
      <FavoriteDebug />
    </>
  );
}
