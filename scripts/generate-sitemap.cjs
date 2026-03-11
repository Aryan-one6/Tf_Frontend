const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("dotenv");

const rootDir = path.join(__dirname, "..");
dotenv.config({ path: path.join(rootDir, ".env"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.local"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.production"), quiet: true });
dotenv.config({ path: path.join(rootDir, ".env.production.local"), quiet: true });

const DEFAULT_SITE_URL = "https://triadflair.com";
const POST_PATH_PREFIX = "/blog";

const siteUrl = String(process.env.SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;
const outputPath = path.join(rootDir, "public", "sitemap.xml");
const robotsPath = path.join(rootDir, "public", "robots.txt");
const keywordsPath = path.join(rootDir, "public", "keywords.json");
const blogIndexPath = path.join(rootDir, "public", "cms-blog", "posts.json");
const today = new Date().toISOString().split("T")[0];

const staticPages = [
  "/",
  "/about",
  "/contact",
  POST_PATH_PREFIX,
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

function sanitizeLastmod(value) {
  if (!value) return today;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return today;
  return parsed.toISOString().split("T")[0];
}

function absoluteUrl(value) {
  if (/^https?:\/\//i.test(String(value || ""))) return String(value);
  const safePath = String(value || "/");
  return `${siteUrl}${safePath.startsWith("/") ? "" : "/"}${safePath}`;
}

function escapeXml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function addEntry({ loc, lastmod = today, changefreq = "weekly", priority = "0.7" }) {
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

  if (new Date(normalizedLastmod).getTime() > new Date(existing.lastmod).getTime()) {
    entries.set(normalizedLoc, {
      ...existing,
      lastmod: normalizedLastmod,
      changefreq,
      priority,
    });
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

function readGeneratedBlogEntries() {
  if (!fs.existsSync(blogIndexPath)) {
    return { blogEntries: [], latestBlogLastmod: today };
  }

  try {
    const payload = JSON.parse(fs.readFileSync(blogIndexPath, "utf8"));
    const posts = Array.isArray(payload?.posts) ? payload.posts : [];
    let latestBlogLastmod = today;

    const blogEntries = posts
      .map((post) => {
        const slug = typeof post?.slug === "string" ? post.slug.trim() : "";
        if (!slug) return null;

        const lastmod = sanitizeLastmod(post?.updatedAt || post?.publishedAt || post?.createdAt || today);
        if (lastmod > latestBlogLastmod) latestBlogLastmod = lastmod;

        return {
          loc: `${POST_PATH_PREFIX}/${slug}`,
          lastmod,
          changefreq: "weekly",
          priority: "0.6",
        };
      })
      .filter(Boolean);

    return { blogEntries, latestBlogLastmod };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn(`[sitemap] Failed to read generated blog routes. ${message}`);
    return { blogEntries: [], latestBlogLastmod: today };
  }
}

function writeRobotsFile() {
  const robots = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/private/\nSitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/posts-sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robots, "utf8");
}

function generateSitemap() {
  staticPages.forEach((page) => {
    addEntry({
      loc: page,
      lastmod: today,
      changefreq: "weekly",
      priority: page === "/" ? "1.0" : page === POST_PATH_PREFIX ? "0.8" : "0.7",
    });
  });

  addKeywordEntries();

  const { blogEntries, latestBlogLastmod } = readGeneratedBlogEntries();
  addEntry({ loc: POST_PATH_PREFIX, lastmod: latestBlogLastmod, changefreq: "weekly", priority: "0.8" });
  blogEntries.forEach(addEntry);

  const body = Array.from(entries.values())
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>\n    <changefreq>${escapeXml(entry.changefreq)}</changefreq>\n    <priority>${escapeXml(entry.priority)}</priority>\n  </url>`,
    )
    .join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${body}\n` +
    `</urlset>\n`;

  fs.writeFileSync(outputPath, xml, "utf8");
  writeRobotsFile();

  console.log(`[sitemap] Wrote ${entries.size} URLs to ${outputPath} (${blogEntries.length} blog URLs).`);
}

try {
  generateSitemap();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.warn(`[sitemap] Unexpected failure. Static sitemap generation failed: ${message}`);
  process.exit(0);
}
