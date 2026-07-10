import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  getExperience,
  allExperienceSlugs,
} from "@/config/experience";

export function generateStaticParams() {
  return allExperienceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperience(slug);
  if (!exp) return {};
  return {
    title: exp.title,
    description: exp.summary,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exp = getExperience(slug);

  if (!exp) notFound();

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <Link
        href="/experience"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All experience
      </Link>

      <header className="mt-10">
        {exp.period && <p className="eyebrow">{exp.period}</p>}
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {exp.title}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {exp.org}
        </p>

        {exp.tags && exp.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2 font-mono text-xs">
            {exp.tags.map((tag) => (
              <li
                key={tag}
                className="rounded bg-muted px-2 py-1 text-foreground/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {exp.links && exp.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {exp.links.map((link) => (
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

      <div className="mt-10 flex flex-col gap-5 text-[1.05rem] leading-relaxed">
        {exp.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
