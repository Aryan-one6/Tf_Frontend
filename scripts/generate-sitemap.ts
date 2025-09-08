// scripts/generate-sitemap.ts
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";
import { publicRoutes, RouteEntry } from "../src/routes.public";

const SITE_URL = (process.env.SITE_URL || "").replace(/\/$/, "");
if (!SITE_URL) {
  console.error("❌ Missing SITE_URL env var (e.g., https://triadflair.com)");
  process.exit(1);
}

function flattenRoutes(routes: RouteEntry[], base = ""): string[] {
  const out: string[] = [];
  for (const r of routes) {
    if (r.excludeFromSitemap) continue;
    const p = (base + (r.path.startsWith("/") ? r.path : `/${r.path}`)).replace(/\/+/g, "/");
    out.push(p);
    if (r.children?.length) out.push(...flattenRoutes(r.children, p));
  }
  return out;
}

const allPaths = Array.from(
  new Set(
    flattenRoutes(publicRoutes)
      // Exclude obvious non-indexable patterns
      .filter((p) => !p.includes(":") && !p.includes("*"))
  )
);

const links = allPaths.map((url) => ({
  url,
  changefreq: "weekly" as const,
  priority: url === "/" ? 1.0 : 0.7,
  lastmod: new Date().toISOString(),
}));

(async () => {
  const stream = new SitemapStream({ hostname: SITE_URL });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((d) => d.toString());

  if (!existsSync("public")) mkdirSync("public");
  writeFileSync("public/sitemap.xml", xml, "utf8");

  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  writeFileSync("public/robots.txt", robots, "utf8");

  console.log(`✅ Generated ${links.length} URLs → public/sitemap.xml`);
})();
