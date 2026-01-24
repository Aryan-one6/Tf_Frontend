type NormalizedReview = {
  author_name: string;
  author_photo_url?: string;
  rating: number;
  text: string;
  relative_time: string;
  timestamp?: number;
};

type CachedPayload = {
  reviews: NormalizedReview[];
  rating?: number;
  total_reviews?: number;
  cached: boolean;
  message?: string;
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 40;

let cache: { data: CachedPayload | null; expires: number } = { data: null, expires: 0 };
const rateBucket: Map<string, { count: number; expires: number }> = new Map();

function getClientIp(req: any) {
  const xff = (req.headers["x-forwarded-for"] as string) || "";
  return (xff.split(",")[0] || req.socket.remoteAddress || "unknown").trim();
}

function rateLimit(req: any): boolean {
  const ip = getClientIp(req);
  const now = Date.now();
  const bucket = rateBucket.get(ip) || { count: 0, expires: now + RATE_LIMIT_WINDOW_MS };
  if (bucket.expires < now) {
    bucket.count = 0;
    bucket.expires = now + RATE_LIMIT_WINDOW_MS;
  }
  bucket.count += 1;
  rateBucket.set(ip, bucket);
  return bucket.count <= RATE_LIMIT_MAX;
}

function normalizeReviews(raw: any[]): NormalizedReview[] {
  return (raw || []).map((r) => {
    const text = r.text ?? r.snippet ?? "";
    return {
      author_name: r.user?.name ?? r.author_name ?? "Anonymous",
      author_photo_url: r.user?.photo ?? r.author_image,
      rating: Number(r.rating) || 0,
      text,
      relative_time: r.time_ago ?? r.relative_time_description ?? "",
      timestamp: r.time ?? r.timestamp,
    };
  });
}

export default async function handler(req: any, res: any) {
  if (!rateLimit(req)) {
    res.status(429).json({ reviews: cache.data?.reviews ?? [], cached: true, message: "Rate limit exceeded" });
    return;
  }

  const limit = Math.min(Number(req.query.limit) || 10, 20);
  const apiKey = process.env.SERPAPI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ reviews: [], cached: true, message: "SerpAPI key not configured" });
    return;
  }

  const now = Date.now();
  if (cache.data && cache.expires > now) {
    const reviews = cache.data.reviews.slice(0, limit);
    res.status(200).json({ ...cache.data, reviews });
    return;
  }

  const placeId = process.env.SERPAPI_PLACE_ID;
  const query = process.env.SERPAPI_QUERY;
  const hl = process.env.SERPAPI_HL || "en";
  const gl = process.env.SERPAPI_GL || "in";

  const params = new URLSearchParams({
    engine: "google_maps_reviews",
    hl,
    gl,
    ...(placeId ? { place_id: placeId } : { q: query ?? "" }),
    api_key: apiKey,
  });

  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`SerpAPI responded with ${resp.status}`);
    const json = await resp.json();
    const reviews = normalizeReviews(json.reviews || []).slice(0, limit);
    const payload: CachedPayload = {
      reviews,
      rating: json.place_info?.rating || json.rating,
      total_reviews: json.place_info?.reviews || json.reviews_count,
      cached: false,
    };

    cache = { data: payload, expires: now + CACHE_TTL_MS };
    res.status(200).json(payload);
  } catch (err: unknown) {
    if (cache.data) {
      res.status(200).json({ ...cache.data, cached: true, message: "Serving cached reviews" });
      return;
    }
    res.status(502).json({ reviews: [], cached: false, message: "Unable to fetch Google reviews" });
  }
}
