import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/config/projects";

interface ProjectEntryProps {
  project: Project;
  number: string;
}

// One row in the project log. The whole row links to the project's page.
// The left "spine" number + monospace metadata is the field-notes signature.
// If the project has images, the first one shows as a thumbnail on the right
// (hidden on small screens to keep the log clean on phones).
export function ProjectEntry({ project, number }: ProjectEntryProps) {
  const thumbnail = project.images?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border-t border-border py-8 transition-colors first:border-t-0 hover:bg-muted/40"
    >
      <div className="grid grid-cols-[auto_1fr] gap-x-5 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6">
        {/* Spine: the entry number. */}
        <div className="font-mono text-sm text-muted-foreground tabular-nums">
          {number}
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {project.title}
              <ArrowUpRight className="ml-1 inline h-4 w-4 -translate-y-0.5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-1 group-hover:text-accent" />
            </h3>
            <span className="eyebrow shrink-0 pt-1">{project.year}</span>
          </div>

          <p className="mt-2 max-w-2xl text-[0.975rem] leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>

          {/* Metadata row: status + stack, all monospace. */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden
              />
              {project.status}
            </span>
            <span className="text-border" aria-hidden>
              /
            </span>
            <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded bg-muted px-1.5 py-0.5 text-foreground/70"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thumbnail: only when the project has an image, and only on ≥sm. */}
        {thumbnail && (
          <div className="hidden self-center overflow-hidden rounded-md border border-border bg-card sm:block">
            <Image
              src={thumbnail.src}
              alt={thumbnail.alt}
              width={176}
              height={112}
              className="h-[6.5rem] w-44 object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
