import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus:border-accent focus:outline-none focus-visible:outline-none",
        "transition-colors",
        className,
      )}
      {...props}
    />
  );
}
