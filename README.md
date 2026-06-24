# Portfolio — "Field Notes"

A personal portfolio for passion projects, built with **Next.js (App Router)**,
**TypeScript**, **Tailwind CSS**, and a working contact form powered by
**[Resend](https://resend.com)**. Designed to be deployed free on **Vercel**.

Your projects are presented as a numbered "log" — a maker's record of what
you've built and why. Light + dark mode included.

---

## Quick start

You'll need [Node.js](https://nodejs.org) 18.18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables (for the contact form)
cp .env.example .env.local
#    …then open .env.local and fill in your values (see "Contact form" below).
#    The site runs fine without this — only the contact form needs it.

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>. Edits hot-reload as you save.

---

## Make it yours (in order)

Everything you need to change lives in two files:

### 1. `config/site.ts`

Your name, the one-line tagline in the hero, your About paragraph, your email,
and your social links. Start here.

### 2. `config/projects.ts`

This is the core. Each project is one object in the `projects` array. To add a
project, copy an existing object and edit its fields:

- `slug` — the URL (`/projects/your-slug`). Lowercase, hyphens, no spaces.
- `title`, `year`, `status` — shown in the log and on the project page.
- `blurb` — **one sentence**: what itch were you scratching?
- `stack` — tools/tech, shown as tags.
- `links` — repo, live demo, write-up (optional).
- `body` — the long write-up on the project's own page. Each string in the
  array becomes a paragraph. This is where passion projects shine — tell the
  story of why you built it.

**List newest first.** Entry numbers (01, 02, …) are assigned automatically so
the log reads oldest-to-newest as it grows.

### 3. Colors and fonts (optional)

- **Colors:** all design tokens are at the top of `app/globals.css`
  (`:root` for light mode, `.dark` for dark mode). The cobalt `--accent` is the
  one bold color — change it and the whole site re-themes.
- **Fonts:** swap the three `next/font/google` imports in `app/layout.tsx`
  (display / body / mono).

---

## Contact form

The form posts to `app/api/contact/route.ts`, which emails you via Resend. The
API key stays server-side and is never exposed to the browser.

1. Create a free account at <https://resend.com> and make an API key.
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY` — your key.
   - `CONTACT_TO_EMAIL` — the inbox that should receive messages.
   - `CONTACT_FROM_EMAIL` — leave as `onboarding@resend.dev` for testing; once
     you verify your own domain in Resend, use an address on that domain.
3. Restart `npm run dev`.

For production, add these same three variables in your Vercel project under
**Settings → Environment Variables**, then redeploy.

---

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. Go to <https://vercel.com>, import the repo, and accept the defaults
   (Vercel auto-detects Next.js).
3. Add your environment variables (see above) before or right after the first
   deploy.
4. Done — Vercel gives you a live URL and redeploys on every push to `main`.

To use a custom domain, add it in the Vercel project's **Domains** tab.

---

## Project structure

```
app/
  layout.tsx              Root layout: fonts, theme, nav, footer, metadata
  page.tsx                Homepage (stacks the sections)
  globals.css             Design tokens (colors) + base styles
  not-found.tsx           404 page
  projects/[slug]/page.tsx  Individual project pages
  api/contact/route.ts    Contact form handler (Resend)
components/
  hero.tsx, projects-section.tsx, project-entry.tsx,
  about-section.tsx, contact-section.tsx, nav.tsx, footer.tsx,
  theme-toggle.tsx
  ui/                     Small primitives (button, input, textarea)
config/
  site.ts                 Your name, bio, links  ← edit
  projects.ts             Your projects          ← edit
providers/theme-provider.tsx   Dark-mode wrapper
lib/utils.ts              cn() class helper
```

---

## Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the local dev server            |
| `npm run build` | Production build                      |
| `npm run start` | Serve the production build locally    |
| `npm run lint`  | Run ESLint                            |

Built as a starting point — bend it into your own thing.
