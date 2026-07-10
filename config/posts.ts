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
    slug: "building-this-site",
    title: "What building this site actually taught me",
    date: "2026-07-09",
    summary:
      "I set out to add a few things to my portfolio. What I actually learned was how to debug.",
    content: `
I started with a simple goal: put my projects online. What I didn't expect was that the building would be the easy part, and everything *around* it — git, deploys, moving files — would be where the real learning happened.

Here's what I added: five projects, screenshots, a working contact form, this Notes section, a "now" page, and a resume link. None of that was the hard part.

## The hard part

The bugs were the hard part, and they were rarely where I expected.

At one point I had *two copies* of my project on my laptop — one connected to git, one not — and couldn't figure out why my changes weren't showing up. I'd been editing the wrong folder.

Later, my updates kept not deploying even though every push "succeeded." Turns out a file was silently landing in the wrong place, so I was committing the old version over and over. The commit worked; the content was wrong. That one cost me a few rounds before I thought to actually *check what was in the file* instead of trusting that the commit did what I meant.

And a single stray \`=\` character at the top of a file broke an entire build. One character.

## What I'd tell myself at the start

Two things.

**Build locally before you push.** Running the build on my own machine catches errors in seconds. Pushing and waiting for the deploy to fail catches them in minutes, publicly. Green locally means green live — I proved it to myself enough times to trust it.

**Verify, don't assume.** When something "won't update" no matter how many times you push, stop pushing and go look at what's actually in the file. A commit succeeding doesn't mean it committed what you think.

## The Now page is the human part

There's one page here that isn't about code at all: the [Now page](/now). It's there because a portfolio can start to read like a spec sheet, and I'm more than one. I have thoughts, interests, and things I'm into this month — and I actually update it as they change.

So you'll find my current rotation there: Cyberpunk 2077 (hi, Johnny Silverhand), Friends (Thank you, Matthew Perry, for your sarcasm on the show), Lord Huron (yes, *that* song from 13 Reasons Why), and Fahrenheit 451 (whose themes feel a little too relevant lately). That mix probably says more about me than any project does.

The building taught me some things. The debugging taught me more. And the Now page is there to remind you there's a person behind all of it.
`.trim(),
  },
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
