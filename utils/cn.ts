import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusiona clases de forma segura.
 * - clsx para lógica condicional
 * - tailwind-merge para resolver conflictos de Tailwind
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
