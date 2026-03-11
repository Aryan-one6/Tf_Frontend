# PPC CMS Blog Setup

This repo now treats the PPC CMS blog as build-time generated content:

- `/blog` is emitted as a real static listing page.
- `/blog/:slug` is emitted as a real static article page.
- `/posts-sitemap.xml` is proxied live on Vercel and also emitted statically as a fallback artifact.
- `robots.txt` includes both the main sitemap and the posts sitemap.

That avoids the failure mode where a sitemap URL exists but the post URL resolves to the homepage shell.
There is no WordPress blog source in the active pipeline anymore.

## Required Environment Variables

Set these on the deployment platform:

| Name | Purpose |
| --- | --- |
| `SITE_URL` | Public site origin, for example `https://triadflair.com` |
| `SAPPHIRE_TOKEN` | Server-side PPC CMS site token sent as `X-Site-Token` |

## Optional Environment Variables

| Name | Purpose |
| --- | --- |
| `SAPPHIRE_API_BASE` | Override the PPC CMS API base. Defaults to `https://cms-backend.ppconsultings.com/api/public` |
| `CMS_TOKEN` | Backward-compatible fallback token variable |
| `TRIADFLAIR_CMS_TOKEN` | Backward-compatible fallback token variable |
| `CMS_BASE` | Backward-compatible fallback CMS base variable |
| `TRIADFLAIR_CMS_BASE` | Backward-compatible fallback CMS base variable |

## Build Flow

`npm run build` now does this before the Vite build:

1. `npm run cms-blog`
2. `npm run sitemap`

`cms-blog`:

- fetches PPC CMS posts server-side with `X-Site-Token`
- writes static HTML for `/blog` and `/blog/:slug`
- writes JSON payloads under `public/cms-blog/` for the SPA blog experience
- writes `public/posts-sitemap.xml`
- writes `public/robots.txt`
- writes `public/404.html`

If the CMS is temporarily unavailable during build, the script keeps the last generated blog output instead of wiping it.
It does not regenerate anything from WordPress or from legacy `public/blog` content.

## Hosting Behavior

Two hosting configs are now in place:

- `public/_redirects` for Netlify-style static hosting
- `vercel.json` for Vercel

Both ensure:

- existing `/blog/:slug` files are served directly
- missing `/blog/:slug` paths return `404`
- non-blog app routes still fall back to `index.html`

On Vercel specifically:

- `/posts-sitemap.xml` is routed to `/api/posts-sitemap`
- that API proxies the live PPC CMS sitemap endpoint using the current request host as the `domain` parameter
- if the CMS route needs it, the proxy also falls back to `pathPrefix=/blog`

## Content Updates

This repo is SSG for blog content. A new deploy is required for updated blog HTML.

If PPC CMS already triggers the deploy hook for this project, no extra manual step is required.
If it does not, trigger a redeploy after CMS changes so:

- `/blog`
- `/blog/:slug`
- `/posts-sitemap.xml`

all refresh together.
