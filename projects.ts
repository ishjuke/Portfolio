// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS — the heart of the portfolio.
//
// Each project is one object in the `projects` array below. The homepage maps
// over this list to render the "log", and each project also gets its own page
// at /projects/<slug>. To add a project, copy an existing object and edit it.
//
// Order matters: list NEWEST FIRST. The entry numbers (01, 02, …) are assigned
// automatically based on position, counting up from the oldest, so your log
// reads like a chronological record of what you've made.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = "shipped" | "in progress" | "archived" | "experiment";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectImage {
  // Path to an image in the /public folder, written from the root.
  // e.g. a file at public/ecotrack.png is referenced as "/ecotrack.png".
  src: string;
  // Short description of what the screenshot shows (used as the caption
  // and for accessibility). Keep it to a few words.
  alt: string;
}

export interface Project {
  // URL-safe id. Becomes /projects/<slug>. Lowercase, hyphens, no spaces.
  slug: string;
  title: string;
  year: string;
  status: ProjectStatus;

  // ONE sentence. The hook. What itch were you scratching?
  blurb: string;

  // Technologies / tools used. Shown as monospace tags.
  stack: string[];

  // Screenshots shown on the project's own page. Leave the array out entirely
  // (or empty) for projects with no images yet — the page handles that fine.
  images?: ProjectImage[];

  // Outbound links for this project (repo, live demo, write-up, etc.).
  links?: ProjectLink[];

  // The long write-up shown on the project's own page. Plain paragraphs —
  // split into multiple strings and they'll render as separate <p>s.
  // This is where passion projects shine: tell the story.
  body: string[];
}

export const projects: Project[] = [
  {
    slug: "caching-proxy",
    title: "HTTP Caching Proxy",
    year: "2026",
    status: "in progress",
    blurb:
      "A mini CDN built in C — a caching reverse proxy I'm running on a Raspberry Pi 5 to see how much real throughput a cache actually buys you.",
    stack: ["C", "HTTP", "Raspberry Pi", "Sockets"],
    links: [
      { label: "Source", href: "https://github.com/ishjuke/caching-proxy" },
    ],
    body: [
      "I wanted to understand what actually happens between a browser and a server — the layer that CDNs and reverse proxies quietly handle — so I'm building one from scratch in C: an HTTP caching proxy that sits in front of an origin server, caches responses, and serves repeat requests itself.",
      "The interesting question isn't just whether it works, but how much it helps. I'm running it on a Raspberry Pi 5 and measuring throughput with and without the cache, so the payoff is a real number on real hardware rather than a hand-wave about caching being 'faster.'",
      "Working this close to the metal in C — managing sockets, parsing HTTP by hand, deciding what's safe to cache and for how long — is teaching me the things the higher-level tools usually hide.",
    ],
  },
  {
    slug: "ecotrack",
    title: "EcoTrack",
    year: "2026",
    status: "shipped",
    blurb:
      "A carbon-footprint tracker that turns everyday choices into CO₂e estimates, so making sustainable decisions doesn't require a research project.",
    stack: ["React", "JavaScript", "Python", "Flask", "HTML", "CSS"],
    images: [
      { src: "/ecotrack-calculator.png", alt: "EcoTrack carbon footprint calculator" },
      { src: "/ecotrack-comparison.png", alt: "Weekly comparison and dashboard summary" },
      { src: "/ecotrack-leaderboard.png", alt: "Friends leaderboard and activity feed" },
    ],
    links: [
      { label: "Source", href: "https://github.com/andesc2007/apsc103" },
    ],
    body: [
      "Built at Queen's University for APSC 103, EcoTrack started from a problem a lot of students share: wanting to make more sustainable choices, but not having a simple way to understand the environmental impact of everyday actions.",
      "So we built a web tool that lets users estimate and monitor their carbon emissions across categories like product purchases, transportation, and household energy use. You enter an activity, get an estimated CO₂e value, and watch your cumulative impact build up through an interactive dashboard — plus lower-carbon recommendations to help you make more informed decisions.",
      "To make it stick, we added a social layer: a friends leaderboard, week-over-week comparisons, and an activity feed that surfaces who's cut their footprint the most. Turning a solo tracker into something a little competitive was meant to make sustainable habits easier to keep.",
      "The prototype came together with a React front end talking to a Python and Flask backend that handled the emissions estimates. Wiring the two halves together — getting the front end and the API to agree on how data flowed — was where most of the real learning happened, and where an idea on paper became something that actually ran.",
    ],
  },
  {
    slug: "aitivity",
    title: "AItivity",
    year: "2025",
    status: "shipped",
    blurb:
      "A hackathon build with a team — an AI productivity tool that helps people carve focus out of overloaded schedules.",
    stack: ["TypeScript"],
    links: [
      { label: "Source", href: "https://github.com/danii-ree/AItivity" },
    ],
    body: [
      "AItivity was built with a team during a hackathon, around a problem everyone in the room recognized: busy schedules make it hard to be productive, and generic to-do apps don't really help.",
      "The idea was an AI-assisted productivity website that works with how people actually plan their days, rather than handing them another empty list to fill in.",
      "Beyond the build itself, the project was a lesson in collaboration under a deadline — splitting the work across a team, merging everyone's pieces into one thing that ran, and shipping something real in the time we had. That pressure taught me as much as the code did.",
    ],
  },
];

// ── Helpers (you probably won't need to edit below this line) ────────────────

// Newest-first display, but numbered oldest-first so the log counts up over time.
export function numberedProjects() {
  const total = projects.length;
  return projects.map((project, i) => ({
    project,
    // i = 0 is the newest → highest number; last item → 01.
    number: String(total - i).padStart(2, "0"),
  }));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allSlugs(): string[] {
  return projects.map((p) => p.slug);
}
