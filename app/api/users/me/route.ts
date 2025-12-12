import { withAuth } from "@/lib/api/withAuth";
import { UserResponseSchema, UserUpdateSchema } from "@/lib/schemas/user";
import { NextResponse } from "next/server";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { adminSupabase } from "@/lib/supabase/admin";

export const GET = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const validated = UserResponseSchema.parse(data);

  return NextResponse.json(validated);
});

export const PATCH = withAuth(
  async ({ req, user, body }) => {
    const supabase = createRouteHandlerSupabase(req);

    const { error } = await supabase
      .from("users")
      .update(body)
      .eq("id", user.id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "updated" }, { status: 200 });
  },
  {
    bodySchema: UserUpdateSchema, // ← VALIDACIÓN AUTOMÁTICA
  }
);

export const DELETE = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  // 1) Borrar de la tabla users
  const { error: userDeleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", user.id);

  if (userDeleteError) {
    return NextResponse.json(
      { message: userDeleteError.message },
      { status: 400 }
    );
  }

  // 2) Borrar usuario en AUTH
  const { error: authDeleteError } = await adminSupabase.auth.admin.deleteUser(
    user.id
  );

  if (authDeleteError) {
    return NextResponse.json(
      { message: authDeleteError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "deleted" });
});
