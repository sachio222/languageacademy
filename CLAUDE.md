# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Interactive French-learning platform. Vite + React 18 SPA, Supabase for DB and edge functions, Clerk for auth, Stripe for billing, Vercel for hosting, Android shell for mobile. Live at https://languageacademy.io.

See `README.md` for the pedagogy framing and the module/lesson authoring format. This file covers what requires reading multiple files to piece together.

## Commands

```bash
pnpm install                   # package manager is pnpm 10, NOT npm (README is stale on this)
pnpm dev                       # Vite dev server (typically :5173)
pnpm build                     # runs ./prepare-historical-css.sh THEN vite build — not just vite build
pnpm preview                   # preview prod bundle
pnpm vocab:sort                # alphabetize vocabulary data
pnpm vocab:validate            # validate vocabulary data

./deploy-edge-functions.sh     # deploy Supabase edge functions — not `supabase functions deploy` directly
```

No test suite is wired; the two `vocab:*` scripts are the only automated checks.

Environment setup is non-trivial — see `ENVIRONMENT_SETUP.md`, `ENV_TEMPLATE.md`, `CLERK_SETUP_INSTRUCTIONS.md`, and `CLERK_SUPABASE_SETUP.md`. Clerk + Supabase RLS integration in particular has a dedicated setup document.

## Architecture you need multi-file reading to understand

### Module identity — use `module_key`, never numeric `id`

Modules have **two** identifiers. The numeric `id` is positional and changes whenever modules are reordered in `src/lessons/lessonData.js`. The string `module_key` (e.g. `"2024-01-02-etre"`) is permanent and is what the production database uses on `module_progress.module_key` and `section_progress.module_key`.

**Rules:**
- Anything persisted (DB rows, analytics events, user progress, email payloads) uses `module_key`.
- UI-level routing within a session may use `id` for convenience, but must round-trip through the mapper.
- Mapper lives at `src/utils/moduleKeyMapper.js` (or the successor under `src/lessons/` — `moduleIdResolver.js`): `getModuleIdFromKey`, `getModuleKeyFromId`, `getLessonByModuleKey`, `getUnitIdForModule`.
- Some old schema SQL files show `module_id` — they're outdated. Canonical source is `MODULEKEY_ARCHITECTURE.md` and the live database. If you see a new migration with `module_id`, it's wrong.

### Lesson system

Lesson content is code. Each unit lives in `src/lessons/modules/unitN/`. Four module types exist: `translation`, `conjugation`, `mixed`, `custom`. `moduleBuilder.js` expands raw module content into the runtime shape the UI consumes.

Adding a module: README §"Extending the Platform" has the step-by-step. Remember to add the `moduleKey` field (not just import order) — the mapper relies on it.

### Auth + data flow

```
Component → hook (useQuery) → src/api/* wrapper → supabase-js (with Clerk JWT) → Supabase with RLS
```

Clerk issues the session; Supabase receives a Clerk-derived JWT; RLS policies scope rows by the Clerk user id. `AuthWrapper.jsx` gates between `LandingPage`, `WelcomePage` (first-run), and the authenticated app. For RLS + Clerk details see `CLERK_SUPABASE_SETUP.md` and `schema-with-clerk-rls.sql`.

### Email infrastructure

Templates live in `src/utils/emailTemplates.js`: `lessonComplete`, `moduleNudge`, `wordOfTheDay`, `weeklySummary`. **Most templates exist but triggers are not wired.** Sends happen via n8n workflows specified in `N8N_SEND_WOTD_EMAIL.md`, `N8N_PINTEREST_WOTD.md`, etc., plus `send-announcement-all-users.js` for manual blasts. `email_logs` table records sends. `notification_preferences` table holds per-user opt-ins.

`src/utils/emailTemplates.js` uses absolute URLs like `https://languageacademy.io/img/logov2.png` — correct for email clients, do not localize.

### WOTD (Word of the Day)

**Running daily** via an n8n workflow — this is a live retention lever, not dormant. `WOTDHub.jsx` renders the word in-app; the n8n job handles the daily email send per `N8N_SEND_WOTD_EMAIL.md`. `wotd-data/` holds the source words. Don't break it: changes that touch WOTD payload shape, `notification_preferences.word_of_day`, or `email_logs` need to keep the n8n workflow happy.

### Dictionary

`src/data/dictionary/` is the JS authoring surface (Cambridge-derived). A DB-backed dictionary is documented in `DICTIONARY_DATABASE_GUIDE.md` and `DICTIONARY_MIGRATION_GUIDE.md`. Keep these in sync when adding words — validators live in `scripts/validate-vocabulary.js`.

### Wikipedia tooltips

`src/data/wikipediaEntries.js` maps named entities in reading passages to tooltip cards. The `url` field intentionally still points to `en.wikipedia.org` (click-through is a feature). Image fields are now all local under `public/img/wikipedia/` and `public/img/external/` — do not reintroduce `upload.wikimedia.org` / `images.unsplash.com` / `images.pexels.com` hotlinks, they get rate-limited and some Commons originals have been deleted. Scripts `scripts/localize-wikipedia-images.mjs` and `scripts/localize-all-external-images.mjs` exist if new hotlinks slip in.

### Analytics

Microsoft Clarity is initialized in `src/main.jsx` / `src/App.jsx`, consent-gated via `localStorage.clarity-consent`. `src/services/clarity.js` exposes `trackUTMParameters` and emits custom events (`moduleViewed`, `vocabularyDashboardOpened`, etc.). Vercel Analytics is imported but currently passive. Funnel events for the retention initiative are not yet added — see the retention plan pointer below.

## Current initiative: retention-first recovery

A plan is approved and active for fixing mid-funnel drop-off (users complete 1–3 modules then don't return). Read the plan at `~/.claude/plans/i-never-had-sign-cheerful-anchor.md` before touching anything in these areas:

- `src/components/AuthWrapper.jsx`, `src/components/WelcomePage.jsx` — onboarding flow gets new survey + level-check components inserted ahead of WelcomePage
- `src/utils/emailTemplates.js` + Supabase cron — dormant emails (lessonComplete, moduleNudge, WOTD, weeklySummary) get activated
- `src/services/clarity.js` — new funnel events get added (`onboarding_started`, `first_module_completed`, `returning_day_7`, etc.)
- `supabase/migrations/` — new `user_profiles` fields for `learning_goal`, `target_deadline`, `daily_time_commitment_min`, `prior_exposure`, `primary_use_case`, `level_check_score`, `onboarding_completed_at`

The plan's Verification section has the end-to-end test steps. Workstreams W1 (email activation), W2 (onboarding), W3 (funnel analytics) are the immediate scope.

## Brand constraints that affect implementation

See `DESIGN_PRINCIPLES.md`, `DESIGN_ICONOGRAPHY_AND_GRAPHICS.md`, and the sibling vault's `projects/marketing/Brand.md`. Load-bearing for anyone writing UI or copy:

- **Anti-gamification.** No points, no XP, no streak counters that shame users for breaks, no mascots, no "🎉 Congrats!" copy. The existing WOTD hub has a localStorage streak — that's a known tension; don't build new streak-like mechanics.
- **Grayscale foundation.** `#1a1a1a` primary, `#665665` secondary, `#999999` tertiary, with `#3b82f6` as the single accent used sparingly.
- **Analytical voice.** Plain, confident, structural. No cute language.
- **No emoji in product UI** (README has some but they're documentation decoration, not product style).

## Repo layout oddities worth knowing

- **Many top-level `*.md` docs.** Setup guides, implementation plans, pedagogy analyses, module reference docs. Not organized under `docs/`. Grep by filename — e.g. `ls *PRONUNCIATION*` or `ls *STRIPE*`. Representative: `PEDAGOGICAL_ANALYSIS.md`, `STRIPE_SETUP_GUIDE.md`, `MODULE_CREATION_GUIDE.md`, `LAUNCH_CHECKLIST.md`, `TEACHER_CLASSES_README.md`.
- **Two `vocabulary` folders** — `src/vocabulary/` (feature module) and `src/lessons/vocabulary/` (lesson-associated word data). They serve different roles.
- **`speed-match-demo.html`** at the root is a standalone demo; ignore for app builds.
- **`android/`** is the mobile shell; separate from the web build.
- **`scripts/`** has one-off maintenance scripts — vocabulary maintenance, image localization, migration helpers. Prefer adding new utilities here rather than in `src/`.

## Sibling vault

Business-side knowledge (strategy, marketing, SEO, GEO, product overview, voice/brand, retention thesis, current plan pointers) lives at `~/Agents/Workspaces/Development/LanguageAcademy/`. That vault has its own `CLAUDE.md` and `WORKSTATE.md`. When a task is strategic rather than code-level, work there; when implementing, work here and update the vault `CHANGELOG.md` afterward.
