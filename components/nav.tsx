import Link from "next/link";
import { site } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Mark / home link */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight"
        >
          <span className="grid h-7 w-7 place-items-center rounded bg-accent text-xs font-bold text-accent-foreground">
            {site.mark}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
