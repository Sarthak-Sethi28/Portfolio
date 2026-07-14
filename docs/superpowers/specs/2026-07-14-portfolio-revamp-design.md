# Portfolio Revamp — "The Living Dashboard"

**Date:** 2026-07-14
**Owner:** Sarthak Sethi
**Issue:** Sarthak-Sethi28/Portfolio#1
**Repo:** Sarthak-Sethi28/Portfolio (deploys to sethisarthak.com)
**Status:** Spec finalized (rated 10/10) — ready for planning

## Problem

The current site is a long-scroll, cyber-neon SPA: matrix text effect, an animated 3D train on a
railway timeline, glitch/scan overlays (three.js), and a full EmailJS contact form. Heavy motion,
lots of scrolling, and a dated cyan-neon aesthetic bury genuinely strong content (Waterloo,
Volaris/Constellation, Danier, Nokia, two 1st-place hackathon wins, real metrics).

**Benchmark:** [silin.ca](https://silin.ca) — a calm, editorial, near-one-screen "dashboard as
portfolio." Strengths: one screen, editorial serif + mono type, hairline cards on warm-black, one
restrained accent, small personality touches. Weakness: entirely **static** (nothing on the page
does anything) with vague copy ("making commerce better for everyone").

## Goals

- One intentional **fixed desktop screen**; only the Projects column scrolls internally.
- **Refined editorial dark** identity that is unmistakably Sarthak's (near-black, hairline cards,
  serif + mono, single **electric-indigo** accent).
- One live signature silin can't match: a **real-time GitHub Pulse**.
- **Proof-forward copy** — every line leads with a metric.
- Built in the existing React stack; changes visible live via `npm start`.

## Non-goals

- No framework change (stay on CRA + React 18 + TS + Tailwind + Framer Motion).
- No multi-page routing.
- Not copying silin's layout/palette — same genre, different execution.
- No CMS / no auth / no analytics backend.

## Key decisions (resolved)

| Decision | Choice |
|---|---|
| Accent | Electric indigo `#6366F1` (hover `#818CF8`) — the only saturated color |
| Fonts | Serif display **Fraunces**, body **Inter**, mono **JetBrains Mono** — self-hosted via `@fontsource*` (no external requests) |
| Contact | GitHub + LinkedIn + click-to-copy email + resume download. **No phone.** |
| Public email | `s36sethi@uwaterloo.ca` |
| Pulse source | `github.com/Sarthak-Sethi28` |
| GitHub data | Vercel serverless `/api/github` with server-side `GITHUB_TOKEN`; committed fallback snapshot |
| Scroll rule | Strict projects-only scroll at viewport height ≥ 820px; below that, whole page scrolls gracefully (no clipping) |
| Resume | Replace with Sarthak's **new** resume PDF; delete old copies (see Assets) |
| Projects shown | 6 strongest (drop the meta "Personal Portfolio Website" entry) |

## Architecture

Single page composed of focused, independently-understandable components. Content lives in typed
data modules, fully separated from presentation. GitHub logic is a **pure, testable** module wrapped
by a thin serverless handler.

```
src/
  data/
    profile.ts        # name, role, links, contact, status
    experience.ts     # Experience[]
    projects.ts       # Project[]
    github-fallback.json  # committed snapshot for offline/error
  lib/
    github.ts         # pure: query builders + normalizeGitHub(raw) -> Pulse
  hooks/
    useGitHubPulse.ts # fetches /api/github, falls back to github-fallback.json
  components/
    Header.tsx        ExperienceColumn.tsx   ExperienceRow.tsx
    ProjectsColumn.tsx  ProjectCard.tsx
    GitHubPulse.tsx   ContributionHeatmap.tsx
    Footer.tsx
  pages/Home.tsx      # composes the 3-column grid
api/
  github.ts           # Vercel function: calls GitHub w/ token, uses lib/github, caches
```

Removed: `Background3D.tsx`, train/matrix/glitch code, `pages/{About,Contact,Projects,Skillverse,
NotFound}.tsx` and unused `components/*` (Fuzzy/Glitch/Cyber/Skill*/GradientText/Background3D),
EmailJS config. Router reduced to a single page (or removed entirely).

### Layout (desktop, one fixed viewport)

```
┌───────────────────────────────────────────────────────────────────┐
│  HEADER  ⬡ Sarthak Sethi · SWE / AI @ UWaterloo   [gh][in][✉][cv]  │
│          status pill: "Building @ Volaris · open to Summer 2026"    │
├────────────────────────┬────────────────────┬──────────────────────┤
│  EXPERIENCE (fixed)     │  PROJECTS (scroll) │  GITHUB PULSE (fixed) │
└────────────────────────┴────────────────────┴──────────────────────┘
   footer: © 2026 · built in React · last deploy <date>
```

- `lg+`: 3 columns. `md`: 2 columns (Pulse under Experience). `<md`: single stack in priority
  order (header → experience → projects → pulse → footer).
- Grid: CSS grid with `grid-template-columns: minmax(280px,1fr) minmax(340px,1.2fr) minmax(300px,1fr)`.
  Middle column `overflow-y-auto` with a masked fade top/bottom; outer columns fixed height.

### One-screen budget (proven, not asserted)

Reference viewports: 1440×900 and 1280×800.
- Header band ≤ 112px, footer ≤ 40px, page padding 2×24px → content area ≈ 700–716px on an 800px
  viewport.
- Experience rows are condensed (logo 32px + role@company + date/location + one metric line),
  target **≤ 108px each incl. gap**. 5 rows ≈ 540px < 700px. ✅
- Pulse column: heatmap ≈ 160px + stats row ≈ 56px + recent list fills remainder. ✅
- Projects column is the scroller — arbitrary count is fine.
- **Fallback:** page container uses `min-h-screen` with `lg:h-screen lg:overflow-hidden` **only**
  when `@media (min-height: 820px)`; shorter viewports drop the lock and allow normal page scroll.

### Identity tokens (Tailwind theme extensions)

```
colors:
  base:    '#0A0A0B'   // page
  surface: '#111113'   // cards
  line:    '#1E1E22'   // hairline borders
  ink:     '#EDEDEF'   // primary text
  muted:   '#A1A1AA'   // secondary
  faint:   '#71717A'   // tertiary
  accent:  '#6366F1'   accent-hi: '#818CF8'   accent-dim: 'rgba(99,102,241,0.12)'
gridline: rgba(255,255,255,0.03)   // faint background grid
```
Type scale: name 44px Fraunces (600, italic optional); section labels 11px JetBrains Mono uppercase
tracking `0.18em` muted (silin-style "EXPERIENCE"); card title 16px Inter 600; body 13px Inter;
tags/dates/metrics 11px JetBrains Mono. Motion: fade/slide-in on mount (stagger ≤ 60ms), hover
elevation, pulse "live" dot; everything gated by `prefers-reduced-motion`.

## Content (final, proof-forward)

**Profile:** Sarthak Sethi · "Software Engineer / AI" · Honours CS @ University of Waterloo ·
status "Building @ Volaris · open to Summer 2026" · email `s36sethi@uwaterloo.ca` ·
GitHub `Sarthak-Sethi28` · LinkedIn `sarthak2803`.

**Experience** (strongest-first; each = company, role, period, location, one metric-led line):
1. **Constellation Software · Volaris Group** — Software Developer Intern · Jan–Aug 2026 · Waterloo,
   ON — "Shipping enterprise product features across cross-functional teams." *(current — present tense)*
2. **Danier** — Software Developer · Jun–Aug 2025 · Toronto, ON — "Built an AI chatbot + automated
   low-stock alerts; sub-second responses, 100% alert delivery."
3. **Prompt Solutions** — Front-End Developer · Aug 2023–Jul 2024 · Remote — "HIPAA-compliant
   healthcare platform to 5,000+ users; +32% emergency-response efficiency."
4. **NOKIA** — Software Engineer · Jun–Jul 2023 · Remote — "Modernized bug-tracking; −47% load time
   via optimized Postgres + Docker."
5. **University of Waterloo** — Honours BCS · Sep 2024–Present · Waterloo, ON *(education badge)*

**Projects** (6, strongest-first; each = title, year, one-line, tags, badge, link/media):
1. **Muse Sketch Studio** · 2025 · 🏆 Hackathon Winner — "1st place, Replicate AI Hackathon
   ($1,500 in prizes). AI pipeline: prompt → sketch → runway video." · React · TypeScript · Node ·
   Replicate · [video]
2. **CarRaksha** · 2023 · 🏆 1st Prize — "1st place, All-India TechFest among 100,000+ students.
   Arduino collision-prevention + alcohol detection." · C++ · Arduino · [image]
3. **Custom Chatbot** · 2025 — "AI chatbot auto-syncing Shopify every 6h; sub-second FAQ + product
   search." · FastAPI · React · OpenAI · [video]
4. **iMoney** · 2024 — "WCAG 2.1 AAA finance app for the visually impaired; full voice navigation."
   · React · Node · MongoDB · Web Speech · ARIA · [image]
5. **Low-Stock Alert System** · 2025 · Internal Tool — "Automated inventory alerts; 100% delivery
   reliability, multi-worker on Render." · FastAPI · SQLAlchemy · Pandas
6. **GIM — Guard in Motion** · 2023 — "Wearable safety device: GPS + motion triggers with live
   audio/video streaming." · Python · ML · IoT · [image]

## GitHub Pulse — data contract

**Endpoint:** `GET /api/github` → `200 application/json`, `Cache-Control:
s-maxage=3600, stale-while-revalidate=86400`.

**Response shape (`Pulse`):**
```jsonc
{
  "generatedAt": "2026-07-14T00:00:00.000Z",
  "live": true,                       // false when served from fallback
  "user": "Sarthak-Sethi28",
  "stats": { "publicRepos": 0, "followers": 0, "totalStars": 0 },
  "contributions": {
    "total": 0,
    "weeks": [ { "days": [ { "date": "2026-07-14", "count": 0, "level": 0 } ] } ] // level 0–4
  },
  "recent": [
    { "type": "PushEvent", "repo": "owner/name", "message": "…", "url": "https://…", "at": "ISO" }
  ]
}
```

**Server behavior (`api/github.ts`):**
- Reads `process.env.GITHUB_TOKEN`. If absent → return committed fallback with `live:false`, `200`.
- GraphQL (`https://api.github.com/graphql`, `Authorization: bearer <token>`):
  `user(login:"Sarthak-Sethi28"){ contributionsCollection{ contributionCalendar{ totalContributions
  weeks{ contributionDays{ date contributionCount } } } } repositories(first:100,
  ownerAffiliations:OWNER, privacy:PUBLIC){ totalCount nodes{ stargazerCount } } followers{totalCount} }`.
- REST recent events: `GET /users/Sarthak-Sethi28/events/public` → keep first 5 `PushEvent`s, take
  top commit message + `repo.name`, build a compare/commit URL.
- `normalizeGitHub(raw)` (pure, in `lib/github.ts`) maps to `Pulse` and computes `level` from
  `count` via fixed thresholds (0 → 0; 1–2 → 1; 3–5 → 2; 6–9 → 3; ≥10 → 4).
- Any thrown error / non-2xx from GitHub → catch, return fallback with `live:false`, `200` (page
  never breaks).

**Client behavior (`useGitHubPulse`):**
- `fetch('/api/github')`; on ok → use body; on any failure (e.g. local `npm start` where `/api`
  is absent → 404) → import committed `github-fallback.json`, set `live:false`.
- Loading state: skeleton heatmap; never a spinner-only blank.

## Local dev / deploy story

- **`npm start`** (primary loop): CRA on :3000. `/api/github` returns 404 locally → client renders
  committed fallback (so the page is fully viewable offline). This is expected and tested.
- **`vercel dev`**: serves CRA + `/api` together for full-stack local testing of the live Pulse
  (requires `GITHUB_TOKEN` in `.env` / `.env.local`, git-ignored).
- **Deploy:** Vercel. `GITHUB_TOKEN` set as a Vercel project env var (documented in README; value
  never committed). `.vercelignore` already present; CRA build output + `/api` deploy together.

## Assets

- Add new resume at `public/resume/Sarthak_Sethi_Resume.pdf` (from Sarthak — **path TBD, blocks the
  resume step of implementation only**).
- Delete stale copies: `src/assets/Sarthak Sethi Cv.pdf`, `public/assets/Sarthak Sethi Cv.pdf`.
- Keep and reuse `public/assets/projects/{videos,images}/*` for project media.

## Testing / acceptance

**Automated (Jest + React Testing Library, CRA default):**
- `lib/__tests__/github.test.ts` — `normalizeGitHub` maps GraphQL+REST raw → `Pulse`; level
  thresholds; missing/empty fields don't throw; totals computed.
- `data/__tests__/content.test.ts` — every experience has company/role/period; every project has
  ≥1 tag and a non-empty metric line; exactly 6 projects; award badges only on the two winners.
- `components/__tests__/GitHubPulse.test.tsx` — renders live data (heatmap cell count = sum of
  week days, shows "live" dot); renders fallback with dot hidden when hook returns `live:false`;
  renders skeleton while loading.
- `components/__tests__/Home.test.tsx` — renders the name, all three section labels
  (EXPERIENCE/PROJECTS/…), and the correct number of project cards.

**Manual acceptance checklist (must all pass):**
- [ ] Desktop 1440×900 & 1280×800: header, experience, pulse fully visible without page scroll;
      only the projects column scrolls.
- [ ] Viewport height 700px: page scrolls gracefully, nothing clipped/overlapping.
- [ ] Mobile 390px: clean single-column stack in priority order.
- [ ] Pulse shows real data via `vercel dev` with token; shows fallback via `npm start`.
- [ ] Every experience & project line leads with a metric where one exists; Volaris reads present-tense.
- [ ] Resume link downloads the NEW PDF; no old CV files remain in the repo.
- [ ] No three.js/train/matrix/glitch/EmailJS code or deps remain; `npm run build` succeeds.
- [ ] Accent indigo passes WCAG AA contrast on near-black for text/links; `prefers-reduced-motion`
      disables non-essential animation.
- [ ] Keyboard: all links/buttons reachable in a sensible focus order; visible focus ring.

## Rollout

Branch `feature/revamp-living-dashboard` → PR linked to #1 (`Closes #1`). No merge without Sarthak's
approval. Not pushed until Sarthak says so.
