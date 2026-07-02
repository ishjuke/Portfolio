import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getPost, allPostSlugs, formatDate } from "@/config/posts";
import { Markdown } from "@/components/markdown";

// Pre-render a static page for every post at build time.
export function generateStaticParams() {
  return allPostSlugs().map((slug) => ({ slug }));
}

// Per-post <title> and description for SEO / link previews.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // In Next.js 15, params is async — await it before use.
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <Link
        href="/notes"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All notes
      </Link>

      <header className="mt-10">
        <p className="eyebrow">{formatDate(post.date)}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
      </header>

      {/* Rendered Markdown body */}
      <div className="mt-8 text-[1.05rem]">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
