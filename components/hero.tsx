import { site } from "@/config/site";
import { projects } from "@/config/projects";

export function Hero() {
  const count = projects.length;

  return (
    <section className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:pt-28">
      <div className="animate-fade-up">
        <p className="eyebrow mb-6">
          Field notes — {count} selected {count === 1 ? "project" : "projects"}
        </p>

        <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          {site.name}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {site.tagline}
        </p>

        <div className="mt-10 flex items-center gap-5">
          <a
            href="#work"
            className="text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            See the work ↓
          </a>
          <span className="h-4 w-px bg-border" aria-hidden />
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
