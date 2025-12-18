"use client";

import { LoginGoogleButton } from "@/components/auth/login/ui/LoginGoogleButton";
import { useT } from "@/hooks/utils/useT";

export default function PageClient() {
  return (
    <h1>
      Hola mundo
      <LoginGoogleButton />
    </h1>
  );
}
