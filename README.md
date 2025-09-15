## Sports Leagues Browser (Vite + React + TypeScript)

Minimal React app scaffolded with Vite, configured with Tailwind CSS, Axios, React Router, and Jest + React Testing Library.

### Getting started

```bash
npm install
npm run dev
npm test
```

Open http://localhost:5173 in your browser.

### Project structure

```
src/
  components/
  pages/
  hooks/
  services/
  context/
  tests/
  App.tsx
  main.tsx
```

### Features & design decisions

- Uses React Router with two routes:
  - `/` → LeaguesPage
  - `/league/:id` → LeagueDetailPage
- Tailwind CSS for utility-first styling (container, flex, spacing, responsive grid)
- Axios service layer in `src/services/api.ts` with error handling
- Simple `CacheContext` for in-memory caching to avoid duplicate API calls

### Caching approach

An in-memory `Record<string, any>` inside `CacheContext` exposes `getCache(key)` and `setCache(key, value)`. We cache:

- `leagues`: list from `/all_leagues.php`
- `seasons:{id}`: first season with a badge from `/search_all_seasons.php?badge=1&id={id}`

This keeps the UI snappy across navigations. Since it’s in-memory, cache resets on reload.

### Testing

- Jest + React Testing Library configured in `jest.config.cjs`
- Setup file: `src/tests/setupTests.ts`
- Example tests:
  - `LeaguesPage.test.tsx`: renders list, filters by search/sport, basic navigation
  - `LeagueDetailPage.test.tsx`: renders a season badge and uses cached data on repeat

### AI tools used

- Cursor AI for code generation and refactors
- Tailwind class name suggestions and auto-completion
- Inline quick-fixes for TypeScript and Jest config
