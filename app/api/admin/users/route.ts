import { withAuth } from "@/lib/api/withAuth";
import { adminSupabase } from "@/lib/supabase/admin";
import { UserRoleEnum } from "@/lib/schemas/user";

export const GET = withAuth(
  async () => {
    const { data, error } = await adminSupabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json(data, { status: 200 });
  },
  {
    role: [UserRoleEnum.enum.admin],
  }
);
