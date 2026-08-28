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
    slug: "stm32-drivers",
    title: "Bare-Metal STM32 Driver Stack",
    year: "2026",
    status: "shipped",
    blurb:
      "A from-scratch driver stack for the STM32F401RE (Cortex-M4) in C — no HAL, no CubeMX, no vendor libraries. Five milestones from a hand-written C runtime to an I2C sensor read, then extended with SysTick, an 84 MHz clock tree, and DMA — every peripheral verified against a physical stimulus.",
    stack: ["C", "ARM Cortex-M4", "STM32", "Bare-Metal", "I2C", "DMA", "Logic Analyzer"],
    links: [
      { label: "Source", href: "https://github.com/ishjuke/stm32-drivers" },
    ],
    body: [
      "A bare-metal driver stack for the STM32F401RE, written in C with no HAL, no CubeMX-generated code, and no vendor libraries — every register write derived directly from RM0368 and the datasheet. The point wasn't to make an LED blink. It was to build the layer underneath the layer most embedded projects start from — the linker script, the vector table, the C runtime — and then to prove each piece works rather than assume it does because the output looked right.",
      "The foundation came first: a hand-written linker script, startup code, and my own C runtime (initializing memory before main), verified with GDB plus a poison-and-restore negative control — deliberately corrupting state to confirm the test could actually catch a failure. Then register-level GPIO (timing measured on a logic analyzer), UART transmit (verified by disassembling the flashed ELF and decoding the wire), interrupt-driven UART receive with a lock-free ring buffer, and finally an I2C driver reading a real BME280 environmental sensor — verified by breathing on it and watching humidity spike and decay back to baseline, a shape no stuck register can fake.",
      "The recurring bug in the I2C work was the useful kind: a poll predicate true both before and after a conversion, returning stale data instantly, and only 'working' because unrelated debug prints delayed it. The fix is a principle — wait for the edge, not the level, because the edge is the event. And a wedged bus with no error flag was diagnosed entirely from register state, by reasoning that the slave had physically ACKed (which no dead wire can fake), ruling out hardware without touching the bench.",
      "After shipping the five milestones, I kept extending it: a SysTick millisecond time base (replacing the busy-wait, with non-blocking sampling), a clock-tree bump from 16 to 84 MHz via the PLL, and DMA-driven UART transmit. The clock change exposed how three peripheral constants were all silently derived from the old clock and had to be rederived together; the DMA work turned on a single non-obvious field (CHSEL) whose reset value silently routes the wrong request line with no error at all. SPI was dropped deliberately — the sensor breakout doesn't bring the needed pin to the header, so it wasn't worth soldering to the chip package for marginal gain.",
      "Everything was built, flashed, and debugged from a Raspberry Pi 5 over SSH, with a logic analyzer for verification. The through-line across all of it: a correct-looking output is never evidence that the mechanism producing it is correct. You prove it with controls, edges, disassembly, and physical stimulus — and sometimes by checking for what should be absent (like the DMA transfer showing zero inter-byte stretch, proving the controller never once arrived late) rather than only what should be present.",
    ],
  },
{
    slug: "caching-proxy",
    title: "HTTP Caching Proxy",
    year: "2026",
    status: "shipped",
    blurb:
      "A caching reverse proxy in C on a Raspberry Pi 5, built four ways and benchmarked head-to-head — the study wasn't 'which is fastest,' it was how to measure honestly and how much the answer depends on what you optimize for.",
    stack: ["C", "HTTP", "Raspberry Pi", "epoll", "Concurrency", "Benchmarking", "Sockets"],
    images: [
      { src: "/caching-proxy-benchmark.png", alt: "LRU vs LFU hit-rate comparison: LRU holds 75% under drifting popularity while LFU collapses to 9.5%" },
      { src: "/caching-proxy-throughput.png", alt: "wrk benchmark across four concurrency architectures on a Raspberry Pi 5" },
    ],
    links: [
      { label: "Source", href: "https://github.com/ishjuke/caching-proxy" },
    ],
    body: [
      "A mini CDN: an HTTP caching reverse proxy in C on a Raspberry Pi 5. Requests hit an in-memory cache — a hash table (djb2, separate chaining) for O(1) lookup and an LRU list for O(1) eviction — and misses are forwarded to an nginx origin, cached, and relayed. The point was never just to build one, though. It was to build it four different ways, benchmark them rigorously against each other, and understand why they differ.",
      "First the cache itself: a hit (in-memory lookup + memcpy) served ~29× the throughput of a miss (a full origin round-trip). Then eviction policy — I implemented LFU alongside LRU and compared hit rates across workloads. LFU wins under stable popularity, but under drifting popularity it collapses to ~9.5% versus LRU's ~75%: old frequency counts become permanent baggage that can't be evicted while newly-hot items never build up. That's why production caches use adaptive policies like ARC and LRU-K rather than committing to either extreme.",
      "Then the core of the project: four concurrency architectures sharing that cache — single-threaded, thread-per-connection, a fixed thread pool with a job queue, and a single-threaded epoll event loop (the way nginx works, driving both client and origin sockets through one state machine without ever blocking). Each was a response to what the previous one's benchmarks revealed.",
      "Halfway through, an experienced reviewer flagged that my benchmarks were flawed — so I rebuilt the methodology and re-measured. The load generator had been running on the same 4-core Pi as the proxy (contaminating every result); the origin was Python's http.server (so miss numbers measured Python's ceiling, not my proxy); and connections closed after every request (so a TCP handshake dominated each measurement). I moved load generation off-box over verified Ethernet, swapped in nginx, and added HTTP keep-alive. The tell that the original numbers were wrong: they violated Little's Law by 3–14×. The corrected numbers reconcile — at 50 connections and 62,304 req/s, Little's Law predicts 802µs latency and I measured 793µs.",
      "The corrected results reframed everything: there is no single 'fastest' architecture. Thread-per-connection had the highest peak throughput; the thread pool scaled the flattest and most predictably; and epoll had by far the best tail latency (1.57ms p99 at 50 connections versus tenths of a second for the others) and zero socket errors — which is exactly why production servers use an event loop. 'Fastest' turned out to be the wrong question: peak throughput, predictable scaling, and tail latency each point at a different design, and you only see it by measuring the distribution under load, not the headline number. I documented the correctness gaps honestly too — no TTL, no request coalescing, epoll origin keep-alive left as future work — because a caching proxy has requirements beyond raw speed.",
            "Since shipping the five milestones, I've kept extending it: a SysTick millisecond time base replacing the busy-wait (with wraparound-safe timing and non-blocking sampling), and a clock-tree bump from 16 to 84 MHz via the PLL — which exposed how three separate peripheral constants were all silently derived from the old clock, and had to be rederived together. SPI and DMA are next.",
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
      "It was a team project — a group of five, with a project manager coordinating us — and I worked on the React front end and the API integration: the interface where you enter an activity, get an estimated CO₂e value, and watch your cumulative impact build through an interactive dashboard, plus lower-carbon recommendations to help you make more informed decisions.",
      "To make it stick, we added a social layer: a friends leaderboard, week-over-week comparisons, and an activity feed that surfaces who's cut their footprint the most. Turning a solo tracker into something a little competitive was meant to make sustainable habits easier to keep.",
      "The prototype came together with a React front end talking to a Python and Flask backend that handled the emissions estimates. Getting the front end and the API to agree on how data flowed — my main piece — was where most of the real learning happened, and where an idea on paper became something that actually ran.",
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