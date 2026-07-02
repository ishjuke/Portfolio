// ─────────────────────────────────────────────────────────────────────────────
// NOTES — your writing / blog.
//
// Each post is one object in the `posts` array below. The /notes page lists
// them, and each gets its own page at /notes/<slug>. To add a post, copy an
// existing object and edit it.
//
// The `content` field is MARKDOWN. You can use:
//   # Heading, ## Subheading
//   **bold**, *italic*, [links](https://example.com)
//   - bullet lists
//   `inline code` and fenced code blocks with ```
//   > blockquotes
//
// List newest first — the index shows them in array order.
// ─────────────────────────────────────────────────────────────────────────────

export interface Post {
  // URL-safe id. Becomes /notes/<slug>. Lowercase, hyphens, no spaces.
  slug: string;
  title: string;
  // ISO date, e.g. "2026-02-14". Used for display and sorting.
  date: string;
  // One-line summary shown on the index and in link previews.
  summary: string;
  // The post body, written in Markdown (see note above).
  content: string;
}

export const posts: Post[] = [
  {
    slug: "hello-notes",
    title: "Starting a notes section",
    date: "2026-02-14",
    summary:
      "Why I'm keeping a build log alongside the projects — and what I plan to write about.",
    content: `
I kept the projects on this site short on purpose — a blurb, a stack, a link. But the interesting part of building something is rarely the finished result. It's the wrong turns, the thing that took three hours to debug, the small realization that changes how you approach the next one.

So this is where that goes. **Notes** is a running log of what I'm learning while I build.

## What I'll write about

Mostly the stuff I wish someone had written down for me:

- Debugging sessions that taught me something non-obvious
- Decisions I made and whether they held up
- Small wins that felt bigger than they were

## Why bother

Writing something down forces you to actually understand it. If I can't explain why a fix worked, I probably got lucky rather than learning. These notes are the difference between the two.

First real post coming soon — likely about the [HTTP caching proxy](/projects/caching-proxy) I'm building in C.
`.trim(),
  },
];

// ── Helpers (you probably won't need to edit below this line) ────────────────

// Posts sorted newest-first by date.
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function allPostSlugs(): string[] {
  return posts.map((p) => p.slug);
}

// Format an ISO date like "2026-02-14" as "February 14, 2026".
export function formatDate(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
