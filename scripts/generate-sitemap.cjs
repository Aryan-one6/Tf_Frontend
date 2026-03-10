const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env") });
dotenv.config({ path: path.join(rootDir, ".env.local") });
dotenv.config({ path: path.join(rootDir, ".env.production") });
dotenv.config({ path: path.join(rootDir, ".env.production.local") });

const DEFAULT_SITE_URL = "https://triadflair.com";
const DEFAULT_CMS_BASE = "https://cms-backend.ppconsultings.com/api";
const DEFAULT_CMS_TOKEN =
  "4cbc91718e6de67541730cb693b37bfa35a4eeb13ebad17e3df36dc18e69d774";
const MAX_RETRIES = 3;

const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/+$/, "");
const rawCmsBase = (
  process.env.CMS_BASE ||
  process.env.TRIADFLAIR_CMS_BASE ||
  process.env.VITE_CMS_API_BASE_URL ||
  process.env.VITE_CMS_API_BASE ||
  process.env.VITE_TRIADFLAIR_CMS_API_BASE_URL ||
  process.env.VITE_TRIADFLAIR_CMS_BASE ||
  DEFAULT_CMS_BASE
)
  .trim()
  .replace(/\/+$/, "");
const CMS_BASE = rawCmsBase.endsWith("/api")
  ? rawCmsBase
  : rawCmsBase.endsWith("/api/public")
    ? rawCmsBase.slice(0, -"/public".length)
    : `${rawCmsBase}/api`;
const CMS_TOKEN = (
  process.env.CMS_TOKEN ||
  process.env.TRIADFLAIR_CMS_TOKEN ||
  process.env.VITE_CMS_SITE_TOKEN ||
  process.env.VITE_TRIADFLAIR_CMS_TOKEN ||
  DEFAULT_CMS_TOKEN
).trim();

const outputPath = path.join(rootDir, "public", "sitemap.xml");
const robotsPath = path.join(rootDir, "public", "robots.txt");
const keywordsPath = path.join(rootDir, "public", "keywords.json");
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/ai-agent-development",
  "/ai-automation",
  "/chatbot-development",
  "/digital-marketing",
  "/disclaimer",
  "/mobile-app-development",
  "/pricing",
  "/privacy",
  "/service",
  "/terms",
  "/web-development",
];

const entries = new Map();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sanitizeLastmod = (value) => {
  if (!value) return today;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return today;
  return parsed.toISOString().split("T")[0];
};

const absoluteUrl = (value) => {
  if (/^https?:\/\//i.test(String(value || ""))) return String(value);
  const safePath = String(value || "/");
  return `${SITE_URL}${safePath.startsWith("/") ? "" : "/"}${safePath}`;
};

const escapeXml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const addEntry = ({ loc, lastmod = today, changefreq = "weekly", priority = "0.7" }) => {
  const normalizedLoc = absoluteUrl(loc);
  const normalizedLastmod = sanitizeLastmod(lastmod);
  const existing = entries.get(normalizedLoc);

  if (!existing) {
    entries.set(normalizedLoc, {
      loc: normalizedLoc,
      lastmod: normalizedLastmod,
      changefreq,
      priority,
    });
    return;
  }

  const existingTime = new Date(existing.lastmod).getTime();
  const nextTime = new Date(normalizedLastmod).getTime();
  if (nextTime > existingTime) {
    entries.set(normalizedLoc, {
      ...existing,
      lastmod: normalizedLastmod,
      changefreq,
      priority,
    });
  }
};

const parseJsonSafely = async (response) => {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

const getPostList = (payload) => {
  if (Array.isArray(payload?.posts)) return payload.posts;
  if (Array.isArray(payload?.data?.posts)) return payload.data.posts;
  return [];
};

const getPostTotal = (payload, fallbackCount) => {
  const total = payload?.total ?? payload?.data?.total ?? payload?.count ?? fallbackCount;
  const parsed = Number(total);
  return Number.isFinite(parsed) ? parsed : fallbackCount;
};

async function fetchCmsPayload(url) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Site-Token": CMS_TOKEN,
          Accept: "application/json",
        },
      });
      const payload = await parseJsonSafely(response);

      if (response.ok) return payload;

      const detail = payload?.message || payload?.error || response.statusText;
      lastError = new Error(`CMS fetch failed (${response.status}): ${detail}`);
      if (response.status < 500 && response.status !== 429 && response.status !== 408 && response.status !== 425) {
        throw lastError;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("CMS fetch failed");
    }

    if (attempt < MAX_RETRIES) {
      await sleep(250 * attempt);
    }
  }

  throw lastError || new Error("CMS fetch failed");
}

async function fetchBlogEntries() {
  if (!CMS_TOKEN) {
    console.warn("[sitemap] Skipping CMS blog URLs because CMS_TOKEN is missing.");
    return { blogEntries: [], latestBlogLastmod: today };
  }

  const limit = 100;

  try {
    const fetchPage = async (page) => {
      const query = new URLSearchParams({ page: String(page), limit: String(limit) });
      return fetchCmsPayload(`${CMS_BASE}/public/posts?${query.toString()}`);
    };

    const firstPage = await fetchPage(1);
    const firstPosts = getPostList(firstPage);
    const totalPages = Math.max(1, Math.ceil(getPostTotal(firstPage, firstPosts.length) / limit));
    const posts = [...firstPosts];

    for (let page = 2; page <= totalPages; page += 1) {
      const nextPage = await fetchPage(page);
      posts.push(...getPostList(nextPage));
    }

    let latestBlogLastmod = today;
    const blogEntries = posts
      .map((post) => {
        const slug = typeof post?.slug === "string" ? post.slug.trim() : "";
        if (!slug) return null;

        const lastmod = sanitizeLastmod(post?.publishedAt || post?.updatedAt || post?.createdAt || today);
        if (lastmod > latestBlogLastmod) latestBlogLastmod = lastmod;

        return {
          loc: `/blog/${slug}`,
          lastmod,
          changefreq: "weekly",
          priority: "0.6",
        };
      })
      .filter(Boolean);

    return { blogEntries, latestBlogLastmod };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`[sitemap] CMS fetch failed. Continuing with static URLs only. ${message}`);
    return { blogEntries: [], latestBlogLastmod: today };
  }
}

function addKeywordEntries() {
  if (!fs.existsSync(keywordsPath)) return;

  try {
    const keywordFile = JSON.parse(fs.readFileSync(keywordsPath, "utf8"));
    const keywords = Array.isArray(keywordFile?.keywords) ? keywordFile.keywords : [];
    keywords.forEach((entry) => {
      const slug = typeof entry?.slug === "string" ? entry.slug.trim() : "";
      if (!slug) return;
      addEntry({ loc: `/${slug}`, lastmod: today, changefreq: "weekly", priority: "0.6" });
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`[sitemap] Failed to read keyword routes. ${message}`);
  }
}

async function generateSitemap() {
  staticPages.forEach((page) => {
    addEntry({
      loc: page,
      lastmod: today,
      changefreq: "weekly",
      priority: page === "/" ? "1.0" : page === "/blog" ? "0.8" : "0.7",
    });
  });

  addKeywordEntries();

  const { blogEntries, latestBlogLastmod } = await fetchBlogEntries();
  addEntry({ loc: "/blog", lastmod: latestBlogLastmod, changefreq: "weekly", priority: "0.8" });
  blogEntries.forEach(addEntry);

  const body = Array.from(entries.values())
    .map(
      (entry) => `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n    <changefreq>${escapeXml(entry.changefreq)}</changefreq>\n    <priority>${escapeXml(entry.priority)}</priority>\n  </url>`,
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`;

  fs.writeFileSync(outputPath, xml, "utf8");
  fs.writeFileSync(
    robotsPath,
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/private/\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    "utf8",
  );

  console.log(`[sitemap] Wrote ${entries.size} URLs to ${outputPath} (${blogEntries.length} blog URLs).`);
}

generateSitemap().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.warn(`[sitemap] Unexpected failure. Static sitemap generation failed: ${message}`);
  process.exit(0);
});
