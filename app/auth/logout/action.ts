"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { routes } from "@/utils/routes/route";

export async function logoutAction() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect(routes.auth.login);
}
