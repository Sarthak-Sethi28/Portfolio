# sethisarthak.com — portfolio

A refined editorial-dark **one-screen "living dashboard"**: fixed Experience, a scrolling
Projects column, and a **live GitHub Pulse** (real contribution graph + recent commits) that
makes the page feel alive.

## Stack

- React 18 + TypeScript (Create React App)
- Tailwind CSS · Framer Motion · lucide-react
- Self-hosted fonts via `@fontsource` (Fraunces / Inter / JetBrains Mono)
- One Vercel serverless function (`api/github.ts`) for the live GitHub data

## Develop

```bash
npm install
npm start          # http://localhost:3000 — Pulse renders the committed fallback snapshot
npm test           # jest + React Testing Library
npm run build      # production build (stamps REACT_APP_BUILD_DATE)
```

## GitHub Pulse

The GitHub card pulls **real, public** data client-side — **no token or backend required**:

- Contribution calendar via the public `github-contributions-api` (jogruber).
- Repo / star / follower counts via the unauthenticated GitHub REST API (best-effort).

`src/lib/github.ts` holds the pure, unit-tested normalizers (`groupWeeks`, `normalizePublic`) and
`fetchPulse()`. If the public APIs are unreachable, `useGitHubPulse` renders the committed snapshot
(`src/data/github-fallback.json`, `live: false`) so the page never breaks.

## Structure

```
src/data/         typed content (profile, experience, projects, stack) + fallback snapshot
src/lib/          pure GitHub fetch + normalize logic (unit-tested)
src/hooks/        useGitHubPulse (public fetch -> fallback)
src/components/   Header, Hero3D, three/GalaxyScene, Experience, Projects, TechMarquee, GitHubPulse
src/pages/Home    composes the hero + content
docs/superpowers/ design spec + implementation plan
```

## Deploy

Vercel — static CRA build, no environment variables or serverless functions needed.
