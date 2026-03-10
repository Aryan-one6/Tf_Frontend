# Triad Flair CMS Blog + Sitemap Setup

## Required Vercel Environment Variables

Set these in Vercel Project Settings -> Environment Variables:

| Name | Purpose |
| --- | --- |
| `SITE_URL` | Public site origin used in sitemap generation (`https://triadflair.com`) |
| `CMS_BASE` | CMS origin or API base URL (`https://cms-backend.ppconsultings.com` or `https://cms-backend.ppconsultings.com/api`) |
| `CMS_TOKEN` | Public site token sent as `X-Site-Token` |
| `VERCEL_DEPLOY_HOOK_URL` | Vercel deploy hook URL triggered by `/api/cms-webhook` |
| `CMS_WEBHOOK_SECRET` | Shared secret required by `/api/cms-webhook` |

Optional Triadflair-specific names also supported:

| Name | Purpose |
| --- | --- |
| `TRIADFLAIR_CMS_BASE` | Alternative CMS base URL for this repo |
| `TRIADFLAIR_CMS_TOKEN` | Alternative CMS token for this repo |
| `VITE_CMS_API_BASE_URL` | CMS API base URL used by browser fetches |
| `VITE_CMS_SITE_TOKEN` | Site token used by browser fetches |
| `VITE_TRIADFLAIR_CMS_API_BASE_URL` | Triadflair-specific API base exposed to Vite |
| `VITE_TRIADFLAIR_CMS_TOKEN` | Triadflair-specific token exposed to Vite |

## Current Token / Hook Values

Use these values in Vercel:

- `CMS_TOKEN=4cbc91718e6de67541730cb693b37bfa35a4eeb13ebad17e3df36dc18e69d774`
- `VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/prj_xmZRA59f2bnityqPticaEsJXSaV1/U5vhwwxdme`
- `CMS_WEBHOOK_SECRET=9a52cae5c9c45706961526d464cab7d66eaa05c2d9d0f9bc3a7347c3dfdfbde9`

## Blog Endpoints in This App

- `/blog`: all posts
- `/blog/:slug`: single post

Blog data is fetched directly from CMS using:

- `GET /api/public/posts`
- `GET /api/public/posts/:slug`
- header: `X-Site-Token: <CMS_TOKEN>`

## Sitemap Behavior

During every build, `prebuild` regenerates `public/sitemap.xml` with:

- static app routes
- keyword landing page routes from `public/keywords.json`
- live CMS blog post routes from the public posts API

When a post is updated or deleted in CMS, the next webhook-triggered deploy rebuilds the sitemap from the current CMS post list, so deleted posts disappear automatically.

## Webhook Configuration in CMS

Configure your CMS webhook to call:

`https://triadflair.com/api/cms-webhook?secret=9a52cae5c9c45706961526d464cab7d66eaa05c2d9d0f9bc3a7347c3dfdfbde9`

Use method `POST`.

When the endpoint validates the secret, it calls `VERCEL_DEPLOY_HOOK_URL` to trigger a rebuild/deploy. During build, `prebuild` regenerates `public/sitemap.xml` with current blog URLs.
