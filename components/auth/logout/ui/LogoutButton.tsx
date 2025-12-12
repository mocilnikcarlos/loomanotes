"use client";

import { logoutAction } from "@/app/auth/logout/action";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </form>
  );
}
