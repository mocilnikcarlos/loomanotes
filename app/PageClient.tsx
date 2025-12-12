"use client";

import { LoginGoogleButton } from "@/components/auth/login/ui/LoginGoogleButton";
import { useT } from "@/hooks/utils/useT";

export default function PageClient() {
  const { t } = useT();
  return (
    <h1>
      {t("dashboard.hello")}
      <LoginGoogleButton />
    </h1>
  );
}
