# Portfolio Revamp — "The Living Dashboard"

**Date:** 2026-07-14
**Owner:** Sarthak Sethi
**Repo:** Sarthak-Sethi28/Portfolio (deploys to sethisarthak.com)
**Status:** Design approved — pending spec review

## Problem

The current site (`sethisarthak.com`) is a long-scroll, cyber-neon single-page app: matrix text
effect, an animated 3D train riding a railway-timeline, glitch/scan overlays, and expandable
everything. It's impressive engineering but fights the reader — heavy motion, lots of scrolling,
and a cyan-on-black neon aesthetic that reads dated. The genuinely strong content (Waterloo,
Volaris/Constellation, Danier, Nokia, two 1st-place hackathon wins, real metrics) gets buried
under effects.

**Benchmark:** [silin.ca](https://silin.ca) — a calm, editorial, near-one-screen "dashboard as
portfolio." Its strengths: one screen with minimal scroll, editorial serif + monospace type
pairing, hairline bordered cards on warm-black, a single restrained accent, and small personality
touches. Its weakness: it is entirely **static** — nothing on the page actually does anything, and
its copy is vague ("making commerce better for everyone").

## Goal

Beat silin at his own game: a **refined editorial-dark, one-screen dashboard** that is
unmistakably Sarthak's, with **one live, dynamic signature** silin can't match — a real-time
GitHub activity pulse — and **proof-forward copy** that leads with metrics.

Success criteria:
- Reads as one intentional screen on desktop; only the projects column scrolls (silin's trick).
- Feels premium and calm — one accent, no neon, no gimmicks.
- The GitHub pulse shows **real** data and updates itself.
- A recruiter can grasp who Sarthak is, what he's shipped, and that he actively ships — at a glance.
- Built in React (existing stack) so changes are visible live in the browser.

## Non-goals

- No full rebuild/reframework. Stay on the current CRA + React + TS + Tailwind + Framer Motion stack.
- No multi-page routing. Single screen.
- Not copying silin's layout or palette — same *genre*, different execution and identity.

## Design

### Layout (desktop — one fixed viewport)

Three columns under a header bar. Header, Experience, and the GitHub Pulse are **fixed**; only the
Projects column scrolls internally.

```
┌───────────────────────────────────────────────────────────────────┐
│  HEADER BAR                                                         │
│  ⬡ Sarthak Sethi  ·  SWE / AI  @ UWaterloo      [gh][in][✉][resume] │
│  status pill: "Building @ Volaris · open to Summer 2026"            │
├────────────────────────┬────────────────────┬──────────────────────┤
│  EXPERIENCE (fixed)     │  PROJECTS (scroll) │  LIVE — GITHUB PULSE  │
│  · Volaris/Constellation│  · Muse Sketch 🏆   │  contribution heatmap │
│  · Danier               │  · Custom Chatbot  │  ↳ latest commits     │
│  · Prompt (Healthcare)  │  · Low-Stock Alert │  ↳ repos · stars      │
│  · Nokia                │  · CarRaksha 🏆     │  "live" pulse dot     │
│  · UWaterloo (edu)      │  · GIM · iMoney …  │                       │
└────────────────────────┴────────────────────┴──────────────────────┘
   footer: © 2026 · built in React · last deploy <date>
```

- **Mobile / narrow:** columns collapse to a single vertical stack in priority order
  (header → experience → projects → pulse → footer). This is the one place vertical scroll is
  expected; desktop stays fixed.
- **Breakpoint strategy:** 3-col at `lg+`, 2-col at `md` (pulse tucks under experience), 1-col below.

### Identity system

- **Type:** editorial serif for the name and section headers; monospace for tags, dates, metrics,
  and the pulse. High-contrast serif/mono pairing (the thing that makes silin look designed).
  Candidate fonts: a serif display (e.g. Instrument/Fraunces-style) + a mono (e.g. JetBrains Mono).
- **Accent — electric indigo:** `#6366F1` base, `#818CF8` hover/light. The *only* saturated color.
  Used for: the live dot, active/hover states, award badges, link hovers. No cyan, no amber, no
  gradients-as-decoration.
- **Surface:** true near-black (`#0A0A0B`-ish) with a very faint grid texture; cards are hairline
  `1px` bordered panels with subtle elevation on hover. Generous negative space.
- **Motion:** restrained. Fade/slide-in on load (Framer Motion), hover elevation, and the pulse's
  live animation. No looping decorative animation.
- **Monogram:** a small `⬡`/custom mark beside the name so the identity is ownable.

### The signature — Live GitHub Pulse

A fixed card (third column) pulling **real** data from `Sarthak-Sethi28`:
- Contribution heatmap (last ~3 months or 1 year condensed).
- Latest 3–5 public events/commits (repo name + message + relative time).
- Aggregate stats: public repos, total stars, followers.
- A pulsing "live" indicator conveying freshness.

**Data approach — serverless (approved):**
- A Vercel serverless function at `/api/github` runs on the server and holds a `GITHUB_TOKEN`
  environment variable (never exposed to the browser).
- It queries the GitHub **GraphQL** API for the real `contributionsCollection` calendar (only
  available with auth) and the **REST** API for recent events / repo + star counts.
- Response is normalized to a small JSON shape and cached (short TTL, e.g. 1 hour via
  `Cache-Control`) to stay well within rate limits.
- The React client fetches `/api/github` on mount and renders the pulse.
- **Graceful fallback:** if the function errors or the token is missing, the client renders a
  static snapshot (committed sample JSON) and hides the "live" dot, so the page never looks broken.

CRA static builds and Vercel `/api` functions coexist on the same deploy, so no framework change is
needed. The token is set as a Vercel project env var (documented in the repo, value not committed).

### Content freshening

Rewrite copy to be current and proof-forward:
- **Tense/dates:** Volaris/Constellation is *current* as of July 2026 (not "incoming"). Fix all
  tenses and date ranges.
- **Metrics first:** lead each experience/project line with the number — 1st place / 100,000+
  students (CarRaksha), 1st place / 100+ participants + $1,500 prize (Muse Sketch), 5,000+ users &
  +32% response efficiency (Prompt healthcare), −47% load time (Nokia), 100% alert reliability
  (Low-Stock), etc.
- Trim vague phrasing; one crisp line per item on the surface, detail on expand.

### Experience column

Compact fixed cards: logo/mark, role, company, date range, location, and a single metric-led line.
Curated order (strongest first): Volaris/Constellation → Danier → Prompt Solutions (Healthcare) →
Nokia → University of Waterloo (education badge). No auto-expanding-on-scroll behavior.

### Projects column (the only scroller)

All projects as hairline cards with: title, year, tech tags (mono), award/status badges
(1st Place, Hackathon Winner, Internal Tool), and a link (GitHub / demo / video). Reuse existing
`public/assets/projects` videos and images. Cards may expand in place for detail without navigating
away (secondary nicety; the *primary* signature remains the GitHub pulse).

### What gets removed

- `Background3D` (three.js) 3D scene, the animated 3D train + railway timeline, matrix text effect,
  glitch/scan overlays, the full EmailJS contact form.
- Replaced by: silin-style contact = email-copy button + social/resume links in the header.
- Dependencies that become unused (three, @react-three/*, maath, gsap, emailjs, react-parallax-tilt,
  etc.) are removed from `package.json` to slim the bundle.

## Tech / architecture

- **Stack:** unchanged — CRA (`react-scripts`), React 18, TypeScript, Tailwind, Framer Motion.
- **New:** `/api/github.ts` (Vercel serverless function); a `useGitHubPulse` hook; a `GitHubPulse`
  component; committed `src/data/github-fallback.json`.
- **Structure:** page composed of focused components — `Header`, `ExperienceColumn`,
  `ProjectsColumn` (+ `ProjectCard`), `GitHubPulse`, `Footer` — each independently understandable.
  Content (experience, projects, contact) lives in typed data modules, separate from presentation.
- **Config:** `GITHUB_TOKEN` as a Vercel env var; documented in `README`, value never committed.
- **Deploy:** Vercel, as today. Local dev via `npm start`; `/api` testable via `vercel dev`.

## Testing / verification

- Type-check + build pass (`npm run build`).
- Manual: load locally, confirm one-screen desktop layout, projects-only scroll, pulse renders with
  live data, fallback renders when token absent (simulate by unsetting env), responsive stack on
  mobile.
- Accessibility pass: keyboard focus order, contrast of indigo on near-black, reduced-motion respect.

## Open questions / to confirm during planning

- Exact serif + mono font choices (will propose specifics in the plan).
- Contribution window: 1 year vs. last 3 months for the heatmap.
- Whether to keep in-place project expand or just link out (silin-style) for maximum simplicity.
