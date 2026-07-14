# Implementation Plan — Portfolio Revamp "Living Dashboard"

Spec: `docs/superpowers/specs/2026-07-14-portfolio-revamp-design.md` · Issue #1 · Branch
`feature/revamp-living-dashboard`. TDD where it has value (pure logic + components). Commit at every
✅. Run `npm test`/`npm run build` before each commit that touches code.

---

## Phase 0 — Scaffolding & cleanup

**0.1 Dependencies.**
- Add: `@fontsource/fraunces`, `@fontsource/inter`, `@fontsource/jetbrains-mono`; dev-dep
  `@vercel/node` (types for the serverless handler; `api/` is compiled by Vercel, not CRA).
- Remove (unused after revamp): `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`,
  `maath`, `gsap`, `@emailjs/browser`, `react-parallax-tilt`, `@fortawesome/*`. Keep `framer-motion`,
  `lucide-react`, `react-icons`, `react-intersection-observer`.
- `npm install`; confirm it resolves.
- Build script injects deploy date: `REACT_APP_BUILD_DATE=$(date -u +%Y-%m-%d) react-scripts build`.

**0.2 Theme tokens.** Edit `tailwind.config.js`: add `colors` (base/surface/line/ink/muted/faint/
accent/accent-hi/accent-dim), `fontFamily` (serif=Fraunces, sans=Inter, mono=JetBrains Mono), and a
`backgroundImage`/utility for the faint grid. Remove old `cyber-*` tokens/animations no longer used.

**0.3 Delete dead code.** Remove `src/components/Background3D.tsx`, `FuzzyText.tsx`,
`GlitchReveal.tsx`, `CyberCard.tsx`, `SkillCarousel.tsx`, `SkillsDashboard.tsx`, `SkillsDashboard.css`,
`SkillWaterfall.tsx`, `SkillConstellation.tsx`, `Skillverse.tsx`, `GradientText.tsx`;
`src/pages/{About,Contact,Projects,Skillverse,NotFound}.tsx`; `src/config/emailjs.ts`;
`src/types/maath.d.ts`. (Keep `Navbar`/`Footer` only if reused; otherwise replace.)

**0.4 Green-build stub.** Rewrite `App.tsx` to render a single-page placeholder `Home` (no
multi-route router referencing deleted pages). Replace the stale `src/App.test.tsx` with a trivial
"renders without crashing" test so the suite is green from here on. The real `Home` arrives in
Phase 5; every commit in between must `npm run build` + `npm test` clean.
✅ **commit:** `chore: deps + theme tokens + remove dead cyber code, green stub [#1]`

---

## Phase 1 — Content data modules (TDD)

**1.1 Types + tests first.** `src/data/types.ts` (`Experience`, `Project`, `Profile`, `Pulse` types).
Write `src/data/__tests__/content.test.ts` asserting: 5 experiences each with company/role/period;
exactly 6 projects, each with ≥1 tag + non-empty `metric`; award badge only on Muse Sketch & CarRaksha;
Volaris line present-tense. (Red.)

**1.2 Implement data.** `src/data/profile.ts`, `experience.ts`, `projects.ts` with the final copy
from the spec. Tests green. ✅ **commit:** `feat: typed content data modules [#1]`

---

## Phase 2 — GitHub logic (TDD, pure)

**2.1 Tests first.** `src/lib/__tests__/github.test.ts`: `normalizeGitHub(rawGraphQL, rawEvents)` →
`Pulse`; level thresholds (0→0,1-2→1,3-5→2,6-9→3,≥10→4); totals summed; empty/missing weeks & events
don't throw; recent commit URL = `https://github.com/{repo}/commit/{sha}`. (Red.)

**2.2 Implement.** `src/lib/github.ts`: `GRAPHQL_QUERY` string, `normalizeGitHub()`, `levelFor()`,
`buildRecent()`. Pure, no network. Tests green.

**2.3 Fallback snapshot.** `src/data/github-fallback.json` — a realistic committed `Pulse`
(`live:false`), ~26 weeks of plausible cells so the UI looks good offline. ✅ **commit:**
`feat: pure GitHub normalize lib + fallback snapshot [#1]`

---

## Phase 3 — Serverless function

**3.1** `api/github.ts` (Vercel Node function): read `GITHUB_TOKEN`; if missing → return
`github-fallback.json` with `live:false`. Else fetch GraphQL (contributions, repos+stars, followers)
+ REST `/events/public`; pass to `normalizeGitHub`; set `Cache-Control: s-maxage=3600,
stale-while-revalidate=86400`; on any error → fallback + `live:false`, status 200. Add `vercel.json`
if needed for function runtime. (Verified later via `vercel dev`; logic already unit-tested in lib.)
✅ **commit:** `feat: /api/github serverless pulse endpoint [#1]`

---

## Phase 4 — Pulse UI (TDD)

**4.1 Hook.** `src/hooks/useGitHubPulse.ts` → `{ pulse, loading }`. Test
`hooks/__tests__/useGitHubPulse.test.tsx`: assign a `jest.fn()` to `global.fetch` (not present in
jsdom) — ok → live pulse; reject/404 → committed fallback with `live:false`. (Red→green.)

**4.2 Components.** `ContributionHeatmap.tsx` (grid of week columns, indigo intensity by level,
`aria-label` per cell). `GitHubPulse.tsx` (stats row, heatmap, recent list, animated "live" dot when
`live`). Test `components/__tests__/GitHubPulse.test.tsx`: live (dot shown, cell count = Σ days,
recent items render), fallback (dot hidden), loading (skeleton). ✅ **commit:**
`feat: GitHub Pulse hook + heatmap + card [#1]`

---

## Phase 5 — Layout & columns

**5.1** `Header.tsx` — monogram + serif name + role + status pill; links (GitHub/LinkedIn/resume) and
a click-to-copy email button (lucide icons; copy → toast/checkmark). No phone.
**5.2** `ExperienceColumn.tsx` + `ExperienceRow.tsx` — condensed rows (≤108px), education badge, mono
dates/location, metric-led line.
**5.3** `ProjectsColumn.tsx` (scroll container, masked fade edges) + `ProjectCard.tsx` — title/year,
mono tags, award/internal badges, media (video/img) + link; expand-in-place detail (secondary).
**5.4** `Footer.tsx` — © 2026 · built in React · "last deploy" (build-time date via env or static).
**5.5** `pages/Home.tsx` — compose CSS-grid 3 columns; `App.tsx` — drop multi-route router to a single
page; global noise/grid background.
**5.6** `components/__tests__/Home.test.tsx` — name renders, three section labels present, 6 project
cards. ✅ **commit:** `feat: header, experience, projects, footer + one-screen layout [#1]`

---

## Phase 6 — Styling, fonts, responsive, a11y

**6.1** Import `@fontsource` faces in `src/index.tsx`/`index.css`; apply families.
**6.2** Faint grid background; hairline card utility; hover elevation.
**6.3** Responsive: 3-col `lg` → 2-col `md` → 1-col stack. Height lock only `@media (min-height:820px)
and (min-width:1024px)`; else page scrolls.
**6.4** `prefers-reduced-motion` gate; visible focus rings. **Contrast:** `#6366F1` on near-black is
~4.3:1 (fails AA for small text) — use `accent-hi #818CF8` for links/text (≥4.5:1) and reserve
`#6366F1` for fills, the live dot, and large/badge elements. Verify with a contrast check.
✅ **commit:** `style: fonts, grid, responsive, reduced-motion, focus [#1]`

---

## Phase 7 — Assets

**7.1** Delete `src/assets/Sarthak Sethi Cv.pdf` and `public/assets/Sarthak Sethi Cv.pdf`.
**7.2** Place Sarthak's **new** resume at `public/resume/Sarthak_Sethi_Resume.pdf` (overwrite). Wire
header/footer link to it. *(Blocked until Sarthak provides the file path; everything else proceeds;
this is the last content step.)* ✅ **commit:** `chore: swap in new resume, remove old CVs [#1]`

---

## Phase 8 — Verify (evidence, not claims)

- `npm test` — all suites green (paste output).
- `npm run build` — succeeds (paste tail).
- `npm start` + in-app browser: screenshot desktop (one screen, projects-only scroll), 700px-tall
  (graceful scroll), 390px mobile (stack). Confirm Pulse renders (fallback locally).
- Walk the manual acceptance checklist from the spec; fix anything red.

---

## Rating & review (workflow stages 6–9)
Rate implementation 1–10 → close gaps to 10 → `/code-review` (or review agents) over the diff →
verify + fix confirmed findings → open PR with `Closes #1`. No push/merge without Sarthak's OK.

## README / docs
Update `README.md`: new stack summary, `GITHUB_TOKEN` env var + `vercel dev` note, remove stale
upload guides (`UPLOAD_GUIDE.md` etc.) or fold into one. (Folded into Phase 6 commit or its own.)
