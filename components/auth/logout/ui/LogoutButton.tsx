"use client";

import { logoutAction } from "@/app/auth/logout/action";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit">Cerrar sesión</Button>
    </form>
  );
}
