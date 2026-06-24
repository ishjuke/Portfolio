// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG
// Edit everything here first — this is the single source of truth for your
// name, the one-liner in the hero, and your links. Changing these updates the
// whole site (nav, hero, footer, metadata).
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Your name as it should appear in the nav and page title.
  name: "Your Name",

  // A short handle/initials shown in the nav mark. Keep it tiny (1–3 chars).
  mark: "YN",

  // The one-line thesis under your name in the hero. This is the most important
  // sentence on the site — say what you make and why it matters to you.
  tagline:
    "I build small things for the joy of it — and keep a log of what I learn.",

  // A slightly longer intro for the About section. 2–4 sentences.
  about:
    "I'm a developer who makes things outside of work because I can't help it. " +
    "These are passion projects — started from a specific itch, built mostly at " +
    "night, and shared here in roughly the order I made them. Some are finished, " +
    "some are perpetual works in progress. All of them taught me something.",

  // The email your contact form sends TO. Also shown as a mailto fallback.
  email: "you@example.com",

  // Social / external links. Remove any you don't want; the footer maps over them.
  links: {
    github: "https://github.com/yourusername",
    // Set any of these to "" to hide them.
    bluesky: "",
    linkedin: "https://www.linkedin.com/in/yourusername",
    mastodon: "",
  },

  // Used for SEO / Open Graph. Set to your real domain before deploying.
  url: "https://yourdomain.com",
} as const;

export type SiteConfig = typeof site;
