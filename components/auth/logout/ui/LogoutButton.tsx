"use client";

import { logoutAction } from "@/app/auth/logout/action";
import { Button } from "@/components/ui/Button";
import { useT } from "@/hooks/utils/useT";

export function LogoutButton() {
  const { t } = useT();

  return (
    <form action={logoutAction}>
      <Button type="submit">{t("auth.logout.buttonLogout")}</Button>
    </form>
  );
}
