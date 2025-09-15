## Sports Leagues Browser

A small, production-quality React app that lists sports leagues and shows details for a selected league. Built with Vite, React, TypeScript, Tailwind CSS, Axios, React Router, and Jest + React Testing Library.

### Quick start

```bash
npm install
npm run dev
npm test
```

- Dev server: open http://localhost:5173
- Tests: run all unit/integration tests with Jest

## Tech stack

- React 19 + TypeScript
- Vite 7 (fast dev + build)
- Tailwind CSS 4
- React Router 7
- Axios for HTTP
- Jest + React Testing Library

## App structure

```
src/
  components/           # Reusable UI: SearchBar, DropdownFilter, LeagueGrid, LeagueCard
  pages/                # Route-level pages: LeaguesPage, LeagueDetailPage
  services/             # API client + endpoints
  context/              # CacheContext for in-memory caching
  tests/                # Jest/RTL tests
  App.tsx               # Routes
  main.tsx              # App bootstrap
```

## How it works

- Two routes:
  - `/` → `LeaguesPage`: fetches all leagues, supports search + sport filter
  - `/league/:id` → `LeagueDetailPage`: fetches seasons for a league and shows a badge if available
- Data fetching:
  - Cache-first via `CacheContext` to avoid unnecessary network calls between navigations
  - Abortable requests using `AbortController` in pages to avoid state updates after unmount
  - StrictMode-safe guards to prevent duplicate fetches in development
- Styling: Tailwind utility classes with focus on accessibility and responsive layout
- Testing: RTL tests ensure filtering and details view behave as expected

## Development workflow

- State colocated in pages; cross-cutting cache lives in `CacheContext`
- Fetch patterns:
  - On mount: check cache → if missing, fetch with `AbortController`
  - Cleanup on unmount: `abort()` to avoid leaks
  - Development double-invoke from StrictMode handled via a simple guard
- Errors render a retry UI that triggers a refetch

## Accessibility

- Form controls have labels or `aria-label`
- Keyboard/focus-visible styles for interactive elements
- Semantic buttons/links and alt text for images

## Testing

- `LeaguesPage.test.tsx`: loads mock leagues, filters by search and dropdown, asserts visible items
- `LeagueDetailPage.test.tsx`: verifies season badge render and error-free navigation
- JSDOM environment with Jest configuration in `jest.config.cjs`

## Prompts used during construction

- "Create a minimal Vite + React + TypeScript app with Tailwind and React Router, plus Jest + React Testing Library wiring."
- "Build an `api.ts` module using Axios with a base URL `https://www.thesportsdb.com/api/v1/json/3` and two functions: `getAllLeagues()` and `getSeasonsByLeagueId(id)` with error handling."
- "Implement `CacheContext` with `getCache` and `setCache` to store lists and per-league season results."
- "Create `LeaguesPage` with a search bar and a sport dropdown; filter the leagues client-side."
- "Create `LeagueDetailPage` that shows a league name and a season badge if available."
- "Refactor fetch logic to use AbortController and add a StrictMode-safe guard to prevent double fetches in dev."
- "Write RTL tests for the list filtering and the detail page."

## API reference (TheSportsDB)

- `GET /all_leagues.php`
  - Response shape: `{ leagues: Array<{ idLeague, strLeague, strSport, strLeagueAlternate? }>} `
- `GET /search_all_seasons.php?badge=1&id={id}`
  - Response shape: `{ seasons: Array<{ strSeason?, strBadge?, strLeague? }>} `

## Scripts

- `npm run dev` – start dev server
- `npm run build` – type-check and create production build
- `npm run preview` – preview local production build
- `npm run test` – run tests
- `npm run lint` – run ESLint
