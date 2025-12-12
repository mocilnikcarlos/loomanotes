"use client";

import { useState } from "react";
import { updateUser } from "@/hooks/users/me/updateUser";
import { deleteUser } from "@/hooks/users/me/deleteUser";
import type { UserResponse } from "@/lib/schemas/user";

export default function DebugClient({ user }: { user: UserResponse | null }) {
  const [fullName, setFullName] = useState(user?.full_name ?? "");

  async function handleUpdate() {
    try {
      const res = await updateUser({ full_name: fullName });
      alert("Usuario actualizado ✔");
      console.log(res);
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("Error desconocido");
      }
    }
  }

  async function handleDelete() {
    if (!confirm("¿Seguro que querés eliminar tu cuenta?")) return;

    try {
      const res = await deleteUser();
      alert("Cuenta eliminada ✔");
      console.log(res);
      window.location.href = "/";
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("Error desconocido");
      }
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Debug User</h1>

      <pre
        style={{
          padding: 20,
          background: "#111",
          color: "#0f0",
          marginBottom: 20,
        }}
      >
        {JSON.stringify(user, null, 2)}
      </pre>

      <div style={{ marginBottom: 20 }}>
        <label>Nombre:</label>
        <input
          style={{ marginLeft: 10, padding: 5 }}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <button
        style={{ padding: "10px 20px", marginRight: 10 }}
        onClick={handleUpdate}
      >
        Guardar cambios
      </button>

      <button
        style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
        onClick={handleDelete}
      >
        Eliminar cuenta
      </button>
    </div>
  );
}
