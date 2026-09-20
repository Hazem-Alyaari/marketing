# MySchool Marketing Website

Independent Next.js marketing site for the [MySchool](https://github.com/Hazem-Alyaari/MySchool) school management platform.

**Live site:** [https://hazem-alyaari.github.io/marketing](https://hazem-alyaari.github.io/marketing)

This project is separate from the Angular product application and must **not** modify product, backend, or microservice code.

## What this site does

The marketing site explains MySchool, drives visitors to the public demo, and collects contact inquiries. It is SEO-first and bilingual (`ar` default, `en`).

| Page | Route | Purpose |
| --- | --- | --- |
| Home | `/` | Product overview and primary demo CTA |
| Features | `/features` | Module and capability breakdown |
| Solutions | `/solutions` | Audience-oriented use cases |
| Pricing | `/pricing` | Plans and comparison |
| About | `/about` | Company / product context |
| Blog | `/blog`, `/blog/[slug]` | Articles and guides |
| FAQ | `/faq` | Common questions |
| Contact | `/contact` | Inquiry form and contact details |

Locale-prefixed URLs are used in practice (e.g. `/ar/features`, `/en/pricing`). Arabic is the default locale.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **next-intl** — `ar` (RTL, default) and `en` (LTR)
- **Lucide React** — icons
- **Motion** — intentional UI motion
- SEO helpers: metadata, sitemap, robots, JSON-LD, RSS feed stub

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
NEXT_PUBLIC_CONTACT_PHONE=
NEXT_PUBLIC_WHATSAPP_URL=
```

URL roles (keep distinct):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Marketing website (canonical, sitemap, OG) |
| `NEXT_PUBLIC_APP_URL` | Normal MySchool application / login |
| `NEXT_PUBLIC_DEMO_URL` | Public free demo environment |

Leave values empty until known. Do not invent URLs. When `NEXT_PUBLIC_DEMO_URL` is empty, demo CTAs are hidden (no broken links).

Optional contact-form delivery (server-only; not used on static GitHub Pages):

```env
# CONTACT_DELIVERY_PROVIDER=   # resend | console
# CONTACT_TO_EMAIL=
# RESEND_API_KEY=
```

### Demo URL security note

The currently supplied demo may use **HTTP**, a **raw IP**, and a **non-standard port**. That is acceptable only as the environment provided today.

- Do **not** auto-rewrite the demo URL to HTTPS
- Do **not** invent a demo domain

**TODO:** production marketing should eventually use a proper HTTPS demo domain (conceptually `https://demo.<production-domain>`) once one exists.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build (Node server) |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/                 # App Router pages, sitemap, robots, API
  app/[locale]/        # Locale-scoped marketing pages
  components/          # UI, layout, page sections, blog, SEO
  config/              # site, SEO, navigation
  content/blog/        # Blog posts (ar / en)
  data/                # Static marketing content (modules, FAQ, pricing, …)
  i18n/                # next-intl routing and request config
  lib/                 # Metadata, blog helpers, contact delivery, media
  types/               # Shared TypeScript types
public/                # Static assets (images, icons)
.github/workflows/     # GitHub Pages deploy workflow
```

## Architecture notes

- Locales live under `src/app/[locale]/...`
- Navigation is centralized in `src/config/navigation.ts`
- Site/SEO config lives in `src/config/`
- Marketing copy and structured data live in `src/data/` and `src/content/blog/`
- Primary demo CTAs use `DemoLink` + `siteConfig.demoUrl` (external; not routed through next-intl)
- Product screenshots / media helpers live in `src/lib/product-media.ts`
- Contact form delivery is abstracted under `src/lib/contact/` (no fake success / CRM)
- Next.js 16 uses `src/proxy.ts` (formerly `middleware.ts`) for locale routing

## Deployment (GitHub Pages)

Pushes to `main` (or a manual workflow run) build a **static export** and publish to the `gh-pages` branch.

- Public URL: `https://Hazem-Alyaari.github.io/marketing`
- Base path: `/marketing` (set when `GITHUB_PAGES=true`)
- Workflow: `.github/workflows/pages.yml`
- Build strips `src/app/api` before export — Route Handlers cannot run on static Pages
- Public env vars for CI come from repository **Variables** (`NEXT_PUBLIC_*`)

For a normal Node hosting target, omit `GITHUB_PAGES` and use `npm run build` + `npm run start` (API routes remain available).

## Do not

- Invent features, pricing, testimonials, statistics, or screenshots
- Gate demo access behind a contact form
- Modify the Angular app, backend, or Docker stack from this project
- Conflate `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_DEMO_URL`
