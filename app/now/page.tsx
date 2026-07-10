import type { Metadata } from "next";
import Image from "next/image";
import {
  updated,
  intro,
  sections,
  lookingFor,
  type NowSection,
} from "@/config/now";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm focused on right now.",
};

export default function NowPage() {
  return (
    <section className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <div className="mb-4 flex items-baseline gap-3">
        <h1 className="eyebrow">Now</h1>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
        {intro}
      </p>
      <p className="eyebrow mt-3">Updated {updated}</p>

      <div className="mt-12 flex flex-col gap-12">
        {sections.map((section) => (
          <SectionBlock key={section.heading} section={section} />
        ))}
      </div>

      {/* Looking-for highlight */}
      <div className="mt-14 rounded-lg border border-border bg-card p-6">
        <p className="eyebrow mb-2">Looking for</p>
        <p className="text-lg leading-relaxed">{lookingFor}</p>
      </div>
    </section>
  );
}

function SectionBlock({ section }: { section: NowSection }) {
  // Album art is square; books/shows are portrait (the default).
  const aspectClass =
    section.frame === "square" ? "aspect-square" : "aspect-[3/4]";

  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-tight">
        {section.heading}
      </h2>

      {section.layout === "list" ? (
        <ul className="mt-4 flex flex-col gap-2">
          {section.items.map((item) => (
            <li key={item.label} className="leading-relaxed">
              {item.label}
              {item.detail && (
                <span className="text-muted-foreground"> — {item.detail}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {section.items.map((item) => (
            <figure
              key={item.label}
              className="flex flex-col gap-2 overflow-hidden"
            >
              {item.image ? (
                <div
                  className={`${aspectClass} overflow-hidden rounded-md border border-border bg-card`}
                >
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                // No cover yet → clean text tile, not a broken image box.
                <div
                  className={`${aspectClass} flex items-center justify-center rounded-md border border-border bg-muted p-3 text-center`}
                >
                  <span className="font-display text-sm font-medium leading-snug">
                    {item.label}
                  </span>
                </div>
              )}
              <figcaption className="text-sm leading-snug">
                {item.label}
                {item.detail && (
                  <span className="block text-muted-foreground">
                    {item.detail}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
