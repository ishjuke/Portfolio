// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG
// Edit everything here first — this is the single source of truth for your
// name, the one-liner in the hero, and your links. Changing these updates the
// whole site (nav, hero, footer, metadata).
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Your name as it should appear in the nav and page title.
  name: "Ishan Bijukuchhay",

  // A short handle/initials shown in the nav mark. Keep it tiny (1–3 chars).
  mark: "IB",

  // The one-line thesis under your name in the hero. This is the most important
  // sentence on the site — say what you make and why it matters to you.
  tagline:
    "Learning by building — these are the projects that taught me something.",

  // A slightly longer intro for the About section. 2–4 sentences.
  about:
    "I'm Ishan — a student who builds things to understand how they work. " +
    "Some of these started at hackathons, others as coursework I pushed past " +
    "the assignment, but they all began with a real problem worth solving. " +
    "Each one taught me something I couldn't have picked up from a tutorial. " +
    "When I'm not building, I'm usually working out at the gym, immersing " +
    "myself in a book or a game, listening to music, or out exploring " +
    "somewhere new.",

  // The email your contact form sends TO. Also shown as a mailto fallback.
  email: "ishanbijukuchhay@gmail.com",

  // Social / external links. Remove any you don't want; the footer maps over them.
  links: {
    github: "https://github.com/ishjuke",
    // Set any of these to "" to hide them.
    bluesky: "",
    linkedin: "https://www.linkedin.com/in/ishan-bijukuchhay/",
    mastodon: "",
  },

  // Used for SEO / Open Graph. Set this to your real Vercel URL once you've
  // picked the final name (e.g. https://ishjuke.vercel.app).
  url: "https://ishjuke.vercel.app",
} as const;

export type SiteConfig = typeof site;