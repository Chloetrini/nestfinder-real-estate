# AGENTS.md: NestFinder Frontend

Loaded at the start of every AI session on this repo. Keep it true: update it when a convention or gotcha changes.

## What this is

The web app for **NestFinder Pro**, a real-estate listing platform for Nigeria. Visitors browse properties and send enquiries to the agent; admins manage listings, enquiries and users. API: [nestfinder-backend](https://github.com/Chloetrini/nestfinder-backend) (Express + MongoDB, default `http://localhost:7200`).

## Stack (do not swap without asking)

React 19 + TypeScript · Vite · Tailwind CSS 4 (dark mode via the `dark` class) · React Router 7 (`react-router-dom`, data router, lazy routes) · TanStack Query · Google Maps (`@vis.gl/react-google-maps`) · lucide-react.

No Axios here: HTTP goes through `fetch` helpers in `src/api/client.ts`.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview
```

No test script. `build` passes. `lint` has existing errors (about 14); do not add new ones in files you touch.

## Environment

Copy `.env.example` to `.env` (git-ignored).

- `VITE_API_URL`: backend URL, defaults to `http://localhost:7200`.
- `VITE_GOOGLE_MAPS_API_KEY`: needed for the map on property pages.

## Layout

```
src/app/         app.tsx (providers), router.tsx (route table, lazy pages)
src/api/         one module per backend resource; client.ts holds fetch + JWT helpers
src/routes/      home about contact saved auth properties admin not-found
src/components/  ui/ layout/ guards/ shared/ skeletons/ + admin/ home/ property-details/ property-listing/
src/context/     auth, theme, admin property state
src/hooks/       properties/ (public data), admin/, use-seo, use-favorites
src/constants/   nigeria-states.ts, site.ts (company contact details: edit once there)
```

## Conventions

- File names are kebab-case; imports use the `@/` alias.
- Data flow: raw HTTP in `src/api/`, React Query hooks in `src/hooks/`, pages use hooks.
- Routes are declared in `src/app/router.tsx` with `page(() => import(...))`. Keep existing URLs (`/login`, `/properties`, `/property/:id`, `/adminPage/*`, `/verify-email`, `/resetpassword`): the backend's emails link to them.
- Loading states use `<Skeleton />` shaped like the content, not a spinner.
- Every page calls `useSeo({ title, description })`; private pages add `noindex: true`.
- Property photos come from Cloudinary: always show them through `optimizeImage(url, width)` in `src/lib/image.ts`.
- Dark mode: add a `dark:` variant next to any hard-coded colour.
- Admin pages are child routes of `src/routes/admin/layout.tsx` (sidebar + `<Outlet />`).

## Adding a page

1. API call in `src/api/<resource>.ts` and a hook in `src/hooks/`.
2. Page in `src/routes/<area>/` with a default export.
3. Register it in `src/app/router.tsx`.

## Commits

Author every commit as `Claude with Trini <noreply@anthropic.com>`, never plain "Claude". Set it before committing: `git config user.name "Claude with Trini" && git config user.email noreply@anthropic.com`.

## Gotchas

- The JWT is kept in `localStorage` (key `nestfinder_token`) and sent in the `Authorization` header. There is no cookie session on this app.
- `src/api/legacy-api.ts` still exists beside the newer modules. Prefer `client.ts` for new code.
- Saved properties (`/saved`) live only in the browser's localStorage, with no account needed.
- The API caches public property reads for 60 seconds, so a just-created listing can take up to a minute to show on public pages.
