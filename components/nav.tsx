import Link from "next/link";
import { site } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

// Nav links. `external` items are plain <a> tags that open in a new tab
// (e.g. the resume, a static file in /public); the rest use Next's <Link>.
const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/experience" },
  { label: "Notes", href: "/notes" },
  { label: "Now", href: "/now" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
          {/* Full link row on md+; collapsed into a menu below that. */}
          <ul className="hidden items-center md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <MobileMenu items={navItems} />
        </div>
      </nav>
    </header>
  );
}
