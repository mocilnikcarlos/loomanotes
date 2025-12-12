"use client";

import { createClientSupabase } from "@/lib/supabase/client";

export function LoginGoogleButton() {
  const supabase = createClientSupabase();

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 rounded bg-black text-white"
    >
      Continuar con Google
    </button>
  );
}
