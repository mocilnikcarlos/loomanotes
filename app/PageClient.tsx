"use client";

import { LoginGoogleButton } from "@/components/auth/login/ui/LoginGoogleButton";
import { useT } from "@/hooks/utils/useT";

export default function PageClient() {
  return (
    <div className="bg-bg_image bg-center bg-no-repeat bg-cover h-screen h-min-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center border border-white rounded-xl gap-6 w-[500px] h-[350px] backdrop-blur-xs bg-black/8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center">
          Captura ideas, libera tu mente.
        </h1>
        <p className="text-foreground text-xl text-center max-w-md">
          Looma Notes es el espacio minimalista diseñado para organizar tus
          pensamientos sin distracciones.
        </p>

        <LoginGoogleButton />
      </div>
    </div>
  );
}
