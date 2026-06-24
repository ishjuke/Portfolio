import { site } from "@/config/site";

export function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-5xl px-6 py-16 sm:py-20"
    >
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="eyebrow">About</h2>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <p className="max-w-prose font-display text-2xl leading-snug tracking-tight sm:text-3xl">
        {site.about}
      </p>
    </section>
  );
}
