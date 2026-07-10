// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE — leadership, involvement, work, and awards.
//
// Mirrors the projects system: each entry has a short summary shown on the
// /experience list, and a full write-up on its own page at /experience/<slug>.
//
// Grouped by `category`. List newest / most important first within each group.
// ─────────────────────────────────────────────────────────────────────────────

export type ExperienceCategory = "leadership" | "work" | "award";

export interface ExperienceLink {
  label: string;
  href: string;
}

export interface Experience {
  slug: string;
  category: ExperienceCategory;
  // The role or award title.
  title: string;
  // Organization / institution.
  org: string;
  // Timeframe, e.g. "2025 – present" or "2024". Optional for awards.
  period?: string;
  // ONE line shown on the list page.
  summary: string;
  // Short tags (skills, focus areas). Optional.
  tags?: string[];
  // Optional outbound links (verification, org site).
  links?: ExperienceLink[];
  // Full write-up on the detail page. Each string is a paragraph.
  body: string[];
}

// Section headings for each category, in display order.
export const categoryOrder: { key: ExperienceCategory; heading: string }[] = [
  { key: "leadership", heading: "Leadership & Involvement" },
  { key: "work", heading: "Work" },
  { key: "award", heading: "Awards" },
];

export const experiences: Experience[] = [
  {
    slug: "mental-health-steward",
    category: "leadership",
    title: "Mental Health Steward, Computer Engineering",
    org: "Queen's University",
    period: "2025 – present",
    summary:
      "Faculty-appointed peer role supporting Computer Engineering students' wellbeing through graduation.",
    tags: ["Peer Support", "Mental Health Literacy", "Resource Navigation"],
    body: [
      "I serve as the Engineering Mental Health Steward for Computer Engineering at Queen's University — a role I hold through graduation, representing my discipline on student wellbeing.",
      "The work is about lowering the barrier to talking about mental health: facilitating peer support, normalizing conversations about wellbeing, and connecting students to the right campus services so they can actually access the help that exists.",
      "Along the way I've been building real skills in mental health literacy, supportive communication, and resource navigation — the kind of things that matter well beyond any one role.",
    ],
  },
  {
    slug: "vex-robotics",
    category: "leadership",
    title: "General Member — PCB & Software",
    org: "Queen's VEX Robotics Design Team",
    period: "Queen's University",
    summary:
      "Contributed to PCB design, then moved into the team's software department.",
    tags: ["PCB Design", "Robotics", "Embedded"],
    body: [
      "I joined the Queen's VEX Robotics design team as a general member and started on the hardware side, contributing to PCB design work for the team's robots.",
      "From there I moved into the team's software department, working on the code side of the robots. Spanning both the board and the software has been a hands-on way to see how the hardware and the logic driving it actually meet — which is exactly the kind of work I want to keep doing.",
    ],
  },
  {
    slug: "otis-orientation",
    category: "leadership",
    title: "Logistics & Operations Volunteer (OTIS)",
    org: "Queen's Engineering Orientation Week",
    period: "Queen's University",
    summary:
      "Coordinated logistics for 13 major orientation events serving 800+ incoming first-years.",
    tags: ["Event Operations", "Logistics", "Teamwork"],
    links: [
      {
        label: "About OTIS",
        href: "https://www.engsoc.queensu.ca/get-involved/orientation-week/",
      },
    ],
    body: [
      "As part of the OTIS team, I coordinated event logistics and equipment deployment across 13 major orientation events, helping ensure seamless transitions for over 800 incoming first-year students — including high-energy traditions like the Grease Pole and Highland Games.",
      "A lot of it was operating under tight schedules: venue setup and striking, managing participant flow and crowd control, and staying compliant with university facility guidelines. I also helped monitor safety on-site, acting as a point of contact for spotting and resolving logistical bottlenecks and hazards before they became problems.",
      "It ran on constant coordination — working alongside Orientation Leaders (FRECs) and EngSoc, and troubleshooting equipment and scheduling issues in real time over radio as they came up.",
    ],
  },
  {
    slug: "robotics-club-gm",
    category: "leadership",
    title: "General Manager, Robotics Club",
    org: "Huron Heights Secondary School",
    period: "2024 – 2025",
    summary:
      "Led robotics teams for design competitions, overseeing coding, prototyping, and battle-bot builds.",
    tags: ["Leadership", "Robotics", "Mentorship"],
    body: [
      "As General Manager of the robotics club, I organized and led teams for a range of design events and competitions — a role I grew into after placing 2nd in an in-school competition the year before.",
      "Day to day, that meant providing oversight and guidance on coding and prototype modifications to keep robot designs effective, and mentoring team members through the build process. I also stayed hands-on, contributing to the design of battle bots for interschool competitions.",
      "It was my first real taste of leading a technical team rather than just building on one, and it's a big part of what pointed me toward engineering.",
    ],
  },
  {
    slug: "asian-club-social",
    category: "leadership",
    title: "Social Media Manager, Asian Club",
    org: "Huron Heights Secondary School",
    summary:
      "Ran the club's Instagram and helped coordinate school-wide events like a bi-annual potluck.",
    tags: ["Social Media", "Event Coordination"],
    body: [
      "I ran the Instagram account for my high school's Asian Club, handling the club's online presence and promotion.",
      "Beyond posting, I helped coordinate school-wide events — including a bi-annual potluck — which meant turning online buzz into people actually showing up. It was a small role, but a real lesson in the gap between announcing something and making it happen.",
    ],
  },
  {
    slug: "peer-tutor",
    category: "leadership",
    title: "Peer Tutor",
    org: "Huron Heights Secondary School",
    period: "Grades 11 – 12",
    summary:
      "Tutored Math, Physics, Chemistry, and English through a school-affiliated program.",
    tags: ["Tutoring", "Communication"],
    body: [
      "Through a school-affiliated program, I tutored fellow students in Math, Physics, Chemistry, and English, and helped run the promotion that brought students in.",
      "Explaining technical ideas clearly to someone who's stuck is a skill in itself — and honestly one I still lean on. It's the same instinct behind the notes I keep on this site: if I can't explain it simply, I probably don't understand it well enough yet.",
    ],
  },
  {
    slug: "lifeguard",
    category: "work",
    title: "Lifeguard",
    org: "National Lifeguard & First Aid / CPR-C certified",
    period: "Jun – Aug 2025",
    summary:
      "Certified lifeguard responsible for patron safety and emergency response.",
    tags: ["National Lifeguard", "First Aid / CPR-C"],
    body: [
      "I worked as a certified lifeguard over the summer of 2025, holding National Lifeguard and First Aid / CPR-C certifications.",
      "It's a job with real responsibility — staying alert through long shifts, enforcing safety, and being ready to respond in an emergency. Not engineering, but it taught me a kind of steady, responsibility-first focus that carries over to everything else.",
    ],
  },
  {
    slug: "science-59-award",
    category: "award",
    title: "Science '59 Admission Award — $52,000",
    org: "Stephen J.R. Smith Faculty of Engineering and Applied Science, Queen's University",
    summary:
      "Major merit award for academic excellence, leadership, and community involvement.",
    tags: ["Merit Award", "Leadership"],
    body: [
      "The Science '59 Admission Award is a $52,000 award from the Stephen J.R. Smith Faculty of Engineering and Applied Science at Queen's University.",
      "It's granted on the basis of demonstrated financial need alongside academic excellence, proven leadership skills, and involvement in school or community activities, to students entering the first-year engineering program. Being recognized for the leadership and involvement side of it — not just grades — is the part I'm most proud of.",
    ],
  },
  {
    slug: "wcsboa-award",
    category: "award",
    title: "Waterloo County School Bus Operators' Association Award",
    org: "Awarded at high school graduation",
    summary:
      "Graduation award recognizing academic standing and regard among teachers and peers.",
    tags: ["Graduation Award"],
    body: [
      "Awarded at my high school graduation, this recognizes a graduate who has achieved good academic standing or personal achievement, is continuing to postsecondary education or an apprenticeship, and is held in high regard by teachers and peers.",
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function experiencesByCategory(category: ExperienceCategory) {
  return experiences.filter((e) => e.category === category);
}

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function allExperienceSlugs(): string[] {
  return experiences.map((e) => e.slug);
}
