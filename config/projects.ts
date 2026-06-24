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

  // Outbound links for this project (repo, live demo, write-up, etc.).
  links?: ProjectLink[];

  // The long write-up shown on the project's own page. Plain paragraphs —
  // split into multiple strings and they'll render as separate <p>s.
  // This is where passion projects shine: tell the story.
  body: string[];
}

export const projects: Project[] = [
  {
    slug: "tidewatch",
    title: "Tidewatch",
    year: "2025",
    status: "in progress",
    blurb:
      "I kept missing low tide for tide-pooling, so I built a tiny dashboard that texts me the good windows.",
    stack: ["TypeScript", "Next.js", "NOAA API", "Cron"],
    links: [
      { label: "Source", href: "https://github.com/yourusername/tidewatch" },
    ],
    body: [
      "Tide-pooling is only good for about an hour around the lowest tides, and the best ones happen at inconvenient times. I was constantly checking tide charts and doing mental math, then forgetting anyway.",
      "Tidewatch pulls the NOAA tide predictions for my local station, finds the daytime low tides below a threshold, and sends me a text the evening before. The whole thing is a single cron job and about 200 lines.",
      "The interesting part turned out to be the time-zone and daylight-savings handling — NOAA returns times in station-local time, and getting the \"is this during daylight\" check right was fiddlier than the API call itself. I learned more about JavaScript date handling here than in years of regular work.",
    ],
  },
  {
    slug: "thirty-six-views",
    title: "Thirty-Six Views",
    year: "2024",
    status: "shipped",
    blurb:
      "A generative art piece that redraws the same hillside thirty-six different ways every time you reload.",
    stack: ["JavaScript", "Canvas", "Perlin noise"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Source", href: "https://github.com/yourusername/thirty-six-views" },
    ],
    body: [
      "Inspired by Hokusai's thirty-six views of Mount Fuji — the idea of returning to one subject again and again and finding it different each time.",
      "Each reload generates a single hillside from layered Perlin noise, then renders it in one of thirty-six palettes and weather conditions. No two are quite the same, but they're all recognizably the same hill.",
      "This was my first real dive into generative art, and the hardest lesson was restraint: my early versions threw every effect at the canvas at once. Cutting back until each piece had one idea is what made it feel composed instead of noisy.",
    ],
  },
  {
    slug: "claveau",
    title: "Claveau",
    year: "2023",
    status: "archived",
    blurb:
      "Custom keyboard firmware for a split board I built, with a layer layout tuned entirely to how my own hands move.",
    stack: ["C", "QMK", "Soldering"],
    links: [
      { label: "Write-up", href: "https://example.com/blog/claveau" },
    ],
    body: [
      "I built a split ergonomic keyboard from a kit, which meant I had to write my own firmware layout. That rabbit hole went deep.",
      "Claveau is my QMK configuration: a base layer plus three function layers reached with the thumbs, designed around the words and shortcuts I actually type most. I logged my own keypresses for a week first and laid out the keys to minimize finger travel for my real usage, not a generic average.",
      "I've since moved to a different board, so this is archived — but the process of measuring my own behavior and designing around the data, rather than around convention, is something I think about constantly now.",
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
