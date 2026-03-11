const DEFAULT_SITE_URL = "https://triadflair.com";
const DEFAULT_CMS_PUBLIC_BASE = "https://cms-backend.ppconsultings.com/api/public";
const POST_PATH_PREFIX = "/blog";

function normalizeSiteUrl(value) {
  return String(value || DEFAULT_SITE_URL).trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

function getRequestHost(req) {
  const forwardedHost = req.headers["x-forwarded-host"];
  if (typeof forwardedHost === "string" && forwardedHost.trim()) {
    return forwardedHost.trim();
  }

  const host = req.headers.host;
  return typeof host === "string" && host.trim() ? host.trim() : new URL(normalizeSiteUrl(process.env.SITE_URL)).host;
}

function normalizeCmsPublicBase(value, req) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  const fallbackBase = DEFAULT_CMS_PUBLIC_BASE;

  if (!trimmed) return fallbackBase;

  let normalized = trimmed;
  if (normalized.endsWith("/api")) normalized = `${normalized}/public`;
  else if (!normalized.endsWith("/api/public") && !normalized.endsWith("/public")) normalized = `${normalized}/api/public`;

  try {
    const cmsUrl = new URL(normalized);
    const requestHost = getRequestHost(req);
    const servingLocalhost = /(^localhost[:]?|^127\.0\.0\.1[:]?)/i.test(requestHost);
    const cmsIsLocalhost = /(^localhost$|^127\.0\.0\.1$)/i.test(cmsUrl.hostname);

    if (!servingLocalhost && cmsIsLocalhost) {
      return fallbackBase;
    }
  } catch {
    return fallbackBase;
  }

  return normalized;
}

async function fetchCmsSitemap(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
    },
    cache: "no-store",
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`CMS sitemap request failed (${response.status}): ${text.slice(0, 200)}`);
  }

  return text;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).send("Method Not Allowed");
  }

  const siteUrl = normalizeSiteUrl(process.env.SITE_URL);
  const requestHost = getRequestHost(req);
  const domain = requestHost.split(":")[0] || new URL(siteUrl).hostname;
  const cmsPublicBase = normalizeCmsPublicBase(
    process.env.SAPPHIRE_API_BASE ||
      process.env.CMS_BASE ||
      process.env.TRIADFLAIR_CMS_BASE ||
      DEFAULT_CMS_PUBLIC_BASE,
    req,
  );

  const candidates = [
    `${cmsPublicBase}/posts-sitemap.xml?domain=${encodeURIComponent(domain)}`,
    `${cmsPublicBase}/posts-sitemap.xml?domain=${encodeURIComponent(domain)}&pathPrefix=${encodeURIComponent(POST_PATH_PREFIX)}`,
  ];

  try {
    let xml = "";

    for (const candidate of candidates) {
      xml = await fetchCmsSitemap(candidate);
      if (xml.includes(`${domain}${POST_PATH_PREFIX}/`) || xml.includes(`${siteUrl}${POST_PATH_PREFIX}/`)) {
        break;
      }
    }

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
    return res.status(200).send(xml);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch posts sitemap";
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    return res
      .status(502)
      .send(`<?xml version="1.0" encoding="UTF-8"?><error><message>${message}</message></error>`);
  }
}
