
const env = (typeof import.meta !== "undefined" && (import.meta as any)?.env) || {};
const nodeEnv = (typeof process !== "undefined" && process.env) || {};

const TOKEN = (
  env.VITE_SAPPHIRE_TOKEN ||
  env.SAPPHIRE_TOKEN ||
  nodeEnv.VITE_SAPPHIRE_TOKEN ||
  nodeEnv.SAPPHIRE_TOKEN ||
  "48ed986bca700844eaa4f4bf492eb2c312e77ff569346304a8648a7bd34eb0ba" // default token provided
).trim();
const SITE_ID =
  env.VITE_SAPPHIRE_SITE_ID ||
  nodeEnv.SAPPHIRE_SITE_ID ||
  "cmjtw2vjd0001ibfofnpciyj4"; // default siteId for local/blog feed

const rawBase =
  env.VITE_SAPPHIRE_API_BASE || nodeEnv.SAPPHIRE_API_BASE || "http://localhost:5050/api/public";
const trimmedBase = rawBase.replace(/\/$/, "");
const BASE = trimmedBase.endsWith("/public") ? trimmedBase : `${trimmedBase}/public`;

type ListOpts = { limit?: number; page?: number; search?: string };

function buildParams(opts: ListOpts = {}) {
  const params = new URLSearchParams();
  if (SITE_ID) params.set("siteId", SITE_ID as string);
  if (opts.limit) params.set("limit", String(opts.limit));
  if (opts.page) params.set("page", String(opts.page));
  if (opts.search) params.set("search", opts.search);
  return params;
}

function authHeaders(): HeadersInit | undefined {
  return TOKEN ? { "X-Site-Token": TOKEN } : undefined;
}

export async function listPosts(opts: ListOpts = {}): Promise<{ posts: any[]; total: number; totalPages: number }> {
  const res = await fetch(`${BASE}/posts?${buildParams(opts).toString()}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`CMS errors ${res.status}`);

  const data = await res.json();
  const posts = Array.isArray(data?.posts) ? data.posts : Array.isArray(data) ? data : [];
  const total = Number(data?.total ?? data?.count ?? posts.length ?? 0) || 0;
  const totalPages = Number(data?.totalPages || data?.pages || 1) || 1;

  return { posts, total, totalPages };
}

export async function getPost(slug: string) {
  const params = buildParams();
  const res = await fetch(`${BASE}/posts/${slug}?${params.toString()}`, {
    headers: authHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Post not found`);
  return res.json();
}
