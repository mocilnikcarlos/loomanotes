"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { useEffect, useState } from "react";

export function ButtonSwitchTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ← evita el hydration mismatch

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ButtonIcon
      variant="ghost"
      aria-label="Cambiar tema"
      onClick={toggleTheme}
      icon={theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    />
  );
}
