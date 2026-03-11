const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.local"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.production"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.production.local"), quiet: true });

const DEFAULT_SITE_URL = "https://triadflair.com";
const DEFAULT_CMS_API_BASE = "https://cms-backend.ppconsultings.com/api/public";
const POST_PATH_PREFIX = "/blog";
const SITE_TOKEN_ENV = "SAPPHIRE_TOKEN";
const BRAND_NAME = "Triad Flair";
const BRAND_TAGLINE = "AI automation, web development, and PPC execution built for measurable growth.";
const FALLBACK_IMAGE_PATH = "/cms_post.webp";
const MAX_RETRIES = 3;
const LISTING_LIMIT = 10;

const publicDir = path.join(rootDir, "public");
const blogDir = path.join(publicDir, POST_PATH_PREFIX.replace(/^\/+/, ""));
const blogDataDir = path.join(publicDir, "cms-blog");
const postsSitemapPath = path.join(publicDir, "posts-sitemap.xml");
const robotsPath = path.join(publicDir, "robots.txt");
const notFoundPath = path.join(publicDir, "404.html");

const siteUrl = normalizeSiteUrl(process.env.SITE_URL || DEFAULT_SITE_URL);
const domain = new URL(siteUrl).hostname;
const cmsApiBase = normalizeCmsPublicBase(
  process.env.SAPPHIRE_API_BASE ||
    process.env.CMS_BASE ||
    process.env.TRIADFLAIR_CMS_BASE ||
    DEFAULT_CMS_API_BASE,
);
const cmsToken = String(
  process.env[SITE_TOKEN_ENV] ||
    process.env.CMS_TOKEN ||
    process.env.TRIADFLAIR_CMS_TOKEN ||
    "",
).trim();

function normalizeSiteUrl(value) {
  const safeValue = String(value || "").trim().replace(/\/+$/, "");
  return safeValue || DEFAULT_SITE_URL;
}

function normalizeCmsPublicBase(value) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  if (!trimmed) return DEFAULT_CMS_API_BASE;

  let normalized = trimmed;
  if (normalized.endsWith("/api/public")) normalized = normalized;
  else if (normalized.endsWith("/api")) normalized = `${normalized}/public`;
  else if (!normalized.endsWith("/public")) normalized = `${normalized}/api/public`;

  try {
    const cmsUrl = new URL(normalized);
    const siteHost = new URL(siteUrl).hostname;
    const siteIsLocalhost = /(^localhost$|^127\.0\.0\.1$)/i.test(siteHost);
    const cmsIsLocalhost = /(^localhost$|^127\.0\.0\.1$)/i.test(cmsUrl.hostname);

    if (!siteIsLocalhost && cmsIsLocalhost) {
      return DEFAULT_CMS_API_BASE;
    }
  } catch {
    return DEFAULT_CMS_API_BASE;
  }

  return normalized;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function replaceDir(targetDir, sourceDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.renameSync(sourceDir, targetDir);
}

function writeFileAtomic(targetPath, contents) {
  ensureDir(path.dirname(targetPath));
  const tmpPath = `${targetPath}.tmp`;
  fs.writeFileSync(tmpPath, contents, "utf8");
  fs.renameSync(tmpPath, targetPath);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function stripHtml(value) {
  return decodeHtmlEntities(String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function ellipsis(value, maxLength) {
  const safeValue = String(value || "").trim();
  if (safeValue.length <= maxLength) return safeValue;
  return `${safeValue.slice(0, maxLength).trimEnd()}...`;
}

function sanitizeContentHtml(value) {
  return String(value || "")
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\son[a-z-]+=(["']).*?\1/gi, "")
    .replace(/\son[a-z-]+=([^\s>]+)/gi, "");
}

function monthShort(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

function formatDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateCompact(value) {
  if (!value) return { day: "--", month: "" };
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return { day: "--", month: "" };
  return {
    day: String(parsed.getDate()).padStart(2, "0"),
    month: monthShort(parsed),
  };
}

function readingMinutes(html) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function sanitizeLastmod(value) {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

function absoluteUrl(value) {
  const safeValue = String(value || "").trim();
  if (!safeValue) return `${siteUrl}${FALLBACK_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(safeValue)) return safeValue;
  if (safeValue.startsWith("//")) return `https:${safeValue}`;
  try {
    return new URL(safeValue, `${siteUrl}/`).toString();
  } catch {
    return `${siteUrl}${safeValue.startsWith("/") ? "" : "/"}${safeValue}`;
  }
}

function postUrl(slug) {
  return `${siteUrl}${POST_PATH_PREFIX}/${encodeURIComponent(slug)}`.replace(/%2F/g, "/");
}

function listUrl() {
  return `${siteUrl}${POST_PATH_PREFIX}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchText(url, init = {}) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, init);
      const text = await response.text();
      if (response.ok) return { response, text };

      lastError = new Error(`Request failed (${response.status}) for ${url}: ${text.slice(0, 400)}`);
      if (response.status < 500 && response.status !== 408 && response.status !== 425 && response.status !== 429) {
        throw lastError;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(`Request failed for ${url}`);
    }

    if (attempt < MAX_RETRIES) {
      await sleep(250 * attempt);
    }
  }

  throw lastError || new Error(`Request failed for ${url}`);
}

async function fetchJson(url, init = {}) {
  const { text } = await fetchText(url, init);
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON returned for ${url}`);
  }
}

function asRecord(value) {
  return value && typeof value === "object" ? value : null;
}

function readString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function pickString(record, keys) {
  for (const key of keys) {
    const nextValue = readString(record?.[key]);
    if (nextValue) return nextValue;
  }
  return "";
}

function extractTags(record) {
  const rawTags = record?.tags ?? record?.tagList ?? record?.categories;
  if (!Array.isArray(rawTags)) return [];

  return rawTags
    .map((entry) => {
      if (typeof entry === "string") return entry.trim();
      const nested = asRecord(entry);
      if (!nested) return "";
      const directName = pickString(nested, ["name", "label", "value", "tag", "slug", "title"]);
      if (directName) return directName;

      const linked = asRecord(nested.tag) || asRecord(nested.category);
      return linked ? pickString(linked, ["name", "label", "value", "tag", "slug", "title"]) : "";
    })
    .filter(Boolean);
}

function extractCoverImage(record) {
  const keys = [
    "coverImageUrl",
    "cover_image_url",
    "featuredImageUrl",
    "imageUrl",
    "thumbnailUrl",
    "coverImage",
    "featuredImage",
    "image",
    "heroImage",
    "bannerUrl",
  ];

  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return absoluteUrl(value);

    const nested = asRecord(value);
    if (nested) {
      const nestedUrl = pickString(nested, ["url", "src", "secureUrl"]);
      if (nestedUrl) return absoluteUrl(nestedUrl);
    }
  }

  return absoluteUrl(FALLBACK_IMAGE_PATH);
}

function normalizePost(rawPost, index = 0) {
  const record = asRecord(rawPost);
  if (!record) return null;

  const slug = pickString(record, ["slug", "postSlug", "urlSlug"]) || `post-${index}`;
  const id = pickString(record, ["id", "_id", "postId"]) || slug;
  if (!slug || !id) return null;

  const contentHtml = sanitizeContentHtml(
    pickString(record, ["contentHtml", "content_html", "html", "content", "body"]),
  );
  const plainContent = stripHtml(contentHtml);
  const excerptSource = pickString(record, ["excerpt", "summary", "description", "seoDescription"]);
  const excerpt = excerptSource || ellipsis(plainContent, 180);
  const authorRecord = asRecord(record.author);
  const authorName =
    pickString(record, ["authorName", "createdByName"]) ||
    (authorRecord ? pickString(authorRecord, ["name", "fullName"]) : "") ||
    BRAND_NAME;
  const authorEmail = authorRecord ? pickString(authorRecord, ["email"]) : "";
  const publishedAt = pickString(record, ["publishedAt", "published_at", "publishedOn", "createdAt"]);
  const updatedAt = pickString(record, ["updatedAt", "updated_at"]) || publishedAt;
  const createdAt = pickString(record, ["createdAt", "created_at"]) || publishedAt || updatedAt;

  return {
    id,
    slug,
    title: pickString(record, ["title", "name", "seoTitle"]) || "Untitled Post",
    excerpt,
    description: excerpt || ellipsis(plainContent, 160),
    coverImageUrl: extractCoverImage(record),
    contentHtml,
    authorName,
    authorEmail,
    publishedAt,
    updatedAt,
    createdAt,
    tags: extractTags(record),
  };
}

function comparePosts(a, b) {
  const aTime = new Date(a.publishedAt || a.updatedAt || a.createdAt || 0).getTime();
  const bTime = new Date(b.publishedAt || b.updatedAt || b.createdAt || 0).getTime();
  return bTime - aTime;
}

async function fetchPostsPage(page, limit) {
  const url = new URL(`${cmsApiBase}/posts`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("includeTotal", "1");

  const payload = await fetchJson(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Site-Token": cmsToken,
    },
  });

  const posts = Array.isArray(payload?.posts)
    ? payload.posts
    : Array.isArray(payload?.data?.posts)
      ? payload.data.posts
      : [];
  const total =
    readNumber(payload?.total) ??
    readNumber(payload?.data?.total) ??
    readNumber(payload?.count) ??
    posts.length;

  return { posts, total };
}

async function fetchPostDetail(slug) {
  const payload = await fetchJson(`${cmsApiBase}/posts/${encodeURIComponent(slug)}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Site-Token": cmsToken,
    },
  });

  return normalizePost(payload?.post || payload, 0);
}

async function mapLimit(items, limit, iteratee) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      results[currentIndex] = await iteratee(items[currentIndex], currentIndex);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function fetchCmsPosts() {
  if (!cmsToken) {
    throw new Error(`Missing ${SITE_TOKEN_ENV}.`);
  }

  const listingResponse = await fetchPostsPage(1, LISTING_LIMIT);
  const listingPosts = listingResponse.posts
    .map((post, index) => normalizePost(post, index))
    .filter(Boolean);

  const pageSize = 100;
  const firstPage = await fetchPostsPage(1, pageSize);
  const allRecords = [...firstPage.posts];
  const totalPages = Math.max(1, Math.ceil((firstPage.total || allRecords.length) / pageSize));

  for (let page = 2; page <= totalPages; page += 1) {
    const nextPage = await fetchPostsPage(page, pageSize);
    allRecords.push(...nextPage.posts);
  }

  const uniqueMeta = [];
  const seenSlugs = new Set();
  allRecords.forEach((record, index) => {
    const normalized = normalizePost(record, index);
    if (!normalized || seenSlugs.has(normalized.slug)) return;
    seenSlugs.add(normalized.slug);
    uniqueMeta.push(normalized);
  });

  const hydratedPosts = (
    await mapLimit(uniqueMeta, 4, async (post) => {
      try {
        const detail = await fetchPostDetail(post.slug);
        return detail ? { ...post, ...detail } : post;
      } catch {
        return post;
      }
    })
  )
    .filter(Boolean)
    .sort(comparePosts);

  const latestPosts = listingPosts.length
    ? listingPosts
        .map((post) => hydratedPosts.find((entry) => entry.slug === post.slug) || post)
        .filter(Boolean)
    : hydratedPosts.slice(0, LISTING_LIMIT);

  return {
    allPosts: hydratedPosts,
    listingPosts: latestPosts,
    total: firstPage.total || hydratedPosts.length,
  };
}

function renderShell({ title, description, canonical, ogImage, ogType, robots, bodyClass, body, jsonLd }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeAttribute(description || BRAND_TAGLINE);
  const safeCanonical = escapeAttribute(canonical);
  const safeOgImage = escapeAttribute(absoluteUrl(ogImage || FALLBACK_IMAGE_PATH));
  const safeRobots = escapeAttribute(robots || "index,follow");
  const safeJsonLd = jsonLd ? JSON.stringify(jsonLd) : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}" />
  <meta name="robots" content="${safeRobots}" />
  <link rel="canonical" href="${safeCanonical}" />
  <meta property="og:site_name" content="${escapeAttribute(BRAND_NAME)}" />
  <meta property="og:type" content="${escapeAttribute(ogType || "website")}" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${safeDescription}" />
  <meta property="og:url" content="${safeCanonical}" />
  <meta property="og:image" content="${safeOgImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${safeTitle}" />
  <meta name="twitter:description" content="${safeDescription}" />
  <meta name="twitter:image" content="${safeOgImage}" />
  <link rel="preload" href="/assets/fonts/Ambit Regular.otf" as="font" type="font/otf" crossorigin />
  <style>
    @font-face {
      font-family: "Ambit";
      src: url("/assets/fonts/Ambit Regular.otf") format("opentype");
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: "Ambit";
      src: url("/assets/fonts/Ambit SemiBold.otf") format("opentype");
      font-weight: 600;
      font-style: normal;
      font-display: swap;
    }

    :root {
      --ppc-bg: #fbf7ef;
      --ppc-surface: rgba(255, 255, 255, 0.88);
      --ppc-surface-strong: #ffffff;
      --ppc-text: #142035;
      --ppc-muted: #59657a;
      --ppc-line: rgba(20, 32, 53, 0.12);
      --ppc-accent: #ff7b3d;
      --ppc-accent-dark: #df5f23;
      --ppc-ink: #172033;
      --ppc-shadow: 0 24px 60px rgba(20, 32, 53, 0.12);
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      font-family: "Ambit", sans-serif;
      color: var(--ppc-text);
      background:
        radial-gradient(circle at top left, rgba(255, 123, 61, 0.18), transparent 28%),
        radial-gradient(circle at 80% 0%, rgba(20, 32, 53, 0.08), transparent 26%),
        linear-gradient(180deg, #fffdf9 0%, var(--ppc-bg) 56%, #f3ede3 100%);
      line-height: 1.65;
    }
    a { color: inherit; }
    img { max-width: 100%; height: auto; display: block; }
    .ppc-shell { width: min(1160px, calc(100vw - 32px)); margin: 0 auto; }
    .ppc-header {
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(14px);
      background: rgba(251, 247, 239, 0.84);
      border-bottom: 1px solid rgba(20, 32, 53, 0.08);
    }
    .ppc-header__inner {
      width: min(1160px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 18px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .ppc-brand {
      text-decoration: none;
      color: var(--ppc-ink);
      font-size: 1.05rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
    .ppc-nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 14px;
    }
    .ppc-nav a {
      text-decoration: none;
      color: var(--ppc-muted);
      font-size: 0.95rem;
    }
    .ppc-nav a:hover,
    .ppc-nav a:focus-visible {
      color: var(--ppc-ink);
    }
    .ppc-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 44px;
      padding: 0 18px;
      border: 0;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--ppc-accent) 0%, #ff9c5b 100%);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      box-shadow: 0 14px 30px rgba(255, 123, 61, 0.24);
    }
    .ppc-button:hover,
    .ppc-button:focus-visible {
      background: linear-gradient(135deg, var(--ppc-accent-dark) 0%, #ff8745 100%);
    }
    .ppc-hero {
      padding: 64px 0 28px;
    }
    .ppc-kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.68);
      color: var(--ppc-accent-dark);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border: 1px solid rgba(255, 123, 61, 0.16);
    }
    .ppc-kicker::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--ppc-accent);
      box-shadow: 0 0 0 6px rgba(255, 123, 61, 0.12);
    }
    .ppc-hero h1,
    .ppc-hero h2 {
      margin: 18px 0 14px;
      max-width: 14ch;
      color: var(--ppc-ink);
      font-size: clamp(2.4rem, 4vw, 4.2rem);
      line-height: 0.98;
      letter-spacing: -0.04em;
    }
    .ppc-hero p {
      margin: 0;
      max-width: 62ch;
      color: var(--ppc-muted);
      font-size: 1.05rem;
    }
    .ppc-layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 320px;
      gap: 30px;
      padding: 22px 0 84px;
      align-items: start;
    }
    .ppc-card {
      background: var(--ppc-surface);
      border: 1px solid var(--ppc-line);
      border-radius: 28px;
      box-shadow: var(--ppc-shadow);
      overflow: hidden;
    }
    .ppc-list {
      display: grid;
      gap: 18px;
    }
    .ppc-post-card {
      display: grid;
      grid-template-columns: 220px minmax(0, 1fr);
      gap: 24px;
      padding: 20px;
    }
    .ppc-post-card__media img {
      width: 100%;
      height: 100%;
      min-height: 180px;
      object-fit: cover;
      border-radius: 20px;
    }
    .ppc-post-card__meta,
    .ppc-sidebar__meta,
    .ppc-article__meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 0 0 14px;
      padding: 0;
      list-style: none;
      color: var(--ppc-muted);
      font-size: 0.86rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .ppc-post-card__title,
    .ppc-sidebar__title,
    .ppc-article__title {
      margin: 0 0 12px;
      color: var(--ppc-ink);
      font-size: clamp(1.5rem, 2vw, 2.2rem);
      line-height: 1.08;
      letter-spacing: -0.03em;
    }
    .ppc-post-card__title a,
    .ppc-sidebar__title a {
      text-decoration: none;
    }
    .ppc-post-card__title a:hover,
    .ppc-post-card__title a:focus-visible,
    .ppc-sidebar__title a:hover,
    .ppc-sidebar__title a:focus-visible {
      color: var(--ppc-accent-dark);
    }
    .ppc-post-card p,
    .ppc-sidebar p {
      margin: 0;
      color: var(--ppc-muted);
    }
    .ppc-sidebar {
      display: grid;
      gap: 18px;
      position: sticky;
      top: 104px;
    }
    .ppc-sidebar section {
      padding: 22px;
    }
    .ppc-sidebar h3 {
      margin: 0 0 14px;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
    }
    .ppc-sidebar__list {
      display: grid;
      gap: 14px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .ppc-sidebar__list li + li {
      padding-top: 14px;
      border-top: 1px solid var(--ppc-line);
    }
    .ppc-tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .ppc-tag-list li {
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(20, 32, 53, 0.06);
      color: var(--ppc-muted);
      font-size: 0.84rem;
    }
    .ppc-article {
      padding: 28px;
    }
    .ppc-article__cover {
      margin: 0 0 24px;
      overflow: hidden;
      border-radius: 24px;
      background: rgba(20, 32, 53, 0.06);
    }
    .ppc-article__cover img {
      width: 100%;
      min-height: 300px;
      object-fit: cover;
    }
    .ppc-article__body {
      color: var(--ppc-text);
      font-size: 1rem;
    }
    .ppc-article__body > *:first-child { margin-top: 0; }
    .ppc-article__body h1,
    .ppc-article__body h2,
    .ppc-article__body h3,
    .ppc-article__body h4 {
      color: var(--ppc-ink);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 1.7em 0 0.65em;
    }
    .ppc-article__body p,
    .ppc-article__body ul,
    .ppc-article__body ol,
    .ppc-article__body blockquote {
      margin: 0 0 1.15em;
    }
    .ppc-article__body ul,
    .ppc-article__body ol {
      padding-left: 1.3em;
    }
    .ppc-article__body a {
      color: var(--ppc-accent-dark);
      text-decoration-thickness: 0.08em;
      text-underline-offset: 0.14em;
    }
    .ppc-article__body img,
    .ppc-article__body iframe,
    .ppc-article__body video,
    .ppc-article__body table {
      max-width: 100%;
    }
    .ppc-article__body table {
      width: 100%;
      display: block;
      overflow-x: auto;
      border-collapse: collapse;
      margin-bottom: 1.4em;
    }
    .ppc-article__body th,
    .ppc-article__body td {
      border: 1px solid rgba(20, 32, 53, 0.12);
      padding: 12px;
    }
    .ppc-empty,
    .ppc-error {
      padding: 36px 28px;
      color: var(--ppc-muted);
    }
    .ppc-footer {
      padding: 0 0 48px;
      color: var(--ppc-muted);
      font-size: 0.94rem;
    }
    .ppc-footer__card {
      padding: 24px 28px;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
    }
    .ppc-footer__card a {
      color: var(--ppc-ink);
      text-decoration: none;
      font-weight: 600;
    }
    .ppc-footer__card a:hover,
    .ppc-footer__card a:focus-visible {
      color: var(--ppc-accent-dark);
    }
    .ppc-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(20, 32, 53, 0.06);
      color: var(--ppc-muted);
      font-size: 0.82rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .ppc-breadcrumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 0 0 18px;
      padding: 0;
      list-style: none;
      color: var(--ppc-muted);
      font-size: 0.9rem;
    }
    .ppc-breadcrumbs a {
      color: var(--ppc-muted);
      text-decoration: none;
    }
    .ppc-breadcrumbs a:hover,
    .ppc-breadcrumbs a:focus-visible {
      color: var(--ppc-ink);
    }
    @media (max-width: 960px) {
      .ppc-layout {
        grid-template-columns: 1fr;
      }
      .ppc-sidebar {
        position: static;
      }
      .ppc-post-card {
        grid-template-columns: 1fr;
      }
      .ppc-post-card__media img {
        min-height: 220px;
      }
      .ppc-footer__card {
        align-items: flex-start;
      }
    }
    @media (max-width: 640px) {
      .ppc-header__inner,
      .ppc-shell {
        width: min(1160px, calc(100vw - 24px));
      }
      .ppc-hero {
        padding-top: 42px;
      }
      .ppc-article,
      .ppc-sidebar section {
        padding: 20px;
      }
    }
  </style>
  ${jsonLd ? `<script type="application/ld+json">${safeJsonLd}</script>` : ""}
</head>
<body class="${escapeAttribute(bodyClass || "")}">
  <header class="ppc-header">
    <div class="ppc-header__inner">
      <a class="ppc-brand" href="/">${escapeHtml(BRAND_NAME)}</a>
      <nav class="ppc-nav" aria-label="Primary">
        <a href="/">Home</a>
        <a href="/ai-automation">AI Automation</a>
        <a href="${escapeAttribute(POST_PATH_PREFIX)}">Blog</a>
        <a href="/digital-marketing">PPC & Marketing</a>
        <a href="/contact" class="ppc-button">Talk to us</a>
      </nav>
    </div>
  </header>
  ${body}
  <footer class="ppc-footer">
    <div class="ppc-shell">
      <div class="ppc-card ppc-footer__card">
        <div>
          <strong>${escapeHtml(BRAND_NAME)}</strong><br />
          <span>${escapeHtml(BRAND_TAGLINE)}</span>
        </div>
        <div>
          <a href="/contact">Start a project</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function renderPostCard(post) {
  const metaDate = formatDate(post.publishedAt || post.updatedAt || post.createdAt);
  const dateChip = formatDateCompact(post.publishedAt || post.updatedAt || post.createdAt);
  const excerpt = post.description || post.excerpt || ellipsis(stripHtml(post.contentHtml), 180);

  return `<article class="ppc-card ppc-post-card">
    <a class="ppc-post-card__media" href="${escapeAttribute(`${POST_PATH_PREFIX}/${post.slug}`)}">
      <img src="${escapeAttribute(post.coverImageUrl)}" alt="${escapeAttribute(post.title)}" loading="lazy" />
    </a>
    <div>
      <ul class="ppc-post-card__meta">
        <li><span class="ppc-badge">${escapeHtml(dateChip.day)} ${escapeHtml(dateChip.month)}</span></li>
        ${metaDate ? `<li>${escapeHtml(metaDate)}</li>` : ""}
      </ul>
      <h2 class="ppc-post-card__title">
        <a href="${escapeAttribute(`${POST_PATH_PREFIX}/${post.slug}`)}">${escapeHtml(post.title)}</a>
      </h2>
      <p>${escapeHtml(excerpt)}</p>
      <p style="margin-top:18px;">
        <a class="ppc-button" href="${escapeAttribute(`${POST_PATH_PREFIX}/${post.slug}`)}">Read article</a>
      </p>
    </div>
  </article>`;
}

function renderSidebarPosts(posts) {
  if (!posts.length) {
    return `<li>No additional posts available.</li>`;
  }

  return posts
    .map(
      (post) => `<li>
        <p class="ppc-sidebar__meta">${escapeHtml(formatDate(post.publishedAt || post.updatedAt || post.createdAt))}</p>
        <h4 class="ppc-sidebar__title" style="font-size:1.05rem; margin:0;">
          <a href="${escapeAttribute(`${POST_PATH_PREFIX}/${post.slug}`)}">${escapeHtml(post.title)}</a>
        </h4>
      </li>`,
    )
    .join("");
}

function renderListingPage(posts, allPosts) {
  const description =
    "Fresh PPC, automation, AI, and growth execution insights from the Triad Flair team.";
  const body = `<main class="ppc-shell">
    <section class="ppc-hero">
      <span class="ppc-kicker">PPC CMS Blog</span>
      <h1>Execution notes, not content filler.</h1>
      <p>Direct from PPC CMS, these posts are rendered as real crawlable pages on first load with clean canonical URLs and internal links.</p>
    </section>
    <section class="ppc-layout">
      <div class="ppc-list">
        ${posts.length ? posts.map(renderPostCard).join("") : `<div class="ppc-card ppc-empty">No posts are available yet.</div>`}
      </div>
      <aside class="ppc-sidebar">
        <section class="ppc-card">
          <h3>Why this matters</h3>
          <p>This listing is statically generated during build, so crawlers receive article links in the initial HTML rather than a homepage shell.</p>
        </section>
        <section class="ppc-card">
          <h3>Latest posts</h3>
          <ul class="ppc-sidebar__list">
            ${renderSidebarPosts(allPosts.slice(0, 5))}
          </ul>
        </section>
      </aside>
    </section>
  </main>`;

  return renderShell({
    title: `Blog | ${BRAND_NAME}`,
    description,
    canonical: listUrl(),
    ogImage: posts[0]?.coverImageUrl || absoluteUrl(FALLBACK_IMAGE_PATH),
    ogType: "website",
    body,
  });
}

function renderPostPage(post, latestPosts) {
  const canonical = postUrl(post.slug);
  const description = post.description || post.excerpt || ellipsis(stripHtml(post.contentHtml), 160);
  const relatedPosts = latestPosts.filter((entry) => entry.slug !== post.slug).slice(0, 4);
  const publishedAt = sanitizeLastmod(post.publishedAt || post.createdAt || post.updatedAt);
  const updatedAt = sanitizeLastmod(post.updatedAt || post.publishedAt || post.createdAt);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: [absoluteUrl(post.coverImageUrl)],
    datePublished: publishedAt,
    dateModified: updatedAt,
    mainEntityOfPage: canonical,
    url: canonical,
    author: {
      "@type": "Person",
      name: post.authorName || BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico"),
      },
    },
  };

  const body = `<main class="ppc-shell">
    <section class="ppc-hero">
      <ul class="ppc-breadcrumbs">
        <li><a href="/">Home</a></li>
        <li>/</li>
        <li><a href="${escapeAttribute(POST_PATH_PREFIX)}">Blog</a></li>
        <li>/</li>
        <li>${escapeHtml(post.title)}</li>
      </ul>
      <span class="ppc-kicker">Article</span>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(description)}</p>
    </section>
    <section class="ppc-layout">
      <article class="ppc-card ppc-article">
        <figure class="ppc-article__cover">
          <img src="${escapeAttribute(post.coverImageUrl)}" alt="${escapeAttribute(post.title)}" />
        </figure>
        <ul class="ppc-article__meta">
          <li>${escapeHtml(post.authorName || BRAND_NAME)}</li>
          ${post.authorEmail ? `<li><a href="mailto:${escapeAttribute(post.authorEmail)}">${escapeHtml(post.authorEmail)}</a></li>` : ""}
          ${formatDate(post.publishedAt || post.updatedAt || post.createdAt) ? `<li>${escapeHtml(formatDate(post.publishedAt || post.updatedAt || post.createdAt))}</li>` : ""}
          <li>${escapeHtml(String(readingMinutes(post.contentHtml)))} min read</li>
        </ul>
        <div class="ppc-article__body">
          ${post.contentHtml || `<p>${escapeHtml(post.excerpt || description)}</p>`}
        </div>
      </article>
      <aside class="ppc-sidebar">
        <section class="ppc-card">
          <h3>Latest posts</h3>
          <ul class="ppc-sidebar__list">
            ${renderSidebarPosts(relatedPosts)}
          </ul>
        </section>
        <section class="ppc-card">
          <h3>Topics</h3>
          <ul class="ppc-tag-list">
            ${(post.tags && post.tags.length ? post.tags : ["Growth", "Automation", "PPC"])
              .map((tag) => `<li>${escapeHtml(tag)}</li>`)
              .join("")}
          </ul>
        </section>
        <section class="ppc-card">
          <h3>Need execution help?</h3>
          <p>${escapeHtml(BRAND_TAGLINE)}</p>
          <p style="margin-top:18px;"><a class="ppc-button" href="/contact">Contact ${escapeHtml(BRAND_NAME)}</a></p>
        </section>
      </aside>
    </section>
  </main>`;

  return renderShell({
    title: `${post.title} | ${BRAND_NAME}`,
    description,
    canonical,
    ogImage: post.coverImageUrl,
    ogType: "article",
    body,
    jsonLd,
  });
}

function renderStatic404() {
  const description = "The requested page could not be found.";
  const body = `<main class="ppc-shell">
    <section class="ppc-hero">
      <span class="ppc-kicker">404</span>
      <h1>That page does not exist.</h1>
      <p>Missing blog slugs should return a real not-found response instead of the homepage. This page handles that case for direct requests.</p>
      <p style="margin-top:24px;">
        <a class="ppc-button" href="${escapeAttribute(POST_PATH_PREFIX)}">View the blog</a>
      </p>
    </section>
  </main>`;

  return renderShell({
    title: `404 Not Found | ${BRAND_NAME}`,
    description,
    canonical: `${siteUrl}/404`,
    ogImage: absoluteUrl(FALLBACK_IMAGE_PATH),
    ogType: "website",
    robots: "noindex,nofollow",
    body,
  });
}

function buildPostsSitemapXml(posts) {
  const urls = posts
    .map((post) => {
      const lastmod = sanitizeLastmod(post.updatedAt || post.publishedAt || post.createdAt);
      return `  <url>\n    <loc>${escapeHtml(postUrl(post.slug))}</loc>\n    <lastmod>${escapeHtml(lastmod)}</lastmod>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function fetchRemotePostsSitemap(posts) {
  const baseUrl = `${cmsApiBase}/posts-sitemap.xml`;
  const candidates = [
    `${baseUrl}?domain=${encodeURIComponent(domain)}`,
    `${baseUrl}?domain=${encodeURIComponent(domain)}&pathPrefix=${encodeURIComponent(POST_PATH_PREFIX)}`,
  ];

  for (const url of candidates) {
    try {
      const { text } = await fetchText(url, {
        method: "GET",
        headers: {
          Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
        },
      });

      if (/^\s*<\?xml/i.test(text) && text.includes(`${siteUrl}${POST_PATH_PREFIX}/`)) {
        return text.endsWith("\n") ? text : `${text}\n`;
      }
    } catch {
      // ignore and continue to the next candidate
    }
  }

  return buildPostsSitemapXml(posts);
}

function writeRobotsFile() {
  const contents = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/private/\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/posts-sitemap.xml\n`;
  writeFileAtomic(robotsPath, contents);
}

function writeEmptyBlogData() {
  ensureDir(blogDataDir);
  fs.rmSync(path.join(blogDataDir, "posts"), { recursive: true, force: true });
  writeFileAtomic(
    path.join(blogDataDir, "posts.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        total: 0,
        pageSize: LISTING_LIMIT,
        posts: [],
      },
      null,
      2,
    ),
  );
}

function writeBlogArtifacts(posts, listingPosts) {
  const tmpBlogDir = path.join(publicDir, ".tmp-blog");
  const tmpDataDir = path.join(publicDir, ".tmp-cms-blog");

  fs.rmSync(tmpBlogDir, { recursive: true, force: true });
  fs.rmSync(tmpDataDir, { recursive: true, force: true });

  ensureDir(tmpBlogDir);
  ensureDir(path.join(tmpDataDir, "posts"));

  writeFileAtomic(path.join(tmpBlogDir, "index.html"), renderListingPage(listingPosts, posts));

  posts.forEach((post) => {
    const postDir = path.join(tmpBlogDir, post.slug);
    ensureDir(postDir);
    writeFileAtomic(path.join(postDir, "index.html"), renderPostPage(post, posts));
    writeFileAtomic(
      path.join(tmpDataDir, "posts", `${post.slug}.json`),
      JSON.stringify(post, null, 2),
    );
  });

  const indexPayload = {
    generatedAt: new Date().toISOString(),
    total: posts.length,
    pageSize: LISTING_LIMIT,
    posts: posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      description: post.description,
      coverImageUrl: post.coverImageUrl,
      authorName: post.authorName,
      authorEmail: post.authorEmail,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      createdAt: post.createdAt,
      tags: post.tags,
    })),
  };

  writeFileAtomic(path.join(tmpDataDir, "posts.json"), JSON.stringify(indexPayload, null, 2));

  replaceDir(blogDir, tmpBlogDir);
  replaceDir(blogDataDir, tmpDataDir);
}

async function main() {
  ensureDir(publicDir);

  let posts = [];
  let listingPosts = [];
  let source = "fallback";

  try {
    const cmsResult = await fetchCmsPosts();
    if (cmsResult.allPosts.length === 0) {
      throw new Error("CMS returned zero posts.");
    }
    posts = cmsResult.allPosts;
    listingPosts = cmsResult.listingPosts.slice(0, LISTING_LIMIT);
    source = "cms";
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown CMS error";
    console.warn(`[cms-blog] CMS fetch failed. Existing static blog output was not regenerated. ${message}`);
  }

  if (posts.length > 0) {
    writeBlogArtifacts(posts, listingPosts);
  } else {
    writeEmptyBlogData();
    console.warn("[cms-blog] No CMS blog data was generated in this build.");
  }

  const postsSitemap = await fetchRemotePostsSitemap(posts);
  writeFileAtomic(postsSitemapPath, postsSitemap);
  writeRobotsFile();
  writeFileAtomic(notFoundPath, renderStatic404());

  console.log(
    `[cms-blog] ${source === "cms" ? "Generated" : "Reused"} ${posts.length} posts, wrote ${postsSitemapPath}, ${robotsPath}, and ${notFoundPath}.`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.warn(`[cms-blog] Unexpected failure. ${message}`);
  process.exit(0);
});
