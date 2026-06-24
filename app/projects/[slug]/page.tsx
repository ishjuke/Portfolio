import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, allSlugs } from "@/config/projects";

// Pre-render a static page for every project at build time.
export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

// Per-project <title> and description for SEO / link previews.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.blurb,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next.js 15, params is async — await it before use.
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to the log
      </Link>

      <header className="mt-10">
        <div className="eyebrow flex items-center gap-3">
          <span>{project.year}</span>
          <span className="text-border" aria-hidden>
            /
          </span>
          <span>{project.status}</span>
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {project.blurb}
        </p>

        {/* Stack */}
        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded bg-muted px-2 py-1 text-foreground/70"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Body */}
      <div className="mt-12 flex flex-col gap-5 text-[1.05rem] leading-relaxed">
        {project.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
