# MySchool Marketing Website

Independent Next.js marketing site for the MySchool school management platform.

This project is separate from the Angular product application and must not modify product, backend, or microservice code.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next-intl (`ar` default, `en`)
- Lucide React
- Motion
- SEO-first architecture (metadata helpers, sitemap, robots, JSON-LD stubs)

## Getting started

```bash
cd marketing
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default locale routes start at `/ar`.

## Environment

Configure in `.env.local` (see `.env.example`):

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_DEMO_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
```

URL roles (keep distinct):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Marketing website |
| `NEXT_PUBLIC_APP_URL` | Normal MySchool application / login |
| `NEXT_PUBLIC_DEMO_URL` | Public free demo environment |

Leave values empty until known. Do not invent URLs. When `NEXT_PUBLIC_DEMO_URL` is empty, demo CTAs are hidden (no broken links).

### Demo URL security note

The currently supplied demo may use **HTTP**, a **raw IP**, and a **non-standard port**. That is acceptable only as the environment provided today.

- Do **not** auto-rewrite the demo URL to HTTPS
- Do **not** invent a demo domain

**TODO:** production marketing should eventually use a proper HTTPS demo domain (conceptually `https://demo.<production-domain>`) once one exists.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Architecture notes

- Locales live under `src/app/[locale]/...`
- Navigation is centralized in `src/config/navigation.ts`
- Site/SEO config lives in `src/config/`
- Primary demo CTAs use `DemoLink` + `siteConfig.demoUrl` (external; not routed through next-intl)
- Contact form delivery is abstracted under `src/lib/contact/` (no fake success / CRM)
- Next.js 16 uses `src/proxy.ts` (formerly `middleware.ts`) for locale routing

## Do not

- Invent features, pricing, testimonials, statistics, or screenshots
- Gate demo access behind a contact form
- Modify the Angular app, backend, or Docker stack from this project
