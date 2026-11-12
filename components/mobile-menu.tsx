"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { label: string; href: string; external?: boolean };

// Small-screen menu: a button that toggles a dropdown panel under the header.
// Closes when a link is tapped, on route change, or with Escape.
export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass =
    "block rounded-md px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-16 border-b border-border bg-background shadow-sm"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-3">
            {items.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
