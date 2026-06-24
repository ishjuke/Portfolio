import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm text-foreground",
        "placeholder:text-muted-foreground",
        "focus:border-accent focus:outline-none focus-visible:outline-none",
        "transition-colors resize-y min-h-32",
        className,
      )}
      {...props}
    />
  );
}
