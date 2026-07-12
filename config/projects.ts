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
    status: "shipped",
    blurb:
      "A caching reverse proxy in C on a Raspberry Pi 5 — measured ~29× higher throughput on cache hits (46k req/s), then went deeper: concurrency tradeoffs, eviction-policy failure cases, and hardening.",
    stack: ["C", "HTTP", "Raspberry Pi", "Sockets", "LRU Cache", "Benchmarking"],
    links: [
      { label: "Source", href: "https://github.com/ishjuke/caching-proxy" },
    ],
    body: [
      "I wanted to understand the layer between a browser and a server that CDNs and reverse proxies quietly handle, so I built one from scratch in C: an HTTP caching proxy that sits in front of an origin, caches responses in memory, and serves repeat requests itself. The core is a hash table with separate chaining (O(1) lookup) and LRU eviction via a doubly-linked recency list (O(1) evict), on a single-threaded socket server, running on a Raspberry Pi 5.",
      "The point was never just to build it — it was to measure it and find where the obvious choices break. Under 50 concurrent connections, cache hits served ~46,200 requests/sec versus ~1,600 for origin fetches: roughly a 29× throughput improvement. A hit is a pure in-memory hash lookup; a miss pays for a full round trip to the origin. The miss path is bottlenecked by the origin and the network, not the cache — which is exactly why CDNs exist.",
      "Then I pushed on the design and measured the results instead of assuming them. Adding a thread per connection turned out to be a tradeoff, not a win: it was worse for CPU-cheap cache hits (thread overhead dominates) but ~35% faster for I/O-bound misses (origin waits happen in parallel) — which points at a thread pool as the real fix. Swapping LRU for LFU was worse still under drifting popularity: LFU's hit rate collapsed to ~9.5% versus LRU's ~75%, because old frequency counts become permanent baggage that keeps stale entries resident.",
      "On top of the performance work, I hardened it: allocation-failure safety, socket timeouts, and truncation-safe caching to avoid caching partial responses (a cache-poisoning risk). Working this close to the metal in C — and benchmarking every change on real hardware rather than guessing — taught me the systems-performance reasoning the higher-level tools usually hide.",
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
  {
    slug: "led-display",
    title: "LED Light-Show Display",
    year: "2022",
    status: "shipped",
    blurb:
      "A microcontroller-driven LED display I designed in Proteus, built on a PCB, and programmed with an Arduino to run light-show patterns.",
    stack: ["Proteus", "PCB Design", "Arduino", "ATmega", "Electronics"],
    links: [
      { label: "Schematic", href: "/led-display-schematic.png" },
    ],
    body: [
      "One of my first end-to-end hardware builds: an ATmega-based LED display driving 17 individually-controlled LEDs, designed to run light-show patterns.",
      "I started in Proteus — laying out the microcontroller, a 16 MHz crystal, the USB-to-TTL programming header, the reset circuit, and 17 current-limited LEDs (220Ω each) — then took the design off the screen and built it on a PCB. Later I programmed it with an Arduino to actually drive the patterns.",
      "It was the first time I took something all the way from schematic to physical board to running code, and it's a big part of why I ended up in Computer Engineering. The design earned full marks.",
    ],
  },
  {
    slug: "555-timer-circuits",
    title: "555 Timer Circuits",
    year: "2023",
    status: "shipped",
    blurb:
      "Two 555-based circuits I designed and built on breadboard — a blinking LED and a light-reactive screaming siren — documented in a full technical report.",
    stack: ["555 Timer", "Breadboarding", "Analog Electronics", "Tinkercad"],
    links: [
      { label: "Report (PDF)", href: "/555-timer-report.pdf" },
      { label: "Blinking LED demo", href: "https://youtube.com/shorts/61e0ZH50hLk?feature=share" },
      { label: "Siren demo", href: "https://youtu.be/BN8TTKlZRMk" },
    ],
    body: [
      "For a technical electronics course, I designed and built two circuits around the 555 timer IC, then wrote them up in a full report — schematics, component lists, a pin-by-pin breakdown of the 555, build photos, and demo videos.",
      "The first was a blinking LED using the 555 in astable mode. The second was more fun: a \"screaming siren\" driving a piezo speaker through a photoresistor, so the sound changed with the light hitting it — brighter light, louder siren.",
      "Getting from a working simulation to a circuit that actually ran on a physical breadboard — chasing down the small wiring mistakes that only show up in real hardware — was the real lesson. My teacher's note on the report: \"an excellent effort.\"",
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