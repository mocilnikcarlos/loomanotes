"use client";

import { Button } from "@/components/ui/Button";
import { useT } from "@/hooks/utils/useT";
import { createClientSupabase } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export function LoginGoogleButton() {
  const supabase = createClientSupabase();
  const { t } = useT();

  async function handleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <Button
      onClick={handleLogin}
      icon={<FcGoogle size={20} />}
      iconPosition="left"
    >
      {t("auth.login.buttonLogin")}
    </Button>
  );
}
