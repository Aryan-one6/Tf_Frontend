// Lightweight standalone server to proxy Google reviews from SerpAPI with caching & CORS
// Usage:
// SERPAPI_API_KEY=... SERPAPI_PLACE_ID=... node scripts/google-reviews-server.cjs
// Then point VITE_API_BASE to http://localhost:8787 (or the port you set).

require("dotenv").config();
const http = require("http");
const url = require("url");

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

let cache = { data: null, expires: 0 };

function normalizeReviews(raw) {
  return (raw || []).map((r) => {
    const text = r.text ?? r.snippet ?? "";
    const photo =
      r.user?.thumbnail ||
      r.user?.photo ||
      r.profile_photo_url ||
      r.author_image ||
      r.thumbnail;
    return {
      author_name: r.user?.name ?? r.author_name ?? "Anonymous",
      author_photo_url: photo,
      rating: Number(r.rating) || 0,
      text,
      relative_time: r.time_ago ?? r.relative_time_description ?? "",
      timestamp: r.time ?? r.timestamp,
    };
  });
}

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsed = url.parse(req.url, true);
  if (parsed.pathname !== "/api/google-reviews") {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const apiKey = process.env.SERPAPI_API_KEY;
  const placeId = process.env.SERPAPI_PLACE_ID;
  const query = process.env.SERPAPI_QUERY;
  if (!apiKey) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ reviews: [], message: "Missing SERPAPI_API_KEY" }));
    return;
  }

  const limit = Math.min(Number(parsed.query.limit) || 9, 20);
  const now = Date.now();
  if (cache.data && cache.expires > now) {
    const reviews = cache.data.reviews.slice(0, limit);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ...cache.data, reviews, cached: true }));
    return;
  }

  const hl = process.env.SERPAPI_HL || "en";
  const gl = process.env.SERPAPI_GL || "in";
  const params = new URLSearchParams({
    engine: "google_maps_reviews",
    hl,
    gl,
    ...(placeId ? { place_id: placeId } : { q: query ?? "" }),
    api_key: apiKey,
  });

  try {
    const resp = await fetch(`https://serpapi.com/search.json?${params.toString()}`);
    if (!resp.ok) throw new Error(`SerpAPI responded with ${resp.status}`);
    const json = await resp.json();
    const reviews = normalizeReviews(json.reviews || []).slice(0, limit);
    const payload = {
      reviews,
      rating: json.place_info?.rating || json.rating,
      total_reviews: json.place_info?.reviews || json.reviews_count,
      cached: false,
    };
    cache = { data: payload, expires: now + CACHE_TTL_MS };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(payload));
  } catch (err) {
    console.error("google-reviews-server error:", err);
    if (cache.data) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ...cache.data, cached: true, message: "Serving cached reviews" }));
      return;
    }
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ reviews: [], message: "Unable to fetch Google reviews" }));
  }
});

server.listen(PORT, () => {
  console.log(`Google reviews proxy running at http://localhost:${PORT}/api/google-reviews`);
});
