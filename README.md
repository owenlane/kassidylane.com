# kassidylane.com

Production website for **Kassidy Lane** — bilingual Las Vegas REALTOR® (Simply Vegas).

Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. A mobile-first lead-generation site with home-valuation and contact funnels, a filterable reviews wall, out-of-state and probate/difficult-deal landing pages, and a full Spanish (`/es`) experience.

## Stack
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v3 with design tokens (charcoal / bone / desert-gold + Fraunces + IBM Plex)
- **Fonts:** self-hosted via `@fontsource` (no external font fetch at runtime)
- **Icons:** lucide-react
- **Forms:** `/api/lead` route → Resend (email) + Supabase (storage), both optional and env-gated
- **SEO:** per-route metadata, JSON-LD (RealEstateAgent, Person, Review/AggregateRating, FAQPage, Breadcrumb), sitemap, robots

## Local development
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build && npm run start
```

## Environment variables
See `.env.example`. All are optional for the build; the lead API degrades gracefully when they are absent.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Send lead notification emails |
| `LEAD_NOTIFY_TO` | Destination inbox (default kassidylane@gmail.com) |
| `LEAD_NOTIFY_FROM` | Verified Resend sender |
| `SUPABASE_URL` | Optional lead storage |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional lead storage auth |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |

## Deployment
Designed for Vercel. Push to `main` triggers a build automatically when the repo is connected.
