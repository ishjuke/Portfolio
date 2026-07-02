import Link from "next/link";
import type { Metadata } from "next";
import { sortedPosts, formatDate } from "@/config/posts";

export const metadata: Metadata = {
  title: "Notes",
  description: "A running log of what I'm learning while I build.",
};

export default function NotesPage() {
  const posts = sortedPosts();

  return (
    <section className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <div className="mb-4 flex items-baseline gap-3">
        <h1 className="eyebrow">Notes</h1>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <p className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
        A running log of what I&apos;m learning while I build.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Nothing here yet — soon.</p>
      ) : (
        <ul className="flex flex-col">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/notes/${post.slug}`}
                className="group block border-t border-border py-6 transition-colors first:border-t-0 hover:bg-muted/40"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <span className="eyebrow shrink-0 pt-1">
                    {formatDate(post.date)}
                  </span>
                </div>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
