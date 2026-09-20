# NestFinder Frontend

The web app for **NestFinder Pro**, a real-estate listing platform for Nigeria. Visitors browse properties and send enquiries to the agent; admins manage listings, enquiries and users.

## Tech stack

React 19 + TypeScript, Vite, Tailwind CSS 4 (with dark mode), React Router 7 (data router, lazy routes), TanStack React Query, Google Maps (`@vis.gl/react-google-maps`).

## Features

- Browse, filter and sort properties; property pages with gallery, map and an enquiry form.
- **Contact page** (`/contact`) that sends a message to the team through `POST /api/contact`.
- **Saved properties** (`/saved`): a heart on every card, remembered on the device (localStorage, no account needed).
- **Dark and light mode** with a toggle, remembered between visits.
- **Admin area** where every page has its own URL: dashboard, manage properties, one property's details (with Edit and Delete), add and edit property, enquiries and users, all with a Back button.
- Shimmering skeleton loaders and gentle entrance animations (they switch off for visitors who prefer reduced motion).
- Basic SEO: per-page title, description and social tags (`useSeo`), `robots.txt`, and private pages marked `noindex`.

## Getting started

```bash
npm install
cp .env.example .env     # set VITE_API_URL and VITE_GOOGLE_MAPS_API_KEY
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
├── app/           app.tsx (providers) and router.tsx (route table, lazy pages)
├── api/           One module per backend resource; client.ts holds fetch + JWT helpers
├── assets/        brand/  avatars/  icons/  images/ (WebP)
├── components/
│   ├── ui/        Button, Modal, Pagination, ThemeToggle, Skeleton, HeartButton
│   ├── layout/    Navbar, Footer
│   ├── guards/    ProtectedRoute (login / admin)
│   ├── shared/    PropertyCard, PageLoader, SignInModal
│   ├── skeletons/ Loading placeholders
│   └── admin/ home/ property-details/ property-listing/   Feature components
├── constants/     Nigerian states, site.ts (company email, phone and address: edit once)
├── context/       auth, theme, admin property state, admin navigation
├── hooks/         properties/ (public data)  admin/ (dashboard, users, enquiries)  use-seo  use-favorites
├── lib/           query-client.ts, image.ts (Cloudinary resize helper)
├── routes/        Pages: home, about, contact, saved, auth/*, properties (list + detail), not-found,
│                  admin/ (layout, dashboard, properties, property-detail, add-property, edit-property, enquiries, users)
└── types/         Shared TypeScript types
```

## Conventions

- File names are kebab-case; imports use the `@/` alias.
- **Data flow**: raw HTTP calls in `api/`, React Query hooks in `hooks/`, pages use the hooks. Property lists are cached for a minute and shared by the home, listing and detail pages.
- **Routes** are declared in `app/router.tsx`, and each page is loaded on demand. URLs are unchanged (`/login`, `/properties`, `/property/:id`, `/adminPage/*`, `/verify-email`, `/resetpassword`), so the links in backend emails keep working.
- **Dark mode**: the `dark` class on `<html>` (set by `ThemeProvider`, remembered in `localStorage`, defaults to the device setting). Use Tailwind's `dark:` variant next to any hard-coded colour.
- **Images**: use WebP and keep bundled photos under about 200 KB. Property photos come from Cloudinary, so always show them through `optimizeImage(url, width)` in `lib/image.ts` (it asks Cloudinary for a small, compressed copy instead of the multi-megabyte original).
- **Loading states**: use `<Skeleton />` (`components/ui`) shaped like the content it stands in for, not a spinner.
- **SEO**: call `useSeo({ title, description })` at the top of every page; add `noindex: true` for private pages.
- **Admin pages** are child routes of `routes/admin/layout.tsx` (sidebar + `<Outlet />`). Add one by creating the file and adding a child route in `app/router.tsx`.

## Adding a page

1. Add the API call in `src/api/<resource>.ts` and a React Query hook in `src/hooks/`.
2. Create the page in `src/routes/<area>/` with a default export.
3. Register it in `src/app/router.tsx` with `page(() => import(...))`.

## Deployment

Deployed on Vercel (`vercel.json` rewrites every path to `index.html`). Set `VITE_API_URL` and `VITE_GOOGLE_MAPS_API_KEY` in the project settings.
