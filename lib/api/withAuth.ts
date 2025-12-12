// lib/api/withAuth.ts
import { NextResponse } from "next/server";
import { getUser } from "@/lib/services/users/getUser";
import { assertRole, assertPlan } from "@/lib/auth/access";
import type { UserResponse } from "@/lib/schemas/user";
import { UserRoleEnum, UserPlanEnum } from "@/lib/schemas/user";
import type { ZodSchema } from "zod";
import { z } from "zod";

// ------------------------
// TIPOS
// ------------------------
type Options<BodySchema extends ZodSchema | undefined = undefined> = {
  role?: Array<z.infer<typeof UserRoleEnum>>;
  plan?: Array<z.infer<typeof UserPlanEnum>>;
  bodySchema?: BodySchema;
};

type InferBody<T> = T extends ZodSchema ? z.infer<T> : undefined;

type DefaultParams = Record<string, never>;

export type RouteParams<T extends Record<string, string> = DefaultParams> = {
  params: T;
};

// ------------------------
// WITHAUTH
// ------------------------
export function withAuth<
  BodySchema extends ZodSchema | undefined = undefined,
  Params extends Record<string, string> = DefaultParams
>(
  handler: (args: {
    req: Request;
    user: UserResponse;
    body: InferBody<BodySchema>;
    params: Params;
  }) => Promise<Response>,
  options: Options<BodySchema> = {}
) {
  return async function (
    req: Request,
    context: RouteParams<Params>
  ): Promise<Response> {
    const params = (await context?.params) ?? ({} as Params);

    // 1. AUTH
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. ROLE
    if (options.role) {
      try {
        assertRole(user, options.role);
      } catch {
        return NextResponse.json(
          { message: "Forbidden: role" },
          { status: 403 }
        );
      }
    }

    // 3. PLAN
    if (options.plan) {
      try {
        assertPlan(user, options.plan);
      } catch {
        return NextResponse.json(
          { message: "Forbidden: plan" },
          { status: 403 }
        );
      }
    }

    // 4. BODY
    let parsedBody: InferBody<BodySchema> = undefined as InferBody<BodySchema>;

    if (options.bodySchema) {
      try {
        const json = await req.json();
        parsedBody = options.bodySchema.parse(json) as InferBody<BodySchema>;
      } catch (error) {
        return NextResponse.json(
          { message: "Invalid body", error: `${error}` },
          { status: 400 }
        );
      }
    }

    // 5. LLAMAR HANDLER
    return handler({
      req,
      user,
      body: parsedBody,
      params,
    });
  };
}
