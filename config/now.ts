// ─────────────────────────────────────────────────────────────────────────────
// NOW — a snapshot of what I'm focused on right now.
//
// Inspired by nownownow.com. Update this whenever your focus shifts — the point
// is that it stays current. Bump `updated` when you do.
//
// Each item can optionally carry a cover image (book cover, album art, etc.).
// Drop the file in /public and set `image` to its path (e.g. "/f451.jpg").
// Until then, items render as clean text tiles — no broken placeholders.
// ─────────────────────────────────────────────────────────────────────────────

export interface NowItem {
  // Main label — a title, an activity, a name.
  label: string;
  // Optional secondary detail — an author, an artist, a note.
  detail?: string;
  // Optional cover image in /public (e.g. "/covers/f451.jpg"). Leave out for now.
  image?: string;
}

export interface NowSection {
  heading: string;
  // "list"   → simple text list (for focus areas, no covers)
  // "covers" → grid of cover cards (for books, games, shows, music)
  layout: "list" | "covers";
  // For "covers" sections: the shape of each card's image frame.
  // "portrait" (default) suits books/shows; "square" suits album art.
  frame?: "portrait" | "square";
  items: NowItem[];
}

// When you last updated this page. Shown at the top.
export const updated = "July 2026";

// A short line at the top of the page.
export const intro =
  "What I'm focused on at the moment — updated every so often.";

export const sections: NowSection[] = [
  {
    heading: "Working on",
    layout: "list",
    items: [
      { label: "Getting ahead on second-year coursework" },
      { label: "An HTTP caching proxy in C", detail: "on a Raspberry Pi 5" },
      { label: "This portfolio", detail: "always tinkering" },
    ],
  },
  {
    heading: "Learning",
    layout: "list",
    items: [
      { label: "C and low-level systems", detail: "from the proxy" },
      { label: "C fundamentals", detail: "working through Coddy" },
      { label: "Web development", detail: "from building this site" },
    ],
  },
  {
    heading: "Reading",
    layout: "covers",
    frame: "portrait",
    items: [
      {
        label: "Fahrenheit 451",
        detail: "Ray Bradbury",
        image: "/fahrenheit_451.jpg",
      },
      {
        label: "Friends, Lovers, and the Big Terrible Thing",
        detail: "Matthew Perry",
        image: "/friends_book.jpg",
      },
    ],
  },
  {
    heading: "Playing",
    layout: "covers",
    frame: "portrait",
    items: [
      { label: "Minecraft", image: "/minecraft.jpg" },
      { label: "Cyberpunk 2077", image: "/cyberpunk-2077.jpg" },
      { label: "Animal Crossing", image: "/animal_crossing.jpg" },
    ],
  },
  {
    heading: "Watching",
    layout: "covers",
    frame: "portrait",
    items: [
      { label: "Friends", image: "/friends_cast.jpg" },
      { label: "The Office", image: "/the_office.jpg" },
    ],
  },
  {
    heading: "Listening to",
    layout: "covers",
    frame: "square",
    items: [
      { label: "Pink Floyd", image: "/pink_floyd.jpg" },
      { label: "Oasis", image: "/oasis.jpg" },
      { label: "Lord Huron", image: "/lord_huron.jpg" },
      { label: "Tame Impala", image: "/tame_impala.jpg" },
    ],
  },
];

// A single highlighted line for what you're currently after.
export const lookingFor = "A Summer 2027 hardware/firmware engineering internship.";