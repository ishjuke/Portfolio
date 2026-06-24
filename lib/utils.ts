import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge conditional + Tailwind classes without conflicts.
// e.g. cn("px-2", isActive && "text-accent", className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
