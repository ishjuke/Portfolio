import { site } from "@/config/site";
import { Github, Linkedin, AtSign } from "lucide-react";

// Map of link keys → icon + label. Only entries with a non-empty URL render.
const socials = [
  { key: "github", label: "GitHub", icon: Github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "mastodon", label: "Mastodon", icon: AtSign },
  { key: "bluesky", label: "Bluesky", icon: AtSign },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">
          © {year} {site.name}
        </p>
        <ul className="flex items-center gap-1">
          {socials.map(({ key, label, icon: Icon }) => {
            const href = site.links[key as keyof typeof site.links];
            if (!href) return null;
            return (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-[1.15rem] w-[1.15rem]" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
