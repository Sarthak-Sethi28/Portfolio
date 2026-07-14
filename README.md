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

`npm start` does not run the `/api` function, so the GitHub Pulse shows the committed fallback
(`src/data/github-fallback.json`, `live: false`). To exercise the live endpoint locally:

```bash
npm i -g vercel
echo "GITHUB_TOKEN=<token>" > .env.local   # git-ignored
vercel dev
```

## GitHub Pulse

`GET /api/github` reads a server-side `GITHUB_TOKEN` and returns a normalized `Pulse`
(contribution calendar via GraphQL, repo/star/follower counts, recent public push events).
On a missing token or any error it serves the committed fallback with `live: false`, so the
page never breaks. Set `GITHUB_TOKEN` (public read scope only) in the Vercel project settings
for production; see `.env.example`.

## Structure

```
src/data/         typed content (profile, experience, projects) + fallback snapshot
src/lib/          pure GitHub normalize logic (unit-tested)
src/hooks/        useGitHubPulse (fetch -> fallback)
src/components/   Header, Experience, Projects, GitHubPulse, ...
src/pages/Home    composes the 3-column dashboard
api/github.ts     Vercel serverless endpoint
docs/superpowers/ design spec + implementation plan
```

## Deploy

Vercel. The CRA build output and the `/api` function deploy together. Set `GITHUB_TOKEN` in the
project's environment variables.
