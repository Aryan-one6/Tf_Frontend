// src/lib/wp.ts
export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: any;
};

const WP_API_BASE =
  (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_WP_API_BASE) ||
  (typeof process !== 'undefined' && process.env.REACT_APP_WP_API_BASE) ||
  'https://blog.triadflair.com/wp-json/wp/v2';

// src/lib/wp.ts

type QueryValue = string | number | boolean | Array<string | number | boolean>;

function buildSearchParams(params: Record<string, QueryValue>) {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const v of value) qs.append(key, String(v));
    } else {
      qs.append(key, String(value));
    }
  }
  return qs;
}

async function wpFetch(path: string, params: Record<string, QueryValue> = {}) {
  // always request embedded resources; merge caller params
  const qs = buildSearchParams({ _embed: 1, ...params });

  const res = await fetch(`${WP_API_BASE}${path}?${qs.toString()}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`WP API error ${res.status}`);

  const total = Number(res.headers.get("X-WP-Total") || 0);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || 0);
  const data = await res.json();
  return { data, total, totalPages };
}

export const getPosts = (opts: { page?: number; per_page?: number; search?: string } = {}) =>
  wpFetch('/posts', { page: 1, per_page: 9, ...opts });

export const getPostBySlug = async (slug: string) => {
  const { data } = await wpFetch('/posts', { slug, per_page: 1 });
  return (Array.isArray(data) && data.length ? data[0] : null) as WPPost | null;
};

// helpers
export const getFeaturedMedia = (post: WPPost) =>
  post?._embedded?.['wp:featuredmedia']?.[0] as
    | { source_url?: string; alt_text?: string; media_details?: { sizes?: Record<string, { source_url: string }> } }
    | undefined;

export const getTerms = (post: WPPost, taxonomy: 'category' | 'post_tag') => {
  const groups = post?._embedded?.['wp:term'] || [];
  // By default: [ categories[], tags[], ... ]
  const index = taxonomy === 'category' ? 0 : 1;
  return Array.isArray(groups[index]) ? groups[index] : [];
};
