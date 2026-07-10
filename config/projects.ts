=// ─────────────────────────────────────────────────────────────────────────────
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
  // e.g. a file at public/ecotrack.jpeg is referenced as "/ecotrack.jpeg".
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
      { src: "/ecotrack-calculator.jpeg", alt: "EcoTrack carbon footprint calculator" },
      { src: "/ecotrack-comparison.jpeg", alt: "Weekly comparison and dashboard summary" },
      { src: "/ecotrack-leaderboard.jpeg", alt: "Friends leaderboard and activity feed" },
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
      "A hackathon build with a team — an AI-assisted day planner that helps people carve focus out of overloaded schedules.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "OpenAI"],
    links: [
      { label: "Live", href: "https://a-itivity.vercel.app" },
      { label: "Source", href: "https://github.com/danii-ree/AItivity" },
    ],
    body: [
      "AItivity was built with a team during a hackathon, around a problem everyone in the room recognized: busy schedules make it hard to be productive, and generic to-do apps don't really help.",
      "It's a calendar-based day planner with its own user accounts, layering OpenAI on top so the app can actually help you shape a day rather than just handing you another empty list to fill in. The stack came together fast over a weekend: a Next.js and TypeScript front end, Supabase for auth and data, and the OpenAI API for the assistance.",
      "I worked on the front end — building out the interface and the calendar views that everything else plugged into. Beyond the code, the project was a lesson in collaboration under a deadline: splitting the work across a team, merging everyone's pieces into one thing that ran, and shipping something real in the time we had. That pressure taught me as much as the building did.",
    ],
  },
  {
    slug: "maze-robot",
    title: "Light-Following Maze Robot",
    year: "2024",
    status: "shipped",
    blurb:
      "A class-project robot that reads light with photoresistors and steers itself through a guided maze.",
    stack: ["Arduino", "Microcontroller", "Photoresistors", "Soldering"],
    body: [
      "A class project built around a simple idea: give a robot eyes made of light. Using a microcontroller and photoresistors, it senses differences in light and reacts to them, following a guided path through a maze rather than being told where to go.",
      "This was hands-on embedded work — wiring and soldering the sensors, reading their analog values, and translating \"it's brighter over there\" into motor commands that actually kept the robot on track. Tuning the thresholds so it reacted reliably instead of twitching at every shadow was the real challenge, and where I learned how forgiving software has to be when the input comes from the messy physical world.",
      "I wrote a full report on this one at the time — I'm digging it up to link here, along with photos of the build.",
    ],
  },
  {
    slug: "battle-robot",
    title: "Battle Robot",
    year: "2024",
    status: "shipped",
    blurb:
      "An Arduino-driven combat robot built from second-hand parts and woodworking — took 2nd place, and led to me running the robotics club.",
    stack: ["Arduino", "Electronics", "Woodworking"],
    body: [
      "In grade 11, I built a battle robot for an in-school robotics competition out of an Arduino, second-hand materials, and a fair amount of woodworking. Working within those constraints — making salvaged parts and scrap into something that could actually take a hit and keep moving — was most of the fun and most of the learning.",
      "It placed 2nd in the competition, which I'm still proud of given what it was made from. More importantly, it's what pulled me deeper into the club: the next year, in grade 12, I became its General Manager.",
      "This was the project that hooked me on building physical things — the moment where electronics, code, and a pile of materials became a machine that did something. Photos of the build are coming once I dig them out of my archives.",
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