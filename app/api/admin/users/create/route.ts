import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/withAuth";
import { adminSupabase } from "@/lib/supabase/admin";

import { AdminCreateUserSchema, AdminCreateUser } from "@/lib/schemas/admin";
import {
  UserResponseSchema,
  UserPlanEnum,
  UserRoleEnum,
} from "@/lib/schemas/user";

export const POST = withAuth(
  async ({ body }) => {
    const payload = body as AdminCreateUser;

    // 0) ✔️ Verificar si ya existe un usuario en Auth con ese email
    const { data: existingAuthUsers } =
      await adminSupabase.auth.admin.listUsers();

    const existingAuth = existingAuthUsers?.users.find(
      (u) => u.email?.toLowerCase() === payload.email.toLowerCase()
    );

    let authUserId: string | null = null;

    if (existingAuth) {
      authUserId = existingAuth.id;
    } else {
      // 1) ✔️ Crear usuario en Auth (solo si no existe)
      const { data: authUser, error: authError } =
        await adminSupabase.auth.admin.createUser({
          email: payload.email,
          password: payload.password ?? crypto.randomUUID(),
          email_confirm: true,
          user_metadata: {
            full_name: payload.full_name,
            avatar_url: payload.avatar_url,
          },
        });

      if (authError || !authUser?.user) {
        return NextResponse.json(
          { message: authError?.message ?? "Error creating auth user" },
          { status: 400 }
        );
      }

      authUserId = authUser.user.id;
    }

    // 2) ✔️ Prevenir error de "duplicate key"
    const { data: existingUserRow } = await adminSupabase
      .from("users")
      .select("*")
      .eq("id", authUserId)
      .maybeSingle();

    if (existingUserRow) {
      // Ya existe → devolverlo normal
      const validated = UserResponseSchema.parse(existingUserRow);
      return NextResponse.json(
        {
          message: "User already existed (idempotent response)",
          user: validated,
        },
        { status: 200 }
      );
    }

    // 3) ✔️ Insertar fila en public.users (solo si NO existe)
    const { data: inserted, error: insertError } = await adminSupabase
      .from("users")
      .insert({
        id: authUserId,
        email: payload.email,
        full_name: payload.full_name ?? null,
        avatar_url: payload.avatar_url ?? null,
        plan: payload.plan ?? UserPlanEnum.enum.free,
        role: payload.role ?? UserRoleEnum.enum.user,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { message: insertError.message },
        { status: 400 }
      );
    }

    // 4) Validación final
    const validated = UserResponseSchema.parse(inserted);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: validated,
      },
      { status: 201 }
    );
  },
  {
    role: [UserRoleEnum.enum.admin],
    bodySchema: AdminCreateUserSchema,
  }
);
