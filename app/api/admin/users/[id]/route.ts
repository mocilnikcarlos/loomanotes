import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/withAuth";
import { adminSupabase } from "@/lib/supabase/admin";
import { UserRoleEnum, UserResponseSchema } from "@/lib/schemas/user";
import { AdminUpdateUserSchema, AdminUpdateUser } from "@/lib/schemas/admin";

export const DELETE = withAuth(
  async ({ params }) => {
    const userId = params.id;

    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const { error: authError } =
      await adminSupabase.auth.admin.deleteUser(userId);

    if (authError && !authError.message.includes("not found")) {
      return NextResponse.json({ message: authError.message }, { status: 400 });
    }

    const { error: dbError } = await adminSupabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (dbError) {
      return NextResponse.json({ message: dbError.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  },
  {
    role: [UserRoleEnum.enum.admin],
  }
);

export const PATCH = withAuth(
  async ({ params, body }) => {
    const userId = params.id;
    const payload = body as AdminUpdateUser;

    if (!userId) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    // 1) ✔️ Actualizar METADATA en Auth
    const { error: authError } = await adminSupabase.auth.admin.updateUserById(
      userId,
      {
        email: payload.email,
        password: payload.password,
        user_metadata: {
          full_name: payload.full_name ?? undefined,
          avatar_url: payload.avatar_url ?? undefined,
        },
      }
    );

    if (authError) {
      return NextResponse.json({ message: authError.message }, { status: 400 });
    }

    // 2) ✔️ Actualizar tabla public.users
    const { data: updatedRow, error: dbError } = await adminSupabase
      .from("users")
      .update({
        full_name: payload.full_name ?? null,
        avatar_url: payload.avatar_url ?? null,
        plan: payload.plan,
        role: payload.role,
      })
      .eq("id", userId)
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ message: dbError.message }, { status: 400 });
    }

    // 3) Validación final
    const validated = UserResponseSchema.parse(updatedRow);

    return NextResponse.json(
      {
        message: "User updated successfully",
        user: validated,
      },
      { status: 200 }
    );
  },
  {
    role: [UserRoleEnum.enum.admin],
    bodySchema: AdminUpdateUserSchema,
  }
);
