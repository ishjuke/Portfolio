import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import {
  categoryOrder,
  experiencesByCategory,
  type Experience,
} from "@/config/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Leadership, involvement, work, and awards.",
};

export default function ExperiencePage() {
  return (
    <section className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <div className="mb-4 flex items-baseline gap-3">
        <h1 className="eyebrow">Experience</h1>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <p className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Where I&apos;ve led, contributed, worked, and been recognized — on
        campus and before it.
      </p>

      <div className="flex flex-col gap-14">
        {categoryOrder.map(({ key, heading }) => {
          const items = experiencesByCategory(key);
          if (items.length === 0) return null;
          return (
            <div key={key}>
              <h2 className="eyebrow mb-2">{heading}</h2>
              <div>
                {items.map((exp) => (
                  <ExperienceRow key={exp.slug} exp={exp} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <Link
      href={`/experience/${exp.slug}`}
      className="group block border-t border-border py-6 transition-colors first:border-t-0 hover:bg-muted/40"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
          {exp.title}
          <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-0.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-accent" />
        </h3>
        {exp.period && (
          <span className="eyebrow shrink-0 pt-1">{exp.period}</span>
        )}
      </div>

      <p className="mt-1 font-mono text-xs text-muted-foreground">{exp.org}</p>

      <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
        {exp.summary}
      </p>

      {exp.tags && exp.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          {exp.tags.map((tag) => (
            <li
              key={tag}
              className="rounded bg-muted px-1.5 py-0.5 text-foreground/70"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
