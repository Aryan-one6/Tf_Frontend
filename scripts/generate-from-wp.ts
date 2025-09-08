// scripts/generate-from-wp.ts
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";

const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");
const WP_BASE  = (process.env.WP_BASE  || "").replace(/\/$/, "");

if (!SITE_URL || !WP_BASE) {
  console.error("❌ Missing SITE_URL or WP_BASE");
  process.exit(1);
}

type WpPost = {
  link: string;
  slug: string;
  modified_gmt?: string;
  title?: { rendered: string };
  content?: { rendered: string };
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchAll<T = any>(url: string): Promise<T[]> {
  const first = await fetch(`${url}&page=1`, { cache: "no-store" });
  if (!first.ok) {
    throw new Error(`WP API error ${first.status}: ${await first.text()}`);
  }
  const totalPages = Number(first.headers.get("X-WP-TotalPages") || 1);
  const page1 = await first.json();

  const rest = await Promise.all(
    Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) =>
      fetch(`${url}&page=${i + 2}`, { cache: "no-store" }).then(async (r) => {
        if (!r.ok) throw new Error(`WP API page ${i + 2} error ${r.status}`);
        return r.json();
      })
    )
  );
  return page1.concat(...rest);
}

(async () => {
  try {
    // 1) Fetch all published posts
    const fields = "_fields=link,slug,modified_gmt,title,content";
    const base   = `${WP_BASE}/wp-json/wp/v2/posts?per_page=100&status=publish&${fields}`;
    const postsRaw: WpPost[] = await fetchAll(base);

    // Safety: only posts with a slug
    const posts = postsRaw.filter(p => p.slug && typeof p.slug === "string");

    // 2) Build links for sitemap (MAIN domain paths)
    const nowIso = new Date().toISOString();
    const postLinks = posts.map((p) => ({
      url: `/blog/${p.slug}`,
      lastmod: p.modified_gmt || nowIso,
      changefreq: "weekly" as const,
      priority: 0.6,
    }));

    // Static site pages (NO dynamic patterns here)
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
      "/web-development"
    ].map((p) => ({
      url: p,
      lastmod: nowIso,
      changefreq: "weekly" as const,
      priority: p === "/" ? 1.0 : 0.7,
    }));

    // De-duplicate by URL
    const dedupMap = new Map<string, any>();
    [...staticPages, ...postLinks].forEach((l) => {
      dedupMap.set(l.url, l);
    });
    const links = Array.from(dedupMap.values());

    // 3) Emit sitemap.xml
    const stream = new SitemapStream({ hostname: SITE_URL });
    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((d) => d.toString());
    if (!existsSync("public")) mkdirSync("public");
    writeFileSync("public/sitemap.xml", xml, "utf8");

    // 4) (Optional) Pre-render HTML shells for SEO
    for (const p of posts) {
      const dir = join("public", "blog", p.slug);
      try { mkdirSync(dir, { recursive: true }); } catch {}
      const title = escapeHtml(p.title?.rendered || "");
      const canonical = `${SITE_URL}/blog/${p.slug}`;
      const content = p.content?.rendered || ""; // WP already outputs HTML

      const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${title}</title>
<link rel="canonical" href="${canonical}" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>
</head>
<body>
<main id="pre-rendered-post">
  <article>${content}</article>
</main>
<!-- Your SPA can hydrate this route on the client -->
</body>
</html>`;
      writeFileSync(join(dir, "index.html"), html, "utf8");
    }

    // 5) Optional JSON index for your SPA/runtime
    writeFileSync(
      "public/blog-index.json",
      JSON.stringify(posts.map((p) => ({
        slug: p.slug,
        url: `/blog/${p.slug}`,
        lastmod: p.modified_gmt || null
      }))),
      "utf8"
    );

    console.log(`✅ Generated ${posts.length} blog URLs into sitemap + optional static files`);
  } catch (err: any) {
    console.error("❌ Generator failed:", err?.message || err);
    process.exit(1);
  }
})();
